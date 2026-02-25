'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

// Types pour les événements
export interface AgendaEvent {
  id: string;
  jour: string;
  mois: string;
  heure: string;
  categorie: string;
  titre: string;
  lieu?: string;
  href?: string;
}

interface AgendaCourProps {
  events?: AgendaEvent[];
  title?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
}

// Données de démonstration
export const demoEvents: AgendaEvent[] = [
  {
    id: '1',
    jour: '25',
    mois: 'FÉV',
    heure: '09:00',
    categorie: 'Audience solennelle',
    titre: 'Rentrée judiciaire de la Cour de Cassation',
    lieu: 'Grande salle d\'audience',
    href: '/agenda/1',
  },
  {
    id: '2',
    jour: '26',
    mois: 'FÉV',
    heure: '10:30',
    categorie: 'Chambre Civil 1',
    titre: 'Audience publique - Affaires civiles',
    lieu: 'Salle 1',
    href: '/agenda/2',
  },
  {
    id: '3',
    jour: '27',
    mois: 'FÉV',
    heure: '14:00',
    categorie: 'Chambre Pénal 1',
    titre: 'Délibéré - Pourvois en cassation',
    lieu: 'Salle 2',
    href: '/agenda/3',
  },
  {
    id: '4',
    jour: '28',
    mois: 'FÉV',
    heure: '09:30',
    categorie: 'Conférence',
    titre: 'Colloque sur la réforme du droit pénal',
    lieu: 'Amphithéâtre',
    href: '/agenda/4',
  },
  {
    id: '5',
    jour: '03',
    mois: 'MARS',
    heure: '11:00',
    categorie: 'Chambre Civil 2',
    titre: 'Audience de renvoi - Affaires contractuelles',
    lieu: 'Salle 3',
    href: '/agenda/5',
  },
  {
    id: '6',
    jour: '05',
    mois: 'MARS',
    heure: '15:00',
    categorie: 'Chambre Procédure Spécial',
    titre: 'Examen des pourvois exceptionnels',
    lieu: 'Grande salle',
    href: '/agenda/6',
  },
];

// Variantes d'animation pour l'effet cascade
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export default function AgendaCour({
  events = demoEvents,
  title = 'Agenda de la Cour',
  showViewAll = true,
  viewAllHref = '/agenda',
}: AgendaCourProps) {
  return (
    <section className="py-12 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl md:text-3xl font-bold text-[#1D2B44]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h2>

          {showViewAll && (
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-2 text-[#000091] font-semibold hover:underline text-sm"
            >
              Voir tout l'agenda
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          )}
        </div>

        {/* Liste des événements - Scroll horizontal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
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
function AgendaCard({ event }: { event: AgendaEvent }) {
  const content = (
    <motion.div
      variants={itemVariants}
      className="group flex-shrink-0 w-72 bg-white border border-gray-200 hover:bg-[#f6f6f6] hover:border-[#000091] transition-all duration-200"
    >
      {/* Bloc Date en haut */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200">
        <div className="flex flex-col items-center justify-center w-14 h-14 bg-[#000091]">
          <span className="text-xl font-bold text-white leading-none">
            {event.jour}
          </span>
          <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
            {event.mois}
          </span>
        </div>
        <div>
          <span className="text-xs font-semibold text-[#000091] uppercase tracking-wide bg-blue-50 px-2 py-0.5">
            {event.categorie}
          </span>
          <p className="text-sm font-medium text-[#666666] mt-1">
            {event.heure}
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-black group-hover:underline group-hover:decoration-[#000091] group-hover:decoration-2 group-hover:underline-offset-4 transition-all line-clamp-2">
          {event.titre}
        </h3>

        {event.lieu && (
          <div className="flex items-center gap-1.5 mt-2">
            <MapPin className="w-3.5 h-3.5 text-[#666666]" />
            <span className="text-xs text-[#666666]">{event.lieu}</span>
          </div>
        )}
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
export function AgendaSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex-shrink-0 w-72 border border-gray-200 animate-pulse">
          <div className="flex items-center gap-4 p-4 border-b border-gray-200">
            <div className="w-14 h-14 bg-gray-200" />
            <div>
              <div className="w-20 h-4 bg-gray-200 rounded mb-2" />
              <div className="w-12 h-3 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="p-4">
            <div className="w-full h-4 bg-gray-200 rounded mb-2" />
            <div className="w-3/4 h-4 bg-gray-200 rounded mb-3" />
            <div className="w-24 h-3 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
