import { type CollectionEntry, getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
const parser = new MarkdownIt();

export async function GET(context: APIContext) {
	const blog = await getCollection("blog");

	return rss({
		title: "Hayato Hasegawa",
		description: "長谷川駿のウェブサイトです。",
		site: context.site ? context.site : "https://hayatohasegawa.com",
		items: blog.map((post: CollectionEntry<"blog">) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description,
			link: `/blogs/${post.slug}`,
			content: sanitizeHtml(parser.render(post.body)),
		})),
	});
}
