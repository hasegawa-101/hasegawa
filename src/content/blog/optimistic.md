---
title: 楽観的更新するいいねボタンを実装してみる
description: Next.js 15で楽観的更新するいいねボタンを実装してみる記事です。
date: 2025-01-09
---

Next.js15、React19が安定版になっているので、ぼちぼち周辺技術を追っています。

その中で今回は、楽観的更新するいいねボタンを実装してみました。

## 楽観的更新について
楽観的更新とは、ユーザーの操作に対してサーバーとの処理のやり取りを待たずに、即座にユーザーに反映させる方法のことです。

例えばXのようなSNSでいいねボタンを押したときに、サーバーとの通信を待たずに即座にいいねが反映されるのが楽観的更新です。

[ドハティの閾値](https://www.shokasonjuku.com/ux-psychology/doherty-threshold)というUX心理学の概念があるように、ユーザーの操作に対して即座に反応を返すことができる楽観的更新は、より良いユーザー体験に繋がるのではないでしょうか。


## 実装編

### サーバー関数

```ts
"use server";

import { setTimeout } from "node:timers/promises";

export async function like(prevState: boolean) {
	await setTimeout(1000);
	return !prevState;
}
```
1秒後に処理が完了するようにしています。

### いいねロジックのカスタムフック

```ts
import { useActionState } from "react";
import { useOptimistic } from "react";
import { like } from "../actions/like";

type Props = {
	isLiked: boolean;
};

export function useLike({ isLiked }: Props) {
	const [isLikeState, dispatch] = useActionState(like, isLiked);
	// 楽観的更新のための処理
	const [optimisticLike, updateOptimisticLike] = useOptimistic(isLikeState);

	const likeAction = async () => {
		updateOptimisticLike(!optimisticLike);
		await dispatch();
	};

	return { likeAction, optimisticLike };
}

```

### いいねボタンのコンポーネント

```tsx
"use client";
import { useLike } from "../hooks/useLike";

type Props = {
	isLiked: boolean;
};

export const Like: FC<Props> = ({ isLiked }) => {
	const { likeAction, optimisticLike } = useLike({ isLiked });

	return (
		<form action={likeAction}>
			<button type="submit">
				{optimisticLike ? "いいね済み" : "いいねする"}
			</button>
		</form>
	);
};
```

## 動作イメージ

![動作イメージ](/images/blog/optimistic/optimistic-good-button.gif)

いいねボタンの状態が押下時に即座に変わりつつ、リクエストは1秒後に処理されているのがわかると思います。
