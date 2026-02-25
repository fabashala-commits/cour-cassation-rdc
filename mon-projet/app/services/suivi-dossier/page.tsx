'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  ArrowLeft,
  Info,
  Calendar,
  User,
  Folder,
  Scale,
  FileCheck,
  Timer,
  AlertCircle,
  BookOpen,
} from 'lucide-react';

/* ============================================
   TYPES ET INTERFACES
============================================ */

type StatutDossier = 'en-cours' | 'arret-rendu' | 'action-requise';

interface EtapeDossier {
  id: number;
  titre: string;
  date: string;
  description: string;
  complete: boolean;
}

interface DossierInfo {
  reference: string;
  type: string;
  dateDepot: string;
  chambre: string;
  statut: StatutDossier;
  etapes: EtapeDossier[];
  prochainEvenement?: string;
  actionRequise?: string;
}

/* ============================================
   DONNÉES DE DÉMONSTRATION
============================================ */

const dossierDemo: DossierInfo = {
  reference: 'RG 2025/1234',
  type: 'Pourvoi en Cassation - Matière Civile',
  dateDepot: '15 Janvier 2025',
  chambre: 'Première Chambre Civile',
  statut: 'en-cours',
  etapes: [
    {
      id: 1,
      titre: 'Dépôt du pourvoi',
      date: '15 Janvier 2025',
      description: 'Votre demande de pourvoi a été enregistrée au greffe de la Cour.',
      complete: true,
    },
    {
      id: 2,
      titre: 'Vérification de recevabilité',
      date: '22 Janvier 2025',
      description: 'Les conditions de forme et de délai ont été vérifiées.',
      complete: true,
    },
    {
      id: 3,
      titre: 'Attribution à une chambre',
      date: '30 Janvier 2025',
      description: 'Votre dossier a été attribué à la Première Chambre Civile.',
      complete: true,
    },
    {
      id: 4,
      titre: 'Examen par le Conseiller Rapporteur',
      date: 'En cours',
      description: 'Un magistrat étudie actuellement les moyens de votre pourvoi.',
      complete: false,
    },
    {
      id: 5,
      titre: 'Audience et délibéré',
      date: 'À venir',
      description: 'L\'affaire sera inscrite au rôle d\'une prochaine audience.',
      complete: false,
    },
    {
      id: 6,
      titre: 'Prononcé de l\'arrêt',
      date: 'À venir',
      description: 'La décision de la Cour sera rendue et notifiée.',
      complete: false,
    },
  ],
  prochainEvenement: 'Rapport du Conseiller attendu sous 4 à 6 semaines',
};

/* ============================================
   COMPOSANTS
============================================ */

