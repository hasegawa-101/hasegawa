---
title: 2025年にカードUIのマークアップを考える
description: 2025年にカードUIのマークアップを考えるという記事です。
date: 2025-01-08
---

OpenUIの[Link Area Delegation](https://open-ui.org/components/link-area-delegation-explainer/)が検討された影響か、カードUIに関する記事をよく見かけるようになったので便乗して考えてみました。

今回考えたカードUIの要件は以下です。
- カードUIの最小サイズは200px
- カードUIの中にカート追加ボタンを配置する
- subgridを用いて、カードUIのタイトルや説明文の長さがバラついても、高さと位置を揃える

イメージはこちらです。
![カードUIのイメージ](./assets/card-ui/card-ui.gif)

上記要件を満たせるようなカードUIの実装方法について、コードを書いていきます。

まずはHTML部分です。

```html
<ul class="card-container">
  <li class="card">
    <a href="#" class="card-link">
      <div class="card-image-wrapper">
        <img src="hogehoge.jpg" alt="hoghoge">
      </div>
      <h2>Card Title</h2>
      <p>Card Descriptionが入ります。Card Descriptionが入ります。</p>
      <p>Price</p>
    </a>
    <div class="card-button-wrapper">
      <button>カート追加</button>
    </div>
  </li>
  <!-- 以下ループ -->
</ul>
```

aタグの子要素にbuttonタグを入れることは出来ない点に注意です。

```css
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 32px;
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 5 / span 5;
  gap: 16px;
}

.card-link {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 5 / span 5;
  gap: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.card-button-wrapper {
  padding: 0 16px 16px;
  pointer-events: none;

  button {
    pointer-events: auto;
  }
}
```

このように書くことで、カード全体はリンクであり、カードの中にはカート追加ボタンがある。
またカードの高さ、タイトル、説明文の位置が揃うといった実装ができます。

今回は結構シンプルなカードUIでの実装でしたが、
もっと複雑なカードUIで試してみたいと思います。