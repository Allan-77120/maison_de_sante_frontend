"use client";

interface Jour {
  jour: string;
  matin: string | null;
  aprem: string | null;
}

const jours: Jour[] = [
  { jour: "Lundi", matin: "09h00 - 12h00", aprem: "14h00 - 19h00" },
  { jour: "Mardi", matin: "09h00 - 12h00", aprem: "14h00 - 19h00" },
  { jour: "Mercredi", matin: "09h00 - 12h00", aprem: "14h00 - 19h00" },
  { jour: "Jeudi", matin: "09h00 - 12h00", aprem: "14h00 - 19h00" },
  { jour: "Vendredi", matin: "09h00 - 12h00", aprem: "14h00 - 19h00" },
  { jour: "Samedi", matin: "09h00 - 12h00", aprem: null },
  { jour: "Dimanche", matin: null, aprem: null },
];

const dayNames = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

const mobileRows = [
  {
    jour: "Lundi au Vendredi",
    horaires: "09h00-12h00 / 14h00-19h00",
    closed: false,
  },
  {
    jour: "Samedi",
    horaires: "08h30-12h30",
    closed: false,
  },
  {
    jour: "Dimanche",
    horaires: "Ferme",
    closed: true,
  },
];

export default function Horaires() {
  const currentDay = dayNames[new Date().getDay()];

  return (
    <section id="horaires" className="section-shell">
      <div className="section-inner max-w-4xl">
        <p className="section-kicker">Organisation</p>
        <h2 className="section-title">Horaires d&apos;ouverture</h2>

        <div className="md:hidden">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#d9e3ee] bg-white shadow-sm">
            <div className="grid grid-cols-[1.15fr_1fr] border-b border-[#e6edf5] bg-[#f7fafd] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60708a]">
                Jour
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60708a]">
                Horaires
              </p>
            </div>
            {mobileRows.map((row) => (
              <div
                key={row.jour}
                className="grid grid-cols-[1.15fr_1fr] gap-3 border-b border-[#eef3f8] px-4 py-3 last:border-b-0"
              >
                <p className="text-sm font-semibold text-[#1a2f4e]">{row.jour}</p>
                <p
                  className={`text-sm ${
                    row.closed ? "font-semibold text-[#9b7a2e]" : "text-[#5f6c7b]"
                  }`}
                >
                  {row.horaires}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="flex flex-col gap-3">
            {jours.map(({ jour, matin, aprem }) => {
              const ferme = !matin && !aprem;
              const dimanche = jour === "Dimanche";
              const isToday = jour === currentDay;

              return (
                <div
                  key={jour}
                  className={`grid grid-cols-1 gap-3 rounded-2xl border px-5 py-4 shadow-sm transition duration-200 sm:grid-cols-[1fr_1fr_1fr] sm:items-center sm:px-6 ${
                    isToday
                      ? "border-[#2d7dd2] bg-[#eef5fd] shadow-[0_16px_34px_rgba(45,125,210,0.14)]"
                      : dimanche
                        ? "border-[#e6dcc0] bg-[linear-gradient(135deg,#fffdf8_0%,#f8f3e8_100%)]"
                        : "border-transparent bg-white"
                  } ${ferme && !dimanche ? "opacity-70" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-[#1a2f4e]">
                      {jour}
                    </span>
                    {isToday ? (
                      <span className="rounded-full bg-[#2d7dd2] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                        Aujourd&apos;hui
                      </span>
                    ) : null}
                  </div>
                  <span className="text-sm text-[#5f6c7b]">
                    {matin ?? "Ferme"}
                  </span>
                  <span className="text-sm text-[#5f6c7b]">
                    {aprem ?? "Ferme"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-[26rem] overflow-hidden rounded-[1.5rem] border border-[#e6dcc0] bg-[linear-gradient(135deg,#fffdf8_0%,#f8f3e8_100%)] shadow-sm md:mt-8">
          <div className="px-4 py-3.5 text-center md:px-5 md:py-4">
            <div className="mx-auto max-w-[20rem]">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#60707d]">
                Urgence
              </p>
              <p className="text-sm leading-5 text-[#49635a]">
                En cas d&apos;urgence en dehors des horaires, composez le{" "}
                <strong className="text-[#1a2f4e]">15</strong> (SAMU)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
