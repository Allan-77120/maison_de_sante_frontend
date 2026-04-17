import fallbackArticles from "@/data/articles-fallback.json";

export const SPF_RSS_URL =
  "https://www.santepubliquefrance.fr/rss/actualites.xml";
export const CACHE_TTL_MS = 15 * 60 * 1000;
export const MAX_ARTICLES = 5;

const medicalImages = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
];

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
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
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

function improveDescription(title: string, description: string) {
  const cleaned = description.replace(/\s+/g, " ").trim();
  const short = cleaned.replace(title, "").trim().replace(/^[-:]+/, "").trim();
  const base =
    short ||
    "Retrouvez une synthese claire de cette actualite de prevention et de sante publique.";

  if (base.length <= 150) {
    return base;
  }

  return `${base.slice(0, 147).trimEnd()}...`;
}

export function normalizeArticle(
  article: Partial<Article>,
  index = 0,
): Article {
  const title = article.title?.trim() || "Actualite sante";
  const url = article.url?.trim() || "https://www.santepubliquefrance.fr/";
  const publishedAt = article.publishedAt?.trim() || "";
  const rawDescription =
    article.description?.trim() ||
    "Retrouvez cette actualite sur le site de Sante publique France.";
  const description = improveDescription(title, rawDescription);

  return {
    title,
    description,
    content: article.content?.trim() || description,
    url,
    image: article.image?.trim() || medicalImages[index % medicalImages.length],
    publishedAt,
  };
}

export function extractArticlesFromXml(xml: string): Article[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/gi) || [];

  return items
    .slice(0, MAX_ARTICLES)
    .map((item, index) =>
      normalizeArticle(
        {
          title: extractTagValue(item, "title"),
          description: extractTagValue(item, "description"),
          content: extractTagValue(item, "description"),
          url: extractTagValue(item, "link"),
          image: "",
          publishedAt: extractTagValue(item, "pubDate"),
        },
        index,
      ),
    )
    .filter((article) => article.title && article.url);
}

export function getFallbackArticles(): Article[] {
  return fallbackArticles.map((article, index) =>
    normalizeArticle(article, index),
  );
}

export function buildSuccessPayload(
  articles: Article[],
  updatedAt: number,
  options?: Partial<Pick<ArticlesPayload, "cached" | "source" | "warning">>,
): ArticlesPayload {
  return {
    articles,
    cached: options?.cached ?? false,
    updatedAt,
    source: options?.source ?? "sante-publique-france",
    warning: options?.warning,
  };
}

export function getArticlesUpdatedAt(articles: Article[]): number {
  const firstDatedArticle = articles.find((article) => article.publishedAt);

  if (!firstDatedArticle?.publishedAt) {
    return 0;
  }

  const parsed = new Date(firstDatedArticle.publishedAt).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
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
