'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Scale,
  History,
  Building2,
  Users,
  Globe,
  Newspaper,
  FileText,
  BookOpen,
  ScrollText,
  Wrench,
  Calendar,
  FolderSearch,
  Info,
  AlertTriangle,
  Phone,
  ChevronDown,
  ChevronRight,
  Search,
  Award,
  Gavel,
  Shield,
  Settings,
  TrendingUp,
  FileArchive,
  UserCheck,
  Landmark,
  BookMarked,
  Menu,
  X,
} from 'lucide-react';

/* ============================================
   CONFIGURATION DU MEGA-MENU "LA COUR"
   5 colonnes avec titres et liens
============================================ */
const megaMenuCour = {
  columns: [
    {
      id: 'presentation',
      title: 'Présentation',
      icon: Landmark,
      links: [
        { label: 'Histoire de la Cour', href: '/cour/histoire' },
        { label: 'Missions et Attributions', href: '/cour/missions' },
        { label: 'Organisation Générale', href: '/cour/organisation' },
        { label: 'Siège et Localisation', href: '/cour/siege' },
      ],
    },
    {
      id: 'autorites',
      title: 'Autorités',
      icon: UserCheck,
      links: [
        { label: 'Premier Président', href: '/cour/premier-president' },
        { label: 'Les Présidents', href: '/cour/presidents-chambre' },
        { label: 'Les Conseillers', href: '/cour/conseillers' },
        { label: 'Le Greffe', href: '/cour/greffe' },
      ],
    },
    {
      id: 'chambres',
      title: 'Chambres & Sections',
      icon: Building2,
      links: [
        { label: 'Chambre Civile 1', href: '/cour/chambre-civile-1' },
        { label: 'Chambre Civile 2', href: '/cour/chambre-civile-2' },
        { label: 'Chambre Pénale 1', href: '/cour/chambre-penale-1' },
        { label: 'Chambre Pénale 2', href: '/cour/chambre-penale-2' },
        { label: 'Chambre Procédure Spéciale', href: '/cour/chambre-procedure-speciale' },
      ],
    },

    {
      id: 'modernisation',
      title: 'Modernisation',
      icon: TrendingUp,
      links: [
        { label: 'Transformation Digitale', href: '/cour/digital' },
        { label: 'Projets en Cours', href: '/cour/projets' },
        { label: 'Partenariats', href: '/cour/partenariats' },
        { label: 'Coopération Internationale', href: '/cour/cooperation' },
      ],
    },
    {
      id: 'ressources',
      title: 'Ressources & Documentation',
      icon: FileArchive,
      links: [
        { label: 'Rapports Annuels', href: '/cour/rapports' },
        { label: 'Publications', href: '/cour/publications' },
        { label: 'Statistiques', href: '/cour/statistiques' },
        { label: 'Médiathèque', href: '/cour/mediatheque' },
      ],
    },
  ],
};

/* ============================================
   CONFIGURATION DU MEGA-MENU "SERVICES"
   4 colonnes avec les services disponibles
============================================ */
const megaMenuServices = {
  columns: [
    {
      id: 'rendez-vous',
      title: 'Rendez-vous',
      href: '/services/rendez-vous',
    },
    {
      id: 'suivi-dossier',
      title: 'Suivi de Dossier',
      href: '/services/suivi-dossier',
    },
    {
      id: 'information',
      title: 'Information',
      href: '/services/information',
    },
    {
      id: 'denonciation',
      title: 'Dénonciation',
      href: '/services/denonciation',
    },
  ],
};

