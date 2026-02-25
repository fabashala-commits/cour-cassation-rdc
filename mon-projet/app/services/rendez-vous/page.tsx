'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  Clock,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Crown,
  Users,
  Briefcase,
  Scale,
  Building2,
  Shield,
  Send,
  ArrowLeft,
} from 'lucide-react';

/* ============================================
   CONFIGURATION DES DESTINATAIRES
============================================ */

interface Destinataire {
  id: string;
  nom: string;
  fonction: string;
  categorie: 'cabinet' | 'magistrats' | 'greffe';
}

const destinataires: Destinataire[] = [
  // Cabinet du Premier Président
  { id: 'premier-president', nom: 'Son Excellence le Premier Président', fonction: 'Premier Président de la Cour de Cassation', categorie: 'cabinet' },
  { id: 'directeur-cabinet', nom: 'Monsieur le Directeur de Cabinet', fonction: 'Directeur de Cabinet du Premier Président', categorie: 'cabinet' },
  { id: 'dircab-1', nom: 'Madame/Monsieur le Dircab 1', fonction: 'Directeur de Cabinet Adjoint 1', categorie: 'cabinet' },
  { id: 'dircab-2', nom: 'Madame/Monsieur le Dircab 2', fonction: 'Directeur de Cabinet Adjoint 2', categorie: 'cabinet' },
  
  // Hauts Magistrats
  { id: 'presidents', nom: 'Un Président de Chambre', fonction: 'Président de Chambre', categorie: 'magistrats' },
  { id: 'conseillers', nom: 'Un Conseiller', fonction: 'Conseiller à la Cour de Cassation', categorie: 'magistrats' },
  
  // Greffe
  { id: 'greffier-chef', nom: 'Madame/Monsieur le Greffier en Chef', fonction: 'Greffier en Chef de la Cour', categorie: 'greffe' },
  { id: 'directeur-penal', nom: 'Directeur de la Direction Pénale', fonction: 'Direction Pénal 1 & 2', categorie: 'greffe' },
  { id: 'directeur-civil', nom: 'Directeur de la Direction Civile', fonction: 'Direction Civil I & II', categorie: 'greffe' },
  { id: 'directeur-rh', nom: 'Directeur des Ressources Humaines', fonction: 'Direction RH', categorie: 'greffe' },
  { id: 'directeur-archives', nom: 'Directeur des Archives', fonction: 'Recouvrement, Archives et Comptabilité', categorie: 'greffe' },
];

/* ============================================
   COMPOSANT PRINCIPAL
============================================ */

