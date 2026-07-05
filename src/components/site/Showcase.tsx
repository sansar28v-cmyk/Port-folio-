import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import trendzImg from "@/assets/trendz.png";
import ridecheckImg from "@/assets/ridecheck.png";
import auraImg from "@/assets/aura.png";
import certDeloitte from "@/assets/certificates/cert-deloitte.png";
import certGemini from "@/assets/certificates/cert-gemini.png";
import certBa from "@/assets/certificates/cert-ba.png";
import certTata from "@/assets/certificates/cert-tata.png";
import certPython from "@/assets/certificates/cert-python.png";
import certCpp from "@/assets/certificates/cert-cpp.png";
import certC from "@/assets/certificates/cert-c.png";

const ease = [0.7, 0, 0.2, 1] as const;

type Tab = "projects" | "stack" | "certificates";

type Certificate = {
  idx: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
};

// Reverse chronological order (latest first)
const certificates: Certificate[] = [
  { idx: "C-01", title: "Data Analytics Job Simulation", issuer: "Deloitte", date: "July 1, 2026", image: certDeloitte },
  { idx: "C-02", title: "Gemini Certified Student", issuer: "Google for Education", date: "June 27, 2026", image: certGemini },
  { idx: "C-03", title: "Data Science Job Simulation", issuer: "British Airways · Forage", date: "June 4, 2026", image: certBa },
  { idx: "C-04", title: "GenAI Powered Data Analytics Job Simulation", issuer: "TATA · Forage", date: "June 2, 2026", image: certTata },
  { idx: "C-05", title: "Master in Python Programming", issuer: "Code Galatta", date: "27 / 09 / 25", image: certPython },
  { idx: "C-06", title: "Master in C++ Programming", issuer: "Code Galatta", date: "27 / 09 / 25", image: certCpp },
  { idx: "C-07", title: "Master in C Programming", issuer: "Code Galatta", date: "27 / 09 / 25", image: certC },
];

type Project = {
  idx: string;
  title: string;
  tag: string;
  tagline: string;
  image: string;
  accent: string;
  problem: string;
  approach: string;
  stack: string[];
  result: string;
};

const projects: Project[] = [
  {
    idx: "P-01",
    title: "Trendz",
    tag: "React · TanStack · Ollama",
    tagline: "AI-powered static site builder and generative workspace.",
    image: trendzImg,
    accent: "linear-gradient(120deg, #0a0a0c 0%, #0c0c18 40%, #00121e 100%)",
    problem:
      "Most website builders produce generic templates or force users to write code. Turning a plain-language brief into a professional, branded static site in seconds is out of reach.",
    approach:
      "A split-screen generative workspace: natural-language prompts feed a local AI pipeline that writes the code, validates structure with Zod, enforces a strict design system with corporate theming, and injects context-aware imagery. The result renders live in an iframe and exports as a zipped static site.",
    stack: ["React", "TanStack Start", "Tailwind CSS", "Zod", "Ollama", "JSZip"],
    result:
      "Plain-language briefs become deployable, on-brand static sites instantly — zero cloud API dependency, one-click export.",
  },
  {
    idx: "P-02",
    title: "RideCheck",
    tag: "React · Node · Google Maps",
    tagline: "Full-stack ride fare comparison, benchmarked in real time.",
    image: ridecheckImg,
    accent: "linear-gradient(120deg, #0a0a0c 0%, #101018 40%, #001a1e 100%)",
    problem:
      "Riders juggle three apps to compare Ola, Uber and Rapido fares — losing time and money on a decision that should take seconds.",
    approach:
      "A single interface benchmarks estimates across providers using a simulated fare engine tuned to real pricing formulas, Google Distance Matrix for route data with a Haversine fallback, and deep links straight into the native ride apps.",
    stack: ["React", "Vite", "Node.js", "Express", "Google Maps API", "Tailwind"],
    result:
      "Cinematic dark UI with keyframe animation, sub-second comparisons, and a one-tap handoff to book.",
  },
  {
    idx: "P-03",
    title: "Aura",
    tag: "Python · OpenCV · Flask",
    tagline: "Real-time facial emotion detection, framed like a viewfinder.",
    image: auraImg,
    accent: "linear-gradient(120deg, #0a0a0c 0%, #14101a 40%, #1a0016 100%)",
    problem:
      "Emotion detection demos usually look like lab tools — technical, cold, and unusable outside a screenshot.",
    approach:
      "A 'director's viewfinder' interface built around a live OpenCV + DeepFace pipeline served by Flask — deliberately cinematic, with reticle framing, mono readouts and a restrained motion language.",
    stack: ["Python", "OpenCV", "DeepFace", "Flask"],
    result:
      "A demo that looks and feels like a product, not a notebook — usable end-to-end in the browser.",
  },
];

