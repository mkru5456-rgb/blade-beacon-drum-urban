import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ART } from "@/lib/game/art";
import { useGame } from "@/lib/game/store";
import type { Gender } from "@/lib/game/types";

export function TitleScreen() {
  const start = useGame((s) => s.start);
  const [gender, setGender] = useState<Gender>("f");
  const [ribbon, setRibbon] = useState(true);

  return (
    <section className="relative min-h-dvh overflow-hidden">
      <img
        src={ART.square}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-bg/55" />
      <div className="relative mx-auto grid min-h-dvh max-w-5xl gap-6 px-5 py-10 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-end sm:px-10 sm:pb-12">
        <div className="hidden overflow-hidden rounded-[var(--radius-xl)] border border-border sm:block">
          <img src={ART.zhenya} alt="Женя на Сенатской" className="h-[70dvh] w-full object-cover object-top" />
        </div>
        <div className="flex flex-col justify-end gap-6">
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border sm:hidden">
            <img src={ART.zhenya} alt="" className="h-56 w-full object-cover object-top" />
          </div>
          <p className="text-xs tracking-[0.28em] uppercase text-muted">
            14 декабря 1825 · Сенатская площадь
          </p>
          <div className="space-y-3">
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl">
              Женя
              <span className="block text-muted">на Сенатской</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted">
              Ты — поэт среди декабристов. Диктатор не явился. Николай ещё не выехал.
              Остались слова, каре и мороз.
            </p>
          </div>

          <div className="space-y-4 rounded-[var(--radius-xl)] border border-border bg-surface/90 p-5 sm:p-6">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-subtle">Сейчас я</p>
              <div className="grid grid-cols-2 gap-2">
                <Toggle active={gender === "m"} onClick={() => setGender("m")} label="Он" />
                <Toggle active={gender === "f"} onClick={() => setGender("f")} label="Она" />
              </div>
              <p className="mt-2 text-sm text-muted">
                Внешнее может не совпасть. Оба состояния — ты. Зовут Женя.
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-subtle">Хвостик</p>
              <div className="grid grid-cols-2 gap-2">
                <Toggle active={ribbon} onClick={() => setRibbon(true)} label="Есть" />
                <Toggle active={!ribbon} onClick={() => setRibbon(false)} label="Без" />
              </div>
            </div>
          </div>

          <Button className="w-full sm:w-auto sm:self-start" onClick={() => start(gender, ribbon)}>
            Выйти на площадь
          </Button>
        </div>
      </div>
    </section>
  );
}

function Toggle({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "min-h-11 rounded-[var(--radius-sm)] border px-3 text-sm transition-colors duration-150 " +
        (active
          ? "border-border-strong bg-accent text-accent-fg"
          : "border-border bg-elevated text-fg")
      }
    >
      {label}
    </button>
  );
}
