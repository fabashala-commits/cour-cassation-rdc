export default function OrganisationPage() {
  const chambers = [
    { id: 1, icon: '⚖️', title: 'Chambre Civil 1', desc: "Droit civil, familial, des personnes et des biens", color: 'bg-[#0f4c7b]' },
    { id: 2, icon: '📜', title: 'Chambre Civil 2', desc: "Contentieux civil, responsabilité et obligations", color: 'bg-[#1e6091]' },
    { id: 3, icon: '🔨', title: 'Chambre Pénal 1', desc: "Infractions, procédure pénale et libertés", color: 'bg-[#a92b3a]' },
    { id: 4, icon: '⚔️', title: 'Chambre Pénal 2', desc: "Délits, crimes et exécution des peines", color: 'bg-[#c0392b]' },
    { id: 5, icon: '📋', title: 'Chambre Procédure Spécial', desc: "Procédures exceptionnelles et spécialisées", color: 'bg-[#6b4dbb]' }
  ];

  return (
    <section className="cour-page">
      <header className="cour-hero">
        <div className="cour-hero-inner">
          <h1 className="cour-hero-title">Organisation de la Cour</h1>
          <p className="cour-hero-sub">La Cour de Cassation est structurée en chambres spécialisées, garantissant l'excellence judiciaire dans chaque domaine du droit.</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6">
          {chambers.map((c) => (
            <article key={c.id} className="org-card">
              <div className={`org-card-icon ${c.color}`}>{c.icon}</div>
              <h3 className="org-card-title">{c.title}</h3>
              <p className="org-card-desc">{c.desc}</p>
              <a className="org-card-link" href="#">En savoir plus →</a>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="btn-primary">Découvrir l'organisation complète →</a>
        </div>
      </div>
    </section>
  )
}
