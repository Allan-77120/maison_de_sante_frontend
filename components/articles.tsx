import ArticlesClient from "@/components/ArticlesClient";
import {
  buildSuccessPayload,
  fetchArticlesFeed,
  getArticlesUpdatedAt,
  getFallbackArticles,
  type ArticlesPayload,
} from "@/lib/articles";

export default async function Articles() {
  let payload: ArticlesPayload;

  try {
    const articles = await fetchArticlesFeed();
    payload = buildSuccessPayload(articles, getArticlesUpdatedAt(articles));
  } catch (error) {
    console.error("Erreur Articles server component:", error);

    const fallbackArticles = getFallbackArticles();
    payload = buildSuccessPayload(
      fallbackArticles,
      getArticlesUpdatedAt(fallbackArticles),
      {
        cached: true,
        source: "fallback-local",
        warning:
          "Flux distant indisponible, affichage d'une selection de secours.",
      },
    );
  }

  return <ArticlesClient payload={payload} />;
}
