'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Shield,
  Lock,
  AlertTriangle,
  FileText,
  Upload,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  Info,
  ArrowLeft,
  Send,
  FileCheck,
  Scale,
  ShieldCheck,
  Database,
  Key,
  Server,
  X,
  Paperclip,
} from 'lucide-react';

/* ============================================
   COMPOSANT PRINCIPAL
============================================ */

export default function DenonciationPage() {
  const [formData, setFormData] = useState({
    anonyme: false,
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    objetDenonciation: '',
    personnesConcernees: '',
    dateFaits: '',
    lieuFaits: '',
    descriptionFaits: '',
    temoins: '',
    accepteConditions: false,
    confirmeVeracite: false,
  });

  const [fichiers, setFichiers] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showAvertissement, setShowAvertissement] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - fichiers.length);
      setFichiers(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFichiers(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.accepteConditions || !formData.confirmeVeracite) {
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-24 h-24 bg-[#1D2B44] border-4 border-[#C0962E] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ShieldCheck className="w-12 h-12 text-[#C0962E]" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Signalement Enregistré
            </h1>
            <p className="text-white/80 text-lg">
              Votre signalement a été transmis de manière sécurisée.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-[#1D2B44]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-[#C0962E]" />
            </div>
            <h2 className="text-xl font-bold text-[#1D2B44] mb-4">
              Traitement Confidentiel
            </h2>
            <p className="text-[#1D2B44]/70 mb-6 leading-relaxed">
              Votre signalement sera examiné par les services compétents de la Cour de Cassation 
              dans le strict respect de la confidentialité. Un numéro de suivi vous sera 
              communiqué si vous avez fourni vos coordonnées.
            </p>
            
            <div className="bg-[#1D2B44]/5 rounded-lg p-4 mb-8 text-left">
              <h3 className="font-semibold text-[#1D2B44] mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#C0962E]" />
                Prochaines étapes
              </h3>
              <ul className="text-sm text-[#1D2B44]/70 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1D2B44] mt-0.5 flex-shrink-0" />
                  Analyse préliminaire par le Greffe
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1D2B44] mt-0.5 flex-shrink-0" />
                  Transmission au service d'instruction compétent
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1D2B44] mt-0.5 flex-shrink-0" />
                  Traitement selon les procédures en vigueur
                </li>
              </ul>
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
      {/* En-tête sobre et imposant */}
      <div className="bg-gradient-to-r from-[#1D2B44] to-[#2A3D5A] py-12 relative">
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
              className="inline-flex items-center justify-center w-20 h-20 bg-[#1D2B44] border-2 border-[#C0962E] rounded-full mb-6"
            >
              <Shield className="w-10 h-10 text-[#C0962E]" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Signalement Sécurisé
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg max-w-2xl mx-auto"
            >
              Portail de dénonciation de la Cour de Cassation de la République Démocratique du Congo
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Avertissement Juridique et Solennel */}
        <AnimatePresence>
          {showAvertissement && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#7D1A1D]">
                <div className="bg-[#7D1A1D]/10 px-6 py-4 border-b border-[#7D1A1D]/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-[#7D1A1D]" />
                    <h2 className="text-lg font-bold text-[#7D1A1D]">
                      Avertissement Juridique Important
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowAvertissement(false)}
                    className="p-1 hover:bg-[#7D1A1D]/10 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-[#7D1A1D]/60" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 text-[#1D2B44]">
                    <p className="leading-relaxed">
                      <strong className="text-[#7D1A1D]">Avant de procéder à tout signalement</strong>, 
                      il est impératif de prendre connaissance des dispositions légales en vigueur 
                      concernant la dénonciation.
                    </p>
                    
                    <div className="bg-[#1D2B44]/5 rounded-lg p-4 border-l-4 border-[#7D1A1D]">
                      <p className="text-sm leading-relaxed">
                        <strong>Article relatif à la dénonciation calomnieuse :</strong><br/>
                        Toute dénonciation faite de mauvaise foi, portant sur des faits que le 
                        dénonciateur sait totalement ou partiellement inexacts, est passible de 
                        poursuites pénales. La dénonciation calomnieuse est sanctionnée par la loi 
                        congolaise et peut entraîner des peines d'emprisonnement et des dommages-intérêts.
                      </p>
                    </div>

                    <div className="flex items-start gap-3 bg-[#7D1A1D]/5 rounded-lg p-4">
                      <Scale className="w-5 h-5 text-[#7D1A1D] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#1D2B44]/80">
                        En soumettant ce formulaire, vous attestez sur l'honneur que les faits 
                        rapportés sont véridiques et que vous êtes conscient des conséquences 
                        juridiques d'une fausse déclaration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Formulaire de Dénonciation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-[#1D2B44] p-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#C0962E]" />
              Formulaire de Signalement
            </h2>
            <p className="text-white/70 text-sm mt-2">
              Tous les champs marqués d'un astérisque (*) sont obligatoires
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            
            {/* Section 1 : Identité du dénonciateur */}
            <div>
              <h3 className="text-lg font-bold text-[#1D2B44] mb-4 flex items-center gap-2 pb-2 border-b-2 border-[#1D2B44]/10">
                <User className="w-5 h-5 text-[#C0962E]" />
                Identité du Dénonciateur
              </h3>

              {/* Option d'anonymat */}
              <div className="mb-6 bg-[#1D2B44]/5 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="anonyme"
                    checked={formData.anonyme}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 rounded border-[#1D2B44]/30 text-[#C0962E] focus:ring-[#C0962E]"
                  />
                  <div>
                    <span className="font-semibold text-[#1D2B44] flex items-center gap-2">
                      {formData.anonyme ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      Je souhaite rester anonyme
                    </span>
                    <p className="text-sm text-[#1D2B44]/60 mt-1">
                      Conformément aux dispositions légales, vous pouvez choisir de ne pas révéler 
                      votre identité. Toutefois, un signalement nominatif permet un meilleur suivi 
                      et renforce la crédibilité de la démarche.
                    </p>
                  </div>
                </label>
              </div>

              {!formData.anonyme && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Civilité
                      </label>
                      <select
                        name="civilite"
                        value={formData.civilite}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] bg-white"
                      >
                        <option value="">Sélectionner</option>
                        <option value="M.">Monsieur</option>
                        <option value="Mme">Madame</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Adresse électronique
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                        Numéro de téléphone
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        placeholder="+243"
                        className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                      Adresse postale
                    </label>
                    <input
                      type="text"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44]"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Section 2 : Description des faits */}
            <div>
              <h3 className="text-lg font-bold text-[#1D2B44] mb-4 flex items-center gap-2 pb-2 border-b-2 border-[#1D2B44]/10">
                <FileCheck className="w-5 h-5 text-[#C0962E]" />
                Description des Faits
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                    Objet du signalement <span className="text-[#7D1A1D]">*</span>
                  </label>
                  <select
                    name="objetDenonciation"
                    value={formData.objetDenonciation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] bg-white"
                  >
                    <option value="">-- Sélectionnez la nature des faits --</option>
                    <option value="corruption">Corruption</option>
                    <option value="abus-pouvoir">Abus de pouvoir</option>
                    <option value="malversation">Malversation financière</option>
                    <option value="fraude">Fraude documentaire</option>
                    <option value="manquement-ethique">Manquement à l'éthique professionnelle</option>
                    <option value="autre">Autre manquement grave</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                    Personne(s) ou entité(s) concernée(s) <span className="text-[#7D1A1D]">*</span>
                  </label>
                  <input
                    type="text"
                    name="personnesConcernees"
                    value={formData.personnesConcernees}
                    onChange={handleInputChange}
                    required
                    placeholder="Nom(s), fonction(s), service(s) concerné(s)"
                    className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                      Date approximative des faits <span className="text-[#7D1A1D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="dateFaits"
                      value={formData.dateFaits}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: Janvier 2025, ou période"
                      className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                      Lieu des faits <span className="text-[#7D1A1D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="lieuFaits"
                      value={formData.lieuFaits}
                      onChange={handleInputChange}
                      required
                      placeholder="Ville, institution, service..."
                      className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                    Description détaillée des faits <span className="text-[#7D1A1D]">*</span>
                  </label>
                  <textarea
                    name="descriptionFaits"
                    value={formData.descriptionFaits}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Décrivez les faits de manière précise et chronologique. Mentionnez tout élément pertinent pouvant étayer votre signalement..."
                    className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44] resize-none"
                  />
                  <p className="text-xs text-[#1D2B44]/50 mt-1">
                    Soyez le plus précis possible. Les informations factuelles sont essentielles pour le traitement du signalement.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D2B44] mb-2">
                    Témoins éventuels
                  </label>
                  <input
                    type="text"
                    name="temoins"
                    value={formData.temoins}
                    onChange={handleInputChange}
                    placeholder="Nom(s) de personne(s) pouvant corroborer les faits (facultatif)"
                    className="w-full px-4 py-3 border border-[#1D2B44]/20 rounded-lg focus:ring-2 focus:ring-[#C0962E] focus:border-transparent transition-all text-[#1D2B44]"
                  />
                </div>
              </div>
            </div>

            {/* Section 3 : Pièces jointes */}
            <div>
              <h3 className="text-lg font-bold text-[#1D2B44] mb-4 flex items-center gap-2 pb-2 border-b-2 border-[#1D2B44]/10">
                <Paperclip className="w-5 h-5 text-[#C0962E]" />
                Pièces Jointes
              </h3>

              <div className="bg-[#1D2B44]/5 rounded-lg p-6">
                <div className="border-2 border-dashed border-[#1D2B44]/20 rounded-lg p-6 text-center hover:border-[#C0962E]/50 transition-colors">
                  <Upload className="w-10 h-10 text-[#1D2B44]/40 mx-auto mb-3" />
                  <p className="text-[#1D2B44] font-medium mb-1">
                    Déposez vos fichiers ici
                  </p>
                  <p className="text-sm text-[#1D2B44]/60 mb-4">
                    ou cliquez pour sélectionner (PDF, images, documents - max 5 fichiers)
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#1D2B44] text-white rounded-lg cursor-pointer hover:bg-[#2A3D5A] transition-colors">
                    <Upload className="w-4 h-4" />
                    Sélectionner des fichiers
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {fichiers.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {fichiers.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#C0962E]" />
                          <span className="text-sm text-[#1D2B44]">{file.name}</span>
                          <span className="text-xs text-[#1D2B44]/50">
                            ({(file.size / 1024).toFixed(1)} Ko)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-[#7D1A1D]/10 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-[#7D1A1D]" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-[#1D2B44]/50 mt-4">
                  Les pièces justificatives renforcent la crédibilité de votre signalement : 
                  documents, courriels, photographies, enregistrements...
                </p>
              </div>
            </div>

            {/* Engagements et déclarations */}
            <div className="space-y-4">
              <div className="bg-[#7D1A1D]/5 rounded-lg p-4 border border-[#7D1A1D]/20">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="confirmeVeracite"
                    checked={formData.confirmeVeracite}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-5 h-5 rounded border-[#7D1A1D]/30 text-[#7D1A1D] focus:ring-[#7D1A1D]"
                  />
                  <span className="text-sm text-[#1D2B44]">
                    <strong className="text-[#7D1A1D]">Déclaration sur l'honneur :</strong> J'atteste 
                    que les informations fournies dans ce signalement sont exactes et véridiques 
                    à ma connaissance. Je suis conscient(e) que toute fausse déclaration peut 
                    entraîner des poursuites pour dénonciation calomnieuse. <span className="text-[#7D1A1D]">*</span>
                  </span>
                </label>
              </div>

              <div className="bg-[#1D2B44]/5 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="accepteConditions"
                    checked={formData.accepteConditions}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-5 h-5 rounded border-[#1D2B44]/30 text-[#1D2B44] focus:ring-[#1D2B44]"
                  />
                  <span className="text-sm text-[#1D2B44]">
                    J'accepte que mes données soient traitées conformément à la politique de 
                    confidentialité de la Cour de Cassation et transmises aux services compétents 
                    pour examen. <span className="text-[#7D1A1D]">*</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className="pt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting || !formData.accepteConditions || !formData.confirmeVeracite}
                whileHover={{ scale: formData.accepteConditions && formData.confirmeVeracite ? 1.01 : 1 }}
                whileTap={{ scale: formData.accepteConditions && formData.confirmeVeracite ? 0.99 : 1 }}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-semibold text-white transition-all shadow-lg ${
                  isSubmitting || !formData.accepteConditions || !formData.confirmeVeracite
                    ? 'bg-[#1D2B44]/30 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#C0962E] to-[#D4A842] hover:shadow-xl hover:shadow-[#C0962E]/30'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Chiffrement et envoi sécurisé en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Soumettre le signalement de manière sécurisée
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Protocole de Confidentialité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-[#1D2B44]/10 flex items-center gap-3">
            <div className="w-12 h-12 bg-[#C0962E]/10 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#C0962E]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1D2B44]">
                Protocole de Confidentialité
              </h3>
              <p className="text-sm text-[#1D2B44]/60">
                Vos données sont protégées par des mesures de sécurité avancées
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-[#1D2B44]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Key className="w-7 h-7 text-[#C0962E]" />
                </div>
                <h4 className="font-semibold text-[#1D2B44] mb-1">Chiffrement</h4>
                <p className="text-sm text-[#1D2B44]/60">
                  Toutes les données sont chiffrées de bout en bout (AES-256)
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-[#1D2B44]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="w-7 h-7 text-[#C0962E]" />
                </div>
                <h4 className="font-semibold text-[#1D2B44] mb-1">Stockage sécurisé</h4>
                <p className="text-sm text-[#1D2B44]/60">
                  Serveurs isolés avec accès strictement contrôlé
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-[#1D2B44]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Server className="w-7 h-7 text-[#C0962E]" />
                </div>
                <h4 className="font-semibold text-[#1D2B44] mb-1">Traçabilité</h4>
                <p className="text-sm text-[#1D2B44]/60">
                  Journalisation des accès pour garantir l'intégrité
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mention légale de traitement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1D2B44]/5 rounded-lg p-6 text-center"
        >
          <p className="text-sm text-[#1D2B44]/70 leading-relaxed">
            <strong className="text-[#1D2B44]">Traitement des données :</strong> Les informations 
            recueillies dans le cadre de ce signalement sont exclusivement destinées au Greffe 
            et aux services d'instruction compétents de la Cour de Cassation. Elles font l'objet 
            d'un traitement confidentiel conformément aux dispositions légales en vigueur en 
            République Démocratique du Congo relatives à la protection des données personnelles.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
