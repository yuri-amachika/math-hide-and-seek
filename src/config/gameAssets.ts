/**
 * ゲームアセット設定ファイル
 * 怪物の画像や音声ファイルのパスを一元管理
 */

export const gameAssets = {
  // 怪物画像の設定
  monster: {
    // 画像パス（public/配下のパスを指定）
    // nullの場合は絵文字フォールバック（👾）を使用
    imagePath: '/assets/monsters/generated-image.png',
    // フォールバック絵文字
    fallbackEmoji: '👾',
    // 画像の説明（アクセシビリティ用）
    altText: 'かいぶつ'
  },

  // サウンドエフェクトの設定
  sounds: {
    // 正解時のSE（オプション）
    success: '/assets/sounds/correctSE.mp3',
    // 不正解時のSE（オプション）
    error: '/assets/sounds/safeSE.mp3',
    // ゲームクリア時のSE（オプション）
    gameClear: '/assets/sounds/clearSE.mp3'
  }
} as const;

/**
 * 使用例:
 * 
 * 画像を使用する場合:
 * monster.imagePath = '/assets/monsters/default.png'
 * 
 * 正解SEを使用する場合:
 * sounds.success = '/assets/sounds/correct.mp3'
 */
