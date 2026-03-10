/**
 * CONTENU TEXTUEL DU SITE — Fichier centralisé
 *
 * Tout le texte visible du site est ici.
 * Les valeurs dynamiques (ville, téléphone, nom...) viennent de siteConfig/clientConfig.
 * Pour personnaliser le contenu, modifiez ce fichier.
 */

import { siteConfig } from "./site";
import { clientConfig } from "./client.config";

// ─── Textes partagés (CTA, boutons, labels) ───

export const shared = {
  cta: {
    appelerMaintenant: `Appelez maintenant — ${siteConfig.phone}`,
    appelezNous: `Appelez-nous — ${siteConfig.phone}`,
    demanderDevis: "Demander un devis gratuit",
    voirRealisations: "Voir toutes nos réalisations",
    voirAvis: "Voir tous les avis",
    retourAccueil: "Retour à l'accueil",
    envoyerDemande: "Envoyer ma demande",
    envoiEnCours: "Envoi en cours...",
  },
  sections: {
    servicesLies: "Services liés",
  },
};

// ─── Composants sections ───

export const heroSection = {
  eyebrow: `Plombier chauffagiste — ${siteConfig.address.city}`,
};

export const ctaSection = {
  defaultTitle: "Un projet ? Une urgence ? Contactez-nous maintenant.",
  defaultSubtitle: "",
  ctaPrimary: shared.cta.appelerMaintenant,
  ctaSecondary: shared.cta.demanderDevis,
};

export const reassuranceBand = {
  stats: [
    { value: clientConfig.chiffres.anneesExperience, suffix: "+", label: "Années d'expérience" },
    { value: clientConfig.chiffres.nombreInterventions, suffix: "+", label: "Interventions" },
    { value: Number(clientConfig.chiffres.tauxSatisfaction) || 98, suffix: "%", label: "Clients satisfaits" },
    { value: 7, suffix: "j/7", label: "Disponibilité" },
  ],
};

export const urgencyProjectCards = {
  title: "Urgence ou projet ?",
  urgency: {
    title: "J'ai une urgence",
    subtitle: "Fuite, dégât des eaux, canalisation bouchée...",
    cta: "Appeler maintenant",
  },
  project: {
    title: "Je planifie des travaux",
    subtitle: "Rénovation, installation, remplacement...",
    cta: shared.cta.demanderDevis,
  },
};

export const contactForm = {
  labels: {
    nom: "Nom *",
    telephone: "Téléphone *",
    email: "Email *",
    service: "Type de besoin",
    message: "Message (optionnel)",
  },
  placeholders: {
    nom: "Votre nom",
    telephone: "06 XX XX XX XX",
    email: "votre@email.fr",
    service: "Sélectionnez un service",
    message: "Décrivez votre besoin...",
  },
  serviceOptions: [
    "Urgence / Dépannage",
    "Plomberie générale",
    "Rénovation salle de bain",
    "Chauffage",
    "Chauffe-eau",
    "Autre",
  ],
  rgpd: "J'accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande. Voir notre politique de confidentialité.",
  success: {
    title: "Demande envoyée !",
    text: "Nous vous recontactons sous 48h. Pour une urgence, appelez-nous directement.",
  },
  error: "Une erreur est survenue. Veuillez réessayer.",
};

// ─── Page Accueil ───

export const homepage = {
  hero: {
    title: clientConfig.seo.slogan,
    subtitle: "Fuite d'eau, WC bouché, panne de chaudière ? Devis gratuit sous 48h.",
    ctaSecondaryLabel: shared.cta.demanderDevis,
    badges: ["Intervention <2h", "Décennale", "Devis gratuit", `${siteConfig.googleRating}/5`],
  },
  services: {
    title: "Des solutions pour tous vos besoins",
    subtitle: "De l'urgence au projet de rénovation, notre équipe qualifiée intervient avec professionnalisme.",
  },
  realisations: {
    title: "Nos réalisations",
    subtitle: "Découvrez nos derniers chantiers en images.",
  },
  testimonials: {
    title: "Ce que disent nos clients",
    ratingLabel: "avis Google",
  },
};

