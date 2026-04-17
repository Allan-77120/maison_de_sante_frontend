const liens = [
  { label: "Accueil", href: "#accueil" },
  { label: "Praticiens", href: "#praticiens" },
  { label: "Horaires", href: "#horaires" },
  { label: "Acces", href: "#acces" },
  { label: "Mentions legales", href: "#mentions" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a2f4e] px-6 py-16 text-center text-white/78">
      <div className="mx-auto max-w-2xl">
        <h3 className="mb-2 text-xl font-bold text-white">MSU Provinois</h3>
        <p className="mb-8 text-sm leading-7">
          3 Cour des Benedictins, 77160 Provins
          <br />
          01 60 67 58 61
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {liens.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/78 transition duration-200 hover:border-white/30 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 text-xs">
          © 2026 MSU Provinois - Tous droits reserves
        </div>
      </div>
    </footer>
  );
}
