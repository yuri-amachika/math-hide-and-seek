const GRID_TEMPLATE = [
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
const PROBLEMS = [
    {
        id: 'A-1',
        step: 'A',
        kind: 'decomposition',
        prompt: '10のおはじきを二人で分けよう',
        question: '10を7と□に分けるとき、□はいくつかな？',
        answer: 3,
        total: 10,
        knownPart: 7,
        secondaryPrompt: 'おはじきをタッチで動かしてみよう'
    },
    {
        id: 'A-2',
        step: 'A',
        kind: 'decomposition',
        prompt: '8このキャンディを分けるよ',
        question: '左に5こあるとき、右にはいくつ必要かな？',
        answer: 3,
        total: 8,
        knownPart: 5,
        secondaryPrompt: '足りない分を右側へドラッグしよう'
    },
    {
        id: 'A-3',
        step: 'A',
        kind: 'decomposition',
        prompt: '6人のお友だちがかくれているよ',
        question: '3人みつかったら、のこりは何人？',
        answer: 3,
        total: 6,
        knownPart: 3,
        secondaryPrompt: 'のこりの人数を数えてみよう'
    },
    {
        id: 'A-4',
        step: 'A',
        kind: 'decomposition',
        prompt: '9このおばけキャンディを山分け',
        question: '4こを怪物が食べたよ。のこりは？',
        answer: 5,
        total: 9,
        knownPart: 4,
        secondaryPrompt: 'のこりのお皿にドラッグして数えよう'
    },
    {
        id: 'A-5',
        step: 'A',
        kind: 'decomposition',
        prompt: '7このライトを左右にならべてみよう',
        question: '左に2こあるとき、右にはいくつ置けばいいかな？',
        answer: 5,
        total: 7,
        knownPart: 2,
        secondaryPrompt: 'ライトをタップして動かしてみよう'
    },
    {
        id: 'B-1',
        step: 'B',
        kind: 'addition',
        prompt: 'モンスターが住人を3人つれてきたよ',
        question: 'もともと4人かくれていたら全部で何人かな？',
        answer: 7,
        total: 7,
        knownPart: 4,
        secondaryPrompt: '数直線をすすんでみよう'
    },
    {
        id: 'B-2',
        step: 'B',
        kind: 'addition',
        prompt: '宝箱に5この鍵が入っているよ',
        question: 'そこに2こ鍵をたしたら何こ？',
        answer: 7,
        total: 7,
        knownPart: 5,
        secondaryPrompt: '10のまとまりを意識しよう'
    },
    {
        id: 'B-3',
        step: 'B',
        kind: 'addition',
        prompt: '9このコウモリのなかから3ひきは外に出たよ',
        question: '全部で何ひきになった？',
        answer: 12,
        total: 12,
        knownPart: 9,
        secondaryPrompt: '10をこえるときの考え方を確認'
    },
    {
        id: 'B-4',
        step: 'B',
        kind: 'subtraction',
        prompt: '灯りが12こついている部屋で、3こ消えたよ',
        question: '残った灯りはいくつかな？',
        answer: 9,
        total: 12,
        knownPart: 3,
        secondaryPrompt: '数直線で3つ戻ってみよう'
    },
    {
        id: 'B-5',
        step: 'B',
        kind: 'addition',
        prompt: '8このボタンに2こ追加するよ',
        question: '10のまとまりはいくつできるかな？',
        answer: 10,
        total: 10,
        knownPart: 8,
        secondaryPrompt: '10フレームで確認しよう'
    },
    {
        id: 'C-1',
        step: 'C',
        kind: 'subtraction',
        prompt: '12人のひとが部屋にいたけど、5人逃げたよ',
        question: '残りは何人かな？',
        answer: 7,
        total: 12,
        knownPart: 5,
        secondaryPrompt: '10の束からかりて数えよう'
    },
    {
        id: 'C-2',
        step: 'C',
        kind: 'word',
        prompt: 'ろうそくが10ほん灯っている。左の机から3ほんけしたよ',
        question: '机の上には何ほん残ったかな？',
        answer: 7,
        total: 10,
        knownPart: 3,
        secondaryPrompt: 'イラストの本数を数えよう'
    },
    {
        id: 'C-3',
        step: 'C',
        kind: 'word',
        prompt: 'ひきだしに9このお菓子、テーブルに4こあるよ',
        question: '全部で何こ？',
        answer: 13,
        total: 13,
        knownPart: 9,
        secondaryPrompt: '図をみて数をたそう'
    },
    {
        id: 'C-4',
        step: 'C',
        kind: 'subtraction',
        prompt: '10この風船から4こ飛んでいったよ',
        question: '残りは何こ？',
        answer: 6,
        total: 10,
        knownPart: 4,
        secondaryPrompt: 'かりてくる考え方で確認'
    },
    {
        id: 'C-5',
        step: 'C',
        kind: 'word',
        prompt: 'ももが7こ、りんごが5こあるよ',
        question: '果物は全部で何こ？',
        answer: 12,
        total: 12,
        knownPart: 7,
        secondaryPrompt: 'ちがう種類でも足し算できるよ'
    }
];
export const createInitialBlueprint = () => {
    const clonedProblems = [...PROBLEMS];
    while (clonedProblems.length < GRID_TEMPLATE.length) {
        clonedProblems.push(...PROBLEMS);
    }
    const cells = GRID_TEMPLATE.map((cell, index) => ({
        ...cell,
        status: 'idle',
        problemId: clonedProblems[index].id
    }));
    const problemMap = clonedProblems.reduce((acc, problem) => {
        if (!acc[problem.id]) {
            acc[problem.id] = problem;
        }
        return acc;
    }, {});
    return { cells, problemMap };
};
