'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

// Types pour les événements
export interface AgendaItem {
  id: string;
  day: string;
  month: string;
  category: string;
  title: string;
  time: string;
  location: string;
  href?: string;
}

interface InstitutionalAgendaProps {
  events?: AgendaItem[];
  title?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
}

// Données factices
export const agendaData: AgendaItem[] = [
  {
    id: '1',
    day: '25',
    month: 'FÉVR.',
    category: 'AUDIENCE SOLENNELLE',
    title: 'Rentrée judiciaire de la Cour de Cassation - Année 2026',
    time: '09h00',
    location: 'Grande salle d\'audience',
    href: '/agenda/1',
  },
  {
    id: '2',
    day: '26',
    month: 'FÉVR.',
    category: 'AUDIENCE',
    title: 'Audience publique de la Chambre Civil 1',
    time: '10h30',
    location: 'Salle 1',
    href: '/agenda/2',
  },
  {
    id: '3',
    day: '27',
    month: 'FÉVR.',
    category: 'DÉLIBÉRÉ',
    title: 'Délibéré - Chambre Pénal 1 - Pourvois en cassation',
    time: '14h00',
    location: 'Salle des délibérés',
    href: '/agenda/3',
  },
  {
    id: '4',
    day: '28',
    month: 'FÉVR.',
    category: 'COLLOQUE',
    title: 'Colloque international sur la réforme du droit pénal congolais',
    time: '09h30',
    location: 'Amphithéâtre',
    href: '/agenda/4',
  },
  {
    id: '5',
    day: '03',
    month: 'MARS',
    category: 'AUDIENCE',
    title: 'Audience de renvoi - Chambre Civil 2 - Affaires contractuelles',
    time: '11h00',
    location: 'Salle 3',
    href: '/agenda/5',
  },
  {
    id: '6',
    day: '05',
    month: 'MARS',
    category: 'PROCÉDURE SPÉCIALE',
    title: 'Examen des pourvois exceptionnels - Chambre Procédure Spécial',
    time: '15h00',
    location: 'Grande salle',
    href: '/agenda/6',
  },
];

// Variantes d'animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export default function InstitutionalAgenda({
  events = agendaData,
  title = 'Agenda de la Cour',
  showViewAll = true,
  viewAllHref = '/agenda',
}: InstitutionalAgendaProps) {
  return (
    <section className="py-12 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#1D2B44]"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              {title}
            </h2>
            <div className="h-1 w-16 bg-[#C0962E] mt-2" />
          </div>

          {showViewAll && (
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-2 text-[#166534] font-semibold text-sm link-underline"
              style={{ '--underline-color': '#22C55E' } as React.CSSProperties}
            >
              Tout l'agenda
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          )}
        </div>

        {/* Liste des événements - Layout horizontal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {events.map((event) => (
            <AgendaCard key={event.id} event={event} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Composant carte d'événement (horizontal)
function AgendaCard({ event }: { event: AgendaItem }) {
  const content = (
    <motion.div
      variants={itemVariants}
      className="group flex-shrink-0 w-80 border border-gray-200 hover:bg-[#F6F6F6] hover:border-l-4 hover:border-l-[#000091] transition-all duration-200"
    >
      {/* En-tête avec Date */}
      <div className="flex items-stretch border-b border-gray-200">
        {/* Bloc Date */}
        <div className="flex-shrink-0 w-20 py-4 flex flex-col items-center justify-center bg-[#000091]">
          <span
            className="text-2xl font-bold text-white leading-none"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {event.day}
          </span>
          <span
            className="text-[10px] font-semibold text-white/80 uppercase tracking-wide mt-1"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {event.month}
          </span>
        </div>

        {/* Catégorie */}
        <div className="flex-1 py-4 px-4 flex items-center">
          <span
            className="text-xs font-bold text-[#000091] uppercase tracking-wider"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {event.category}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        {/* Titre */}
        <h3
          className="text-sm font-bold text-[#161616] group-hover:underline group-hover:decoration-[#000091] group-hover:decoration-2 group-hover:underline-offset-2 transition-all line-clamp-2 mb-3"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {event.title}
        </h3>

        {/* Détails */}
        <div className="flex flex-col gap-1.5 text-sm text-[#666666]">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {event.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {event.location}
          </span>
        </div>
      </div>

      {/* Flèche en bas */}
      <div className="px-4 pb-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ArrowRight className="w-5 h-5 text-[#000091]" />
      </div>
    </motion.div>
  );

  if (event.href) {
    return (
      <Link href={event.href} className="block flex-shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}

// Skeleton pour le chargement
export function InstitutionalAgendaSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex-shrink-0 w-80 border border-gray-200 animate-pulse">
          <div className="flex items-stretch border-b border-gray-200">
            <div className="w-20 py-4 bg-gray-300" />
            <div className="flex-1 py-4 px-4">
              <div className="w-24 h-3 bg-gray-200" />
            </div>
          </div>
          <div className="p-4">
            <div className="w-full h-4 bg-gray-200 mb-2" />
            <div className="w-3/4 h-4 bg-gray-200 mb-4" />
            <div className="flex flex-col gap-2">
              <div className="w-16 h-3 bg-gray-100" />
              <div className="w-24 h-3 bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
