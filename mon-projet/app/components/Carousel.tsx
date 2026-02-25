'use client'

import { useState, useEffect } from 'react'

interface CarouselItem {
  id: number
  title: string
  description: string
  date: string
  icon: string
}

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const items: CarouselItem[] = [
    {
      id: 1,
      title: 'Décision historique du 15 janvier 2024',
      description: 'Jugement important en matière de droit civil et responsabilité.',
      date: '15 janvier 2024',
      icon: '⚖️',
    },
    {
      id: 2,
      title: 'Conférence: Évolutions du droit commercial',
      description: 'Nos magistrats vous présentent les dernières évolutions du droit commercial.',
      date: '22 janvier 2024',
      icon: '📚',
    },
    {
      id: 3,
      title: 'Publication: Guide juridique 2024',
      description: 'Accédez au guide complet des procédures judiciaires mises à jour.',
      date: '10 février 2024',
      icon: '📖',
    },
    {
      id: 4,
      title: 'Nouveau portail pour les avocats',
      description: 'Espace sécurisé pour accéder aux documents réservés.',
      date: '20 février 2024',
      icon: '🔐',
    },
  ]

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setAutoPlay(false)
  }

  const currentItem = items[currentIndex]

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg overflow-hidden carousel-wrapper">
      {/* Main Carousel Content */}
      <div className="relative flex items-center justify-center bg-gradient-to-r from-[#002D58] to-[#003D7A] text-white carousel-container" style={{minHeight: '60vh'}}>
        <div className="absolute inset-0 flex items-center justify-center px-8 text-center carousel-content">
          <div className="max-w-3xl">
            <div className="text-8xl mb-6 carousel-icon">{currentItem.icon}</div>
            <h3 className="text-5xl font-bold mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              {currentItem.title}
            </h3>
            <p className="text-2xl text-gray-200 mb-6">{currentItem.description}</p>
            <p className="text-lg text-gray-300">{currentItem.date}</p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setAutoPlay(false)}
          aria-label="Slide précédent"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all z-10 text-2xl"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          onMouseEnter={() => setAutoPlay(false)}
          aria-label="Slide suivant"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all z-10 text-2xl"
        >
          ›
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-3 py-6 bg-white">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setAutoPlay(false)}
            className={`h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-[#002D58] w-8'
                : 'bg-[#F1C40F] w-3 hover:bg-[#C01C2E]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="px-6 py-3 bg-[#F8F9FA] text-center text-sm" style={{color: '#4A4A4A'}}>
        {autoPlay ? (
          <span>Défilement automatique • Cliquez pour contrôler</span>
        ) : (
          <span
            onClick={() => setAutoPlay(true)}
            className="cursor-pointer font-semibold transition"
            style={{color: '#C01C2E'}}
          >
            Reprendre le défilement automatique
          </span>
        )}
      </div>
    </div>
  )
}
