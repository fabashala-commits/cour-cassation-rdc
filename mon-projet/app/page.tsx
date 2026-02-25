import TopBar from './components/TopBar'
import Navigation from './components/Navigation'
import HeroSlider, { demoSlides } from './components/HeroSlider'
import { NewsGrid, demoNews } from './components/NewsCard'
import InstitutionalAgenda, { agendaData } from './components/InstitutionalAgenda'
import CourtAgenda from './components/CourtAgenda'
import JurisprudenceCarousel from './components/JurisprudenceCarousel'
import CourExpliquee from './components/CourExpliquee'
import UserPortail from './components/UserPortail'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Tricolore stripe */}
      <div className="tricolore-stripe"></div>

      {/* Top Bar with Contact Info */}
      <TopBar />

      {/* Main Navigation */}
      <Navigation />

      {/* Hero Slider */}
      <HeroSlider slides={demoSlides} />

      {/* Actualités Section - Juste après le carousel */}
      <NewsGrid news={demoNews} title="À la Une" />

      {/* Main Content */}
      <main id="main" className="max-w-6xl mx-auto py-12 px-6">

        {/* About Section - Bleu Nuit élégant */}
        <section id="about" className="mb-16 py-12 px-8 bg-[#F8F9FA] rounded-xl shadow-lg border border-[#1D2B44]/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#1D2B44]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-4xl font-bold text-[#1D2B44] mb-6 relative" style={{fontFamily: "'Playfair Display', serif"}}>
            À propos de la Cour
          </h3>
          <div className="h-1 w-24 bg-gradient-to-r from-[#1D2B44] to-[#C0962E] mb-6"></div>
          <p className="text-[#2A3D5A] mb-4 leading-relaxed text-lg relative">
            La Cour de Cassation est la juridiction suprême de l'ordre judiciaire de la République Démocratique du Congo. 
            Elle est chargée de contrôler la conformité des décisions rendues par les autres juridictions 
            avec la loi et d'assurer une jurisprudence constante et équitable.
          </p>
          <p className="text-[#2A3D5A] leading-relaxed text-lg relative">
            Cette plateforme permet aux citoyens, avocats et magistrats d'accéder facilement à notre jurisprudence 
            et à nos ressources institutionnelles.
          </p>
        </section>
      </main>

      {/* Section Pédagogique - Découvrir la Cour */}
      <CourExpliquee />

      {/* Portail d'Orientation - Vos démarches / Vous êtes */}
      <UserPortail />

      {/* Agenda de la Cour */}
      <InstitutionalAgenda events={agendaData} />

      {/* Sélecteur de Date et Événements */}
      <CourtAgenda />

      {/* Les dernières décisions aux Bulletins et au Rapport */}
      <JurisprudenceCarousel />

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#1D2B44]">
        <div className="h-1 w-full bg-gradient-to-r from-[#C0962E] via-[#7D1A1D] to-[#C0962E] mb-10"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-[#C0962E]" style={{fontFamily: "'Playfair Display', serif"}}>
                Cour de Cassation
              </h4>
              <p className="text-[#F8F9FA]/70 text-sm leading-relaxed">
                La juridiction suprême de l'ordre judiciaire de la République Démocratique du Congo
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#F8F9FA]">Navigation</h4>
              <ul className="space-y-3 text-sm text-[#F8F9FA]/70">
                <li><a href="/" className="hover:text-[#C0962E] transition-colors duration-300">Accueil</a></li>
                <li><a href="/decisions" className="hover:text-[#C0962E] transition-colors duration-300">Jurisprudence</a></li>
                <li><a href="#about" className="hover:text-[#C0962E] transition-colors duration-300">À propos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#F8F9FA]">Services</h4>
              <ul className="space-y-3 text-sm text-[#F8F9FA]/70">
                <li><a href="#" className="hover:text-[#C0962E] transition-colors duration-300">Rendez-vous</a></li>
                <li><a href="#" className="hover:text-[#C0962E] transition-colors duration-300">Suivi de dossier</a></li>
                <li><a href="#" className="hover:text-[#C0962E] transition-colors duration-300">Information</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#F8F9FA]">Information</h4>
              <ul className="space-y-3 text-sm text-[#F8F9FA]/70">
                <li><a href="#" className="hover:text-[#C0962E] transition-colors duration-300">Contact</a></li>
                <li><a href="#" className="hover:text-[#C0962E] transition-colors duration-300">Sitemap</a></li>
                <li><a href="#" className="hover:text-[#C0962E] transition-colors duration-300">Accessibilité</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#F8F9FA]/10 mt-10">
            <div className="flex flex-col md:flex-row justify-between items-center py-6 text-sm text-[#F8F9FA]/60">
              <p>© 2024 Cour de Cassation RDC. Tous droits réservés.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-[#C0962E] transition-colors duration-300">Politique de confidentialité</a>
                <span className="text-[#F8F9FA]/30">|</span>
                <a href="#" className="hover:text-[#C0962E] transition-colors duration-300">Conditions d'utilisation</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}
