import { Mic, Brain, LayoutDashboard, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const nodes = [
  { icon: Mic, title: "Voice intake", body: "Patient describes symptoms naturally, in their language." },
  { icon: Brain, title: "AI processing", body: "SOAP notes, triage, and follow-up questions in seconds." },
  { icon: LayoutDashboard, title: "Smart dashboard", body: "Doctors review, edit, and prescribe — quickly." },
];

export function Solution() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.3 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  const arrowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent transform -translate-y-1/2 hidden md:block" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block rounded-full bg-primary/10 border border-primary/20 px-3 py-1 font-display text-xs uppercase tracking-[0.18em] text-primary"
          >
            The solution
          </motion.p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-mineral">
            One quiet system that does the heavy lifting.
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]"
        >
          {nodes.map((n, idx) => (
            <div key={n.title} className="contents">
              <motion.div 
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative rounded-[2rem] border border-border/60 bg-card/80 backdrop-blur-sm p-8 shadow-soft transition-colors hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_rgba(var(--primary-rgb),0.2)] text-center md:text-left"
              >
                <div className="mx-auto md:mx-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-mineral text-primary-foreground shadow-glow mb-6 relative overflow-hidden">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute -inset-1 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <n.icon className="h-6 w-6 relative z-10" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">{n.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity pointer-events-none" />
              </motion.div>

              {idx < nodes.length - 1 && (
                <motion.div variants={arrowVariants} className="hidden items-center justify-center md:flex px-2">
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-border bg-background shadow-sm">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
