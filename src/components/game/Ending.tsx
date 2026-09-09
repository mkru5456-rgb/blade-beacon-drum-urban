import { Button } from "@/components/ui/button";
import { ART } from "@/lib/game/art";
import { ENDINGS } from "@/lib/game/story";
import { useGame } from "@/lib/game/store";

export function Ending() {
  const ending = useGame((s) => s.ending);
  const stats = useGame((s) => s.stats);
  const reset = useGame((s) => s.reset);
  if (!ending) return null;
  const data = ENDINGS[ending];

  return (
    <section className="relative min-h-dvh overflow-hidden">
      <img src={ART.square} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-bg/75" />
      <div className="relative mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-6 px-5 py-12">
        <p className="text-xs uppercase tracking-[0.22em] text-subtle">{data.kicker}</p>
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-[-0.03em]">{data.title}</h1>
        <div className="space-y-4 text-base leading-relaxed text-muted">
          {data.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="flex gap-3 text-sm tabular-nums text-subtle">
          <span>Огонь {stats.fire}</span>
          <span>Чернила {stats.ink}</span>
          <span>Честь {stats.honor}</span>
        </div>
        <Button className="self-start" onClick={() => reset()}>
          Ещё раз, 14 декабря
        </Button>
      </div>
    </section>
  );
}
