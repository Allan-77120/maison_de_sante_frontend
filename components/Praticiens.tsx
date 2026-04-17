"use client";

import { useRef, useState } from "react";

function StethoscopeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[#2d7dd2]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3v6a4 4 0 0 0 8 0V3" />
      <path d="M6 3H4" />
      <path d="M14 3h2" />
      <path d="M10 13v2a5 5 0 0 0 10 0v-1.5" />
      <circle cx="20" cy="11.5" r="2.5" />
    </svg>
  );
}

interface Praticien {
  nom: string;
  specialite: string;
  langues: string[];
  url: string;
  accent: string;
  portrait: string;
  initials: string;
}

const praticiens: Praticien[] = [
  {
    nom: "Dr Marion Thevenot",
    specialite: "Medecine generale",
    langues: ["Francais", "Anglais"],
    url: "https://docteur-thevenot.sante.pro/",
    accent: "from-[#1a2f4e] to-[#2d7dd2]",
    portrait: "bg-[#dbe8f6]",
    initials: "MT",
  },
  {
    nom: "Dr Marion Berrebi",
    specialite: "Medecine generale",
    langues: ["Francais", "Anglais"],
    url: "https://docteur-berrebi.sante.pro/",
    accent: "from-[#21476f] to-[#2d8c6e]",
    portrait: "bg-[#dbe8f6]",
    initials: "MB",
  },
  {
    nom: "Dr Iveta Ivanova",
    specialite: "Medecine generale",
    langues: ["Francais", "Anglais", "Bulgare"],
    url: "https://docteur-ivanova.sante.pro/",
    accent: "from-[#1f5f63] to-[#2d7dd2]",
    portrait: "bg-[#dbe8f6]",
    initials: "II",
  },
];

function PracticienCard({ praticien }: { praticien: Praticien }) {
  return (
    <article className="card-shell group rounded-[1.75rem] border border-[#d9e3ee]">
      <div
        className={`bg-gradient-to-br ${praticien.accent} px-5 pb-6 pt-5 text-white sm:px-6`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75">
              Consultation
            </p>
            <h3 className="text-xl font-bold">{praticien.nom}</h3>
          </div>
          <div
            className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.5rem] border border-white/45 ${praticien.portrait} text-2xl font-bold text-[#1a2f4e] shadow-[0_18px_35px_rgba(14,33,58,0.18)]`}
            aria-label={`Placeholder photo ${praticien.nom}`}
            role="img"
          >
            {praticien.initials}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6">
        <div className="mb-5 flex items-start gap-3 rounded-2xl bg-[#f5f8fc] px-4 py-3">
          <div className="mt-0.5 rounded-full bg-white p-2 shadow-sm">
            <StethoscopeIcon />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60708a]">
              Specialite
            </p>
            <p className="font-semibold text-[#1a2f4e]">
              {praticien.specialite}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60708a]">
            Langues parlees
          </p>
          <div className="flex flex-wrap gap-2">
            {praticien.langues.map((langue) => (
              <span
                key={langue}
                className="rounded-full bg-[#e2eef9] px-3 py-1.5 text-xs font-semibold text-[#1a2f4e]"
              >
                {langue}
              </span>
            ))}
          </div>
        </div>

        <a
          href={praticien.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center rounded-full bg-[#2d7dd2] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(45,125,210,0.25)] transition duration-200 hover:bg-[#1f6fbe] hover:shadow-[0_16px_30px_rgba(45,125,210,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a2f4e]"
        >
          Prendre RDV
        </a>
      </div>
    </article>
  );
}

export default function Praticiens() {
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
    setActiveIndex(Math.max(0, Math.min(praticiens.length - 1, index)));
  };

  return (
    <section id="praticiens" className="section-shell">
      <div className="section-inner max-w-6xl">
        <p className="section-kicker">Equipe medicale</p>
        <h2 className="section-title">Nos praticiens</h2>

        <div className="md:hidden">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [touch-action:pan-x]"
          >
            {praticiens.map((praticien) => (
              <div
                key={praticien.nom}
                className="w-full shrink-0 snap-center px-1"
              >
                <PracticienCard praticien={praticien} />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9e3ee] bg-white text-[#1a2f4e] transition hover:border-[#2d7dd2] hover:text-[#2d7dd2]"
              aria-label="Praticien precedent"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {praticiens.map((praticien, index) => (
                <button
                  key={praticien.nom}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  aria-label={`Voir ${praticien.nom}`}
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
                scrollToIndex(Math.min(activeIndex + 1, praticiens.length - 1))
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9e3ee] bg-white text-[#1a2f4e] transition hover:border-[#2d7dd2] hover:text-[#2d7dd2]"
              aria-label="Praticien suivant"
            >
              →
            </button>
          </div>
        </div>

        <div className="hidden grid-cols-1 gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
          {praticiens.map((praticien) => (
            <PracticienCard key={praticien.nom} praticien={praticien} />
          ))}
        </div>
      </div>
    </section>
  );
}
