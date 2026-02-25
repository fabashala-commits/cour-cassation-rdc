export default function PresentationPage() {
  return (
    <section className="cour-page">
      <header className="cour-hero small">
        <div className="cour-hero-inner">
          <h1 className="cour-hero-title">Présentation</h1>
          <p className="cour-hero-sub">Mission, compétences et rôle institutionnel de la Cour.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="prose text-gray-700">
          <h2>Mission</h2>
          <p>La Cour de Cassation ... (à compléter)</p>

          <h2>Compétences</h2>
          <p>Elle juge ...</p>
        </article>
      </div>
    </section>
  )
}
