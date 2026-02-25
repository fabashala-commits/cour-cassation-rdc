'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Award, Calendar, ChevronRight, Users, Search } from 'lucide-react';
import Link from 'next/link';

/* ============================================
   DONNÉES DES CONSEILLERS ET LEURS CABINETS
============================================ */

interface CabinetMember {
  id: string;
  nom: string;
  fonction: string;
  photo: string;
}

interface Conseiller {
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
  specialite: string;
  cabinet: CabinetMember[];
}

// Génération des 43 conseillers avec leurs cabinets de 5 membres
const conseillersData: Conseiller[] = [
  {
    id: 'conseiller-1',
    nom: 'KABONGO',
    prenom: 'Pierre',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Civile 1',
    photo: '/conseillers/conseiller-1.jpg',
    dateNomination: '12 Mars 2019',
    email: 'p.kabongo@courdecassation.cd',
    telephone: '+243 81 300 0001',
    bureau: 'Bâtiment A, 2ème étage, Bureau 201',
    specialite: 'Droit des Contrats',
    cabinet: [
      { id: 'cab-1-1', nom: 'MWAMBA Sylvie', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-1-2', nom: 'NKULU Patrick', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-1-3', nom: 'KALOMBO Jean', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-1-4', nom: 'TSHILOMBO Marie', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-1-5', nom: 'MUKENDI Alain', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-2',
    nom: 'MULONGO',
    prenom: 'André',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Civile 1',
    photo: '/conseillers/conseiller-2.jpg',
    dateNomination: '5 Juin 2018',
    email: 'a.mulongo@courdecassation.cd',
    telephone: '+243 81 300 0002',
    bureau: 'Bâtiment A, 2ème étage, Bureau 202',
    specialite: 'Droit de la Famille',
    cabinet: [
      { id: 'cab-2-1', nom: 'KASONGO Thérèse', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-2-2', nom: 'NZUZI Bernard', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-2-3', nom: 'KAPINGA Marc', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-2-4', nom: 'MBOMBO Claire', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-2-5', nom: 'LUKUSA David', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-3',
    nom: 'TSHISEKEDI',
    prenom: 'Joseph',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Civile 1',
    photo: '/conseillers/conseiller-3.jpg',
    dateNomination: '22 Septembre 2020',
    email: 'j.tshisekedi@courdecassation.cd',
    telephone: '+243 81 300 0003',
    bureau: 'Bâtiment A, 2ème étage, Bureau 203',
    specialite: 'Droit Immobilier',
    cabinet: [
      { id: 'cab-3-1', nom: 'BANZA Monique', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-3-2', nom: 'NGANDU Emmanuel', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-3-3', nom: 'MBUYI Françoise', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-3-4', nom: 'KALUNGA Victor', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-3-5', nom: 'NSIMBA Paul', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-4',
    nom: 'KANYINDA',
    prenom: 'François',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Civile 2',
    photo: '/conseillers/conseiller-4.jpg',
    dateNomination: '15 Janvier 2019',
    email: 'f.kanyinda@courdecassation.cd',
    telephone: '+243 81 300 0004',
    bureau: 'Bâtiment A, 2ème étage, Bureau 204',
    specialite: 'Droit Commercial',
    cabinet: [
      { id: 'cab-4-1', nom: 'MUTOMBO Jeanne', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-4-2', nom: 'KABWE Roger', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-4-3', nom: 'NKONGOLO Béatrice', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-4-4', nom: 'TSHILUMBA Henri', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-4-5', nom: 'MWENZE Olivier', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-5',
    nom: 'LUNDA',
    prenom: 'Michel',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Civile 2',
    photo: '/conseillers/conseiller-5.jpg',
    dateNomination: '8 Avril 2020',
    email: 'm.lunda@courdecassation.cd',
    telephone: '+243 81 300 0005',
    bureau: 'Bâtiment A, 2ème étage, Bureau 205',
    specialite: 'Droit des Successions',
    cabinet: [
      { id: 'cab-5-1', nom: 'ILUNGA Patricia', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-5-2', nom: 'KATUMBA Simon', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-5-3', nom: 'NGOYI Colette', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-5-4', nom: 'MBUYU Gustave', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-5-5', nom: 'KALUBI Richard', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-6',
    nom: 'NGALULA',
    prenom: 'Sébastien',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Civile 2',
    photo: '/conseillers/conseiller-6.jpg',
    dateNomination: '30 Juillet 2018',
    email: 's.ngalula@courdecassation.cd',
    telephone: '+243 81 300 0006',
    bureau: 'Bâtiment A, 2ème étage, Bureau 206',
    specialite: 'Droit des Obligations',
    cabinet: [
      { id: 'cab-6-1', nom: 'MALULA Christine', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-6-2', nom: 'KIKWETE Albert', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-6-3', nom: 'NSEKA Martine', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-6-4', nom: 'MUTAMBA Charles', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-6-5', nom: 'LWAMBA Sophie', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-7',
    nom: 'KATANGA',
    prenom: 'Robert',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Pénale 1',
    photo: '/conseillers/conseiller-7.jpg',
    dateNomination: '17 Novembre 2019',
    email: 'r.katanga@courdecassation.cd',
    telephone: '+243 81 300 0007',
    bureau: 'Bâtiment B, 2ème étage, Bureau 201',
    specialite: 'Droit Pénal Général',
    cabinet: [
      { id: 'cab-7-1', nom: 'TSHIBOLA Angèle', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-7-2', nom: 'MUKUNA Denis', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-7-3', nom: 'KAPANGA Blaise', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-7-4', nom: 'MBELE Jacqueline', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-7-5', nom: 'NKONGOLO Thomas', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-8',
    nom: 'MBONGO',
    prenom: 'Étienne',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Pénale 1',
    photo: '/conseillers/conseiller-8.jpg',
    dateNomination: '3 Mars 2020',
    email: 'e.mbongo@courdecassation.cd',
    telephone: '+243 81 300 0008',
    bureau: 'Bâtiment B, 2ème étage, Bureau 202',
    specialite: 'Procédure Pénale',
    cabinet: [
      { id: 'cab-8-1', nom: 'KALONDA Rosalie', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-8-2', nom: 'MBAYA Joseph', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-8-3', nom: 'NGOIE Raphaël', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-8-4', nom: 'KALUNGA Gisèle', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-8-5', nom: 'TSHIMANGA Ernest', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-9',
    nom: 'LUBAMBA',
    prenom: 'Gabriel',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Pénale 1',
    photo: '/conseillers/conseiller-9.jpg',
    dateNomination: '25 Mai 2018',
    email: 'g.lubamba@courdecassation.cd',
    telephone: '+243 81 300 0009',
    bureau: 'Bâtiment B, 2ème étage, Bureau 203',
    specialite: 'Droit Pénal des Affaires',
    cabinet: [
      { id: 'cab-9-1', nom: 'MUSASA Nadège', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-9-2', nom: 'NGANDU Émile', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-9-3', nom: 'MUKENDI Antoinette', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-9-4', nom: 'KASAI Arthur', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-9-5', nom: 'NKWASA Philippe', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-10',
    nom: 'TSHIBANDA',
    prenom: 'Paul',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Pénale 1',
    photo: '/conseillers/conseiller-10.jpg',
    dateNomination: '14 Août 2019',
    email: 'p.tshibanda@courdecassation.cd',
    telephone: '+243 81 300 0010',
    bureau: 'Bâtiment B, 2ème étage, Bureau 204',
    specialite: 'Criminologie',
    cabinet: [
      { id: 'cab-10-1', nom: 'KAMWANYA Brigitte', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-10-2', nom: 'NKASA Raymond', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-10-3', nom: 'MBULA Félix', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-10-4', nom: 'KANKU Hervé', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-10-5', nom: 'NZAMBI Aristide', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-11',
    nom: 'NGOMA',
    prenom: 'Martin',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Pénale 2',
    photo: '/conseillers/conseiller-11.jpg',
    dateNomination: '9 Octobre 2020',
    email: 'm.ngoma@courdecassation.cd',
    telephone: '+243 81 300 0011',
    bureau: 'Bâtiment B, 3ème étage, Bureau 301',
    specialite: 'Droit Pénal International',
    cabinet: [
      { id: 'cab-11-1', nom: 'KABILA Jocelyne', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-11-2', nom: 'MONGA Matthieu', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-11-3', nom: 'NTUMBA Céline', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-11-4', nom: 'KASALA Félicité', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-11-5', nom: 'LUMANA Stéphanie', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-12',
    nom: 'KALONJI',
    prenom: 'Désiré',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Pénale 2',
    photo: '/conseillers/conseiller-12.jpg',
    dateNomination: '2 Décembre 2018',
    email: 'd.kalonji@courdecassation.cd',
    telephone: '+243 81 300 0012',
    bureau: 'Bâtiment B, 3ème étage, Bureau 302',
    specialite: 'Droit Pénal Militaire',
    cabinet: [
      { id: 'cab-12-1', nom: 'KYUNGU Pascaline', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-12-2', nom: 'NLANDU William', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-12-3', nom: 'KALENGA Diane', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-12-4', nom: 'MBAYA Patrice', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-12-5', nom: 'MUSANGU Georges', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-13',
    nom: 'MWENZE',
    prenom: 'Jacques',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Pénale 2',
    photo: '/conseillers/conseiller-13.jpg',
    dateNomination: '18 Février 2019',
    email: 'j.mwenze@courdecassation.cd',
    telephone: '+243 81 300 0013',
    bureau: 'Bâtiment B, 3ème étage, Bureau 303',
    specialite: 'Criminalistique',
    cabinet: [
      { id: 'cab-13-1', nom: 'KABEYA Rachel', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-13-2', nom: 'NKULU André', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-13-3', nom: 'KATENDA Florence', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-13-4', nom: 'LUMBU Didier', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-13-5', nom: 'NZUZI Christian', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-14',
    nom: 'KABWE',
    prenom: 'Augustin',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Pénale 2',
    photo: '/conseillers/conseiller-14.jpg',
    dateNomination: '7 Juin 2020',
    email: 'a.kabwe@courdecassation.cd',
    telephone: '+243 81 300 0014',
    bureau: 'Bâtiment B, 3ème étage, Bureau 304',
    specialite: 'Droit des Mineurs',
    cabinet: [
      { id: 'cab-14-1', nom: 'MWAMBA Esther', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-14-2', nom: 'NGALULA Gabriel', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-14-3', nom: 'MBOMBO Miriam', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-14-4', nom: 'TSHILUMBA Olivier', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-14-5', nom: 'KABONGO Martine', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-15',
    nom: 'NKULU',
    prenom: 'Emmanuel',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Procédure Spéciale',
    photo: '/conseillers/conseiller-15.jpg',
    dateNomination: '23 Avril 2019',
    email: 'e.nkulu@courdecassation.cd',
    telephone: '+243 81 300 0015',
    bureau: 'Bâtiment C, 2ème étage, Bureau 201',
    specialite: 'Procédures Exceptionnelles',
    cabinet: [
      { id: 'cab-15-1', nom: 'MBUYA Véronique', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-15-2', nom: 'NSIMBA Laurent', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-15-3', nom: 'KALOMBO Élisabeth', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-15-4', nom: 'MULONGO Philippe', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-15-5', nom: 'TSHISEKEDI Catherine', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-16',
    nom: 'KASONGO',
    prenom: 'Raymond',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Procédure Spéciale',
    photo: '/conseillers/conseiller-16.jpg',
    dateNomination: '11 Septembre 2020',
    email: 'r.kasongo@courdecassation.cd',
    telephone: '+243 81 300 0016',
    bureau: 'Bâtiment C, 2ème étage, Bureau 202',
    specialite: 'Contentieux Électoral',
    cabinet: [
      { id: 'cab-16-1', nom: 'MULONGO Monique', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-16-2', nom: 'NKULU Félix', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-16-3', nom: 'TSHISEKEDI Blaise', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-16-4', nom: 'KABONGO Élisabeth', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-16-5', nom: 'MBUYA Laurent', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-17',
    nom: 'MUTOMBO',
    prenom: 'Blaise',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Procédure Spéciale',
    photo: '/conseillers/conseiller-17.jpg',
    dateNomination: '29 Janvier 2018',
    email: 'b.mutombo@courdecassation.cd',
    telephone: '+243 81 300 0017',
    bureau: 'Bâtiment C, 2ème étage, Bureau 203',
    specialite: 'Référés',
    cabinet: [
      { id: 'cab-17-1', nom: 'NSIMBA Véronique', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-17-2', nom: 'KALOMBO Philippe', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-17-3', nom: 'MBUYA Catherine', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-17-4', nom: 'TSHISEKEDI Laurent', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-17-5', nom: 'KABONGO Monique', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-18',
    nom: 'NZUZI',
    prenom: 'Albert',
    titre: 'Conseiller à la Cour',
    chambre: 'Section des Requêtes',
    photo: '/conseillers/conseiller-18.jpg',
    dateNomination: '16 Mai 2019',
    email: 'a.nzuzi@courdecassation.cd',
    telephone: '+243 81 300 0018',
    bureau: 'Bâtiment A, 4ème étage, Bureau 401',
    specialite: 'Filtrage des Pourvois',
    cabinet: [
      { id: 'cab-18-1', nom: 'MALULA Thérèse', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-18-2', nom: 'KIKWETE Albert', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-18-3', nom: 'NSEKA Angèle', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-18-4', nom: 'MUTAMBA Roger', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-18-5', nom: 'KABANGU Sophie', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-19',
    nom: 'KALUBI',
    prenom: 'Christian',
    titre: 'Conseiller à la Cour',
    chambre: 'Section des Requêtes',
    photo: '/conseillers/conseiller-19.jpg',
    dateNomination: '4 Août 2020',
    email: 'c.kalubi@courdecassation.cd',
    telephone: '+243 81 300 0019',
    bureau: 'Bâtiment A, 4ème étage, Bureau 402',
    specialite: 'Admissibilité',
    cabinet: [
      { id: 'cab-19-1', nom: 'LWAMBA Didier', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-19-2', nom: 'NTUMBA Bernadette', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-19-3', nom: 'KASALA Thomas', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-19-4', nom: 'MALULA Christine', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-19-5', nom: 'KIKWETE Simon', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-20',
    nom: 'MBAYA',
    prenom: 'Olivier',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Commerciale',
    photo: '/conseillers/conseiller-20.jpg',
    dateNomination: '21 Novembre 2018',
    email: 'o.mbaya@courdecassation.cd',
    telephone: '+243 81 300 0020',
    bureau: 'Bâtiment B, 4ème étage, Bureau 401',
    specialite: 'Droit des Sociétés',
    cabinet: [
      { id: 'cab-20-1', nom: 'TSHIBOLA Marie', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-20-2', nom: 'MUKUNA Bernard', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-20-3', nom: 'KAPANGA Jeanne', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-20-4', nom: 'MBELE Gustave', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-20-5', nom: 'KALUBI Florence', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-21',
    nom: 'KAPINGA',
    prenom: 'Victor',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Commerciale',
    photo: '/conseillers/conseiller-21.jpg',
    dateNomination: '6 Mars 2020',
    email: 'v.kapinga@courdecassation.cd',
    telephone: '+243 81 300 0021',
    bureau: 'Bâtiment B, 4ème étage, Bureau 402',
    specialite: 'Droit Bancaire',
    cabinet: [
      { id: 'cab-21-1', nom: 'NKONGOLO André', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-21-2', nom: 'MUSANGU Rachel', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-21-3', nom: 'KABEYA Simon', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-21-4', nom: 'TSHIBOLA Jeanne', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-21-5', nom: 'MUKUNA Gustave', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-22',
    nom: 'TSHILUMBA',
    prenom: 'Pascal',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Commerciale',
    photo: '/conseillers/conseiller-22.jpg',
    dateNomination: '13 Juillet 2019',
    email: 'p.tshilumba@courdecassation.cd',
    telephone: '+243 81 300 0022',
    bureau: 'Bâtiment B, 4ème étage, Bureau 403',
    specialite: 'Droit de la Concurrence',
    cabinet: [
      { id: 'cab-22-1', nom: 'MBOMBO Jacqueline', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-22-2', nom: 'TSHILUMBA Henri', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-22-3', nom: 'NGALULA Martine', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-22-4', nom: 'KABWE Olivier', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-22-5', nom: 'MWAMBA Esther', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-23',
    nom: 'LUKUSA',
    prenom: 'Serge',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Sociale',
    photo: '/conseillers/conseiller-23.jpg',
    dateNomination: '27 Octobre 2020',
    email: 's.lukusa@courdecassation.cd',
    telephone: '+243 81 300 0023',
    bureau: 'Bâtiment C, 3ème étage, Bureau 301',
    specialite: 'Droit du Travail',
    cabinet: [
      { id: 'cab-23-1', nom: 'NZUZI Christian', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-23-2', nom: 'KATENDA Miriam', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-23-3', nom: 'LUMBU Gabriel', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-23-4', nom: 'MBOMBO Esther', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-23-5', nom: 'NGALULA Olivier', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-24',
    nom: 'KABUYA',
    prenom: 'Denis',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Sociale',
    photo: '/conseillers/conseiller-24.jpg',
    dateNomination: '19 Janvier 2019',
    email: 'd.kabuya@courdecassation.cd',
    telephone: '+243 81 300 0024',
    bureau: 'Bâtiment C, 3ème étage, Bureau 302',
    specialite: 'Sécurité Sociale',
    cabinet: [
      { id: 'cab-24-1', nom: 'KASONGO Monique', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-24-2', nom: 'MULONGO Félix', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-24-3', nom: 'NKULU Catherine', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-24-4', nom: 'TSHISEKEDI Blaise', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-24-5', nom: 'KABONGO Élisabeth', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-25',
    nom: 'NGANDU',
    prenom: 'Fernand',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Sociale',
    photo: '/conseillers/conseiller-25.jpg',
    dateNomination: '10 Avril 2018',
    email: 'f.ngandu@courdecassation.cd',
    telephone: '+243 81 300 0025',
    bureau: 'Bâtiment C, 3ème étage, Bureau 303',
    specialite: 'Droit Syndical',
    cabinet: [
      { id: 'cab-25-1', nom: 'MBUYA Laurent', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-25-2', nom: 'NSIMBA Véronique', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-25-3', nom: 'KALOMBO Philippe', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-25-4', nom: 'MULONGO Catherine', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-25-5', nom: 'NKULU Laurent', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-26',
    nom: 'MUKEBA',
    prenom: 'Augustin',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Administrative',
    photo: '/conseillers/conseiller-26.jpg',
    dateNomination: '8 Décembre 2019',
    email: 'a.mukeba@courdecassation.cd',
    telephone: '+243 81 300 0026',
    bureau: 'Bâtiment A, 5ème étage, Bureau 501',
    specialite: 'Droit Administratif',
    cabinet: [
      { id: 'cab-26-1', nom: 'TSHISEKEDI Blaise', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-26-2', nom: 'KABONGO Élisabeth', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-26-3', nom: 'MBUYA Laurent', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-26-4', nom: 'NSIMBA Véronique', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-26-5', nom: 'KALOMBO Philippe', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-27',
    nom: 'NKONGOLO',
    prenom: 'Roger',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Administrative',
    photo: '/conseillers/conseiller-27.jpg',
    dateNomination: '24 Février 2020',
    email: 'r.nkongolo@courdecassation.cd',
    telephone: '+243 81 300 0027',
    bureau: 'Bâtiment A, 5ème étage, Bureau 502',
    specialite: 'Contentieux Administratif',
    cabinet: [
      { id: 'cab-27-1', nom: 'MULONGO Catherine', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-27-2', nom: 'NKULU Laurent', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-27-3', nom: 'TSHISEKEDI Monique', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-27-4', nom: 'KABONGO Félix', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-27-5', nom: 'MBUYA Blaise', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-28',
    nom: 'KATUMBA',
    prenom: 'Charles',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Administrative',
    photo: '/conseillers/conseiller-28.jpg',
    dateNomination: '5 Juillet 2018',
    email: 'c.katumba@courdecassation.cd',
    telephone: '+243 81 300 0028',
    bureau: 'Bâtiment A, 5ème étage, Bureau 503',
    specialite: 'Fonction Publique',
    cabinet: [
      { id: 'cab-28-1', nom: 'NSIMBA Élisabeth', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-28-2', nom: 'KALOMBO Laurent', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-28-3', nom: 'MULONGO Véronique', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-28-4', nom: 'NKULU Philippe', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-28-5', nom: 'TSHISEKEDI Catherine', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-29',
    nom: 'ILUNGA',
    prenom: 'Bernard',
    titre: 'Conseiller à la Cour',
    chambre: 'Section des Avis',
    photo: '/conseillers/conseiller-29.jpg',
    dateNomination: '15 Septembre 2019',
    email: 'b.ilunga@courdecassation.cd',
    telephone: '+243 81 300 0029',
    bureau: 'Bâtiment B, 5ème étage, Bureau 501',
    specialite: 'Avis Juridiques',
    cabinet: [
      { id: 'cab-29-1', nom: 'MBONGO Rosalie', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-29-2', nom: 'KANYINDA Joseph', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-29-3', nom: 'TSHIBANDA Gisèle', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-29-4', nom: 'NGOMA Raphaël', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-29-5', nom: 'KABILA Nadège', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-30',
    nom: 'KANKU',
    prenom: 'Émile',
    titre: 'Conseiller à la Cour',
    chambre: 'Section des Avis',
    photo: '/conseillers/conseiller-30.jpg',
    dateNomination: '2 Novembre 2020',
    email: 'e.kanku@courdecassation.cd',
    telephone: '+243 81 300 0030',
    bureau: 'Bâtiment B, 5ème étage, Bureau 502',
    specialite: 'Consultation Juridique',
    cabinet: [
      { id: 'cab-30-1', nom: 'MUTOMBO Brigitte', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-30-2', nom: 'NKWASA Alex', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-30-3', nom: 'LUBAMBA Émile', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-30-4', nom: 'MBONGO Gisèle', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-30-5', nom: 'KANYINDA Raphaël', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-31',
    nom: 'MUSASA',
    prenom: 'Théophile',
    titre: 'Conseiller à la Cour',
    chambre: 'Section des Contentieux',
    photo: '/conseillers/conseiller-31.jpg',
    dateNomination: '20 Mars 2019',
    email: 't.musasa@courdecassation.cd',
    telephone: '+243 81 300 0031',
    bureau: 'Bâtiment C, 4ème étage, Bureau 401',
    specialite: 'Contentieux Général',
    cabinet: [
      { id: 'cab-31-1', nom: 'KALONDA Stéphanie', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-31-2', nom: 'MBAYA Ernest', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-31-3', nom: 'NGOIE Antoinette', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-31-4', nom: 'KALUNGA Denis', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-31-5', nom: 'MUSASA Joséphine', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-32',
    nom: 'LUMANA',
    prenom: 'Sylvain',
    titre: 'Conseiller à la Cour',
    chambre: 'Section des Contentieux',
    photo: '/conseillers/conseiller-32.jpg',
    dateNomination: '12 Août 2020',
    email: 's.lumana@courdecassation.cd',
    telephone: '+243 81 300 0032',
    bureau: 'Bâtiment C, 4ème étage, Bureau 402',
    specialite: 'Litiges Civils',
    cabinet: [
      { id: 'cab-32-1', nom: 'TSHIMANGA Paul', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-32-2', nom: 'NGANDU Clémence', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-32-3', nom: 'MUKENDI Arthur', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-32-4', nom: 'KALONDA Ernest', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-32-5', nom: 'MBAYA Antoinette', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-33',
    nom: 'KABILA',
    prenom: 'Prosper',
    titre: 'Conseiller à la Cour',
    chambre: 'Section des Contentieux',
    photo: '/conseillers/conseiller-33.jpg',
    dateNomination: '7 Mai 2018',
    email: 'p.kabila@courdecassation.cd',
    telephone: '+243 81 300 0033',
    bureau: 'Bâtiment C, 4ème étage, Bureau 403',
    specialite: 'Responsabilité Civile',
    cabinet: [
      { id: 'cab-33-1', nom: 'NGOIE Denis', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-33-2', nom: 'KALUNGA Joséphine', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-33-3', nom: 'MUSASA Paul', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-33-4', nom: 'TSHIMANGA Clémence', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-33-5', nom: 'NGANDU Arthur', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-34',
    nom: 'NKASA',
    prenom: 'Léon',
    titre: 'Conseiller à la Cour',
    chambre: 'Section de Documentation',
    photo: '/conseillers/conseiller-34.jpg',
    dateNomination: '28 Octobre 2019',
    email: 'l.nkasa@courdecassation.cd',
    telephone: '+243 81 300 0034',
    bureau: 'Bâtiment A, 6ème étage, Bureau 601',
    specialite: 'Documentation Juridique',
    cabinet: [
      { id: 'cab-34-1', nom: 'KAMWANYA Pascaline', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-34-2', nom: 'NKASA Raymond', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-34-3', nom: 'MBULA Céline', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-34-4', nom: 'TSHIBUABUA Hervé', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-34-5', nom: 'KANKU Félicité', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-35',
    nom: 'MBULA',
    prenom: 'Dieudonné',
    titre: 'Conseiller à la Cour',
    chambre: 'Section de Documentation',
    photo: '/conseillers/conseiller-35.jpg',
    dateNomination: '14 Février 2020',
    email: 'd.mbula@courdecassation.cd',
    telephone: '+243 81 300 0035',
    bureau: 'Bâtiment A, 6ème étage, Bureau 602',
    specialite: 'Recherche Juridique',
    cabinet: [
      { id: 'cab-35-1', nom: 'MWENZE Aristide', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-35-2', nom: 'NZAMBI Jocelyne', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-35-3', nom: 'KASAI Matthieu', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-35-4', nom: 'KAMWANYA Raymond', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-35-5', nom: 'NKASA Céline', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-36',
    nom: 'TSHIBUABUA',
    prenom: 'Marcel',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Civile 1',
    photo: '/conseillers/conseiller-36.jpg',
    dateNomination: '3 Juin 2018',
    email: 'm.tshibuabua@courdecassation.cd',
    telephone: '+243 81 300 0036',
    bureau: 'Bâtiment A, 2ème étage, Bureau 207',
    specialite: 'Droit de la Propriété',
    cabinet: [
      { id: 'cab-36-1', nom: 'MBULA Hervé', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-36-2', nom: 'KANKU Félicité', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-36-3', nom: 'MWENZE Jocelyne', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-36-4', nom: 'NZAMBI Matthieu', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-36-5', nom: 'KASAI Aristide', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-37',
    nom: 'KAMWANYA',
    prenom: 'Hubert',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Civile 2',
    photo: '/conseillers/conseiller-37.jpg',
    dateNomination: '17 Septembre 2019',
    email: 'h.kamwanya@courdecassation.cd',
    telephone: '+243 81 300 0037',
    bureau: 'Bâtiment A, 2ème étage, Bureau 208',
    specialite: 'Droit des Assurances',
    cabinet: [
      { id: 'cab-37-1', nom: 'NKASA Pascaline', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-37-2', nom: 'MBULA Raymond', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-37-3', nom: 'TSHIBUABUA Céline', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-37-4', nom: 'KANKU Hervé', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-37-5', nom: 'MWENZE Félicité', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-38',
    nom: 'MWENZE',
    prenom: 'Augustin',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Pénale 1',
    photo: '/conseillers/conseiller-38.jpg',
    dateNomination: '26 Novembre 2020',
    email: 'a.mwenze@courdecassation.cd',
    telephone: '+243 81 300 0038',
    bureau: 'Bâtiment B, 2ème étage, Bureau 205',
    specialite: 'Droit Pénal Économique',
    cabinet: [
      { id: 'cab-38-1', nom: 'NZAMBI Aristide', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-38-2', nom: 'KASAI Jocelyne', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-38-3', nom: 'KAMWANYA Matthieu', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-38-4', nom: 'NKASA Félicité', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-38-5', nom: 'MBULA Hervé', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-39',
    nom: 'NZAMBI',
    prenom: 'Théodore',
    titre: 'Conseiller à la Cour',
    chambre: 'Chambre Pénale 2',
    photo: '/conseillers/conseiller-39.jpg',
    dateNomination: '9 Avril 2019',
    email: 't.nzambi@courdecassation.cd',
    telephone: '+243 81 300 0039',
    bureau: 'Bâtiment B, 3ème étage, Bureau 305',
    specialite: 'Criminologie Appliquée',
    cabinet: [
      { id: 'cab-39-1', nom: 'KASAI Pascaline', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-39-2', nom: 'KAMWANYA Raymond', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-39-3', nom: 'NKASA Céline', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-39-4', nom: 'MBULA Hervé', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-39-5', nom: 'MWENZE Jocelyne', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-40',
    nom: 'KASAI',
    prenom: 'Modeste',
    titre: 'Conseiller à la Cour',
    chambre: 'Section des Requêtes',
    photo: '/conseillers/conseiller-40.jpg',
    dateNomination: '22 Juillet 2020',
    email: 'm.kasai@courdecassation.cd',
    telephone: '+243 81 300 0040',
    bureau: 'Bâtiment A, 4ème étage, Bureau 403',
    specialite: 'Recevabilité des Pourvois',
    cabinet: [
      { id: 'cab-40-1', nom: 'NZAMBI Aristide', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-40-2', nom: 'MWENZE Matthieu', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-40-3', nom: 'MBULA Jocelyne', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-40-4', nom: 'KAMWANYA Félicité', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-40-5', nom: 'NKASA Hervé', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-41',
    nom: 'MBONGO',
    prenom: 'Valentin',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Commerciale',
    photo: '/conseillers/conseiller-41.jpg',
    dateNomination: '4 Octobre 2018',
    email: 'v.mbongo@courdecassation.cd',
    telephone: '+243 81 300 0041',
    bureau: 'Bâtiment B, 4ème étage, Bureau 404',
    specialite: 'Droit des Investissements',
    cabinet: [
      { id: 'cab-41-1', nom: 'TSHIBUABUA Pascaline', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-41-2', nom: 'KANKU Raymond', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-41-3', nom: 'KASAI Céline', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-41-4', nom: 'NZAMBI Aristide', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-41-5', nom: 'MWENZE Matthieu', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-42',
    nom: 'KANYINDA',
    prenom: 'Symphorien',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Sociale',
    photo: '/conseillers/conseiller-42.jpg',
    dateNomination: '15 Janvier 2020',
    email: 's.kanyinda@courdecassation.cd',
    telephone: '+243 81 300 0042',
    bureau: 'Bâtiment C, 3ème étage, Bureau 304',
    specialite: 'Conventions Collectives',
    cabinet: [
      { id: 'cab-42-1', nom: 'MBULA Jocelyne', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-42-2', nom: 'KAMWANYA Félicité', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-42-3', nom: 'NKASA Hervé', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-42-4', nom: 'TSHIBUABUA Matthieu', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-42-5', nom: 'KANKU Aristide', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
  {
    id: 'conseiller-43',
    nom: 'TSHIBANDA',
    prenom: 'Patrice',
    titre: 'Conseiller à la Cour',
    chambre: 'Section Administrative',
    photo: '/conseillers/conseiller-43.jpg',
    dateNomination: '30 Mai 2019',
    email: 'p.tshibanda@courdecassation.cd',
    telephone: '+243 81 300 0043',
    bureau: 'Bâtiment A, 5ème étage, Bureau 504',
    specialite: 'Marchés Publics',
    cabinet: [
      { id: 'cab-43-1', nom: 'KASAI Pascaline', fonction: 'Assistant Juridique Principal', photo: '/cabinet/m1.jpg' },
      { id: 'cab-43-2', nom: 'NZAMBI Raymond', fonction: 'Secrétaire', photo: '/cabinet/m2.jpg' },
      { id: 'cab-43-3', nom: 'MWENZE Céline', fonction: 'Greffier Adjoint', photo: '/cabinet/m3.jpg' },
      { id: 'cab-43-4', nom: 'MBULA Hervé', fonction: 'Documentaliste', photo: '/cabinet/m4.jpg' },
      { id: 'cab-43-5', nom: 'KAMWANYA Jocelyne', fonction: 'Agent Administratif', photo: '/cabinet/m5.jpg' },
    ],
  },
];

// Liste des chambres pour le filtre
const chambres = [
  'Toutes',
  'Chambre Civile 1',
  'Chambre Civile 2',
  'Chambre Pénale 1',
  'Chambre Pénale 2',
  'Chambre Procédure Spéciale',
  'Section des Requêtes',
  'Section Commerciale',
  'Section Sociale',
  'Section Administrative',
  'Section des Avis',
  'Section des Contentieux',
  'Section de Documentation',
];

/* ============================================
   COMPOSANT CARTE CONSEILLER
============================================ */
function ConseillerCard({ 
  conseiller, 
  onSelect 
}: { 
  conseiller: Conseiller; 
  onSelect: (conseiller: Conseiller) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="group bg-white rounded-xl shadow-md overflow-hidden border border-[#1D2B44]/10 hover:shadow-lg hover:border-[#C0962E]/30 transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(conseiller)}
    >
      {/* Photo */}
      <div className="relative h-48 bg-gradient-to-br from-[#1D2B44] to-[#2A3D5A] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#C0962E]/20 border-3 border-[#C0962E]/40 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#C0962E]">
              {conseiller.prenom[0]}{conseiller.nom[0]}
            </span>
          </div>
        </div>
        
        {/* Badge Chambre */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#7D1A1D] text-white rounded-full">
            {conseiller.chambre}
          </span>
        </div>

        {/* Effet hover */}
        <div className="absolute inset-0 bg-[#1D2B44]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-3 py-1.5 bg-[#C0962E] text-[#1D2B44] font-semibold text-sm rounded-lg flex items-center gap-2">
            Voir Cabinet
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Infos */}
      <div className="p-4">
        <h3 className="text-base font-bold text-[#1D2B44] mb-0.5">
          {conseiller.prenom} {conseiller.nom}
        </h3>
        <p className="text-xs text-[#C0962E] font-medium mb-2">
          {conseiller.specialite}
        </p>
        
        <div className="flex items-center gap-2 text-[10px] text-[#1D2B44]/60">
          <Calendar className="w-3 h-3" />
          <span>Depuis le {conseiller.dateNomination}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================
   COMPOSANT MODAL CABINET
============================================ */
function CabinetModal({ 
  conseiller, 
  onClose 
}: { 
  conseiller: Conseiller; 
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
        className="bg-[#F8F9FA] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec infos du Conseiller */}
        <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] p-5 relative">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-5">
            {/* Photo Conseiller */}
            <div className="w-20 h-20 rounded-xl bg-[#C0962E]/20 border-3 border-[#C0962E]/40 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-[#C0962E]">
                {conseiller.prenom[0]}{conseiller.nom[0]}
              </span>
            </div>
            
            <div className="flex-1">
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#7D1A1D] text-white rounded-full inline-block mb-1">
                {conseiller.chambre}
              </span>
              <h2 className="text-xl font-bold text-white mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {conseiller.prenom} {conseiller.nom}
              </h2>
              <p className="text-[#C0962E] font-medium text-sm">{conseiller.titre}</p>
              <p className="text-white/60 text-xs mt-0.5">{conseiller.specialite}</p>
            </div>
          </div>

          {/* Infos contact */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <Mail className="w-3.5 h-3.5 text-[#C0962E]" />
              <span>{conseiller.email}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <Phone className="w-3.5 h-3.5 text-[#C0962E]" />
              <span>{conseiller.telephone}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#C0962E]" />
              <span>{conseiller.bureau}</span>
            </div>
          </div>
        </div>

        {/* Corps - Membres du Cabinet */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-200px)]">
          <h3 className="text-lg font-bold text-[#1D2B44] mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#C0962E] rounded-full"></span>
            Membres du Cabinet ({conseiller.cabinet.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {conseiller.cabinet.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg p-3 shadow-sm border border-[#1D2B44]/10 hover:border-[#C0962E]/30 hover:shadow-md transition-all duration-300"
              >
                {/* Photo membre */}
                <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#1D2B44]/10 to-[#1D2B44]/20 border-2 border-[#1D2B44]/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#1D2B44]/60">
                    {member.nom.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                {/* Infos membre */}
                <div className="text-center">
                  <h4 className="font-semibold text-[#1D2B44] text-xs mb-0.5 line-clamp-2">
                    {member.nom}
                  </h4>
                  <p className="text-[10px] text-[#7D1A1D] font-medium">
                    {member.fonction}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#1D2B44]/5 px-5 py-3 border-t border-[#1D2B44]/10">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#1D2B44]/60">
              Cour de Cassation • RDC
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
export default function ConseillersPage() {
  const [selectedConseiller, setSelectedConseiller] = useState<Conseiller | null>(null);
  const [selectedChambre, setSelectedChambre] = useState('Toutes');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage des conseillers
  const filteredConseillers = conseillersData.filter(conseiller => {
    const matchesChambre = selectedChambre === 'Toutes' || conseiller.chambre === selectedChambre;
    const matchesSearch = searchQuery === '' || 
      `${conseiller.prenom} ${conseiller.nom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conseiller.specialite.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChambre && matchesSearch;
  });

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
            <span className="text-[#C0962E]">Les Conseillers</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#C0962E]/20 rounded-full text-[#C0962E] text-sm font-medium mb-4"
            >
              <Users className="w-4 h-4" />
              Corps des Magistrats
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Les Conseillers à la Cour
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-white/70"
            >
              Les 43 conseillers qui composent les différentes chambres et sections
              de la Cour de Cassation de la République Démocratique du Congo
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-6 bg-white border-b border-[#1D2B44]/10 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D2B44]/40" />
              <input
                type="text"
                placeholder="Rechercher un conseiller..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#1D2B44]/20 rounded-lg focus:outline-none focus:border-[#C0962E] text-sm"
              />
            </div>

            {/* Filtre par chambre */}
            <div className="flex flex-wrap gap-2 justify-center">
              {chambres.slice(0, 7).map((chambre) => (
                <button
                  key={chambre}
                  onClick={() => setSelectedChambre(chambre)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    selectedChambre === chambre
                      ? 'bg-[#1D2B44] text-white'
                      : 'bg-[#1D2B44]/10 text-[#1D2B44] hover:bg-[#1D2B44]/20'
                  }`}
                >
                  {chambre}
                </button>
              ))}
              <select
                value={selectedChambre}
                onChange={(e) => setSelectedChambre(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#1D2B44]/10 text-[#1D2B44] border-none cursor-pointer"
              >
                {chambres.map((chambre) => (
                  <option key={chambre} value={chambre}>{chambre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grille des Conseillers */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#1D2B44] mb-1">
                {filteredConseillers.length} Conseiller{filteredConseillers.length > 1 ? 's' : ''}
                {selectedChambre !== 'Toutes' && ` - ${selectedChambre}`}
              </h2>
              <p className="text-sm text-[#1D2B44]/60">
                Cliquez sur un conseiller pour voir son cabinet
              </p>
            </div>
          </div>

          {filteredConseillers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredConseillers.map((conseiller) => (
                <ConseillerCard
                  key={conseiller.id}
                  conseiller={conseiller}
                  onSelect={setSelectedConseiller}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-[#1D2B44]/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#1D2B44] mb-2">Aucun conseiller trouvé</h3>
              <p className="text-sm text-[#1D2B44]/60">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal Cabinet */}
      <AnimatePresence>
        {selectedConseiller && (
          <CabinetModal
            conseiller={selectedConseiller}
            onClose={() => setSelectedConseiller(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
