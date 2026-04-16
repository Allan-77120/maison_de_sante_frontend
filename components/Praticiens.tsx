interface Praticien {
  nom: string;
  specialite: string;
  rdv: boolean;
  url: string;
}

const praticiens: Praticien[] = [
  {
    nom: "Dr. Thevenot",
    specialite: "Médecin généraliste",
    rdv: true,
    url: "https://docteur-thevenot.sante.pro/",
  },
  {
    nom: "Dr. Berrebi",
    specialite: "Médecin généraliste",
    rdv: true,
    url: "https://docteur-berrebi.sante.pro/",
  },
  {
    nom: "Dr. Ivanova",
    specialite: "Médecin généraliste",
    rdv: true,
    url: "https://docteur-ivanova.sante.pro/",
  },
];

const bandeaux = [
  "bg-[#1a3a5c]",
  "bg-[#2c6e9e]",
  "bg-[#3a8c6e]",
  "bg-[#4a9e7e]",
  "bg-[#1a5c4a]",
  "bg-[#0d2d47]",
];

export default function Praticiens() {
  return (
    <section id="praticiens" className="bg-[#f4f7fb] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#3a8c6e] font-semibold text-xs tracking-widest uppercase mb-3">
          Équipe
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-12">
          Nos praticiens
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {praticiens.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`${bandeaux[i % bandeaux.length]} h-28 flex items-center justify-center text-5xl`}
              />
              <div className="p-5">
                <h3 className="text-[#1a3a5c] font-bold text-base mb-1">
                  {p.nom}
                </h3>
                <p className="text-[#3a8c6e] font-semibold text-sm mb-4">
                  {p.specialite}
                </p>
                {p.rdv && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a3a5c] text-white text-xs font-bold px-5 py-2 rounded-full hover:bg-[#2c6e9e] transition-colors inline-block"
                  >
                    Prendre RDV
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
