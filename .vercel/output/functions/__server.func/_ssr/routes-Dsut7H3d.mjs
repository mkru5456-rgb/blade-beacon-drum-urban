import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dsut7H3d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function pronouns(g) {
	if (g === "m") return {
		nom: "он",
		acc: "его",
		dat: "ему",
		adj: "милый",
		came: "пришёл"
	};
	return {
		nom: "она",
		acc: "её",
		dat: "ей",
		adj: "милая",
		came: "пришла"
	};
}
function clampStat(n) {
	return Math.max(0, Math.min(6, n));
}
var initial = {
	screen: "title",
	gender: "f",
	ribbon: true,
	stats: {
		fire: 1,
		ink: 1,
		honor: 1
	},
	talked: [],
	nodeId: null,
	ending: null,
	started: false
};
var useGame = create()(persist((set, get) => ({
	...initial,
	start: (gender, ribbon) => set({
		gender,
		ribbon,
		started: true,
		screen: "talk",
		nodeId: "intro",
		stats: {
			fire: 1,
			ink: 1,
			honor: 1
		},
		talked: [],
		ending: null
	}),
	goSquare: () => set({
		screen: "square",
		nodeId: null
	}),
	openTalk: (nodeId) => set({
		screen: "talk",
		nodeId
	}),
	applyChoice: (delta, markTalked) => {
		const stats = { ...get().stats };
		if (delta) Object.keys(delta).forEach((k) => {
			stats[k] = clampStat(stats[k] + (delta[k] ?? 0));
		});
		set({
			stats,
			talked: markTalked ? Array.from(/* @__PURE__ */ new Set([...get().talked, markTalked])) : get().talked
		});
	},
	setEnding: (id) => set({
		screen: "ending",
		ending: id,
		nodeId: null
	}),
	reset: () => set({ ...initial })
}), { name: "zhenya-senat-v1" }));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 min-h-11 px-5 text-sm font-medium tracking-wide transition-opacity duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", {
	variants: { variant: {
		primary: "bg-accent text-accent-fg rounded-[var(--radius-sm)]",
		ghost: "bg-transparent text-fg border border-border rounded-[var(--radius-sm)] hover:bg-elevated",
		quiet: "bg-elevated text-fg rounded-[var(--radius-sm)] hover:bg-surface"
	} },
	defaultVariants: { variant: "primary" }
});
function Button({ className, variant, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({ variant }), className),
		...props
	});
}
var ART = {
	square: "/art/square.jpg",
	zhenya: "/art/zhenya.jpg",
	portraits: {
		ryleev: "/art/ryleev.jpg",
		bestuzhev: "/art/bestuzhev.jpg",
		kakhovsky: "/art/kakhovsky.jpg",
		empty: "/art/empty.jpg",
		notebook: "/art/notebook.jpg",
		courier: "/art/courier.jpg"
	}
};
function portraitFor(nodeId) {
	if (!nodeId) return ART.zhenya;
	if (nodeId === "intro" || nodeId.startsWith("finale")) return ART.zhenya;
	if (nodeId in ART.portraits) return ART.portraits[nodeId];
	return ART.square;
}
function interpolate(text, p) {
	return text.replaceAll("{nom}", p.nom).replaceAll("{acc}", p.acc).replaceAll("{dat}", p.dat).replaceAll("{adj}", p.adj).replaceAll("{came}", p.came);
}
var NPCS = [
	{
		id: "ryleev",
		name: "Рылеев",
		role: "поэт Северного общества",
		hint: "У Медного всадника",
		x: "22%",
		y: "42%"
	},
	{
		id: "bestuzhev",
		name: "Бестужев",
		role: "с солдатами Московского полка",
		hint: "У каре",
		x: "68%",
		y: "38%"
	},
	{
		id: "kakhovsky",
		name: "Каховский",
		role: "пистолет под шинелью",
		hint: "У Адмиралтейства",
		x: "48%",
		y: "62%"
	},
	{
		id: "empty",
		name: "Диктатор",
		role: "место, которое пусто",
		hint: "Трубецкой не явился",
		x: "78%",
		y: "68%"
	},
	{
		id: "notebook",
		name: "Тетрадь",
		role: "чернила на морозе",
		hint: "Твои стихи",
		x: "14%",
		y: "72%"
	},
	{
		id: "courier",
		name: "Курьер",
		role: "от Зимнего",
		hint: "Не ходи, пока не поговоришь",
		x: "52%",
		y: "18%"
	}
];
function introNode(g) {
	const p = pronouns(g);
	return {
		id: "intro",
		lines: [
			{
				speaker: "",
				text: "Петербург. 14 декабря 1825. Мороз режет щёки. Сенатская площадь держит дыхание, как зал перед увертюрой."
			},
			{
				speaker: "",
				text: `Женя {came} с той стороны Невы, где фонари ещё помнят Лондон. Хвостик или крабик — неважно: оба состояния — это ты. Сейчас тебя зовут Женя, и {nom} здесь не зритель.`
			},
			{
				speaker: "",
				text: "Солдаты стоят каре. Диктатора нет. Николай ещё не выехал. У тебя есть несколько часов и несколько слов."
			}
		].map((l) => ({
			...l,
			text: interpolate(l.text, p)
		})),
		choices: [{
			id: "to-square",
			label: "Выйти на площадь",
			next: "square"
		}]
	};
}
function npcNodes(g) {
	const p = pronouns(g);
	const t = (n) => ({
		...n,
		lines: n.lines.map((l) => ({
			...l,
			text: interpolate(l.text, p)
		}))
	});
	return {
		ryleev: t({
			id: "ryleev",
			lines: [
				{
					speaker: "Рылеев",
					text: "Женя. Я ждал тебя. Стихи накануне писались плохо: слишком много правды, слишком мало рифмы."
				},
				{
					speaker: "Рылеев",
					text: "Северное общество стоит. Южное — в Киеве, Пестель далеко. Здесь решает слово, сказанное солдатам, и то, что мы не разбежимся."
				},
				{
					speaker: "Рылеев",
					text: "Скажи мне как поэту: сегодня мы делаем историю или красивую гибель?"
				}
			],
			choices: [
				{
					id: "r1",
					label: "Историю. Даже если она горькая.",
					delta: {
						honor: 1,
						fire: 1
					},
					markTalked: "ryleev",
					next: "square"
				},
				{
					id: "r2",
					label: "Гибель тоже бывает верной, Кондратий.",
					delta: {
						ink: 1,
						fire: 1
					},
					markTalked: "ryleev",
					next: "square"
				},
				{
					id: "r3",
					label: "Давай сначала удержать солдат. Романтика потом.",
					delta: { honor: 1 },
					markTalked: "ryleev",
					next: "square"
				}
			]
		}),
		bestuzhev: t({
			id: "bestuzhev",
			lines: [{
				speaker: "Бестужев",
				text: "Московский полк замёрз, но стоит. Я сказал им, что Константин присягал конституции. Это почти правда."
			}, {
				speaker: "Бестужев",
				text: "Они смотрят на тебя. Не на мундир — на лицо. Солдату нужен человек, которому можно верить сегодня до вечера."
			}],
			choices: [
				{
					id: "b1",
					label: "Выйти к каре и говорить прямо.",
					delta: {
						fire: 1,
						honor: 1
					},
					markTalked: "bestuzhev",
					next: "square"
				},
				{
					id: "b2",
					label: "Прочесть им строки — не манифест, стих.",
					delta: { ink: 2 },
					markTalked: "bestuzhev",
					next: "square"
				},
				{
					id: "b3",
					label: "Молча встать в ряд. Тепло плечом к плечу.",
					delta: { honor: 2 },
					markTalked: "bestuzhev",
					next: "square"
				}
			]
		}),
		kakhovsky: t({
			id: "kakhovsky",
			lines: [{
				speaker: "Каховский",
				text: "Пистолет заряжен. Милорадович выедет уговаривать. Кто-то должен кончить уговоры."
			}, {
				speaker: "Каховский",
				text: "Ты не любишь кровь без романтики. Я тоже. Но площади не читают элегий."
			}],
			choices: [
				{
					id: "k1",
					label: "Не стреляй первым. Это не восстание, а казнь.",
					delta: { honor: 1 },
					markTalked: "kakhovsky",
					next: "square"
				},
				{
					id: "k2",
					label: "Если выедет Николай — не дай площади стать театром.",
					delta: { fire: 2 },
					markTalked: "kakhovsky",
					next: "square"
				},
				{
					id: "k3",
					label: "Спрячь пистолет. Сегодня побеждает стойкость, не пуля.",
					delta: {
						ink: 1,
						honor: 1
					},
					markTalked: "kakhovsky",
					next: "square"
				}
			]
		}),
		empty: t({
			id: "empty",
			lines: [{
				speaker: "",
				text: "Место диктатора пусто. Князь Трубецкой не вышел. Снег лежит ровно, как не начатая страница."
			}, {
				speaker: "",
				text: "Кто-то должен занять это место — или честно сказать, что вождя нет, а площадь всё равно наша."
			}],
			choices: [{
				id: "e1",
				label: "Встать туда. Не как князь — как Женя.",
				delta: {
					fire: 2,
					honor: 1
				},
				markTalked: "empty",
				next: "square"
			}, {
				id: "e2",
				label: "Оставить пустоту. Пусть правда будет видна.",
				delta: {
					ink: 1,
					honor: 1
				},
				markTalked: "empty",
				next: "square"
			}]
		}),
		notebook: t({
			id: "notebook",
			lines: [{
				speaker: "",
				text: "Чернила густеют на морозе. В тетради — недописанный Ленский, кудри, бардак на столе и идеальные полки. И Рылеев на полях."
			}, {
				speaker: "",
				text: "Сегодня строка может стать знаменем — или остаться только твоей."
			}],
			choices: [{
				id: "n1",
				label: "Дописать и отдать солдатам как листовку.",
				delta: {
					ink: 2,
					fire: 1
				},
				markTalked: "notebook",
				next: "square"
			}, {
				id: "n2",
				label: "Оставить себе. Свидетель тоже пишет историю.",
				delta: { ink: 2 },
				markTalked: "notebook",
				next: "square"
			}]
		}),
		courier: t({
			id: "courier",
			lines: [{
				speaker: "Курьер",
				text: "От Зимнего. Государь выезжает. Картечь уже на Исаакиевской. Кто хочет жить — расходится."
			}, {
				speaker: "Курьер",
				text: "Тебе, Женя, предлагают забвение. Лондон помнит тебя. Сибирь — тоже вариант, если останешься честной тенью."
			}],
			choices: [{
				id: "c-hold",
				label: "Остаться на площади до конца.",
				next: "finale-hold"
			}, {
				id: "c-london",
				label: "Уйти. Жить и писать об этом издали.",
				next: "finale-london"
			}]
		}),
		"finale-hold": t({
			id: "finale-hold",
			lines: [
				{
					speaker: "",
					text: "Николай выезжает сам. Каре не расходится. Снег скрипит под копытами, как бумага под ножом."
				},
				{
					speaker: "Николай I",
					text: "Именем присяги — разойтись. Завтра я буду императором. Сегодня я ещё могу простить глупость."
				},
				{
					speaker: "Рылеев",
					text: "Женя. Последнее слово — твоё. Не моё. Ты здесь не гость."
				}
			],
			choices: [
				{
					id: "f-verse",
					label: "Ответить стихом — громко, чтобы слышали солдаты.",
					next: "end-check-verse"
				},
				{
					id: "f-stand",
					label: "Молча не сойти. Плечо к плечу с каре.",
					next: "end-check-stand"
				},
				{
					id: "f-spare",
					label: "Шагнуть вперёд и говорить с Николаем как с человеком.",
					next: "end-check-talk"
				}
			]
		}),
		"finale-london": t({
			id: "finale-london",
			lines: [{
				speaker: "",
				text: "Ты уходишь до картечи. Нева слева, туман как лондонский. За спиной остаётся площадь, которая не простит, но поймёт."
			}],
			choices: [{
				id: "go-london",
				label: "Сесть на корабль и помнить.",
				ending: "london"
			}]
		})
	};
}
function resolveEnding(kind, stats) {
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
var ENDINGS = {
	scaffold: {
		title: "Пять верёвок и шестая тень",
		kicker: "Романтический конец",
		body: [
			"Картечь рвёт каре. Потом следствие, Алексеевский равелин, слова, которые нельзя взять назад.",
			"Рылеев шутит накануне. Ты пишешь до утра. Имя Женя не попадает в казённый список целиком — его прячут друзья в письмах.",
			"Площадь помнит не приговор, а то, что кто-то стоял, когда диктатор не пришёл."
		]
	},
	siberia: {
		title: "Дорога длиннее Невы",
		kicker: "Каторга и живые письма",
		body: ["Тебя не вешают. Вешают пятерых. Тебе — Сибирь, кандалы, и стол, на котором снова бардак, едва начинается строка.", "Полки в каземате идеальны. Кудри — уже не до них. Зато письма идут на запад, и в них больше правды, чем в манифестах."]
	},
	london: {
		title: "Туман на Темзе",
		kicker: "Жить, чтобы свидетельствовать",
		body: ["Лондон принимает тебя без мундира. Душа, затерявшаяся между империей и этим городом, наконец выбирает оба.", "Ты пишешь о 14 декабря так, чтобы романтика не лгала практике. Восстание остаётся жестом. Жест остаётся твоим."]
	},
	witness: {
		title: "Свидетель площади",
		kicker: "Слово сильнее картечи",
		body: ["Ты не герой следствия и не призрак эмиграции. Ты тот, кто видел пустое место диктатора и не солгал об этом.", "Стихи выходят позже, когда Николай уже кажется вечным. Их переписывают тайно. Чацкий бы уехал. Рылеев — нет. Ты делаешь третье: остаёшься голосом."]
	}
};
function Dialogue() {
	const { gender, nodeId, stats, applyChoice, goSquare, setEnding, openTalk } = useGame();
	if (!nodeId) return null;
	const nodes = npcNodes(gender);
	const node = nodeId === "intro" ? introNode(gender) : nodes[nodeId];
	const portrait = portraitFor(nodeId);
	if (!node) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-xl px-5 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Сцена не найдена."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4",
			onClick: goSquare,
			children: "На площадь"
		})]
	});
	const onChoice = (c) => {
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
			const ending = resolveEnding(c.next.replace("end-check-", ""), {
				fire: stats.fire + (c.delta?.fire ?? 0),
				ink: stats.ink + (c.delta?.ink ?? 0),
				honor: stats.honor + (c.delta?.honor ?? 0)
			});
			setEnding(ending);
			return;
		}
		if (c.next) openTalk(c.next);
	};
	const canBack = nodeId !== "intro" && nodeId !== "courier" && !nodeId.startsWith("finale");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: ART.square,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/75" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-dvh max-w-xl flex-col justify-end gap-5 px-5 py-8 sm:justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-[var(--radius-xl)] border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: portrait,
							alt: "",
							className: "h-52 w-full object-cover object-top sm:h-72"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4 rounded-[var(--radius-xl)] border border-border bg-surface/92 p-5 sm:p-6",
						children: node.lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [line.speaker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.18em] text-subtle",
								children: line.speaker
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl leading-snug text-fg sm:text-2xl",
								children: line.text
							})]
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: node.choices.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "h-auto min-h-11 w-full justify-start bg-surface/80 py-3 text-left",
							onClick: () => onChoice(c),
							children: c.label
						}, c.id))
					}),
					canBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: goSquare,
						className: "self-start text-sm text-muted hover:text-fg",
						children: "Вернуться"
					}) : null
				]
			})
		]
	});
}
function Ending() {
	const ending = useGame((s) => s.ending);
	const stats = useGame((s) => s.stats);
	const reset = useGame((s) => s.reset);
	if (!ending) return null;
	const data = ENDINGS[ending];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-dvh overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: ART.square,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/75" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-6 px-5 py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.22em] text-subtle",
						children: data.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-semibold leading-tight tracking-[-0.03em]",
						children: data.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4 text-base leading-relaxed text-muted",
						children: data.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 text-sm tabular-nums text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Огонь ", stats.fire] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Чернила ", stats.ink] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Честь ", stats.honor] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "self-start",
						onClick: () => reset(),
						children: "Ещё раз, 14 декабря"
					})
				]
			})
		]
	});
}
function Square() {
	const { stats, talked, ribbon, gender, openTalk, reset } = useGame();
	const readyForCourier = talked.filter((id) => id !== "courier").length >= 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-dvh overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: ART.square,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative px-4 py-6 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "mx-auto mb-5 flex max-w-3xl items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.22em] text-subtle",
								children: "14 декабря"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl font-semibold tracking-[-0.03em]",
								children: "Сенатская"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									"Женя · ",
									gender === "m" ? "он" : "она",
									ribbon ? " · хвостик" : ""
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => reset(),
							className: "min-h-11 text-sm text-muted underline-offset-4 hover:text-fg hover:underline",
							children: "Заново"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mb-5 grid max-w-3xl grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Огонь",
								value: stats.fire
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Чернила",
								value: stats.ink
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Честь",
								value: stats.honor
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-5 max-w-3xl overflow-hidden rounded-[var(--radius-xl)] border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: ART.square,
							alt: "Сенатская площадь, зима 1825",
							className: "h-40 w-full object-cover sm:h-56"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2",
						children: NPCS.map((npc) => {
							const done = talked.includes(npc.id);
							const locked = npc.id === "courier" && !readyForCourier;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: locked,
								onClick: () => openTalk(npc.id),
								className: "flex min-h-24 w-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface/90 text-left disabled:opacity-40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: ART.portraits[npc.id],
									alt: "",
									className: "h-24 w-20 shrink-0 object-cover sm:h-28 sm:w-24"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex min-w-0 flex-1 flex-col justify-center px-3 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-xl leading-tight",
											children: npc.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted",
											children: npc.role
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 text-[11px] uppercase tracking-wider text-subtle",
											children: locked ? "позже" : done ? "говорили" : npc.hint
										})
									]
								})]
							}) }, npc.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-muted",
						children: "Поговори хотя бы с тремя на площади. Потом можно принять курьера из Зимнего."
					}),
					readyForCourier ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mt-4 max-w-3xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full sm:w-auto",
							onClick: () => openTalk("courier"),
							children: "Курьер уже здесь"
						})
					}) : null
				]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-md)] border border-border bg-surface/90 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] uppercase tracking-[0.18em] text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl tabular-nums leading-none",
			children: value
		})]
	});
}
function TitleScreen() {
	const start = useGame((s) => s.start);
	const [gender, setGender] = (0, import_react.useState)("f");
	const [ribbon, setRibbon] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-dvh overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: ART.square,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/55" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid min-h-dvh max-w-5xl gap-6 px-5 py-10 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-end sm:px-10 sm:pb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden overflow-hidden rounded-[var(--radius-xl)] border border-border sm:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: ART.zhenya,
						alt: "Женя на Сенатской",
						className: "h-[70dvh] w-full object-cover object-top"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-end gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-[var(--radius-xl)] border border-border sm:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: ART.zhenya,
								alt: "",
								className: "h-56 w-full object-cover object-top"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.28em] uppercase text-muted",
							children: "14 декабря 1825 · Сенатская площадь"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl",
								children: ["Женя", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-muted",
									children: "на Сенатской"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-md text-base leading-relaxed text-muted",
								children: "Ты — поэт среди декабристов. Диктатор не явился. Николай ещё не выехал. Остались слова, каре и мороз."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 rounded-[var(--radius-xl)] border border-border bg-surface/90 p-5 sm:p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-xs uppercase tracking-[0.18em] text-subtle",
									children: "Сейчас я"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
										active: gender === "m",
										onClick: () => setGender("m"),
										label: "Он"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
										active: gender === "f",
										onClick: () => setGender("f"),
										label: "Она"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "Внешнее может не совпасть. Оба состояния — ты. Зовут Женя."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs uppercase tracking-[0.18em] text-subtle",
								children: "Хвостик"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									active: ribbon,
									onClick: () => setRibbon(true),
									label: "Есть"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									active: !ribbon,
									onClick: () => setRibbon(false),
									label: "Без"
								})]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full sm:w-auto sm:self-start",
							onClick: () => start(gender, ribbon),
							children: "Выйти на площадь"
						})
					]
				})]
			})
		]
	});
}
function Toggle({ active, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "min-h-11 rounded-[var(--radius-sm)] border px-3 text-sm transition-colors duration-150 " + (active ? "border-border-strong bg-accent text-accent-fg" : "border-border bg-elevated text-fg"),
		children: label
	});
}
function GameRoot() {
	const screen = useGame((s) => s.screen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			screen === "title" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, {}) : null,
			screen === "square" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {}) : null,
			screen === "talk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialogue, {}) : null,
			screen === "ending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ending, {}) : null
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRoot, {});
}
//#endregion
export { Home as component };
