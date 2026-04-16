// components/Footer.tsx
const liens = [
  { label: 'Accueil',         href: '#accueil'    },
  { label: 'Horaires',        href: '#horaires'   },
  { label: 'Praticiens',      href: '#praticiens' },
  { label: 'Mentions légales',href: '#mentions'   },
]

export default function Footer() {
  return (
    <footer className="bg-[#1a3a5c] text-white/70 py-16 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <h3 className="text-white text-xl font-bold mb-2">MSU Provinois</h3>
        <p className="mb-8 leading-relaxed text-sm">
          3 cour des Bénédictins, 77160 Provins <br />
          01 60 67 58 61
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {liens.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 text-xs">
          © 2025 MSU Provinois — Tous droits réservés
        </div>
      </div>
    </footer>
  )
}
