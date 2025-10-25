# Math Hide and Seek / Number Hunter

低学年向けのホラー風味算数学習ゲームをReactで実装したフロントエンド。

**Version 0.1.0**

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

### 実行

```bash
# 開発サーバーを起動（http://localhost:5173）
npm run dev

# 本番ビルドを生成し、Vite同梱サーバーで動作確認（http://localhost:4173）
- ✅ 15マスのマップ上で怪物が隠れた数字を追跡するインタラクティブなコアループ
npm run preview

# 生成された静的ファイル（app/dist）を任意の静的サーバーで配信する場合
# 例: npx serve app/dist --listen 3000
```
- ✅ ステップA～Cに応じて出題内容とヒントを切り替える適応型問題パネル
- ✅ 成功・失敗の音声と視覚フィードバック、進捗を示すHUDパネル

---

## クイックスタート

### 前提条件

- **Node.js**: 18.x 以上（LTS 推奨）
- **npm**: 10.x 以上
- **OS**: Windows / macOS / Linux

### インストール

```bash
# リポジトリのクローン
git clone <repository-url>
cd math-hide-and-seek/app

# 依存関係をインストール
npm install
```

### 実行

```bash
# 開発サーバーを起動（http://localhost:5173）
npm run dev
```

---

## プロジェクト構造

```
math-hide-and-seek/
├── app/                     # フロントエンド本体（Vite + React）
│   ├── src/                 # アプリケーションソース
│   │   ├── components/      # UIコンポーネント群
│   │   ├── data/            # 問題テンプレートとグリッド設計
│   │   ├── hooks/           # 音声などのカスタムフック
│   │   ├── store/           # Zustandストア
│   │   └── __tests__/       # Vitestテスト
│   ├── package.json
│   ├── tsconfig*.json
│   ├── vite.config.ts
│   └── vitest.setup.ts
├── docs/                    # 公開向け設計ドキュメント
├── internal_docs/           # 内部リサーチ・設計資料
└── README.md
```

### 主要ファイル・フォルダ

| パス | 説明 |
|------|------|
| `app/src/App.tsx` | コアコンポーネント。グリッド選択、モンスター移動、問題表示を統括 |
| `app/src/store/useGameStore.ts` | Zustandによるゲーム状態管理とステートマシン |
| `app/src/data/problems.ts` | ステップA～Cに対応した問題テンプレート定義 |
| `app/src/components/ProblemVisualizer.tsx` | 数直線・テンフレーム等の視覚化コンポーネント |
| `docs/number-hunter-game-design.md` | 学習設計・ゲームデザインの要点まとめ |

---

## 技術スタック

### 言語・フレームワーク

- **TypeScript**: ^5.6.2
- **React**: ^18.3.1
- **Vite**: ^5.4.9

### 主要ライブラリ

| ライブラリ | バージョン | 用途 |
|-----------|----------|------|
| `zustand` | ^4.5.2 | ゲーム状態管理 |
| `immer` | ^10.1.1 | Zustandストアでのイミュータブル更新補助 |
| `framer-motion` | ^11.5.0 | UIアニメーション、ジェスチャー制御 |
| `howler` | ^2.2.4 | 効果音再生（Web Audio API補完） |
| `canvas-confetti` | ^1.9.3 | クリア演出のパーティクル生成 |
| `@tanstack/react-query` | ^5.54.1 | 今後のデータ取得・同期基盤 |

### 開発ツール

- **Vitest**: ユニットテスト／コンポーネントテスト
- **Testing Library**: UIインタラクション検証
- **TypeScript Compiler (`tsc`)**: 型チェック・Lint代替
- **Tailwind CSS**: ユーティリティクラス導入準備（`tailwindcss`）

---

## 開発環境セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd math-hide-and-seek/app
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 設定ファイルの準備

- 現時点で必須の環境変数や追加設定はありません。
- Tailwindや追加ライブラリを導入する場合は、`tailwind.config.js` 等を適宜生成してください。

### 4. 動作確認

```bash
npm run dev
# ブラウザで http://localhost:5173 にアクセスし、マップと問題パネルの表示を確認
```

---

## 主要機能

### 1. マップ探索と怪物移動

グリッドセルをクリックすると怪物が該当地点まで移動し、正答／誤答でセル状態が更新されます。

```tsx
const handleCellSelect = (cellId: number) => {
	game.selectCell(cellId);
	setMonsterTargetId(cellId);
};
```

### 2. 適応型問題オーバーレイ

問題テンプレートに応じて数直線・テンフレーム・ストーリー表示を切り替え、児童の理解段階をサポートします。

```tsx
<QuestionOverlay
	problem={game.currentProblem}
	visible={overlayVisible}
	onSubmit={handleSubmit}
	onClose={handleClose}
/>
```

### 3. 状態管理と進捗HUD

Zustandストアがセル状態・進捗・直近結果を集約し、HUDで進行度を即時フィードバックします。

```typescript
const store = create<GameStoreState>()((set, get) => ({
	selectCell: (id) => {
		if (get().isLocked) return;
		set({ activeCellId: id, isLocked: true });
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

```bash
# 開発サーバーを起動
npm run dev

# 型チェック（リンター相当）
npm run lint

# 本番ビルドを作成
npm run build

# ビルド成果物をViteプレビューサーバーで確認
npm run preview
```

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
# 成果物は app/dist/ に出力される静的ファイル
```

### デプロイ

- Viteのビルド結果は任意の静的ホスティング（Vercel、Netlify、Azure Static Web Apps等）に配置可能です。
- プレビューには `npm run preview` でローカルサーバーを起動して最終確認を行ってください。

---

## トラブルシューティング

### Node.js のバージョンエラーが発生する

**症状**: `npm install` や `vite` 実行時にバージョン警告・エラーが出る。

**原因**: Node.js が 18 未満、または npm が 10 未満。

**解決方法**:

```bash
# Node Version Manager を使用して更新（例）
nvm install 18
nvm use 18
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

---

## 参考情報

### 関連ドキュメント

- `docs/number-hunter-game-design.md`: 学習ゴールとUX設計の詳細
- `internal_docs/frontend-design`: フロントエンドアーキテクチャ設計メモ
- `internal_docs/child-study.md`: 児童発達研究・ゲーミフィケーションの知見

### 外部リソース

- [React 公式ドキュメント](https://react.dev/)
- [Vite 公式ドキュメント](https://vitejs.dev/guide/)
- [Zustand ドキュメント](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Framer Motion ドキュメント](https://www.framer.com/motion/)

---

**最終更新**: 2025-10-25  
**ドキュメントバージョン**: 0.1.0