// ─── Page Dépannage ───

export const depannage = {
  hero: {
    title: `Dépannage plomberie à ${siteConfig.address.city}`,
    subtitle: "Fuite d'eau, WC bouché, dégât des eaux ? Appelez maintenant.",
    badges: ["Urgence 24h/24", "Intervention <2h", "7j/7"],
  },
  urgences: {
    title: "Les urgences que nous prenons en charge",
    subtitle: "Quel que soit votre problème, nous avons la solution.",
    items: [
      { title: "Fuite d'eau", desc: "Fuite sur canalisation, robinet, raccord ou chasse d'eau. Intervention rapide pour limiter les dégâts." },
      { title: "Dégât des eaux", desc: "Coupure d'eau, assèchement et réparation. Nous vous accompagnons pour le constat d'assurance." },
      { title: "Canalisation bouchée", desc: "Débouchage WC, évier, douche ou canalisation principale par furet ou haute pression." },
      { title: "Panne de chaudière", desc: "Diagnostic et réparation de votre chaudière gaz ou pompe à chaleur, même le week-end." },
    ],
  },
  etapes: {
    title: "Comment ça marche ?",
    subtitle: "3 étapes simples pour un dépannage sans stress.",
    items: [
      { title: "Vous appelez", desc: "Décrivez-nous votre problème par téléphone. Nous évaluons l'urgence et vous donnons un tarif indicatif." },
      { title: "On intervient sous 2h", desc: "Un technicien qualifié se déplace chez vous avec tout le matériel nécessaire." },
      { title: "Problème résolu", desc: "Réparation immédiate dans la majorité des cas. Facture claire, pas de mauvaise surprise." },
    ],
  },
  tarifs: {
    title: "Tarifs indicatifs",
    subtitle: "Transparence totale sur nos prix. Le tarif exact vous est confirmé avant intervention.",
    items: [
      { service: "Débouchage WC / évier", prix: "À partir de 89 €" },
      { service: "Réparation fuite", prix: "À partir de 120 €" },
      { service: "Remplacement robinet", prix: "À partir de 95 €" },
      { service: "Dégât des eaux (intervention)", prix: "À partir de 150 €" },
      { service: "Déplacement + diagnostic", prix: "À partir de 49 €" },
    ],
    footnote: "* Tarifs TTC indicatifs hors pièces. Supplément possible en soirée, week-end et jours fériés.",
  },
  servicesLies: ["Plomberie", "Chauffage", "Chauffe-eau"],
};

// ─── Page Plomberie ───

export const plomberie = {
  hero: {
    title: `Plomberie à ${siteConfig.address.city}`,
    subtitle: "Robinetterie, tuyauterie, mise aux normes, recherche de fuite... Intervention rapide et travail soigné.",
  },
  services: {
    title: "Nos services de plomberie",
    subtitle: "De l'installation neuve à la réparation, nous intervenons sur tous vos équipements.",
    items: [
      { title: "Robinetterie", desc: "Installation et remplacement de robinets, mitigeurs, douchettes. Toutes marques." },
      { title: "Tuyauterie et raccordements", desc: "Installation, remplacement et réparation de canalisations en cuivre, PER ou multicouche." },
      { title: "Recherche de fuite", desc: "Détection non destructive par caméra thermique, acoustique ou colorimétrique." },
      { title: "Mise aux normes", desc: "Mise en conformité de vos installations selon les normes en vigueur (DTU, NF)." },
    ],
  },
  avantages: {
    title: "Pourquoi nous choisir ?",
    items: [
      `Plus de ${siteConfig.yearsExperience} ans d'expérience`,
      "Matériel professionnel dernière génération",
      "Chantier laissé propre après intervention",
      "Garantie décennale sur tous les travaux",
      "Devis détaillé gratuit sous 48h",
      "Conseil personnalisé et transparent",
    ],
  },
  servicesLies: ["Dépannage plomberie", "Rénovation salle de bain"],
};

// ─── Page Rénovation salle de bain ───

