'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Award, Calendar, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/* ============================================
   DONNÉES DES PRÉSIDENTS ET LEURS CABINETS
============================================ */

interface CabinetMember {
  id: string;
  nom: string;
  fonction: string;
  photo: string;
}

interface President {
  id: string;
  nom: string;
  prenom: string;
  titre: string;
  chambre: string;
  photo: string;
  dateNomination: string;
  email: string;
  telephone: string;
  bureau: string;
  distinctions: string[];
  cabinet: CabinetMember[];
}

const presidentsData: President[] = [
  {
    id: 'president-1',
    nom: 'MBULU',
    prenom: 'Jean-Pierre',
    titre: 'Président de Chambre',
    chambre: 'Chambre Civile 1',
    photo: '/presidents/president-1.jpg',
    dateNomination: '15 Mars 2020',
    email: 'jp.mbulu@courdecassation.cd',
    telephone: '+243 81 234 5678',
    bureau: 'Bâtiment A, 3ème étage, Bureau 301',
    distinctions: ['Officier de l\'Ordre National', 'Médaille du Mérite Judiciaire'],
    cabinet: [
      { id: 'cab-1-1', nom: 'KALOMBO Marie-Claire', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-1-2', nom: 'NZUZI Patrick', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-1-3', nom: 'MUKENDI Françoise', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-1-4', nom: 'TSHILOMBO Alain', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-1-5', nom: 'KABONGO Sylvie', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-1-6', nom: 'MBUYI David', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-1-7', nom: 'LUKUSA Béatrice', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-1-8', nom: 'KASONGO Emmanuel', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
  {
    id: 'president-2',
    nom: 'LUMUMBA',
    prenom: 'François',
    titre: 'Président de Chambre',
    chambre: 'Chambre Civile 2',
    photo: '/presidents/president-2.jpg',
    dateNomination: '22 Juin 2019',
    email: 'f.lumumba@courdecassation.cd',
    telephone: '+243 81 234 5679',
    bureau: 'Bâtiment A, 3ème étage, Bureau 302',
    distinctions: ['Commandeur de l\'Ordre National', 'Prix d\'Excellence Juridique'],
    cabinet: [
      { id: 'cab-2-1', nom: 'MWAMBA Christine', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-2-2', nom: 'NGALULA Pierre', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-2-3', nom: 'KAPINGA Solange', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-2-4', nom: 'TSHIBANGU Michel', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-2-5', nom: 'MUTOMBO Grâce', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-2-6', nom: 'KABILA Joseph', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-2-7', nom: 'NKULU Pauline', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-2-8', nom: 'MWENZE Robert', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
  {
    id: 'president-3',
    nom: 'KASAVUBU',
    prenom: 'André',
    titre: 'Président de Chambre',
    chambre: 'Chambre Pénale 1',
    photo: '/presidents/president-3.jpg',
    dateNomination: '10 Janvier 2021',
    email: 'a.kasavubu@courdecassation.cd',
    telephone: '+243 81 234 5680',
    bureau: 'Bâtiment B, 2ème étage, Bureau 201',
    distinctions: ['Grand Officier de l\'Ordre National'],
    cabinet: [
      { id: 'cab-3-1', nom: 'BANZA Elisabeth', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-3-2', nom: 'KALONJI Marc', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-3-3', nom: 'MULONGO Thérèse', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-3-4', nom: 'NGANDU William', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-3-5', nom: 'KABWE Justine', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-3-6', nom: 'TSHISEKEDI Bruno', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-3-7', nom: 'MUKEBA Odette', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-3-8', nom: 'LUMANA Charles', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
  {
    id: 'president-4',
    nom: 'MOBUTU',
    prenom: 'Sébastien',
    titre: 'Président de Chambre',
    chambre: 'Chambre Pénale 2',
    photo: '/presidents/president-4.jpg',
    dateNomination: '5 Septembre 2018',
    email: 's.mobutu@courdecassation.cd',
    telephone: '+243 81 234 5681',
    bureau: 'Bâtiment B, 2ème étage, Bureau 202',
    distinctions: ['Chevalier de l\'Ordre National', 'Médaille d\'Honneur'],
    cabinet: [
      { id: 'cab-4-1', nom: 'KATANGA Marguerite', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-4-2', nom: 'LUNDA François', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-4-3', nom: 'MBOMBO Cécile', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-4-4', nom: 'NGOY Pascal', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-4-5', nom: 'KABUYA Nadine', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-4-6', nom: 'MONGA Victor', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-4-7', nom: 'NSIMBA Louise', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-4-8', nom: 'KAMBALE Samuel', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
  {
    id: 'president-5',
    nom: 'TSHOMBE',
    prenom: 'Martin',
    titre: 'Président de Chambre',
    chambre: 'Chambre Procédure Spéciale',
    photo: '/presidents/president-5.jpg',
    dateNomination: '18 Avril 2020',
    email: 'm.tshombe@courdecassation.cd',
    telephone: '+243 81 234 5682',
    bureau: 'Bâtiment C, 1er étage, Bureau 101',
    distinctions: ['Grand Croix de l\'Ordre National'],
    cabinet: [
      { id: 'cab-5-1', nom: 'ILUNGA Patricia', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-5-2', nom: 'KATUMBA Jean', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-5-3', nom: 'NGOYI Henriette', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-5-4', nom: 'MBUYU Georges', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-5-5', nom: 'KALENGA Diane', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-5-6', nom: 'NLANDU Patrice', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-5-7', nom: 'MBAYA Claudine', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-5-8', nom: 'KYUNGU Richard', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
  {
    id: 'president-6',
    nom: 'KIMBANGU',
    prenom: 'Paul',
    titre: 'Président de Chambre',
    chambre: 'Section des Requêtes',
    photo: '/presidents/president-6.jpg',
    dateNomination: '7 Novembre 2019',
    email: 'p.kimbangu@courdecassation.cd',
    telephone: '+243 81 234 5683',
    bureau: 'Bâtiment A, 4ème étage, Bureau 401',
    distinctions: ['Officier de l\'Ordre du Mérite'],
    cabinet: [
      { id: 'cab-6-1', nom: 'MALULA Thérèse', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-6-2', nom: 'KIKWETE Albert', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-6-3', nom: 'NSEKA Angèle', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-6-4', nom: 'MUTAMBA Roger', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-6-5', nom: 'KABANGU Sophie', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-6-6', nom: 'LWAMBA Didier', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-6-7', nom: 'NTUMBA Bernadette', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-6-8', nom: 'KASALA Thomas', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
  {
    id: 'president-7',
    nom: 'NGANDU',
    prenom: 'Étienne',
    titre: 'Président de Chambre',
    chambre: 'Section Commerciale',
    photo: '/presidents/president-7.jpg',
    dateNomination: '25 Février 2021',
    email: 'e.ngandu@courdecassation.cd',
    telephone: '+243 81 234 5684',
    bureau: 'Bâtiment B, 3ème étage, Bureau 301',
    distinctions: ['Commandeur du Mérite Civique'],
    cabinet: [
      { id: 'cab-7-1', nom: 'TSHIBOLA Marie', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-7-2', nom: 'MUKUNA Bernard', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-7-3', nom: 'KAPANGA Jeanne', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-7-4', nom: 'MBELE Gustave', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-7-5', nom: 'KALUBI Florence', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-7-6', nom: 'NKONGOLO André', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-7-7', nom: 'MUSANGU Rachel', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-7-8', nom: 'KABEYA Simon', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
  {
    id: 'president-8',
    nom: 'LUKUSA',
    prenom: 'Désiré',
    titre: 'Président de Chambre',
    chambre: 'Section Sociale',
    photo: '/presidents/president-8.jpg',
    dateNomination: '3 Août 2020',
    email: 'd.lukusa@courdecassation.cd',
    telephone: '+243 81 234 5685',
    bureau: 'Bâtiment C, 2ème étage, Bureau 201',
    distinctions: ['Chevalier du Mérite Judiciaire', 'Médaille d\'Excellence'],
    cabinet: [
      { id: 'cab-8-1', nom: 'MBOMBO Jacqueline', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-8-2', nom: 'TSHILUMBA Henri', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-8-3', nom: 'NGALULA Martine', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-8-4', nom: 'KABWE Olivier', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-8-5', nom: 'MWAMBA Esther', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-8-6', nom: 'NZUZI Christian', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-8-7', nom: 'KATENDA Miriam', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-8-8', nom: 'LUMBU Gabriel', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
  {
    id: 'president-9',
    nom: 'MWAMBA',
    prenom: 'Gabriel',
    titre: 'Président de Chambre',
    chambre: 'Section Administrative',
    photo: '/presidents/president-9.jpg',
    dateNomination: '12 Décembre 2018',
    email: 'g.mwamba@courdecassation.cd',
    telephone: '+243 81 234 5686',
    bureau: 'Bâtiment A, 5ème étage, Bureau 501',
    distinctions: ['Grand Officier du Mérite National'],
    cabinet: [
      { id: 'cab-9-1', nom: 'KASONGO Monique', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-9-2', nom: 'MULONGO Félix', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-9-3', nom: 'NKULU Catherine', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-9-4', nom: 'TSHISEKEDI Blaise', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-9-5', nom: 'KABONGO Élisabeth', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-9-6', nom: 'MBUYA Laurent', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-9-7', nom: 'NSIMBA Véronique', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-9-8', nom: 'KALOMBO Philippe', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
  {
    id: 'president-10',
    nom: 'KATANGA',
    prenom: 'Michel',
    titre: 'Président de Chambre',
    chambre: 'Section des Avis',
    photo: '/presidents/president-10.jpg',
    dateNomination: '28 Mai 2019',
    email: 'm.katanga@courdecassation.cd',
    telephone: '+243 81 234 5687',
    bureau: 'Bâtiment B, 4ème étage, Bureau 401',
    distinctions: ['Officier de l\'Ordre du Léopard'],
    cabinet: [
      { id: 'cab-10-1', nom: 'MBONGO Rosalie', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-10-2', nom: 'KANYINDA Joseph', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-10-3', nom: 'TSHIBANDA Gisèle', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-10-4', nom: 'NGOMA Raphaël', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-10-5', nom: 'KABILA Nadège', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-10-6', nom: 'MUTOMBO Émile', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-10-7', nom: 'NKWASA Brigitte', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-10-8', nom: 'LUBAMBA Alex', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
  {
    id: 'president-11',
    nom: 'BANZA',
    prenom: 'Robert',
    titre: 'Président de Chambre',
    chambre: 'Section des Contentieux',
    photo: '/presidents/president-11.jpg',
    dateNomination: '9 Juillet 2020',
    email: 'r.banza@courdecassation.cd',
    telephone: '+243 81 234 5688',
    bureau: 'Bâtiment C, 3ème étage, Bureau 301',
    distinctions: ['Commandeur de l\'Ordre du Zaire', 'Médaille de la Magistrature'],
    cabinet: [
      { id: 'cab-11-1', nom: 'KALONDA Stéphanie', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-11-2', nom: 'MBAYA Ernest', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-11-3', nom: 'NGOIE Antoinette', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-11-4', nom: 'KALUNGA Denis', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-11-5', nom: 'MUSASA Joséphine', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-11-6', nom: 'TSHIMANGA Paul', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-11-7', nom: 'NGANDU Clémence', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-11-8', nom: 'MUKENDI Arthur', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
  {
    id: 'president-12',
    nom: 'ILUNGA',
    prenom: 'Joseph',
    titre: 'Président de Chambre',
    chambre: 'Section de Documentation',
    photo: '/presidents/president-12.jpg',
    dateNomination: '14 Octobre 2021',
    email: 'j.ilunga@courdecassation.cd',
    telephone: '+243 81 234 5689',
    bureau: 'Bâtiment A, 6ème étage, Bureau 601',
    distinctions: ['Chevalier de l\'Ordre National', 'Prix d\'Honneur'],
    cabinet: [
      { id: 'cab-12-1', nom: 'KAMWANYA Pascaline', fonction: 'Chef de Cabinet', photo: '/cabinet/member-1.jpg' },
      { id: 'cab-12-2', nom: 'NKASA Raymond', fonction: 'Conseiller Juridique Principal', photo: '/cabinet/member-2.jpg' },
      { id: 'cab-12-3', nom: 'MBULA Céline', fonction: 'Secrétaire Particulière', photo: '/cabinet/member-3.jpg' },
      { id: 'cab-12-4', nom: 'TSHIBUABUA Hervé', fonction: 'Attaché de Cabinet', photo: '/cabinet/member-4.jpg' },
      { id: 'cab-12-5', nom: 'KANKU Félicité', fonction: 'Chargée de Communication', photo: '/cabinet/member-5.jpg' },
      { id: 'cab-12-6', nom: 'MWENZE Aristide', fonction: 'Assistant Administratif', photo: '/cabinet/member-6.jpg' },
      { id: 'cab-12-7', nom: 'NZAMBI Jocelyne', fonction: 'Documentaliste', photo: '/cabinet/member-7.jpg' },
      { id: 'cab-12-8', nom: 'KASAI Matthieu', fonction: 'Agent de Liaison', photo: '/cabinet/member-8.jpg' },
    ],
  },
];

/* ============================================
   COMPOSANT CARTE PRÉSIDENT
============================================ */
function PresidentCard({ 
  president, 
  onSelect 
}: { 
  president: President; 
  onSelect: (president: President) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-[#1D2B44]/10 hover:shadow-xl hover:border-[#C0962E]/30 transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(president)}
    >
      {/* Photo */}
      <div className="relative h-64 bg-gradient-to-br from-[#1D2B44] to-[#2A3D5A] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Placeholder avec initiales */}
          <div className="w-32 h-32 rounded-full bg-[#C0962E]/20 border-4 border-[#C0962E]/40 flex items-center justify-center">
            <span className="text-4xl font-bold text-[#C0962E]">
              {president.prenom[0]}{president.nom[0]}
            </span>
          </div>
        </div>
        
        {/* Badge Chambre */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold bg-[#7D1A1D] text-white rounded-full">
            {president.chambre}
          </span>
        </div>

        {/* Effet hover */}
        <div className="absolute inset-0 bg-[#1D2B44]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-4 py-2 bg-[#C0962E] text-[#1D2B44] font-semibold rounded-lg flex items-center gap-2">
            Voir le Cabinet
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Infos */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#1D2B44] mb-1">
          {president.prenom} {president.nom}
        </h3>
        <p className="text-sm text-[#C0962E] font-medium mb-3">
          {president.titre}
        </p>
        
        <div className="flex items-center gap-2 text-xs text-[#1D2B44]/60">
          <Calendar className="w-3.5 h-3.5" />
          <span>Depuis le {president.dateNomination}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================
   COMPOSANT MODAL CABINET
============================================ */
function CabinetModal({ 
  president, 
  onClose 
}: { 
  president: President; 
  onClose: () => void;
}) {
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
        className="bg-[#F8F9FA] rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec infos du Président */}
        <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-6">
            {/* Photo Président */}
            <div className="w-24 h-24 rounded-2xl bg-[#C0962E]/20 border-4 border-[#C0962E]/40 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-[#C0962E]">
                {president.prenom[0]}{president.nom[0]}
              </span>
            </div>
            
            <div className="flex-1">
              <span className="px-3 py-1 text-xs font-semibold bg-[#7D1A1D] text-white rounded-full inline-block mb-2">
                {president.chambre}
              </span>
              <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {president.prenom} {president.nom}
              </h2>
              <p className="text-[#C0962E] font-medium">{president.titre}</p>
            </div>
          </div>

          {/* Infos contact */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Mail className="w-4 h-4 text-[#C0962E]" />
              <span>{president.email}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Phone className="w-4 h-4 text-[#C0962E]" />
              <span>{president.telephone}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin className="w-4 h-4 text-[#C0962E]" />
              <span>{president.bureau}</span>
            </div>
          </div>

          {/* Distinctions */}
          {president.distinctions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {president.distinctions.map((distinction, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 text-white/90 text-xs rounded-full"
                >
                  <Award className="w-3 h-3 text-[#C0962E]" />
                  {distinction}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Corps - Membres du Cabinet */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          <h3 className="text-xl font-bold text-[#1D2B44] mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#C0962E] rounded-full"></span>
            Membres du Cabinet ({president.cabinet.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {president.cabinet.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-md border border-[#1D2B44]/10 hover:border-[#C0962E]/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Photo membre */}
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#1D2B44]/10 to-[#1D2B44]/20 border-3 border-[#1D2B44]/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#1D2B44]/60">
                    {member.nom.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                {/* Infos membre */}
                <div className="text-center">
                  <h4 className="font-semibold text-[#1D2B44] text-sm mb-1 line-clamp-2">
                    {member.nom}
                  </h4>
                  <p className="text-xs text-[#7D1A1D] font-medium">
                    {member.fonction}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#1D2B44]/5 px-6 py-4 border-t border-[#1D2B44]/10">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#1D2B44]/60">
              Cour de Cassation • République Démocratique du Congo
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1D2B44] text-white rounded-lg hover:bg-[#2A3D5A] transition-colors text-sm font-medium"
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
export default function PresidentsChambresPage() {
  const [selectedPresident, setSelectedPresident] = useState<President | null>(null);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1D2B44] via-[#2A3D5A] to-[#1D2B44] py-16 relative overflow-hidden">
        {/* Pattern décoratif */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm">
            <Link href="/" className="text-white/60 hover:text-[#C0962E] transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <Link href="/cour" className="text-white/60 hover:text-[#C0962E] transition-colors">
              La Cour
            </Link>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-[#C0962E]">Les Présidents</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#C0962E]/20 rounded-full text-[#C0962E] text-sm font-medium mb-6"
            >
              <Award className="w-4 h-4" />
              Autorités de la Cour
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Les Présidents de Chambre
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/70"
            >
              Découvrez les magistrats qui président les différentes chambres et sections
              de la Cour de Cassation de la République Démocratique du Congo
            </motion.p>
          </div>
        </div>
      </section>

      {/* Grille des Présidents */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1D2B44] mb-2">
                {presidentsData.length} Présidents de Chambre
              </h2>
              <p className="text-[#1D2B44]/60">
                Cliquez sur un président pour découvrir les membres de son cabinet
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {presidentsData.map((president) => (
              <PresidentCard
                key={president.id}
                president={president}
                onSelect={setSelectedPresident}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal Cabinet */}
      <AnimatePresence>
        {selectedPresident && (
          <CabinetModal
            president={selectedPresident}
            onClose={() => setSelectedPresident(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
