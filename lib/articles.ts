import fallbackArticles from "@/data/articles-fallback.json";

export const SPF_RSS_URL =
  "https://www.santepubliquefrance.fr/rss/actualites.xml";
export const CACHE_TTL_MS = 15 * 60 * 1000;
export const MAX_ARTICLES = 5;

export type Article = {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
};

export type ArticlesPayload = {
  articles: Article[];
  cached: boolean;
  updatedAt: number;
  source: string;
  warning?: string;
};

export type ArticleCache = {
  articles: Article[];
  expiresAt: number;
  updatedAt: number;
};

export function createArticleCache(): ArticleCache {
  return {
    articles: [],
    expiresAt: 0,
    updatedAt: 0,
  };
}

export function decodeHtml(text: string) {
  return text
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#039;/g, "'")
    .replace(/&rsquo;|&lsquo;/g, "'")
    .replace(/&eacute;/g, "e")
    .replace(/&egrave;/g, "e")
    .replace(/&ecirc;/g, "e")
    .replace(/&agrave;/g, "a")
    .replace(/&ccedil;/g, "c")
    .replace(/&ocirc;/g, "o")
    .replace(/&ucirc;/g, "u")
    .replace(/&uuml;/g, "u")
    .replace(/&laquo;|&raquo;/g, '"')
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractTagValue(block: string, tagName: string) {
  const match = block.match(
    new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, "i"),
  );

  return match ? decodeHtml(match[1]) : "";
}

export function normalizeArticle(article: Partial<Article>): Article {
  const title = article.title?.trim() || "Actualite sante";
  const description =
    article.description?.trim() ||
    "Retrouvez cette actualite sur le site de Sante publique France.";
  const url = article.url?.trim() || "https://www.santepubliquefrance.fr/";
  const publishedAt = article.publishedAt?.trim() || "";

  return {
    title,
    description,
    content: article.content?.trim() || description,
    url,
    image: article.image?.trim() || "",
    publishedAt,
  };
}

export function extractArticlesFromXml(xml: string): Article[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/gi) || [];

  return items
    .slice(0, MAX_ARTICLES)
    .map(item =>
      normalizeArticle({
        title: extractTagValue(item, "title"),
        description: extractTagValue(item, "description"),
        content: extractTagValue(item, "description"),
        url: extractTagValue(item, "link"),
        image: "",
        publishedAt: extractTagValue(item, "pubDate"),
      }),
    )
    .filter(article => article.title && article.url);
}

export function getFallbackArticles(): Article[] {
  return fallbackArticles.map(article => normalizeArticle(article));
}

export function buildSuccessPayload(
  articles: Article[],
  updatedAt: number,
  options?: Pick<ArticlesPayload, "cached" | "source" | "warning">,
): ArticlesPayload {
  return {
    articles,
    cached: options?.cached ?? false,
    updatedAt,
    source: options?.source ?? "sante-publique-france",
    warning: options?.warning,
  };
}

export async function fetchArticlesFeed() {
  const response = await fetch(SPF_RSS_URL, {
    next: { revalidate: 900 },
  });
  const xml = await response.text();

  if (!response.ok) {
    throw new Error(`Erreur SPF (${response.status} ${response.statusText})`);
  }

  const articles = extractArticlesFromXml(xml);

  if (!articles.length) {
    throw new Error(
      "Impossible de lire les actualites de Sante publique France.",
    );
  }

  return articles;
}