export const renovationSdb = {
  hero: {
    title: `Rénovation salle de bain à ${siteConfig.address.city}`,
    subtitle: "Douche italienne, rénovation complète, adaptation PMR. Un interlocuteur unique du début à la fin.",
  },
  projets: {
    title: "Nos types de projets",
    subtitle: "Chaque salle de bain est unique. Nous adaptons nos solutions à vos besoins et votre budget.",
    items: [
      { title: "Douche italienne", desc: "Receveur extra-plat, carrelage grand format, paroi vitrée, pommeau pluie. Design et accessibilité." },
      { title: "Rénovation complète", desc: "Démolition, plomberie, carrelage, sanitaires, meuble vasque, éclairage. Un seul interlocuteur." },
      { title: "Adaptation PMR", desc: "Barre d'appui, siège douche, receveur plain-pied, antidérapant. Éligible MaPrimeAdapt'." },
    ],
  },
  etapes: {
    title: "Notre méthode en 4 étapes",
    subtitle: "Un accompagnement clé en main pour un résultat à la hauteur de vos attentes.",
    items: [
      { title: "Visite conseil", desc: "Nous venons chez vous pour écouter vos envies, prendre les mesures et vous conseiller." },
      { title: "Devis détaillé", desc: "Vous recevez un devis précis sous 48h avec le détail des prestations et matériaux." },
      { title: "Travaux", desc: "Notre équipe réalise les travaux dans les délais convenus. Chantier propre garanti." },
      { title: "Réception", desc: "Vérification finale ensemble. Vous ne payez le solde qu'à votre entière satisfaction." },
    ],
  },
  realisations: {
    title: "Nos réalisations salle de bain",
    subtitle: "Découvrez nos derniers projets de rénovation.",
  },
  servicesLies: ["Plomberie", "Chauffe-eau"],
};

// ─── Page Chauffage ───

export const chauffage = {
  hero: {
    title: `Chauffage à ${siteConfig.address.city}`,
    subtitle: "Chaudière gaz, pompe à chaleur, plancher chauffant. Certifié RGE pour bénéficier des aides.",
    badges: ["Certifié RGE", "Entretien annuel", "Éligible aides"],
  },
  solutions: {
    title: "Nos solutions de chauffage",
    subtitle: "Installation, remplacement et dépannage de tous types de systèmes de chauffage.",
    items: [
      { title: "Chaudière gaz condensation", desc: "Installation et remplacement de chaudière gaz dernière génération. Jusqu'à 30% d'économies sur votre facture." },
      { title: "Pompe à chaleur air-eau", desc: "Solution écologique et économique. Éligible aux aides MaPrimeRénov' et CEE. Nous sommes certifiés RGE." },
      { title: "Plancher chauffant", desc: "Confort optimal et diffusion homogène de la chaleur. Idéal en rénovation ou construction neuve." },
    ],
  },
  entretien: {
    title: "Entretien annuel chaudière",
    subtitle: "L'entretien de votre chaudière est obligatoire chaque année. Nous intervenons sur toutes les marques.",
    cardTitle: "Ce qui est inclus",
    prix: "À partir de 89 € TTC",
    items: [
      "Vérification de la combustion et des émissions",
      "Nettoyage du corps de chauffe et du brûleur",
      "Contrôle de la pression et du circulateur",
      "Vérification des dispositifs de sécurité",
      "Mesure du taux de CO (monoxyde de carbone)",
      "Remise de l'attestation d'entretien",
    ],
  },
  rge: {
    title: "Certifié RGE — Éligible aux aides de l'État",
    text: "Notre certification RGE (Reconnu Garant de l'Environnement) vous permet de bénéficier des aides financières pour vos travaux de chauffage : MaPrimeRénov', CEE, éco-prêt à taux zéro.",
  },
  servicesLies: ["Chauffe-eau", "Dépannage plomberie"],
};

// ─── Page Chauffe-eau ───

