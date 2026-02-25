import React from 'react';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Rendez-vous',
      description: 'Planifiez votre visite ou réservez un créneau pour consulter les archives',
      icon: '📅',
      href: '/services/rendez-vous'
    },
    {
      id: 2,
      title: 'Suivi de Dossier',
      description: 'Consultez votre affaire et l\'état d\'avancement de votre dossier',
      icon: '📋',
      href: '/services/suivi-dossier'
    },
    {
      id: 3,
      title: 'Information',
      description: 'Obtenez les renseignements dont vous avez besoin, posez vos questions',
      icon: 'ℹ️',
      href: '/services/information'
    },
    {
      id: 4,
      title: 'Dénonciation',
      description: 'Signalez une irrégularité ou un abus de manière confidentielle',
      icon: '🚨',
      href: '/services/denonciation'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#7D1A1D]/5 rounded-full blur-2xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#C0962E]/5 rounded-full blur-2xl" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-14">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-[#7D1A1D]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nos Services
          </h2>
          <div className="h-1.5 w-28 mx-auto bg-gradient-to-r from-[#7D1A1D] to-[#C0962E] rounded-full"></div>
          <p className="mt-4 text-[#6B7280] max-w-xl mx-auto">
            Découvrez les services mis à votre disposition par la Cour de Cassation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <a
              key={service.id}
              href={service.href}
              className="card-cdc group bg-white p-6 border-b-4 border-transparent hover:border-[#C0962E] rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-5 bg-gradient-to-br from-[#7D1A1D]/10 to-[#7D1A1D]/5 w-16 h-16 rounded-sm flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#7D1A1D] group-hover:to-[#9A2428] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <span className="group-hover:grayscale group-hover:brightness-200">{service.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-[#141E30] mb-3 group-hover:text-[#7D1A1D] transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center text-[#7D1A1D] text-sm font-semibold">
                <span>En savoir plus</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
