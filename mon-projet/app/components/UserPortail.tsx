'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// Types
interface DemarcheLink {
  id: string;
  label: string;
  href: string;
}

interface ProfileTile {
  id: string;
  label: string;
  image: string;
  href: string;
}

// Données des démarches
const demarchesData: DemarcheLink[] = [
  { id: '1', label: 'Consulter la jurisprudence', href: '/recherche' },
  { id: '2', label: 'Suivre mon dossier en cours', href: '/services/suivi-dossier' },
  { id: '3', label: 'Prendre un rendez-vous', href: '/services/rendez-vous' },
  { id: '4', label: 'Déposer un pourvoi en cassation', href: '/services/pourvoi' },
  { id: '5', label: 'Accéder aux textes légaux', href: '/textes-legaux' },
  { id: '6', label: 'Contacter le greffe', href: '/contact' },
  { id: '7', label: 'Signaler un problème', href: '/services/denonciation' },
];

// Données des profils utilisateur
const profilesData: ProfileTile[] = [
  {
    id: '1',
    label: 'Magistrat',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=400&fit=crop',
    href: '/profil/magistrat',
  },
  {
    id: '2',
    label: 'Avocat',
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=400&h=400&fit=crop',
    href: '/profil/avocat',
  },
  {
    id: '3',
    label: 'Justiciable',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=400&fit=crop',
    href: '/profil/justiciable',
  },
  {
    id: '4',
    label: 'Étudiant',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=400&fit=crop',
    href: '/profil/etudiant',
  },
  {
    id: '5',
    label: 'Journaliste',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=400&fit=crop',
    href: '/profil/journaliste',
  },
  {
    id: '6',
    label: 'Chercheur',
    image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=400&h=400&fit=crop',
    href: '/profil/chercheur',
  },
  {
    id: '7',
    label: 'Institution',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop',
    href: '/profil/institution',
  },
  {
    id: '8',
    label: 'Partenaire',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
    href: '/profil/partenaire',
  },
];

// Variantes d'animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

interface UserPortailProps {
  demarches?: DemarcheLink[];
  profiles?: ProfileTile[];
}

export default function UserPortail({
  demarches = demarchesData,
  profiles = profilesData,
}: UserPortailProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Colonne gauche - Vos démarches (40%) */}
          <div className="lg:col-span-2">
            {/* Titre */}
            <div className="mb-6">
              <h2
                className="text-2xl md:text-3xl font-bold text-[#141E30] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Vos démarches
              </h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-[#1D2B44] to-[#C0962E] rounded-full" />
            </div>

            {/* Carte des liens */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="bg-white shadow-lg rounded-sm overflow-hidden"
            >
              <ul className="divide-y divide-gray-100">
                {demarches.map((demarche) => (
                  <motion.li key={demarche.id} variants={linkVariants}>
                    <Link
                      href={demarche.href}
                      className="group flex items-center gap-3 px-5 py-4 hover:bg-[#1D2B44]/5 transition-colors duration-200"
                    >
                      <ChevronRight className="w-5 h-5 text-[#C0962E] flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                      <span className="text-[#3D4852] group-hover:text-[#1D2B44] group-hover:underline decoration-[#C0962E] underline-offset-2 transition-colors duration-200 text-sm font-medium">
                        {demarche.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Colonne droite - Vous êtes (60%) */}
          <div className="lg:col-span-3">
            {/* Titre */}
            <div className="mb-6">
              <h2
                className="text-2xl md:text-3xl font-bold text-[#141E30] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Vous êtes
              </h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-[#7D1A1D] to-[#C0962E] rounded-full" />
            </div>

            {/* Grille des profils */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-2"
            >
              {profiles.map((profile) => (
                <motion.div key={profile.id} variants={itemVariants}>
                  <ProfileCard profile={profile} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Composant carte de profil
function ProfileCard({ profile }: { profile: ProfileTile }) {
  return (
    <Link href={profile.href} className="group block relative aspect-square overflow-hidden rounded-none">
      {/* Image de fond */}
      <Image
        src={profile.image}
        alt={profile.label}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 25vw"
      />

      {/* Overlay dégradé */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/60 group-hover:via-black/20 transition-all duration-300" />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <span
          className="text-white font-semibold text-sm md:text-base"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {profile.label}
        </span>
      </div>

      {/* Indicateur de survol */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-gradient-to-br from-[#C0962E] to-[#D4A842] flex items-center justify-center shadow-lg">
          <ChevronRight className="w-5 h-5 text-[#141E30]" />
        </div>
      </div>
    </Link>
  );
}

export { demarchesData, profilesData };
