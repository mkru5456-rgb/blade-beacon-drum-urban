import type { EndingId, Gender, NpcId, Pronouns, Stats } from "./types";
import { pronouns } from "./types";

export type Choice = {
  id: string;
  label: string;
  delta?: Partial<Stats>;
  next?: string;
  markTalked?: NpcId;
  ending?: EndingId;
};


export type Line = {
  speaker: string;
  text: string;
};

export type Node = {
  id: string;
  lines: Line[];
  choices: Choice[];
};

function interpolate(text: string, p: Pronouns) {
  return text
    .replaceAll("{nom}", p.nom)
    .replaceAll("{acc}", p.acc)
    .replaceAll("{dat}", p.dat)
    .replaceAll("{adj}", p.adj)
    .replaceAll("{came}", p.came);
}

export const NPCS: {
  id: NpcId;
  name: string;
  role: string;
  hint: string;
  x: string;
  y: string;
}[] = [
  {
    id: "ryleev",
    name: "Рылеев",
    role: "поэт Северного общества",
    hint: "У Медного всадника",
    x: "22%",
    y: "42%",
  },
  {
    id: "bestuzhev",
    name: "Бестужев",
    role: "с солдатами Московского полка",
    hint: "У каре",
    x: "68%",
    y: "38%",
  },
  {
    id: "kakhovsky",
    name: "Каховский",
    role: "пистолет под шинелью",
    hint: "У Адмиралтейства",
    x: "48%",
    y: "62%",
  },
  {
    id: "empty",
    name: "Диктатор",
    role: "место, которое пусто",
    hint: "Трубецкой не явился",
    x: "78%",
    y: "68%",
  },
  {
    id: "notebook",
    name: "Тетрадь",
    role: "чернила на морозе",
    hint: "Твои стихи",
    x: "14%",
    y: "72%",
  },
  {
    id: "courier",
    name: "Курьер",
    role: "от Зимнего",
    hint: "Не ходи, пока не поговоришь",
    x: "52%",
    y: "18%",
  },
];

export function introNode(g: Gender): Node {
  const p = pronouns(g);
  return {
    id: "intro",
    lines: [
      {
        speaker: "",
        text: "Петербург. 14 декабря 1825. Мороз режет щёки. Сенатская площадь держит дыхание, как зал перед увертюрой.",
      },
      {
        speaker: "",
        text: `Женя {came} с той стороны Невы, где фонари ещё помнят Лондон. Хвостик или крабик — неважно: оба состояния — это ты. Сейчас тебя зовут Женя, и {nom} здесь не зритель.`,
      },
      {
        speaker: "",
        text: "Солдаты стоят каре. Диктатора нет. Николай ещё не выехал. У тебя есть несколько часов и несколько слов.",
      },
    ].map((l) => ({ ...l, text: interpolate(l.text, p) })),
    choices: [{ id: "to-square", label: "Выйти на площадь", next: "square" }],
  };
}