// Floating tech icons — slug maps to simple-icons CDN
const stack = [
  { name: "Python",        slug: "python",         color: "3776AB", x: 10, y: 20, size: 68, delay: 0.0 },
  { name: "React",         slug: "react",          color: "61DAFB", x: 80, y: 22, size: 84, delay: 0.4 },
  { name: "TypeScript",    slug: "typescript",     color: "3178C6", x: 22, y: 62, size: 72, delay: 0.8 },
  { name: "JavaScript",    slug: "javascript",     color: "F7DF1E", x: 64, y: 72, size: 70, delay: 1.2 },
  { name: "Node.js",       slug: "nodedotjs",      color: "5FA04E", x: 46, y: 10, size: 66, delay: 0.6 },
  { name: "Tailwind CSS",  slug: "tailwindcss",    color: "06B6D4", x: 90, y: 58, size: 74, delay: 0.2 },
  { name: "HTML5",         slug: "html5",          color: "E34F26", x: 52, y: 84, size: 64, delay: 1.5 },
  { name: "CSS3",          slug: "css",            color: "1572B6", x: 36, y: 90, size: 60, delay: 0.9 },
  { name: "Flask",         slug: "flask",          color: "FFFFFF", x: 6,  y: 42, size: 60, delay: 1.1 },
  { name: "OpenCV",        slug: "opencv",         color: "5C3EE8", x: 70, y: 44, size: 70, delay: 0.3 },
  { name: "Git",           slug: "git",            color: "F05032", x: 30, y: 34, size: 62, delay: 1.4 },
  { name: "Vite",          slug: "vite",           color: "646CFF", x: 94, y: 34, size: 58, delay: 0.7 },
  { name: "Vercel",        slug: "vercel",         color: "FFFFFF", x: 58, y: 50, size: 54, delay: 1.0 },
  { name: "Netlify",       slug: "netlify",        color: "00C7B7", x: 76, y: 88, size: 62, delay: 0.5 },
  { name: "Google Maps",   slug: "googlemaps",     color: "4285F4", x: 16, y: 82, size: 58, delay: 0.5 },
  { name: "Ollama",        slug: "ollama",         color: "FFFFFF", x: 86, y: 80, size: 64, delay: 1.3 },
  { name: "OpenRouter",    slug: "openrouter",     color: "5E5CE6", x: 42, y: 36, size: 60, delay: 0.1 },
];



