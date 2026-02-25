'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Phone, Mail, MapPin, Award, Calendar, ChevronRight, Users, 
  Building2, Scale, FileText, BookOpen, Calculator, UserCog, Briefcase
} from 'lucide-react';
import Link from 'next/link';

/* ============================================
   INTERFACES
============================================ */

interface Personnel {
  id: string;
  nom: string;
  fonction: string;
  photo: string;
}

interface Divisionnaire {
  id: string;
  nom: string;
  prenom: string;
  photo: string;
  email: string;
  telephone: string;
}

interface Direction {
  id: string;
  nom: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  directeur: {
    nom: string;
    prenom: string;
    photo: string;
    dateNomination: string;
    email: string;
    telephone: string;
    bureau: string;
  };
  divisionnaires: Divisionnaire[];
  personnel: Personnel[];
}

interface GreffierEnChef {
  nom: string;
  prenom: string;
  titre: string;
  photo: string;
  dateNomination: string;
  email: string;
  telephone: string;
  bureau: string;
  distinctions: string[];
  biographie: string;
}

/* ============================================
   DONNÉES DU GREFFIER EN CHEF
============================================ */

const greffierEnChef: GreffierEnChef = {
  nom: 'KALOMBO',
  prenom: 'Marie-Thérèse',
  titre: 'Greffier en Chef',
  photo: '/greffe/greffier-chef.jpg',
  dateNomination: '8 Janvier 2019',
  email: 'greffier.chef@courdecassation.cd',
  telephone: '+243 81 400 0001',
  bureau: 'Bâtiment Principal, 1er étage, Bureau 101',
  distinctions: [
    'Officier de l\'Ordre National du Mérite',
    'Médaille d\'Excellence du Service Judiciaire',
    '30 ans de carrière dans la magistrature'
  ],
  biographie: 'Madame Marie-Thérèse KALOMBO dirige le Greffe de la Cour de Cassation depuis 2019. Forte de plus de 30 ans d\'expérience dans l\'administration judiciaire, elle supervise l\'ensemble des services du greffe et veille au bon fonctionnement administratif de la plus haute juridiction du pays.',
};

/* ============================================
   DONNÉES DES 7 DIRECTIONS
============================================ */

