"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/users`);
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(
            data?.error || `Erreur API (${res.status} ${res.statusText})`,
          );
        }

        if (!Array.isArray(data?.articles)) {
          throw new Error("Reponse backend invalide.");
        }

        setArticles(data.articles);
      } catch (err) {
        console.error("Erreur front:", err);
        setArticles([]);
        setError(
          err instanceof Error
            ? err.message
            : "Impossible de charger les actualites.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Chargement des actualites...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-600">{error}</p>;
  }

  return (
    <section className="px-4 py-10 bg-gray-50">
      <h2 className="text-2xl font-bold text-[#1a3a5c] mb-6 text-center">
        Actualites Sante
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            {article.image && (
              <Image
                src={article.image}
                alt={article.title}
                width={320}
                height={180}
                className="h-32 w-full object-cover"
              />
            )}
            <div className="p-3 flex-grow">
              <h3 className="font-bold text-sm mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                {article.description}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3a8c6e] font-semibold hover:underline text-xs"
              >
                Lire la suite
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
