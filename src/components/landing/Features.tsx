import { Mic, Sparkles, FileText, ListChecks, LayoutDashboard, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Mic,
    title: "Voice-based interview",
    body: "Multilingual voice intake captures symptoms naturally — no typing required.",
    span: "md:col-span-2",
    delay: 0.1,
  },
  {
    icon: Sparkles,
    title: "AI questioning",
    body: "Adaptive follow-ups powered by Gemini.",
    span: "",
    delay: 0.2,
  },
  {
    icon: FileText,
    title: "SOAP notes",
    body: "Structured clinical notes drafted automatically.",
    span: "",
    delay: 0.3,
  },
  {
    icon: ListChecks,
    title: "Smart triage",
    body: "Priority ranking based on severity and history.",
    span: "",
    delay: 0.4,
  },
  {
    icon: LayoutDashboard,
    title: "Doctor dashboard",
    body: "Patient queue, history, drug interactions — one screen.",
    span: "md:col-span-2",
    delay: 0.5,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp prescription",
    body: "Plain-language summaries delivered instantly.",
    span: "md:col-span-2",
    delay: 0.6,
  },
  {
    icon: Sparkles,
    title: "Analytics",
    body: "Clinic-level insights into patient flow and outcomes.",
    span: "",
    delay: 0.7,
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 relative">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-display text-xs uppercase tracking-[0.18em] text-primary mb-3"
          >
            <Sparkles className="h-3 w-3" />
            Capabilities
          </motion.p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-mineral">
            Everything a clinic needs, nothing it doesn't.
          </h2>
        </motion.div>

        <div className="mt-16 grid auto-rows-[180px] grid-cols-1 gap-5 sm:auto-rows-[200px] md:grid-cols-4 perspective-[1000px]">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: f.delay, type: "spring", stiffness: 100 }}
              whileHover={{ 
                y: -5, 
                scale: 1.02, 
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
                borderColor: "rgba(var(--primary-rgb), 0.3)"
              }}
              className={`group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card/60 backdrop-blur-sm p-6 shadow-soft ${f.span}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-mineral transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 group-hover:scale-110 shadow-sm">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="relative z-10 mt-6 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">{f.body}</p>
              
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-card pointer-events-none" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
