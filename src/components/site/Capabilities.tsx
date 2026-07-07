import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.7, 0, 0.2, 1] as const;

type Capability = {
  name: string;
  detail: string;
  level: number; // 0 – 100
  years: string;
  stack: string[];
};

type Group = {
  label: string;
  tag: string;
  items: Capability[];
};

const groups: Group[] = [
  {
    label: "AI & Machine Learning",
    tag: "Intelligence",
    items: [
      {
        name: "AI Engineering",
        detail: "LLM pipelines, RAG, agentic flows, evaluation.",
        level: 92,
        years: "2y",
        stack: ["OpenAI", "LangChain", "Gemini", "Vector DBs"],
      },
      {
        name: "Machine Learning",
        detail: "Classic ML, model training, feature engineering.",
        level: 84,
        years: "2y",
        stack: ["scikit-learn", "PyTorch", "Pandas"],
      },
      {
        name: "Data Analytics & Science",
        detail: "Exploration, storytelling, dashboards, insight.",
        level: 88,
        years: "3y",
        stack: ["NumPy", "Pandas", "SQL", "Jupyter"],
      },
    ],
  },
  {
    label: "Development",
    tag: "Craft",
    items: [
      {
        name: "AI-Powered Web Development",
        detail: "Modern React + AI-native product surfaces.",
        level: 90,
        years: "3y",
        stack: ["React", "TypeScript", "Tailwind", "Motion"],
      },
      {
        name: "API Integration",
        detail: "REST, webhooks, third-party orchestration.",
        level: 86,
        years: "3y",
        stack: ["Node", "REST", "Webhooks", "Auth"],
      },
      {
        name: "Python",
        detail: "Automation, backends, data & AI tooling.",
        level: 89,
        years: "4y",
        stack: ["FastAPI", "Requests", "Async"],
      },
    ],
  },
  {
    label: "Tools & Visualization",
    tag: "Signal",
    items: [
      {
        name: "Tableau",
        detail: "Executive dashboards & analytical storytelling.",
        level: 78,
        years: "1y",
        stack: ["Tableau", "SQL", "Excel"],
      },
    ],
  },
];

function CapabilityRow({ item, index }: { item: Capability; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 250, damping: 25 });
  const sy = useSpring(my, { stiffness: 250, damping: 25 });
  const bgX = useTransform(sx, (v) => `${v}px`);
  const bgY = useTransform(sy, (v) => `${v}px`);
  
  // 3D Tilt calculation based on mouse position relative to the center of the row
  const rotateX = useTransform(sy, [0, 100], [5, -5]);
  const rotateY = useTransform(sx, [0, 800], [-2, 2]);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease, delay: index * 0.06 }}
      onMouseMove={(e) => {
        if (window.innerWidth < 768) return;
        const r = ref.current!.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        // Reset tilt gently on leave
        mx.set(400); // approximate center X
        my.set(50);  // approximate center Y
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative overflow-hidden transition-all duration-300 hover:z-10"
    >
      {/* cursor spotlight */}
      <motion.span
        aria-hidden
        style={{
          background: useTransform(
            [bgX, bgY],
            ([x, y]) =>
              `radial-gradient(240px circle at ${x} ${y}, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%)`,
          ) as unknown as string,
        }}
        className="hidden md:block pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative grid grid-cols-12 items-start md:items-center gap-4 py-5 md:py-6 bg-black/10 md:bg-transparent md:backdrop-blur-none rounded-xl md:rounded-none px-4 md:px-0 mb-4 md:mb-0 border border-hairline/50 md:border-transparent md:mb-0">
        {/* Index */}
        <span className="col-span-12 md:col-span-1 mono-label opacity-40 tabular-nums hidden md:block">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Name + detail */}
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center justify-between md:hidden">
            <span className="mono-label text-[10px] opacity-40 tabular-nums bg-white/10 px-2 py-0.5 rounded-full">
              {String(index + 1).padStart(2, "0")} / {item.years}
            </span>
            <span className="mono-label text-[10px] text-accent opacity-80">
              PROFICIENCY: {item.level}
            </span>
          </div>
          <p
            className={
              "font-display text-[1.4rem] md:text-3xl tracking-tight transition-colors duration-300 mt-2 md:mt-0 " +
              (hover ? "text-accent italic font-light" : "text-foreground")
            }
          >
            {item.name}
          </p>
          <p className="mt-1 md:mt-2 text-sm text-muted-foreground/90 max-w-md">
            {item.detail}
          </p>
        </div>

        {/* Meter */}
        <div className="col-span-12 md:col-span-4 mt-2 md:mt-0">
          <div className="hidden md:flex items-center justify-between mono-label opacity-50">
            <span>Proficiency</span>
            <span className="tabular-nums text-foreground/80">{item.level}</span>
          </div>
          <div className="mt-2 h-1 md:h-px w-full bg-foreground/10 md:bg-foreground/10 relative overflow-hidden rounded-full md:rounded-none">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: item.level / 100 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease, delay: 0.2 + index * 0.05 }}
              style={{ transformOrigin: "left" }}
              className="absolute inset-0 bg-accent md:bg-foreground group-hover:bg-accent transition-colors"
            />
          </div>
          {/* Stack chips */}
          <div className="mt-4 md:mt-3 flex flex-wrap gap-1.5">
            {item.stack.map((s) => (
              <span
                key={s}
                className="mono-label bg-white/5 md:bg-transparent border border-hairline/40 md:border-hairline px-2 py-1 opacity-70 md:opacity-60 group-hover:opacity-100 group-hover:border-foreground/40 transition-all text-[10px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Years + arrow */}
        <div className="hidden md:flex col-span-4 md:col-span-2 items-center justify-end gap-4">
          <span className="mono-label opacity-50 tabular-nums">{item.years}</span>
          <motion.span
            animate={{ x: hover ? 4 : 0, rotate: hover ? -45 : 0 }}
            transition={{ duration: 0.4, ease }}
            className="grid place-items-center h-8 w-8 rounded-full border border-hairline group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors"
          >
            →
          </motion.span>
        </div>
      </div>

      {/* Bottom hairline that fills on hover */}
      <span className="hidden md:block absolute bottom-0 left-0 h-px w-full bg-hairline" />
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleX: hover ? 1 : 0 }}
        transition={{ duration: 0.5, ease }}
        style={{ transformOrigin: "left" }}
        className="hidden md:block absolute bottom-0 left-0 h-px w-full bg-accent"
      />
    </motion.li>
  );
}

