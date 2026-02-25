'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronUp, Play } from 'lucide-react';

export default function CourExpliquee() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] relative">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#1D2B44] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            La Cour de cassation expliquée
          </h2>
          {/* Trait Or sous le titre */}
          <div className="h-1.5 w-32 bg-[#C0962E]"></div>
        </motion.div>

        {/* Bloc principal asymétrique */}
        <div className="relative">
          {/* Grille asymétrique */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            
            {/* Bloc Vidéo (Gauche) - 7 colonnes */}
            <motion.div 
              className="lg:col-span-7 relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Rectangle Bordeaux en arrière-plan (effet signature) */}
              <div 
                className="absolute -top-6 -left-6 w-full h-full bg-[#7D1A1D] z-0"
                style={{ maxWidth: 'calc(100% - 40px)' }}
              />
              
              {/* Lecteur vidéo */}
              <div className="relative z-10 bg-white p-2 shadow-xl">
                <div className="relative aspect-video bg-[#1D2B44] overflow-hidden">
                  {/* Placeholder vidéo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!isPlaying ? (
                      <>
                        {/* Image de couverture */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center opacity-60"
                          style={{ 
                            backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format')",
                            filter: 'grayscale(30%)'
                          }}
                        />
                        {/* Bouton Play */}
                        <button 
                          onClick={() => setIsPlaying(true)}
                          className="relative z-10 w-20 h-20 bg-[#C0962E] flex items-center justify-center hover:bg-[#D4A842] transition-colors duration-300"
                        >
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </button>
                      </>
                    ) : (
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                        title="La Cour de cassation expliquée"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bloc Texte (Droite) - Carte chevauchante */}
            <motion.div 
              className="lg:col-span-5 relative lg:-ml-16 mt-8 lg:mt-0 z-20"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="bg-white shadow-2xl p-8 lg:p-10">
                <h3 
                  className="text-xl font-bold text-[#1D2B44] mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Comprendre la juridiction suprême
                </h3>
                
                <p className="text-[#1D2B44] leading-relaxed mb-6 text-sm">
                  La Cour de cassation est la plus haute juridiction de l'ordre judiciaire 
                  de la République Démocratique du Congo. Elle veille à l'application uniforme 
                  du droit sur l'ensemble du territoire national et juge en dernier ressort 
                  les pourvois formés contre les décisions des tribunaux et cours d'appel.
                </p>

                <p className="text-[#6B7280] leading-relaxed mb-8 text-sm">
                  Découvrez son organisation, ses missions et son rôle fondamental 
                  dans la garantie des droits des citoyens.
                </p>

                {/* Lien "Pour aller plus loin" */}
                <a 
                  href="/cour/presentation"
                  className="group inline-flex items-center text-[#C0962E] font-bold text-sm tracking-wide hover:text-[#7D1A1D] transition-colors duration-300"
                >
                  <span>POUR ALLER PLUS LOIN</span>
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bouton Scroll-to-top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-[#F8F9FA] border border-[#1D2B44]/20 shadow-lg flex items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-300 z-50 rounded-full"
            aria-label="Retour en haut"
          >
            <ChevronUp className="w-6 h-6 text-[#1D2B44]" />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