const directions: Direction[] = [
  {
    id: 'penal-1-cassation',
    nom: 'Pénal 1 Cassation',
    description: 'Gestion des dossiers de cassation en matière pénale, première section',
    icon: Scale,
    directeur: {
      nom: 'MBONGO',
      prenom: 'Pascal',
      photo: '/greffe/directeur-1.jpg',
      dateNomination: '15 Mars 2020',
      email: 'p.mbongo@courdecassation.cd',
      telephone: '+243 81 400 0101',
      bureau: 'Bâtiment B, 1er étage, Bureau 101',
    },
    divisionnaires: [
      { id: 'd1-1', nom: 'KIKWETE', prenom: 'Albert', photo: '/greffe/div1.jpg', email: 'a.kikwete@courdecassation.cd', telephone: '+243 81 400 1101' },
    ],
    personnel: [
      { id: 'p1-1', nom: 'NKULU Angèle', fonction: 'Greffier Principal', photo: '/greffe/p1.jpg' },
      { id: 'p1-2', nom: 'KASONGO Bernard', fonction: 'Greffier', photo: '/greffe/p2.jpg' },
      { id: 'p1-3', nom: 'MUKENDI Claire', fonction: 'Greffier', photo: '/greffe/p3.jpg' },
      { id: 'p1-4', nom: 'TSHILUMBA David', fonction: 'Secrétaire', photo: '/greffe/p4.jpg' },
      { id: 'p1-5', nom: 'NGALULA Emmanuel', fonction: 'Agent de Saisie', photo: '/greffe/p5.jpg' },
      { id: 'p1-6', nom: 'KABWE Françoise', fonction: 'Archiviste', photo: '/greffe/p6.jpg' },
    ],
  },
  {
    id: 'penal-2-appel-revision',
    nom: 'Pénal 2, Appel Révision',
    description: 'Traitement des appels et demandes de révision en matière pénale',
    icon: FileText,
    directeur: {
      nom: 'LUKUSA',
      prenom: 'Étienne',
      photo: '/greffe/directeur-2.jpg',
      dateNomination: '22 Juin 2019',
      email: 'e.lukusa@courdecassation.cd',
      telephone: '+243 81 400 0102',
      bureau: 'Bâtiment B, 1er étage, Bureau 102',
    },
    divisionnaires: [
      { id: 'd2-1', nom: 'MUTOMBO', prenom: 'Béatrice', photo: '/greffe/div2.jpg', email: 'b.mutombo@courdecassation.cd', telephone: '+243 81 400 1102' },
    ],
    personnel: [
      { id: 'p2-1', nom: 'MWAMBA Gisèle', fonction: 'Greffier Principal', photo: '/greffe/p1.jpg' },
      { id: 'p2-2', nom: 'KATANGA Henri', fonction: 'Greffier', photo: '/greffe/p2.jpg' },
      { id: 'p2-3', nom: 'NZUZI Isabelle', fonction: 'Greffier', photo: '/greffe/p3.jpg' },
      { id: 'p2-4', nom: 'KALOMBO Jean', fonction: 'Secrétaire', photo: '/greffe/p4.jpg' },
      { id: 'p2-5', nom: 'MBAYE Karine', fonction: 'Agent de Saisie', photo: '/greffe/p5.jpg' },
      { id: 'p2-6', nom: 'TSHISEKEDI Léon', fonction: 'Archiviste', photo: '/greffe/p6.jpg' },
    ],
  },
  {
    id: 'civil-1-cassation',
    nom: 'Civil I Cassation',
    description: 'Gestion des pourvois en cassation en matière civile, première section',
    icon: Briefcase,
    directeur: {
      nom: 'NGANDU',
      prenom: 'Sophie',
      photo: '/greffe/directeur-3.jpg',
      dateNomination: '10 Septembre 2020',
      email: 's.ngandu@courdecassation.cd',
      telephone: '+243 81 400 0103',
      bureau: 'Bâtiment A, 2ème étage, Bureau 201',
    },
    divisionnaires: [
      { id: 'd3-1', nom: 'KABAMBA', prenom: 'Christian', photo: '/greffe/div3.jpg', email: 'c.kabamba@courdecassation.cd', telephone: '+243 81 400 1103' },
    ],
    personnel: [
      { id: 'p3-1', nom: 'MULONGO Maurice', fonction: 'Greffier Principal', photo: '/greffe/p1.jpg' },
      { id: 'p3-2', nom: 'KABONGO Nicole', fonction: 'Greffier', photo: '/greffe/p2.jpg' },
      { id: 'p3-3', nom: 'ILUNGA Oscar', fonction: 'Greffier', photo: '/greffe/p3.jpg' },
      { id: 'p3-4', nom: 'MBUYI Pauline', fonction: 'Secrétaire', photo: '/greffe/p4.jpg' },
      { id: 'p3-5', nom: 'KAPINGA Quentin', fonction: 'Agent de Saisie', photo: '/greffe/p5.jpg' },
      { id: 'p3-6', nom: 'NKONGOLO Rachel', fonction: 'Archiviste', photo: '/greffe/p6.jpg' },
    ],
  },
  {
    id: 'civil-2-procedures-speciales',
    nom: 'Civil II Procédures Spéciales',
    description: 'Traitement des procédures spéciales et contentieux particuliers',
    icon: BookOpen,
    directeur: {
      nom: 'KATUMBA',
      prenom: 'Robert',
      photo: '/greffe/directeur-4.jpg',
      dateNomination: '5 Janvier 2021',
      email: 'r.katumba@courdecassation.cd',
      telephone: '+243 81 400 0104',
      bureau: 'Bâtiment A, 2ème étage, Bureau 202',
    },
    divisionnaires: [
      { id: 'd4-1', nom: 'NTUMBA', prenom: 'Denise', photo: '/greffe/div4.jpg', email: 'd.ntumba@courdecassation.cd', telephone: '+243 81 400 1104' },
    ],
    personnel: [
      { id: 'p4-1', nom: 'TSHIBANDA Sylvie', fonction: 'Greffier Principal', photo: '/greffe/p1.jpg' },
      { id: 'p4-2', nom: 'LUNDA Thierry', fonction: 'Greffier', photo: '/greffe/p2.jpg' },
      { id: 'p4-3', nom: 'MBULA Ursule', fonction: 'Greffier', photo: '/greffe/p3.jpg' },
      { id: 'p4-4', nom: 'KANKU Valentin', fonction: 'Secrétaire', photo: '/greffe/p4.jpg' },
      { id: 'p4-5', nom: 'NKASA William', fonction: 'Agent de Saisie', photo: '/greffe/p5.jpg' },
      { id: 'p4-6', nom: 'MWENZE Xavier', fonction: 'Archiviste', photo: '/greffe/p6.jpg' },
    ],
  },
  {
    id: 'cellule-etude',
    nom: 'Cellule d\'Étude',
    description: 'Recherche juridique, études et analyses des questions de droit',
    icon: BookOpen,
    directeur: {
      nom: 'BANZA',
      prenom: 'Augustin',
      photo: '/greffe/directeur-5.jpg',
      dateNomination: '18 Avril 2019',
      email: 'a.banza@courdecassation.cd',
      telephone: '+243 81 400 0105',
      bureau: 'Bâtiment C, 3ème étage, Bureau 301',
    },
    divisionnaires: [
      { id: 'd5-1', nom: 'KAYEMBE', prenom: 'Emmanuel', photo: '/greffe/div5.jpg', email: 'e.kayembe@courdecassation.cd', telephone: '+243 81 400 1105' },
    ],
    personnel: [
      { id: 'p5-1', nom: 'KAMWANYA Yvette', fonction: 'Juriste Principal', photo: '/greffe/p1.jpg' },
      { id: 'p5-2', nom: 'NZAMBI Zacharie', fonction: 'Juriste', photo: '/greffe/p2.jpg' },
      { id: 'p5-3', nom: 'KASAI Albertine', fonction: 'Juriste', photo: '/greffe/p3.jpg' },
      { id: 'p5-4', nom: 'MUSASA Benoît', fonction: 'Documentaliste', photo: '/greffe/p4.jpg' },
      { id: 'p5-5', nom: 'LUMANA Christelle', fonction: 'Assistante de Recherche', photo: '/greffe/p5.jpg' },
      { id: 'p5-6', nom: 'KABILA Dieudonné', fonction: 'Bibliothécaire', photo: '/greffe/p6.jpg' },
    ],
  },
  {
    id: 'recouvrement-archives-comptabilite',
    nom: 'Recouvrement, Archives et Comptabilité',
    description: 'Gestion financière, recouvrement des frais et conservation des archives',
    icon: Calculator,
    directeur: {
      nom: 'MWAMBA',
      prenom: 'Félicien',
      photo: '/greffe/directeur-6.jpg',
      dateNomination: '12 Août 2020',
      email: 'f.mwamba@courdecassation.cd',
      telephone: '+243 81 400 0106',
      bureau: 'Bâtiment Principal, Rez-de-chaussée, Bureau 001',
    },
    divisionnaires: [
      { id: 'd6-1', nom: 'ILUNGA', prenom: 'Françoise', photo: '/greffe/div6.jpg', email: 'f.ilunga@courdecassation.cd', telephone: '+243 81 400 1106' },
    ],
    personnel: [
      { id: 'p6-1', nom: 'NGOIE Édith', fonction: 'Comptable Principal', photo: '/greffe/p1.jpg' },
      { id: 'p6-2', nom: 'KALUNGA Fabrice', fonction: 'Comptable', photo: '/greffe/p2.jpg' },
      { id: 'p6-3', nom: 'TSHIBUABUA Grâce', fonction: 'Agent de Recouvrement', photo: '/greffe/p3.jpg' },
      { id: 'p6-4', nom: 'MUKENDI Hilaire', fonction: 'Archiviste Principal', photo: '/greffe/p4.jpg' },
      { id: 'p6-5', nom: 'NGANDU Irène', fonction: 'Archiviste', photo: '/greffe/p5.jpg' },
      { id: 'p6-6', nom: 'KABWE Jules', fonction: 'Agent Administratif', photo: '/greffe/p6.jpg' },
    ],
  },
  {
    id: 'ressources-humaines',
    nom: 'Ressources Humaines',
    description: 'Gestion du personnel, carrières et formation continue',
    icon: UserCog,
    directeur: {
      nom: 'KALUBI',
      prenom: 'Martine',
      photo: '/greffe/directeur-7.jpg',
      dateNomination: '3 Novembre 2019',
      email: 'm.kalubi@courdecassation.cd',
      telephone: '+243 81 400 0107',
      bureau: 'Bâtiment Principal, 2ème étage, Bureau 201',
    },
    divisionnaires: [
      { id: 'd7-1', nom: 'KASONGO', prenom: 'Gérard', photo: '/greffe/div7.jpg', email: 'g.kasongo@courdecassation.cd', telephone: '+243 81 400 1107' },
      { id: 'd7-2', nom: 'MBAYA', prenom: 'Hélène', photo: '/greffe/div8.jpg', email: 'h.mbaya@courdecassation.cd', telephone: '+243 81 400 1108' },
      { id: 'd7-3', nom: 'NZAMBI', prenom: 'Igor', photo: '/greffe/div9.jpg', email: 'i.nzambi@courdecassation.cd', telephone: '+243 81 400 1109' },
    ],
    personnel: [
      { id: 'p7-1', nom: 'LUKUSA Karine', fonction: 'Responsable RH', photo: '/greffe/p1.jpg' },
      { id: 'p7-2', nom: 'MBONGO Léopold', fonction: 'Gestionnaire de Carrières', photo: '/greffe/p2.jpg' },
      { id: 'p7-3', nom: 'NKULU Madeleine', fonction: 'Chargée de Formation', photo: '/greffe/p3.jpg' },
      { id: 'p7-4', nom: 'TSHILOMBO Nicolas', fonction: 'Assistant RH', photo: '/greffe/p4.jpg' },
      { id: 'p7-5', nom: 'KAPINGA Odette', fonction: 'Secrétaire RH', photo: '/greffe/p5.jpg' },
      { id: 'p7-6', nom: 'MULONGO Patrick', fonction: 'Agent Administratif', photo: '/greffe/p6.jpg' },
    ],
  },
];

