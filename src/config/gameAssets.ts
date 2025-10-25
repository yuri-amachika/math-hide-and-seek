/**
 * ゲームアセット設定ファイル
 * 怪物の画像や音声ファイルのパスを一元管理
 */

export interface MonsterOption {
  id: string;
  name: string;
  imagePath: string | null;
  fallbackEmoji: string;
  altText: string;
}

export const gameAssets = {
  // 怪物画像の設定（複数指定可能）
  monsters: [
    {
      id: 'monster-1',
      name: 'バンパイア',
      imagePath: './assets/monsters/generated-image_02.png',
      fallbackEmoji: '👾',
      altText: 'バンパイア'
    },
    {
      id: 'monster-2',
      name: 'オニ',
      imagePath: './assets/monsters/generated-image_03.png', // 画像がない場合はフォールバック絵文字を使用
      fallbackEmoji: '�',
      altText: 'オニ'
    },
    {
      id: 'monster-3',
      name: 'ゾンビ',
      imagePath: './assets/monsters/generated-image_04.png',
      fallbackEmoji: '🦖',
      altText: 'ゾンビ'
    },
    {
      id: 'monster-4',
      name: 'しにがみ',
      imagePath: './assets/monsters/generated-image.png',
      fallbackEmoji: '🦖',
      altText: 'しにがみ'
    }
  ] as MonsterOption[],

  // サウンドエフェクトの設定（複数指定可能）
  sounds: {
    // 正解時のSE（複数指定可能、ランダムに再生される）
    success: [
      './assets/sounds/correctSE.mp3',
      './assets/sounds/correctSE_02.mp3',
      './assets/sounds/correctSE_03.mp3',
      './assets/sounds/correctSE_04.mp3',
      './assets/sounds/correctSE_05.mp3'
      // 追加の正解SEをここに記述
      // './assets/sounds/correct2.mp3',
      // './assets/sounds/correct3.mp3'
    ],
    // 不正解時のSE（オプション）
    error: './assets/sounds/safeSE.mp3',
    // ゲームクリア時のSE（オプション）
    gameClear: './assets/sounds/clearSE.mp3'
  }
} as const;

/**
 * 使用例:
 * 
 * 怪物を追加する場合:
 * monsters配列に新しいオブジェクトを追加
 * {
 *   id: 'monster-4',
 *   name: 'きいろのかいぶつ',
 *   imagePath: './assets/monsters/yellow.png',
 *   fallbackEmoji: '⭐',
 *   altText: 'きいろのかいぶつ'
 * }
 * 
 * 正解SEを追加する場合:
 * sounds.success配列に新しいパスを追加
 * './assets/sounds/correct2.mp3'
 */
