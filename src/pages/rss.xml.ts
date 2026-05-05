import { type CollectionEntry, getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import {
	SITE_TITLE,
	SITE_DESCRIPTION,
	SITE_URL,
} from "@/constants/site";

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
	const blog = await getCollection("blog");

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site ? context.site : SITE_URL,
		items: blog.map((post: CollectionEntry<"blog">) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description,
			link: `/blogs/${post.id}`,
			content: post.body ? sanitizeHtml(parser.render(post.body)) : "",
		})),
	});
}
