import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useState, useRef } from "react";
import { IDCard } from "./IDCard";

const ease = [0.7, 0, 0.2, 1] as const;

const facts = [
  { k: "Focus", v: "AI × Product" },
  { k: "Degree", v: "B.Tech · AI & DS" },
  { k: "Year", v: "Second year" },
  { k: "Based", v: "India · IST" },
  { k: "Status", v: "Open to interns" },
  { k: "Stack", v: "React · Python" },
];

const timeline = [
  {
    year: "2026",
    title: "AI-focused full-stack builder",
    detail:
      "Shipping AI-native product surfaces — RAG, agents, and clean React front-ends.",
    tag: "Now",
  },
  {
    year: "2026",
    title: "AI & ML Intern",
    detail:
      "Building and deploying models, data pipelines and intelligent product surfaces.",
    tag: "Intern",
  },
  {
    year: "2025",
    title: "B.Tech · AI & Data Science",
    detail:
      "Started a formal deep-dive into ML foundations, data and applied AI.",
    tag: "Study",
  },
];

const principles = [
  {
    n: "01",
    t: "Clarity over cleverness",
    d: "Interfaces should read at a glance — nothing decorative that doesn't earn its place.",
  },
  {
    n: "02",
    t: "AI as material",
    d: "Models are a design material, not a feature bolted on top. Treat them like typography.",
  },
  {
    n: "03",
    t: "Ship the whole edge",
    d: "From data to pixel — the surface a user touches is where a product actually lives.",
  },
];

