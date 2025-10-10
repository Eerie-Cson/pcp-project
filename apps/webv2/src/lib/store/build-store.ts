import type {
  Case,
  CPU,
  Memory,
  Motherboard,
  PowerSupply,
  Storage,
  VideoCard,
} from '@/src/lib/graphql/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BuildState {
  buildName: string;
  selectedCPU: CPU | null;
  selectedMotherboard: Motherboard | null;
  selectedMemory: Memory[];
  selectedStorage: Storage[];
  selectedVideoCard: VideoCard | null;
  selectedCase: Case | null;
  selectedPowerSupply: PowerSupply | null;

  // Actions
  setBuildName: (name: string) => void;
  setSelectedCPU: (cpu: CPU | null) => void;
  setSelectedMotherboard: (motherboard: Motherboard | null) => void;
  addMemory: (memory: Memory) => void;
  removeMemory: (id: string) => void;
  addStorage: (storage: Storage) => void;
  removeStorage: (id: string) => void;
  setSelectedVideoCard: (videoCard: VideoCard | null) => void;
  setSelectedCase: (pcCase: Case | null) => void;
  setSelectedPowerSupply: (powerSupply: PowerSupply | null) => void;
  clearBuild: () => void;

  // Computed values
  getTotalPrice: () => number;
  getEstimatedWattage: () => number;
}

export const useBuildStore = create<BuildState>()(
  persist(
    (set, get) => ({
      buildName: 'My Custom Build',
      selectedCPU: null,
      selectedMotherboard: null,
      selectedMemory: [],
      selectedStorage: [],
      selectedVideoCard: null,
      selectedCase: null,
      selectedPowerSupply: null,

      setBuildName: (name) => set({ buildName: name }),
      setSelectedCPU: (cpu) => set({ selectedCPU: cpu }),
      setSelectedMotherboard: (motherboard) =>
        set({ selectedMotherboard: motherboard }),

      addMemory: (memory) =>
        set((state) => ({
          selectedMemory: [...state.selectedMemory, memory],
        })),

      removeMemory: (id) =>
        set((state) => ({
          selectedMemory: state.selectedMemory.filter((m) => m.id !== id),
        })),

      addStorage: (storage) =>
        set((state) => ({
          selectedStorage: [...state.selectedStorage, storage],
        })),

      removeStorage: (id) =>
        set((state) => ({
          selectedStorage: state.selectedStorage.filter((s) => s.id !== id),
        })),

      setSelectedVideoCard: (videoCard) =>
        set({ selectedVideoCard: videoCard }),
      setSelectedCase: (pcCase) => set({ selectedCase: pcCase }),
      setSelectedPowerSupply: (powerSupply) =>
        set({ selectedPowerSupply: powerSupply }),

      clearBuild: () =>
        set({
          buildName: 'My Custom Build',
          selectedCPU: null,
          selectedMotherboard: null,
          selectedMemory: [],
          selectedStorage: [],
          selectedVideoCard: null,
          selectedCase: null,
          selectedPowerSupply: null,
        }),

      getTotalPrice: () => {
        const state = get();
        let total = 0;

        if (state.selectedCPU) total += state.selectedCPU.price;
        if (state.selectedMotherboard) total += state.selectedMotherboard.price;
        if (state.selectedVideoCard) total += state.selectedVideoCard.price;
        if (state.selectedCase) total += state.selectedCase.price;
        if (state.selectedPowerSupply) total += state.selectedPowerSupply.price;

        state.selectedMemory.forEach((m) => (total += m.price));
        state.selectedStorage.forEach((s) => (total += s.price));

        return total;
      },

      getEstimatedWattage: () => {
        const state = get();
        let wattage = 0;

        if (state.selectedCPU) wattage += state.selectedCPU.tdp;
        if (state.selectedVideoCard) wattage += state.selectedVideoCard.tdp;

        // Add base wattage for other components
        wattage += state.selectedMemory.length * 5; // ~5W per memory stick
        wattage += state.selectedStorage.length * 10; // ~10W per storage device
        wattage += 50; // Motherboard and other components

        return Math.ceil(wattage * 1.2); // Add 20% headroom
      },
    }),
    {
      name: 'pc-build-storage',
    },
  ),
);
