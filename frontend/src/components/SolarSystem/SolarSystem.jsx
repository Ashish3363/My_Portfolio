import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* Planet config — sizes & distances are stylised for visual clarity. */
/* ------------------------------------------------------------------ */
const PLANETS = [
  { name: 'Mercury', radius: 0.18, distance: 2.6,  speed: 0.55, color: '#b8b0a8', emissive: '#3d342d', tilt: 0.04 },
  { name: 'Venus',   radius: 0.30, distance: 3.5,  speed: 0.40, color: '#f0c27b', emissive: '#7c4a13', tilt: 0.02 },
  { name: 'Earth',   radius: 0.32, distance: 4.6,  speed: 0.30, color: '#3b82f6', emissive: '#0c3a86', tilt: 0.41 },
  { name: 'Mars',    radius: 0.24, distance: 5.7,  speed: 0.24, color: '#d96a3a', emissive: '#5b1f0c', tilt: 0.44 },
  { name: 'Jupiter', radius: 0.78, distance: 7.6,  speed: 0.14, color: '#d8a26c', emissive: '#4a2a10', tilt: 0.05 },
  { name: 'Saturn',  radius: 0.66, distance: 9.4,  speed: 0.10, color: '#e8c98a', emissive: '#5b3f12', tilt: 0.47, ring: true },
  { name: 'Uranus',  radius: 0.46, distance: 11.0, speed: 0.075, color: '#7ee0e6', emissive: '#0e4d52', tilt: 1.7 },
  { name: 'Neptune', radius: 0.45, distance: 12.4, speed: 0.06, color: '#3b6ef7', emissive: '#0b2466', tilt: 0.49 },
];

/* ------------------------------------------------------------------ */
/* SUN — layered glow without postprocessing.                          */
/* core sphere + corona shell + outer halo sprite-like sphere.        */
/* ------------------------------------------------------------------ */
function Sun() {
  const core = useRef();
  const corona = useRef();
  const halo = useRef();

  useFrame((state, dt) => {
    if (core.current) core.current.rotation.y += dt * 0.18;
    if (corona.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      corona.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Bright core */}
      <mesh ref={core}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial
          color={'#fff2c4'}
          emissive={'#ffb24a'}
          emissiveIntensity={3.2}
          toneMapped={false}
          roughness={1}
        />
      </mesh>
      {/* Pulsing corona */}
      <mesh ref={corona}>
        <sphereGeometry args={[1.35, 48, 48]} />
        <meshBasicMaterial
          color={'#ffb24a'}
          transparent
          opacity={0.18}
          toneMapped={false}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Outer halo */}
      <mesh ref={halo}>
        <sphereGeometry args={[1.85, 32, 32]} />
        <meshBasicMaterial
          color={'#ff7a18'}
          transparent
          opacity={0.07}
          toneMapped={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Light cast by the sun */}
      <pointLight position={[0, 0, 0]} intensity={2.5} distance={40} color={'#ffd49c'} decay={1.4} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Single planet — orbits the sun continuously.                        */
/* ------------------------------------------------------------------ */
function Planet({ data, initialAngle }) {
  const orbitRef = useRef();   // group that rotates → carries planet around sun
  const spinRef = useRef();    // planet's own axial spin

  useFrame((_, dt) => {
    if (orbitRef.current) orbitRef.current.rotation.y += dt * data.speed;
    if (spinRef.current) spinRef.current.rotation.y += dt * 0.5;
  });

  // Tilt the orbit plane VERY slightly so the system has a 3D feel.
  return (
    <group ref={orbitRef} rotation={[0, initialAngle, 0]}>
      <group position={[data.distance, 0, 0]} rotation={[0, 0, data.tilt]}>
        <mesh ref={spinRef}>
          <sphereGeometry args={[data.radius, 48, 48]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.emissive}
            emissiveIntensity={0.35}
            roughness={0.65}
            metalness={0.15}
          />
        </mesh>

        {/* Saturn-style ring */}
        {data.ring && (
          <mesh rotation={[Math.PI / 2.3, 0, 0]}>
            <ringGeometry args={[data.radius * 1.5, data.radius * 2.4, 96]} />
            <meshBasicMaterial
              color={'#f3d59a'}
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Orbital path (faint ring on the xz-plane).                          */
/* ------------------------------------------------------------------ */
function OrbitLine({ distance }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[distance - 0.005, distance + 0.005, 200]} />
      <meshBasicMaterial color={'#7dd3fc'} transparent opacity={0.10} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Asteroid belt — particle field between Mars and Jupiter.            */
/* ------------------------------------------------------------------ */
function AsteroidBelt({ count = 600, inner = 6.1, outer = 6.9 }) {
  const ref = useRef();

  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = inner + Math.random() * (outer - inner);
      const a = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
      positions[i * 3 + 2] = Math.sin(a) * r;
      scales[i] = 0.4 + Math.random() * 0.8;
    }
    return { positions, scales };
  }, [count, inner, outer]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={'#c9a98a'}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Whole solar-system scene tilted + gently drifting around y-axis.    */
/* ------------------------------------------------------------------ */
function Scene() {
  const root = useRef();
  // Random but stable initial angles so planets don't all start aligned.
  const startAngles = useMemo(
    () => PLANETS.map(() => Math.random() * Math.PI * 2),
    []
  );

  useFrame((_, dt) => {
    if (root.current) {
      // Very slow camera-side drift for ambient parallax.
      root.current.rotation.y += dt * 0.015;
    }
  });

  return (
    <group ref={root} rotation={[0.35, 0, 0]}>
      <Sun />
      {PLANETS.map((p, i) => (
        <group key={p.name}>
          <OrbitLine distance={p.distance} />
          <Planet data={p} initialAngle={startAngles[i]} />
        </group>
      ))}
      <AsteroidBelt />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */
export default function SolarSystem({ className = '' }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 7, 16], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight intensity={0.18} />
        {/* Parallaxing starfield */}
        <Stars radius={80} depth={60} count={6000} factor={3.5} saturation={0} fade speed={0.6} />
        <Scene />
      </Canvas>
      {/* Soft radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(5,6,10,0.85)_100%)]" />
    </div>
  );
}
