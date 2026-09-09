import { useGame } from "@/lib/game/store";
import { Dialogue } from "./Dialogue";
import { Ending } from "./Ending";
import { Square } from "./Square";
import { TitleScreen } from "./TitleScreen";

export function GameRoot() {
  const screen = useGame((s) => s.screen);

  return (
    <main className="min-h-dvh bg-bg text-fg">
      {screen === "title" ? <TitleScreen /> : null}
      {screen === "square" ? <Square /> : null}
      {screen === "talk" ? <Dialogue /> : null}
      {screen === "ending" ? <Ending /> : null}
    </main>
  );
}
