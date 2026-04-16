import {
  buildSuccessPayload,
  CACHE_TTL_MS,
  createArticleCache,
  fetchArticlesFeed,
  getFallbackArticles,
} from "@/lib/articles";

const articleCache = createArticleCache();

export async function GET() {
  const now = Date.now();
  const hasFreshCache =
    articleCache.articles.length > 0 && articleCache.expiresAt > now;

  if (hasFreshCache) {
    return Response.json(
      buildSuccessPayload(articleCache.articles, articleCache.updatedAt, {
        cached: true,
      }),
    );
  }

  try {
    const articles = await fetchArticlesFeed();

    articleCache.articles = articles;
    articleCache.updatedAt = now;
    articleCache.expiresAt = now + CACHE_TTL_MS;

    return Response.json(buildSuccessPayload(articles, articleCache.updatedAt));
  } catch (error) {
    console.error("Erreur /api/users:", error);

    if (articleCache.articles.length > 0) {
      return Response.json(
        buildSuccessPayload(articleCache.articles, articleCache.updatedAt, {
          cached: true,
          warning: "Flux distant indisponible, affichage du dernier cache.",
        }),
      );
    }

    const fallbackArticles = getFallbackArticles();

    articleCache.articles = fallbackArticles;
    articleCache.updatedAt = now;
    articleCache.expiresAt = now + CACHE_TTL_MS;

    return Response.json(
      buildSuccessPayload(fallbackArticles, articleCache.updatedAt, {
        cached: true,
        source: "fallback-local",
        warning:
          "Flux distant indisponible, affichage d'une selection de secours.",
      }),
    );
  }
}
