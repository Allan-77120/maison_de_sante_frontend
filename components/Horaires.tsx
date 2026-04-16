interface Jour {
  jour: string;
  matin: string | null;
  aprem: string | null;
}

const jours: Jour[] = [
  { jour: "Lundi", matin: "08h00 - 12h00", aprem: "14h00 - 19h00" },
  { jour: "Mardi", matin: "08h00 - 12h00", aprem: "14h00 - 19h00" },
  { jour: "Mercredi", matin: "08h00 - 12h00", aprem: "14h00 - 19h00" },
  { jour: "Jeudi", matin: "08h00 - 12h00", aprem: "14h00 - 19h00" },
  { jour: "Vendredi", matin: "08h00 - 12h00", aprem: "14h00 - 18h00" },
  { jour: "Samedi", matin: "08h30 - 12h30", aprem: null },
  { jour: "Dimanche", matin: null, aprem: null },
];

export default function Horaires() {
  return (
    <section id="horaires" className="bg-[#f4f7fb] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#3a8c6e] font-semibold text-xs tracking-widest uppercase mb-3">
          Organisation
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-12">
          Horaires d&apos;ouverture
        </h2>

        <div className="flex flex-col gap-3">
          {jours.map(({ jour, matin, aprem }) => {
            const ferme = !matin && !aprem;
            return (
              <div
                key={jour}
                className={`grid grid-cols-3 items-center bg-white rounded-xl px-6 py-4 shadow-sm ${
                  ferme ? "opacity-50" : ""
                }`}
              >
                <span className="font-bold text-[#1a3a5c] text-sm">{jour}</span>
                <span className="text-gray-500 text-sm">{matin ?? "-"}</span>
                <span className="text-gray-500 text-sm">
                  {aprem ?? "Ferme"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#e6dcc0] bg-[linear-gradient(135deg,#fffdf8_0%,#f8f3e8_100%)] shadow-sm">
          <div className="flex items-start gap-4 px-5 py-5">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#60707d]">
                Urgence
              </p>
              <p className="text-sm leading-6 text-[#49635a]">
                En cas d&apos;urgence en dehors des horaires, composez le{" "}
                <strong className="text-[#1a3a5c]">15</strong> (SAMU) ou le{" "}
                <strong className="text-[#1a3a5c]">116 117</strong> (medecin de
                garde).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
