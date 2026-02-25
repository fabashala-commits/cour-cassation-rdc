'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Types pour les slides
export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoplayDelay?: number;
}

// Configuration Autoplay
const autoplayOptions = {
  delay: 5000,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
};

export default function HeroSlider({ slides, autoplayDelay = 5000 }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ ...autoplayOptions, delay: autoplayDelay })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Navigation
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  // Gestion de l'index sélectionné
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setProgress(0);
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Animation de la barre de progression
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / (autoplayDelay / 50));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [selectedIndex, autoplayDelay]);

  // Variants pour les animations de texte
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] max-h-[900px] overflow-hidden bg-gray-900">
      {/* Carousel Container */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="embla__slide relative flex-[0_0_100%] min-w-0 h-full"
            >
              {/* Image de fond avec effet de zoom subtil */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                initial={{ scale: 1.1 }}
                animate={{ scale: selectedIndex === index ? 1 : 1.1 }}
                transition={{ duration: 6, ease: 'easeOut' }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

              {/* Contenu textuel avec animations */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                  <AnimatePresence mode="wait">
                    {selectedIndex === index && (
                      <motion.div
                        key={slide.id}
                        className="max-w-2xl"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {/* Sous-titre */}
                        {slide.subtitle && (
                          <motion.span
                            custom={0}
                            variants={textVariants}
                            className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-[#141E30] bg-gradient-to-r from-[#C0962E] to-[#D4A842] rounded-sm shadow-lg"
                          >
                            {slide.subtitle}
                          </motion.span>
                        )}

                        {/* Titre principal */}
                        <motion.h2
                          custom={0.2}
                          variants={textVariants}
                          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {slide.title}
                        </motion.h2>

                        {/* Description */}
                        {slide.description && (
                          <motion.p
                            custom={0.4}
                            variants={textVariants}
                            className="text-lg text-gray-200 mb-6 line-clamp-2"
                          >
                            {slide.description}
                          </motion.p>
                        )}

                        {/* Bouton CTA */}
                        {slide.cta && (
                          <motion.a
                            custom={0.6}
                            variants={textVariants}
                            href={slide.cta.href}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C0962E] to-[#D4A842] text-[#141E30] font-bold rounded-sm hover:shadow-xl hover:shadow-[#C0962E]/30 transition-all duration-300 group"
                          >
                            {slide.cta.label}
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </motion.a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boutons de navigation */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        aria-label="Slide précédente"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        aria-label="Slide suivante"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicateurs avec barre de progression */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => scrollTo(index)}
            className="relative h-1 w-12 bg-white/30 rounded-full overflow-hidden"
            aria-label={`Aller à la slide ${index + 1}`}
          >
            {/* Barre de progression active */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: selectedIndex === index ? `${progress}%` : index < selectedIndex ? '100%' : '0%',
              }}
              transition={{ duration: 0.05 }}
            />
          </button>
        ))}
      </div>

      {/* Numéro de slide */}
      <div className="absolute bottom-6 right-6 z-20 text-white/70 text-sm font-mono">
        <span className="text-white font-semibold">{String(selectedIndex + 1).padStart(2, '0')}</span>
        <span className="mx-1">/</span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}

// Données de démonstration
export const demoSlides: HeroSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
    subtitle: 'Actualité',
    title: 'La Cour de Cassation modernise ses services numériques',
    description: 'Découvrez les nouvelles fonctionnalités de recherche et de consultation de la jurisprudence.',
    cta: { label: 'En savoir plus', href: '/actualites' },
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1920&q=80',
    subtitle: 'Jurisprudence',
    title: 'Accédez à plus de 500 000 décisions',
    description: 'Notre base de données juridique la plus complète, accessible gratuitement.',
    cta: { label: 'Rechercher', href: '/recherche' },
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80',
    subtitle: 'Institution',
    title: 'Bienvenue à la Cour de Cassation',
    description: 'Plus haute juridiction de l\'ordre judiciaire français depuis 1790.',
    cta: { label: 'Découvrir', href: '/cour/histoire' },
  },
];
