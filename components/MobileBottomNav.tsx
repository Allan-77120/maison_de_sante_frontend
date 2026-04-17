"use client";

import { useEffect, useState } from "react";

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${active ? "text-[#2d7dd2]" : "text-[#60708a]"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  );
}

function DoctorIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${active ? "text-[#2d7dd2]" : "text-[#60708a]"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
      <path d="M18.5 6.5h4" />
      <path d="M20.5 4.5v4" />
    </svg>
  );
}

function ClockIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${active ? "text-[#2d7dd2]" : "text-[#60708a]"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3 2" />
    </svg>
  );
}

function NewsIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${active ? "text-[#2d7dd2]" : "text-[#60708a]"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 6.5h11.5A2.5 2.5 0 0 1 19 9v8.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
      <path d="M8 10h8" />
      <path d="M8 13h8" />
      <path d="M8 16h5" />
      <path d="M5 8.5h-1v9a2 2 0 0 0 2 2h1" />
    </svg>
  );
}

const items = [
  { id: "accueil", label: "Accueil", Icon: HomeIcon },
  { id: "praticiens", label: "Praticiens", Icon: DoctorIcon },
  { id: "horaires", label: "Horaires", Icon: ClockIcon },
  { id: "actualites", label: "Actualites", Icon: NewsIcon },
];

export default function MobileBottomNav() {
  const [activeId, setActiveId] = useState("accueil");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        threshold: [0.3, 0.55, 0.8],
        rootMargin: "-20% 0px -30% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#dbe5ef] bg-white/96 backdrop-blur md:hidden">
      <ul className="grid h-[60px] grid-cols-4">
        {items.map((item) => {
          const active = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                  active ? "text-[#2d7dd2]" : "text-[#60708a]"
                }`}
              >
                <item.Icon active={active} />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
