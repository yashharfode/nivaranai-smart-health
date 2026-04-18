import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      <div className="mx-auto max-w-5xl px-5 sm:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 20 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-gradient-to-br from-card via-card to-secondary/80 p-10 shadow-2xl sm:p-16"
        >
          <motion.div
            animate={{ 
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.2, 1, 1.2, 1] 
            }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-[100px]"
          />
          <div className="relative z-10">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-3 py-1 font-display text-xs uppercase tracking-[0.18em] text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              A note from the team
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              We are not just building software.<br />
              <span className="text-primary">We are improving healthcare outcomes.</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background shadow-lg transition-all hover:shadow-[0_0_40px_rgba(var(--foreground-rgb),0.3)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get started
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 z-0 bg-mineral translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 backdrop-blur-md px-8 py-4 text-sm font-semibold text-foreground transition-all hover:bg-card hover:border-border hover:shadow-md"
                >
                  Explore features
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
