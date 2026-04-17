"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  "from-[#1a2f4e] to-[#2d7dd2]",
  "from-[#2d7dd2] to-[#66a6eb]",
  "from-[#1f5b62] to-[#2d8c6e]",
  "from-[#274e68] to-[#62a4ca]",
  "from-[#1e5c4a] to-[#3ba07d]",
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
  return (
    <div className="card-shell h-full overflow-hidden rounded-[1.75rem] border border-[#d9e3ee] animate-pulse">
      <div className={`h-32 bg-gradient-to-br ${visuels[index % visuels.length]}`} />
      <div className="p-4">
        <div className="mb-3 h-4 w-4/5 rounded-full bg-slate-200" />
        <div className="mb-4 h-4 w-2/5 rounded-full bg-slate-100" />
        <div className="mb-2 h-3 w-full rounded-full bg-slate-100" />
        <div className="mb-2 h-3 w-full rounded-full bg-slate-100" />
        <div className="mb-5 h-3 w-3/4 rounded-full bg-slate-100" />
        <div className="h-9 w-28 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollToIndex = (index: number) => {
    const node = trackRef.current;
    if (!node) return;

    const child = node.children[index] as HTMLElement | undefined;
    if (!child) return;

    child.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const node = trackRef.current;
    if (!node) return;

    const { scrollLeft, clientWidth } = node;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(Math.max(0, Math.min(articles.length - 1, index)));
  };

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
              ? data.warning || "Une erreur est survenue."
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
    <section id="actualites" className="section-shell">
      <div className="section-inner max-w-7xl">
        <p className="section-kicker">Actualites sante</p>
        <h2 className="section-title">Nos actualites sante</h2>

        {warning ? (
          <div className="mb-6 rounded-2xl border border-[var(--color-warning-border)] bg-[var(--color-warning-bg)] px-5 py-4 text-sm text-[var(--color-muted-strong)] shadow-sm">
            {warning}
          </div>
        ) : null}

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-5">
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
          <>
            <div className="md:hidden">
              <div
                ref={trackRef}
                onScroll={handleScroll}
                className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [touch-action:pan-x]"
              >
                {articles.map((article, index) => (
                  <div
                    key={`${article.url}-${index}`}
                    className="w-full shrink-0 snap-center px-1"
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9e3ee] bg-white text-[#1a2f4e] transition hover:border-[#2d7dd2] hover:text-[#2d7dd2]"
                  aria-label="Actualite precedente"
                >
                  ←
                </button>
                <div className="flex items-center gap-2">
                  {articles.map((article, index) => (
                    <button
                      key={`${article.title}-${index}`}
                      type="button"
                      onClick={() => scrollToIndex(index)}
                      aria-label={`Voir actualite ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        activeIndex === index
                          ? "w-6 bg-[#2d7dd2]"
                          : "w-2.5 bg-[#c4d4e5]"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    scrollToIndex(Math.min(activeIndex + 1, articles.length - 1))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9e3ee] bg-white text-[#1a2f4e] transition hover:border-[#2d7dd2] hover:text-[#2d7dd2]"
                  aria-label="Actualite suivante"
                >
                  →
                </button>
              </div>
            </div>

            <div className="hidden md:grid md:grid-cols-3 md:gap-5 xl:grid-cols-5">
              {articles.map((article, index) => (
                <ArticleCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card-shell h-full overflow-hidden rounded-[1.75rem] border border-[#d9e3ee]">
      <div className="relative h-32">
        <Image
          src={article.image}
          alt={`Illustration medicale pour ${article.title}`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33vw, 20vw"
          className="object-cover"
        />
        <div className="absolute inset-x-4 top-3">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a2f4e] shadow-sm">
            Prevention
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="mb-2 text-base font-bold leading-6 text-[#1a2f4e] md:min-h-[4rem]">
            {article.title}
          </h3>
          <p className="mb-2 text-sm font-semibold text-[#2d8c6e]">
            Sante publique France
          </p>
          <p className="mb-3 text-sm leading-6 text-[#5f6c7b] md:min-h-[6.5rem]">
            {article.description}
          </p>
        </div>

        <div className="mt-auto pt-1">
          <p className="mb-3 text-xs font-medium text-[#708090]">
            {formatPublishedAt(article.publishedAt)}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center px-4 py-2.5 text-xs"
          >
            Lire l&apos;article
          </a>
        </div>
      </div>
    </article>
  );
}
