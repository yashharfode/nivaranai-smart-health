import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const steps = [
  { n: "01", title: "Patient speaks symptoms", body: "Natural voice input — English or Hindi, no forms to fill." },
  { n: "02", title: "AI asks smart questions", body: "Adaptive follow-ups uncover the full clinical picture." },
  { n: "03", title: "SOAP notes generated", body: "Subjective, Objective, Assessment, Plan — drafted automatically." },
  { n: "04", title: "Doctor reviews", body: "Edit in place, add nuance, approve in under a minute." },
  { n: "05", title: "Voice prescription sent", body: "Delivered to the patient on WhatsApp in plain language." },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 }
    }
  };

  return (
    <section id="how" className="relative border-t border-border/40 bg-background py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/40 via-background to-background" />
      
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <motion.p 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-display text-xs uppercase tracking-[0.18em] text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Workflow
          </motion.p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-mineral to-primary">
            Five calm steps,<br/>start to finish.
          </h2>
        </motion.div>

        <motion.ol 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative mt-16 space-y-6"
        >
          {/* Vertical connecting line */}
          <div className="absolute left-8 sm:left-14 top-8 bottom-8 w-px bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 hidden sm:block" />

          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 10 }}
              className="relative z-10 grid grid-cols-[auto_1fr] items-center gap-6 rounded-[2rem] border border-border/50 bg-card/80 backdrop-blur-md p-6 shadow-soft transition-all hover:shadow-[0_20px_50px_-12px_rgba(var(--primary-rgb),0.15)] hover:border-primary/20 sm:grid-cols-[auto_1fr_auto] sm:gap-10 sm:p-8"
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/30 tabular-nums shadow-inner group-hover:from-primary group-hover:to-mineral transition-colors duration-500">
                <span className="font-display text-2xl font-bold text-primary group-hover:text-background">{s.n}</span>
                <motion.div 
                  className="absolute inset-0 rounded-2xl border border-primary/20"
                  initial={false}
                  whileHover={{ scale: 1.1, rotate: 5, opacity: 0.5 }}
                />
              </div>
              
              <div className="max-w-xl">
                <h3 className="font-display text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
              
              <motion.div 
                className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary"
                whileHover={{ rotate: 90, scale: 1.1 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-0 transition-opacity group-hover:opacity-100">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
