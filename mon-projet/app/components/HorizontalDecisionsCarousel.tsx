'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { FileText, ChevronLeft, ChevronRight } from 'lucide-react';

// Types pour les décisions
export interface Decision {
  id: string;
  numeroPourvoi: string;
  chambre: string;
  chambreColor: 'civil1' | 'civil2' | 'penal1' | 'penal2' | 'procedure';
  datePublication: string;
  titre: string;
  sommaire: string;
  mentions: ('B' | 'R')[]; // B = Bulletin, R = Rapport
  href?: string;
}

interface HorizontalDecisionsCarouselProps {
  decisions?: Decision[];
  title?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
}

// Couleurs des badges par chambre
const chambreColors: Record<string, { bg: string; dot: string; text: string }> = {
  civil1: { bg: 'bg-blue-100', dot: 'bg-blue-600', text: 'text-blue-800' },
  civil2: { bg: 'bg-sky-100', dot: 'bg-sky-600', text: 'text-sky-800' },
  penal1: { bg: 'bg-red-100', dot: 'bg-red-600', text: 'text-red-800' },
  penal2: { bg: 'bg-rose-100', dot: 'bg-rose-600', text: 'text-rose-800' },
  procedure: { bg: 'bg-purple-100', dot: 'bg-purple-600', text: 'text-purple-800' },
};

// Données factices
export const carouselDecisionsData: Decision[] = [
  {
    id: '1',
    numeroPourvoi: '24-12.345',
    chambre: 'Chambre Civil 1',
    chambreColor: 'civil1',
    datePublication: '20 février 2026',
    titre: 'Responsabilité civile - Faute de la victime - Exonération partielle du responsable',
    sommaire: 'La faute de la victime n\'exonère partiellement le responsable que si elle a contribué à la réalisation du dommage. Le comportement imprudent de la victime peut justifier une réduction de l\'indemnisation accordée.',
    mentions: ['B', 'R'],
    href: '/decisions/1',
  },
  {
    id: '2',
    numeroPourvoi: '24-80.123',
    chambre: 'Chambre Pénal 1',
    chambreColor: 'penal1',
    datePublication: '18 février 2026',
    titre: 'Procédure pénale - Garde à vue - Nullité - Défaut d\'accès au dossier',
    sommaire: 'Le défaut d\'accès au dossier pendant la garde à vue peut entraîner la nullité de la procédure. Cette nullité est subordonnée à la démonstration d\'un grief par le requérant.',
    mentions: ['B'],
    href: '/decisions/2',
  },
  {
    id: '3',
    numeroPourvoi: '24-15.678',
    chambre: 'Chambre Civil 2',
    chambreColor: 'civil2',
    datePublication: '15 février 2026',
    titre: 'Contrats - Obligations contractuelles - Résolution pour inexécution grave',
    sommaire: 'La résolution du contrat peut être prononcée en cas de manquement grave aux obligations contractuelles. L\'appréciation de la gravité relève du pouvoir souverain des juges du fond.',
    mentions: ['R'],
    href: '/decisions/3',
  },
  {
    id: '4',
    numeroPourvoi: '24-90.456',
    chambre: 'Chambre Pénal 2',
    chambreColor: 'penal2',
    datePublication: '12 février 2026',
    titre: 'Exécution des peines - Libération conditionnelle - Conditions d\'octroi',
    sommaire: 'L\'octroi de la libération conditionnelle est subordonné à l\'examen des efforts de réinsertion du condamné et des garanties de représentation qu\'il présente.',
    mentions: ['B'],
    href: '/decisions/4',
  },
  {
    id: '5',
    numeroPourvoi: '25-40.001',
    chambre: 'Chambre Procédure Spécial',
    chambreColor: 'procedure',
    datePublication: '10 février 2026',
    titre: 'Pourvoi en cassation - Recevabilité - Intérêt à agir',
    sommaire: 'Le pourvoi en cassation n\'est recevable que si le demandeur justifie d\'un intérêt direct et personnel à la cassation de la décision attaquée.',
    mentions: ['B', 'R'],
    href: '/decisions/5',
  },
  {
    id: '6',
    numeroPourvoi: '24-55.789',
    chambre: 'Chambre Civil 1',
    chambreColor: 'civil1',
    datePublication: '08 février 2026',
    titre: 'Successions - Partage - Rapport des donations',
    sommaire: 'Le rapport des donations s\'effectue en valeur au jour du partage, sauf clause contraire de l\'acte de donation prévoyant une évaluation différente.',
    mentions: ['B'],
    href: '/decisions/6',
  },
];

