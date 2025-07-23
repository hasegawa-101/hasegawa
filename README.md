# Hayato Hasegawa Personal Website

長谷川 駿のパーソナルウェブサイト・ブログ。Webアクセシビリティに配慮した静的サイトです。

## 🛠 技術スタック

- **[Astro](https://astro.build/)** - 静的サイトジェネレーター
- **[Tailwind CSS](https://tailwindcss.com/)** v3.4.14 - ユーティリティファーストCSS
- **[Biome](https://biomejs.dev/)** - リンター・フォーマッター
- **[Bun](https://bun.sh/)** - パッケージマネージャー・ランタイム

## 📁 プロジェクト構成

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages デプロイ設定
├── public/
│   ├── favicon.svg
│   └── images/                 # ブログ画像等
├── src/
│   ├── components/
│   ├── constants/
│   │   └── site.ts            # サイト設定
│   ├── content/
│   │   ├── blog/              # ブログ記事（.md, .mdx）
│   │   └── config.ts          # コンテンツスキーマ定義
│   ├── layouts/
│   │   └── Layout.astro       # 共通レイアウト
│   ├── pages/
│   │   ├── about/             # 自己紹介ページ
│   │   ├── about-website/     # サイト情報ページ
│   │   ├── blog/              # ブログ一覧・詳細
│   │   ├── index.astro        # トップページ
│   │   └── rss.xml.ts         # RSSフィード
│   └── styles/
│       └── style.css          # グローバルスタイル
├── astro.config.ts            # Astro設定
├── biome.jsonc                # Biome設定
├── tailwind.config.ts         # Tailwind CSS設定
├── tsconfig.json              # TypeScript設定
└── CLAUDE.md                  # AI開発支援ドキュメント
```

## 🚀 開発環境

### 必要な環境

- [Bun](https://bun.sh/) (最新版)

### セットアップ

```bash
# 依存関係のインストール
bun install

# 開発サーバーの起動（http://localhost:4321）
bun run dev
# または
bun start
```

## 📝 コマンド一覧

| コマンド | 説明 |
|---------|------|
| `bun run dev` | 開発サーバーを起動 |
| `bun start` | 開発サーバーを起動（devのエイリアス） |
| `bun run build` | 本番用ビルド（型チェック付き） |
| `bun run preview` | ビルド結果をローカルでプレビュー |
| `bun run check` | Biomeでリント・フォーマット（自動修正） |

## 🌐 デプロイ

GitHub Actionsを使用してGitHub Pagesに自動デプロイされます。
`main`ブランチへのプッシュで自動的にビルド・デプロイが実行されます。
