import { Button } from "@/components/ui/button";
import { ART } from "@/lib/game/art";
import { NPCS } from "@/lib/game/story";
import { useGame } from "@/lib/game/store";

export function Square() {
  const { stats, talked, ribbon, gender, openTalk, reset } = useGame();
  const readyForCourier = talked.filter((id) => id !== "courier").length >= 3;

  return (
    <section className="relative min-h-dvh overflow-hidden">
      <img src={ART.square} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-bg/70" />
      <div className="relative px-4 py-6 sm:px-8">
        <header className="mx-auto mb-5 flex max-w-3xl items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-subtle">14 декабря</p>
            <h1 className="font-display text-3xl font-semibold tracking-[-0.03em]">Сенатская</h1>
            <p className="text-sm text-muted">
              Женя · {gender === "m" ? "он" : "она"}
              {ribbon ? " · хвостик" : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="min-h-11 text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            Заново
          </button>
        </header>

        <div className="mx-auto mb-5 grid max-w-3xl grid-cols-3 gap-2">
          <Stat label="Огонь" value={stats.fire} />
          <Stat label="Чернила" value={stats.ink} />
          <Stat label="Честь" value={stats.honor} />
        </div>

        <div className="mx-auto mb-5 max-w-3xl overflow-hidden rounded-[var(--radius-xl)] border border-border">
          <img src={ART.square} alt="Сенатская площадь, зима 1825" className="h-40 w-full object-cover sm:h-56" />
        </div>

        <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {NPCS.map((npc) => {
            const done = talked.includes(npc.id);
            const locked = npc.id === "courier" && !readyForCourier;
            return (
              <li key={npc.id}>
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => openTalk(npc.id)}
                  className="flex min-h-24 w-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface/90 text-left disabled:opacity-40"
                >
                  <img
                    src={ART.portraits[npc.id]}
                    alt=""
                    className="h-24 w-20 shrink-0 object-cover sm:h-28 sm:w-24"
                  />
                  <span className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2">
                    <span className="font-display text-xl leading-tight">{npc.name}</span>
                    <span className="text-sm text-muted">{npc.role}</span>
                    <span className="mt-1 text-[11px] uppercase tracking-wider text-subtle">
                      {locked ? "позже" : done ? "говорили" : npc.hint}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-muted">
          Поговори хотя бы с тремя на площади. Потом можно принять курьера из Зимнего.
        </p>
        {readyForCourier ? (
          <div className="mx-auto mt-4 max-w-3xl">
            <Button className="w-full sm:w-auto" onClick={() => openTalk("courier")}>
              Курьер уже здесь
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-surface/90 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.18em] text-subtle">{label}</p>
      <p className="font-display text-2xl tabular-nums leading-none">{value}</p>
    </div>
  );
}