export function Capabilities() {
  const totalCount = groups.reduce((n, g) => n + g.items.length, 0);
  const avgLevel = Math.round(
    groups.flatMap((g) => g.items.map((i) => i.level)).reduce((a, b) => a + b, 0) /
      totalCount,
  );

  return (
    <section id="capabilities" className="relative z-10 overflow-hidden">
      {/* Ambient grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
        }}
      />

      <div className="container-editorial py-12 md:py-20">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-4">
            <p className="mono-label text-left">03 / Capabilities</p>
            <div style={{ perspective: "1000px" }}>
              <motion.h2
                initial={{ opacity: 0, y: 40, rotateX: -45, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "bottom" }}
                className="mt-6 display-xl text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-tight text-left"
              >
                What I<br />
                <span className="italic font-light text-accent">work with.</span>
              </motion.h2>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 md:pl-10">
            <p className="text-muted-foreground max-w-lg text-left">
              A working system, not a laundry list — the disciplines, tools and
              techniques I reach for daily to ship AI-native products end to end.
            </p>

            {/* Stats bar */}
            <div style={{ perspective: "800px" }}>
              <motion.div 
                initial={{ opacity: 0, y: 20, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{ transformOrigin: "top" }}
                className="mt-8 grid grid-cols-3 gap-4 md:gap-6 border-t border-hairline pt-6"
              >
                <div className="flex flex-col h-full">
                  <p className="mono-label opacity-50">Disciplines</p>
                  <p className="mt-auto pt-2 font-display text-[clamp(1.5rem,4vw,1.875rem)] tracking-tight tabular-nums">
                    {String(totalCount).padStart(2, "0")}
                  </p>
                </div>
                <div className="flex flex-col h-full">
                  <p className="mono-label opacity-50">Avg. proficiency</p>
                  <p className="mt-auto pt-2 font-display text-[clamp(1.5rem,4vw,1.875rem)] tracking-tight tabular-nums whitespace-nowrap">
                    {avgLevel}
                    <span className="text-sm md:text-lg opacity-50">/100</span>
                  </p>
                </div>
                <div className="flex flex-col h-full">
                  <p className="mono-label opacity-50">Focus</p>
                  <p className="mt-auto pt-2 font-display text-[clamp(1.5rem,4vw,1.875rem)] tracking-tight whitespace-nowrap">
                    AI × Web
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Groups */}
        <div className="mt-12 md:mt-16 space-y-12 md:space-y-16">
          {groups.map((g, gi) => (
            <div key={g.label} className="grid grid-cols-12 gap-6">
              {/* Sticky group header */}
              <div className="col-span-12 md:col-span-3">
                <div className="md:sticky md:top-24" style={{ perspective: "1000px" }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20, rotateX: -30 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "bottom" }}
                  >
                    <div className="flex items-center gap-2 mono-label opacity-50 justify-start">
                      <span>0{gi + 1}</span>
                      <span className="h-px w-8 bg-foreground/30" />
                      <span>{g.tag}</span>
                    </div>
                    <p className="mt-4 font-display text-2xl tracking-tight text-left">
                      {g.label}
                    </p>
                    <p className="mt-3 mono-label opacity-40 tabular-nums text-left">
                      {g.items.length.toString().padStart(2, "0")} entries
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-9">
                <ul className="border-t border-hairline">
                  {g.items.map((item, i) => (
                    <CapabilityRow key={item.name} item={item} index={i} />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
