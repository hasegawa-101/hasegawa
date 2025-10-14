# Hayato Hasegawa Personal Website

長谷川 駿のパーソナルウェブサイト・ブログ。Webアクセシビリティに配慮した静的サイトです。

## 🛠 技術スタック

- **[Astro](https://astro.build/)** 5.x - 静的サイトジェネレーター
- **[Tailwind CSS](https://tailwindcss.com/)** v4.x - ユーティリティファーストCSS（論理プロパティ対応）
- **[Biome](https://biomejs.dev/)** - リンター・フォーマッター
- **[Prettier](https://prettier.io/)** - Astroファイル用フォーマッター
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
├── .github/
│   └── dependabot.yml         # Dependabot設定
├── astro.config.ts            # Astro設定
├── biome.jsonc                # Biome設定
├── tsconfig.json              # TypeScript設定
└── CLAUDE.md                  # AI開発支援ドキュメント
```

## 🚀 開発環境

### 必要な環境

- [Bun](https://bun.sh/) v1.2.4（`.bun-version`で管理）

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
| `bun run format` | Biome + Prettierで全ファイルをフォーマット |
| `bun run format:astro` | Astroファイルのみフォーマット |

## 🌐 デプロイ

GitHub Actionsを使用してGitHub Pagesに自動デプロイされます。
`main`ブランチへのプッシュで自動的にビルド・デプロイが実行されます。

## 🤖 依存関係の自動更新（Dependabot）

このプロジェクトはDependabotを使用して依存関係を自動更新します。

### 初回セットアップ（リポジトリオーナーのみ）

GitHubリポジトリで以下の設定を有効化してください：

1. リポジトリの **Settings** → **Code security and analysis**
2. 以下の機能を有効化：
   - ✅ **Dependabot alerts**
   - ✅ **Dependabot security updates**
   - ✅ **Dependabot version updates**

### 動作内容

- **スケジュール**: 毎週月曜日 9:00 (JST)
- **更新対象**: npm依存関係とGitHub Actions
- **グループ化**: 関連パッケージを1つのPRにまとめて作成
  - Astroグループ (`astro`, `@astrojs/*`)
  - Tailwindグループ (`tailwindcss`, `@tailwindcss/*`)
  - 開発ツールグループ (Biome, Prettier, TypeScript, Vite)
  - 型定義グループ (`@types/*`)

### 自動マージ

安全性を考慮した自動マージを設定済み：

- ✅ **自動マージ対象**: パッチ (patch) とマイナー (minor) バージョンアップ
  - 例: `1.0.0` → `1.0.1` (patch)、`1.0.0` → `1.1.0` (minor)
  - CIテストが通過した後に自動的にマージ・承認
- ⚠️ **手動レビュー必要**: メジャー (major) バージョンアップ
  - 例: `1.0.0` → `2.0.0`
  - 破壊的変更の可能性があるため、手動でレビューが必要
  - PRに自動でコメントが付きます

### CI/CDワークフロー

- **CI** (`.github/workflows/ci.yml`): PRごとに型チェック・リント・ビルドテストを実行
- **Deploy** (`.github/workflows/deploy.yml`): mainブランチへのマージ時に自動デプロイ
- **Dependabot Auto-merge** (`.github/workflows/dependabot-auto-merge.yml`): 安全な自動マージ

### 設定ファイル

- `.github/dependabot.yml` - Dependabot設定
- `.github/workflows/dependabot-auto-merge.yml` - 自動マージ設定
