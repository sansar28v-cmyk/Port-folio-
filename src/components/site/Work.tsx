import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import trendzImg from "@/assets/trendz.png";
import ridecheckImg from "@/assets/ridecheck.png";
import auraImg from "@/assets/aura.png";

const ease = [0.7, 0, 0.2, 1] as const;

type Case = {
  idx: string;
  title: string;
  tagline: string;
  problem: string;
  approach: string;
  stack: string[];
  result: string;
  accent: string;
  image?: string;
};

const cases: Case[] = [
  {
    idx: "W-01",
    title: "Trendz",
    tagline: "AI-powered static site builder and generative workspace.",
    problem:
      "Most website builders produce generic templates or force users to write code. Turning a plain-language brief into a professional, branded static site in seconds is out of reach.",
    approach:
      "A split-screen generative workspace: natural-language prompts feed a local AI pipeline that writes the code, validates structure with Zod, enforces a strict design system with corporate theming, and injects context-aware Unsplash imagery.",
    stack: ["React", "TanStack Start", "Tailwind", "Zod", "Ollama", "JSZip"],
    result:
      "Plain-language briefs become deployable, on-brand static sites instantly — zero cloud API dependency, one-click export.",
    accent: "linear-gradient(120deg, #0a0a0c 0%, #0c0c18 40%, #00121e 100%)",
    image: trendzImg,
  },
  {
    idx: "W-02",
    title: "RideCheck",
    tagline: "Full-stack ride fare comparison, benchmarked in real time.",
    problem:
      "Riders juggle three apps to compare Ola, Uber and Rapido fares — losing time and money on a decision that should take seconds.",
    approach:
      "A single interface benchmarks estimates across providers using a simulated fare engine tuned to real pricing formulas, Google Distance Matrix for route data with a Haversine fallback, and deep links straight into the native ride apps.",
    stack: ["React", "Vite", "Node.js", "Express", "Google Maps API", "Tailwind"],
    result:
      "Cinematic dark UI with keyframe animation, sub-second comparisons, and a one-tap handoff to book.",
    accent: "linear-gradient(120deg, #0a0a0c 0%, #101018 40%, #001a1e 100%)",
    image: ridecheckImg,
  },
  {
    idx: "W-03",
    title: "Aura",
    tagline: "Real-time facial emotion detection, framed like a viewfinder.",
    problem:
      "Emotion detection demos usually look like lab tools — technical, cold, and unusable outside a screenshot.",
    approach:
      "A 'director's viewfinder' interface built around a live OpenCV + DeepFace pipeline served by Flask — deliberately cinematic, with reticle framing, mono readouts and a restrained motion language.",
    stack: ["Python", "OpenCV", "DeepFace", "Flask", "Web"],
    result:
      "A demo that looks and feels like a product, not a notebook — usable end-to-end in the browser.",
    accent: "linear-gradient(120deg, #0a0a0c 0%, #14101a 40%, #1a0016 100%)",
    image: auraImg,
  },
];

