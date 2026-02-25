import React from 'react';

export default function Chambres() {
  const chambres = [
    {
      id: 1,
      title: 'Chambre Civil 1',
      description: 'Droit civil, familial, des personnes et des biens',
      icon: '⚖️',
      specialties: ['Droit civil', 'Droit familial', 'Succession', 'Propriété']
    },
    {
      id: 2,
      title: 'Chambre Civil 2',
      description: 'Contentieux civil, responsabilité et obligations',
      icon: '📜',
      specialties: ['Responsabilité', 'Obligations', 'Contrats', 'Assurances']
    },
    {
      id: 3,
      title: 'Chambre Pénal 1',
      description: 'Infractions, procédure pénale et libertés',
      icon: '🔨',
      specialties: ['Droit pénal', 'Procédure pénale', 'Droits de l\'Homme', 'Libertés']
    },
    {
      id: 4,
      title: 'Chambre Pénal 2',
      description: 'Délits, crimes et exécution des peines',
      icon: '⚔️',
      specialties: ['Délits', 'Crimes', 'Peines', 'Détention']
    },
    {
      id: 5,
      title: 'Chambre Procédure Spécial',
      description: 'Procédures exceptionnelles et juridictions spécialisées',
      icon: '📋',
      specialties: ['Pourvois', 'Cassation', 'Recours', 'Juridictions spéciales']
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#141E30] via-[#1D2B44] to-[#2A3D5A] relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C0962E] via-[#D4A842] to-[#C0962E]" />
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#C0962E]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-[#7D1A1D]/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-14">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            L'Organisation de la Cour
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Les cinq chambres spécialisées qui constituent la Cour de Cassation
          </p>
          <div 
            className="h-1.5 w-28 mx-auto mt-6 bg-gradient-to-r from-[#C0962E] to-[#D4A842] rounded-full"
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {chambres.map((chambre, index) => (
            <div
              key={chambre.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 group hover:bg-white/10 hover:shadow-2xl hover:shadow-[#C0962E]/10 transition-all duration-300 hover:-translate-y-2 rounded-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                {chambre.icon}
              </div>
              <h3 
                className="text-xl font-bold mb-2 text-white group-hover:text-[#D4A842] transition-colors"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {chambre.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {chambre.description}
              </p>
              
              <div className="border-t border-white/10 pt-4">
                <p 
                  className="text-xs font-semibold mb-2 text-[#D4A842]"
                >
                  DOMAINES
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {chambre.specialties.map((specialty, idx) => (
                    <li 
                      key={idx}
                      className="text-xs text-gray-400 flex items-start gap-1"
                    >
                      <span className="text-[#C0962E]">•</span>
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className="w-full mt-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#C0962E] to-[#D4A842] text-[#141E30] hover:shadow-lg hover:shadow-[#C0962E]/30 transition-all duration-300 rounded-sm"
              >
                En savoir plus
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
