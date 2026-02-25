'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, FileText, ChevronRight } from 'lucide-react';

// Types pour les données de décision
export interface DecisionResult {
  id: string;
  titre: string;
  chambre: 'Civil 1' | 'Civil 2' | 'Pénal 1' | 'Pénal 2' | 'Procédure Spécial';
  date: string;
  reference: string;
  resume: string;
  keywords?: string[];
}

// Couleurs des badges par chambre (style DSFR)
const chambreColors: Record<string, { bg: string; text: string; border: string }> = {
  'Civil 1': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
  'Civil 2': { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' },
  'Pénal 1': { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
  'Pénal 2': { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' },
  'Procédure Spécial': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
};

interface ResultCardProps {
  decision: DecisionResult;
  index?: number;
}

export default function ResultCard({ decision, index = 0 }: ResultCardProps) {
  const colors = chambreColors[decision.chambre] || chambreColors['Civil 1'];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative bg-white border border-gray-200 rounded-lg p-5 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
    >
      <Link href={`/decisions/${decision.id}`} className="block">
        {/* En-tête : Badge + Date */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
          >
            {decision.chambre}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1.5" />
            <time dateTime={decision.date}>{formatDate(decision.date)}</time>
          </div>
        </div>

        {/* Titre */}
        <h3 className="text-base font-semibold text-[#000091] mb-2 group-hover:underline line-clamp-2">
          {decision.titre}
        </h3>

        {/* Référence */}
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <FileText className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <span className="font-mono">{decision.reference}</span>
        </div>

        {/* Résumé (limité à 3 lignes) */}
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-3">
          {decision.resume}
        </p>

        {/* Mots-clés */}
        {decision.keywords && decision.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {decision.keywords.slice(0, 4).map((keyword, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Indicateur de lien */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-5 h-5 text-[#000091]" />
        </div>
      </Link>
    </motion.article>
  );
}

// Skeleton pour le chargement
export function ResultCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-5 w-20 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
      <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-1/3 bg-gray-200 rounded mb-3"></div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-100 rounded"></div>
        <div className="h-3 w-full bg-gray-100 rounded"></div>
        <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
      </div>
      <div className="flex gap-1.5 mt-3">
        <div className="h-5 w-16 bg-gray-100 rounded"></div>
        <div className="h-5 w-20 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
}

// Utilitaire de formatage de date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
