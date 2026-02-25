'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

// Types
interface JurisprudenceItem {
  id: string;
  chambre: string;
  date: string;
  titre: string;
  numeroPourvoi: string;
  extrait?: string;
  href: string;
}

// Données de démonstration
const jurisprudenceData: JurisprudenceItem[] = [
  {
    id: '1',
    chambre: 'Chambre Civil 1',
    date: '19 fév',
    titre: 'RESPONSABILITÉ CIVILE - PRÉJUDICE CORPOREL',
    numeroPourvoi: 'Pourvoi n° 24-12.345',
    extrait: 'La réparation du préjudice corporel doit être intégrale et couvrir l\'ensemble des postes de préjudice...',
    href: '/decisions/1',
  },
  {
    id: '2',
    chambre: 'Chambre Pénal 1',
    date: '18 fév',
    titre: 'PROCÉDURE PÉNALE - GARDE À VUE',
    numeroPourvoi: 'Pourvoi n° 24-80.789',
    href: '/decisions/2',
  },
  {
    id: '3',
    chambre: 'Chambre Civil 2',
    date: '17 fév',
    titre: 'CONTRATS - NULLITÉ POUR VICE DU CONSENTEMENT',
    numeroPourvoi: 'Pourvoi n° 24-15.678',
    extrait: 'Le vice du consentement doit être apprécié au moment de la formation du contrat...',
    href: '/decisions/3',
  },
  {
    id: '4',
    chambre: 'Chambre Pénal 2',
    date: '15 fév',
    titre: 'EXÉCUTION DES PEINES - LIBÉRATION CONDITIONNELLE',
    numeroPourvoi: 'Pourvoi n° 24-90.456',
    href: '/decisions/4',
  },
  {
    id: '5',
    chambre: 'Chambre Procédure Spécial',
    date: '14 fév',
    titre: 'POURVOI - RECEVABILITÉ - INTÉRÊT À AGIR',
    numeroPourvoi: 'Pourvoi n° 25-40.001',
    extrait: 'Le pourvoi en cassation n\'est recevable que si le demandeur justifie d\'un intérêt direct...',
    href: '/decisions/5',
  },
  {
    id: '6',
    chambre: 'Chambre Civil 1',
    date: '12 fév',
    titre: 'SUCCESSIONS - RAPPORT DES DONATIONS',
    numeroPourvoi: 'Pourvoi n° 24-55.789',
    href: '/decisions/6',
  },
  {
    id: '7',
    chambre: 'Chambre Civil 2',
    date: '10 fév',
    titre: 'BAIL COMMERCIAL - RÉSILIATION',
    numeroPourvoi: 'Pourvoi n° 24-33.222',
    extrait: 'La résiliation du bail commercial pour manquement grave aux obligations contractuelles...',
    href: '/decisions/7',
  },
];

// Variantes d'animation - cascade
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

interface JurisprudenceCarouselProps {
  items?: JurisprudenceItem[];
}

export default function JurisprudenceCarousel({
  items = jurisprudenceData,
}: JurisprudenceCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] relative overflow-hidden">
      {/* Décoration subtile */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C0962E]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1D2B44]/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* En-tête avec titre et navigation */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl text-[#1D2B44] mb-4"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              <span className="font-bold text-[#C0962E]">Les dernières</span>{' '}
              <span className="font-normal">décisions aux Bulletins et au Rapport</span>
            </h2>
            {/* Trait doré sous le titre */}
            <div className="h-1.5 w-28 bg-gradient-to-r from-[#C0962E] to-[#D4A842] rounded-full" />
          </div>

          {/* Boutons de navigation circulaires avec accents dorés */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border-2 border-[#C0962E]/50 flex items-center justify-center text-[#C0962E]/70 hover:border-[#D4A842] hover:text-[#D4A842] hover:bg-[#C0962E]/10 transition-all duration-300"
              aria-label="Décision précédente"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border-2 border-[#C0962E]/50 flex items-center justify-center text-[#C0962E]/70 hover:border-[#D4A842] hover:text-[#D4A842] hover:bg-[#C0962E]/10 transition-all duration-300"
              aria-label="Décision suivante"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carrousel Embla */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
            <div className="flex gap-6">
              {items.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  variants={cardVariants}
                  custom={index}
                >
                  <JurisprudenceCard item={item} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Lien vers toutes les décisions */}
        <div className="mt-12 text-center">
          <Link
            href="/decisions"
            className="inline-flex items-center gap-3 text-[#1D2B44] font-medium text-lg hover:text-[#C0962E] transition-colors duration-300 group"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Voir toutes les décisions
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Composant carte individuelle - Style harmonisé
function JurisprudenceCard({ item }: { item: JurisprudenceItem }) {
  return (
    <Link
      href={item.href}
      className="group relative flex-shrink-0 w-[300px] sm:w-[340px] bg-white overflow-visible shadow-xl hover:shadow-2xl hover:shadow-[#C0962E]/20 transition-all duration-300 hover:-translate-y-3 rounded-sm"
    >
      {/* Barre décorative en haut */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1D2B44] via-[#C0962E] to-[#7D1A1D]" />
      
      <div className="p-6 pb-10 pt-5">
        {/* En-tête : Chambre + Date */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
          <span
            className="text-xs font-semibold text-[#1D2B44] uppercase tracking-wider"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {item.chambre}
          </span>
          <span
            className="text-xs font-medium text-[#6B7280] bg-gray-100 px-2 py-1 rounded"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {item.date}
          </span>
        </div>

        {/* Titre en bordeaux majuscules avec underline au hover */}
        <h3
          className="text-sm font-bold text-[#7D1A1D] uppercase leading-relaxed mb-4 relative inline-block"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          <span className="relative">
            {item.titre}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C0962E] group-hover:w-full transition-all duration-500 ease-out" />
          </span>
        </h3>

        {/* Numéro de pourvoi */}
        <p
          className="text-xs text-[#6B7280] mb-3"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          {item.numeroPourvoi}
        </p>

        {/* Extrait juridique (optionnel) */}
        {item.extrait && (
          <p
            className="text-xs text-[#9CA3AF] leading-relaxed line-clamp-3 italic"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {item.extrait}
          </p>
        )}
      </div>

      {/* Bouton flèche dorée qui "mord" sur le bord de la carte */}
      <div className="absolute -bottom-3 right-6 group-hover:right-4 transition-all duration-300">
        <div className="w-11 h-11 bg-gradient-to-br from-[#C0962E] to-[#D4A842] flex items-center justify-center shadow-lg group-hover:shadow-[#C0962E]/40 transition-all duration-300">
          <ArrowRight className="w-5 h-5 text-[#141E30]" />
        </div>
      </div>
    </Link>
  );
}

export { jurisprudenceData };
