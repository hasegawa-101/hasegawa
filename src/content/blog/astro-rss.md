---
title: AstroでRSSフィード機能を作成する
description: AstroでRSSフィード機能を作成する記事です。
date: 2025-01-09
---

エンジニアとして日々のアウトプットを大切にしていくために、ブログを始めています。

これを機にRSSフィード機能を作成してみました。

結構サクッと作れたので、備忘録として残しておきます。

## 導入

当サイトはAstroを用いて作成しています。
Astroの公式ドキュメントに[RSSフィードの追加](https://docs.astro.build/ja/recipes/rss/)があるので、基本的にはこちらを参考にしました。

@astrojs/rssパッケージをインストールします。

```bash
bun add @astrojs/rss
```

## 全文表示させる

FeedlyなどのRSSリーダーを使用している身では、全文表示されているサイトはとても助かります。
わざわざウェブサイトにアクセスしなくても、記事の全文を確認できるので。

そのため、私のウェブサイトのブログも全文表示させるようにしました。

全文表示のやり方も公式ドキュメントにあるので、そちらを参考にしています。

<a href="https://docs.astro.build/en/recipes/rss/#including-full-post-content" target="_blank">Including full post content | Add an RSS feed</a>

## 今後について

RSS機能を導入しましたが、細かなスタイルやOGP画像が無いなど、まだまだ改善していく予定です。

少しずつ良くしていきたいと思います。