/* ============================================
   CONFIGURATION DES MENUS PRINCIPAUX
============================================ */
const menuConfig = {
  left: [
    {
      id: 'accueil',
      label: 'Accueil',
      href: '/',
      icon: Home,
      color: 'blue',
    },
    {
      id: 'cour',
      label: 'La Cour',
      icon: Scale,
      color: 'red',
      isMegaMenu: true, // Flag pour déclencher le mega-menu
    },
    {
      id: 'actualites',
      label: 'Actualités',
      href: '/actualites',
      icon: Newspaper,
      color: 'gold',
      badge: '12',
    },
  ],
  right: [
    {
      id: 'jurisprudence',
      label: 'Jurisprudence',
      href: '/recherche',
      icon: BookOpen,
      color: 'blue',
    },
    {
      id: 'textes',
      label: 'Textes Légaux',
      href: '/textes-legaux',
      icon: ScrollText,
      color: 'gold',
    },
    {
      id: 'services',
      label: 'Services',
      icon: Wrench,
      color: 'blue',
      isMegaMenu: true,
    },
  ],
};

// Couleurs pour les badges
const colorClasses: Record<string, string> = {
  blue: 'bg-[#1D2B44] text-white',
  red: 'bg-[#7D1A1D] text-white',
  gold: 'bg-[#C0962E] text-[#141E30]',
  gray: 'bg-[#6B7280] text-white',
  green: 'bg-[#2A3D5A] text-white',
};

