export default function MentionsLegales() {
  return (
    <section id="mentions" className="bg-[#f4f7fb] px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3a8c6e]">
            Informations légales
          </p>
          <h2 className="text-3xl font-bold text-[#1a3a5c] md:text-4xl">
            Mentions légales
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          <div className="rounded-2xl border border-[#e6dcc0] bg-[linear-gradient(135deg,#fffdf8_0%,#f8f3e8_100%)] px-6 py-5 shadow-sm">
            <p className="mb-4 text-sm font-bold text-[#1a3a5c]">Éditeur</p>
            <div className="space-y-2 text-sm leading-6 text-gray-600">
              <p>
                Maison de Santé Universitaire du Provinois, Société Civile de
                Moyens au capital de 200 €
              </p>
              <p>
                Représentée par le{" "}
                <strong className="text-[#1a3a5c]">Dr Marion Thévenot</strong>
              </p>
              <p>3 Cour des Bénédictins, 77160 Provins, France</p>
              <p>
                RCS Melun{" "}
                <strong className="text-[#1a3a5c]">821 474 483</strong>
              </p>
              <p>
                Tél. :{" "}
                <a
                  href="tel:0160675861"
                  className="text-[#2c6e9e] hover:underline"
                >
                  01 60 67 58 61
                </a>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e6dcc0] bg-[linear-gradient(135deg,#fffdf8_0%,#f8f3e8_100%)] px-6 py-5 shadow-sm">
            <p className="mb-4 text-sm font-bold text-[#1a3a5c]">
              Publication
            </p>
            <p className="text-sm leading-6 text-gray-600">
              Directeur de la publication :
              <br />
              <strong className="text-[#1a3a5c]">Dr Marion Thévenot</strong>
            </p>
          </div>

          <div className="rounded-2xl border border-[#e6dcc0] bg-[linear-gradient(135deg,#fffdf8_0%,#f8f3e8_100%)] px-6 py-5 shadow-sm">
            <p className="mb-4 text-sm font-bold text-[#1a3a5c]">
              Données du site
            </p>
            <p className="text-sm leading-6 text-gray-600">
              Aucun financement extérieur, aucune publicité, et aucune collecte
              de données personnelles des visiteurs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