function PrincipleCard({ p, i }: { p: any; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || window.innerWidth < 768) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1], delay: i * 0.08 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative border border-hairline/50 md:border-hairline p-6 md:p-8 bg-black/5 md:bg-black/20 md:backdrop-blur-md rounded-[2rem] overflow-hidden hover:bg-white/[0.03] transition-colors shadow-xl hover:border-white/10"
    >
      {/* Glare */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 rounded-[2rem] opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            ([mx, my]) => {
              const px = (mx + 0.5) * 100;
              const py = (my + 0.5) * 100;
              return `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
            }
          ) as any,
        }}
      />
      <span className="hidden md:block absolute top-4 left-4 h-3 w-3 border-t border-l border-foreground/40" />
      <span className="hidden md:block absolute top-4 right-4 h-3 w-3 border-t border-r border-foreground/40" />
      <span className="hidden md:block absolute bottom-4 left-4 h-3 w-3 border-b border-l border-foreground/40" />
      <span className="hidden md:block absolute bottom-4 right-4 h-3 w-3 border-b border-r border-foreground/40" />

      <div className="flex items-center justify-between md:block relative z-10">
        <p className="mono-label opacity-60 md:opacity-50 tabular-nums text-[10px] md:text-xs bg-white/10 md:bg-transparent px-2 md:px-0 py-0.5 md:py-0 rounded-full md:rounded-none">
          RULE {p.n}
        </p>
      </div>
      
      <h3 className="mt-3 md:mt-4 font-display text-[1.4rem] md:text-2xl tracking-tight group-hover:text-accent transition-colors relative z-10">
        {p.t}
      </h3>
      <p className="mt-2 md:mt-3 text-sm md:text-base text-muted-foreground/90 md:text-muted-foreground relative z-10">{p.d}</p>

      <span className="mt-4 md:mt-6 block h-1 md:h-px w-0 bg-accent group-hover:w-full transition-all duration-500 rounded-full md:rounded-none relative z-10" />
    </motion.div>
  );
}

export function About() {
  const [showCard, setShowCard] = useState(false);

  return (
    <section id="about" className="relative z-10 overflow-hidden">
      {/* Ambient grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(ellipse at 50% 20%, black 25%, transparent 75%)",
        }}
      />

      <div className="container-editorial py-12 md:py-20">
        {/* Header row */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <p className="mono-label">01 / About</p>
          <p className="mono-label opacity-50">Portrait · Practice · Principles</p>
        </div>

        {/* Top: ID card + big statement */}
        <div className="mt-8 md:mt-10 grid grid-cols-12 gap-8 md:gap-6">
          <div className="col-span-12 md:col-span-4 flex flex-col justify-center items-center md:items-start relative py-4 md:py-0">
            <AnimatePresence mode="wait">
              {!showCard ? (
                <motion.button
                  key="btn"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                  onClick={() => setShowCard(true)}
                  className="group relative inline-flex items-center gap-3 rounded-full border border-hairline bg-black/20 px-8 py-4 font-mono text-sm uppercase tracking-widest text-foreground hover:bg-white/5 transition-colors md:backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:border-accent/50"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-70" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  Show ID Card
                </motion.button>
              ) : (
                <motion.div 
                  key="card" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.15 } }}
                  className="w-full flex flex-col items-center justify-center gap-6"
                >
                  <IDCard />
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => setShowCard(false)}
                    className="mono-label text-[0.65rem] text-foreground/60 hover:text-accent transition-colors border border-hairline hover:border-accent/40 rounded-full px-5 py-2.5 bg-black/20 md:backdrop-blur"
                  >
                    Hide ID Card
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div style={{ perspective: "1000px" }}>
              <motion.h2
                initial={{ opacity: 0, y: 40, rotateX: -45, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "bottom" }}
                className="display-xl text-[clamp(1.9rem,5vw,4.6rem)] leading-[0.98] tracking-tight max-w-5xl text-left"
              >
                Second-year B.Tech in AI &amp; Data Science, building the{" "}
                <span className="italic font-light text-accent">fluent, useful</span>{" "}
                edges of intelligent software.
              </motion.h2>
            </div>

            <div style={{ perspective: "1000px" }}>
              <motion.p
                initial={{ opacity: 0, y: 24, rotateX: -30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{ transformOrigin: "bottom" }}
                className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground text-left"
              >
                I work as an AI-focused full-stack builder — pairing hands-on
                AI & ML internship experience with tool integration and machine
                learning foundations against real product surfaces. Currently
                open to internship opportunities where design, data, and
                engineering meet.
              </motion.p>
            </div>

            {/* Fact strip */}
            <dl className="mt-12 grid grid-cols-2 md:grid-cols-3 border-t border-hairline">
              {facts.map((f, i) => (
                <div
                  key={f.k}
                  className={
                    "border-b border-hairline p-5 " +
                    ((i + 1) % 3 !== 0 ? "md:border-r md:border-hairline " : "") +
                    (i % 2 === 0 ? "border-r border-hairline md:border-r " : "")
                  }
                >
                  <dt className="mono-label opacity-50">{f.k}</dt>
                  <dd className="mt-2 font-display text-lg tracking-tight">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-12 md:mt-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-24">
              <div className="flex items-center gap-2 mono-label opacity-50">
                <span>A</span>
                <span className="h-px w-8 bg-foreground/30" />
                <span>Trajectory</span>
              </div>
              <p className="mt-4 font-display text-3xl tracking-tight">
                A short,<br />honest arc.
              </p>
              <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                Where I've been, where I am, and what I'm building toward.
              </p>
            </div>
          </div>

          <ol className="col-span-12 md:col-span-8 relative md:border-l md:border-hairline space-y-4 md:space-y-0 mt-6 md:mt-0">
            {timeline.map((t, i) => (
              <div key={`${t.year}-${i}`} style={{ perspective: "1000px" }}>
                <motion.li
                  initial={{ opacity: 0, y: 24, rotateX: -45, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                  style={{ transformOrigin: "bottom" }}
                  className="group relative md:pl-8 md:pr-2 py-6 md:py-8 bg-black/5 md:bg-transparent md:backdrop-blur-none rounded-xl md:rounded-none border border-hairline/50 md:border-b md:border-t-0 md:border-l-0 md:border-r-0 md:border-hairline px-5 md:px-0"
                >
                  <span className="hidden md:block absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-foreground group-hover:bg-accent group-hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_25%,transparent)] transition-all" />
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <p className="mono-label opacity-60 md:opacity-50 text-[10px] md:text-xs">
                      {t.year} · {t.tag}
                    </p>
                    <span className="mono-label opacity-40 text-[10px] md:text-xs">
                      {String(i + 1).padStart(2, "0")} / {timeline.length}
                    </span>
                  </div>
                  <h3 className="mt-2 md:mt-3 font-display text-xl md:text-3xl tracking-tight group-hover:text-accent transition-colors text-left">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl text-left">{t.detail}</p>
                </motion.li>
              </div>
            ))}
          </ol>
        </div>

        {/* Principles */}
        <div className="mt-12 md:mt-16">
          <div className="flex items-end justify-between gap-6 border-b border-hairline pb-4">
            <p className="mono-label">B · Operating principles</p>
            <p className="mono-label opacity-40">03 rules</p>
          </div>
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {principles.map((p, i) => (
              <PrincipleCard key={p.n} p={p} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
