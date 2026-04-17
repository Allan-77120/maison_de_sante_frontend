export default function Acces() {
  return (
    <section id="acces" className="section-shell">
      <div className="section-inner max-w-6xl">
        <p className="section-kicker">Venir au cabinet</p>
        <h2 className="section-title">Acces et adresse</h2>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.25fr]">
          <article className="card-shell rounded-[1.75rem] border border-[#d9e3ee] p-6 sm:p-7">
            <div className="mb-5 rounded-3xl bg-[linear-gradient(135deg,#1a2f4e_0%,#2d7dd2_100%)] p-5 text-white">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/72">
                Maison de sante
              </p>
              <h3 className="text-xl font-bold">MSU du Provinois</h3>
            </div>

            <div className="space-y-4 text-sm leading-6 text-[#4d5f73]">
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60708a]">
                  Adresse
                </p>
                <p>3 Cour des Benedictins, 77160 Provins, France</p>
              </div>

              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60708a]">
                  Telephone
                </p>
                <a
                  href="tel:0160675861"
                  className="font-semibold text-[#2d7dd2] hover:underline"
                >
                  01 60 67 58 61
                </a>
              </div>

              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60708a]">
                  Reperes
                </p>
                <p>
                  Centre-ville de Provins, acces pieton simple et stationnement
                  a proximite.
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=3+Cour+des+Benedictins,+77160+Provins"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-[#c9d8e8] bg-white px-5 py-3 text-sm font-semibold text-[#1a2f4e] transition duration-200 hover:border-[#2d7dd2] hover:text-[#2d7dd2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a2f4e]"
            >
              Ouvrir dans Google Maps
            </a>
          </article>

          <div className="overflow-hidden rounded-[1.75rem] border border-[#d9e3ee] bg-white shadow-[0_16px_34px_rgba(18,44,66,0.08)]">
            <iframe
              title="Carte Google Maps Maison de Sante Universitaire du Provinois"
              src="https://www.google.com/maps?q=3%20Cour%20des%20Benedictins%2C%2077160%20Provins&z=16&output=embed"
              className="h-[320px] w-full border-0 sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
