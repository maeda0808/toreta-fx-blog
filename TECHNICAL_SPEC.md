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
- **パス**: `src/content/daily-trades/{date}`
- **slug**: 日付 (YYYY-MM-DD)
- **フィールド**:
  - `date`: 日付
  - `image`: マンガ画像 (public/images/daily-trades/)
  - `pair`: 通貨ペア (usdjpy, eurusd, gbpjpy, other)
  - `result`: 結果 (win, loss, draw, none)
  - `content`: 詳細本文 (MDX)

### FX解説 (fxGuides)
- **パス**: `src/content/fx-guides/{slug}`
- **slug**: タイトルベース
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

## 6. 開発ガイドライン

### 記事の追加・編集
1. ローカルサーバーを起動: `npm run dev`
2. 管理画面にアクセス: `http://localhost:4321/keystatic`
3. 記事を作成・保存すると、自動的に `src/content/` 内に `.mdoc` (または.md) ファイルが生成されます。
4. 生成されたファイルをGitにコミットしてプッシュします。

### ページの追加
- 静的ページは `src/pages/` 直下に `.astro` ファイルを作成します。
- 動的ページは `[slug].astro` などのパラメータ付きファイル名を使用し、`getStaticPaths` をエクスポートします（prerender: true の場合）。

### デプロイ
- GitHubの `main` ブランチにプッシュすると、Cloudflare Pagesが自動的にビルド・デプロイします。
- ビルドコマンド: `npm run build`
- 出力ディレクトリ: `dist` (またはCloudflareアダプターの仕様に従う)

## 7. 今後の拡張予定
- **タグ機能の強化**: タグ別一覧ページの作成
- **検索機能**: 記事検索UIの実装
- **OGP自動生成**: 記事タイトルを入れたサムネイルの動的生成

---
この仕様書は、プロジェクトの構造を理解し、一貫性を保って開発を継続するために参照してください。
