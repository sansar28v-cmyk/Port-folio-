import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import linkedinIcon from "@/assets/social/linkedin.png";
import githubIcon from "@/assets/social/github.png";
import instagramIcon from "@/assets/social/instagram.png";

const ease = [0.7, 0, 0.2, 1] as const;

const whatsappMsg = encodeURIComponent(
  "Hi Sandeep — saw your portfolio and would love to chat.",
);
const whatsappHref = `https://wa.me/917806844061?text=${whatsappMsg}`;

type Social = {
  label: string;
  href: string;
  handle: string;
  icon: string;
};

const socials: Social[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sandeep-v-5b7351375",
    handle: "/in/sandeep-v",
    icon: linkedinIcon,
  },
  { label: "GitHub", href: "https://github.com/sansar28v-cmyk", handle: "@sansar28v-cmyk", icon: githubIcon },
  { label: "Instagram", href: "https://www.instagram.com/peace._.ig?igsh=bTM5dHRqbXBkY3Fi", handle: "@peace._.ig", icon: instagramIcon },
];

function useIndiaClock() {
  const [time, setTime] = useState<string>("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function MagneticButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="group relative inline-flex items-center gap-4 rounded-full bg-foreground pl-8 pr-4 py-4 text-background font-medium overflow-hidden"
    >
      <span className="relative z-10 text-base tracking-tight">{children}</span>
      <span className="relative z-10 grid place-items-center h-10 w-10 rounded-full bg-background text-foreground transition-transform group-hover:rotate-[-45deg]">
        →
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out group-hover:translate-x-0"
      />
    </motion.a>
  );
}

