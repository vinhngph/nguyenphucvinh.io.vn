import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "../../store/useStore";

const COUNT = 2200;

export function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const mousePosition = useStore((s) => s.mousePosition);
  const activeSection = useStore((s) => s.activeSection);

  // Stable particle positions — spherical shell distribution
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const sz = new Float32Array(COUNT);

    const colorA = new THREE.Color("#4F6EF7"); // electric blue
    const colorB = new THREE.Color("#8B5CF6"); // violet
    const colorC = new THREE.Color("#C4B5FD"); // lavender

    for (let i = 0; i < COUNT; i++) {
      const r = 4.5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      const color =
        t < 0.5
          ? colorA.clone().lerp(colorB, t * 2)
          : colorB.clone().lerp(colorC, (t - 0.5) * 2);

      // Dim some particles for depth variation
      const dim = 0.4 + Math.random() * 0.6;
      col[i * 3] = color.r * dim;
      col[i * 3 + 1] = color.g * dim;
      col[i * 3 + 2] = color.b * dim;

      sz[i] = 0.03 + Math.random() * 0.05;
    }

    return [pos, col, sz];
  }, []);

  const baseRotation = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });

  // Section-based density shift targets
  const sectionOffset = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.5, -0.5, 0),
      new THREE.Vector3(-0.5, -1, 0),
    ],
    [],
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Slow autonomous rotation
    baseRotation.current.y += delta * 0.04;

    // Mouse influence — smooth lerp
    currentTilt.current.x = THREE.MathUtils.lerp(
      currentTilt.current.x,
      mousePosition.y * 0.25,
      delta * 1.5,
    );
    currentTilt.current.y = THREE.MathUtils.lerp(
      currentTilt.current.y,
      mousePosition.x * 0.15,
      delta * 1.5,
    );

    meshRef.current.rotation.x = currentTilt.current.x;
    meshRef.current.rotation.y = baseRotation.current.y + currentTilt.current.y;

    // Section-based world shift
    const target = sectionOffset[activeSection] ?? sectionOffset[0];
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      target.x,
      delta * 0.8,
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      target.y,
      delta * 0.8,
    );

    // Subtle pulse using elapsed time
    const t = state.clock.elapsedTime;
    const scale = 1 + Math.sin(t * 0.3) * 0.015;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