export function npcNodes(g: Gender): Record<string, Node> {
  const p = pronouns(g);
  const t = (n: Node): Node => ({
    ...n,
    lines: n.lines.map((l) => ({ ...l, text: interpolate(l.text, p) })),
  });

  return {
    ryleev: t({
      id: "ryleev",
      lines: [
        {
          speaker: "Рылеев",
          text: "Женя. Я ждал тебя. Стихи накануне писались плохо: слишком много правды, слишком мало рифмы.",
        },
        {
          speaker: "Рылеев",
          text: "Северное общество стоит. Южное — в Киеве, Пестель далеко. Здесь решает слово, сказанное солдатам, и то, что мы не разбежимся.",
        },
        {
          speaker: "Рылеев",
          text: "Скажи мне как поэту: сегодня мы делаем историю или красивую гибель?",
        },
      ],
      choices: [
        {
          id: "r1",
          label: "Историю. Даже если она горькая.",
          delta: { honor: 1, fire: 1 },
          markTalked: "ryleev",
          next: "square",
        },
        {
          id: "r2",
          label: "Гибель тоже бывает верной, Кондратий.",
          delta: { ink: 1, fire: 1 },
          markTalked: "ryleev",
          next: "square",
        },
        {
          id: "r3",
          label: "Давай сначала удержать солдат. Романтика потом.",
          delta: { honor: 1 },
          markTalked: "ryleev",
          next: "square",
        },
      ],
    }),
    bestuzhev: t({
      id: "bestuzhev",
      lines: [
        {
          speaker: "Бестужев",
          text: "Московский полк замёрз, но стоит. Я сказал им, что Константин присягал конституции. Это почти правда.",
        },
        {
          speaker: "Бестужев",
          text: "Они смотрят на тебя. Не на мундир — на лицо. Солдату нужен человек, которому можно верить сегодня до вечера.",
        },
      ],
      choices: [
        {
          id: "b1",
          label: "Выйти к каре и говорить прямо.",
          delta: { fire: 1, honor: 1 },
          markTalked: "bestuzhev",
          next: "square",
        },
        {
          id: "b2",
          label: "Прочесть им строки — не манифест, стих.",
          delta: { ink: 2 },
          markTalked: "bestuzhev",
          next: "square",
        },
        {
          id: "b3",
          label: "Молча встать в ряд. Тепло плечом к плечу.",
          delta: { honor: 2 },
          markTalked: "bestuzhev",
          next: "square",
        },
      ],
    }),
    kakhovsky: t({
      id: "kakhovsky",
      lines: [
        {
          speaker: "Каховский",
          text: "Пистолет заряжен. Милорадович выедет уговаривать. Кто-то должен кончить уговоры.",
        },
        {
          speaker: "Каховский",
          text: "Ты не любишь кровь без романтики. Я тоже. Но площади не читают элегий.",
        },
      ],
      choices: [
        {
          id: "k1",
          label: "Не стреляй первым. Это не восстание, а казнь.",
          delta: { honor: 1 },
          markTalked: "kakhovsky",
          next: "square",
        },
        {
          id: "k2",
          label: "Если выедет Николай — не дай площади стать театром.",
          delta: { fire: 2 },
          markTalked: "kakhovsky",
          next: "square",
        },
        {
          id: "k3",
          label: "Спрячь пистолет. Сегодня побеждает стойкость, не пуля.",
          delta: { ink: 1, honor: 1 },
          markTalked: "kakhovsky",
          next: "square",
        },
      ],
    }),
    empty: t({
      id: "empty",
      lines: [
        {
          speaker: "",
          text: "Место диктатора пусто. Князь Трубецкой не вышел. Снег лежит ровно, как не начатая страница.",
        },
        {
          speaker: "",
          text: "Кто-то должен занять это место — или честно сказать, что вождя нет, а площадь всё равно наша.",
        },
      ],
      choices: [
        {
          id: "e1",
          label: "Встать туда. Не как князь — как Женя.",
          delta: { fire: 2, honor: 1 },
          markTalked: "empty",
          next: "square",
        },
        {
          id: "e2",
          label: "Оставить пустоту. Пусть правда будет видна.",
          delta: { ink: 1, honor: 1 },
          markTalked: "empty",
          next: "square",
        },
      ],
    }),
    notebook: t({
      id: "notebook",
      lines: [
        {
          speaker: "",
          text: "Чернила густеют на морозе. В тетради — недописанный Ленский, кудри, бардак на столе и идеальные полки. И Рылеев на полях.",
        },
        {
          speaker: "",
          text: "Сегодня строка может стать знаменем — или остаться только твоей.",
        },
      ],
      choices: [
        {
          id: "n1",
          label: "Дописать и отдать солдатам как листовку.",
          delta: { ink: 2, fire: 1 },
          markTalked: "notebook",
          next: "square",
        },
        {
          id: "n2",
          label: "Оставить себе. Свидетель тоже пишет историю.",
          delta: { ink: 2 },
          markTalked: "notebook",
          next: "square",
        },
      ],
    }),
    courier: t({
      id: "courier",
      lines: [
        {
          speaker: "Курьер",
          text: "От Зимнего. Государь выезжает. Картечь уже на Исаакиевской. Кто хочет жить — расходится.",
        },
        {
          speaker: "Курьер",
          text: "Тебе, Женя, предлагают забвение. Лондон помнит тебя. Сибирь — тоже вариант, если останешься честной тенью.",
        },
      ],
      choices: [
        {
          id: "c-hold",
          label: "Остаться на площади до конца.",
          next: "finale-hold",
        },
        {
          id: "c-london",
          label: "Уйти. Жить и писать об этом издали.",
          next: "finale-london",
        },
      ],
    }),
    "finale-hold": t({
      id: "finale-hold",
      lines: [
        {
          speaker: "",
          text: "Николай выезжает сам. Каре не расходится. Снег скрипит под копытами, как бумага под ножом.",
        },
        {
          speaker: "Николай I",
          text: "Именем присяги — разойтись. Завтра я буду императором. Сегодня я ещё могу простить глупость.",
        },
        {
          speaker: "Рылеев",
          text: "Женя. Последнее слово — твоё. Не моё. Ты здесь не гость.",
        },
      ],
      choices: [
        {
          id: "f-verse",
          label: "Ответить стихом — громко, чтобы слышали солдаты.",
          next: "end-check-verse",
        },
        {
          id: "f-stand",
          label: "Молча не сойти. Плечо к плечу с каре.",
          next: "end-check-stand",
        },
        {
          id: "f-spare",
          label: "Шагнуть вперёд и говорить с Николаем как с человеком.",
          next: "end-check-talk",
        },
      ],
    }),
    "finale-london": t({
      id: "finale-london",
      lines: [
        {
          speaker: "",
          text: "Ты уходишь до картечи. Нева слева, туман как лондонский. За спиной остаётся площадь, которая не простит, но поймёт.",
        },
      ],
      choices: [
        {
          id: "go-london",
          label: "Сесть на корабль и помнить.",
          ending: "london",
        },
      ],
    }),
  };
}

