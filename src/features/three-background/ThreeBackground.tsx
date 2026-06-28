import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { CameraController } from "./CameraController";

export function ThreeBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.05} />
        <ParticleField />
        <CameraController />
      </Canvas>
    </div>
  );
}
