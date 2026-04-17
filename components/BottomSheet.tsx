"use client";

import { useEffect } from "react";

import type { Praticien } from "@/components/praticiens.data";

type BottomSheetProps = {
  praticien: Praticien | null;
  open: boolean;
  onClose: () => void;
};

export default function BottomSheet({
  praticien,
  open,
  onClose,
}: BottomSheetProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="Fermer les informations du praticien"
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-[#0d1b3e]/60 transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        aria-hidden={!open}
        className={`fixed left-1/2 top-1/2 z-[70] flex max-h-[92vh] w-[calc(100%-10px)] max-w-[408px] -translate-x-1/2 flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_20px_48px_rgba(13,27,62,0.22)] transition-transform duration-300 ${
          open ? "-translate-y-1/2" : "translate-y-[120px]"
        }`}
      >
        {praticien ? (
          <>
            <div className="flex justify-center px-4 pb-1 pt-1.5">
              <div className="h-1 w-9 rounded-full bg-[#d3d9e4]" />
            </div>

            <div className="flex items-center gap-2.5 bg-[linear-gradient(135deg,#1a3a6b_0%,#2d6abf_100%)] px-3.5 pb-2.5 pt-2.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-white/30 bg-white/15 text-[0.94rem] font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                {praticien.initiales}
              </div>
              <div>
                <h3 className="mb-0.5 text-[0.94rem] font-extrabold leading-[1.15] text-white">
                  {praticien.nom}
                </h3>
                <p className="text-[0.75rem] text-white/85">
                  {praticien.specialite}
                </p>
              </div>
            </div>

            <div className="overflow-y-auto px-2.5 pb-2 pt-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="grid grid-cols-2 gap-1.5">
                <InfoCard icon="🩺" title="Specialite" className="col-span-2">
                  <p className="text-[0.81rem] leading-[1.35] text-[#6b7a99]">
                    {praticien.specialite}
                  </p>
                </InfoCard>

                {praticien.diplome ? (
                  <InfoCard
                    icon="🎓"
                    title="Titres et publications"
                    className="col-span-2"
                  >
                    <div className="grid gap-2">
                      <SubCard label="Diplome">{praticien.diplome}</SubCard>
                      {praticien.formation ? (
                        <SubCard label="Formation complementaire">
                          {praticien.formation}
                        </SubCard>
                      ) : null}
                    </div>
                  </InfoCard>
                ) : null}

                {praticien.convention || praticien.paiements?.length ? (
                  <InfoCard icon="€" title="Honoraires" className="col-span-2">
                    <div className="grid gap-2">
                      {praticien.convention ? (
                        <SubCard accent="blue" strong>
                          {praticien.convention}
                        </SubCard>
                      ) : null}
                      {praticien.paiements?.length ? (
                        <SubCard label="Paiement">
                          <div className="flex flex-wrap gap-2">
                            {praticien.paiements.map((paiement) => (
                              <span
                                key={paiement}
                                className="rounded-full border border-[#cfe0f5] bg-[#edf5ff] px-2.5 py-1 text-[0.74rem] font-bold text-[#1a3a6b] shadow-[0_4px_10px_rgba(13,27,62,0.06)]"
                              >
                                {paiement}
                              </span>
                            ))}
                          </div>
                        </SubCard>
                      ) : null}
                    </div>
                  </InfoCard>
                ) : null}

                <InfoCard icon="🗣" title="Langues" className="col-span-2">
                  <div className="grid gap-2">
                    <SubCard>
                      <div className="flex flex-wrap gap-2">
                        {praticien.langues.map((langue) => (
                          <span
                            key={langue}
                            className="rounded-full border border-[#cfe0f5] bg-[#edf5ff] px-2.5 py-1 text-[0.74rem] font-bold text-[#1a3a6b] shadow-[0_4px_10px_rgba(13,27,62,0.06)]"
                          >
                            {langue}
                          </span>
                        ))}
                      </div>
                    </SubCard>
                  </div>
                </InfoCard>

                {praticien.rpps || praticien.carteVitale ? (
                  <InfoCard icon="🪪" title="Infos medicales" className="col-span-2">
                    <div className="grid grid-cols-2 gap-2">
                      {praticien.rpps ? (
                        <div className="rounded-xl border border-[#dce4ef] bg-[#f7fbff] px-2.5 py-2">
                          <p className="text-[0.66rem] font-bold uppercase tracking-[0.08em] text-[#2d6abf]">
                            RPPS
                          </p>
                          <p className="mt-0.5 text-[0.78rem] font-semibold text-[#1a3a6b]">
                            {praticien.rpps}
                          </p>
                        </div>
                      ) : null}
                      {praticien.carteVitale ? (
                        <div className="rounded-xl border border-[#d8e5d9] bg-[#f1faf5] px-3 py-2">
                          <p className="text-[0.66rem] font-bold uppercase tracking-[0.08em] text-[#2d8c6e]">
                            Carte vitale
                          </p>
                          <p className="mt-0.5 text-[0.78rem] font-semibold text-[#49635a]">
                            Acceptee
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </InfoCard>
                ) : null}

                {praticien.horaires ? (
                  <InfoCard icon="📅" title="Horaires">
                    <p className="text-[0.84rem] leading-[1.38] text-[#6b7a99]">
                      {praticien.horaires}
                    </p>
                  </InfoCard>
                ) : null}

                {praticien.telephone || praticien.adresse?.length ? (
                  <InfoCard icon="📞" title="Coordonnees" className="col-span-2">
                    <div className="grid gap-2">
                      {praticien.telephone ? (
                        <SubCard label="Telephone">{praticien.telephone}</SubCard>
                      ) : null}
                      {praticien.adresse?.length ? (
                        <SubCard label="Adresse">
                          <>
                            {praticien.acces ? (
                              <p className="mb-1 text-[0.76rem] font-bold text-[#6b7a99]">
                                {praticien.acces}
                              </p>
                            ) : null}
                            {praticien.adresse.map((ligne) => (
                              <p
                                key={ligne}
                                className="text-[0.84rem] leading-[1.38] text-[#6b7a99]"
                              >
                                {ligne}
                              </p>
                            ))}
                          </>
                        </SubCard>
                      ) : null}
                    </div>
                  </InfoCard>
                ) : null}
              </div>
            </div>

            <div className="border-t border-[#eef2f7] bg-white px-2.5 pb-2.5 pt-1.5 shadow-[0_-6px_18px_rgba(13,27,62,0.05)]">
              <a
                href={praticien.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#1a3a6b_0%,#2d6abf_100%)] px-4 py-[9px] text-[0.82rem] font-extrabold text-white transition duration-200 hover:-translate-y-px hover:shadow-[0_12px_24px_rgba(26,58,107,0.24)]"
              >
                Prendre rendez-vous
              </a>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

function InfoCard({
  icon,
  title,
  children,
  className = "",
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[18px] bg-[#f7f9fc] p-[5px] text-[#0d1b3e] shadow-[inset_0_0_0_1px_rgba(13,27,62,0.03)] ${className}`}
    >
      <div className="mb-0.5 flex items-center gap-2 text-[0.76rem] font-bold">
        <span aria-hidden="true">{icon}</span>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function SubCard({
  label,
  children,
  accent = "blue",
  strong = false,
}: {
  label?: string;
  children: React.ReactNode;
  accent?: "blue" | "green";
  strong?: boolean;
}) {
  const tone =
    accent === "green"
      ? {
          wrapper: "border-[#d8e5d9] bg-[#f1faf5]",
          label: "text-[#2d8c6e]",
          value: "text-[#49635a]",
        }
      : {
          wrapper: "border-[#d9e5f5] bg-white",
          label: "text-[#2d6abf]",
          value: strong ? "text-[#1a3a6b] font-semibold" : "text-[#6b7a99]",
        };

  return (
    <div className={`rounded-[14px] border px-2 py-1.5 ${tone.wrapper}`}>
      {label ? (
        <p
          className={`text-[0.64rem] font-bold uppercase tracking-[0.08em] ${tone.label}`}
        >
          {label}
        </p>
      ) : null}
      <div className={`mt-0.5 text-[0.73rem] leading-[1.2] ${tone.value}`}>
        {children}
      </div>
    </div>
  );
}
