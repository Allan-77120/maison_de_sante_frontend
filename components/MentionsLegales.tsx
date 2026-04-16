// components/MentionsLegales.tsx
export default function MentionsLegales() {
  return (
    <section id="mentions" className="bg-[#f4f7fb] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#3a8c6e] font-semibold text-xs tracking-widest uppercase mb-3">
          Informations légales
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-12">
          Mentions légales
        </h2>

        <div className="flex flex-col gap-3">

          <div className="bg-white rounded-xl px-6 py-5 shadow-sm">
            <p className="font-bold text-[#1a3a5c] text-sm mb-3">Éditeur</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Maison de Santé Universitaire du Provinois, Société Civile de Moyens au capital de 200 €</p>
              <p>Représentée par le <strong className="text-[#1a3a5c]">Dr Marion Thévenot</strong></p>
              <p>Siège social : 3 Cour des Bénédictins, 77160 Provins, France</p>
              <p>SCM immatriculée au RCS de Melun sous le numéro <strong className="text-[#1a3a5c]">821.474.483</strong></p>
              <p>Tél : <a href="tel:0160675861" className="text-[#2c6e9e] hover:underline">01 60 67 58 61</a></p>
            </div>
          </div>

          <div className="bg-white rounded-xl px-6 py-5 shadow-sm">
            <p className="font-bold text-[#1a3a5c] text-sm mb-3">Directeur de la publication</p>
            <p className="text-sm text-gray-500">Dr Marion Thévenot</p>
          </div>

          <div className="bg-white rounded-xl px-6 py-5 shadow-sm">
            <p className="font-bold text-[#1a3a5c] text-sm mb-3">Financement & données</p>
            <p className="text-sm text-gray-500">
              Le site ne bénéficie d’aucun financement extérieur, refuse la publicité,
              et ne collecte ni ne traite aucune information concernant ses visiteurs.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
