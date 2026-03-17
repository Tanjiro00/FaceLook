"use client";

import { create } from "zustand";
import type { UserProfile, Generation } from "@/types";

interface AppState {
  // Auth
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;

  // Generation
  currentImage: string | null;
  setCurrentImage: (img: string | null) => void;
  selectedProcedure: string | null;
  setSelectedProcedure: (id: string | null) => void;
  intensity: number;
  setIntensity: (v: number) => void;
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
  lastResult: Generation | null;
  setLastResult: (g: Generation | null) => void;

  // History
  generations: Generation[];
  setGenerations: (g: Generation[]) => void;
  addGeneration: (g: Generation) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  currentImage: null,
  setCurrentImage: (currentImage) => set({ currentImage }),
  selectedProcedure: null,
  setSelectedProcedure: (selectedProcedure) => set({ selectedProcedure }),
  intensity: 70,
  setIntensity: (intensity) => set({ intensity }),
  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  lastResult: null,
  setLastResult: (lastResult) => set({ lastResult }),

  generations: [],
  setGenerations: (generations) => set({ generations }),
  addGeneration: (g) =>
    set((state) => ({ generations: [g, ...state.generations] })),
}));
