
interface Jour {
  jour: string
  matin: string | null
  aprem: string | null
}

const jours: Jour[] = [
  { jour: 'Lundi',    matin: '08h00 – 12h00', aprem: '14h00 – 19h00' },
  { jour: 'Mardi',    matin: '08h00 – 12h00', aprem: '14h00 – 19h00' },
  { jour: 'Mercredi', matin: '08h00 – 12h00', aprem: '14h00 – 19h00' },
  { jour: 'Jeudi',    matin: '08h00 – 12h00', aprem: '14h00 – 19h00' },
  { jour: 'Vendredi', matin: '08h00 – 12h00', aprem: '14h00 – 18h00' },
  { jour: 'Samedi',   matin: '08h30 – 12h30', aprem: null },
  { jour: 'Dimanche', matin: null,             aprem: null },
]

export default function Horaires() {
  return (
    <section id="horaires" className="bg-[#f4f7fb] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#3a8c6e] font-semibold text-xs tracking-widest uppercase mb-3">
          Organisation
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-12">
          Horaires d'ouverture
        </h2>

        <div className="flex flex-col gap-3">
          {jours.map(({ jour, matin, aprem }) => {
            const ferme = !matin && !aprem
            return (
              <div
                key={jour}
                className={`grid grid-cols-3 items-center bg-white rounded-xl px-6 py-4 shadow-sm ${ferme ? 'opacity-50' : ''}`}
              >
                <span className="font-bold text-[#1a3a5c] text-sm">{jour}</span>
                <span className="text-gray-500 text-sm"> {matin ?? '—'}</span>
                <span className="text-gray-500 text-sm"> {aprem ?? 'Fermé'}</span>
              </div>
            )
          })}
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-300 rounded-xl px-6 py-4 text-sm text-yellow-800">
          ⚠️ En cas d'urgence en dehors des horaires, composez le{' '}
          <strong>15</strong> (SAMU) ou le <strong>116 117</strong> (médecin de garde)
        </div>
      </div>
    </section>
  )
}