/* ============================================
   COMPOSANT CARTE DIRECTION
============================================ */
function DirectionCard({ 
  direction, 
  onSelect,
  index
}: { 
  direction: Direction; 
  onSelect: (direction: Direction) => void;
  index: number;
}) {
  const Icon = direction.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-xl shadow-lg overflow-hidden border border-[#1D2B44]/10 hover:shadow-xl hover:border-[#C0962E]/30 transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(direction)}
    >
      {/* En-tête avec icône */}
      <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#C0962E]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 bg-[#C0962E]/20 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#C0962E]" />
          </div>
          <div>
            <h3 className="text-white font-bold">{direction.nom}</h3>
            <p className="text-white/60 text-xs">{direction.personnel.length} agents</p>
          </div>
        </div>
      </div>

      {/* Directeur */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1D2B44]/10 to-[#1D2B44]/20 border-2 border-[#1D2B44]/20 flex items-center justify-center">
            <span className="text-lg font-bold text-[#1D2B44]/60">
              {direction.directeur.prenom[0]}{direction.directeur.nom[0]}
            </span>
          </div>
          <div>
            <p className="text-xs text-[#7D1A1D] font-semibold uppercase">Directeur</p>
            <p className="font-semibold text-[#1D2B44]">
              {direction.directeur.prenom} {direction.directeur.nom}
            </p>
          </div>
        </div>

        <p className="text-xs text-[#1D2B44]/60 line-clamp-2 mb-4">
          {direction.description}
        </p>

        {/* Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-[#1D2B44]/50">
            <Calendar className="w-3 h-3" />
            <span>Depuis {direction.directeur.dateNomination}</span>
          </div>
          <span className="text-xs font-semibold text-[#C0962E] group-hover:text-[#7D1A1D] transition-colors flex items-center gap-1">
            Voir équipe
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================
   COMPOSANT MODAL DIRECTION
============================================ */
function DirectionModal({ 
  direction, 
  onClose 
}: { 
  direction: Direction; 
  onClose: () => void;
}) {
  const Icon = direction.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-[#F8F9FA] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] p-5 relative">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#C0962E]/20 rounded-xl flex items-center justify-center">
              <Icon className="w-7 h-7 text-[#C0962E]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                {direction.nom}
              </h2>
              <p className="text-white/70 text-sm">{direction.description}</p>
            </div>
          </div>
        </div>

        {/* Directeur */}
        <div className="p-5 bg-white border-b border-[#1D2B44]/10">
          <h3 className="text-sm font-bold text-[#7D1A1D] uppercase mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#7D1A1D] rounded-full"></span>
            Directeur
          </h3>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#1D2B44] to-[#2A3D5A] flex items-center justify-center">
              <span className="text-2xl font-bold text-[#C0962E]">
                {direction.directeur.prenom[0]}{direction.directeur.nom[0]}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-[#1D2B44]">
                {direction.directeur.prenom} {direction.directeur.nom}
              </h4>
              <p className="text-sm text-[#C0962E] font-medium mb-2">Directeur de la {direction.nom}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-[#1D2B44]/70">
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#C0962E]" />
                  <span>{direction.directeur.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#C0962E]" />
                  <span>{direction.directeur.telephone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C0962E]" />
                  <span>{direction.directeur.bureau}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divisionnaires */}
        {direction.divisionnaires.length > 0 && (
          <div className="p-5 bg-[#F8F9FA] border-b border-[#1D2B44]/10">
            <h3 className="text-sm font-bold text-[#C0962E] uppercase mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#C0962E] rounded-full"></span>
              Divisionnaire{direction.divisionnaires.length > 1 ? 's' : ''} ({direction.divisionnaires.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {direction.divisionnaires.map((div, index) => (
                <motion.div
                  key={div.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg p-3 shadow-sm border border-[#C0962E]/20 hover:border-[#C0962E]/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C0962E]/20 to-[#C0962E]/30 border-2 border-[#C0962E]/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-[#C0962E]">
                        {div.prenom[0]}{div.nom[0]}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-[#1D2B44] text-sm truncate">
                        {div.prenom} {div.nom}
                      </h4>
                      <p className="text-[10px] text-[#C0962E] font-medium">Divisionnaire</p>
                      <div className="flex flex-col gap-0.5 mt-1">
                        <div className="flex items-center gap-1 text-[9px] text-[#1D2B44]/60">
                          <Mail className="w-2.5 h-2.5" />
                          <span className="truncate">{div.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[9px] text-[#1D2B44]/60">
                          <Phone className="w-2.5 h-2.5" />
                          <span>{div.telephone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Personnel */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-320px)]">
          <h3 className="text-sm font-bold text-[#1D2B44] uppercase mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#C0962E] rounded-full"></span>
            Personnel ({direction.personnel.length} agents)
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {direction.personnel.map((membre, index) => (
              <motion.div
                key={membre.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg p-3 shadow-sm border border-[#1D2B44]/10 hover:border-[#C0962E]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1D2B44]/10 to-[#1D2B44]/20 border-2 border-[#1D2B44]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#1D2B44]/60">
                      {membre.nom.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[#1D2B44] text-sm truncate">
                      {membre.nom}
                    </h4>
                    <p className="text-[10px] text-[#7D1A1D] font-medium">
                      {membre.fonction}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#1D2B44]/5 px-5 py-3 border-t border-[#1D2B44]/10">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#1D2B44]/60">
              Greffe de la Cour de Cassation • RDC
            </p>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-[#1D2B44] text-white rounded-lg hover:bg-[#2A3D5A] transition-colors text-xs font-medium"
            >
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================
   PAGE PRINCIPALE
============================================ */
export default function GreffePage() {
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1D2B44] via-[#2A3D5A] to-[#1D2B44] py-12 relative overflow-hidden">
        {/* Pattern décoratif */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm">
            <Link href="/" className="text-white/60 hover:text-[#C0962E] transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <Link href="/cour" className="text-white/60 hover:text-[#C0962E] transition-colors">
              La Cour
            </Link>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-[#C0962E]">Le Greffe</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#C0962E]/20 rounded-full text-[#C0962E] text-sm font-medium mb-4"
            >
              <Building2 className="w-4 h-4" />
              Administration Judiciaire
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Le Greffe de la Cour de Cassation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-white/70"
            >
              Service central de gestion administrative et juridique composé de 7 directions
              au service de la plus haute juridiction du pays
            </motion.p>
          </div>
        </div>
      </section>

      {/* Section Greffier en Chef */}
      <section className="py-10 bg-white border-b border-[#1D2B44]/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1 h-6 bg-[#7D1A1D] rounded-full"></span>
              <h2 className="text-xl font-bold text-[#1D2B44]">Le Greffier en Chef</h2>
            </div>

            <div className="bg-gradient-to-br from-[#F8F9FA] to-white rounded-2xl shadow-lg border border-[#1D2B44]/10 overflow-hidden">
              <div className="md:flex">
                {/* Photo et identité */}
                <div className="md:w-1/3 bg-gradient-to-br from-[#1D2B44] to-[#2A3D5A] p-6 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-2xl bg-[#C0962E]/20 border-4 border-[#C0962E]/40 flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-[#C0962E]">
                      {greffierEnChef.prenom[0]}{greffierEnChef.nom[0]}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {greffierEnChef.prenom} {greffierEnChef.nom}
                  </h3>
                  <p className="text-[#C0962E] font-medium text-center">{greffierEnChef.titre}</p>
                  <div className="mt-3 flex items-center gap-1 text-white/60 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>Depuis le {greffierEnChef.dateNomination}</span>
                  </div>
                </div>

                {/* Informations */}
                <div className="md:w-2/3 p-6">
                  <p className="text-[#1D2B44]/80 text-sm mb-4 leading-relaxed">
                    {greffierEnChef.biographie}
                  </p>

                  {/* Distinctions */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#7D1A1D] uppercase mb-2">Distinctions</h4>
                    <div className="flex flex-wrap gap-2">
                      {greffierEnChef.distinctions.map((distinction, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-[#C0962E]/10 text-[#1D2B44] text-xs rounded-full"
                        >
                          <Award className="w-3 h-3 text-[#C0962E]" />
                          {distinction}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#1D2B44]/70">
                      <div className="w-8 h-8 rounded-lg bg-[#1D2B44]/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-[#C0962E]" />
                      </div>
                      <span className="truncate">{greffierEnChef.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1D2B44]/70">
                      <div className="w-8 h-8 rounded-lg bg-[#1D2B44]/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-[#C0962E]" />
                      </div>
                      <span>{greffierEnChef.telephone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1D2B44]/70">
                      <div className="w-8 h-8 rounded-lg bg-[#1D2B44]/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#C0962E]" />
                      </div>
                      <span className="truncate">{greffierEnChef.bureau}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Directions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1 h-6 bg-[#C0962E] rounded-full"></span>
            <h2 className="text-xl font-bold text-[#1D2B44]">Les 7 Directions du Greffe</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {directions.map((direction, index) => (
              <DirectionCard
                key={direction.id}
                direction={direction}
                onSelect={setSelectedDirection}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Organigramme simplifié */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1 h-6 bg-[#1D2B44] rounded-full"></span>
            <h2 className="text-xl font-bold text-[#1D2B44]">Organisation du Greffe</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Greffier en Chef */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-[#7D1A1D] to-[#9D2A2D] text-white px-6 py-3 rounded-xl shadow-lg">
                <p className="text-xs uppercase tracking-wide opacity-80">Direction Générale</p>
                <p className="font-bold">{greffierEnChef.prenom} {greffierEnChef.nom}</p>
                <p className="text-sm opacity-90">{greffierEnChef.titre}</p>
              </div>
              <div className="w-px h-8 bg-[#1D2B44]/30 mx-auto" />
            </div>

            {/* Ligne horizontale */}
            <div className="relative mb-8">
              <div className="absolute left-1/2 -translate-x-1/2 w-[90%] h-px bg-[#1D2B44]/30" />
              <div className="flex justify-center">
                <div className="w-3 h-3 rounded-full bg-[#C0962E] relative z-10" />
              </div>
            </div>

            {/* Directions */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {directions.map((direction) => {
                const Icon = direction.icon;
                return (
                  <motion.div
                    key={direction.id}
                    whileHover={{ scale: 1.05 }}
                    className="text-center cursor-pointer"
                    onClick={() => setSelectedDirection(direction)}
                  >
                    <div className="w-px h-6 bg-[#1D2B44]/30 mx-auto" />
                    <div className="bg-[#1D2B44] text-white p-3 rounded-lg shadow hover:bg-[#2A3D5A] transition-colors">
                      <Icon className="w-5 h-5 text-[#C0962E] mx-auto mb-1" />
                      <p className="text-[9px] font-medium leading-tight">{direction.nom}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Direction */}
      <AnimatePresence>
        {selectedDirection && (
          <DirectionModal
            direction={selectedDirection}
            onClose={() => setSelectedDirection(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
