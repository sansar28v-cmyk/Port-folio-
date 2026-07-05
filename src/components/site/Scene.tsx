import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Points, PointMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

function Sculpture({ scroll, mouse, isMobile }: { scroll: { v: number }; mouse: { x: number; y: number }; isMobile: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.18;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.2 + scroll.v * 0.6;
    ref.current.rotation.z = scroll.v * 0.4;
    const s = 1 + scroll.v * 0.5;
    ref.current.scale.setScalar(s);
    ref.current.position.z = scroll.v * 1.4;
    ref.current.position.x += (mouse.x * 0.4 - ref.current.position.x) * 0.05;
    ref.current.position.y += (-mouse.y * 0.3 - ref.current.position.y) * 0.05;
  });
  const geo = useMemo(() => new THREE.TorusKnotGeometry(1, 0.32, isMobile ? 64 : 128, isMobile ? 12 : 16, 2, 3), [isMobile]);
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} geometry={geo}>
        <MeshTransmissionMaterial
          thickness={0.6}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.05}
          backside={!isMobile}
          samples={3}
          resolution={isMobile ? 128 : 256}
          distortion={0.2}
          distortionScale={0.4}
          temporalDistortion={0.1}
          color="#e8f9ff"
        />
      </mesh>
    </Float>
  );
}

function Wireframe({ scroll }: { scroll: { v: number } }) {
  const ref = useRef<THREE.LineSegments>(null);
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(2.4, 1);
    return new THREE.EdgesGeometry(g);
  }, []);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y -= dt * 0.05;
    ref.current.rotation.x += dt * 0.02;
    const s = 1 + scroll.v * 0.8;
    ref.current.scale.setScalar(s);
  });
  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#00f0ff" transparent opacity={0.15} />
    </lineSegments>
  );
}

function Starfield({ scroll, isMobile }: { scroll: { v: number }; isMobile: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = isMobile ? 400 : 800;
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

function CameraRig({ scroll, mouse }: { scroll: { v: number }; mouse: { x: number; y: number } }) {
  useFrame((state) => {
    const t = scroll.v;
    const camera = state.camera;
    const targetX = Math.sin(t * Math.PI * 0.5) * 1.2 + mouse.x * 0.3;
    const targetY = -t * 0.6 - mouse.y * 0.2;
    const targetZ = 4 - t * 1.5;
    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Scene() {
  const scroll = useRef({ v: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);

    const onScroll = () => {
      const max = window.innerHeight * 3;
      scroll.current.v = Math.min(1, window.scrollY / max);
    };
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      className="pointer-events-none"
      dpr={1}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4], fov: 40 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} />
      <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#00f0ff" />
      <Starfield scroll={scroll.current} isMobile={isMobile} />
      <Wireframe scroll={scroll.current} />
      <Sculpture scroll={scroll.current} mouse={mouse.current} isMobile={isMobile} />
      <CameraRig scroll={scroll.current} mouse={mouse.current} />
      <Environment preset="city" resolution={256} />
    </Canvas>
  );
}
