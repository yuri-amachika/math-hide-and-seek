# サウンドエフェクトアセット

このフォルダにはゲーム内で使用する音声ファイルを配置します。

## ファイル命名規則

- `correct.mp3` / `correct.wav` - 正解時のSE
- `incorrect.mp3` / `incorrect.wav` - 不正解時のSE
- `game-clear.mp3` / `game-clear.wav` - ゲームクリア時のSE

## 推奨仕様

- **形式**: MP3 または WAV
- **長さ**: 0.5〜2秒程度
- **音量**: 正規化済み（ピーク -3dB推奨）

## 使用方法

`src/config/gameAssets.ts` で使用する音声ファイルを指定できます。
