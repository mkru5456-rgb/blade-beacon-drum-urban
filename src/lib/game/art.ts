import type { NpcId } from "./types";

export const ART = {
  square: "/art/square.jpg",
  zhenya: "/art/zhenya.jpg",
  portraits: {
    ryleev: "/art/ryleev.jpg",
    bestuzhev: "/art/bestuzhev.jpg",
    kakhovsky: "/art/kakhovsky.jpg",
    empty: "/art/empty.jpg",
    notebook: "/art/notebook.jpg",
    courier: "/art/courier.jpg",
  } satisfies Record<NpcId, string>,
};

export function portraitFor(nodeId: string | null): string {
  if (!nodeId) return ART.zhenya;
  if (nodeId === "intro" || nodeId.startsWith("finale")) return ART.zhenya;
  if (nodeId in ART.portraits) return ART.portraits[nodeId as NpcId];
  return ART.square;
}