function CaseBlock({ c, i }: { c: Case; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 250, damping: 25 });
  const sy = useSpring(my, { stiffness: 250, damping: 25 });
  const bgX = useTransform(sx, (v) => `${v}px`);
  const bgY = useTransform(sy, (v) => `${v}px`);

  return (
    <article className="grid grid-cols-12 gap-6 md:gap-8">
      {/* Desktop sticky header */}
      <div className="hidden md:block col-span-12 md:col-span-3">
        <div className="md:sticky md:top-24">
          <div className="flex items-center gap-2 mono-label opacity-50">
            <span>0{i + 1}</span>
            <span className="h-px w-8 bg-foreground/30" />
            <span>{c.idx}</span>
          </div>
          <h3 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">
            {c.title}
          </h3>
          <p className="mt-3 text-muted-foreground max-w-xs text-sm leading-relaxed">
            {c.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {c.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="mono-label border border-hairline px-2 py-1 opacity-60"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main card */}
      <div className="col-span-12 md:col-span-9">
        <motion.div
          ref={ref}
          onMouseMove={(e) => {
            const r = ref.current!.getBoundingClientRect();
            mx.set(e.clientX - r.left);
            my.set(e.clientY - r.top);
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease, delay: i * 0.08 }}
          className="group relative border border-hairline overflow-hidden"
        >
          {/* cursor spotlight */}
          <motion.span
            aria-hidden
            style={{
              background: useTransform(
                [bgX, bgY],
                ([x, y]) =>
                  `radial-gradient(300px circle at ${x} ${y}, color-mix(in oklab, var(--accent) 12%, transparent), transparent 60%)`,
              ) as unknown as string,
            }}
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          />

          {/* Corner ticks */}
          <span className="absolute top-3 left-3 h-4 w-4 border-t border-l border-foreground/30 z-10" />
          <span className="absolute top-3 right-3 h-4 w-4 border-t border-r border-foreground/30 z-10" />
          <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-foreground/30 z-10" />
          <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-foreground/30 z-10" />

          {/* Mobile editorial header */}
          <div className="md:hidden flex items-baseline justify-between border-b border-hairline p-4 pb-4">
            <div>
              <span className="mono-label opacity-50 text-[10px] uppercase tracking-[0.2em]">
                0{i + 1} / {c.idx}
              </span>
              <h3 className="mt-1 font-display text-2xl tracking-tight">
                {c.title}
              </h3>
            </div>
            <motion.span
              animate={{ x: hover ? 4 : 0, y: hover ? -4 : 0 }}
              transition={{ duration: 0.4, ease }}
              className="text-foreground/50 group-hover:text-accent transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.span>
          </div>

          {/* Hero visual */}
          <div
            className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[16/9] w-full overflow-hidden"
            style={{ background: c.accent }}
          >
            {c.image && (
              <div className="absolute inset-0 flex items-center justify-center p-4 md:p-14 pb-20 md:pb-32">
                <div className="relative h-full w-full max-w-[95%] max-h-[86%] md:max-w-[90%] md:max-h-[76%] rounded-md overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10 bg-black">
                  <img
                    src={c.image}
                    alt={`${c.title} — product screenshot`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-10">
              <div className="hidden md:flex items-start justify-between">
                <p className="mono-label opacity-60">{c.idx}</p>
                <motion.span
                  animate={{ x: hover ? 4 : 0, rotate: hover ? -45 : 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="grid place-items-center h-9 w-9 rounded-full border border-white/20 text-white/70 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors"
                >
                  →
                </motion.span>
              </div>
              <div className="hidden md:flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <p className="display-xl text-[clamp(2.2rem,12vw,4.2rem)] md:text-[clamp(2.8rem,7vw,6rem)] leading-none text-white">
                  {c.title}
                </p>
                <p className="mono-label max-w-[80%] md:max-w-[40%] text-left md:text-right opacity-70 text-[0.6rem] md:text-[0.68rem] text-white/80">
                  {c.tagline}
                </p>
              </div>
            </div>

            {/* Grid overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          {/* Mobile tagline footer */}
          <div className="md:hidden border-t border-hairline p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {c.tagline}
            </p>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-hairline">
            <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-hairline">
              <p className="mono-label opacity-50">Problem</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {c.problem}
              </p>
            </div>
            <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-hairline">
              <p className="mono-label opacity-50">Approach</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {c.approach}
              </p>
            </div>
            <div className="p-5 md:p-6">
              <p className="mono-label opacity-50">Result</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {c.result}
              </p>
            </div>
          </div>

          {/* Stack strip */}
          <div className="flex flex-wrap items-center gap-2 border-t border-hairline p-4 md:p-5">
            <span className="mono-label opacity-50 mr-2">Stack</span>
            {c.stack.map((s) => (
              <span
                key={s}
                className="mono-label border border-hairline px-2 py-1 opacity-70 group-hover:opacity-100 group-hover:border-foreground/40 transition-all"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Bottom accent line */}
          <motion.span
            aria-hidden
            initial={false}
            animate={{ scaleX: hover ? 1 : 0 }}
            transition={{ duration: 0.5, ease }}
            style={{ transformOrigin: "left" }}
            className="absolute bottom-0 left-0 h-px w-full bg-accent"
          />
        </motion.div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="relative z-10 overflow-hidden">
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

      <div className="container-editorial pt-24 md:pt-32 pb-24">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-4">
            <p className="mono-label">02 / Selected work</p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease }}
              className="mt-6 display-xl text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-tight"
            >
              Projects that<br />
              <span className="italic font-light text-accent">shipped.</span>
            </motion.h2>
          </div>

          <div className="col-span-12 md:col-span-8 md:pl-10">
            <p className="text-muted-foreground max-w-lg">
              A small set of end-to-end builds — each one a product surface, a
              technical bet, and a lesson in how design and engineering meet.
            </p>

            {/* Stats bar */}
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-hairline pt-6">
              <div>
                <p className="mono-label opacity-50">Projects</p>
                <p className="mt-2 font-display text-3xl tracking-tight tabular-nums">
                  {String(cases.length).padStart(2, "0")}
                </p>
              </div>
              <div>
                <p className="mono-label opacity-50">Domains</p>
                <p className="mt-2 font-display text-3xl tracking-tight">
                  AI · Web · CV
                </p>
              </div>
              <div>
                <p className="mono-label opacity-50">Status</p>
                <p className="mt-2 font-display text-3xl tracking-tight">
                  Shipping
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cases */}
        <div className="mt-20 md:mt-24 space-y-24 md:space-y-32">
          {cases.map((c, i) => (
            <CaseBlock key={c.idx} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