/* ============================================
   COMPOSANT PRINCIPAL NAVIGATION
============================================ */
export default function Navigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMegaMenu = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  return (
    <>
      <nav 
        className={`sticky top-0 z-50 bg-[#1D2B44] border-b border-[#2A3D5A] transition-all duration-300 ${
          isScrolled ? 'shadow-lg h-16' : 'shadow-sm h-20'
        }`} 
        aria-label="Navigation principale"
        role="navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full relative">
            
            {/* Menu gauche - Desktop */}
            <div className="hidden lg:flex items-center gap-1 mr-auto">
              {menuConfig.left.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isOpen={openDropdown === item.id}
                  onToggle={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                  onClose={closeMegaMenu}
                />
              ))}
            </div>

            {/* Logo central */}
            <Link href="/" className="flex-shrink-0 mx-8 lg:mx-12" aria-label="Accueil - Cour de Cassation RDC">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center bg-gradient-to-br from-[#C0962E] to-[#D4A842] rounded-full transition-all duration-300 shadow-lg ${
                  isScrolled ? 'w-12 h-12' : 'w-14 h-14'
                }`}
              >
                <Scale className={`text-[#1D2B44] transition-all duration-300 ${isScrolled ? 'w-6 h-6' : 'w-8 h-8'}`} />
              </motion.div>
            </Link>

            {/* Menu droite - Desktop */}
            <div className="hidden lg:flex items-center gap-1 ml-auto">
              {menuConfig.right.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isOpen={openDropdown === item.id}
                  onToggle={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                  onClose={closeMegaMenu}
                />
              ))}

              {/* Bouton Recherche */}
              <Link
                href="/recherche"
                className="ml-2 flex items-center gap-2 px-3 py-2 bg-[#2A3D5A] hover:bg-[#C0962E] rounded-lg transition-colors group"
                aria-label="Rechercher"
              >
                <Search className="w-4 h-4 text-[#F8F9FA] group-hover:text-[#1D2B44]" />
              </Link>

              {/* Bouton Contact */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#contact"
                  className="ml-2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C0962E] to-[#D4A842] text-[#1D2B44] rounded-lg hover:shadow-lg hover:shadow-[#C0962E]/30 transition-all font-semibold text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Contact
                </Link>
              </motion.div>
            </div>

            {/* Bouton Menu mobile */}
            <button 
              className="lg:hidden p-2 text-[#F8F9FA] hover:bg-[#2A3D5A] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu "LA COUR" - Full Width */}
        <AnimatePresence>
          {openDropdown === 'cour' && (
            <MegaMenuCour onClose={closeMegaMenu} />
          )}
        </AnimatePresence>

        {/* Mega Menu "SERVICES" - Full Width */}
        <AnimatePresence>
          {openDropdown === 'services' && (
            <MegaMenuServices onClose={closeMegaMenu} />
          )}
        </AnimatePresence>
      </nav>

      {/* Menu Mobile - Accordéon */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            accordion={mobileAccordion}
            setAccordion={setMobileAccordion}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================
   COMPOSANT MEGA-MENU "LA COUR"
   Pleine largeur avec 6 colonnes
============================================ */
interface MegaMenuCourProps {
  onClose: () => void;
}

function MegaMenuCour({ onClose }: MegaMenuCourProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full w-full bg-[#F8F9FA] shadow-xl border-t-4 border-[#7D1A1D] z-50"
      onMouseLeave={onClose}
      role="menu"
      aria-label="Menu La Cour"
    >
      {/* Ligne décorative Bordeaux sous le menu actif */}
      <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#7D1A1D] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête du mega-menu */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1D2B44]/10">
          <div className="flex items-center justify-center w-10 h-10 bg-[#1D2B44] rounded-lg">
            <Scale className="w-5 h-5 text-[#C0962E]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1D2B44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              La Cour de Cassation
            </h2>
            <p className="text-sm text-[#1D2B44]/60">République Démocratique du Congo</p>
          </div>
        </div>

        {/* Grille 5 colonnes */}
        <div className="grid grid-cols-5 gap-8">
          {megaMenuCour.columns.map((column, colIndex) => {
            const Icon = column.icon;
            return (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: colIndex * 0.05 }}
                className="space-y-3"
                role="group"
                aria-labelledby={`column-title-${column.id}`}
              >
                {/* Titre de colonne */}
                <div className="pb-2 border-b-2 border-[#C0962E]">
                  <h3 
                    id={`column-title-${column.id}`}
                    className="font-bold text-sm text-[#1D2B44] uppercase tracking-wide"
                  >
                    {column.title}
                  </h3>
                </div>

                {/* Liens de la colonne */}
                <ul className="space-y-1" role="menu">
                  {column.links.map((link, linkIndex) => (
                    <motion.li 
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (colIndex * 0.05) + (linkIndex * 0.03) }}
                      role="none"
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center gap-2 py-1.5 text-sm text-[#1D2B44] hover:text-[#C0962E] transition-colors duration-200"
                        role="menuitem"
                      >
                        <ChevronRight className="w-3 h-3 text-[#1D2B44]/30 group-hover:text-[#C0962E] group-hover:translate-x-1 transition-all duration-200" />
                        <span>{link.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Footer du mega-menu */}
        <div className="mt-8 pt-4 border-t border-[#1D2B44]/10 flex items-center justify-between">
          <Link
            href="/cour"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#7D1A1D] hover:text-[#C0962E] transition-colors"
          >
            Découvrir toute la Cour
            <ChevronRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#1D2B44]/50">
            <span>Institution Judiciaire Suprême</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================
   COMPOSANT MEGA-MENU "SERVICES"
   Pleine largeur avec 4 colonnes
============================================ */
interface MegaMenuServicesProps {
  onClose: () => void;
}

function MegaMenuServices({ onClose }: MegaMenuServicesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full w-full bg-[#F8F9FA] shadow-xl border-t-4 border-[#C0962E] z-50"
      onMouseLeave={onClose}
      role="menu"
      aria-label="Menu Services"
    >
      {/* Ligne décorative Or sous le menu actif */}
      <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C0962E] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête du mega-menu */}
        <div className="mb-6 pb-4 border-b border-[#1D2B44]/10">
          <h2 className="text-xl font-bold text-[#1D2B44]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Services en Ligne
          </h2>
          <p className="text-sm text-[#1D2B44]/60">Accédez à nos services numériques</p>
        </div>

        {/* Grille 4 colonnes */}
        <div className="grid grid-cols-4 gap-8">
          {megaMenuServices.columns.map((column, colIndex) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: colIndex * 0.05 }}
              className="space-y-3"
              role="group"
              aria-labelledby={`services-column-${column.id}`}
            >
              {/* Titre de colonne */}
              <div className="pb-2 border-b-2 border-[#C0962E]">
                <h3 
                  id={`services-column-${column.id}`}
                  className="font-bold text-sm text-[#1D2B44] uppercase tracking-wide"
                >
                  {column.title}
                </h3>
              </div>

              {/* Lien unique */}
              <Link
                href={column.href}
                onClick={onClose}
                className="group flex items-center gap-2 py-1.5 text-sm text-[#1D2B44] hover:text-[#C0962E] transition-colors duration-200"
                role="menuitem"
              >
                <ChevronRight className="w-3 h-3 text-[#1D2B44]/30 group-hover:text-[#C0962E] group-hover:translate-x-1 transition-all duration-200" />
                <span>Accéder au service</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer du mega-menu */}
        <div className="mt-8 pt-4 border-t border-[#1D2B44]/10 flex items-center justify-between">
          <Link
            href="/services"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C0962E] hover:text-[#7D1A1D] transition-colors"
          >
            Tous nos services
            <ChevronRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-4 text-xs text-[#1D2B44]/50">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              +243 81 400 0000
            </span>
            <span>Assistance 24h/24</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================
   COMPOSANT MENU MOBILE - ACCORDÉON
   Responsive pour petits écrans
============================================ */
interface MobileMenuProps {
  accordion: string | null;
  setAccordion: (id: string | null) => void;
  onClose: () => void;
}

function MobileMenu({ accordion, setAccordion, onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-[#1D2B44] z-40 overflow-y-auto"
      id="mobile-menu"
      role="navigation"
      aria-label="Menu mobile"
    >
      <div className="px-4 py-6 space-y-2">
        {/* Menu Accueil */}
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 text-[#F8F9FA] hover:bg-[#2A3D5A] rounded-lg transition-colors"
        >
          <span className="font-medium">Accueil</span>
        </Link>

        {/* Accordéon LA COUR */}
        <div className="rounded-lg overflow-hidden">
          <button
            onClick={() => setAccordion(accordion === 'cour' ? null : 'cour')}
            className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
              accordion === 'cour' ? 'bg-[#C0962E] text-[#1D2B44]' : 'text-[#F8F9FA] hover:bg-[#2A3D5A]'
            }`}
            aria-expanded={accordion === 'cour'}
          >
            <div className="flex items-center gap-3">
              <span className="font-medium">La Cour</span>
            </div>
            <motion.div animate={{ rotate: accordion === 'cour' ? 180 : 0 }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>


          <AnimatePresence>
            {accordion === 'cour' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-[#F8F9FA] overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  {megaMenuCour.columns.map((column) => {
                    const Icon = column.icon;
                    return (
                      <div key={column.id} className="space-y-2">
                        <div className="pb-1 border-b border-[#1D2B44]/20">
                          <span className="font-bold text-sm text-[#1D2B44] uppercase">{column.title}</span>
                        </div>
                        <ul className="pl-6 space-y-1">
                          {column.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                className="block py-1.5 text-sm text-[#1D2B44] hover:text-[#C0962E] transition-colors"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Autres menus */}
        <Link
          href="/actualites"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 text-[#F8F9FA] hover:bg-[#2A3D5A] rounded-lg transition-colors"
        >
          <span className="font-medium">Actualités</span>
          <span className="ml-auto px-2 py-0.5 text-xs bg-[#7D1A1D] text-white rounded-full">12</span>
        </Link>

        <Link
          href="/recherche"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 text-[#F8F9FA] hover:bg-[#2A3D5A] rounded-lg transition-colors"
        >
          <span className="font-medium">Jurisprudence</span>
        </Link>

        <Link
          href="/textes-legaux"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 text-[#F8F9FA] hover:bg-[#2A3D5A] rounded-lg transition-colors"
        >
          <span className="font-medium">Textes Légaux</span>
        </Link>

        {/* Accordéon Services */}
        <div className="rounded-lg overflow-hidden">
          <button
            onClick={() => setAccordion(accordion === 'services' ? null : 'services')}
            className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
              accordion === 'services' ? 'bg-[#C0962E] text-[#1D2B44]' : 'text-[#F8F9FA] hover:bg-[#2A3D5A]'
            }`}
            aria-expanded={accordion === 'services'}
          >
            <div className="flex items-center gap-3">
              <span className="font-medium">Services</span>
            </div>
            <motion.div animate={{ rotate: accordion === 'services' ? 180 : 0 }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>

          <AnimatePresence>
            {accordion === 'services' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-[#F8F9FA] overflow-hidden"
              >
                <div className="p-4 space-y-2">
                  {megaMenuServices.columns.map((column) => (
                    <Link
                      key={column.id}
                      href={column.href}
                      onClick={onClose}
                      className="block py-2 px-3 text-[#1D2B44] hover:text-[#C0962E] hover:bg-[#C0962E]/10 rounded-lg transition-colors font-medium"
                    >
                      {column.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bouton Contact Mobile */}
        <div className="pt-4 mt-4 border-t border-[#2A3D5A]">
          <Link
            href="#contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#C0962E] to-[#D4A842] text-[#1D2B44] rounded-lg font-semibold"
          >
            <Phone className="w-5 h-5" />
            Nous Contacter
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================
   COMPOSANT NAV ITEM
   Gère les items simples et dropdowns
============================================ */
interface NavItemProps {
  item: {
    id: string;
    label: string;
    href?: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    badge?: string;
    isMegaMenu?: boolean;
    submenu?: Array<{
      id: string;
      label: string;
      href: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: string;
    }>;
  };
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function NavItem({ item, isOpen, onToggle, onClose }: NavItemProps) {
  const Icon = item.icon;
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const isMegaMenu = item.isMegaMenu;

  // Item simple avec lien direct
  if (!hasSubmenu && !isMegaMenu && item.href) {
    return (
      <Link
        href={item.href}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#F8F9FA] hover:bg-[#C0962E] hover:text-[#1D2B44] rounded-lg transition-colors group"
      >
        <span>{item.label}</span>
        {item.badge && (
          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-red-100 text-red-600 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    );
  }

  // Item avec mega-menu (LA COUR)
  if (isMegaMenu) {
    return (
      <div className="relative">
        <button
          onClick={onToggle}
          onMouseEnter={onToggle}
          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors group relative ${
            isOpen ? 'bg-[#C0962E] text-[#1D2B44]' : 'text-[#F8F9FA] hover:bg-[#C0962E] hover:text-[#1D2B44]'
          }`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span>{item.label}</span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-[#1D2B44]' : 'text-[#F8F9FA]/60'}`} />
          </motion.span>
          
          {/* Ligne active Bordeaux sous l'onglet */}
          {isOpen && (
            <motion.div
              layoutId="activeTab"
              className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-[#7D1A1D] rounded-t-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </button>
      </div>
    );
  }

  // Item avec dropdown classique (Services)
  return (
    <div className="relative" onMouseLeave={onClose}>
      <button
        onClick={onToggle}
        onMouseEnter={onToggle}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
          isOpen ? 'bg-[#C0962E] text-[#1D2B44]' : 'text-[#F8F9FA] hover:bg-[#C0962E] hover:text-[#1D2B44]'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{item.label}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-[#1D2B44]' : 'text-[#F8F9FA]/60'}`} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && item.submenu && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-64 bg-[#F8F9FA] border border-[#1D2B44]/20 rounded-xl shadow-lg overflow-hidden z-50"
            role="menu"
          >
            {/* En-tête du dropdown */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A]">
              <div className="flex items-center gap-2 text-white">
                <span className="font-semibold">{item.label}</span>
              </div>
            </div>

            {/* Liste des sous-menus */}
            <div className="py-2">
              {item.submenu.map((subItem, index) => {
                return (
                  <motion.div
                    key={subItem.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    role="none"
                  >
                    <Link
                      href={subItem.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#C0962E]/10 transition-colors group"
                      role="menuitem"
                    >
                      <div className="flex-1">
                        <span className="block text-sm font-medium text-[#1D2B44] group-hover:text-[#7D1A1D]">
                          {subItem.label}
                        </span>
                      </div>
                      {subItem.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-700 rounded-full">
                          {subItem.badge}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer du dropdown */}
            <div className="px-4 py-2 bg-[#1D2B44]/5 border-t border-[#1D2B44]/10">
              <Link
                href={`/${item.id}`}
                onClick={onClose}
                className="text-xs text-[#7D1A1D] hover:underline font-medium"
              >
                Voir tout →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
