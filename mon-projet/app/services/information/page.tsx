'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  FileText,
  Download,
  ChevronDown,
  ChevronRight,
  Bell,
  Calendar,
  ArrowLeft,
  ExternalLink,
  HelpCircle,
  Scale,
  Gavel,
  BookMarked,
  Scroll,
  FileCheck,
  AlertCircle,
  Clock,
  Users,
  Building2,
  File,
} from 'lucide-react';

/* ============================================
   DONNÉES
============================================ */

// Guides Pratiques
const guidesPratiques = [
  {
    id: 'introduire-pourvoi',
    titre: 'Comment introduire un pourvoi ?',
    description: 'Guide complet sur les démarches à suivre pour former un pourvoi en cassation.',
    icon: Gavel,
    sections: ['Conditions de recevabilité', 'Délais à respecter', 'Documents requis', 'Procédure étape par étape'],
  },
  {
    id: 'role-cour',
    titre: 'Le rôle de la Cour de Cassation',
    description: 'Comprendre les missions et compétences de la plus haute juridiction.',
    icon: Scale,
    sections: ['Mission constitutionnelle', 'Contrôle de légalité', 'Unification de la jurisprudence', 'Organisation interne'],
  },
  {
    id: 'lexique-juridique',
    titre: 'Lexique juridique',
    description: 'Dictionnaire des termes juridiques utilisés devant la Cour de Cassation.',
    icon: BookMarked,
    sections: ['Termes de procédure', 'Vocabulaire de cassation', 'Expressions latines', 'Glossaire pratique'],
  },
  {
    id: 'decisions-arrets',
    titre: 'Comprendre les décisions et arrêts',
    description: 'Guide de lecture et d\'interprétation des arrêts de la Cour.',
    icon: Scroll,
    sections: ['Structure d\'un arrêt', 'Portée des décisions', 'Effets juridiques', 'Voies de recours'],
  },
];

// Communiqués Officiels
const communiques = [
  {
    id: 1,
    titre: 'Rentrée judiciaire 2025-2026',
    date: '15 Février 2026',
    source: 'Cabinet du Premier Président',
    urgent: true,
    resume: 'Cérémonie solennelle de rentrée judiciaire de la Cour de Cassation pour l\'année 2025-2026.',
  },
  {
    id: 2,
    titre: 'Nouveaux horaires d\'accueil du Greffe',
    date: '10 Février 2026',
    source: 'Greffe de la Cour',
    urgent: false,
    resume: 'Modification des horaires d\'ouverture au public à compter du 1er mars 2026.',
  },
  {
    id: 3,
    titre: 'Mise à jour des procédures de dépôt électronique',
    date: '1er Février 2026',
    source: 'Direction de la Modernisation',
    urgent: false,
    resume: 'Nouvelles fonctionnalités disponibles sur la plateforme de dépôt en ligne.',
  },
  {
    id: 4,
    titre: 'Journée portes ouvertes',
    date: '20 Janvier 2026',
    source: 'Cabinet du Premier Président',
    urgent: false,
    resume: 'La Cour de Cassation organise une journée de découverte pour les étudiants en droit.',
  },
];

// Documents PDF
const documentsPDF = [
  {
    id: 'formulaire-pourvoi',
    titre: 'Formulaire de déclaration de pourvoi',
    categorie: 'Procédure',
    taille: '245 Ko',
    format: 'PDF',
  },
  {
    id: 'notice-memoire',
    titre: 'Notice de rédaction du mémoire ampliatif',
    categorie: 'Procédure',
    taille: '180 Ko',
    format: 'PDF',
  },
  {
    id: 'tarif-greffe',
    titre: 'Tarification des actes de greffe',
    categorie: 'Administratif',
    taille: '120 Ko',
    format: 'PDF',
  },
  {
    id: 'demande-copie',
    titre: 'Formulaire de demande de copie d\'arrêt',
    categorie: 'Administratif',
    taille: '95 Ko',
    format: 'PDF',
  },
  {
    id: 'guide-avocat',
    titre: 'Guide pratique à l\'usage des avocats',
    categorie: 'Guide',
    taille: '1.2 Mo',
    format: 'PDF',
  },
  {
    id: 'reglement-interieur',
    titre: 'Règlement intérieur de la Cour',
    categorie: 'Institutionnel',
    taille: '850 Ko',
    format: 'PDF',
  },
];

