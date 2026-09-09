import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EndingId, Gender, NpcId, Screen, Stats } from "./types";
import { clampStat } from "./types";

type State = {
  screen: Screen;
  gender: Gender;
  ribbon: boolean;
  stats: Stats;
  talked: NpcId[];
  nodeId: string | null;
  ending: EndingId | null;
  started: boolean;
};

type Actions = {
  start: (gender: Gender, ribbon: boolean) => void;
  goSquare: () => void;
  openTalk: (nodeId: string) => void;
  applyChoice: (delta?: Partial<Stats>, markTalked?: NpcId) => void;
  setEnding: (id: EndingId) => void;
  reset: () => void;
};

const initial: State = {
  screen: "title",
  gender: "f",
  ribbon: true,
  stats: { fire: 1, ink: 1, honor: 1 },
  talked: [],
  nodeId: null,
  ending: null,
  started: false,
};

export const useGame = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initial,
      start: (gender, ribbon) =>
        set({
          gender,
          ribbon,
          started: true,
          screen: "talk",
          nodeId: "intro",
          stats: { fire: 1, ink: 1, honor: 1 },
          talked: [],
          ending: null,
        }),
      goSquare: () => set({ screen: "square", nodeId: null }),
      openTalk: (nodeId) => set({ screen: "talk", nodeId }),
      applyChoice: (delta, markTalked) => {
        const stats = { ...get().stats };
        if (delta) {
          (Object.keys(delta) as (keyof Stats)[]).forEach((k) => {
            stats[k] = clampStat(stats[k] + (delta[k] ?? 0));
          });
        }
        const talked = markTalked
          ? Array.from(new Set([...get().talked, markTalked]))
          : get().talked;
        set({ stats, talked });
      },
      setEnding: (id) => set({ screen: "ending", ending: id, nodeId: null }),
      reset: () => set({ ...initial }),
    }),
    { name: "zhenya-senat-v1" },
  ),
);
