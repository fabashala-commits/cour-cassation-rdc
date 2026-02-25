'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

// Types
interface Event {
  id: string
  title: string
  time?: string
  location?: string
  type: 'event' | 'audience'
}

interface CourtAgendaProps {
  events?: Event[]
  audiences?: Event[]
}

// Données de démonstration
export const demoCourtEvents: Event[] = [
  // Ajoutez des événements ici pour tester
]

export const demoAudiences: Event[] = [
  // Ajoutez des audiences ici pour tester
]

// Fonction utilitaire pour formater la date en français
const formatDateFr = (date: Date): string => {
  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ]
  
  const dayName = days[date.getDay()]
  const dayNum = date.getDate()
  const monthName = months[date.getMonth()]
  const year = date.getFullYear()
  
  return `${dayName} ${dayNum} ${monthName} ${year}`
}

// Composant Calendrier Mini
const MiniCalendar: React.FC<{
  selectedDate: Date
  onSelectDate: (date: Date) => void
  onClose: () => void
}> = ({ selectedDate, onSelectDate, onClose }) => {
  const [viewDate, setViewDate] = useState(new Date(selectedDate))
  const calendarRef = useRef<HTMLDivElement>(null)

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1 // Lundi = 0

    const days: (number | null)[] = []
    
    // Jours vides avant le premier jour du mois
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const navigateMonth = (direction: number) => {
    const newDate = new Date(viewDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setViewDate(newDate)
  }

  const handleDayClick = (day: number | null) => {
    if (day) {
      const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
      onSelectDate(newDate)
      onClose()
    }
  }

  const isSelected = (day: number | null) => {
    if (!day) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewDate.getMonth() &&
      selectedDate.getFullYear() === viewDate.getFullYear()
    )
  }

  const isToday = (day: number | null) => {
    if (!day) return false
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === viewDate.getMonth() &&
      today.getFullYear() === viewDate.getFullYear()
    )
  }

  const days = getDaysInMonth(viewDate)
  const weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']

  return (
    <motion.div
      ref={calendarRef}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50 min-w-[300px]"
    >
      {/* Header du calendrier */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Mois précédent"
        >
          <ChevronLeft className="w-5 h-5 text-[#161616]" />
        </button>
        <span className="font-semibold text-[#161616]">
          {months[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <button
          onClick={() => navigateMonth(1)}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Mois suivant"
        >
          <ChevronRight className="w-5 h-5 text-[#161616]" />
        </button>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-[#666666] py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Grille des jours */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDayClick(day)}
            disabled={!day}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-full transition-all
              ${!day ? 'invisible' : 'cursor-pointer'}
              ${isSelected(day) ? 'bg-[#E1000F] text-white font-semibold' : ''}
              ${isToday(day) && !isSelected(day) ? 'border-2 border-[#E1000F] text-[#E1000F] font-semibold' : ''}
              ${!isSelected(day) && !isToday(day) && day ? 'hover:bg-gray-100 text-[#161616]' : ''}
            `}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Bouton Aujourd'hui */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <button
          onClick={() => {
            const today = new Date()
            setViewDate(today)
            onSelectDate(today)
            onClose()
          }}
          className="w-full py-2 text-sm font-medium text-[#E1000F] hover:bg-red-50 rounded-lg transition-colors"
        >
          Aujourd&apos;hui
        </button>
      </div>
    </motion.div>
  )
}

// Composant Section d'événements
const EventSection: React.FC<{
  title: string
  events: Event[]
  emptyMessage: string
}> = ({ title, events, emptyMessage }) => {
  return (
    <div className="py-6 border-b border-gray-200 last:border-b-0">
      {/* Titre de section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-[#161616]">{title}</h3>
        <a
          href="#"
          className="flex items-center gap-1 text-xs font-semibold text-[#E1000F] hover:underline uppercase tracking-wide"
        >
          Voir tout...
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Contenu */}
      <AnimatePresence mode="wait">
        {events.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#666666] text-sm italic"
          >
            {emptyMessage}
          </motion.p>
        ) : (
          <motion.ul
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {events.map((event) => (
              <li
                key={event.id}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-[#161616] mb-1">{event.title}</h4>
                    {event.location && (
                      <p className="text-sm text-[#666666]">{event.location}</p>
                    )}
                  </div>
                  {event.time && (
                    <span className="text-sm font-semibold text-[#E1000F] bg-red-50 px-2 py-1 rounded">
                      {event.time}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

// Composant Principal
const CourtAgenda: React.FC<CourtAgendaProps> = ({
  events = demoCourtEvents,
  audiences = demoAudiences
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateDate = (direction: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() + direction)
      setCurrentDate(newDate)
      setIsTransitioning(false)
    }, 150)
  }

  const handleSelectDate = (date: Date) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentDate(date)
      setIsTransitioning(false)
    }, 150)
  }

  // Filtrer les événements par date (simulation)
  const filteredEvents = events.filter(() => true) // À implémenter selon votre logique
  const filteredAudiences = audiences.filter(() => true) // À implémenter selon votre logique

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto">
        {/* Header - Barre de navigation temporelle */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center gap-6">
            {/* Bouton Précédent */}
            <button
              onClick={() => navigateDate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#161616] hover:bg-gray-100 rounded-lg transition-colors group"
              aria-label="Jour précédent"
            >
              <ChevronLeft className="w-5 h-5 text-[#E1000F] group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Précédent</span>
            </button>

            {/* Date centrale avec calendrier */}
            <div className="relative">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
                aria-label="Ouvrir le calendrier"
              >
                <Calendar className="w-5 h-5 text-[#161616]" />
                <span className="text-lg font-light text-[#161616] border-b-2 border-[#E1000F] pb-0.5">
                  {formatDateFr(currentDate)}
                </span>
                <Calendar className="w-5 h-5 text-[#161616]" />
              </button>

              {/* Mini Calendrier */}
              <AnimatePresence>
                {showCalendar && (
                  <MiniCalendar
                    selectedDate={currentDate}
                    onSelectDate={handleSelectDate}
                    onClose={() => setShowCalendar(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Bouton Suivant */}
            <button
              onClick={() => navigateDate(1)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#161616] hover:bg-gray-100 rounded-lg transition-colors group"
              aria-label="Jour suivant"
            >
              <span className="hidden sm:inline">Suivant</span>
              <ChevronRight className="w-5 h-5 text-[#E1000F] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Ligne décorative */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -mb-4" />
        </div>

        {/* Body - Sections d'événements */}
        <motion.div
          animate={{ opacity: isTransitioning ? 0.3 : 1 }}
          transition={{ duration: 0.15 }}
        >
          {/* Section Événements de la Cour */}
          <EventSection
            title="Événements de la Cour"
            events={filteredEvents}
            emptyMessage="Aucun événement prévu ce jour"
          />

          {/* Section Audiences */}
          <EventSection
            title="Audiences"
            events={filteredAudiences}
            emptyMessage="Aucune audience prévue ce jour"
          />
        </motion.div>

        {/* Légende / Info */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-[#666666] text-center">
            Cliquez sur la date pour accéder au calendrier complet • Utilisez les flèches pour naviguer
          </p>
        </div>
      </div>
    </section>
  )
}

export default CourtAgenda