const StatutBadge = ({ statut }: { statut: StatutDossier }) => {
  const config = {
    'en-cours': {
      label: 'Dossier en cours d\'examen',
      bgColor: 'bg-[#1D2B44]',
      textColor: 'text-white',
      icon: Clock,
    },
    'arret-rendu': {
      label: 'Arrêt rendu / Disponible',
      bgColor: 'bg-[#C0962E]',
      textColor: 'text-white',
      icon: CheckCircle,
    },
    'action-requise': {
      label: 'Action requise',
      bgColor: 'bg-[#7D1A1D]',
      textColor: 'text-white',
      icon: AlertTriangle,
    },
  };

  const { label, bgColor, textColor, icon: Icon } = config[statut];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bgColor} ${textColor}`}>
      <Icon className="w-4 h-4" />
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
};

/* ============================================
   COMPOSANT PRINCIPAL
============================================ */

export default function SuiviDossierPage() {
  const [reference, setReference] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [dossier, setDossier] = useState<DossierInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!reference.trim()) {
      setError('Veuillez saisir une référence de dossier');
      return;
    }

    setIsSearching(true);
    
    // Simulation de recherche
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Démonstration : accepte plusieurs formats de référence
    if (reference.toLowerCase().includes('rg') || reference.includes('2025') || reference.includes('1234')) {
      setDossier(dossierDemo);
    } else {
      setError('Aucun dossier trouvé avec cette référence. Veuillez vérifier le numéro saisi.');
      setDossier(null);
    }
    
    setIsSearching(false);
  };

  const resetSearch = () => {
    setDossier(null);
    setReference('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C0962E] rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-[#C0962E]/20 rounded-full mb-6"
            >
              <FileText className="w-10 h-10 text-[#C0962E]" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Suivi de Dossier
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Consultez l'état d'avancement de votre procédure devant la Cour de Cassation 
              de la République Démocratique du Congo.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Message d'accueil et Orientation */}
        {!dossier && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#1D2B44]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-[#1D2B44]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1D2B44] mb-2">
                  Bienvenue sur l'espace de consultation
                </h2>
                <p className="text-[#1D2B44]/70 leading-relaxed">
                  Ce service vous permet de suivre en temps réel l'état d'avancement de votre 
                  affaire devant la Cour de Cassation. Vous pouvez consulter les différentes 
                  étapes de la procédure et connaître le statut actuel de votre dossier.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1D2B44]/5 rounded-lg p-4">
                <h3 className="font-semibold text-[#1D2B44] mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C0962E]" />
                  Numéro R.G. (Rôle Général)
                </h3>
                <p className="text-sm text-[#1D2B44]/60">
                  Le numéro de Rôle Général est attribué à votre dossier lors de son 
                  enregistrement. Il figure sur votre accusé de réception.
                </p>
                <p className="text-xs text-[#1D2B44]/50 mt-2 italic">
                  Format : RG 2025/XXXX
                </p>
              </div>
              
              <div className="bg-[#1D2B44]/5 rounded-lg p-4">
                <h3 className="font-semibold text-[#1D2B44] mb-2 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#C0962E]" />
                  Référence de Pourvoi
                </h3>
                <p className="text-sm text-[#1D2B44]/60">
                  La référence de pourvoi vous a été communiquée par votre avocat ou 
                  se trouve sur les documents de procédure.
                </p>
                <p className="text-xs text-[#1D2B44]/50 mt-2 italic">
                  Format : P/XXXX/2025
                </p>
              </div>
            </div>

            <div className="bg-[#C0962E]/10 border border-[#C0962E]/30 rounded-lg p-4">
              <p className="text-sm text-[#1D2B44]/80 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#C0962E] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Conseil :</strong> Munissez-vous de votre numéro R.G. ou référence de pourvoi 
                  avant de commencer votre recherche. Ces informations figurent sur les documents 
                  officiels transmis par le greffe.
                </span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Espace de Consultation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] p-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Search className="w-6 h-6 text-[#C0962E]" />
              Rechercher votre dossier
            </h2>
            <p className="text-white/70 text-sm mt-2">
              Saisissez votre numéro de référence pour consulter l'état de votre procédure
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                  Référence du dossier <span className="text-[#7D1A1D]">*</span>
                </label>
                <div className="relative">
                  <Folder className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D2B44]/40" />
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Ex: RG 2025/1234 ou P/1234/2025"
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-[#1D2B44]/20 rounded-xl focus:ring-2 focus:ring-[#C0962E] focus:border-[#C0962E] transition-all text-[#1D2B44] placeholder:text-[#1D2B44]/40"
                    disabled={isSearching}
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#7D1A1D]/10 border border-[#7D1A1D]/30 rounded-lg p-4 flex items-start gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-[#7D1A1D] flex-shrink-0" />
                  <p className="text-[#7D1A1D] text-sm">{error}</p>
                </motion.div>
              )}

              <div className="flex gap-3">
                <motion.button
                  type="submit"
                  disabled={isSearching}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all shadow-lg ${
                    isSearching 
                      ? 'bg-[#C0962E]/50 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#C0962E] to-[#D4A842] hover:shadow-xl hover:shadow-[#C0962E]/30'
                  }`}
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Recherche en cours...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Consulter l'avancement
                    </>
                  )}
                </motion.button>

                {dossier && (
                  <motion.button
                    type="button"
                    onClick={resetSearch}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-4 rounded-xl font-semibold text-[#1D2B44] border-2 border-[#1D2B44]/20 hover:bg-[#1D2B44]/5 transition-all"
                  >
                    Nouvelle recherche
                  </motion.button>
                )}
              </div>
            </form>
          </div>
        </motion.div>

        {/* Résultats - Visualisation de l'État du Dossier */}
        <AnimatePresence>
          {dossier && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* En-tête du dossier */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-[#1D2B44]/10">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-[#1D2B44]/60 mb-1">Référence</p>
                      <h3 className="text-2xl font-bold text-[#1D2B44]">{dossier.reference}</h3>
                    </div>
                    <StatutBadge statut={dossier.statut} />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1D2B44]/10 rounded-lg flex items-center justify-center">
                        <Scale className="w-5 h-5 text-[#1D2B44]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#1D2B44]/60">Type de procédure</p>
                        <p className="text-sm font-medium text-[#1D2B44]">{dossier.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1D2B44]/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#1D2B44]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#1D2B44]/60">Date de dépôt</p>
                        <p className="text-sm font-medium text-[#1D2B44]">{dossier.dateDepot}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1D2B44]/10 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-[#1D2B44]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#1D2B44]/60">Chambre désignée</p>
                        <p className="text-sm font-medium text-[#1D2B44]">{dossier.chambre}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prochain événement ou action requise */}
                {dossier.prochainEvenement && (
                  <div className="px-6 py-4 bg-[#C0962E]/10 border-l-4 border-[#C0962E]">
                    <p className="text-sm text-[#1D2B44]/80 flex items-center gap-2">
                      <Timer className="w-4 h-4 text-[#C0962E]" />
                      <strong>Prochaine étape :</strong> {dossier.prochainEvenement}
                    </p>
                  </div>
                )}

                {dossier.actionRequise && (
                  <div className="px-6 py-4 bg-[#7D1A1D]/10 border-l-4 border-[#7D1A1D]">
                    <p className="text-sm text-[#7D1A1D] flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <strong>Action requise :</strong> {dossier.actionRequise}
                    </p>
                  </div>
                )}
              </div>

              {/* Timeline des étapes */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-[#1D2B44] mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#C0962E]" />
                  Étapes de la procédure
                </h3>

                <div className="relative">
                  {/* Ligne verticale */}
                  <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-[#1D2B44]/10" />
                  
                  <div className="space-y-6">
                    {dossier.etapes.map((etape, index) => (
                      <motion.div
                        key={etape.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex gap-4"
                      >
                        {/* Indicateur */}
                        <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                          etape.complete 
                            ? 'bg-[#1D2B44]' 
                            : index === dossier.etapes.findIndex(e => !e.complete)
                              ? 'bg-[#C0962E]'
                              : 'bg-[#1D2B44]/20'
                        }`}>
                          {etape.complete ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : index === dossier.etapes.findIndex(e => !e.complete) ? (
                            <Clock className="w-5 h-5 text-white" />
                          ) : (
                            <div className="w-2 h-2 bg-[#1D2B44]/40 rounded-full" />
                          )}
                        </div>

                        {/* Contenu */}
                        <div className={`flex-1 pb-2 ${!etape.complete && index !== dossier.etapes.findIndex(e => !e.complete) ? 'opacity-50' : ''}`}>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-semibold ${etape.complete ? 'text-[#1D2B44]' : 'text-[#1D2B44]/70'}`}>
                              {etape.titre}
                            </h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              etape.complete 
                                ? 'bg-[#1D2B44]/10 text-[#1D2B44]' 
                                : index === dossier.etapes.findIndex(e => !e.complete)
                                  ? 'bg-[#C0962E]/10 text-[#C0962E]'
                                  : 'bg-[#1D2B44]/5 text-[#1D2B44]/50'
                            }`}>
                              {etape.date}
                            </span>
                          </div>
                          <p className="text-sm text-[#1D2B44]/60 leading-relaxed">
                            {etape.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Légende des statuts */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-sm font-bold text-[#1D2B44] uppercase tracking-wide mb-4">
                  Comprendre les statuts
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-3 bg-[#1D2B44]/5 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-[#1D2B44] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#1D2B44] text-sm">En cours d'examen</p>
                      <p className="text-xs text-[#1D2B44]/60">Votre dossier est actuellement étudié par les magistrats de la Cour.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#C0962E]/5 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-[#C0962E] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#1D2B44] text-sm">Arrêt rendu</p>
                      <p className="text-xs text-[#1D2B44]/60">La décision a été prononcée et est disponible au greffe.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#7D1A1D]/5 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-[#7D1A1D] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#1D2B44] text-sm">Action requise</p>
                      <p className="text-xs text-[#1D2B44]/60">Une démarche de votre part est nécessaire (pièce manquante, notification à retirer).</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Assistance et Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-[#1D2B44]/10">
            <h3 className="text-lg font-bold text-[#1D2B44] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#C0962E]" />
              Besoin d'aide ?
            </h3>
            <p className="text-[#1D2B44]/60 text-sm mt-1">
              Le Greffe de la Cour de Cassation est à votre disposition pour toute question concernant votre dossier.
            </p>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="tel:+243814000000"
                className="flex items-center gap-4 p-4 rounded-lg border border-[#1D2B44]/10 hover:border-[#7D1A1D]/30 hover:bg-[#7D1A1D]/5 transition-all group"
              >
                <div className="w-12 h-12 bg-[#7D1A1D]/10 rounded-full flex items-center justify-center group-hover:bg-[#7D1A1D]/20 transition-colors">
                  <Phone className="w-6 h-6 text-[#7D1A1D]" />
                </div>
                <div>
                  <p className="text-xs text-[#1D2B44]/60 mb-1">Par téléphone</p>
                  <p className="font-semibold text-[#1D2B44]">+243 81 400 0000</p>
                  <p className="text-xs text-[#1D2B44]/50">Lun - Ven : 8h - 16h</p>
                </div>
              </a>

              <a
                href="mailto:greffe@courdecassation.cd"
                className="flex items-center gap-4 p-4 rounded-lg border border-[#1D2B44]/10 hover:border-[#7D1A1D]/30 hover:bg-[#7D1A1D]/5 transition-all group"
              >
                <div className="w-12 h-12 bg-[#7D1A1D]/10 rounded-full flex items-center justify-center group-hover:bg-[#7D1A1D]/20 transition-colors">
                  <Mail className="w-6 h-6 text-[#7D1A1D]" />
                </div>
                <div>
                  <p className="text-xs text-[#1D2B44]/60 mb-1">Par courrier électronique</p>
                  <p className="font-semibold text-[#1D2B44]">greffe@courdecassation.cd</p>
                  <p className="text-xs text-[#1D2B44]/50">Réponse sous 48h</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-lg border border-[#1D2B44]/10 bg-[#1D2B44]/5">
                <div className="w-12 h-12 bg-[#7D1A1D]/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#7D1A1D]" />
                </div>
                <div>
                  <p className="text-xs text-[#1D2B44]/60 mb-1">Accueil du Greffe</p>
                  <p className="font-semibold text-[#1D2B44]">Palais de Justice</p>
                  <p className="text-xs text-[#1D2B44]/50">Kinshasa/Gombe</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-[#1D2B44]/5 border-t border-[#1D2B44]/10">
            <p className="text-xs text-[#1D2B44]/60 text-center">
              Pour les avocats inscrits au Barreau, un accès privilégié est disponible via 
              <Link href="/services/information" className="text-[#C0962E] hover:underline ml-1">
                l'espace professionnel
              </Link>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
