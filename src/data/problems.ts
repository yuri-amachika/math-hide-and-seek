import { GridCell, Problem } from '../types/game';

const GRID_TEMPLATE: Array<{ id: number; row: number; col: number }> = [
  { id: 1, row: 0, col: 0 },
  { id: 2, row: 0, col: 1 },
  { id: 3, row: 0, col: 2 },
  { id: 4, row: 0, col: 3 },
  { id: 5, row: 0, col: 4 },
  { id: 6, row: 1, col: 0 },
  { id: 7, row: 1, col: 1 },
  { id: 8, row: 1, col: 2 },
  { id: 9, row: 1, col: 3 },
  { id: 10, row: 1, col: 4 },
  { id: 11, row: 2, col: 0 },
  { id: 12, row: 2, col: 1 },
  { id: 13, row: 2, col: 2 },
  { id: 14, row: 2, col: 3 },
  { id: 15, row: 2, col: 4 }
];

const PROBLEMS: Problem[] = [
  {
    id: 'A-1',
    step: 'A',
    kind: 'decomposition',
    prompt: '１０のおはじきをふたりでわけよう',
    question: '１０を７と□にわけるとき、□はいくつかな？',
    answer: 3,
    total: 10,
    knownPart: 7,
    secondaryPrompt: 'おはじきをたっちしてうごかしてみよう'
  },
  {
    id: 'A-2',
    step: 'A',
    kind: 'decomposition',
    prompt: '８このきゃんでぃーをわけるよ',
    question: 'ひだりに５こあるとき、みぎにはいくつひつようかな？',
    answer: 3,
    total: 8,
    knownPart: 5,
    secondaryPrompt: 'たりないぶんをみぎがわへどらっぐしよう'
  },
  {
    id: 'A-3',
    step: 'A',
    kind: 'decomposition',
    prompt: '６にんのおともだちがかくれているよ',
    question: '３にんみつかったら、のこりはなんにん？',
    answer: 3,
    total: 6,
    knownPart: 3,
    secondaryPrompt: 'のこりのにんずうをかぞえてみよう'
  },
  {
    id: 'A-4',
    step: 'A',
    kind: 'decomposition',
    prompt: '９このおばけきゃんでぃーをやまわけ',
    question: '４こをかいぶつがたべたよ。のこりは？',
    answer: 5,
    total: 9,
    knownPart: 4,
    secondaryPrompt: 'のこりのおさらにどらっぐしてかぞえよう'
  },
  {
    id: 'A-5',
    step: 'A',
    kind: 'decomposition',
    prompt: '７このらいとをさゆうにならべてみよう',
    question: 'ひだりに２こあるとき、みぎにはいくつおけばいいかな？',
    answer: 5,
    total: 7,
    knownPart: 2,
    secondaryPrompt: 'らいとをたっぷしてうごかしてみよう'
  },
  {
    id: 'B-1',
    step: 'B',
    kind: 'addition',
    prompt: 'もんすたーが３にんつれてきたよ',
    question: 'もともと４にんかくれていたらぜんぶでなんにんかな？',
    answer: 7,
    total: 7,
    knownPart: 4,
    secondaryPrompt: 'すうちょくせんをすすんでみよう',
    visual: {
      type: 'numberLine',
      start: 0,
      end: 10,
      pointerStart: 4,
      pointerTarget: 7,
      mode: 'addition',
      labelLeft: 'すたーと',
      labelRight: 'ごーる'
    }
  },
  {
    id: 'B-2',
    step: 'B',
    kind: 'addition',
    prompt: 'たからばこに５このかぎがはいっているよ',
    question: 'そこに２こかぎをたしたらなんこ？',
    answer: 7,
    total: 7,
    knownPart: 5,
    secondaryPrompt: '１０のまとまりをいしきしよう',
    visual: {
      type: 'numberLine',
      start: 0,
      end: 10,
      pointerStart: 5,
      pointerTarget: 7,
      mode: 'addition',
      labelLeft: '５からすたーと',
      labelRight: 'たしたあと'
    }
  },
  {
    id: 'B-3',
    step: 'B',
    kind: 'addition',
    prompt: '９ひきのこうもりがいるところへ３びきがあたらしくやってきたよ',
    question: 'ぜんぶでなんびきになった？',
    answer: 12,
    total: 12,
    knownPart: 9,
    secondaryPrompt: '１０をこえるときのかんがえかたをかくにん',
    visual: {
      type: 'numberLine',
      start: 0,
      end: 15,
      pointerStart: 9,
      pointerTarget: 12,
      mode: 'addition',
      labelLeft: '９からすすむ',
      labelRight: 'こたえのばしょ'
    }
  },
  {
    id: 'B-4',
    step: 'B',
    kind: 'subtraction',
    prompt: 'あかりが１２こついているへやで、３こきえたよ',
    question: 'のこったあかりはいくつかな？',
    answer: 9,
    total: 12,
    knownPart: 3,
    secondaryPrompt: 'すうちょくせんで３つもどってみよう',
    visual: {
      type: 'numberLine',
      start: 0,
      end: 12,
      pointerStart: 12,
      pointerTarget: 9,
      mode: 'subtraction',
      labelLeft: '０',
      labelRight: 'のこり'
    }
  },
  {
    id: 'B-5',
    step: 'B',
    kind: 'addition',
    prompt: '８このぼたんに２こついかするよ',
    question: '１０のまとまりはいくつできるかな？',
    answer: 10,
    total: 10,
    knownPart: 8,
    secondaryPrompt: '１０ふれーむでかくにんしよう',
    visual: {
      type: 'tenFrame',
      frames: [
        { title: 'いまあるかず', filled: 8 },
        { title: 'ふえたかず', filled: 2 }
      ]
    }
  },
  {
    id: 'C-1',
    step: 'C',
    kind: 'subtraction',
    prompt: '１２にんのひとがへやにいたけど、５にんにげたよ',
    question: 'のこりはなんにんかな？',
    answer: 7,
    total: 12,
    knownPart: 5,
    secondaryPrompt: '１０のたばからかりてかぞえよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'のこったひと', count: 7, color: '#ff6b81', icon: '🧍' },
        { label: 'にげたひと', count: 5, color: '#6c8bff', icon: '🏃' }
      ],
      caption: 'にげたひとのぶんをひいてみよう'
    }
  },
  {
    id: 'C-2',
    step: 'C',
    kind: 'word',
    prompt: 'ろうそくが１０ほんともっている。ひだりのつくえから３ほんけしたよ',
    question: 'つくえのうえにはなんほんのこったかな？',
    answer: 7,
    total: 10,
    knownPart: 3,
    secondaryPrompt: 'いらすとのほんすうをかぞえよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'ひだりのつくえ', count: 3, color: '#ffd369', icon: '🕯️' },
        { label: 'みぎのつくえ', count: 7, color: '#b084ff', icon: '🕯️' }
      ],
      caption: 'けしたぶんをひいてのこりをかんがえよう'
    }
  },
  {
    id: 'C-3',
    step: 'C',
    kind: 'word',
    prompt: 'ひきだしに９このおかし、てーぶるに４こあるよ',
    question: 'ぜんぶでなんこ？',
    answer: 13,
    total: 13,
    knownPart: 9,
    secondaryPrompt: 'ずをみてかずをたそう',
    visual: {
      type: 'story',
      groups: [
        { label: 'ひきだし', count: 9, color: '#68d391', icon: '🍬' },
        { label: 'てーぶる', count: 4, color: '#63b3ed', icon: '🍬' }
      ],
      caption: 'ぜんぶでいくつかたしざんしよう'
    }
  },
  {
    id: 'C-4',
    step: 'C',
    kind: 'subtraction',
    prompt: '１０このふうせんから４ことんでいったよ',
    question: 'のこりはなんこ？',
    answer: 6,
    total: 10,
    knownPart: 4,
    secondaryPrompt: 'かりてくるかんがえかたでかくにん',
    visual: {
      type: 'story',
      groups: [
        { label: 'のこったふうせん', count: 6, color: '#ff9b6a', icon: '🎈' },
        { label: 'とんでいったふうせん', count: 4, color: '#9f7aea', icon: '🎈' }
      ],
      caption: 'とんだぶんをひいてみよう'
    }
  },
  {
    id: 'C-5',
    step: 'C',
    kind: 'word',
    prompt: 'ももが７こ、りんごが５こあるよ',
    question: 'くだものはぜんぶでなんこ？',
    answer: 12,
    total: 12,
    knownPart: 7,
    secondaryPrompt: 'ちがうしゅるいでもたしざんできるよ',
    visual: {
      type: 'story',
      groups: [
        { label: 'もも', count: 7, color: '#fb7185', icon: '🍑' },
        { label: 'りんご', count: 5, color: '#facc15', icon: '🍎' }
      ],
      caption: 'ふたつあわせていくつかな？'
    }
  }
];

export interface GameBlueprint {
  cells: GridCell[];
  problemMap: Record<string, Problem>;
}

export const createInitialBlueprint = (): GameBlueprint => {
  const clonedProblems: Problem[] = [...PROBLEMS];
  while (clonedProblems.length < GRID_TEMPLATE.length) {
    clonedProblems.push(...PROBLEMS);
  }

  const cells: GridCell[] = GRID_TEMPLATE.map((cell, index) => ({
    ...cell,
    status: 'idle',
    problemId: clonedProblems[index].id
  }));

  const problemMap: Record<string, Problem> = clonedProblems.reduce<Record<string, Problem>>((acc, problem) => {
    if (!acc[problem.id]) {
      acc[problem.id] = problem;
    }
    return acc;
  }, {});

  return { cells, problemMap };
};