export function Showcase() {
  const [tab, setTab] = useState<Tab>("projects");
  const [active, setActive] = useState<Project | null>(null);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!active && !activeCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        setActiveCert(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, activeCert]);

  return (
    <section id="showcase" className="relative z-10">
      <div className="container-editorial pt-24 pb-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label">02 / Showcase</p>
            <h2 className="mt-4 display-xl text-[clamp(2rem,5vw,4rem)] max-w-3xl leading-[0.95]">
              Portfolio Showcase.
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl">
              Tap a project to open the full case — problem, approach, stack, result.
            </p>
          </div>

          <div className="inline-flex rounded-full border border-hairline p-1 self-start md:self-auto">
            {(
              [
                { id: "projects", label: "Projects" },
                { id: "certificates", label: "Certificates" },
                { id: "stack", label: "Tech Stack" },
              ] as { id: Tab; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative rounded-full px-4 md:px-5 py-2 mono-label transition-colors ${
                  tab === t.id ? "text-background" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="showcase-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <AnimatePresence mode="wait">
            {tab === "projects" ? (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease }}
                className="grid grid-cols-1 gap-6 md:grid-cols-3"
              >
                {projects.map((p, i) => (
                  <motion.button
                    key={p.title}
                    type="button"
                    onClick={() => setActive(p)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                    className="group relative block overflow-hidden border border-hairline bg-background text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {/* Visual area */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/10">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                      {/* Top metadata */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="mono-label opacity-50">{p.idx}</span>
                        <span className="mono-label opacity-40 text-[10px] uppercase tracking-[0.2em]">
                          Project
                        </span>
                      </div>


                    </div>

                    {/* Content area */}
                    <div className="border-t border-hairline p-5">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="font-display text-2xl tracking-tight">
                            {p.title}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2 mono-label opacity-60 text-[10px]">
                            {p.stack.slice(0, 3).map((s, idx) => (
                              <span key={s} className="flex items-center gap-2">
                                {s}
                                {idx < 2 && idx < p.stack.slice(0, 3).length - 1 && (
                                  <span className="w-1 h-1 rounded-full bg-foreground/20" />
                                )}
                              </span>
                            ))}
                          </div>
                        </div>

                        <span className="flex items-center gap-1.5 text-accent text-xs font-bold tracking-widest uppercase mono-label group-hover:opacity-80 transition shrink-0">
                          VIEW
                          <svg
                            className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                          </svg>
                        </span>
                      </div>

                      {/* Bottom editorial line */}
                      <div className="mt-4 pt-3 border-t border-hairline flex justify-between mono-label opacity-40 text-[10px] uppercase tracking-widest">
                        <span className="truncate max-w-[70%]">{p.tagline}</span>
                        <span>Ref. {p.idx.replace("P-", "#")}</span>
                      </div>
                    </div>

                    {/* Hover accent line */}
                    <span className="absolute bottom-0 left-0 h-px w-full bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.button>
                ))}
              </motion.div>
            ) : tab === "certificates" ? (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {certificates.map((c, i) => (
                  <motion.button
                    key={c.idx}
                    type="button"
                    onClick={() => setActiveCert(c)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease, delay: i * 0.06 }}
                    className="group relative block overflow-hidden border border-hairline bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                      <img
                        src={c.image}
                        alt={`${c.title} — ${c.issuer}`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <p className="absolute top-3 left-3 mono-label opacity-70 text-black/70">{c.idx}</p>
                    </div>
                    <div className="flex items-end justify-between gap-3 p-5 bg-background border-t border-hairline">
                      <div className="min-w-0">
                        <p className="font-display text-lg md:text-xl tracking-tight truncate">{c.title}</p>
                        <p className="mono-label opacity-60 mt-1 truncate">{c.issuer} · {c.date}</p>
                      </div>
                      <span className="mono-label opacity-60 group-hover:opacity-100 group-hover:text-accent transition shrink-0">
                        VIEW ↗
                      </span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="stack"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="relative w-full h-[520px] md:h-[560px] overflow-hidden rounded-2xl border border-hairline bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]"
              >
                {/* soft grid */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                  }}
                />
                {stack.map((s) => (
                  <motion.div
                    key={s.name}
                    drag
                    dragElastic={0.6}
                    dragTransition={{ bounceStiffness: 120, bounceDamping: 12 }}
                    dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
                    initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: [-4, 4, -4],
                      y: [0, -14, 0, 12, 0],
                      x: [0, 8, 0, -6, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.6, delay: s.delay * 0.15, ease },
                      scale: { duration: 0.6, delay: s.delay * 0.15, ease },
                      rotate: { duration: 6 + s.delay, repeat: Infinity, ease: "easeInOut", delay: s.delay },
                      y: { duration: 8 + s.delay, repeat: Infinity, ease: "easeInOut", delay: s.delay },
                      x: { duration: 10 + s.delay, repeat: Infinity, ease: "easeInOut", delay: s.delay },
                    }}
                    whileHover={{ scale: 1.15, zIndex: 20 }}
                    whileTap={{ scale: 1.2, zIndex: 30, cursor: "grabbing" }}
                    whileDrag={{ scale: 1.25, zIndex: 40, rotate: 12 }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing touch-none"
                    style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
                  >
                    <div className="relative w-full h-full rounded-2xl border border-hairline bg-background/60 backdrop-blur-sm flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-colors group-hover:border-foreground/60 pointer-events-none">
                      <img
                        src={`https://cdn.simpleicons.org/${s.slug}/${s.color}`}
                        alt={s.name}
                        loading="lazy"
                        draggable={false}
                        className="w-1/2 h-1/2 object-contain select-none"
                      />
                    </div>
                    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-6 mono-label whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {s.name}
                    </span>
                  </motion.div>
                ))}

              </motion.div>

            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/85 backdrop-blur-md"
              onClick={() => setActive(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${active.title} case study`}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease }}
              className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto border border-hairline bg-background"
            >
              <div
                className="relative aspect-[16/9] w-full overflow-hidden border-b border-hairline"
                style={{ background: active.accent }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-4 md:p-10">
                  <div className="relative h-full w-full max-w-[92%] max-h-[86%] rounded-md overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10 bg-black">
                    <img
                      src={active.image}
                      alt={`${active.title} — screenshot`}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-8">
                  <div className="flex items-start justify-between">
                    <p className="mono-label">{active.idx}</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 h-9 w-9 rounded-full border border-hairline bg-background/70 backdrop-blur flex items-center justify-center hover:bg-background transition"
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              </div>

              <div className="p-5 md:p-10">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <p className="display-xl text-[clamp(1.8rem,5vw,3.2rem)] leading-none">
                    {active.title}
                  </p>
                  <p className="mono-label opacity-70 max-w-md md:text-right">{active.tagline}</p>
                </div>

                <div className="mt-8 grid grid-cols-12 gap-6 md:gap-8">
                  <div className="col-span-12 md:col-span-6">
                    <p className="mono-label">Problem</p>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                      {active.problem}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <p className="mono-label">Approach</p>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                      {active.approach}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <p className="mono-label">Stack</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {active.stack.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-hairline px-3 py-1 font-mono text-xs tracking-wide text-foreground/80"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <p className="mono-label">Result</p>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                      {active.result}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeCert && (
          <motion.div
            key="cert-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/85 backdrop-blur-md"
              onClick={() => setActiveCert(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${activeCert.title} certificate`}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease }}
              className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto border border-hairline bg-background"
            >
              <div className="relative w-full bg-white border-b border-hairline">
                <img
                  src={activeCert.image}
                  alt={`${activeCert.title} — ${activeCert.issuer}`}
                  className="block w-full h-auto object-contain"
                />
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setActiveCert(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 h-9 w-9 rounded-full border border-hairline bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition"
                >
                  <span className="text-lg leading-none">×</span>
                </button>
                <p className="absolute top-3 left-3 mono-label opacity-70 text-black/70">{activeCert.idx}</p>
              </div>
              <div className="p-5 md:p-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <p className="display-xl text-[clamp(1.4rem,4vw,2.4rem)] leading-tight">
                    {activeCert.title}
                  </p>
                  <p className="mono-label opacity-70">{activeCert.issuer} · {activeCert.date}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
