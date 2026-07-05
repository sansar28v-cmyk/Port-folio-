import { motion } from "framer-motion";
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

export function About() {
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

      <div className="container-editorial pt-24 md:pt-32 pb-24">
        {/* Header row */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <p className="mono-label">01 / About</p>
          <p className="mono-label opacity-50">Portrait · Practice · Principles</p>
        </div>

        {/* Top: ID card + big statement */}
        <div className="mt-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 flex md:block justify-center">
            <IDCard />
          </div>

          <div className="col-span-12 md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease }}
              className="display-xl text-[clamp(1.9rem,5vw,4.6rem)] leading-[0.98] tracking-tight max-w-5xl"
            >
              Second-year B.Tech in AI &amp; Data Science, building the{" "}
              <span className="italic font-light text-accent">fluent, useful</span>{" "}
              edges of intelligent software.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              I work as an AI-focused full-stack builder — pairing hands-on
              AI & ML internship experience with tool integration and machine
              learning foundations against real product surfaces. Currently
              open to internship opportunities where design, data, and
              engineering meet.
            </motion.p>

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
        <div className="mt-24 grid grid-cols-12 gap-6">
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

          <ol className="col-span-12 md:col-span-8 relative border-l border-hairline">
            {timeline.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className="group relative pl-8 pr-2 py-8 border-b border-hairline"
              >
                <span className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-foreground group-hover:bg-accent group-hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_25%,transparent)] transition-all" />
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <p className="mono-label opacity-50">
                    {t.year} · {t.tag}
                  </p>
                  <span className="mono-label opacity-40">
                    {String(i + 1).padStart(2, "0")} / {timeline.length}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tight group-hover:text-accent transition-colors">
                  {t.title}
                </h3>
                <p className="mt-2 text-muted-foreground max-w-xl">{t.detail}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Principles */}
        <div className="mt-24">
          <div className="flex items-end justify-between gap-6 border-b border-hairline pb-4">
            <p className="mono-label">B · Operating principles</p>
            <p className="mono-label opacity-40">03 rules</p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className="group relative border border-hairline p-8 overflow-hidden"
              >
                <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-foreground/40" />
                <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-foreground/40" />
                <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-foreground/40" />
                <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-foreground/40" />

                <p className="mono-label opacity-50 tabular-nums">{p.n}</p>
                <h3 className="mt-4 font-display text-2xl tracking-tight group-hover:text-accent transition-colors">
                  {p.t}
                </h3>
                <p className="mt-3 text-muted-foreground">{p.d}</p>

                <span className="mt-6 block h-px w-0 bg-accent group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
