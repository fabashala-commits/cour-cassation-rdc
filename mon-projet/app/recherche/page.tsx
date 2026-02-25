'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, List, Grid, ArrowUpDown } from 'lucide-react';
import ResultCard, { ResultCardSkeleton, DecisionResult } from '../components/search/ResultCard';
import SearchFilters, { SearchFiltersSkeleton, FilterGroup } from '../components/search/SearchFilters';

// Données de démonstration
const mockFilters: FilterGroup[] = [
  {
    id: 'chambre',
    label: 'Chambre',
    options: [
      { id: 'civil1', label: 'Chambre Civil 1', count: 1234 },
      { id: 'civil2', label: 'Chambre Civil 2', count: 856 },
      { id: 'penal1', label: 'Chambre Pénal 1', count: 432 },
      { id: 'penal2', label: 'Chambre Pénal 2', count: 298 },
      { id: 'procedure', label: 'Chambre Procédure Spécial', count: 145 },
    ],
  },
  {
    id: 'annee',
    label: 'Année',
    options: [
      { id: '2026', label: '2026', count: 156 },
      { id: '2025', label: '2025', count: 1543 },
      { id: '2024', label: '2024', count: 1876 },
      { id: '2023', label: '2023', count: 1654 },
      { id: '2022', label: '2022', count: 1432 },
    ],
  },
  {
    id: 'type',
    label: 'Type de décision',
    options: [
      { id: 'arret', label: 'Arrêt', count: 2543 },
      { id: 'avis', label: 'Avis', count: 234 },
      { id: 'ordonnance', label: 'Ordonnance', count: 87 },
    ],
  },
  {
    id: 'solution',
    label: 'Solution',
    options: [
      { id: 'cassation', label: 'Cassation', count: 876 },
      { id: 'rejet', label: 'Rejet', count: 1654 },
      { id: 'cassation-partielle', label: 'Cassation partielle', count: 432 },
      { id: 'non-lieu', label: 'Non-lieu à statuer', count: 54 },
    ],
  },
];

const mockResults: DecisionResult[] = [
  {
    id: '1',
    titre: 'Responsabilité civile - Faute de la victime - Exonération partielle',
    chambre: 'Civil 1',
    date: '2026-02-15',
    reference: 'Cass. civ. 1, 15 février 2026, n° 24-12.345',
    resume: "La Cour de cassation rappelle que la faute de la victime n'exonère partiellement le responsable que si elle a contribué à la réalisation du dommage. En l'espèce, le comportement imprudent de la victime justifie une réduction de 30% de l'indemnisation.",
    keywords: ['Responsabilité civile', 'Faute', 'Victime', 'Indemnisation'],
  },
  {
    id: '2',
    titre: 'Contentieux civil - Obligations contractuelles - Résolution',
    chambre: 'Civil 2',
    date: '2026-02-10',
    reference: 'Cass. civ. 2, 10 février 2026, n° 25-80.123',
    resume: "La chambre Civil 2 précise les conditions dans lesquelles la résolution du contrat peut être prononcée en cas de manquement grave aux obligations contractuelles.",
    keywords: ['Contrats', 'Obligations', 'Résolution'],
  },
  {
    id: '3',
    titre: 'Procédure pénale - Garde à vue - Nullité - Accès au dossier',
    chambre: 'Pénal 1',
    date: '2026-02-05',
    reference: 'Cass. pén. 1, 5 février 2026, n° 24-15.678',
    resume: "La chambre Pénal 1 précise les conditions dans lesquelles le défaut d'accès au dossier pendant la garde à vue peut entraîner la nullité de la procédure.",
    keywords: ['Garde à vue', 'Nullité', 'Procédure pénale'],
  },
  {
    id: '4',
    titre: 'Exécution des peines - Aménagement de peine - Libération conditionnelle',
    chambre: 'Pénal 2',
    date: '2026-01-28',
    reference: 'Cass. pén. 2, 28 janvier 2026, n° 24-18.901',
    resume: "La chambre Pénal 2 rappelle les conditions d'octroi de la libération conditionnelle et les critères de réinsertion devant être examinés par le juge d'application des peines.",
    keywords: ['Libération conditionnelle', 'Peines', 'Réinsertion'],
  },
  {
    id: '5',
    titre: 'Procédure exceptionnelle - Pourvoi en cassation - Recevabilité',
    chambre: 'Procédure Spécial',
    date: '2026-01-20',
    reference: 'Cass. proc. spéc., 20 janvier 2026, n° 25-40.001',
    resume: "La chambre Procédure Spécial statue sur la recevabilité d'un pourvoi formé contre une décision rendue par une juridiction spécialisée.",
    keywords: ['Pourvoi', 'Recevabilité', 'Procédure'],
  },
];

export default function SearchResultsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortOrder, setSortOrder] = useState<'date' | 'relevance'>('date');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Simulation du chargement
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Gestion des filtres
  const handleFilterChange = (groupId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const current = prev[groupId] || [];
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];

      return {
        ...prev,
        [groupId]: updated,
      };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Barre de recherche sticky */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Champ de recherche principal */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher dans la jurisprudence..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#000091] focus:border-transparent transition-shadow"
              />
            </div>

            {/* Barre d'options */}
            <div className="flex items-center justify-between mt-3">
              <button className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                Filtres
              </button>

              <div className="flex items-center gap-4 ml-auto">
                {/* Tri */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'date' | 'relevance')}
                    className="text-sm border-none bg-transparent text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="date">Date (récent)</option>
                    <option value="relevance">Pertinence</option>
                  </select>
                </div>

                {/* Vue liste/grille */}
                <div className="hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${
                      viewMode === 'list'
                        ? 'bg-[#000091] text-white'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-[#000091] text-white'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal : Layout Master-Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar de filtres (gauche) */}
          <div className="hidden lg:block">
            {isLoading ? (
              <SearchFiltersSkeleton />
            ) : (
              <SearchFilters
                filters={mockFilters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                totalResults={2888}
              />
            )}
          </div>

          {/* Liste des résultats (droite) */}
          <main className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                  : 'space-y-4'
              }
            >
              {isLoading ? (
                // Skeletons de chargement
                Array.from({ length: 5 }).map((_, i) => (
                  <ResultCardSkeleton key={i} />
                ))
              ) : (
                // Résultats
                mockResults.map((result, index) => (
                  <ResultCard key={result.id} decision={result} index={index} />
                ))
              )}
            </motion.div>

            {/* Pagination */}
            {!isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex items-center justify-center gap-2"
              >
                <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Précédent
                </button>
                {[1, 2, 3, '...', 120].map((page, i) => (
                  <button
                    key={i}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      page === 1
                        ? 'bg-[#000091] text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Suivant
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