export default function HorizontalDecisionsCarousel({
  decisions = carouselDecisionsData,
  title = 'Les dernières décisions aux Bulletins et au Rapport',
  showViewAll = true,
  viewAllHref = '/decisions',
}: HorizontalDecisionsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-12 bg-gradient-to-b from-[#EEF2FF] to-[#E0E7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#4338CA]"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              {title}
            </h2>
            <div className="h-1 w-20 bg-[#6366F1] mt-3" />
          </div>

          {showViewAll && (
            <Link
              href={viewAllHref}
              className="hidden sm:inline-flex items-center gap-2 text-[#4338CA] font-semibold text-sm link-underline"
            >
              Toutes les décisions
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Bouton Précédent */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 flex items-center justify-center bg-white border border-indigo-200 shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-200 rounded-full disabled:opacity-30 disabled:cursor-not-allowed`}
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6 text-[#4338CA]" />
          </button>

          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {decisions.map((decision) => (
                <DecisionCard key={decision.id} decision={decision} />
              ))}
            </div>
          </div>

          {/* Bouton Suivant */}
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 flex items-center justify-center bg-white border border-indigo-200 shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-200 rounded-full disabled:opacity-30 disabled:cursor-not-allowed`}
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6 text-[#4338CA]" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                index === selectedIndex
                  ? 'bg-[#4338CA] w-6'
                  : 'bg-indigo-200 hover:bg-indigo-300'
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Bouton mobile "Toutes les décisions" */}
        {showViewAll && (
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#000091] text-[#000091] font-semibold hover:bg-[#000091] hover:text-white transition-colors duration-200 rounded-none"
            >
              Toutes les décisions
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// Composant carte de décision
function DecisionCard({ decision }: { decision: Decision }) {
  const colors = chambreColors[decision.chambreColor] || chambreColors.civil1;

  const content = (
    <motion.article
      whileHover={{ y: -5 }}
      className="card-cdc group flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[350px] bg-white flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {/* Numéro de pourvoi */}
          <span
            className="text-sm font-bold text-[#000091]"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {decision.numeroPourvoi}
          </span>

          {/* Date */}
          <span className="text-xs text-[#666666]">
            {decision.datePublication}
          </span>
        </div>

        {/* Badge Chambre avec pastille */}
        <div className="flex items-center gap-2 mt-2">
          <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
          <span
            className={`text-xs font-semibold ${colors.text}`}
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {decision.chambre}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Titre */}
        <h3
          className="text-sm font-bold text-[#161616] group-hover:underline group-hover:decoration-[#000091] group-hover:decoration-2 group-hover:underline-offset-2 transition-all mb-3"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {decision.titre}
        </h3>

        {/* Sommaire - 3 lignes max */}
        <p
          className="text-sm text-[#666666] line-clamp-3 flex-1"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {decision.sommaire}
        </p>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        {/* Mentions */}
        <div className="flex items-center gap-2">
          {decision.mentions.map((mention) => (
            <span
              key={mention}
              className="text-xs font-medium text-[#666666]"
              title={mention === 'B' ? 'Bulletin' : 'Rapport'}
            >
              {mention === 'B' ? 'Bulletin' : 'Rapport'}
            </span>
          ))}
        </div>

        {/* Bouton Consulter */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#000091] text-white text-xs font-semibold hover:bg-[#1212FF] transition-colors duration-200 rounded-none">
          <FileText className="w-3.5 h-3.5" />
          Consulter
        </span>
      </div>
    </motion.article>
  );

  if (decision.href) {
    return (
      <Link href={decision.href} className="block flex-shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}

// Skeleton
export function HorizontalDecisionsCarouselSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex-shrink-0 w-[350px] bg-white border border-gray-200 animate-pulse rounded-none">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between mb-2">
              <div className="w-20 h-4 bg-gray-200" />
              <div className="w-24 h-3 bg-gray-100" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
              <div className="w-28 h-3 bg-gray-200" />
            </div>
          </div>
          <div className="p-4">
            <div className="w-full h-4 bg-gray-200 mb-2" />
            <div className="w-3/4 h-4 bg-gray-200 mb-4" />
            <div className="w-full h-3 bg-gray-100 mb-1" />
            <div className="w-full h-3 bg-gray-100 mb-1" />
            <div className="w-2/3 h-3 bg-gray-100" />
          </div>
          <div className="p-4 border-t border-gray-100 flex justify-between">
            <div className="w-16 h-4 bg-gray-200" />
            <div className="w-24 h-7 bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
