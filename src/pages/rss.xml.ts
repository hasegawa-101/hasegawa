import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context: APIContext) {

  const blog = await getCollection('blog');

  return rss({
    title: 'Hayato Hasegawa',
    description: '長谷川駿のウェブサイトです。',
    site: context.site!,
    items: blog.map((post: any) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
  
  });
}