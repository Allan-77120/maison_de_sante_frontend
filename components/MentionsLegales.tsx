const legalRows = [
  {
    label: "Editeur",
    value:
      "Maison de Sante Universitaire du Provinois, Societe Civile de Moyens au capital de 200 EUR",
  },
  {
    label: "Representant",
    value: "Dr Marion Thevenot",
  },
  {
    label: "Adresse",
    value: "3 Cour des Benedictins, 77160 Provins, France",
  },
  {
    label: "RCS Melun",
    value: "821 474 483",
  },
];

export default function MentionsLegales() {
  return (
    <section id="mentions" className="bg-[#f4f7fb] px-5 py-16 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3a8c6e]">
            Informations legales
          </p>
          <h2 className="text-3xl font-bold text-[#1a3a5c] md:text-4xl">
            Mentions legales
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#e6dcc0] bg-[linear-gradient(135deg,#fffdf8_0%,#f8f3e8_100%)] shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr_0.9fr]">
            <div className="px-4 py-4 sm:px-6 sm:py-5">
              <p className="mb-3 text-sm font-bold text-[#1a3a5c]">Editeur</p>
              <div className="divide-y divide-[#eadfca] rounded-2xl bg-white/60">
                {legalRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-1 px-4 py-3 sm:grid-cols-[140px_1fr] sm:gap-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60707d]">
                      {row.label}
                    </p>
                    <p className="text-sm leading-6 text-[#5f6c7b]">
                      {row.value}
                    </p>
                  </div>
                ))}
                <div className="grid gap-1 px-4 py-3 sm:grid-cols-[140px_1fr] sm:gap-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60707d]">
                    Telephone
                  </p>
                  <a
                    href="tel:0160675861"
                    className="text-sm font-semibold leading-6 text-[#2c6e9e] hover:underline"
                  >
                    01 60 67 58 61
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-[#eadfca] px-4 py-4 sm:px-6 sm:py-5 lg:border-t-0 lg:border-l">
              <p className="mb-3 text-sm font-bold text-[#1a3a5c]">
                Publication
              </p>
              <div className="rounded-2xl bg-white/60 px-4 py-3">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60707d]">
                  Directeur
                </p>
                <p className="text-sm leading-6 text-[#5f6c7b]">
                  Dr Marion Thevenot
                </p>
              </div>
            </div>

            <div className="border-t border-[#eadfca] px-4 py-4 sm:px-6 sm:py-5 lg:border-t-0 lg:border-l">
              <p className="mb-3 text-sm font-bold text-[#1a3a5c]">
                Donnees du site
              </p>
              <div className="rounded-2xl bg-white/60 px-4 py-3">
                <p className="text-sm leading-6 text-[#5f6c7b]">
                  Aucun financement exterieur, aucune publicite, et aucune
                  collecte de donnees personnelles des visiteurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
