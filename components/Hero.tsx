
export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-[#1a3a5c] via-[#2c6e9e] to-[#3a8c6e]"
    >
      {/* Vague blanche */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-white"
        style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}
      />

      <span className="bg-white/20 text-white text-xs tracking-widest uppercase px-5 py-2 rounded-full mb-7">
        Maison de Santé Universitaire — Provins
      </span>

      <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl mb-5">
        Votre santé entre <br />
        <span className="text-[#7edcb5]">de bonnes mains</span>
      </h1>

      <p className="text-white/80 text-lg max-w-md mb-10 leading-relaxed">
        Cabinet pluriprofessionnel universitaire ouvert depuis 2016 à Provins
      </p>

      <div className="relative z-10 flex flex-wrap gap-4 justify-center">
        <a
          href="https://www.doctolib.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#1a3a5c] font-bold px-8 py-4 rounded-full text-sm hover:shadow-lg hover:scale-105 transition-all"
        >
          📅 Prendre RDV
        </a>
        <a
          href="#horaires"
          className="border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-all"
        >
          Voir les horaires ↓
        </a>
      </div>
    </section>
  )
}
