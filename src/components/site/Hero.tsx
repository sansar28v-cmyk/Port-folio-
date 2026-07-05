import { useEffect, useRef, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Scene = lazy(() => import("./Scene").then((m) => ({ default: m.Scene })));

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nameRef.current || !heroRef.current) return;
    const ctx = gsap.context(() => {
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
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative z-10 min-h-[100svh] w-full overflow-hidden">
      {/* 3D behind text */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>






      {/* meta top — pushed below fixed header */}
      <div className="container-editorial relative z-20 flex items-start justify-between pt-24 md:pt-28">
        <span className="mono-label opacity-60">Independent practice · Est. 2024</span>
        <span className="mono-label hidden md:inline opacity-60">Chennai, IN → Everywhere</span>
      </div>

      {/* Massive name — bleeds off screen */}
      <div className="relative z-20 flex min-h-[80svh] md:min-h-[85svh] flex-col justify-end pb-12 md:pb-16">
        <h1
          ref={nameRef}
          className="display-xl select-none whitespace-nowrap px-[2vw] text-[18vw] md:text-[22vw] leading-[0.82] mix-blend-difference"
          style={{ letterSpacing: "-0.04em" }}
          aria-label="Sandeep"
        >
          SANDEEP
        </h1>
        <div className="container-editorial mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="mono-label max-w-md">
            AI ENGINEER<br className="hidden md:block" />
            <span className="opacity-60"> — </span>BUILDING AI-POWERED PRODUCTS, FULL-STACK
          </p>
          <div className="mono-label flex items-center gap-2 opacity-70">
            <span className="inline-block h-px w-6 bg-current" />
            SCROLL
          </div>
        </div>
      </div>
    </section>
  );
}
