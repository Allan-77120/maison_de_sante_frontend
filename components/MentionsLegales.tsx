// components/MentionsLegales.tsx
interface Mention {
  titre: string
  contenu: string
}

const mentions: Mention[] = [
  {
    titre: 'Éditeur du site',
    contenu:
      'MSU Provinois — 3 cour des Bénédictins, 77160 Provins\nTél : 01 60 67 58 61\nEmail : contact@msu-provinois.com',
  },
 
  {
    titre: 'Données personnelles',
    contenu:
      "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous par email.",
  },
  {
    titre: 'Propriété intellectuelle',
    contenu:
      "L'ensemble des contenus présents sur ce site sont la propriété exclusive de la MSU Provinois. Toute reproduction sans autorisation préalable est interdite.",
  },
  {
    titre: 'Cookies',
    contenu:
      "Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire n'est utilisé.",
  },
]

export default function MentionsLegales() {
  return (
    <section id="mentions" className="bg-[#f4f7fb] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#3a8c6e] font-semibold text-xs tracking-widest uppercase mb-3">
          Légal
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-12">
          Mentions légales
        </h2>

        <div className="flex flex-col gap-4">
          {mentions.map(({ titre, contenu }) => (
            <div
              key={titre}
              className="bg-white rounded-xl px-8 py-6 shadow-sm border-l-4 border-[#2c6e9e]"
            >
              <h3 className="text-[#1a3a5c] font-bold text-base mb-3">{titre}</h3>
              <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{contenu}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
