import type { Service } from "@/types";

/**
 * Services fixes du template plombier.
 * NE PAS rendre dynamique — les routes sont des pages statiques du template.
 */
export const services: readonly Service[] = [
  {
    title: "Dépannage plomberie",
    shortDescription: "Intervention rapide pour fuites, canalisations bouchées et urgences.",
    description: "Dépannage en urgence : fuites d'eau, canalisations bouchées, robinetterie défaillante. Intervention rapide 7j/7.",
    icon: "Siren",
    slug: "/depannage-plomberie",
  },
  {
    title: "Plomberie générale",
    shortDescription: "Installation et réparation de canalisations, robinetterie et sanitaires.",
    description: "Travaux de plomberie : installation, réparation et remplacement de canalisations, robinets, WC, éviers.",
    icon: "Wrench",
    slug: "/plomberie",
  },
  {
    title: "Salle de bain",
    shortDescription: "Rénovation complète de salle de bain clé en main.",
    description: "Rénovation de salle de bain : dépose, plomberie, carrelage, douche à l'italienne, baignoire. Devis gratuit.",
    icon: "Bath",
    slug: "/renovation-salle-de-bain",
  },
  {
    title: "Chauffage",
    shortDescription: "Installation et entretien de chaudières et systèmes de chauffage.",
    description: "Installation, entretien et dépannage de chaudières gaz, fioul, pompes à chaleur. Contrat d'entretien annuel.",
    icon: "Flame",
    slug: "/chauffage",
  },
  {
    title: "Chauffe-eau",
    shortDescription: "Installation et remplacement de chauffe-eau et ballons d'eau chaude.",
    description: "Pose, remplacement et dépannage de chauffe-eau électriques, thermodynamiques et solaires.",
    icon: "Droplets",
    slug: "/chauffe-eau",
  },
  {
    title: "Entretien & contrat",
    shortDescription: "Contrats d'entretien annuel pour chaudière et plomberie.",
    description: "Entretien annuel obligatoire de chaudière, vérification des installations, contrat de maintenance préventive.",
    icon: "ClipboardCheck",
    slug: "/contact",
  },
] as const;
