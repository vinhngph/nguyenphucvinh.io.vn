import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "../../store/useStore";

interface CameraTarget {
  x: number;
  y: number;
  z: number;
  fov: number;
}

const SECTION_CAMERAS: CameraTarget[] = [
  { x: 0, y: 0.5, z: 8, fov: 60 }, // Hero — straight ahead
  { x: 0.8, y: -0.5, z: 6.5, fov: 65 }, // Projects — slight pull-in, shift right
  { x: -0.5, y: -1, z: 9, fov: 55 }, // Education/Contact — wider, pull back
];

export function CameraController() {
  const activeSection = useStore((s) => s.activeSection);
  const scrollProgress = useStore((s) => s.scrollProgress);

  useFrame((state, delta) => {
    const target: CameraTarget =
      SECTION_CAMERAS[activeSection] ?? SECTION_CAMERAS[0];

    // Lerp position
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      target.x,
      delta * 1.2,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      target.y,
      delta * 1.2,
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      target.z,
      delta * 1.2,
    );

    // Lerp FOV
    if ("fov" in state.camera) {
      const cam = state.camera as THREE.PerspectiveCamera;
      cam.fov = THREE.MathUtils.lerp(cam.fov, target.fov, delta * 1.5);
      cam.updateProjectionMatrix();
    }

    // Subtle vertical drift from overall scroll progress
    state.camera.position.y += Math.sin(scrollProgress * Math.PI) * 0.1;

    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
