import { createFileRoute } from "@tanstack/react-router";

const SYSTEM = `You are a careful clinical assistant supporting a triage workflow in India.
A patient describes their symptoms in plain English or Hindi. Extract structured data and draft a SOAP note in clear, simple English.

Severity guide (1-10):
- 1-4: routine (mild discomfort, no red flags)
- 5-7: urgent (significant symptoms, no immediate danger)
- 8-10: critical (chest pain, breathlessness, severe bleeding, stroke signs, syncope, anaphylaxis)

Be conservative: when in doubt about red flags, score higher.

Respond ONLY with a valid JSON object matching this schema exactly. DO NOT wrap with markdown blocks.
{
  "main_symptom": "One-line chief complaint",
  "duration": "How long symptoms lasted",
  "severity": number between 1-10,
  "soap": {
    "subjective": "string",
    "objective": "string",
    "assessment": "string",
    "plan": "string"
  }
}`;

const fallback = (transcript: string) => {
  const t = transcript.toLowerCase();
  if (/chest|breath|saans|seene/.test(t)) {
    return {
      main_symptom: "Chest tightness with breathlessness",
      duration: "A few hours",
      severity: 9,
      soap: {
        subjective: "Patient reports chest tightness and breathlessness onset earlier today. No prior cardiac history mentioned.",
        objective: "Awaiting vitals. Observe for diaphoresis, pallor, distress.",
        assessment: "Rule out acute coronary syndrome. Consider pulmonary embolism, panic attack as differentials.",
        plan: "Urgent triage. ECG, SpO2, BP, troponin. Aspirin 300mg if no contraindication. Escalate to ER physician.",
      },
    };
  }
  if (/fever|bukhar|temperature/.test(t)) {
    return {
      main_symptom: "Fever with sore throat",
      duration: "2 days",
      severity: 4,
      soap: {
        subjective: "Patient reports fever ~100°F with sore throat for 2 days. Mild difficulty swallowing, no body ache.",
        objective: "Awaiting examination. Check throat, lymph nodes, temperature.",
        assessment: "Likely viral pharyngitis. Rule out streptococcal infection.",
        plan: "Symptomatic care: paracetamol 500mg PRN, warm saline gargles, hydration. Review in 3 days if not improved.",
      },
    };
  }
  return {
    main_symptom: "Common cold symptoms",
    duration: "3 days",
    severity: 3,
    soap: {
      subjective: `Patient reports: "${transcript}".`,
      objective: "Awaiting examination.",
      assessment: "Undifferentiated symptoms pending examination.",
      plan: "Triage and routine evaluation.",
    },
  };
};

export const Route = createFileRoute("/api/analyze")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let transcript = "";
        try {
          const body = await request.json();
          transcript = String(body?.transcript ?? "").slice(0, 2000);
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        
        if (!transcript.trim()) {
          return Response.json({ error: "Empty transcript" }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
          console.log("No GROQ_API_KEY provided, returning fallback.");
          return Response.json({ ...fallback(transcript), source: "local" });
        }

        try {
          const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              messages: [
                { role: "system", content: SYSTEM },
                { role: "user", content: `Patient transcript: """${transcript}"""` }
              ],
              response_format: { type: "json_object" },
              temperature: 0.2
            })
          });

          if (!response.ok) {
             console.error("Groq API error", response.status, await response.text());
             return Response.json({ ...fallback(transcript), source: "local" });
          }

          const result = await response.json();
          const responseText = result.choices[0]?.message?.content || "{}";
          
          let parsed;
          try {
            parsed = JSON.parse(responseText);
          } catch (parseError) {
            console.error("Failed to parse Groq output:", responseText);
             return Response.json({ ...fallback(transcript), source: "local" });
          }

          return Response.json({ ...parsed, source: "ai" });
        } catch (e: any) {
          console.error("Groq analyze error:", e?.message || e);
          return Response.json({ ...fallback(transcript), source: "local" });
        }
      },
    },
  },
});