// FAQ
const faqItems = [
  {
    question: 'Qu\'est-ce qu\'un pourvoi en cassation ?',
    reponse: 'Le pourvoi en cassation est une voie de recours extraordinaire qui permet de contester une décision de justice devant la Cour de Cassation. Il ne s\'agit pas d\'un troisième degré de juridiction : la Cour ne rejuge pas les faits mais vérifie que le droit a été correctement appliqué par les juges du fond.',
  },
  {
    question: 'Quel est le délai pour former un pourvoi ?',
    reponse: 'Le délai pour former un pourvoi en cassation est généralement de deux mois à compter de la signification de la décision attaquée. Ce délai peut varier selon la nature de l\'affaire. Il est impératif de respecter ce délai sous peine d\'irrecevabilité.',
  },
  {
    question: 'Dois-je obligatoirement être représenté par un avocat ?',
    reponse: 'Oui, la représentation par un avocat inscrit au Barreau est obligatoire devant la Cour de Cassation. L\'avocat assure la rédaction du mémoire et présente les moyens de cassation selon les règles de procédure applicables.',
  },
  {
    question: 'Comment consulter l\'état d\'avancement de mon dossier ?',
    reponse: 'Vous pouvez consulter l\'état de votre dossier via notre service de suivi en ligne en utilisant votre numéro de Rôle Général (R.G.) ou votre référence de pourvoi. Ce service est accessible depuis la rubrique "Suivi de Dossier" de notre site.',
  },
  {
    question: 'Quels sont les effets d\'un arrêt de cassation ?',
    reponse: 'Lorsque la Cour casse une décision, elle peut soit renvoyer l\'affaire devant une autre juridiction de même nature, soit, dans certains cas, statuer elle-même au fond. L\'arrêt de cassation annule la décision attaquée et, selon les cas, tout ou partie de la procédure antérieure.',
  },
  {
    question: 'Comment obtenir une copie d\'un arrêt ?',
    reponse: 'Les copies d\'arrêts peuvent être demandées auprès du Greffe de la Cour de Cassation. Un formulaire de demande est disponible en téléchargement sur ce site. Des frais de copie peuvent s\'appliquer selon la tarification en vigueur.',
  },
];

/* ============================================
   COMPOSANT PRINCIPAL
============================================ */

