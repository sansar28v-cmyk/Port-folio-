import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
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

// Organized tech stack for professional bento grid
const stackCategories = [
  {
    title: "AI & Machine Learning",
    items: [
      { name: "Python", slug: "python", color: "3776AB" },
      { name: "Flask", slug: "flask", color: "FFFFFF" },
      { name: "OpenCV", slug: "opencv", color: "5C3EE8" },
      { name: "Ollama", slug: "ollama", color: "FFFFFF" },
      { name: "OpenRouter", slug: "openrouter", color: "5E5CE6" },
    ]
  },
  {
    title: "Frontend Engineering",
    items: [
      { name: "React", slug: "react", color: "61DAFB" },
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
      { name: "HTML5", slug: "html5", color: "E34F26" },
      { name: "CSS3", slug: "css", color: "1572B6" },
    ]
  },
  {
    title: "Backend & Infrastructure",
    items: [
      { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
      { name: "Vite", slug: "vite", color: "646CFF" },
      { name: "Git", slug: "git", color: "F05032" },
      { name: "Vercel", slug: "vercel", color: "FFFFFF" },
      { name: "Netlify", slug: "netlify", color: "00C7B7" },
      { name: "Google Maps", slug: "googlemaps", color: "4285F4" },
    ]
  }
];

function TiltCard({ children, className, onClick, style, ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || window.innerWidth < 768) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
      className={className}
      {...props}
    >
      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 rounded-[2rem] opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            ([mx, my]) => {
              const px = (mx + 0.5) * 100;
              const py = (my + 0.5) * 100;
              return `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.08) 0%, transparent 50%)`;
            }
          ) as any,
        }}
      />
      {children}
    </motion.button>
  );
}

export function Showcase() {
  const isMobile = useIsMobile();
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
    <section id="showcase" className={`relative ${active || activeCert ? 'z-[100]' : 'z-10'}`}>
      <div className="container-editorial py-12 md:py-20">
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

          <div className="w-full md:w-auto -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <div className="inline-flex rounded-full border border-hairline p-1 self-start md:self-auto whitespace-nowrap min-w-max md:min-w-0">
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
        </div>

        <div className="mt-14" style={{ perspective: "1200px" }}>
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
                  <TiltCard
                    key={p.title}
                    onClick={() => setActive(p)}
                    initial={{ opacity: 0, y: 24, rotateX: -30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                    style={{ transformOrigin: "bottom" }}
                    className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-2 text-left md:backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05] hover:shadow-[0_20px_40px_-15px_rgba(0,240,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {/* Visual area */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] bg-black">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Top metadata */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="mono-label opacity-70 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">{p.idx}</span>
                        <span className="mono-label opacity-70 text-[10px] uppercase tracking-[0.2em] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
                          Project
                        </span>
                      </div>


                    </div>

                    {/* Content area */}
                    <div className="p-5 pt-6">
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
                      <div className="mt-8 pt-3 border-t border-hairline flex justify-between mono-label opacity-40 text-[10px] uppercase tracking-widest">
                        <span className="truncate max-w-[70%]">{p.tagline}</span>
                        <span>Ref. {p.idx.replace("P-", "#")}</span>
                      </div>
                    </div>

                      {/* Hover accent line */}
                      <span className="absolute bottom-0 left-1/2 h-1 w-1/3 -translate-x-1/2 rounded-t-full bg-accent opacity-0 group-hover:opacity-100 group-hover:w-1/2 transition-all duration-500" />
                  </TiltCard>
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
                  <TiltCard
                    key={c.idx}
                    onClick={() => setActiveCert(c)}
                    initial={{ opacity: 0, y: 24, rotateX: -30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                    style={{ transformOrigin: "bottom" }}
                    className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-2 text-left md:backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05] hover:shadow-[0_20px_40px_-15px_rgba(0,240,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-white/95 p-4 flex items-center justify-center">
                      <img
                        src={c.image}
                        alt={`${c.title} — ${c.issuer}`}
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03] drop-shadow-md"
                      />
                      <p className="absolute top-4 left-4 mono-label opacity-80 bg-black/10 backdrop-blur-sm px-3 py-1 rounded-full text-black">{c.idx}</p>
                    </div>
                    <div className="flex items-end justify-between gap-3 p-5 pt-6">
                      <div className="min-w-0">
                        <p className="font-display text-lg md:text-xl tracking-tight truncate">{c.title}</p>
                        <p className="mono-label opacity-60 mt-2 truncate">{c.issuer} · {c.date}</p>
                      </div>
                      <span className="mono-label opacity-60 group-hover:opacity-100 group-hover:text-accent transition shrink-0 bg-white/5 p-2 rounded-full">
                        ↗
                      </span>
                    </div>
                  </TiltCard>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {stackCategories.map((category, i) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 24, rotateX: -30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                    style={{ transformOrigin: "bottom" }}
                    className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8 md:backdrop-blur-md hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <span className="mono-label opacity-40">0{i + 1}</span>
                      <h3 className="font-display text-xl tracking-tight text-foreground/90">{category.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                      {category.items.map((item) => (
                        <motion.div
                          key={item.name}
                          whileHover={{ scale: 1.05 }}
                          className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-black/20 p-4 transition-colors hover:bg-white/10 hover:border-white/20 shadow-lg"
                        >
                          <div className="relative flex h-10 w-10 items-center justify-center grayscale transition-all duration-300 group-hover:grayscale-0">
                            <img
                              src={`https://cdn.simpleicons.org/${item.slug}/${item.color}`}
                              alt={item.name}
                              loading="lazy"
                              className="h-full w-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            />
                          </div>
                          <span className="mono-label text-[10px] opacity-70 transition-opacity group-hover:opacity-100 text-center truncate w-full">
                            {item.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${active.title} case study`}
              data-lenis-prevent="true"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease }}
              className="relative z-10 w-full max-w-4xl max-h-[85svh] overflow-y-auto overscroll-contain rounded-[2rem] border border-white/10 bg-background shadow-2xl"
            >
              <div
                className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10"
                style={{ background: active.accent }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-4 md:p-10">
                  <div className="relative h-full w-full max-w-[92%] max-h-[86%] rounded-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10 bg-black">
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
                  className="absolute top-4 right-4 md:top-6 md:right-6 h-10 w-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition text-white z-50"
                >
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>

              <div className="p-6 md:p-12">
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setActiveCert(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${activeCert.title} certificate`}
              data-lenis-prevent="true"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease }}
              className="relative z-10 w-full max-w-3xl max-h-[85svh] overflow-y-auto overscroll-contain rounded-[2rem] border border-white/10 bg-background shadow-2xl flex flex-col"
            >
              <div className="relative w-full bg-white border-b border-white/10 p-4 md:p-8 flex justify-center shrink-0">
                <img
                  src={activeCert.image}
                  alt={`${activeCert.title} — ${activeCert.issuer}`}
                  className="block w-full h-auto object-contain"
                />
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setActiveCert(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 h-10 w-10 rounded-full border border-black/10 bg-black/5 backdrop-blur-md flex items-center justify-center hover:bg-black/10 transition text-black z-50"
                >
                  <span className="text-xl leading-none">×</span>
                </button>
                <p className="absolute top-4 left-4 mono-label opacity-70 bg-black/10 backdrop-blur-sm px-3 py-1 rounded-full text-black">{activeCert.idx}</p>
              </div>
              <div className="p-6 md:p-10">
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
