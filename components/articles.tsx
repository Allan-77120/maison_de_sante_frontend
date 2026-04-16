"use client";

import { useEffect, useState } from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
}

interface ArticlesResponse {
  articles?: Article[];
  warning?: string;
  source?: string;
}

const API_URL = "/api/users";

const visuels = [
  {
    frame: "from-[#173554] to-[#2c6e9e]",
    orb: "bg-white/18",
    line: "bg-white/12",
  },
  {
    frame: "from-[#2c6e9e] to-[#5aa2d0]",
    orb: "bg-white/20",
    line: "bg-white/10",
  },
  {
    frame: "from-[#2f6f58] to-[#4aa07c]",
    orb: "bg-white/16",
    line: "bg-white/12",
  },
  {
    frame: "from-[#496f79] to-[#7da7ae]",
    orb: "bg-white/16",
    line: "bg-white/10",
  },
  {
    frame: "from-[#1f5748] to-[#3f8f79]",
    orb: "bg-white/14",
    line: "bg-white/12",
  },
];

function formatPublishedAt(date: string) {
  if (!date) {
    return "";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function ArticleCardSkeleton({ index }: { index: number }) {
  const visuel = visuels[index % visuels.length];

  return (
    <div className="card-shell animate-pulse">
      <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${visuel.frame}`}>
        <div
          className={`absolute -right-6 top-4 h-24 w-24 rounded-full blur-sm ${visuel.orb}`}
        />
        <div
          className={`absolute left-5 bottom-6 h-2 w-24 rounded-full ${visuel.line}`}
        />
      </div>
      <div className="p-5">
        <div className="mb-3 h-4 w-4/5 rounded-full bg-slate-200" />
        <div className="mb-5 h-4 w-2/5 rounded-full bg-slate-100" />
        <div className="mb-2 h-3 w-full rounded-full bg-slate-100" />
        <div className="mb-2 h-3 w-full rounded-full bg-slate-100" />
        <div className="mb-6 h-3 w-3/4 rounded-full bg-slate-100" />
        <div className="h-8 w-28 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError("");
        setWarning("");

        const res = await fetch(API_URL);
        const data: ArticlesResponse | null = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(
            data && "warning" in data
              ? data.warning
              : `Erreur API (${res.status} ${res.statusText})`,
          );
        }

        if (!Array.isArray(data?.articles)) {
          throw new Error("Aucune actualite exploitable n'a ete retournee.");
        }

        setArticles(data.articles);
        setWarning(data.warning || "");
      } catch (err) {
        console.error("Erreur front:", err);
        setArticles([]);
        setError(
          err instanceof Error
            ? err.message
            : "Impossible de charger les actualites pour le moment.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <section className="section-shell">
      <div className="section-inner max-w-7xl">
        <p className="section-kicker">Actualites</p>
        <h2 className="section-title">Nos actualites sante</h2>

        {warning ? (
          <div className="mb-6 rounded-2xl border border-[var(--color-warning-border)] bg-[var(--color-warning-bg)] px-5 py-4 text-sm text-[var(--color-muted-strong)] shadow-sm">
            {warning}
          </div>
        ) : null}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <ArticleCardSkeleton key={index} index={index} />
            ))}
          </div>
        ) : null}

        {!loading && error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700 shadow-sm">
            {error}
          </div>
        ) : null}

        {!loading && !error && articles.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center text-sm text-[var(--color-muted)] shadow-sm">
            Aucune actualite n&apos;est disponible pour le moment.
          </div>
        ) : null}

        {!loading && !error && articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {articles.map((article, index) => {
              const visuel = visuels[index % visuels.length];

              return (
                <article key={index} className="card-shell">
                  <div
                    className={`relative h-32 overflow-hidden bg-gradient-to-br ${visuel.frame}`}
                  >
                    <div
                      className={`absolute -right-6 top-4 h-24 w-24 rounded-full blur-sm ${visuel.orb}`}
                    />
                    <div
                      className={`absolute left-5 top-5 h-10 w-10 rounded-full ${visuel.orb}`}
                    />
                    <div
                      className={`absolute left-5 bottom-6 h-2 w-24 rounded-full ${visuel.line}`}
                    />
                    <div
                      className={`absolute left-5 bottom-11 h-2 w-16 rounded-full ${visuel.line}`}
                    />
                    <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                      <span className="rounded-full bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                        Sante
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex-1">
                      <h3 className="mb-1 min-h-[4.5rem] text-base font-bold text-[var(--color-primary)] line-clamp-3">
                        {article.title}
                      </h3>
                      <p className="mb-4 text-sm font-semibold text-[var(--color-accent)]">
                        Sante publique France
                      </p>
                      <p className="mb-4 min-h-[6rem] text-sm leading-6 text-[var(--color-muted)] line-clamp-4">
                        {article.description ||
                          "Retrouvez cette actualite sur le site de Sante publique France."}
                      </p>
                    </div>

                    <div className="mt-auto pt-2">
                      <p className="mb-4 text-xs font-medium text-[var(--color-muted-soft)]">
                        {formatPublishedAt(article.publishedAt)}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-block text-xs"
                      >
                        Lire l&apos;article
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
