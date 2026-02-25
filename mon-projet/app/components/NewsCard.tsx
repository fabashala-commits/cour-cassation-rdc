'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

// Types pour les actualités
export interface NewsItem {
  id: string;
  image: string;
  category: string;
  categoryColor?: 'blue' | 'red' | 'gold' | 'green' | 'purple';
  title: string;
  excerpt: string;
  date: string;
  href: string;
}

interface NewsCardProps {
  news: NewsItem;
  index?: number;
}

// Couleurs des catégories
const categoryColors: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-[#000091]', text: 'text-white' },
  red: { bg: 'bg-red-600', text: 'text-white' },
  gold: { bg: 'bg-amber-500', text: 'text-white' },
  green: { bg: 'bg-emerald-600', text: 'text-white' },
  purple: { bg: 'bg-purple-600', text: 'text-white' },
};

export default function NewsCard({ news, index = 0 }: NewsCardProps) {
  const colors = categoryColors[news.categoryColor || 'blue'];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-cdc group relative bg-white overflow-hidden"
    >
      <Link href={news.href} className="block">
        {/* Container d'image à hauteur fixe */}
        <div className="relative h-48 overflow-hidden img-zoom">
          {/* Image avec effet zoom au survol */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
            style={{ backgroundImage: `url(${news.image})` }}
          />

          {/* Overlay qui s'intensifie au survol */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300" />

          {/* Badge catégorie */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`tag-cdc ${colors.bg} ${colors.text}`}>
              <Tag className="w-3 h-3 mr-1" />
              {news.category}
            </span>
          </div>

          {/* Bouton "Lire la suite" qui apparaît au survol */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.span
              initial={{ y: 10, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="px-4 py-2 bg-white text-[#000091] font-semibold rounded-lg shadow-lg flex items-center gap-2"
            >
              Lire la suite
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </div>
        </div>

        {/* Contenu textuel */}
        <div className="p-5">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={news.date}>{formatDate(news.date)}</time>
          </div>

          {/* Titre */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#000091] transition-colors">
            {news.title}
          </h3>

          {/* Extrait */}
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {news.excerpt}
          </p>

          {/* Lien avec animation de flèche */}
          <span className="inline-flex items-center gap-2 text-[#000091] font-semibold text-sm link-underline">
            Lire l'article
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

// Composant pour la grille d'actualités
interface NewsGridProps {
  news: NewsItem[];
  title?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
}

export function NewsGrid({ news, title = 'Actualités', showViewAll = true, viewAllHref = '/actualites' }: NewsGridProps) {
  return (
    <section className="py-12 bg-[#F8F9FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-[#7D1A1D]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title}
            </motion.h2>
            <div className="h-1 w-16 bg-[#7D1A1D] mt-2" />
          </div>

          {showViewAll && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href={viewAllHref}
                className="group inline-flex items-center gap-2 text-[#C01C2E] font-semibold link-underline link-underline-red"
              >
                Voir tout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <NewsCard key={item.id} news={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Skeleton pour le chargement
export function NewsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-4 w-2/3 bg-gray-100 rounded" />
        <div className="h-4 w-28 bg-gray-200 rounded" />
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

// Données de démonstration
export const demoNews: NewsItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    category: 'Jurisprudence',
    categoryColor: 'blue',
    title: 'Nouvelle décision importante en matière de responsabilité civile',
    excerpt: 'La Cour de cassation précise les conditions d\'application de la responsabilité du fait des choses...',
    date: '2026-02-20',
    href: '/actualites/1',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80',
    category: 'Institution',
    categoryColor: 'red',
    title: 'Visite officielle du Premier Président',
    excerpt: 'Le Premier Président de la Cour de cassation a reçu une délégation internationale...',
    date: '2026-02-18',
    href: '/actualites/2',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    category: 'Services',
    categoryColor: 'gold',
    title: 'Nouveau service de prise de rendez-vous en ligne',
    excerpt: 'La Cour de cassation lance son nouveau portail de prise de rendez-vous pour les justiciables...',
    date: '2026-02-15',
    href: '/actualites/3',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    category: 'Formation',
    categoryColor: 'green',
    title: 'Programme de formation continue des magistrats',
    excerpt: 'La Cour organise des sessions de formation sur les nouvelles dispositions législatives...',
    date: '2026-02-10',
    href: '/actualites/4',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    category: 'International',
    categoryColor: 'purple',
    title: 'Coopération judiciaire avec les pays francophones',
    excerpt: 'Signature d\'un accord de coopération avec plusieurs cours suprêmes africaines...',
    date: '2026-02-05',
    href: '/actualites/5',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    category: 'Numérique',
    categoryColor: 'blue',
    title: 'Intelligence artificielle au service de la justice',
    excerpt: 'La Cour expérimente de nouveaux outils d\'aide à la décision basés sur l\'IA...',
    date: '2026-02-01',
    href: '/actualites/6',
  },
];
