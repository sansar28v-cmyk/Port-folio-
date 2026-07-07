import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import idCardImg from "@/assets/id-card-transparent.png";

/**
 * Draggable ID card. The full lanyard + card is a single image pinned at
 * the top; dragging swings it from that anchor with spring physics and it
 * settles back to rest when released.
 */
export function IDCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateRaw = useTransform(x, [-220, 220], [-24, 24]);
  const rotate = useSpring(rotateRaw, { stiffness: 90, damping: 9, mass: 0.9 });
  
  const rotateXRaw = useTransform(y, [-120, 120], [25, -25]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 90, damping: 9, mass: 0.9 });
  const rotateYRaw = useTransform(x, [-220, 220], [-15, 15]);
  const rotateY = useSpring(rotateYRaw, { stiffness: 90, damping: 9, mass: 0.9 });

  return (
    <motion.div 
      initial={{ rotateX: -110, y: -50, opacity: 0 }}
      animate={{ rotateX: 0, y: 0, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.5, duration: 1.8, delay: 0.1 }}
      style={{ transformOrigin: "top center", perspective: 1200 }}
      className="relative mx-auto flex w-full max-w-[240px] flex-col items-center"
    >
      {/* Fixed anchor dot — the lanyard hangs from this point */}
      <div className="relative z-30 h-3 w-3 rounded-full bg-white shadow-[0_0_0_2px_hsl(var(--background)),0_0_12px_2px_hsl(var(--primary)/0.35)]" />

      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        dragConstraints={{ left: -180, right: 180, top: 0, bottom: 120 }}
        dragTransition={{ bounceStiffness: 120, bounceDamping: 10 }}
        whileTap={{ cursor: "grabbing" }}
        style={{ x, y, rotate, rotateX, rotateY, transformStyle: "preserve-3d", transformOrigin: "50% 0%" }}
        animate={{ rotateZ: [-1.2, 1.2, -1.2] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
        className="relative -mt-[8px] cursor-grab select-none"
      >
        <img
          src={idCardImg}
          alt="Sandeep — ID card"
          draggable={false}
          className="pointer-events-none block h-auto w-[220px] max-w-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
        />
      </motion.div>
    </motion.div>
  );
}