export default function InformationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'guides' | 'communiques' | 'documents'>('guides');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de recherche
    console.log('Recherche:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#C0962E] rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative">
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
              <BookOpen className="w-10 h-10 text-[#C0962E]" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Centre d'Information
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Ressources, guides et documentation officielle de la Cour de Cassation 
              de la République Démocratique du Congo.
            </motion.p>
          </div>

          {/* Moteur de recherche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mt-8"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative rounded-xl overflow-hidden border-2 border-[#C0962E] shadow-lg shadow-[#C0962E]/20">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D2B44]/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une information, un texte ou un guide..."
                  className="w-full pl-12 pr-32 py-4 text-[#1D2B44] placeholder:text-[#1D2B44]/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#C0962E] text-white rounded-lg font-medium hover:bg-[#D4A842] transition-colors"
                >
                  Rechercher
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Navigation par onglets */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#1D2B44]/10 pb-4">
          <button
            onClick={() => setActiveTab('guides')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'guides'
                ? 'bg-[#1D2B44] text-white'
                : 'text-[#1D2B44] hover:bg-[#1D2B44]/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Guides Pratiques
          </button>
          <button
            onClick={() => setActiveTab('communiques')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'communiques'
                ? 'bg-[#1D2B44] text-white'
                : 'text-[#1D2B44] hover:bg-[#1D2B44]/10'
            }`}
          >
            <Bell className="w-4 h-4" />
            Communiqués Officiels
            <span className="ml-1 px-2 py-0.5 bg-[#7D1A1D] text-white text-xs rounded-full">
              {communiques.filter(c => c.urgent).length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'documents'
                ? 'bg-[#1D2B44] text-white'
                : 'text-[#1D2B44] hover:bg-[#1D2B44]/10'
            }`}
          >
            <Download className="w-4 h-4" />
            Documentation PDF
          </button>
        </div>

        {/* Contenu des onglets */}
        <AnimatePresence mode="wait">
          {/* Guides Pratiques */}
          {activeTab === 'guides' && (
            <motion.div
              key="guides"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {guidesPratiques.map((guide) => {
                const Icon = guide.icon;
                return (
                  <motion.div
                    key={guide.id}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#1D2B44]/5 hover:shadow-xl transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-[#1D2B44]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-[#1D2B44]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#1D2B44] mb-2">
                            {guide.titre}
                          </h3>
                          <p className="text-sm text-[#1D2B44]/60 leading-relaxed">
                            {guide.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-[#1D2B44]/10">
                        <p className="text-xs font-medium text-[#1D2B44]/50 uppercase tracking-wide mb-2">
                          Contenu du guide
                        </p>
                        <ul className="space-y-1">
                          {guide.sections.map((section, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-[#1D2B44]/70">
                              <ChevronRight className="w-3 h-3 text-[#C0962E]" />
                              {section}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        href={`/information/guides/${guide.id}`}
                        className="mt-4 flex items-center gap-2 text-[#C0962E] font-medium hover:gap-3 transition-all"
                      >
                        Consulter le guide
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Communiqués Officiels */}
          {activeTab === 'communiques' && (
            <motion.div
              key="communiques"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {communiques.map((communique, index) => (
                <motion.div
                  key={communique.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${
                    communique.urgent ? 'border-[#7D1A1D]' : 'border-[#1D2B44]'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {communique.urgent && (
                            <span className="px-2 py-1 bg-[#7D1A1D] text-white text-xs font-medium rounded">
                              Nouveau
                            </span>
                          )}
                          <span className="text-xs text-[#1D2B44]/50 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {communique.date}
                          </span>
                        </div>
                        
                        <h3 className={`text-lg font-bold mb-2 ${
                          communique.urgent ? 'text-[#7D1A1D]' : 'text-[#1D2B44]'
                        }`}>
                          {communique.titre}
                        </h3>
                        
                        <p className="text-sm text-[#1D2B44]/70 mb-3">
                          {communique.resume}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs text-[#1D2B44]/50">
                          <Building2 className="w-3 h-3" />
                          {communique.source}
                        </div>
                      </div>
                      
                      <Link
                        href={`/information/communiques/${communique.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1D2B44]/5 text-[#1D2B44] rounded-lg hover:bg-[#1D2B44]/10 transition-colors text-sm font-medium"
                      >
                        Lire la suite
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="text-center pt-4">
                <Link
                  href="/information/communiques"
                  className="inline-flex items-center gap-2 text-[#1D2B44] hover:text-[#C0962E] transition-colors font-medium"
                >
                  Voir tous les communiqués
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Documentation PDF */}
          {activeTab === 'documents' && (
            <motion.div
              key="documents"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 bg-[#1D2B44]/5 border-b border-[#1D2B44]/10">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-[#1D2B44]">
                    <div className="col-span-6">Document</div>
                    <div className="col-span-2">Catégorie</div>
                    <div className="col-span-2">Format</div>
                    <div className="col-span-2 text-right">Action</div>
                  </div>
                </div>
                
                <div className="divide-y divide-[#1D2B44]/5">
                  {documentsPDF.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 hover:bg-[#1D2B44]/5 transition-colors"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#7D1A1D]/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-[#7D1A1D]" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1D2B44]">{doc.titre}</p>
                            <p className="text-xs text-[#1D2B44]/50">{doc.taille}</p>
                          </div>
                        </div>
                        
                        <div className="col-span-2">
                          <span className="text-sm text-[#1D2B44]/70">{doc.categorie}</span>
                        </div>
                        
                        <div className="col-span-2">
                          <span className="px-2 py-1 bg-[#1D2B44]/10 text-[#1D2B44] text-xs rounded">
                            {doc.format}
                          </span>
                        </div>
                        
                        <div className="col-span-2 text-right">
                          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C0962E] to-[#D4A842] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#C0962E]/30 transition-all text-sm">
                            <Download className="w-4 h-4" />
                            Télécharger
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="text-center text-sm text-[#1D2B44]/50 mt-4">
                En cas de difficulté de téléchargement, contactez le Greffe au +243 81 400 0000
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Foire Aux Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1D2B44]/5 rounded-full mb-4">
              <HelpCircle className="w-7 h-7 text-[#1D2B44]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1D2B44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Foire Aux Questions
            </h2>
            <p className="text-[#1D2B44]/60">
              Les réponses aux questions les plus fréquemment posées par nos usagers
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1D2B44]/5 transition-colors"
                >
                  <span className="font-bold text-[#1D2B44] pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C0962E] flex-shrink-0 transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="h-px bg-[#1D2B44]/10 mb-4" />
                        <p className="text-[#4A5568] leading-relaxed">
                          {item.reponse}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[#1D2B44]/60 mb-4">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D2B44] text-white rounded-lg font-medium hover:bg-[#2A3D5A] transition-colors"
            >
              <Users className="w-5 h-5" />
              Contactez-nous
            </Link>
          </div>
        </motion.div>

        {/* Accès rapides */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-[#1D2B44]/5 rounded-2xl p-8"
        >
          <h3 className="text-lg font-bold text-[#1D2B44] text-center mb-6">
            Accès Rapides
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/services/suivi-dossier"
              className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all text-center"
            >
              <div className="w-12 h-12 bg-[#C0962E]/10 rounded-full flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-[#C0962E]" />
              </div>
              <span className="font-medium text-[#1D2B44]">Suivi de Dossier</span>
            </Link>
            
            <Link
              href="/services/rendez-vous"
              className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all text-center"
            >
              <div className="w-12 h-12 bg-[#C0962E]/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#C0962E]" />
              </div>
              <span className="font-medium text-[#1D2B44]">Prendre RDV</span>
            </Link>
            
            <Link
              href="/cour/jurisprudence"
              className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all text-center"
            >
              <div className="w-12 h-12 bg-[#C0962E]/10 rounded-full flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#C0962E]" />
              </div>
              <span className="font-medium text-[#1D2B44]">Jurisprudence</span>
            </Link>
            
            <Link
              href="/contact"
              className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all text-center"
            >
              <div className="w-12 h-12 bg-[#C0962E]/10 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#C0962E]" />
              </div>
              <span className="font-medium text-[#1D2B44]">Nous Contacter</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
