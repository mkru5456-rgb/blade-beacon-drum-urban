import { Button } from "@/components/ui/button";
import { portraitFor, ART } from "@/lib/game/art";
import { introNode, npcNodes, resolveEnding } from "@/lib/game/story";
import type { Choice } from "@/lib/game/story";
import { useGame } from "@/lib/game/store";
import type { EndingId } from "@/lib/game/types";

export function Dialogue() {
  const { gender, nodeId, stats, applyChoice, goSquare, setEnding, openTalk } = useGame();
  if (!nodeId) return null;

  const nodes = npcNodes(gender);
  const node = nodeId === "intro" ? introNode(gender) : nodes[nodeId];
  const portrait = portraitFor(nodeId);

  if (!node) {
    return (
      <section className="mx-auto max-w-xl px-5 py-16">
        <p className="text-muted">Сцена не найдена.</p>
        <Button className="mt-4" onClick={goSquare}>
          На площадь
        </Button>
      </section>
    );
  }

  const onChoice = (c: Choice) => {
    applyChoice(c.delta, c.markTalked);
    if (c.ending) {
      setEnding(c.ending);
      return;
    }
    if (c.next === "square") {
      goSquare();
      return;
    }
    if (c.next?.startsWith("end-check-")) {
      const kind = c.next.replace("end-check-", "") as "verse" | "stand" | "talk";
      const ending: EndingId = resolveEnding(kind, {
        fire: stats.fire + (c.delta?.fire ?? 0),
        ink: stats.ink + (c.delta?.ink ?? 0),
        honor: stats.honor + (c.delta?.honor ?? 0),
      });
      setEnding(ending);
      return;
    }
    if (c.next) openTalk(c.next);
  };

  const canBack = nodeId !== "intro" && nodeId !== "courier" && !nodeId.startsWith("finale");

  return (
    <section className="relative min-h-dvh">
      <img src={ART.square} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-bg/75" />
      <div className="relative mx-auto flex min-h-dvh max-w-xl flex-col justify-end gap-5 px-5 py-8 sm:justify-center">
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border">
          <img src={portrait} alt="" className="h-52 w-full object-cover object-top sm:h-72" />
        </div>
        <div className="space-y-4 rounded-[var(--radius-xl)] border border-border bg-surface/92 p-5 sm:p-6">
          {node.lines.map((line, i) => (
            <div key={i} className="space-y-1">
              {line.speaker ? (
                <p className="text-xs uppercase tracking-[0.18em] text-subtle">{line.speaker}</p>
              ) : null}
              <p className="font-display text-xl leading-snug text-fg sm:text-2xl">{line.text}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {node.choices.map((c) => (
            <Button
              key={c.id}
              variant="ghost"
              className="h-auto min-h-11 w-full justify-start bg-surface/80 py-3 text-left"
              onClick={() => onChoice(c)}
            >
              {c.label}
            </Button>
          ))}
        </div>
        {canBack ? (
          <button type="button" onClick={goSquare} className="self-start text-sm text-muted hover:text-fg">
            Вернуться
          </button>
        ) : null}
      </div>
    </section>
  );
}