export const chauffeEau = {
  hero: {
    title: `Chauffe-eau à ${siteConfig.address.city}`,
    subtitle: "Électrique, thermodynamique, solaire. Conseil expert pour choisir la solution la plus adaptée à vos besoins.",
  },
  services: {
    title: "Nos services chauffe-eau",
    subtitle: "Installation, remplacement, entretien et dépannage de tous types de chauffe-eau.",
    items: [
      { title: "Chauffe-eau électrique", desc: "Remplacement et installation de cumulus électrique, toutes capacités (75L à 300L). Intervention rapide en cas de panne." },
      { title: "Ballon thermodynamique", desc: "Jusqu'à 3x moins d'électricité. Éligible aux aides de l'État. Amortissement en 3 à 5 ans." },
      { title: "Détartrage et entretien", desc: "Prolongez la durée de vie de votre chauffe-eau. Le détartrage permet de maintenir les performances optimales." },
      { title: "Dépannage", desc: "Plus d'eau chaude ? Fuite sur le groupe de sécurité ? Nous intervenons rapidement pour vous dépanner." },
    ],
  },
  comparatif: {
    title: "Électrique vs Thermodynamique",
    subtitle: "Comparez les deux technologies pour faire le bon choix.",
    headers: ["Critère", "Électrique", "Thermodynamique"],
    rows: [
      { critere: "Consommation", electrique: "Élevée", thermo: "3x moins" },
      { critere: "Prix installation", electrique: "500 - 1 200 €", thermo: "2 000 - 3 500 €" },
      { critere: "Aides financières", electrique: "Aucune", thermo: "MaPrimeRénov', CEE" },
      { critere: "Durée de vie", electrique: "10 - 15 ans", thermo: "15 - 20 ans" },
      { critere: "Amortissement", electrique: "-", thermo: "3 à 5 ans" },
      { critere: "Classe énergie", electrique: "C / D", thermo: "A / A+" },
    ],
  },
  servicesLies: ["Chauffage", "Dépannage plomberie"],
};

// ─── Page Contact ───

export const contact = {
  hero: {
    title: "Contactez-nous — Devis gratuit sous 48h",
    subtitle: "Remplissez le formulaire ou appelez-nous directement. Nous répondons à toutes les demandes.",
  },
  formTitle: "Demandez votre devis gratuit",
  coordonnees: {
    title: "Nos coordonnées",
    labels: {
      telephone: "Téléphone",
      email: "Email",
      adresse: "Adresse",
      horaires: "Horaires",
    },
    horairesLabels: {
      semaine: "Lun-Ven :",
      samedi: "Samedi :",
      urgences: "Urgences :",
    },
    mapPlaceholder: "Intégrer ici l'iframe Google Maps avec la zone d'intervention",
  },
};

// ─── Page Avis clients ───

export const avisClients = {
  hero: {
    title: "Avis clients — Ce qu'ils disent de nous",
  },
  ratingIntro: (count: number) => `Basée sur ${count} avis Google`,
  voirGoogle: "Voir tous les avis sur Google",
  cta: {
    title: "Vous aussi, faites-nous confiance",
    subtitle: "Demandez votre devis gratuit ou appelez-nous directement.",
  },
};

// ─── Page À propos ───

