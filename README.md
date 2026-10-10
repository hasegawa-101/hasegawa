# Hayato Hasegawa Personal Website

長谷川 駿のパーソナルウェブサイト・ブログ。Webアクセシビリティに配慮した静的サイトです。

## 🛠 技術スタック

- **[Astro](https://astro.build/)** 7.x - 静的サイトジェネレーター
- **[TypeScript](https://www.typescriptlang.org/)** 6系とNative 7系を併用した型チェック
- **[Tailwind CSS](https://tailwindcss.com/)** v4.x - ユーティリティファーストCSS（論理プロパティ対応）
- **[Biome](https://biomejs.dev/)** - リンター・フォーマッター
- **[Prettier](https://prettier.io/)** - Astroファイル用フォーマッター
- **[pnpm](https://pnpm.io/)** - パッケージマネージャー

## 📁 プロジェクト構成

```
/
├── .github/
│   ├── dependabot.yml         # Dependabot設定
│   └── workflows/
│       ├── ci.yml             # 型チェック・リント・ビルド
│       └── deploy.yml         # GitHub Pages デプロイ設定
├── public/
│   ├── favicon.svg
│   └── images/                 # ブログ画像等
├── src/
│   ├── components/
│   ├── constants/
│   │   └── site.ts            # サイト設定
│   ├── content.config.ts      # コンテンツスキーマ定義
│   ├── content/
│   │   └── blog/              # ブログ記事（.md, .mdx）
│   ├── layouts/
│   │   └── Layout.astro       # 共通レイアウト
│   ├── pages/
│   │   ├── about/             # 自己紹介ページ
│   │   ├── about-website/     # サイト情報ページ
│   │   ├── blogs/             # ブログ一覧・詳細
│   │   ├── index.astro        # トップページ
│   │   └── rss.xml.ts         # RSSフィード
│   └── styles/
│       └── style.css          # グローバルスタイル
├── astro.config.ts            # Astro設定
├── biome.jsonc                # Biome設定
├── tsconfig.json              # TypeScript設定
└── CLAUDE.md                  # AI開発支援ドキュメント
```

## 🚀 開発環境

### 必要な環境

- [Node.js](https://nodejs.org/) 22.13.0以上（CI・デプロイでは24を使用）
- [pnpm](https://pnpm.io/)（バージョンは[`package.json`](package.json)の`packageManager`で管理）

TypeScriptは[公式の併用構成](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6-0)を採用しています。`astro check`はTypeScript 6の互換APIでAstroテンプレートを検査し、Native 7の`tsc`は通常のTypeScriptファイル（設定・RSS・ユーティリティなど）を検査します。`check:types`と`build`では両方を実行します。

### セットアップ

リポジトリ直下で実行します。pnpmが未導入の場合や、古いpnpmから指定バージョンへの自動切り替えに失敗する場合は、[公式のインストール手順](https://pnpm.io/installation)に従ってpnpm自体を更新してください。

```bash
# pnpmが未導入の場合のみ
npx get-pnpm

# package.jsonのpackageManagerに記載されたバージョンを使っているか確認
pnpm --version

# 依存関係のインストール
pnpm install --frozen-lockfile

# 開発サーバーの起動（http://localhost:4321）
pnpm run dev
# または
pnpm run start
```

## 📝 コマンド一覧

| コマンド | 説明 |
|---------|------|
| `pnpm run dev` | 開発サーバーを起動 |
| `pnpm run start` | 開発サーバーを起動（devのエイリアス） |
| `pnpm run build` | AstroとNative 7の型チェック後に本番用ビルド |
| `pnpm run preview` | ビルド結果をローカルでプレビュー |
| `pnpm run check` | Biomeでリント・フォーマット検査、PrettierでAstroを検査（変更なし） |
| `pnpm run check:types` | `astro check`とNative 7の`tsc`で型チェック |
| `pnpm run check:native` | `astro sync`で型を生成後、通常のTSファイルをNative 7で型チェック |
| `pnpm run check:fix` | Biomeで自動修正し、PrettierでAstroをフォーマット |
| `pnpm run format` | `src`内のTS/JSをBiome、AstroをPrettierでフォーマット |
| `pnpm run format:astro` | Astroファイルのみフォーマット |

Astroファイルの整形はPrettierで行います。BiomeのAstro対応は部分的なため、未使用変数・未使用import・型import・constに関する誤検知を避けるルール調整をAstroファイルに限定しています。

## 🌐 デプロイ

GitHub Actionsを使用してGitHub Pagesに自動デプロイされます。
`main`ブランチへのプッシュでCIを実行し、成功したコミットをビルド・デプロイします。手動実行も可能です。

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

- **スケジュール**: 毎日 9:00 (JST)
- **更新対象**: pnpmで管理するnpm依存関係とGitHub Actions（Dependabotの`package-ecosystem`は`npm`）
- **グループ化**: 関連パッケージを1つのPRにまとめて作成
  - Astroグループ (`astro`, `@astrojs/*`)
  - Tailwindグループ (`tailwindcss`, `@tailwindcss/*`)
  - 開発ツールグループ (Biome, Prettier, TypeScript)
  - 型定義グループ (`@types/*`)

### 自動マージ

パッチ・マイナー更新を承認し、自動マージを有効にするワークフローがあります。CIの成功をマージ条件にするには、GitHub側で自動マージを有効にし、`main`のブランチ保護またはルールセットでCIジョブの`test`を必須チェックに設定してください。自動承認にはGitHub ActionsによるPR承認の許可も必要です。

- ✅ **自動マージ対象**: パッチ (patch) とマイナー (minor) バージョンアップ
  - 例: `1.0.0` → `1.0.1` (patch)、`1.0.0` → `1.1.0` (minor)
  - ワークフローが承認と自動マージの予約を行い、GitHub側の必須チェック・レビュー条件を満たすとマージ
- ⚠️ **手動レビュー必要**: メジャー (major) バージョンアップ
  - 例: `1.0.0` → `2.0.0`
  - 破壊的変更の可能性があるため、手動でレビューが必要
  - PRに自動でコメントが付きます

### CI/CDワークフロー

- **CI** (`.github/workflows/ci.yml`): `main`へのPR・プッシュで型チェック・リント・フォーマット検査・ビルドを実行
- **Deploy** (`.github/workflows/deploy.yml`): `main`へのプッシュで成功したCIのコミットを自動デプロイ
- **Dependabot Auto-merge** (`.github/workflows/dependabot-auto-merge.yml`): パッチ・マイナー更新の承認と自動マージ予約

### 設定ファイル

- `.github/dependabot.yml` - Dependabot設定
- `.github/workflows/dependabot-auto-merge.yml` - 自動マージ設定
