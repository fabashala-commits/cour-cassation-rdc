'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Download } from 'lucide-react';

// Types pour les décisions
export interface Decision {
  id: string;
  numeroPourvoi: string;
  chambre: string;
  chambreColor: 'civil' | 'penal' | 'procedure';
  datePublication: string;
  titre: string;
  sommaire: string;
  mentions: ('B' | 'R')[]; // B = Bulletin, R = Rapport
  href?: string;
}

interface LatestDecisionsProps {
  decisions?: Decision[];
  title?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
}

// Couleurs des badges par chambre
const chambreColors: Record<string, { bg: string; text: string }> = {
  civil: { bg: 'bg-blue-100', text: 'text-blue-800' },
  penal: { bg: 'bg-red-100', text: 'text-red-800' },
  procedure: { bg: 'bg-purple-100', text: 'text-purple-800' },
};

// Données factices
export const decisionsData: Decision[] = [
  {
    id: '1',
    numeroPourvoi: '24-12.345',
    chambre: 'Chambre Civil 1',
    chambreColor: 'civil',
    datePublication: '20 février 2026',
    titre: 'Responsabilité civile - Faute de la victime - Exonération partielle du responsable',
    sommaire: 'La faute de la victime n\'exonère partiellement le responsable que si elle a contribué à la réalisation du dommage. Le comportement imprudent de la victime peut justifier une réduction de l\'indemnisation.',
    mentions: ['B', 'R'],
    href: '/decisions/1',
  },
  {
    id: '2',
    numeroPourvoi: '24-80.123',
    chambre: 'Chambre Pénal 1',
    chambreColor: 'penal',
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
    chambreColor: 'civil',
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
    chambreColor: 'penal',
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
];

// Variantes d'animation
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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export default function LatestDecisions({
  decisions = decisionsData,
  title = 'Les dernières décisions aux Bulletins et au Rapport',
  showViewAll = true,
  viewAllHref = '/decisions',
}: LatestDecisionsProps) {
  return (
    <section className="py-12 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold text-[#1D2B44]"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {title}
          </h2>
          <div className="h-1 w-20 bg-[#C0962E] mt-3" />
        </div>

        {/* Liste des décisions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col gap-4"
        >
          {decisions.map((decision) => (
            <DecisionCard key={decision.id} decision={decision} />
          ))}
        </motion.div>

        {/* Bouton "Toutes les décisions" */}
        {showViewAll && (
          <div className="mt-8 flex justify-center">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#000091] text-[#000091] font-semibold hover:bg-[#000091] hover:text-white transition-colors duration-200 rounded-none"
            >
              Toutes les décisions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// Composant carte de décision
function DecisionCard({ decision }: { decision: Decision }) {
  const colors = chambreColors[decision.chambreColor] || chambreColors.civil;

  const content = (
    <motion.article
      variants={itemVariants}
      className="group bg-white border border-gray-200 hover:shadow-md hover:bg-[#f9f9f9] transition-all duration-200 rounded-none"
    >
      <div className="p-5">
        {/* Métadonnées en-tête */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {/* Numéro de pourvoi */}
          <span
            className="text-sm font-bold text-[#000091]"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {decision.numeroPourvoi}
          </span>

          {/* Badge Chambre */}
          <span
            className={`text-xs font-semibold px-2 py-0.5 ${colors.bg} ${colors.text} rounded-none`}
          >
            {decision.chambre}
          </span>

          {/* Date */}
          <span className="text-sm text-[#666666]">
            {decision.datePublication}
          </span>

          {/* Mentions (Bulletin / Rapport) */}
          <div className="flex gap-1 ml-auto">
            {decision.mentions.map((mention) => (
              <span
                key={mention}
                className="w-6 h-6 flex items-center justify-center text-xs font-bold bg-[#000091] text-white rounded-none"
                title={mention === 'B' ? 'Publié au Bulletin' : 'Publié au Rapport'}
              >
                {mention}
              </span>
            ))}
          </div>
        </div>

        {/* Titre */}
        <h3
          className="text-base font-bold text-[#161616] group-hover:underline group-hover:decoration-[#000091] group-hover:decoration-2 group-hover:underline-offset-2 transition-all mb-2"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {decision.titre}
        </h3>

        {/* Sommaire */}
        <p
          className="text-sm text-[#666666] italic line-clamp-2 mb-4"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {decision.sommaire}
        </p>

        {/* Footer avec bouton */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-[#000091] font-medium group-hover:underline">
            <FileText className="w-4 h-4" />
            Consulter l'arrêt
          </div>
          <Download className="w-4 h-4 text-[#666666] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </div>
    </motion.article>
  );

  if (decision.href) {
    return (
      <Link href={decision.href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

// Skeleton pour le chargement
export function LatestDecisionsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white border border-gray-200 p-5 animate-pulse rounded-none">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-20 h-4 bg-gray-200" />
            <div className="w-28 h-5 bg-gray-100" />
            <div className="w-24 h-4 bg-gray-100" />
            <div className="ml-auto flex gap-1">
              <div className="w-6 h-6 bg-gray-300" />
              <div className="w-6 h-6 bg-gray-300" />
            </div>
          </div>
          <div className="w-3/4 h-5 bg-gray-200 mb-2" />
          <div className="w-full h-4 bg-gray-100 mb-1" />
          <div className="w-2/3 h-4 bg-gray-100 mb-4" />
          <div className="pt-3 border-t border-gray-100">
            <div className="w-32 h-4 bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