export const aPropos = {
  hero: {
    title: `À propos de ${siteConfig.name}`,
    subtitle: "Professionnalisme, réactivité et transparence au service de votre confort.",
  },
  histoire: {
    title: "Notre histoire",
    paragraphs: [
      `Fondé en ${siteConfig.foundedYear} par ${siteConfig.founder}, ${siteConfig.name} est né d'une passion pour le métier et d'une conviction simple : un plombier doit être fiable, réactif et transparent.`,
      `Après ${siteConfig.yearsExperience} ans d'expérience et plus de ${siteConfig.interventionsCount} interventions, nous restons fidèles à ces valeurs. Notre équipe de techniciens qualifiés intervient chaque jour dans ${siteConfig.address.city} et ses environs pour des dépannages, installations et rénovations.`,
      "Certifiés RGE et couverts par une assurance décennale, nous accompagnons nos clients dans tous leurs projets de plomberie et de chauffage, du dépannage urgent à la rénovation complète.",
    ],
  },
  equipe: {
    title: "Notre équipe",
    subtitle: "Des professionnels qualifiés et passionnés à votre service.",
  },
  chiffres: {
    title: "En quelques chiffres",
    items: [
      { value: siteConfig.yearsExperience, label: "Années d'expérience" },
      { value: siteConfig.interventionsCount.toLocaleString("fr-FR"), label: "Interventions réalisées" },
      { value: siteConfig.googleReviewCount, label: "Avis Google" },
      { value: `${siteConfig.googleRating}/5`, label: "Note moyenne" },
    ],
  },
  valeurs: {
    title: "Nos valeurs",
    items: [
      { title: "Réactivité", desc: `Nous intervenons dans les meilleurs délais. En urgence, comptez moins de ${clientConfig.chiffres.delaiIntervention}.` },
      { title: "Transparence", desc: "Devis détaillés, tarifs clairs, pas de mauvaise surprise. Vous savez exactement ce que vous payez." },
      { title: "Qualité", desc: "Travail soigné, matériaux de qualité, chantier propre. Nous garantissons la qualité de nos prestations." },
    ],
  },
  certifications: {
    title: "Certifications et assurances",
    subtitle: "Votre tranquillité d'esprit est notre priorité.",
    items: [
      { label: "Certification RGE QualiPAC", value: siteConfig.rge },
      { label: "Assurance décennale", value: siteConfig.assuranceDecennale },
      { label: "SIRET", value: siteConfig.siret },
    ],
  },
};

// ─── Page Blog ───

export const blog = {
  hero: {
    title: "Blog — Conseils et astuces plomberie",
    subtitle: "Retrouvez bientôt nos articles pour vous aider au quotidien.",
  },
  empty: {
    title: "Bientôt disponible",
    text: "Nous préparons des articles sur l'entretien de votre plomberie, les économies d'énergie, les aides pour la rénovation... Revenez bientôt !",
  },
};

// ─── Page Réalisations ───

export const realisationsPage = {
  hero: {
    title: "Nos réalisations — Avant / Après",
    subtitle: "Découvrez nos derniers chantiers en images. Chaque projet est réalisé avec soin et professionnalisme.",
  },
  categories: ["Tout", "Salle de bain", "Plomberie", "Chauffage", "Chauffe-eau"],
  empty: "Aucune réalisation dans cette catégorie pour le moment.",
  cta: {
    title: "Vous avez un projet similaire ?",
    subtitle: "Contactez-nous pour un devis gratuit et personnalisé.",
  },
};

// ─── Page Mentions légales ───

export const mentionsLegales = {
  title: "Mentions légales",
  editeur: {
    title: "1. Éditeur du site",
    intro: (url: string) => `Le site ${url} est édité par :`,
    labels: {
      raisonSociale: "Raison sociale :",
      siege: "Siège social :",
      siret: "SIRET :",
      telephone: "Téléphone :",
      email: "Email :",
      directeurPublication: "Directeur de la publication :",
    },
  },
  hebergeur: {
    title: "2. Hébergeur",
    text: "Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
  },
  propriete: {
    title: "3. Propriété intellectuelle",
    text: (legalName: string) =>
      `L'ensemble des contenus (textes, images, graphismes, logo, icônes) de ce site sont la propriété exclusive de ${legalName}, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.`,
  },
  rgpd: {
    title: "4. Protection des données personnelles (RGPD)",
    paragraphs: [
      "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.",
      "Les données collectées via le formulaire de contact (nom, téléphone, email, message) sont utilisées uniquement pour répondre à votre demande. Elles ne sont ni transmises à des tiers, ni utilisées à des fins commerciales.",
    ],
    labels: {
      responsable: "Responsable du traitement :",
      contact: "Contact :",
      duree: "Durée de conservation :",
    },
    dureeValue: "3 ans à compter du dernier contact.",
    droitsIntro: "Pour exercer vos droits, adressez-vous à :",
  },
  cookies: {
    title: "5. Cookies",
    text: "Ce site utilise des cookies strictement nécessaires à son fonctionnement. Aucun cookie de tracking ou publicitaire n'est utilisé. Des cookies d'analyse anonyme (Google Analytics) peuvent être mis en place avec votre consentement.",
  },
  credits: {
    title: "6. Crédits",
    text: "Site conçu et développé par",
    agence: "Agence Celexia",
  },
};
