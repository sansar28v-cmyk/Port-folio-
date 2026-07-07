import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Points, PointMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

function NeuralWave({ scroll, isMobile, isScrolling }: { scroll: { v: number }; isMobile: boolean; isScrolling: { current: boolean } }) {
  const ref = useRef<THREE.Points>(null);
  const count = isMobile ? 1200 : 6000;
  
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phs = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 0.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = r * Math.sin(theta);
      phs[i] = Math.random() * Math.PI * 2;
    }
    return [pos, phs];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime * 0.4;
    
    // Cheap container rotation that runs even during scroll
    ref.current.rotation.y = time * 0.1 + scroll.v * 1.5;
    ref.current.rotation.x = Math.sin(time * 0.2) * 0.2 + 0.4 + scroll.v * 0.3;
    ref.current.scale.setScalar(1 + scroll.v * 0.4);

    // Pause heavy CPU particle math on mobile during scroll for buttery smoothness
    if (isMobile && isScrolling.current) return;

    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const x = pos[i * 3];
      const z = pos[i * 3 + 2];
      const dist = Math.sqrt(x * x + z * z);
      pos[i * 3 + 1] = Math.sin(dist * 2 - time * 2 + phases[i]) * 0.2 + Math.cos(x * 1.5 + time) * 0.15;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#00f0ff" size={isMobile ? 0.03 : 0.015} sizeAttenuation depthWrite={false} opacity={0.7} blending={THREE.AdditiveBlending} />
    </Points>
  );
}

function Starfield({ scroll, isMobile, isScrolling }: { scroll: { v: number }; isMobile: boolean; isScrolling: { current: boolean } }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = isMobile ? 300 : 800;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [isMobile]);
  useFrame((_, dt) => {
    if (!ref.current) return;
    if (isMobile && isScrolling.current) return;
    ref.current.rotation.y += dt * 0.02;
    ref.current.rotation.x = scroll.v * 0.4;
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function DataNetwork({ scroll, isMobile, isScrolling }: { scroll: { v: number }; isMobile: boolean; isScrolling: { current: boolean } }) {
  const ref = useRef<THREE.Group>(null);
  const count = isMobile ? 40 : 100;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    if (isMobile && isScrolling.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y = time * 0.05 + scroll.v * 2;
    ref.current.position.y = -12 + scroll.v * 2;
  });

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3}>
        <PointMaterial transparent color="#ffffff" size={isMobile ? 0.08 : 0.05} sizeAttenuation depthWrite={false} opacity={0.8} />
      </Points>
    </group>
  );
}

function WarpLines({ scroll, isMobile, isScrolling }: { scroll: { v: number }; isMobile: boolean; isScrolling: { current: boolean } }) {
  const ref = useRef<THREE.Group>(null);
  const count = isMobile ? 100 : 300;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // Spread on Y
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    if (isMobile && isScrolling.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y = time * 0.1;
    ref.current.position.y = -22 + (time * 2) % 10; // Endless moving up
  });

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3}>
        <PointMaterial transparent color="#00f0ff" size={isMobile ? 0.05 : 0.02} sizeAttenuation depthWrite={false} opacity={0.4} blending={THREE.AdditiveBlending} />
      </Points>
    </group>
  );
}

function CameraRig({ scroll, mouse, isMobile }: { scroll: { v: number }; mouse: { x: number; y: number }; isMobile: boolean }) {
  useFrame((state) => {
    const t = scroll.v;
    const camera = state.camera;
    // Camera dives from Y=0 down to Y=-25 as you scroll the whole page
    const targetX = isMobile ? Math.sin(t * Math.PI * 2) * 2 : Math.sin(t * Math.PI * 2) * 3 + mouse.x * 1.5;
    const targetY = isMobile ? -t * 25 : -t * 25 - mouse.y * 1.5;
    const targetZ = isMobile ? 5.5 - t * 4 : 4 - Math.sin(t * Math.PI) * 2;
    
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    
    // Always look slightly ahead on the Y axis path
    const lookAtY = targetY - 2;
    camera.lookAt(0, lookAtY, 0);
  });
  return null;
}

export function Scene() {
  const scroll = useRef({ v: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);

    let maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const onResize = () => {
      maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    };

    const onScroll = () => {
      isScrolling.current = true;
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        isScrolling.current = false;
      }, 150);

      scroll.current.v = Math.min(1, window.scrollY / maxScroll);
    };
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    onResize();
    onScroll();
    
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      className="pointer-events-none"
      dpr={isMobile ? 1 : [1, 2]}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4], fov: 40 }}
    >
      {!isMobile && <ambientLight intensity={0.4} />}
      {!isMobile && <directionalLight position={[3, 5, 2]} intensity={1.2} />}
      {!isMobile && <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#00f0ff" />}
      <Starfield scroll={scroll.current} isMobile={isMobile} isScrolling={isScrolling} />
      <NeuralWave scroll={scroll.current} isMobile={isMobile} isScrolling={isScrolling} />
      <DataNetwork scroll={scroll.current} isMobile={isMobile} isScrolling={isScrolling} />
      <WarpLines scroll={scroll.current} isMobile={isMobile} isScrolling={isScrolling} />
      <CameraRig scroll={scroll.current} mouse={mouse.current} isMobile={isMobile} />
      {!isMobile && <Environment preset="city" resolution={128} />}
    </Canvas>
  );
}
