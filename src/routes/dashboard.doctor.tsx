import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Mic,
  CheckCircle2,
  TrendingUp,
  Users,
  Clock,
  Pill,
  FileText,
  Loader2,
} from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";

export const Route = createFileRoute("/dashboard/doctor")({
  head: () => ({
    meta: [{ title: "Doctor dashboard — NivaranAI" }],
  }),
  component: DoctorDashboard,
});

export type ConsultationDoc = {
  id: string;
  patient_name: string;
  patient_age: number;
  complaint: string;
  priority: "Urgent" | "High" | "Routine";
  status: "waiting" | "in_progress" | "completed";
  wait_time: string;
  timestamp: number;
  soap: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  is_ai_drafted: boolean;
};

function DoctorDashboard() {
  const { user } = useAuth();
  const [queue, setQueue] = useState<ConsultationDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "consultations"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as ConsultationDoc[];

        setQueue(docs);
        setLoading(false);

        setActiveId((prev) => {
          if (docs.length === 0) return null;
          if (prev && docs.some((d) => d.id === prev)) return prev;
          return docs[0].id;
        });
      },
      (error) => {
        console.error("Firebase Snapshot Error:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const active = queue.find((q) => q.id === activeId) || null;

  return (
    <DashboardShell
      requiredRole="doctor"
      title={`Good day, Dr. ${user?.name.split(" ")[0] ?? "Doctor"}`}
      subtitle="Smart queue, AI-drafted notes, and one-click prescriptions."
      nav={
        <span className="hidden rounded-full bg-success/15 px-3 py-1.5 text-xs font-medium text-success sm:inline-flex">
          ● Verified · Live Firebase
        </span>
      }
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Stats totalPatients={queue.length} />

        <section className="lg:col-span-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <Users className="h-4 w-4" />
              <p className="font-display text-xs uppercase tracking-[0.18em]">Patient queue</p>
            </div>
            <span className="text-xs text-muted-foreground">{queue.length} waiting</span>
          </div>

          <div className="mt-4">
            {loading ? (
              <div className="flex h-32 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : queue.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
                No patients in queue
              </div>
            ) : (
              <ul className="space-y-2">
                {queue.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveId(item.id)}
                      className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
                        activeId === item.id
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border bg-background hover:border-primary/40 hover:bg-secondary/60"
                      }`}
                    >
                      <PriorityDot priority={item.priority} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate font-medium text-foreground">
                            {item.patient_name || "Unknown"}{" "}
                            <span className="text-xs text-muted-foreground">· {item.patient_age || "?"}y</span>
                          </p>
                          <span className="shrink-0 text-[11px] text-muted-foreground">Just now</span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.complaint}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="lg:col-span-7 grid gap-5">
          {active ? (
            <>
              <SoapCard consultation={active} />
              <PrescriptionCard />
              <DrugAlertCard />
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-border bg-card p-6 shadow-soft text-muted-foreground border-dashed">
              <Users className="h-10 w-10 opacity-20 mb-3" />
              <p>Select a patient from the queue to view details</p>
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}

function Stats({ totalPatients }: { totalPatients: number }) {
  const stats = [
    { icon: Users, label: "Patients today", value: totalPatients.toString() },
    { icon: Clock, label: "Avg consult time", value: "6.4 min" },
    { icon: TrendingUp, label: "Notes auto-drafted", value: "100%" },
    { icon: CheckCircle2, label: "Approval rate", value: "98%" },
  ];
  return (
    <div className="lg:col-span-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <s.icon className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight">{s.value}</p>
        </div>
      ))}
    </div>
  );
}

function PriorityDot({ priority }: { priority: string | null }) {
  const map: Record<string, string> = {
    Urgent: "bg-destructive",
    High: "bg-warning",
    Routine: "bg-success",
  };
  const colorClass = map[priority || "Routine"] || "bg-success";

  return (
    <span className="mt-1.5 flex shrink-0 items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${colorClass}`} />
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {priority || "Routine"}
      </span>
    </span>
  );
}

function SoapCard({ consultation }: { consultation: ConsultationDoc }) {
  const soap = consultation.soap;
  const formattedDefault = soap
    ? `Subjective: ${soap.subjective || "None"}\n\nObjective: ${soap.objective || "None"}\n\nAssessment: ${soap.assessment || "None"}\n\nPlan: ${soap.plan || "None"}`
    : "No SOAP details available.";

  const [notes, setNotes] = useState(formattedDefault);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNotes(formattedDefault);
  }, [consultation.id]);

  const saveNotes = async () => {
    if (!consultation.id) return;
    setSaving(true);
    try {
      const docRef = doc(db, "consultations", consultation.id);
      await updateDoc(docRef, {
        "soap.plan": notes.includes("Plan:") ? notes.split("Plan:")[1].trim() : soap.plan,
        status: "approved",
      });
    } catch (error) {
      console.error("Firebase Update Error:", error);
    }
    setSaving(false);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft relative">
      {saving && (
        <div className="absolute inset-0 bg-background/50 rounded-3xl z-10 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <FileText className="h-4 w-4" />
          <p className="font-display text-xs uppercase tracking-[0.18em]">
            SOAP notes · {consultation.patient_name || "Unknown"}
          </p>
        </div>
        {consultation.is_ai_drafted && (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            AI drafted
          </span>
        )}
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="mt-4 h-56 w-full resize-none rounded-2xl border border-input bg-background p-4 text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
      <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
        <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground hover:bg-secondary">
          Save draft
        </button>
        <button
          onClick={saveNotes}
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-mineral"
        >
          Approve & sign
        </button>
      </div>
    </div>
  );
}

function PrescriptionCard() {
  const [recording, setRecording] = useState(false);
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Pill className="h-4 w-4" />
          <p className="font-display text-xs uppercase tracking-[0.18em]">Voice prescription</p>
        </div>
        <button
          onClick={() => setRecording((r) => !r)}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            recording
              ? "bg-destructive text-destructive-foreground animate-pulse"
              : "bg-foreground text-background hover:bg-mineral"
          }`}
        >
          <Mic className="h-3.5 w-3.5" /> {recording ? "Listening..." : "Dictate"}
        </button>
      </div>
      <div className="mt-4 grid gap-2">
        {[
          ["Paracetamol 500mg", "1 tab BD × 3 days"],
          ["Warm saline gargle", "After meals × 5 days"],
        ].map(([n, d]) => (
          <div
            key={n}
            className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm"
          >
            <span className="font-medium text-foreground">{n}</span>
            <span className="text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Patient will receive this on WhatsApp in plain language.
      </p>
    </div>
  );
}

function DrugAlertCard() {
  return (
    <div className="rounded-3xl border border-warning/30 bg-warning/5 p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warning/15 text-warning">
          <AlertTriangle className="h-4 w-4" />
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-foreground">Drug interaction notice</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Patient is on long-term Warfarin (per history). Monitor INR if NSAIDs are added. Paracetamol is preferred.
          </p>
        </div>
      </div>
    </div>
  );
}
