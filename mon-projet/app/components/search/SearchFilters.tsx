'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, X, Check } from 'lucide-react';

// Types pour les filtres
export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface SearchFiltersProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string) => void;
  onClearFilters: () => void;
  totalResults?: number;
}

export default function SearchFilters({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  totalResults,
}: SearchFiltersProps) {
  const totalSelectedCount = Object.values(selectedFilters).flat().length;

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden sticky top-24">
        {/* En-tête des filtres */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#000091] text-white">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="font-semibold text-sm">Filtres</span>
          </div>
          {totalSelectedCount > 0 && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
            >
              <X className="w-3 h-3" />
              Effacer ({totalSelectedCount})
            </button>
          )}
        </div>

        {/* Nombre de résultats */}
        {totalResults !== undefined && (
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
            <strong className="text-[#000091]">{totalResults.toLocaleString('fr-FR')}</strong> résultats
          </div>
        )}

        {/* Groupes de filtres avec accordéon */}
        <div className="divide-y divide-gray-200">
          {filters.map((group) => (
            <FilterAccordion
              key={group.id}
              group={group}
              selectedOptions={selectedFilters[group.id] || []}
              onOptionChange={(optionId) => onFilterChange(group.id, optionId)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

// Composant Accordéon pour chaque groupe de filtres
interface FilterAccordionProps {
  group: FilterGroup;
  selectedOptions: string[];
  onOptionChange: (optionId: string) => void;
}

function FilterAccordion({ group, selectedOptions, onOptionChange }: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasSelection = selectedOptions.length > 0;

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-sm text-gray-900 flex items-center gap-2">
          {group.label}
          {hasSelection && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-[#000091] text-white rounded-full">
              {selectedOptions.length}
            </span>
          )}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-1">
              {group.options.map((option) => {
                const isSelected = selectedOptions.includes(option.id);
                return (
                  <label
                    key={option.id}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-4 h-4 border rounded transition-colors ${
                        isSelected
                          ? 'bg-[#000091] border-[#000091]'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onOptionChange(option.id)}
                      className="sr-only"
                    />
                    <span className="text-sm text-gray-700 flex-1">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-xs text-gray-400">({option.count})</span>
                    )}
                  </label>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Skeleton pour le chargement des filtres
export function SearchFiltersSkeleton() {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
        <div className="h-12 bg-gray-300"></div>
        <div className="px-4 py-3 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="space-y-1.5">
                <div className="h-6 w-full bg-gray-100 rounded"></div>
                <div className="h-6 w-full bg-gray-100 rounded"></div>
                <div className="h-6 w-3/4 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
