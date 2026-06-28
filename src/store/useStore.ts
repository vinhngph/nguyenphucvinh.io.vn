import { create } from "zustand";

interface MousePosition {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

interface AppStore {
  activeSection: number;
  scrollProgress: number; // 0 to 1
  mousePosition: MousePosition;
  setActiveSection: (n: number) => void;
  setScrollProgress: (n: number) => void;
  setMousePosition: (x: number, y: number) => void;
}

export const useStore = create<AppStore>((set) => ({
  activeSection: 0,
  scrollProgress: 0,
  mousePosition: { x: 0, y: 0 },
  setActiveSection: (n) => set({ activeSection: n }),
  setScrollProgress: (n) => set({ scrollProgress: n }),
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
}));
