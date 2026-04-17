export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#3e8fda_0%,#2d7dd2_24%,#1a2f4e_70%)] px-5 py-16 text-center text-white sm:px-6 sm:py-20"
    >
      <div className="mx-auto flex min-h-[78vh] max-w-5xl flex-col items-center justify-center">
        {/* <span className="mb-6 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white sm:mb-7 sm:px-5 sm:text-xs">
          Maison de sante universitaire
        </span> */}

        <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Maison de sante 
          <span className="block text-[#8ee0c1]">universitaire</span>
        </h1>

        {/* <p className="mb-8 max-w-2xl text-base leading-7 text-white/82 sm:mb-10 sm:text-lg">
           Consultez
          vos praticiens, les horaires, l&apos;acces au cabinet et les actualites
          de prevention.
        </p> */}

        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          <a
            href="https://www.cabinetmedicalduprovinois.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 rounded-full bg-white px-8 py-3.5 text-xl font-bold text-[#1a2f4e] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f2f7fd] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Prendre rendez-vous
          </a>
          <a
            href="#praticiens"
            className="rounded-full border border-white/30 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 hover:bg-white/10"
          >
            Praticiens
          </a>
          <a
            href="#horaires"
            className="rounded-full border border-white/30 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 hover:bg-white/10"
          >
            Horaires
          </a>
          <a
            href="#acces"
            className="rounded-full border border-white/30 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 hover:bg-white/10"
          >
            Acces
          </a>
          <a
            href="#actualites"
            className="rounded-full border border-white/30 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 hover:bg-white/10"
          >
            Actualites
          </a>
        </div>
      </div>
    </section>
  );
}
