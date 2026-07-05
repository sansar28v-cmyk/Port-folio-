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

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease, delay: index * 0.06 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative overflow-hidden"
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
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative grid grid-cols-12 items-center gap-4 py-6">
        {/* Index */}
        <span className="col-span-2 md:col-span-1 mono-label opacity-40 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Name + detail */}
        <div className="col-span-10 md:col-span-5">
          <p
            className={
              "font-display text-2xl md:text-3xl tracking-tight transition-colors duration-300 " +
              (hover ? "text-accent italic font-light" : "text-foreground")
            }
          >
            {item.name}
          </p>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            {item.detail}
          </p>
        </div>

        {/* Meter */}
        <div className="col-span-8 md:col-span-4">
          <div className="flex items-center justify-between mono-label opacity-50">
            <span>Proficiency</span>
            <span className="tabular-nums text-foreground/80">{item.level}</span>
          </div>
          <div className="mt-2 h-px w-full bg-foreground/10 relative overflow-hidden">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: item.level / 100 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease, delay: 0.2 + index * 0.05 }}
              style={{ transformOrigin: "left" }}
              className="absolute inset-0 bg-foreground group-hover:bg-accent transition-colors"
            />
          </div>
          {/* Stack chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.stack.map((s) => (
              <span
                key={s}
                className="mono-label border border-hairline px-2 py-1 opacity-60 group-hover:opacity-100 group-hover:border-foreground/40 transition-all"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Years + arrow */}
        <div className="col-span-4 md:col-span-2 flex items-center justify-end gap-4">
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
      <span className="absolute bottom-0 left-0 h-px w-full bg-hairline" />
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleX: hover ? 1 : 0 }}
        transition={{ duration: 0.5, ease }}
        style={{ transformOrigin: "left" }}
        className="absolute bottom-0 left-0 h-px w-full bg-accent"
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

      <div className="container-editorial pt-24 pb-24">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-4">
            <p className="mono-label">03 / Capabilities</p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease }}
              className="mt-6 display-xl text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-tight"
            >
              What I<br />
              <span className="italic font-light text-accent">work with.</span>
            </motion.h2>
          </div>

          <div className="col-span-12 md:col-span-8 md:pl-10">
            <p className="text-muted-foreground max-w-lg">
              A working system, not a laundry list — the disciplines, tools and
              techniques I reach for daily to ship AI-native products end to end.
            </p>

            {/* Stats bar */}
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-hairline pt-6">
              <div>
                <p className="mono-label opacity-50">Disciplines</p>
                <p className="mt-2 font-display text-3xl tracking-tight tabular-nums">
                  {String(totalCount).padStart(2, "0")}
                </p>
              </div>
              <div>
                <p className="mono-label opacity-50">Avg. proficiency</p>
                <p className="mt-2 font-display text-3xl tracking-tight tabular-nums">
                  {avgLevel}
                  <span className="text-lg opacity-50">/100</span>
                </p>
              </div>
              <div>
                <p className="mono-label opacity-50">Focus</p>
                <p className="mt-2 font-display text-3xl tracking-tight">
                  AI × Web
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Groups */}
        <div className="mt-20 space-y-20">
          {groups.map((g, gi) => (
            <div key={g.label} className="grid grid-cols-12 gap-6">
              {/* Sticky group header */}
              <div className="col-span-12 md:col-span-3">
                <div className="md:sticky md:top-24">
                  <div className="flex items-center gap-2 mono-label opacity-50">
                    <span>0{gi + 1}</span>
                    <span className="h-px w-8 bg-foreground/30" />
                    <span>{g.tag}</span>
                  </div>
                  <p className="mt-4 font-display text-2xl tracking-tight">
                    {g.label}
                  </p>
                  <p className="mt-3 mono-label opacity-40 tabular-nums">
                    {g.items.length.toString().padStart(2, "0")} entries
                  </p>
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
