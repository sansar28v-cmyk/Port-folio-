import { useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Scene = lazy(() => import("./Scene").then((m) => ({ default: m.Scene })));

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const isMobile = useIsMobile();
  const nameRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nameRef.current || !heroRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(introRef.current, {
        yPercent: -100,
        rotationX: 35,
        z: -100,
        opacity: 0,
        transformOrigin: "bottom center",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=70%",
          scrub: 1.2,
        },
      });

      gsap.to(nameRef.current, {
        scale: 0.14,
        xPercent: -38,
        yPercent: -46,
        transformOrigin: "left top",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1.2,
          pin: false,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.to(introRef.current, {
        yPercent: -50,
        rotationX: 25,
        opacity: 0,
        transformOrigin: "bottom center",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=50%",
          scrub: true,
        },
      });

      // On mobile, just do a very subtle, performant transform without scrub or keep it static
      gsap.to(nameRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=50%",
          scrub: true, // Only scrubbing a tiny Y translation is very cheap compared to scale and multi-axis
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative z-10 min-h-[100svh] w-full overflow-hidden">
      {/* 3D behind text */}
      <div className="absolute inset-0 z-0">
        <div className="md:hidden absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_80%)]" />
        <Suspense fallback={null}>
          <div className="absolute inset-0">
            <Scene />
          </div>
        </Suspense>
      </div>






      {/* meta top — pushed below fixed header */}
      <div className="container-editorial relative z-20 flex items-start justify-between pt-24 md:pt-28">
        <span className="mono-label opacity-60">Independent practice · Est. 2024</span>
        <span className="mono-label hidden md:inline opacity-60">Chennai, IN → Everywhere</span>
      </div>

      {/* Massive name — bleeds off screen */}
      <div className="relative z-20 flex min-h-[80svh] md:min-h-[85svh] flex-col justify-end pb-12 md:pb-16">
        {/* Intro text, sits right above the massive name */}
        <div className="w-full px-[4vw] md:px-[2vw] mb-3 md:mb-5" style={{ perspective: "1200px" }}>
          <motion.div initial={{ opacity: 0, y: 40, rotateX: -60, scale: 0.9 }} animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} style={{ transformOrigin: "bottom center" }}>
            <div ref={introRef} className="flex flex-col items-start origin-bottom">
              <div className="flex items-center gap-3 mono-label text-accent opacity-90 mb-3 md:mb-4">
                <span className="h-px w-8 bg-accent" />
                <span>INTRODUCTION</span>
              </div>
              <p className="font-display text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.9] tracking-tighter bg-gradient-to-br from-white via-white/90 to-white/30 bg-clip-text text-transparent">
                Hello, I'm
              </p>
            </div>
          </motion.div>
        </div>

        <div style={{ perspective: "1200px" }}>
          <motion.div initial={{ opacity: 0, y: 30, rotateX: -40, scale: 0.95 }} animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: "bottom center" }}>
            <h1
              ref={nameRef}
              className={`display-xl select-none whitespace-nowrap px-[4vw] md:px-[2vw] text-[18vw] md:text-[22vw] leading-[0.82] ${isMobile ? 'text-foreground' : 'mix-blend-difference'}`}
              style={{ letterSpacing: "-0.04em" }}
              aria-label="Sandeep"
            >
              SANDEEP
            </h1>
          </motion.div>
        </div>
        <div className="container-editorial mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="mono-label max-w-md text-left leading-relaxed">
            <span className="block md:inline">AI ENGINEER</span>
            <span className="hidden md:inline opacity-60"> — </span>
            <span className="block md:inline mt-1 md:mt-0 opacity-60">BUILDING AI-POWERED PRODUCTS, FULL-STACK</span>
          </p>
          <div className="mono-label flex items-center gap-2 opacity-70 self-start md:self-auto">
            <span className="inline-block h-px w-6 bg-current" />
            SCROLL
          </div>
        </div>
      </div>
    </section>
  );
}