export function resolveEnding(kind: "verse" | "stand" | "talk", stats: Stats): EndingId {
  if (kind === "verse") {
    if (stats.ink >= 3 && stats.fire >= 2) return "scaffold";
    if (stats.ink >= 2) return "witness";
    return "siberia";
  }
  if (kind === "stand") {
    if (stats.honor >= 3 && stats.fire >= 2) return "scaffold";
    if (stats.honor >= 2) return "siberia";
    return "witness";
  }
  if (stats.honor >= 3 && stats.ink >= 2) return "witness";
  if (stats.fire >= 3) return "siberia";
  return "london";
}

export const ENDINGS: Record<
  EndingId,
  { title: string; kicker: string; body: string[] }
> = {
  scaffold: {
    title: "Пять верёвок и шестая тень",
    kicker: "Романтический конец",
    body: [
      "Картечь рвёт каре. Потом следствие, Алексеевский равелин, слова, которые нельзя взять назад.",
      "Рылеев шутит накануне. Ты пишешь до утра. Имя Женя не попадает в казённый список целиком — его прячут друзья в письмах.",
      "Площадь помнит не приговор, а то, что кто-то стоял, когда диктатор не пришёл.",
    ],
  },
  siberia: {
    title: "Дорога длиннее Невы",
    kicker: "Каторга и живые письма",
    body: [
      "Тебя не вешают. Вешают пятерых. Тебе — Сибирь, кандалы, и стол, на котором снова бардак, едва начинается строка.",
      "Полки в каземате идеальны. Кудри — уже не до них. Зато письма идут на запад, и в них больше правды, чем в манифестах.",
    ],
  },
  london: {
    title: "Туман на Темзе",
    kicker: "Жить, чтобы свидетельствовать",
    body: [
      "Лондон принимает тебя без мундира. Душа, затерявшаяся между империей и этим городом, наконец выбирает оба.",
      "Ты пишешь о 14 декабря так, чтобы романтика не лгала практике. Восстание остаётся жестом. Жест остаётся твоим.",
    ],
  },
  witness: {
    title: "Свидетель площади",
    kicker: "Слово сильнее картечи",
    body: [
      "Ты не герой следствия и не призрак эмиграции. Ты тот, кто видел пустое место диктатора и не солгал об этом.",
      "Стихи выходят позже, когда Николай уже кажется вечным. Их переписывают тайно. Чацкий бы уехал. Рылеев — нет. Ты делаешь третье: остаёшься голосом.",
    ],
  },
};
