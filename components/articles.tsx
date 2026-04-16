'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
// 1. On définit la structure d'un article pour TypeScript
interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
}

export default function Articles() {
  // 2. On précise que le State est un tableau d'articles
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 3. Appel à ton Backend (celui qu'on a testé sur Thunder Client)
    fetch('http://localhost:3000/users') // Remplace par ta route si différente
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur front:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Chargement des actualités...</p>;

  return (
    <section className="px-6 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-[#1a3a5c] mb-8 text-center">
        Actualités Santé
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            {article.image && (
              <Image
                src={article.image} 
                alt={article.title} 
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-4 flex-grow">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.description}
              </p>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#3a8c6e] font-semibold hover:underline text-sm"
              >
                Lire la suite →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}