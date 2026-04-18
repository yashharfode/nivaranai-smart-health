import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const { t } = useI18n();
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px]"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-28">
        <motion.div 
          className="lg:col-span-7"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-mineral shadow-soft backdrop-blur-md">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </motion.div>
            {t("hero.eyebrow")}
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-mineral">
            {t("hero.title")}
          </motion.h1>
          
          <motion.p variants={fadeIn} className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            {t("hero.subtitle")}
          </motion.p>
          
          <motion.div variants={fadeIn} className="mt-8 flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/demo"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-soft transition-all hover:shadow-elevated"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Try the live demo
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
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-muted/50 hover:shadow-soft"
              >
                {t("hero.cta.secondary")}
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              AES-256 encrypted
            </div>
            <div className="hidden h-3 w-px bg-border sm:block" />
            <div className="hidden sm:block">{t("hero.trust")}</div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div 
      className="relative"
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/40 via-primary/20 to-transparent blur-2xl" aria-hidden />
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:border-primary/30">
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-3 bg-muted/20">
          <div className="flex items-center gap-2">
            <motion.span whileHover={{ scale: 1.5 }} className="h-3 w-3 rounded-full bg-clay" />
            <motion.span whileHover={{ scale: 1.5 }} className="h-3 w-3 rounded-full bg-warning" />
            <motion.span whileHover={{ scale: 1.5 }} className="h-3 w-3 rounded-full bg-success" />
          </div>
          <span className="font-display text-[11px] tracking-wider text-muted-foreground flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
            CONSULTATION · LIVE
          </span>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-start gap-4"
          >
            <div className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-secondary shadow-sm text-center text-xs font-semibold leading-8 text-mineral">
              P
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-secondary/80 px-4 py-3 text-sm text-foreground shadow-sm">
              I have had a sore throat and mild fever for two days.
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="flex items-start justify-end gap-4"
          >
            <div className="rounded-2xl rounded-tr-sm bg-primary/10 px-4 py-3 text-sm text-mineral shadow-sm">
              Any difficulty swallowing or body ache?
            </div>
            <div className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary to-mineral shadow-md text-center text-xs font-semibold leading-8 text-primary-foreground">
              AI
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 }}
            className="flex h-20 items-end justify-center gap-1.5 rounded-2xl bg-secondary/40 p-4"
          >
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.span
                key={i}
                className="block w-1.5 rounded-full bg-primary/80"
                animate={{
                  height: [`${20 + Math.abs(Math.sin(i * 0.6)) * 40}%`, `${30 + Math.abs(Math.cos(i * 0.4)) * 70}%`, `${20 + Math.abs(Math.sin(i * 0.6)) * 40}%`]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5 + (i % 3) * 0.2,
                  ease: "easeInOut",
                  delay: i * 0.05
                }}
                style={{ transformOrigin: "bottom" }}
              />
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, staggerChildren: 0.1 }}
            className="grid grid-cols-3 gap-3 text-xs"
          >
            {[
              { label: "Triage", value: "Routine", color: "text-success", bg: "hover:bg-success/5" },
              { label: "Confidence", value: "94%", color: "text-foreground", bg: "hover:bg-foreground/5" },
              { label: "SOAP", value: "Drafted", color: "text-primary", bg: "hover:bg-primary/5" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -2, scale: 1.02 }}
                className={`rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm px-3 py-2.5 transition-colors ${stat.bg}`}
              >
                <p className="text-muted-foreground">{stat.label}</p>
                <p className={`mt-1 font-display font-semibold ${stat.color}`}>{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
