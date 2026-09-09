export type Gender = "m" | "f";

export type Stats = {
  fire: number;
  ink: number;
  honor: number;
};

export type Screen = "title" | "square" | "talk" | "ending";

export type NpcId = "ryleev" | "kakhovsky" | "bestuzhev" | "empty" | "notebook" | "courier";

export type EndingId = "scaffold" | "siberia" | "london" | "witness";

export type Pronouns = {
  nom: string;
  acc: string;
  dat: string;
  adj: string;
  came: string;
};

export function pronouns(g: Gender): Pronouns {
  if (g === "m") {
    return {
      nom: "он",
      acc: "его",
      dat: "ему",
      adj: "милый",
      came: "пришёл",
    };
  }
  return {
    nom: "она",
    acc: "её",
    dat: "ей",
    adj: "милая",
    came: "пришла",
  };
}

export function clampStat(n: number) {
  return Math.max(0, Math.min(6, n));
}
