import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Procedural "brain": a noisy icosahedron rendered as glowing wireframe
 * + a denser solid inner shell, surrounded by a particle field
 * representing neural pathways. No external GLB asset required.
 */
function NoisyBrain({ openness = 0, hue = 0.55 }) {
  const groupRef = useRef();
  const wireRef = useRef();
  const innerRef = useRef();
  const matRef = useRef();

  // Noise-displaced geometry baked once on mount
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.2, 6);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = Math.sin(v.x * 4.2) * Math.cos(v.y * 3.7) * Math.sin(v.z * 4.5);
      const wave = Math.sin(v.x * 8) * Math.cos(v.z * 8) * 0.06;
      v.multiplyScalar(1 + n * 0.18 + wave);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
    // openness drives a subtle "split" effect by scaling the wireframe outward
    if (wireRef.current) {
      const target = 1 + openness * 0.35;
      wireRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.05);
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.6 + openness * 1.4;
    }
  });

  const color = useMemo(() => new THREE.Color().setHSL(hue, 0.85, 0.6), [hue]);

  return (
    <group ref={groupRef}>
      {/* Inner glowing shell */}
      <mesh ref={innerRef} geometry={geometry}>
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0.35}
          metalness={0.5}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef} geometry={geometry}>
        <meshBasicMaterial
          color={'#7dd3fc'}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Sparkles (neural pulses) */}
      <Sparkles
        count={120}
        scale={[3.2, 3.2, 3.2]}
        size={3}
        speed={0.4}
        color={'#a78bfa'}
        opacity={0.9}
      />
      <Sparkles
        count={60}
        scale={[4.5, 4.5, 4.5]}
        size={1.6}
        speed={0.2}
        color={'#5fd6ff'}
        opacity={0.6}
      />
    </group>
  );
}

export default function Brain({
  openness = 0,
  hue = 0.55,
  interactive = false,
  className = '',
}) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 2, 4]} intensity={1.2} color="#a78bfa" />
        <directionalLight position={[-3, -1, 2]} intensity={0.7} color="#5fd6ff" />
        <Float floatIntensity={0.6} rotationIntensity={0.3} speed={1}>
          <NoisyBrain openness={openness} hue={hue} />
        </Float>
        <Environment preset="city" />
        {interactive && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
      {/* Soft radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(5,6,10,0.85)_100%)]" />
    </div>
  );
}
