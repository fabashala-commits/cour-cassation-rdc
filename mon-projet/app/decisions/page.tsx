'use client'

import { useEffect, useState } from 'react'

interface Decision {
  id: string
  title: string
  summary: string | null
  date: string
  reference: string
  year: number
  chamber: string
  keywords?: Array<{ keyword: { name: string } }>
}

export default function DecisionsPage() {
  const [decisions, setDecisions] = useState<Decision[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    year: '',
    chamber: '',
    search: '',
  })
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchDecisions()
  }, [filters, page])

  const fetchDecisions = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', page.toString())
      params.set('limit', '10')
      if (filters.year) params.set('year', filters.year)
      if (filters.chamber) params.set('chamber', filters.chamber)
      if (filters.search) params.set('search', filters.search)

      const res = await fetch(`/api/decisions?${params}`)
      if (!res.ok) throw new Error('Erreur de chargement')
      const data = await res.json()
      setDecisions(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Tricolore stripe */}
      <div className="tricolore-stripe"></div>

      {/* Navigation */}
      <nav className="bg-[#002D58] text-white py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>
            Cour de Cassation
          </h1>
          <ul className="flex gap-8">
            <li><a href="/" className="hover:text-[#F1C40F] transition">Accueil</a></li>
            <li><a href="/decisions" className="hover:text-[#F1C40F] transition font-bold">Jurisprudence</a></li>
            <li><a href="/#about" className="hover:text-[#F1C40F] transition">À propos</a></li>
            <li><a href="/#contact" className="hover:text-[#F1C40F] transition">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-r from-[#002D58] to-[#003D7A] text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
            Jurisprudence
          </h2>
          <p className="text-gray-200">Consultez et recherchez nos décisions</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-6">
        {/* Filters */}
        <section className="card mb-8">
          <h3 className="text-lg font-bold text-[#002D58] mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
            Filtres de recherche
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#002D58] mb-2">Recherche</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Titre, résumé..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#F1C40F]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#002D58] mb-2">Année</label>
              <input
                type="number"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                placeholder="Ex: 2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#F1C40F]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#002D58] mb-2">Chambre</label>
              <select
                name="chamber"
                value={filters.chamber}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#F1C40F]"
              >
                <option value="">Toutes</option>
                <option value="CIVIL">Civile</option>
                <option value="CRIMINAL">Pénale</option>
                <option value="ADMINISTRATIVE">Administrative</option>
                <option value="COMMERCIAL">Commerciale</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({ year: '', chamber: '', search: '' })
                  setPage(1)
                }}
                className="btn-primary w-full"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </section>

        {/* Results */}
        {loading ? (
          <p className="text-center text-[#4A4A4A]">Chargement...</p>
        ) : error ? (
          <p className="text-center text-[#C01C2E]">Erreur: {error}</p>
        ) : decisions.length === 0 ? (
          <p className="text-center text-[#4A4A4A]">Aucune décision trouvée</p>
        ) : (
          <>
            <div className="space-y-6">
              {decisions.map(decision => (
                <div key={decision.id} className="card card-border-top pb-6 border-b">
                  <a href={`/decisions/${decision.id}`} className="text-xl font-bold text-[#002D58] hover:text-[#C01C2E]" style={{fontFamily: "'Playfair Display', serif"}}>
                    {decision.title}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Réf: {decision.reference} | {new Date(decision.date).toLocaleDateString('fr-FR')} | Chambre: {decision.chamber}
                  </p>
                  {decision.summary && (
                    <p className="text-[#4A4A4A] mt-3 line-clamp-2">{decision.summary}</p>
                  )}
                  {decision.keywords && decision.keywords.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {decision.keywords.map(kw => (
                        <span
                          key={kw.keyword.name}
                          className="px-3 py-1 bg-[#F1C40F] text-[#002D58] rounded-full text-sm font-semibold"
                        >
                          {kw.keyword.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border-2 border-[#002D58] text-[#002D58] rounded-lg disabled:opacity-50 hover:bg-[#002D58] hover:text-white transition"
              >
                Précédent
              </button>
              <span className="px-4 py-2 font-semibold text-[#002D58]">Page {page}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 border-2 border-[#002D58] text-[#002D58] rounded-lg hover:bg-[#002D58] hover:text-white transition"
              >
                Suivant
              </button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#002D58] text-white py-8 px-6 mt-16">
        <div className="tricolore-stripe mb-6"></div>
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-lg font-bold mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
            Cour de Cassation
          </h3>
          <p className="text-gray-300 mb-4">&copy; 2024 Cour de Cassation. Tous droits réservés.</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#F1C40F] transition">Politique de confidentialité</a>
            <a href="#" className="hover:text-[#F1C40F] transition">Conditions d'utilisation</a>
            <a href="#" className="hover:text-[#F1C40F] transition">Accessibilité</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
