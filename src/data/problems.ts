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
  },
  // 追加問題（A-6〜A-10）
  {
    id: 'A-6',
    step: 'A',
    kind: 'decomposition',
    prompt: '５このどーなつをわけよう',
    question: '２こあげたら、のこりはいくつ？',
    answer: 3,
    total: 5,
    knownPart: 2,
    secondaryPrompt: 'のこりのどーなつをかぞえてみよう'
  },
  {
    id: 'A-7',
    step: 'A',
    kind: 'decomposition',
    prompt: '１０このほしをひだりとみぎにわける',
    question: 'ひだりに６このとき、みぎには？',
    answer: 4,
    total: 10,
    knownPart: 6,
    secondaryPrompt: 'おはじきをうごかしてかぞえよう'
  },
  {
    id: 'A-8',
    step: 'A',
    kind: 'decomposition',
    prompt: '８このぼーるがある',
    question: 'ともだちに１こあげたら、のこりは？',
    answer: 7,
    total: 8,
    knownPart: 1,
    secondaryPrompt: 'のこりのかずをかぞえよう'
  },
  {
    id: 'A-9',
    step: 'A',
    kind: 'decomposition',
    prompt: '６このけーきをわける',
    question: '４こたべたよ。のこりは？',
    answer: 2,
    total: 6,
    knownPart: 4,
    secondaryPrompt: 'のこりのけーきをかぞえよう'
  },
  {
    id: 'A-10',
    step: 'A',
    kind: 'decomposition',
    prompt: '９このくっきーがあるよ',
    question: 'いもうとに５こあげたら、のこりは？',
    answer: 4,
    total: 9,
    knownPart: 5,
    secondaryPrompt: 'じぶんのぶんをかぞえよう'
  },
  // 追加問題（B-6〜B-10）
  {
    id: 'B-6',
    step: 'B',
    kind: 'addition',
    prompt: 'もんすたーがあたらしくやってきたよ',
    question: 'まえから５ひきいて、２ひきふえたら？',
    answer: 7,
    total: 7,
    knownPart: 5,
    secondaryPrompt: 'すうちょくせんでかぞえてみよう',
    visual: {
      type: 'numberLine',
      start: 0,
      end: 10,
      pointerStart: 5,
      pointerTarget: 7,
      mode: 'addition',
      labelLeft: 'すたーと',
      labelRight: 'ごーる'
    }
  },
  {
    id: 'B-7',
    step: 'B',
    kind: 'subtraction',
    prompt: 'くもがとんでいったよ',
    question: '８ひきいて、３ひきとんだら、のこりは？',
    answer: 5,
    total: 8,
    knownPart: 3,
    secondaryPrompt: 'すうちょくせんでもどってみよう',
    visual: {
      type: 'numberLine',
      start: 0,
      end: 10,
      pointerStart: 8,
      pointerTarget: 5,
      mode: 'subtraction',
      labelLeft: 'すたーと',
      labelRight: 'ごーる'
    }
  },
  {
    id: 'B-8',
    step: 'B',
    kind: 'addition',
    prompt: 'おばけがあつまってきた',
    question: '６ひきいて、４ひききたら、ぜんぶで？',
    answer: 10,
    total: 10,
    knownPart: 6,
    secondaryPrompt: 'すうちょくせんですすもう',
    visual: {
      type: 'numberLine',
      start: 0,
      end: 10,
      pointerStart: 6,
      pointerTarget: 10,
      mode: 'addition',
      labelLeft: 'すたーと',
      labelRight: 'ごーる'
    }
  },
  {
    id: 'B-9',
    step: 'B',
    kind: 'subtraction',
    prompt: 'こうもりがねぐらにかえった',
    question: '７ひきいて、２ひきかえったら？',
    answer: 5,
    total: 7,
    knownPart: 2,
    secondaryPrompt: 'のこりをかぞえてみよう',
    visual: {
      type: 'numberLine',
      start: 0,
      end: 10,
      pointerStart: 7,
      pointerTarget: 5,
      mode: 'subtraction',
      labelLeft: 'すたーと',
      labelRight: 'ごーる'
    }
  },
  {
    id: 'B-10',
    step: 'B',
    kind: 'addition',
    prompt: 'ふくろうがきたよ',
    question: '３わいて、６わきたら、ぜんぶで？',
    answer: 9,
    total: 9,
    knownPart: 3,
    secondaryPrompt: 'あわせてなんわかな？',
    visual: {
      type: 'numberLine',
      start: 0,
      end: 10,
      pointerStart: 3,
      pointerTarget: 9,
      mode: 'addition',
      labelLeft: 'すたーと',
      labelRight: 'ごーる'
    }
  },
  // 追加問題（C-6〜C-10）
  {
    id: 'C-6',
    step: 'C',
    kind: 'word',
    prompt: 'くろねこが６ぴき、しろねこが４ひきいるよ',
    question: 'ねこはぜんぶでなんびき？',
    answer: 10,
    total: 10,
    knownPart: 6,
    secondaryPrompt: 'いろがちがってもあわせられるよ',
    visual: {
      type: 'story',
      groups: [
        { label: 'くろねこ', count: 6, color: '#374151', icon: '🐈‍⬛' },
        { label: 'しろねこ', count: 4, color: '#f3f4f6', icon: '🐈' }
      ],
      caption: 'ふたつあわせてなんびきかな？'
    }
  },
  {
    id: 'C-7',
    step: 'C',
    kind: 'word',
    prompt: 'かぼちゃが８こあったよ',
    question: '３こつかったら、のこりは？',
    answer: 5,
    total: 8,
    knownPart: 3,
    secondaryPrompt: 'のこりのかずをかぞえよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'つかったかぼちゃ', count: 3, color: '#fb923c', icon: '🎃' },
        { label: 'のこったかぼちゃ', count: 5, color: '#fbbf24', icon: '🎃' }
      ],
      caption: 'のこりはいくつかな？'
    }
  },
  {
    id: 'C-8',
    step: 'C',
    kind: 'word',
    prompt: 'あめが５こ、がむが７こあるよ',
    question: 'おかしはぜんぶでなんこ？',
    answer: 12,
    total: 12,
    knownPart: 5,
    secondaryPrompt: 'ちがうしゅるいでもたせるよ',
    visual: {
      type: 'story',
      groups: [
        { label: 'あめ', count: 5, color: '#f87171', icon: '🍬' },
        { label: 'がむ', count: 7, color: '#60a5fa', icon: '🍡' }
      ],
      caption: 'ぜんぶでいくつ？'
    }
  },
  {
    id: 'C-9',
    step: 'C',
    kind: 'word',
    prompt: 'ほしが９こかがやいている',
    question: '４こきえたら、のこりは？',
    answer: 5,
    total: 9,
    knownPart: 4,
    secondaryPrompt: 'のこったほしをかぞえよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'きえたほし', count: 4, color: '#94a3b8', icon: '✨' },
        { label: 'のこったほし', count: 5, color: '#fbbf24', icon: '⭐' }
      ],
      caption: 'まだひかっているのは？'
    }
  },
  {
    id: 'C-10',
    step: 'C',
    kind: 'word',
    prompt: 'おばけが６たい、ゆうれいが６たいいる',
    question: 'ぜんぶでなんたい？',
    answer: 12,
    total: 12,
    knownPart: 6,
    secondaryPrompt: 'おなじかずをたすといくつ？',
    visual: {
      type: 'story',
      groups: [
        { label: 'おばけ', count: 6, color: '#c084fc', icon: '👻' },
        { label: 'ゆうれい', count: 6, color: '#94a3b8', icon: '👤' }
      ],
      caption: 'あわせてなんたいかな？'
    }
  },
  {
    id: 'A-11',
    step: 'A',
    kind: 'decomposition',
    prompt: '１２このケーキをふたりでわけよう',
    question: '１２を８と□にわけるとき、□はいくつかな？',
    answer: 4,
    total: 12,
    knownPart: 8,
    secondaryPrompt: 'のこりのケーキをかぞえよう'
  },
  {
    id: 'A-12',
    step: 'A',
    kind: 'decomposition',
    prompt: '９このぼうるがあるよ',
    question: 'ひだりに６こあるとき、みぎにはいくつひつようかな？',
    answer: 3,
    total: 9,
    knownPart: 6,
    secondaryPrompt: 'たりないぶんをかぞえよう'
  },
  {
    id: 'A-13',
    step: 'A',
    kind: 'decomposition',
    prompt: '１１にんのこどもがあそんでいるよ',
    question: '５にんがかえったら、のこりはなんにん？',
    answer: 6,
    total: 11,
    knownPart: 5,
    secondaryPrompt: 'のこったともだちをかぞえよう'
  },
  {
    id: 'A-14',
    step: 'A',
    kind: 'decomposition',
    prompt: '７まいのかーどをわけるよ',
    question: '７を４と□にわけると、□はいくつかな？',
    answer: 3,
    total: 7,
    knownPart: 4,
    secondaryPrompt: 'のこりをかくにんしよう'
  },
  {
    id: 'A-15',
    step: 'A',
    kind: 'decomposition',
    prompt: '１３このくっきーがあるよ',
    question: 'ひだりに９こあるとき、みぎにはなんこ？',
    answer: 4,
    total: 13,
    knownPart: 9,
    secondaryPrompt: 'みぎがわのかずをかぞえよう'
  },
  {
    id: 'A-16',
    step: 'A',
    kind: 'decomposition',
    prompt: '８このりんごをわけよう',
    question: '８を３と□にわけると、□はなんこ？',
    answer: 5,
    total: 8,
    knownPart: 3,
    secondaryPrompt: 'のこりのりんごをかぞえよう'
  },
  {
    id: 'A-17',
    step: 'A',
    kind: 'decomposition',
    prompt: '１４にんのせんしゅがいるよ',
    question: '６にんがねたら、おきているのはなんにん？',
    answer: 8,
    total: 14,
    knownPart: 6,
    secondaryPrompt: 'おきているひとをかぞえよう'
  },
  {
    id: 'A-18',
    step: 'A',
    kind: 'decomposition',
    prompt: '１０このふうせんがあるよ',
    question: 'あかが６こなら、あおはなんこ？',
    answer: 4,
    total: 10,
    knownPart: 6,
    secondaryPrompt: 'あおいふうせんをかぞえよう'
  },
  {
    id: 'A-19',
    step: 'A',
    kind: 'decomposition',
    prompt: '１５このほしがかがやいているよ',
    question: '１５を９と□にわけると、□はいくつ？',
    answer: 6,
    total: 15,
    knownPart: 9,
    secondaryPrompt: 'のこりのほしをかぞえよう'
  },
  {
    id: 'A-20',
    step: 'A',
    kind: 'decomposition',
    prompt: '１１このたまごがあるよ',
    question: 'ひだりに７こあるとき、みぎにはなんこ？',
    answer: 4,
    total: 11,
    knownPart: 7,
    secondaryPrompt: 'みぎがわのたまごをかぞえよう'
  },
  {
    id: 'B-11',
    step: 'B',
    kind: 'addition',
    prompt: '６と５をたすといくつかな？',
    question: '６＋５＝？',
    answer: 11,
    total: 11,
    knownPart: 6,
    secondaryPrompt: 'かずのせんをつかってかんがえよう'
  },
  {
    id: 'B-12',
    step: 'B',
    kind: 'subtraction',
    prompt: '１２から８をひくといくつ？',
    question: '１２－８＝？',
    answer: 4,
    total: 12,
    knownPart: 8,
    secondaryPrompt: 'うしろにもどってかぞえよう'
  },
  {
    id: 'B-13',
    step: 'B',
    kind: 'addition',
    prompt: '８と７をたそう',
    question: '８＋７＝？',
    answer: 15,
    total: 15,
    knownPart: 8,
    secondaryPrompt: '１０をこえるね！'
  },
  {
    id: 'B-14',
    step: 'B',
    kind: 'subtraction',
    prompt: '１０から４をひこう',
    question: '１０－４＝？',
    answer: 6,
    total: 10,
    knownPart: 4,
    secondaryPrompt: 'のこりはいくつかな？'
  },
  {
    id: 'B-15',
    step: 'B',
    kind: 'addition',
    prompt: '９と４をたそう',
    question: '９＋４＝？',
    answer: 13,
    total: 13,
    knownPart: 9,
    secondaryPrompt: '１０のかたまりをつくろう'
  },
  {
    id: 'B-16',
    step: 'B',
    kind: 'subtraction',
    prompt: '１５から９をひくと？',
    question: '１５－９＝？',
    answer: 6,
    total: 15,
    knownPart: 9,
    secondaryPrompt: 'おおきなかずからひこう'
  },
  {
    id: 'B-17',
    step: 'B',
    kind: 'addition',
    prompt: '７と６をたすといくつ？',
    question: '７＋６＝？',
    answer: 13,
    total: 13,
    knownPart: 7,
    secondaryPrompt: 'じゅんばんにかぞえよう'
  },
  {
    id: 'B-18',
    step: 'B',
    kind: 'subtraction',
    prompt: '１３から７をひこう',
    question: '１３－７＝？',
    answer: 6,
    total: 13,
    knownPart: 7,
    secondaryPrompt: 'ゆっくりもどってかぞえよう'
  },
  {
    id: 'B-19',
    step: 'B',
    kind: 'addition',
    prompt: '５と９をたすと？',
    question: '５＋９＝？',
    answer: 14,
    total: 14,
    knownPart: 5,
    secondaryPrompt: 'おおきいほうからかぞえよう'
  },
  {
    id: 'B-20',
    step: 'B',
    kind: 'subtraction',
    prompt: '１４から６をひくと？',
    question: '１４－６＝？',
    answer: 8,
    total: 14,
    knownPart: 6,
    secondaryPrompt: 'のこりをかくにんしよう'
  },
  {
    id: 'C-11',
    step: 'C',
    kind: 'word',
    prompt: 'ぺんぎんが７わ、あざらしが５ひき',
    question: 'どうぶつはぜんぶでなんびき？',
    answer: 12,
    total: 12,
    knownPart: 7,
    secondaryPrompt: 'ちがうどうぶつもいっしょにかぞえよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'ぺんぎん', count: 7, color: '#1e293b', icon: '🐧' },
        { label: 'あざらし', count: 5, color: '#64748b', icon: '🦭' }
      ],
      caption: 'ぜんぶでなんびき？'
    }
  },
  {
    id: 'C-12',
    step: 'C',
    kind: 'word',
    prompt: 'ふうせんが１１こあったよ',
    question: '４ことんでいったら、のこりは？',
    answer: 7,
    total: 11,
    knownPart: 4,
    secondaryPrompt: 'のこったふうせんをかぞえよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'とんだふうせん', count: 4, color: '#94a3b8', icon: '🎈' },
        { label: 'のこったふうせん', count: 7, color: '#f87171', icon: '🎈' }
      ],
      caption: 'まだてにもっているのは？'
    }
  },
  {
    id: 'C-13',
    step: 'C',
    kind: 'word',
    prompt: 'いちごが６こ、めろんが８こあるよ',
    question: 'くだものはぜんぶでなんこ？',
    answer: 14,
    total: 14,
    knownPart: 6,
    secondaryPrompt: 'ふたつのしゅるいをあわせよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'いちご', count: 6, color: '#f87171', icon: '🍓' },
        { label: 'めろん', count: 8, color: '#86efac', icon: '🍈' }
      ],
      caption: 'ぜんぶでいくつ？'
    }
  },
  {
    id: 'C-14',
    step: 'C',
    kind: 'word',
    prompt: 'とりが９わいたよ',
    question: '３わとんでいったら、のこりはなんわ？',
    answer: 6,
    total: 9,
    knownPart: 3,
    secondaryPrompt: 'のこったとりをかぞえよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'とんだとり', count: 3, color: '#94a3b8', icon: '🐦' },
        { label: 'のこったとり', count: 6, color: '#60a5fa', icon: '🐦' }
      ],
      caption: 'まだいるのはなんわ？'
    }
  },
  {
    id: 'C-15',
    step: 'C',
    kind: 'word',
    prompt: 'はなが５ほん、ちょうちょが８ひき',
    question: 'ぜんぶでなんぴき（なんぼん）？',
    answer: 13,
    total: 13,
    knownPart: 5,
    secondaryPrompt: 'はなとちょうちょをあわせよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'はな', count: 5, color: '#f9a8d4', icon: '🌸' },
        { label: 'ちょうちょ', count: 8, color: '#fbbf24', icon: '🦋' }
      ],
      caption: 'あわせていくつ？'
    }
  },
  {
    id: 'C-16',
    step: 'C',
    kind: 'word',
    prompt: 'ぼーるが１３こあったよ',
    question: '８こつかったら、のこりはなんこ？',
    answer: 5,
    total: 13,
    knownPart: 8,
    secondaryPrompt: 'のこったぼーるをかぞえよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'つかったぼーる', count: 8, color: '#94a3b8', icon: '⚽' },
        { label: 'のこったぼーる', count: 5, color: '#60a5fa', icon: '⚽' }
      ],
      caption: 'まだあるのはいくつ？'
    }
  },
  {
    id: 'C-17',
    step: 'C',
    kind: 'word',
    prompt: 'きんぎょが７ひき、めだかが７ひき',
    question: 'おさかなはぜんぶでなんびき？',
    answer: 14,
    total: 14,
    knownPart: 7,
    secondaryPrompt: 'おなじかずをたそう',
    visual: {
      type: 'story',
      groups: [
        { label: 'きんぎょ', count: 7, color: '#fb923c', icon: '🐠' },
        { label: 'めだか', count: 7, color: '#fbbf24', icon: '🐟' }
      ],
      caption: 'ぜんぶでなんびきかな？'
    }
  },
  {
    id: 'C-18',
    step: 'C',
    kind: 'word',
    prompt: 'かさが１２ぼんあったよ',
    question: '５ほんかしたら、のこりはなんぼん？',
    answer: 7,
    total: 12,
    knownPart: 5,
    secondaryPrompt: 'のこったかさをかぞえよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'かしたかさ', count: 5, color: '#94a3b8', icon: '☂️' },
        { label: 'のこったかさ', count: 7, color: '#60a5fa', icon: '☂️' }
      ],
      caption: 'まだあるのはなんぼん？'
    }
  },
  {
    id: 'C-19',
    step: 'C',
    kind: 'word',
    prompt: 'くれよんが６ぼん、えんぴつが９ぼん',
    question: 'ぶんぐはぜんぶでなんぼん？',
    answer: 15,
    total: 15,
    knownPart: 6,
    secondaryPrompt: 'ふたつあわせてかぞえよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'くれよん', count: 6, color: '#f87171', icon: '🖍️' },
        { label: 'えんぴつ', count: 9, color: '#fbbf24', icon: '✏️' }
      ],
      caption: 'ぜんぶでなんぼんかな？'
    }
  },
  {
    id: 'C-20',
    step: 'C',
    kind: 'word',
    prompt: 'こっぷが１０こあったよ',
    question: '６こわれたら、のこりはなんこ？',
    answer: 4,
    total: 10,
    knownPart: 6,
    secondaryPrompt: 'のこったこっぷをかぞえよう',
    visual: {
      type: 'story',
      groups: [
        { label: 'われたこっぷ', count: 6, color: '#94a3b8', icon: '🥤' },
        { label: 'のこったこっぷ', count: 4, color: '#60a5fa', icon: '🥤' }
      ],
      caption: 'まだつかえるのはなんこ？'
    }
  }
];

export interface GameBlueprint {
  cells: GridCell[];
  problemMap: Record<string, Problem>;
}

// ランダムに問題を選択する関数
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const createInitialBlueprint = (): GameBlueprint => {
  // 全問題からランダムに15問を選択
  const selectedProblems = shuffleArray(PROBLEMS).slice(0, 15);

  const cells: GridCell[] = GRID_TEMPLATE.map((cell, index) => ({
    ...cell,
    status: 'idle',
    problemId: selectedProblems[index].id
  }));

  const problemMap: Record<string, Problem> = selectedProblems.reduce<Record<string, Problem>>((acc, problem) => {
    acc[problem.id] = problem;
    return acc;
  }, {});

  return { cells, problemMap };
};