export default function RendezVousPage() {
  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    destinataire: '',
    objet: '',
    datePreferee: '',
    heurePreferee: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('cabinet');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const getCategoryIcon = (categorie: string) => {
    switch (categorie) {
      case 'cabinet': return Crown;
      case 'magistrats': return Scale;
      case 'greffe': return Briefcase;
      default: return Users;
    }
  };

  const getCategoryColor = (categorie: string) => {
    switch (categorie) {
      case 'cabinet': return '#C0962E'; // Or
      case 'magistrats': return '#1D2B44'; // Bleu Nuit
      case 'greffe': return '#7D1A1D'; // Bordeaux
      default: return '#1D2B44';
    }
  };

  const getCategoryLabel = (categorie: string) => {
    switch (categorie) {
      case 'cabinet': return 'Cabinet du Premier Président';
      case 'magistrats': return 'Hauts Magistrats';
      case 'greffe': return 'Le Greffe';
      default: return '';
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Demande Enregistrée
            </h1>
            <p className="text-white/80 text-lg">
              Votre demande d'audience a été transmise avec succès.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-[#C0962E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-[#C0962E]" />
            </div>
            <h2 className="text-xl font-bold text-[#1D2B44] mb-4">
              Confirmation par courrier électronique
            </h2>
            <p className="text-[#1D2B44]/70 mb-6 leading-relaxed">
              Un accusé de réception vous sera adressé à l'adresse électronique indiquée. 
              Votre demande sera examinée par le secrétariat de l'autorité sollicitée, 
              qui vous communiquera une réponse dans les meilleurs délais.
            </p>
            
            <div className="bg-[#1D2B44]/5 rounded-lg p-4 mb-8">
              <p className="text-sm text-[#1D2B44]/60 italic">
                « Chaque demande d'audience est soumise à validation selon les disponibilités 
                de l'autorité sollicitée. La Cour de Cassation vous remercie de votre compréhension. »
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D2B44] text-white rounded-lg hover:bg-[#2A3D5A] transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header solennel */}
      <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C0962E] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7D1A1D] rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-[#C0962E]/20 rounded-full mb-6"
            >
              <Calendar className="w-10 h-10 text-[#C0962E]" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Demande d'Audience
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              La Cour de Cassation de la République Démocratique du Congo vous offre 
              la possibilité de solliciter une audience auprès de ses hautes autorités.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Colonne gauche - Destinataires */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-[#1D2B44] p-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#C0962E]" />
                  Autorités Habilitées
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Sélectionnez votre destinataire
                </p>
              </div>

              <div className="p-4 space-y-3">
                {/* Cabinet du Premier Président */}
                <div className="rounded-lg border border-[#C0962E]/30 overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === 'cabinet' ? null : 'cabinet')}
                    className="w-full flex items-center justify-between p-3 bg-[#C0962E]/5 hover:bg-[#C0962E]/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-[#C0962E]" />
                      <span className="font-semibold text-[#1D2B44] text-sm">Cabinet du Premier Président</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#C0962E] transition-transform ${expandedCategory === 'cabinet' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedCategory === 'cabinet' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-2 space-y-1 bg-white">
                          {destinataires.filter(d => d.categorie === 'cabinet').map(dest => (
                            <div key={dest.id} className="p-2 rounded-lg hover:bg-[#C0962E]/5 transition-colors">
                              <p className="text-sm font-medium text-[#1D2B44]">{dest.nom}</p>
                              <p className="text-xs text-[#C0962E]">{dest.fonction}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hauts Magistrats */}
                <div className="rounded-lg border border-[#1D2B44]/20 overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === 'magistrats' ? null : 'magistrats')}
                    className="w-full flex items-center justify-between p-3 bg-[#1D2B44]/5 hover:bg-[#1D2B44]/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-[#1D2B44]" />
                      <span className="font-semibold text-[#1D2B44] text-sm">Hauts Magistrats</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#1D2B44] transition-transform ${expandedCategory === 'magistrats' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedCategory === 'magistrats' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-2 space-y-1 bg-white">
                          {destinataires.filter(d => d.categorie === 'magistrats').map(dest => (
                            <div key={dest.id} className="p-2 rounded-lg hover:bg-[#1D2B44]/5 transition-colors">
                              <p className="text-sm font-medium text-[#1D2B44]">{dest.nom}</p>
                              <p className="text-xs text-[#1D2B44]/60">{dest.fonction}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Le Greffe */}
                <div className="rounded-lg border border-[#7D1A1D]/20 overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === 'greffe' ? null : 'greffe')}
                    className="w-full flex items-center justify-between p-3 bg-[#7D1A1D]/5 hover:bg-[#7D1A1D]/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-[#7D1A1D]" />
                      <span className="font-semibold text-[#1D2B44] text-sm">Le Greffe</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#7D1A1D] transition-transform ${expandedCategory === 'greffe' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedCategory === 'greffe' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-2 space-y-1 bg-white">
                          {destinataires.filter(d => d.categorie === 'greffe').map(dest => (
                            <div key={dest.id} className="p-2 rounded-lg hover:bg-[#7D1A1D]/5 transition-colors">
                              <p className="text-sm font-medium text-[#1D2B44]">{dest.nom}</p>
                              <p className="text-xs text-[#7D1A1D]">{dest.fonction}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Note importante */}
              <div className="p-4 bg-[#1D2B44]/5 border-t border-[#1D2B44]/10">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#7D1A1D] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#1D2B44]/70 leading-relaxed">
                    Chaque demande d'audience est soumise à validation selon les 
                    disponibilités de l'autorité sollicitée.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Formulaire */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#C0962E]" />
                  Formulaire de Demande d'Audience
                </h2>
                <p className="text-white/70 text-sm mt-2">
                  Veuillez remplir avec soin l'ensemble des champs ci-dessous
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Section Identité */}
                <div>
                  <h3 className="text-sm font-bold text-[#1D2B44] uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#C0962E] rounded-full" />
                    Votre Identité
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Civilité <span className="text-[#7D1A1D]">*</span>
                      </label>
                      <select
                        name="civilite"
                        value={formData.civilite}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] bg-white"
                      >
                        <option value="">Sélectionner</option>
                        <option value="M.">Monsieur</option>
                        <option value="Mme">Madame</option>
                        <option value="Me">Maître</option>
                        <option value="Dr">Docteur</option>
                        <option value="Pr">Professeur</option>
                        <option value="Hon.">Honorable</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Nom <span className="text-[#7D1A1D]">*</span>
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre nom de famille"
                        className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] placeholder:text-[#1D2B44]/40"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Prénom <span className="text-[#7D1A1D]">*</span>
                      </label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre prénom"
                        className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] placeholder:text-[#1D2B44]/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Contact */}
                <div>
                  <h3 className="text-sm font-bold text-[#1D2B44] uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#1D2B44] rounded-full" />
                    Coordonnées
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Adresse électronique <span className="text-[#7D1A1D]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D2B44]/40" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="votre.email@exemple.com"
                          className="w-full pl-11 pr-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] placeholder:text-[#1D2B44]/40"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Numéro de téléphone <span className="text-[#7D1A1D]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D2B44]/40" />
                        <input
                          type="tel"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleInputChange}
                          required
                          placeholder="+243 XX XXX XXXX"
                          className="w-full pl-11 pr-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] placeholder:text-[#1D2B44]/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Demande */}
                <div>
                  <h3 className="text-sm font-bold text-[#1D2B44] uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#7D1A1D] rounded-full" />
                    Objet de la Demande
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Destinataire de votre demande <span className="text-[#7D1A1D]">*</span>
                      </label>
                      <select
                        name="destinataire"
                        value={formData.destinataire}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] bg-white"
                      >
                        <option value="">-- Sélectionnez une autorité --</option>
                        <optgroup label="🏛️ Cabinet du Premier Président" className="text-[#C0962E]">
                          {destinataires.filter(d => d.categorie === 'cabinet').map(dest => (
                            <option key={dest.id} value={dest.id}>{dest.nom}</option>
                          ))}
                        </optgroup>
                        <optgroup label="⚖️ Hauts Magistrats">
                          {destinataires.filter(d => d.categorie === 'magistrats').map(dest => (
                            <option key={dest.id} value={dest.id}>{dest.nom}</option>
                          ))}
                        </optgroup>
                        <optgroup label="📁 Le Greffe">
                          {destinataires.filter(d => d.categorie === 'greffe').map(dest => (
                            <option key={dest.id} value={dest.id}>{dest.nom}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Objet de la visite <span className="text-[#7D1A1D]">*</span>
                      </label>
                      <input
                        type="text"
                        name="objet"
                        value={formData.objet}
                        onChange={handleInputChange}
                        required
                        placeholder="Précisez l'objet de votre demande d'audience"
                        className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] placeholder:text-[#1D2B44]/40"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                          Date souhaitée <span className="text-[#7D1A1D]">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D2B44]/40" />
                          <input
                            type="date"
                            name="datePreferee"
                            value={formData.datePreferee}
                            onChange={handleInputChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full pl-11 pr-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                          Heure préférée
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D2B44]/40" />
                          <select
                            name="heurePreferee"
                            value={formData.heurePreferee}
                            onChange={handleInputChange}
                            className="w-full pl-11 pr-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] bg-white"
                          >
                            <option value="">Indifférent</option>
                            <option value="09:00">09h00 - 10h00</option>
                            <option value="10:00">10h00 - 11h00</option>
                            <option value="11:00">11h00 - 12h00</option>
                            <option value="14:00">14h00 - 15h00</option>
                            <option value="15:00">15h00 - 16h00</option>
                            <option value="16:00">16h00 - 17h00</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Message complémentaire
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Veuillez préciser toute information complémentaire que vous jugez utile à l'examen de votre demande..."
                        className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] placeholder:text-[#1D2B44]/40 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Note solennelle */}
                <div className="bg-[#1D2B44]/5 rounded-lg p-4 border-l-4 border-[#C0962E]">
                  <p className="text-sm text-[#1D2B44]/80 leading-relaxed">
                    <strong className="text-[#1D2B44]">Engagement de confidentialité :</strong> Les informations 
                    transmises dans le cadre de cette demande sont strictement confidentielles et seront 
                    traitées avec la plus grande discrétion par les services de la Cour de Cassation.
                  </p>
                </div>

                {/* Bouton de soumission */}
                <div className="flex justify-end pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-white transition-all shadow-lg ${
                      isSubmitting 
                        ? 'bg-[#1D2B44]/50 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-[#C0962E] to-[#D4A842] hover:shadow-xl hover:shadow-[#C0962E]/30'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Soumettre ma Demande d'Audience
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Informations pratiques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-[#1D2B44] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#C0962E]" />
                Informations Pratiques
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-[#1D2B44]/5 rounded-lg">
                  <div className="w-12 h-12 bg-[#C0962E]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-[#C0962E]" />
                  </div>
                  <h4 className="font-semibold text-[#1D2B44] mb-1">Délai de réponse</h4>
                  <p className="text-sm text-[#1D2B44]/60">48 à 72 heures ouvrables</p>
                </div>
                
                <div className="text-center p-4 bg-[#1D2B44]/5 rounded-lg">
                  <div className="w-12 h-12 bg-[#1D2B44]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-6 h-6 text-[#1D2B44]" />
                  </div>
                  <h4 className="font-semibold text-[#1D2B44] mb-1">Lieu des audiences</h4>
                  <p className="text-sm text-[#1D2B44]/60">Palais de Justice, Kinshasa</p>
                </div>
                
                <div className="text-center p-4 bg-[#1D2B44]/5 rounded-lg">
                  <div className="w-12 h-12 bg-[#7D1A1D]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-[#7D1A1D]" />
                  </div>
                  <h4 className="font-semibold text-[#1D2B44] mb-1">Assistance</h4>
                  <p className="text-sm text-[#1D2B44]/60">+243 81 400 0000</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
