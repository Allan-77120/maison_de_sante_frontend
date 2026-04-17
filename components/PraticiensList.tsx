"use client";

import { useEffect, useState } from "react";

import BottomSheet from "@/components/BottomSheet";
import { praticiens, type Praticien } from "@/components/praticiens.data";

export default function PraticiensList() {
  const [selectedPraticien, setSelectedPraticien] = useState<Praticien | null>(
    null,
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSelectedPraticien(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="praticiens" className="bg-[#eef2f7] px-4 py-9 md:px-6 md:py-20">
      <div className="mx-auto max-w-[390px] md:max-w-[480px]">
        <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#2a7d6f]">
          Nos praticiens
        </p>
        <h2 className="mb-5 text-[2rem] leading-[1.05] font-extrabold text-[#0d1b3e] md:mb-6 md:text-[2.3rem]">
          Nos praticiens
        </h2>

        <div className="flex flex-col gap-3">
          {praticiens.map((praticien) => (
            <button
              key={praticien.id}
              type="button"
              onClick={() => setSelectedPraticien(praticien)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border-0 bg-white px-4 py-4 text-left shadow-[0_8px_24px_rgba(13,27,62,0.08)] transition duration-200 hover:-translate-y-px hover:shadow-[0_12px_28px_rgba(13,27,62,0.11)]"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#1a3a6b_0%,#2d6abf_100%)] text-base font-extrabold text-white">
                  {praticien.initiales}
                </div>
                <div>
                  <p className="mb-0.5 text-[0.98rem] font-extrabold leading-[1.25] text-[#0d1b3e]">
                    {praticien.nom}
                  </p>
                  <p className="text-[0.9rem] leading-[1.3] text-[#6b7a99]">
                    {praticien.specialite}
                  </p>
                </div>
              </div>
              <span
                aria-hidden="true"
                className="text-[1.35rem] font-medium text-[#6b7a99]"
              >
                ›
              </span>
            </button>
          ))}
        </div>
      </div>

      <BottomSheet
        praticien={selectedPraticien}
        open={Boolean(selectedPraticien)}
        onClose={() => setSelectedPraticien(null)}
      />
    </section>
  );
}
