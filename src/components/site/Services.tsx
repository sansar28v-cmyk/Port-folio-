import { motion } from "framer-motion";

const ease = [0.7, 0, 0.2, 1] as const;

const services = [
  { title: "Web Development", desc: "Full-stack builds from concept to deployment." },
  { title: "Social Media Management", desc: "Content strategy and platform management." },
  { title: "Design", desc: "Visual identity and UI design." },
  { title: "Digital Marketing", desc: "Growth-focused campaigns and outreach." },
];

export function Services() {
  return (
    <section id="services" className="relative z-10">
      <div className="container-editorial grid grid-cols-12 gap-6 py-24">
        <div className="col-span-12 md:col-span-3">
          <p className="mono-label">04 / Freelance</p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="display-xl text-[clamp(2rem,4vw,3.4rem)] max-w-3xl">
            Services, on request.
          </h2>
          <ul className="mt-16">
            {services.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease, delay: i * 0.06 }}
                className="hairline flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:justify-between md:gap-16"
              >
                <div className="flex items-baseline gap-6">
                  <span className="mono-label opacity-40">0{i + 1}</span>
                  <span className="font-display text-2xl md:text-4xl tracking-tight">
                    {s.title}
                  </span>
                </div>
                <p className="text-muted-foreground md:max-w-sm md:text-right">{s.desc}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
