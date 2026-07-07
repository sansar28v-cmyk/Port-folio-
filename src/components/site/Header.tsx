import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

const links = [
  { id: "showcase", label: "Work", n: "01", meta: "Selected projects" },
  { id: "about", label: "About", n: "02", meta: "The practice" },
  { id: "capabilities", label: "Capabilities", n: "03", meta: "Stack & craft" },
  { id: "contact", label: "Contact", n: "04", meta: "Start a project" },
];

const ticker = [
  "AI · DATA SCIENCE",
  "FULL-STACK ENGINEERING",
  "INTERFACES THAT COMPUTE",
  "AVAILABLE Q4 · 2026",
  "CHENNAI → EVERYWHERE",
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  const { scrollYProgress, scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const rotateX = useTransform(smoothVelocity, [-1000, 1000], [15, -15]);

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const progressPct = useTransform(progress, (v) => `${Math.round(v * 100)}`);
  const [pct, setPct] = useState("0");
  useMotionValueEvent(progressPct, "change", (v) => setPct(v));

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    const delta = y - lastY.current;
    if (Math.abs(delta) > 6) {
      setHidden(delta > 0 && y > 160);
      lastY.current = y;
    }
  });

  useEffect(() => {
    const ids = ["about", "showcase", "capabilities", "services", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const t = d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      });
      setTime(t);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      {/* Scroll progress ribbon */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-transparent via-accent to-accent/40"
      />

      <motion.div style={{ perspective: "1000px" }} className="fixed inset-x-0 top-0 z-50">
        <motion.header
          initial={false}
          style={{ rotateX, transformOrigin: "top" }}
          animate={{
            y: hidden ? -120 : 0,
            backgroundColor: scrolled ? "rgba(10,10,12,0.85)" : "rgba(10,10,12,0)",
            borderColor: scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
          }}
          transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
          className={`relative border-b ${scrolled ? 'bg-background/95 md:bg-transparent md:backdrop-blur-[24px] saturate-150' : ''}`}
        >
        {/* subtle top glow when scrolled */}
        <motion.div
          aria-hidden
          animate={{ opacity: scrolled ? 1 : 0 }}
          className="pointer-events-none absolute inset-x-0 -top-28 h-28 bg-[radial-gradient(60%_100%_at_50%_100%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent)]"
        />

        <div className="container-editorial flex h-16 items-center justify-between md:grid md:h-[72px] md:grid-cols-[1fr_auto_1fr] md:gap-8">
          {/* LEFT — monogram + wordmark */}
          <a href="#top" className="group flex items-start gap-2.5 justify-self-start shrink-0">
            <span className="relative inline-flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full border border-hairline">
              <span className="absolute inset-0 rounded-full border border-foreground/10" />
              <span className="absolute inset-0 rounded-full border border-dashed border-accent/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-full">
                <span className="font-display text-[14px] font-bold leading-none tracking-tight">
                  S
                </span>
              </span>
              <span className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-500 group-hover:translate-y-0">
                <span className="font-display text-[14px] font-bold leading-none tracking-tight text-accent">
                  S
                </span>
              </span>
              <motion.span
                aria-hidden
                className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
            </span>
            <span className="hidden sm:flex flex-col justify-center pt-[2px] leading-none">
              <span className="font-display text-[13px] font-semibold tracking-tight">SANDEEP</span>
              <span className="mono-label !text-[0.58rem] !tracking-[0.16em] mt-1 opacity-50">
                AI <span className="text-accent">×</span> ENGINEERING
              </span>
            </span>
          </a>

          {/* CENTER — nav pill (desktop only) */}
          <nav
            aria-label="Primary"
            onMouseLeave={() => setHovered(null)}
            className="relative hidden md:flex h-12 items-center gap-1 rounded-full border border-hairline bg-background/40 px-2 backdrop-blur-md"
          >
            {links.map((l) => {
              const isActive = active === l.id;
              const isHover = hovered === l.id;
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onMouseEnter={() => setHovered(l.id)}
                  className="group relative flex h-9 items-center rounded-full px-4 transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-foreground/[0.08] ring-1 ring-inset ring-foreground/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {isHover && !isActive && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-foreground/[0.04]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative flex items-baseline gap-2 mono-label !text-[0.7rem] leading-none transition-colors ${
                      isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    <span className={`tabular-nums ${isActive ? "text-accent" : "opacity-40"}`}>
                      {l.n}
                    </span>
                    {l.label}
                  </span>
                </a>
              );
            })}

            {/* hover meta caption */}
            <AnimatePresence mode="wait">
              {hovered && (
                <motion.span
                  key={hovered}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap mono-label !text-[0.6rem] text-foreground/50"
                >
                  → {links.find((l) => l.id === hovered)?.meta}
                </motion.span>
              )}
            </AnimatePresence>
          </nav>

          {/* RIGHT — status cluster */}
          <div className="flex items-center gap-3 justify-self-end shrink-0">
            {/* progress readout */}
            <div className="hidden xl:flex h-9 items-center gap-2 rounded-full border border-hairline px-3 mono-label !text-[0.62rem] leading-none text-foreground/50 whitespace-nowrap">
              <span className="tabular-nums text-foreground/80">{pct.padStart(2, "0")}</span>
              <span className="opacity-40">/ 100</span>
            </div>

            {/* time + location */}
            <div className="hidden lg:flex h-9 items-center gap-2 rounded-full border border-hairline px-3 mono-label !text-[0.62rem] leading-none text-foreground/60 whitespace-nowrap">
              <span className="tabular-nums text-foreground/85" suppressHydrationWarning>{time || "--:--:--"}</span>
              <span className="h-3 w-px bg-foreground/15" />
              <span>MAA · IN</span>
            </div>

            {/* Available CTA */}
            <a
              href="#contact"
              className="group relative flex h-8 md:h-9 items-center gap-2 overflow-hidden rounded-full border border-accent/40 px-3 md:px-4 mono-label !text-[0.6rem] md:!text-[0.66rem] leading-none text-accent transition-colors hover:text-accent-foreground whitespace-nowrap shrink-0"
            >
              <span className="absolute inset-0 -z-0 translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-y-0" />
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="relative">Available</span>
              <span className="relative hidden xl:inline opacity-60 group-hover:opacity-90">
                — Q4 &apos;26
              </span>
            </a>

            {/* Mobile toggle */}
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden relative flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            >
              <span
                className={`h-px w-5 bg-foreground transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-foreground transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Marquee ticker — only when scrolled */}
        <AnimatePresence initial={false}>
          {scrolled && (
            <motion.div
              key="ticker"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 26, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.7, 0, 0.2, 1] }}
              className="relative overflow-hidden border-t border-hairline"
            >
              <div className="flex h-[26px] items-center">
                <motion.div
                  className="flex shrink-0 items-center gap-10 whitespace-nowrap pl-6"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 42, ease: "linear", repeat: Infinity }}
                >
                  {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
                    <span
                      key={i}
                      className="mono-label !text-[0.58rem] text-foreground/40"
                    >
                      {t}
                      <span className="ml-10 text-accent/60">◆</span>
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.7, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden border-t border-hairline bg-background/95 backdrop-blur"
            >
              <div className="container-editorial flex flex-col py-4">
                {links.map((l, i) => (
                  <motion.a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group flex items-baseline justify-between py-3 border-b border-hairline last:border-none"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="mono-label !text-[0.62rem] text-accent">{l.n}</span>
                      <span className="font-display text-2xl transition-transform group-hover:translate-x-1">
                        {l.label}
                      </span>
                    </span>
                    <span className="mono-label !text-[0.58rem] opacity-50">{l.meta}</span>
                  </motion.a>
                ))}
                <div className="mt-4 flex items-center justify-between mono-label opacity-60">
                  <span className="tabular-nums" suppressHydrationWarning>{time || "--:--:--"} · MAA</span>
                  <span className="text-accent">● Available</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.header>
      </motion.div>
    </>
  );
}