export function Contact() {
  const time = useIndiaClock();
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const bgX = useTransform(mx, (v) => `${v}%`);
  const bgY = useTransform(my, (v) => `${v}%`);

  return (
    <section id="contact" ref={containerRef} className="relative z-10 overflow-hidden">
      {/* Ambient aurora that follows cursor */}
      <motion.div
        aria-hidden
        onMouseMove={(e) => {
          const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width) * 100);
          my.set(((e.clientY - r.top) / r.height) * 100);
        }}
        className="pointer-events-auto absolute inset-0 -z-10"
        style={{
          background: useTransform(
            [bgX, bgY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x} ${y}, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%)`,
          ) as unknown as string,
        }}
      />
      {/* Grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
        }}
      />

      <div className="container-editorial pt-32 pb-16">
        {/* Header row */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <p className="mono-label">05 / Contact</p>
          <div className="flex items-center gap-4 mono-label">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available — Q3 · 2026
            </span>
            <span className="opacity-40">·</span>
            <span className="tabular-nums">IST {time}</span>
          </div>
        </div>

        {/* Giant kinetic headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease }}
          className="mt-10 display-xl text-[clamp(2.6rem,12vw,11rem)] leading-[0.86] tracking-tight"
        >
          LET'S BUILD
          <br />
          <span className="inline-flex items-baseline gap-4 md:gap-8">
            <span className="italic font-light text-accent">something</span>
            <span className="inline-block h-[0.12em] w-[1em] bg-foreground/40 align-middle" />
          </span>
          <br />
          TOGETHER<span className="text-accent">.</span>
        </motion.h2>

        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          Have an idea, project, or collaboration in mind? Send a message and
          let's craft something clean, modern and unmistakably yours.
        </p>

        {/* Main grid */}
        <div className="mt-20 grid grid-cols-12 gap-6">
          {/* WhatsApp — hero card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease }}
            className="col-span-12 md:col-span-7 relative border border-hairline p-8 md:p-12 overflow-hidden group"
          >
            {/* Corner ticks */}
            <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-foreground/40" />
            <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-foreground/40" />
            <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-foreground/40" />
            <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-foreground/40" />
            {/* Sheen */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-1 bg-[linear-gradient(120deg,transparent_30%,color-mix(in_oklab,var(--accent)_18%,transparent)_50%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.6)]" />
              <p className="mono-label">Direct · WhatsApp</p>
              <span className="mx-2 h-px w-10 bg-foreground/20" />
              <p className="mono-label opacity-50">Fastest reply</p>
            </div>

            <h3 className="mt-8 font-display text-4xl md:text-6xl tracking-tight leading-[0.95]">
              Send a <span className="italic font-light text-accent">message</span>
              <br />
              in one tap.
            </h3>
            <p className="mt-5 text-muted-foreground max-w-md">
              Opens directly in WhatsApp — no forms, no spam, just a real
              conversation. Usually a reply within a few hours.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton href={whatsappHref}>Start the chat</MagneticButton>
              <div className="flex items-center gap-3 mono-label opacity-60">
                <span className="h-px w-8 bg-foreground/30" />
                or scroll ↓ for direct lines
              </div>
            </div>

            {/* Meta strip */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-hairline pt-6">
              {[
                { k: "Response", v: "< 4 hrs" },
                { k: "Timezone", v: "IST · GMT+5:30" },
                { k: "Booking", v: "Open" },
              ].map((m) => (
                <div key={m.k}>
                  <p className="mono-label opacity-50">{m.k}</p>
                  <p className="mt-2 font-display text-lg tracking-tight">{m.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
            {/* Direct lines */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease, delay: 0.05 }}
              className="border border-hairline p-8"
            >
              <p className="mono-label">Direct lines</p>
              <a
                href="mailto:sansar28v@gmail.com"
                className="group mt-5 flex items-center justify-between gap-4 border-b border-hairline pb-4"
              >
                <div>
                  <p className="mono-label opacity-50">Email</p>
                  <p className="mt-1 font-display text-xl tracking-tight group-hover:text-accent transition-colors">
                    sansar28v@gmail.com
                  </p>
                </div>
                <span className="mono-label opacity-40 group-hover:opacity-100 group-hover:text-accent transition-opacity">↗</span>
              </a>
              <a
                href="tel:+917806844061"
                className="group mt-4 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="mono-label opacity-50">Phone</p>
                  <p className="mt-1 font-display text-xl tracking-tight group-hover:text-accent transition-colors tabular-nums">
                    +91 78068 44061
                  </p>
                </div>
                <span className="mono-label opacity-40 group-hover:opacity-100 group-hover:text-accent transition-opacity">↗</span>
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="border border-hairline p-8"
            >
              <div className="flex items-center justify-between">
                <p className="mono-label">Follow</p>
                <p className="mono-label opacity-40">03 channels</p>
              </div>
              <ul className="mt-5 flex flex-col divide-y divide-hairline">
                {socials.map((s, i) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-4 py-4"
                    >
                      <span className="mono-label opacity-40 w-8 tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="grid place-items-center h-10 w-10 border border-hairline rounded-full group-hover:border-accent transition-colors overflow-hidden bg-background">
                        <img src={s.icon} alt={s.label} className="w-full h-full object-cover" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-lg tracking-tight group-hover:text-accent transition-colors">
                          {s.label}
                        </span>
                        <span className="block mono-label opacity-40">
                          {s.handle}
                        </span>
                      </span>
                      <span className="mono-label opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-24 border-y border-hairline overflow-hidden">
          <motion.div
            className="flex gap-16 py-6 whitespace-nowrap font-display text-4xl md:text-6xl tracking-tight"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {Array.from({ length: 2 }).flatMap((_, r) =>
              [
                "AVAILABLE FOR WORK",
                "★",
                "FREELANCE · FULL-TIME",
                "★",
                "BASED IN INDIA",
                "★",
                "REMOTE WORLDWIDE",
                "★",
              ].map((w, i) => (
                <span
                  key={`${r}-${i}`}
                  className={i % 2 === 1 ? "text-accent" : "text-foreground/80"}
                >
                  {w}
                </span>
              )),
            )}
          </motion.div>
        </div>
      </div>

      <footer className="container-editorial hairline mt-8 flex flex-col gap-3 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <span className="mono-label">© 2026 Sandeep — All rights reserved</span>
        <span className="mono-label">Designed &amp; built in-house · IST {time}</span>
      </footer>
    </section>
  );
}
