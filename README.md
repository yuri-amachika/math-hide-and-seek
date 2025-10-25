# Math Hide and Seek / Number Hunter

小学1年生向けのホラー風味算数学習ゲーム。段階的ヒント、セッション管理、ゲームクリア演出を備えたReactアプリケーション。

**Version 0.3.0**

---

## 📋 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [クイックスタート](#クイックスタート)
3. [プロジェクト構造](#プロジェクト構造)
4. [技術スタック](#技術スタック)
5. [開発環境セットアップ](#開発環境セットアップ)
6. [主要機能](#主要機能)
7. [使用方法](#使用方法)
8. [テスト](#テスト)
9. [ビルド・デプロイ](#ビルドデプロイ)
10. [トラブルシューティング](#トラブルシューティング)
11. [参考情報](#参考情報)

---

## プロジェクト概要

### 目的

小学1年生の具体的操作段階に適した算数学習ゲームを提供します。ホラー風味のストーリーテリングで学習意欲を維持しながら、以下の学習目標をサポートします：

- **10までの数の構成・分解**の理解
- **繰り上がり・繰り下がりのない足し算・引き算**の習熟
- **文章問題への段階的な適応**

保護者・教育者には、短時間で集中できるセッション設計と進捗フィードバックを提供します。

### 主要機能（v0.3.0）

- ✅ **15マスのマップ探索**: 怪物が隠れた数字を追跡するインタラクティブなコアループ
- ✅ **適応的ヒントシステム**: 誤答時に3段階（具体→半具体→抽象）でヒント詳細度が上昇
- ✅ **セッション時間管理**: 15分上限＋5分前警告で過度なプレイを防止
- ✅ **アクセシビリティ対応**: `prefers-reduced-motion`、60pxタッチターゲット
- ✅ **ゲームクリア演出**: 紙吹雪アニメーション＋祝福メッセージ＋クリアSE
- ✅ **カスタマイズ可能なアセット**: 怪物画像・効果音を設定ファイルで切り替え可能
- ✅ **完全ひらがな化UI**: 小学1年生が自力で読める表記に統一
- ✅ **モバイル完全対応**: 3段階レスポンシブ（960px/640px/400px）、Apple HIG準拠の44pxタッチ領域
- ✅ **精密なモンスター位置制御**: グリッド座標系との完全一致、全セル（1-15）で中心配置を達成

---

## クイックスタート

### 前提条件

- **Node.js**: 18.x 以上（LTS 推奨）
- **npm**: 10.x 以上
- **OS**: Windows / macOS / Linux

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yuri-amachika/math-hide-and-seek.git
cd math-hide-and-seek

# 依存関係をインストール
npm install
```

### 実行

```bash
# 開発サーバーを起動（http://localhost:5173）
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスし、マップと問題パネルが表示されることを確認してください。

---

## プロジェクト構造

```
math-hide-and-seek/
├── src/                     # アプリケーションソース
│   ├── components/          # UIコンポーネント群
│   │   ├── GameClearModal.tsx      # ゲームクリア演出
│   │   ├── SessionWarning.tsx      # セッション時間警告
│   │   ├── QuestionOverlay.tsx     # 問題表示オーバーレイ
│   │   ├── HudPanel.tsx            # 進捗HUD
│   │   ├── MonsterSprite.tsx       # 怪物アニメーション
│   │   ├── NumberGrid.tsx          # マップグリッド
│   │   └── ProblemVisualizer.tsx   # 数直線・テンフレーム
│   ├── config/              # 設定ファイル
│   │   └── gameAssets.ts    # アセット管理（画像・音声）
│   ├── data/                # 問題テンプレートとグリッド設計
│   │   └── problems.ts      # ステップA～C問題定義
│   ├── hooks/               # カスタムフック
│   │   └── useFeedbackSounds.ts    # 効果音再生
│   ├── store/               # 状態管理
│   │   └── useGameStore.ts  # Zustandストア
│   ├── types/               # TypeScript型定義
│   │   └── game.ts          # ゲーム型定義
│   ├── __tests__/           # Vitestテスト
│   │   └── gameStore.test.ts
│   ├── App.tsx              # メインアプリケーション
│   ├── main.tsx             # エントリーポイント
│   └── styles.css           # グローバルスタイル
├── public/                  # 静的アセット
│   └── assets/
│       ├── monsters/        # 怪物画像（カスタマイズ可能）
│       └── sounds/          # 効果音（カスタマイズ可能）
├── docs/                    # 公開向け設計ドキュメント
│   ├── number-hunter-game-design.md
│   └── gameplay-manual.md
├── internal_docs/           # 内部リサーチ・設計資料
├── .github/
│   ├── workflows/           # GitHub Actions CI/CD
│   │   └── deploy.yml       # 自動デプロイ設定
│   ├── memory_bank/         # プロジェクトコンテキスト管理
│   ├── instructions/        # 開発ガイドライン
│   └── prompts/             # AI支援プロンプト
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.setup.ts
└── README.md
```

### 主要ファイル・フォルダ

| パス | 説明 |
|------|------|
| **`src/App.tsx`** | コアコンポーネント。グリッド選択、モンスター移動、問題表示を統括 |
| **`src/store/useGameStore.ts`** | Zustandによるゲーム状態管理とステートマシン |
| **`src/config/gameAssets.ts`** | 怪物画像・効果音の一元管理設定ファイル |
| **`src/components/GameClearModal.tsx`** | 全問正解時の祝福演出（紙吹雪＋メッセージ） |
| **`src/components/SessionWarning.tsx`** | 15分制限の警告モーダル（5分前＋終了時） |
| **`src/data/problems.ts`** | ステップA～Cに対応した問題テンプレート定義 |
| **`src/hooks/useFeedbackSounds.ts`** | 効果音再生（カスタムSE対応） |
| **`public/assets/monsters/`** | 怪物画像格納フォルダ（PNG推奨、64x64px） |
| **`public/assets/sounds/`** | 効果音格納フォルダ（MP3/WAV対応） |
| **`docs/number-hunter-game-design.md`** | 学習設計・ゲームデザインの要点まとめ |

---

## 技術スタック

### 言語・フレームワーク

- **TypeScript**: 5.6.2
- **React**: 18.3.1
- **Vite**: 5.4.9（高速ビルドツール＋開発サーバー）

### 主要ライブラリ

| ライブラリ | バージョン | 用途 |
|-----------|----------|------|
| `zustand` | 4.5.2 | ゲーム状態管理（軽量・型安全） |
| `immer` | 10.1.1 | Zustandストアでのイミュータブル更新補助 |
| `framer-motion` | 11.5.0 | UIアニメーション、モーダル遷移 |
| `howler` | 2.2.4 | 効果音再生（Web Audio API補完） |
| `canvas-confetti` | 1.9.3 | クリア演出のパーティクル生成 |
| `@tanstack/react-query` | 5.54.1 | 今後のデータ取得・同期基盤 |
| `react-router-dom` | 6.26.2 | ルーティング（将来の拡張用） |

### 開発ツール

- **Vitest**: ユニットテスト／コンポーネントテスト（2.1.3）
- **Testing Library**: UIインタラクション検証（React 15.0.6）
- **TypeScript Compiler (`tsc`)**: 型チェック・Lint代替
- **Tailwind CSS**: ユーティリティクラス導入準備（3.4.10）
- **GitHub Actions**: CI/CD自動デプロイ（`.github/workflows/deploy.yml`）

---

## 開発環境セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/yuri-amachika/math-hide-and-seek.git
cd math-hide-and-seek
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. アセットのカスタマイズ（オプション）

怪物画像や効果音をカスタマイズする場合、以下の手順で設定できます：

#### 怪物画像の変更

```bash
# 1. 画像ファイルを配置
# public/assets/monsters/ に PNG画像を配置（推奨サイズ: 64x64px または 128x128px）

# 2. 設定ファイルを編集
# src/config/gameAssets.ts
```

```typescript
export const gameAssets = {
  monster: {
    imagePath: '/assets/monsters/your-monster.png', // 画像パスを変更
    fallbackEmoji: '👾',
    altText: 'かいぶつ'
  },
  // ...
}
```

#### 効果音の変更

```bash
# 1. 音声ファイルを配置
# public/assets/sounds/ に MP3/WAV ファイルを配置

# 2. 設定ファイルを編集
# src/config/gameAssets.ts
```

```typescript
export const gameAssets = {
  // ...
  sounds: {
    success: '/assets/sounds/your-correct.mp3',  // 正解SE
    error: '/assets/sounds/your-incorrect.mp3',  // 不正解SE
    gameClear: '/assets/sounds/your-victory.mp3' // クリアSE
  }
}
```

**注**: `imagePath` または `sounds.*` を `null` に設定すると、フォールバック（絵文字または合成音）が使用されます。

### 4. 動作確認

```bash
npm run dev
# ブラウザで http://localhost:5173 にアクセスし、マップと問題パネルの表示を確認
```

---

## 主要機能

### 1. マップ探索と怪物移動

グリッドセルをクリックすると怪物が該当地点まで移動し、正答／誤答でセル状態が更新されます。Spring物理アニメーションでスムーズな移動を実現。

```tsx
const handleCellSelect = (cellId: number) => {
  game.selectCell(cellId);
  setMonsterTargetId(cellId);
};
```

### 2. 適応的ヒントシステム（v0.2新機能）

誤答時に3段階でヒント詳細度が上昇し、児童の理解段階をサポートします：

- **Level 1**: テキストヒントのみ（「もんだいをよくよんで、かんがえてみよう」）
- **Level 2**: ビジュアル補助表示（数直線、10フレーム、ストーリー図）
- **Level 3**: 完全ヒント＋補助プロンプト表示

```typescript
// useGameStore.ts
markResult: (result: 'correct' | 'incorrect') => {
  if (result === 'incorrect') {
    const incremented = state.hintLevel + 1;
    nextHintLevel = (incremented > 3 ? 3 : incremented) as HintLevel;
  }
}
```

### 3. セッション時間管理（v0.2新機能）

15分制限で倫理的配慮を実現。段階的警告で保護者と子供双方に配慮：

- **10秒周期チェック**: リアルタイムで残り時間を監視
- **5分前警告**: 「もうすこしあそぶ」「おわりにする」選択肢
- **15分到達**: 「きょうのぼうけんはここまで！」強制終了案内

```tsx
// HudPanel.tsx
const elapsed = getSessionElapsed();
const remaining = Math.max(0, sessionDuration - elapsed);
const remainingFormatted = formatTime(remaining); // MM:SS形式
```

### 4. ゲームクリア演出（v0.3新機能）

全問正解時に祝福演出を表示：

- **紙吹雪アニメーション**: 12個のパーティクルがランダム色・形・軌道で降下
- **虹色グローエフェクト**: グラデーション背景＋レインボーアニメーション
- **励ましメッセージ**: 「きみはすうじはんたーだ！」
- **クリアSE**: カスタム音声またはWeb Audio合成音

```tsx
// App.tsx - ゲームクリア判定
const allSolved = game.cells.every(
  (cell: GridCell) => cell.status === 'solved' || cell.id === game.activeCellId
);
if (allSolved) {
  setTimeout(() => setGameClearVisible(true), 500);
}
```

### 5. カスタマイズ可能なアセット（v0.3新機能）

`src/config/gameAssets.ts` で画像・音声を一元管理。教育現場や家庭での柔軟なカスタマイズをサポート：

```typescript
// gameAssets.ts
export const gameAssets = {
  monster: {
    imagePath: '/assets/monsters/custom.png', // 画像切り替え
    fallbackEmoji: '👾'
  },
  sounds: {
    success: '/assets/sounds/correct.mp3', // カスタムSE
    gameClear: '/assets/sounds/victory.mp3'
  }
}
```

### 6. 問題の視覚化

問題テンプレートに応じて数直線・テンフレーム・ストーリー表示を切り替え、児童の理解段階をサポートします。

```tsx
<QuestionOverlay
  problem={game.currentProblem}
  visible={overlayVisible}
  onSubmit={handleSubmit}
  onClose={handleClose}
  hintLevel={game.hintLevel}
/>
```

### 7. 状態管理と進捗HUD

Zustandストアがセル状態・進捗・直近結果を集約し、HUDで進行度を即時フィードバックします。

```typescript
const store = create<GameStoreState>()((set, get) => ({
  selectCell: (id) => {
    if (get().isLocked) return;
    set({ activeCellId: id, isLocked: true, hintLevel: 1 });
  },
  markResult: (result) => {
    set((state) => ({
      completedCells: result === 'correct' ? state.completedCells + 1 : state.completedCells,
      isLocked: false
    }));
  }
}));
```

---

## 使用方法

### 開発コマンド

```bash
# 開発サーバーを起動（ホットリロード有効）
npm run dev

# 型チェック（リンター相当）
npm run lint

# テスト実行（ウォッチモード）
npm test

# テスト実行（CI向け・1回のみ）
npm run test:run

# 本番ビルドを作成
npm run build

# ビルド成果物をViteプレビューサーバーで確認
npm run preview
```

### アセットのカスタマイズ

#### 怪物画像の変更

1. `public/assets/monsters/` に PNG画像を配置（推奨: 64x64px または 128x128px）
2. `src/config/gameAssets.ts` を編集：

```typescript
export const gameAssets = {
  monster: {
    imagePath: '/assets/monsters/your-monster.png',
    // ...
  }
}
```

3. 開発サーバーを再起動（Vite は自動リロードします）

#### 効果音の変更

1. `public/assets/sounds/` に MP3/WAV ファイルを配置
2. `src/config/gameAssets.ts` を編集：

```typescript
export const gameAssets = {
  sounds: {
    success: '/assets/sounds/your-correct.mp3',
    error: '/assets/sounds/your-incorrect.mp3',
    gameClear: '/assets/sounds/your-victory.mp3'
  }
}
```

3. 開発サーバーを再起動

**ヒント**: `imagePath` や `sounds.*` を `null` に設定すると、フォールバック（絵文字または合成音）が使用されます。

---

## テスト

### テスト実行

```bash
# ウォッチモードで実行
npm test

# CI向けに1回だけ実行
npm run test:run
```

### テストの種類

- **単体テスト**: Vitest + Testing Library でZustandストアやコンポーネントを検証
- **スナップショット／UIテスト**: 今後 `@testing-library/react` を活用して拡張予定

### テストカバレッジ確認

```bash
vitest run --coverage
```

---

## ビルド・デプロイ

### ビルド

```bash
npm run build
# 成果物は dist/ に出力される静的ファイル（HTML, CSS, JS）
```

ビルド成果物の内容：
- `dist/index.html` - エントリーHTML
- `dist/assets/` - バンドルされたJS/CSSファイル
- ファイルサイズ: 約 298 KB (JS) + 12 KB (CSS)

### ローカルプレビュー

```bash
npm run preview
# http://localhost:4173 でビルド成果物を確認
```

### GitHub Pages デプロイ

このプロジェクトはGitHub Actionsで自動デプロイされます：

1. **自動デプロイ**: `main` ブランチへのプッシュで自動ビルド＋デプロイ
2. **ワークフロー**: `.github/workflows/deploy.yml`
3. **公開URL**: https://yuri-amachika.github.io/math-hide-and-seek/

#### 手動デプロイ手順

```bash
# 1. ビルド実行
npm run build

# 2. dist/ フォルダを GitHub Pages にプッシュ
# （GitHub Actions を使用する場合は不要）
```

#### GitHub Actions 設定

- **トリガー**: `main` ブランチへの `push`
- **Node.js**: 18.x
- **ステップ**: `npm ci` → `npm run build` → GitHub Pages へデプロイ
- **Base Path**: `/math-hide-and-seek/`（`vite.config.ts` で設定済み）

### その他の静的ホスティング

Viteのビルド成果物は以下のサービスにも対応：

- **Vercel**: `vercel --prod`
- **Netlify**: `dist/` フォルダをドラッグ＆ドロップ
- **Azure Static Web Apps**: GitHub連携で自動デプロイ
- **任意のWebサーバー**: `dist/` の内容を配信

```bash
# ローカルで静的サーバーをテスト
npx serve dist --listen 3000
```

---

## トラブルシューティング

### Node.js のバージョンエラーが発生する

**症状**: `npm install` や `vite` 実行時にバージョン警告・エラーが出る。

**原因**: Node.js が 18 未満、または npm が 10 未満。

**解決方法**:

```bash
# Node Version Manager を使用して更新
nvm install 18
nvm use 18

# または Node.js 公式サイトから最新LTSをインストール
# https://nodejs.org/
```

### 開発サーバーのポートが既に使用されている

**症状**: `npm run dev` 実行時に `Port 5173 is already in use` と表示される。

**原因**: 既にViteまたは別アプリが 5173 番ポートを使用中。

**解決方法**:

```bash
# 別ポートで起動
npm run dev -- --port 5174
```

### 効果音が再生されない

**症状**: 正解・不正解時にサウンドが鳴らない。

**原因**: ブラウザが自動再生をブロックしている、または AudioContext が初期化前。

**解決方法**:

- 最初にユーザー操作（クリック）を行ってから問題を解く。
- ブラウザの自動再生設定を許可に変更する。
- カスタムSEファイルが存在しない場合は、フォールバック合成音が使用されます。

### カスタム画像・音声が読み込まれない

**症状**: `src/config/gameAssets.ts` で指定した画像・音声が表示/再生されない。

**原因**: ファイルパスの誤り、またはファイルが存在しない。

**解決方法**:

```bash
# 1. ファイルが正しい場所に配置されているか確認
ls public/assets/monsters/  # 怪物画像
ls public/assets/sounds/     # 効果音

# 2. パスが正しいか確認（public/ 以下は / から始まる）
# 正: '/assets/monsters/image.png'
# 誤: 'assets/monsters/image.png'

# 3. 開発サーバーを再起動
npm run dev
```

### TypeScript エラーが表示される

**症状**: `npm run lint` または IDE で型エラーが表示される。

**原因**: 型定義の不一致、または依存関係の更新漏れ。

**解決方法**:

```bash
# 1. 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install

# 2. TypeScript キャッシュをクリア
rm -rf tsconfig.tsbuildinfo tsconfig.node.tsbuildinfo

# 3. 型チェック実行
npm run lint
```

### ビルドエラーが発生する

**症状**: `npm run build` でエラーが発生する。

**原因**: 未使用のインポート、型エラー、または依存関係の問題。

**解決方法**:

```bash
# 1. 型チェックで詳細なエラーを確認
npm run lint

# 2. 開発サーバーでエラーを確認
npm run dev

# 3. 依存関係を確認
npm list
```

### GitHub Pages デプロイが失敗する

**症状**: GitHub Actions ワークフローが失敗する。

**原因**: ビルドエラー、または GitHub Pages 設定の問題。

**解決方法**:

1. GitHub Actions のログを確認（リポジトリの Actions タブ）
2. ローカルでビルドが成功するか確認：`npm run build`
3. GitHub Pages の設定を確認：Settings → Pages → Source = GitHub Actions

### モバイルでのUI表示が崩れる

**症状**: スマートフォンやタブレットで表示が崩れる、または操作しにくい。

**原因**: ブラウザキャッシュ、または古いバージョンのアプリを表示している。

**解決方法**:

```bash
# 開発環境の場合
# 1. ハードリロード（Ctrl+Shift+R / Cmd+Shift+R）
# 2. ブラウザのキャッシュをクリア

# 本番環境の場合
# 1. GitHub Pages の最新デプロイを確認（Actions タブで成功を確認）
# 2. ブラウザのキャッシュをクリア
# 3. プライベートブラウジングモードで確認
```

**確認ポイント**:
- タブレット（960px以下）: 1カラムレイアウト、グリッド320px
- スマホ（640px以下）: グリッド240px、モンスター48px
- 極小スマホ（400px以下）: グリッド200px、モンスター40px
- タッチ領域: すべてのボタンが44px以上

### モンスターの位置がずれる

**症状**: モンスターアイコンが数字セルの中心に配置されず、ずれて表示される。

**原因**: ブラウザキャッシュ、または古いCSS/JSを読み込んでいる。

**解決方法**:

```bash
# 開発環境の場合
npm run dev  # 開発サーバーを再起動

# 本番環境の場合
# 1. ハードリロード（Ctrl+Shift+R / Cmd+Shift+R）
# 2. ブラウザのキャッシュをクリア
```

**技術詳細**:
- v0.3.0以降、`.monster-layer`は`.map-grid`と同じサイズ（高さ）に設定
- グリッドのgap（12px/10px/8px/6px）を正確に計算して位置決定
- モンスターサイズは80px（デスクトップ）、64px（タブレット）、48px（スマホ）、40px（極小）

---

## 参考情報

### 関連ドキュメント

- **`docs/number-hunter-game-design.md`**: 学習ゴールとUX設計の詳細
- **`docs/gameplay-manual.md`**: プレイヤー向け操作マニュアル
- **`internal_docs/frontend-design`**: フロントエンドアーキテクチャ設計メモ
- **`internal_docs/child-study.md`**: 児童発達研究・ゲーミフィケーションの知見
- **`internal_docs/hide-quickly-game-rule.md`**: 初期ゲームルール設計

### プロジェクト管理

- **`.github/memory_bank/`**: プロジェクトコンテキスト管理（activeContext, progress, systemPatterns）
- **`.github/instructions/`**: 開発ガイドライン（Copilot専用インストラクション）
- **`.github/workflows/deploy.yml`**: GitHub Actions 自動デプロイ設定

### 外部リソース

- [React 公式ドキュメント](https://react.dev/) - React の基礎と最新API
- [Vite 公式ドキュメント](https://vitejs.dev/guide/) - ビルドツールとプラグイン
- [Zustand ドキュメント](https://docs.pmnd.rs/zustand/getting-started/introduction) - 状態管理ライブラリ
- [Framer Motion ドキュメント](https://www.framer.com/motion/) - アニメーションライブラリ
- [Vitest ドキュメント](https://vitest.dev/) - テストフレームワーク
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/handbook/intro.html) - TypeScript 型システム

### 学習リソース（教育関係者向け）

- **小学1年生算数カリキュラム**: 10までの数の構成・分解、繰り上がり・繰り下がり
- **具体的操作段階（Piaget）**: 視覚的・触覚的サポートの重要性
- **ZPD理論（Vygotsky）**: 適応的ヒントによる足場かけ
- **倫理的ゲーミフィケーション**: セッション時間制限による過度なプレイ防止

---

**最終更新**: 2025-10-25 (Late Night)  
**ドキュメントバージョン**: 0.3.0  
**最新コミット**: 604ca3e - モンスター位置最適化 + モバイルレスポンシブ実装  
**GitHub Repository**: https://github.com/yuri-amachika/math-hide-and-seek  
**公開デモ**: https://yuri-amachika.github.io/math-hide-and-seek/