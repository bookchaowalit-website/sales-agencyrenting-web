import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleMetadata {
    title: string;
    description: string;
    date: string;
    author: string;
    image: string;
    tags: string[];
    slug: string;
    /** Only `published: true` in the front matter makes an article public; anything else is a draft. */
    published: boolean;
}

export interface Article extends ArticleMetadata {
    content: string;
    excerpt: string;
    readTime: string;
}

const WORDS_PER_MINUTE = 200;

/**
 * Count words with Intl.Segmenter so Thai (written without spaces between
 * words) is counted per word rather than per space-separated phrase, and so
 * leading/trailing whitespace does not add phantom words.
 */
export function countWords(text: string): number {
    const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
    return Array.from(segmenter.segment(text)).filter((segment) => segment.isWordLike).length;
}

/** Whole minutes to read, never less than one. */
export function readingMinutes(content: string): number {
    return Math.max(1, Math.ceil(countWords(content) / WORDS_PER_MINUTE));
}

/**
 * First `max` user-perceived characters with all line breaks (CRLF, lone CR,
 * U+2028/U+2029) collapsed to spaces. Cuts on grapheme boundaries so emoji and
 * Thai combining marks are never split, and only adds an ellipsis when text
 * was actually cut.
 */
export function makeExcerpt(content: string, max = 150): string {
    const flat = content.replace(/\s+/g, ' ').trim();
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    const graphemes = Array.from(segmenter.segment(flat), (segment) => segment.segment);
    if (graphemes.length <= max) return flat;
    return graphemes.slice(0, max).join('').trimEnd() + '...';
}

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');

export function getAllArticles(): Article[] {
    // Get all MDX files from the articles directory
    const fileNames = fs.readdirSync(articlesDirectory).filter(fileName => fileName.endsWith('.mdx'));

    const articles = fileNames.map(fileName => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const readTime = readingMinutes(content).toString();
        const excerpt = makeExcerpt(content);

        return {
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            author: data.author,
            image: data.image,
            tags: data.tags || [],
            published: data.published === true,
            content,
            excerpt,
            readTime,
        } as Article;
    });

    // Sort articles by date (newest first)
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * The articles the public may read. The Guides page and GET /api/articles both use this list,
 * so a draft hidden on the page is never served by the API either.
 */
export function getPublishedArticles(): Article[] {
    return getAllArticles().filter((article) => article.published);
}

export function getArticleBySlug(slug: string): Article | null {
    try {
        const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const readTime = readingMinutes(content).toString();
        const excerpt = makeExcerpt(content);

        return {
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            author: data.author,
            image: data.image,
            tags: data.tags || [],
            published: data.published === true,
            content,
            excerpt,
            readTime,
        } as Article;
    } catch {
        return null;
    }
}

export function getArticlesByTag(tag: string): Article[] {
    const allArticles = getAllArticles();
    return allArticles.filter(article => article.tags.includes(tag));
}

export function getAllTags(): string[] {
    const allArticles = getAllArticles();
    const tags = new Set<string>();
    allArticles.forEach(article => {
        article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}
