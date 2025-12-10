# トレ太のFX実践日記 - 技術仕様書 (Technical Specification)

このドキュメントは、AIアシスタントや開発者が本プロジェクトの構造、技術スタック、および開発ルールを理解するための仕様書です。

---

## 1. プロジェクト概要
- **プロジェクト名**: トレ太のFX実践日記 (toreta-fx-blog)
- **目的**: FXの実践記録（マンガ形式）の毎日投稿と、初心者向けFX解説記事の提供
- **主要機能**: 
  - ブログ記事管理 (CMS)
  - タグ・カテゴリ分類
  - アフィリエイトページ
  - 静的サイト生成 (一部SSR)

## 2. 技術スタック
- **フレームワーク**: Astro (v5.x)
- **言語**: TypeScript
- **CMS**: Keystatic (ローカル管理・Gitベース)
- **UIライブラリ**: React (Keystaticの動作に必須)
- **ホスティング**: Cloudflare Pages
- **アダプター**: `@astrojs/cloudflare`
- **出力モード**: `output: 'server'` (Keystatic管理画面のためSSRが必要、記事はprerender推奨)

## 3. ディレクトリ構造

```
toreta-fx-blog/
├── src/
│   ├── components/      # 再利用可能なUIコンポーネント (Header, Footer等)
│   ├── content/         # 記事データ (Markdown/MDX)
│   │   ├── daily-trades/ # 実践記録コレクション
│   │   ├── fx-guides/    # FX解説コレクション
│   │   └── config.ts     # Astro Content Collections定義 (Zodスキーマ)
│   ├── layouts/         # ページレイアウト (Layout.astro)
│   ├── pages/           # ルーティング
│   │   ├── index.astro  # トップページ
│   │   ├── about.astro  # プロフィール
│   │   ├── broker.astro # 口座比較
│   │   ├── practice/    # 実践記録機能 ([slug].astro等)
│   │   ├── learn/       # FX解説機能 ([slug].astro等)
│   │   └── keystatic/   # CMS管理画面ルート
│   └── styles/          # グローバルスタイル (Layout.astro内に定義中)
├── public/              # 静的アセット
│   └── images/          # 記事用画像 (CMSからアップロード)
├── astro.config.mjs     # Astro設定
├── keystatic.config.ts  # CMS設定 (コレクション定義)
└── tsconfig.json        # TypeScript設定
```

## 4. データスキーマ (CMS)

### 実践記録 (dailyTrades)
- **パス**: `src/content/daily-trades/{slug}`
- **slug**: タイトルから生成 (例: 2025-12-10-trade) ※以前は自動日付
- **フォーマット**: `.mdx` (`@astrojs/mdx` 必須)
- **フィールド**:
  - `title`: 記事タイトル (Slugの元になる)
  - `date`: 実際のトレード日 (Date Picker使用) **【重要: 日付順ソートのキー】**
  - `image`: マンガ画像 (public/images/daily-trades/)
  - `pair`: 通貨ペア (usdjpy, eurusd, gbpjpy, other)
  - `result`: 結果 (win, loss, draw, none)
  - `content`: 詳細本文 (MDX)

### FX解説 (fxGuides)
- **パス**: `src/content/fx-guides/{slug}`
- **slug**: タイトルから生成
- **フォーマット**: `.mdx`
- **フィールド**:
  - `title`: 記事タイトル
  - `category`: カテゴリ (basics, technical, risk, books, youtube, other)
  - `content`: 本文 (MDX)

## 5. デザインシステム (CSS変数)
`src/layouts/Layout.astro` で定義されています。

- **Primary (青)**: `--c-primary: #2563eb` (信頼感)
- **Secondary (緑)**: `--c-secondary: #10b981` (成長、上昇)
- **Accent (赤)**: `--c-accent: #ef4444` (注意、損切り)
- **Text**: `--c-text: #1f2937`
- **Background**: `--c-bg: #ffffff`, `--c-bg-sub: #f3f4f6`

## 6. 開発ガイドライン（ユーザー向け運用フロー）

本プロジェクトは、非技術者でも運用できるように**自動化バッチスクリプト**を用意しています。

### 基本ワークフロー
1. **CMS起動**: `管理画面起動.bat` を実行
   - ローカルサーバーが立ち上がり、ブラウザで管理画面が開きます。
   - 記事を編集し、「保存 (Create/Save)」ボタンを押します。
   - **確認**: 管理画面上部の「目のマーク（View）」を押して、表示を確認します。

2. **公開 (Deploy)**: `ブログ更新.bat` を実行
   - 自動的に `git add`, `git commit`, `git push` を行います。
   - Cloudflare Pagesへ送信され、数分後に本番サイトが更新されます。

### バッチファイルの内部動作
- `管理画面起動.bat`: `npm run dev` を実行し、ブラウザを開く。
- `ブログ更新.bat`: 変更を検出し、Gitコマンドを一括実行する。

### ページの追加・開発者向け
- 静的ページは `src/pages/` 直下に `.astro` ファイルを作成します。
- 動的ページは `[slug].astro` などのパラメータ付きファイル名を使用し、`getStaticPaths` をエクスポートします（prerender: true の場合）。
- `.mdx` ファイルを扱うため、`astro.config.mjs` には `mdx()` インテグレーションが必須です。

### デプロイ設定 (Cloudflare Pages)
- ビルドコマンド: `npm run build`
- 出力ディレクトリ: `dist`
- 環境変数: (特になし)
- GitHub連携: `toreta-fx-blog` リポジトリの `main` ブランチを監視

## 7. 今後の拡張予定
- **タグ機能の強化**: タグ別一覧ページの作成
- **検索機能**: 記事検索UIの実装
- **OGP自動生成**: 記事タイトルを入れたサムネイルの動的生成

---
この仕様書は、プロジェクトの構造を理解し、一貫性を保って開発を継続するために参照してください。
