import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// When a tab is hidden, requestAnimationFrame pauses. On return the first
// frame's delta is the entire elapsed time, which spikes particle positions
// and causes mass-recycle artifacts. Clamp dt so simulation never advances
// more than ~1/30s per frame regardless of how long the tab was idle.
const MAX_DT = 1 / 30;
const safeDt = (dt) => Math.min(dt, MAX_DT);

/* ------------------------------------------------------------------ */
/* Soft round particle texture (canvas-generated, no asset to ship).  */
/* ------------------------------------------------------------------ */
function createDiscTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0,    'rgba(255,255,255,1)');
  g.addColorStop(0.3,  'rgba(255,255,255,0.6)');
  g.addColorStop(0.7,  'rgba(255,255,255,0.18)');
  g.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ------------------------------------------------------------------ */
/* Milky Way spiral disc — particles arranged into N arms with        */
/* power-biased radial distribution + per-particle color gradient.    */
/* ------------------------------------------------------------------ */
function GalaxyPoints({
  count = 28000,
  radius = 30,
  arms = 4,
  twist = 0.28,
  randomness = 0.55,
  randomPower = 3,
  size = 0.16,
  opacity = 0.98,
}) {
  const ref = useRef();
  const texture = useMemo(createDiscTexture, []);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cInner = new THREE.Color('#fff2c4'); // warm gold core
    const cMid   = new THREE.Color('#ff70a6'); // pink mid
    const cOuter = new THREE.Color('#5fd6ff'); // cyan outer arms
    const tmp    = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const t = Math.pow(Math.random(), 0.55); // bias toward center
      const r = t * radius;

      // Arm placement
      const armIdx = i % arms;
      const armAngle = (armIdx / arms) * Math.PI * 2;
      const spiralAngle = armAngle + r * twist;

      // Random spread (smaller near center, larger toward edge)
      const rx = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const ry = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * (1 - t) * 1.6;
      const rz = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      positions[i * 3 + 0] = Math.cos(spiralAngle) * r + rx;
      positions[i * 3 + 1] = ry;
      positions[i * 3 + 2] = Math.sin(spiralAngle) * r + rz;

      // Color blend: gold → pink → cyan based on radius
      if (t < 0.5) tmp.copy(cInner).lerp(cMid, t / 0.5);
      else         tmp.copy(cMid).lerp(cOuter, (t - 0.5) / 0.5);
      colors[i * 3 + 0] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    return { positions, colors };
  }, [count, radius, arms, twist, randomness, randomPower]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += safeDt(dt) * 0.045; // slow galactic rotation
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        map={texture}
        alphaTest={0.001}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Bright pulsing bulge at the galactic core for extra HDR glow.      */
/* ------------------------------------------------------------------ */
function GalaxyCoreGlow() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.05;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <group>
      {/* Bright inner bulge */}
      <mesh ref={ref}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color={'#ffd28a'}
          transparent
          opacity={0.32}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[3.6, 32, 32]} />
        <meshBasicMaterial
          color={'#ff8fb8'}
          transparent
          opacity={0.10}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Foreground "warp" streaks — bright particles that continuously     */
/* fly toward the camera, recycling when they pass behind it.         */
/* Each particle has its own random size + color via custom shader.   */
/* ------------------------------------------------------------------ */
const warpVertexShader = /* glsl */ `
  attribute vec3 color;
  attribute float size;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // sizeAttenuation: scale by distance to camera
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const warpFragmentShader = /* glsl */ `
  uniform sampler2D pointTexture;
  uniform float uOpacity;
  varying vec3 vColor;
  void main() {
    vec4 tex = texture2D(pointTexture, gl_PointCoord);
    gl_FragColor = vec4(vColor, uOpacity) * tex;
    if (gl_FragColor.a < 0.01) discard;
  }
`;

// Random size with a weighted distribution: lots of small, fewer medium,
// rare large/bright ones. Tweak the thresholds to taste.
function randomStarSize() {
  const r = Math.random();
  if (r < 0.6)  return 0.4 + Math.random() * 0.6;   // small
  if (r < 0.9)  return 1.2 + Math.random() * 1.4;   // medium
  return        2.8 + Math.random() * 2.6;          // large / bright
}

// Random tint — mostly white, occasional cool/warm star.
function randomStarTint() {
  const r = Math.random();
  if (r < 0.7)  return [1.0, 1.0, 1.0];             // white
  if (r < 0.85) return [0.72, 0.86, 1.0];           // cool blue
  if (r < 0.95) return [1.0, 0.78, 0.86];           // pink
  return        [1.0, 0.92, 0.65];                  // warm gold
}

function ForwardStars({ count = 900, speed = 9, depth = 90, spread = 60 }) {
  const ref = useRef();
  const texture = useMemo(createDiscTexture, []);

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.55;
      positions[i * 3 + 2] = -Math.random() * depth;
      sizes[i] = randomStarSize();
      const [cr, cg, cb] = randomStarTint();
      colors[i * 3 + 0] = cr;
      colors[i * 3 + 1] = cg;
      colors[i * 3 + 2] = cb;
    }
    return { positions, sizes, colors };
  }, [count, spread, depth]);

  // Stable uniforms object — created once so the shader material isn't
  // rebuilt every frame.
  const uniforms = useMemo(
    () => ({
      pointTexture: { value: texture },
      uOpacity: { value: 0.55 },
    }),
    [texture]
  );

  useFrame((_, dt) => {
    if (!ref.current) return;
    const stepDt = safeDt(dt);
    const posAttr = ref.current.geometry.attributes.position;
    const sizeAttr = ref.current.geometry.attributes.size;
    const colorAttr = ref.current.geometry.attributes.color;
    const p = posAttr.array;
    const s = sizeAttr.array;
    const c = colorAttr.array;
    for (let i = 0; i < count; i++) {
      p[i * 3 + 2] += stepDt * speed;
      if (p[i * 3 + 2] > 15) {
        // Recycle particle: new random position, size, and tint so the
        // mix of shapes keeps refreshing.
        p[i * 3 + 0] = (Math.random() - 0.5) * spread;
        p[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.55;
        p[i * 3 + 2] = -depth;
        s[i] = randomStarSize();
        const [cr, cg, cb] = randomStarTint();
        c[i * 3 + 0] = cr;
        c[i * 3 + 1] = cg;
        c[i * 3 + 2] = cb;
      }
    }
    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={warpVertexShader}
        fragmentShader={warpFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */
export default function MilkyWay({ className = '' }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 4, 16], fov: 58 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight intensity={0.45} />

        {/* Far background star field for depth */}
        <Stars radius={150} depth={80} count={4500} factor={3} fade speed={0.4} saturation={0} />

        {/* Tilted spiral galaxy */}
        <group rotation={[0.55, 0, 0.12]} position={[0, -2, -6]}>
          <GalaxyPoints />
        </group>

        {/* Continuous forward motion */}
        <ForwardStars />
      </Canvas>
    </div>
  );
}
