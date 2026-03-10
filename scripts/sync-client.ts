/**
 * sync-client.ts
 * Lit CLIENT.md a la racine du projet et genere src/config/client.config.ts
 *
 * Usage : npm run sync-client   (alias de "npx tsx scripts/sync-client.ts")
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), "..");
const CLIENT_MD = resolve(ROOT, "CLIENT.md");
const OUTPUT = resolve(ROOT, "src/config/client.config.ts");


function extractNumber(s) {
  const match = s.match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

function phoneToHref(phone: string): string {
  // "06 72 45 89 13" -> "tel:+33672458913"
  const digits = phone.replace(/\s+/g, "");
  if (digits.startsWith("0")) {
    return `tel:+33${digits.slice(1)}`;
  }
  return `tel:${digits}`;
}

function urlFromDomaine(domaine: string): string {
  return `https://www.${domaine}`;
}

/** Parse "Lyon:69001-69009" -> { name, postalCode } */
function parseCommune(raw: string): { name: string; postalCode: string } {
  const [name, postalCode] = raw.split(":");
  return { name: name.trim(), postalCode: (postalCode ?? "").trim() };
}


/** Parse TEMOIGNAGE pipe format: "name|note|text|date|source" */
function parseTestimonial(raw: string) {
  const parts = raw.split("|");
  return {
    name: (parts[0] ?? "").trim(),
    rating: Number((parts[1] ?? "5").trim()),
    text: (parts[2] ?? "").trim(),
    date: (parts[3] ?? "").trim(),
    source: (parts[4] ?? "").trim(),
  };
}

/** Numbers that should be parsed as actual numbers */
const NUMBER_KEYS = new Set([
  "ANNEES_EXPERIENCE",
  "NOMBRE_INTERVENTIONS",
  "NOTE_GOOGLE",
  "NOMBRE_AVIS",
  "ANNEE_CREATION",
]);

/** Replace template placeholders in static source files */
function patchStaticFiles(
  root: string,
  replacements: Record<string, string>
): void {
  const targets = [
    "src/components/admin/DashboardTab.tsx",
    "src/components/admin/TemoignagesTab.tsx",
    "src/config/realisations.ts",
    "src/data/projects.ts",
    "src/data/testimonials.ts",
  ];

  for (const rel of targets) {
    const filePath = resolve(root, rel);
    if (!existsSync(filePath)) continue;

    let content = readFileSync(filePath, "utf-8");
    let changed = false;

    for (const [placeholder, value] of Object.entries(replacements)) {
      if (value && content.includes(placeholder)) {
        content = content.split(placeholder).join(value);
        changed = true;
      }
    }

    if (changed) {
      writeFileSync(filePath, content, "utf-8");
      console.log(`\u2713 ${rel} patche`);
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!existsSync(CLIENT_MD)) {
    console.warn("CLIENT.md introuvable - build avec config par defaut.");
    const lines = [];
    lines.push('// Auto-generated default config (CLIENT.md not yet available)');
    lines.push('export const clientConfig = {');
    lines.push('  identity: { prenomDirigeant: "", nomDirigeant: "", nomEntreprise: "Mon Entreprise", nomLegal: "", genreDirigeant: "M", founder: "" },');
    lines.push('  contact: { telephone: "", telephoneHref: "", telephoneUrgence: "", email: "", adresse: "", ville: "", codePostal: "", departement: "", region: "", zoneIntervention: "", zoneKm: "" },');
    lines.push('  horaires: { semaine: "", samedi: "", dimanche: "", urgence: "" },');
    lines.push('  branding: { couleurPrimaireHue: "210", couleurAccentHue: "30" },');
    lines.push('  social: { facebook: "", instagram: "", google: "" },');
    lines.push('  domaine: "", url: "",');
    lines.push('  legal: { siret: "", rge: "", assuranceDecennale: "" },');
    lines.push('  chiffres: { anneesExperience: 0, nombreInterventions: 0, noteGoogle: 0, nombreAvis: 0, anneeCreation: 0, delaiIntervention: "", disponibilite: "", tauxSatisfaction: "" },');
    lines.push('  geo: { latitude: "", longitude: "" },');
    lines.push('  communes: [], services: [], testimonials: [],');
    lines.push('  admin: { password: "" },');
    lines.push('  seo: { metaTitleAccueil: "", metaDescAccueil: "", descriptionEntreprise: "", slogan: "" },');
    lines.push('} as const;');
    lines.push('export type ClientConfig = typeof clientConfig;');
    writeFileSync(OUTPUT, lines.join("
"), "utf-8");
    console.log("client.config.ts genere avec valeurs par defaut -> " + OUTPUT);
    process.exit(0);
  }

  const content = readFileSync(CLIENT_MD, "utf-8");
  const lines = content.split(/\r?\n/);

  const vars = new Map<string, string>();

  for (const line of lines) {
    const trimmed = line.trim();
    // Skip empty, comments, section headers
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Match KEY: "value"
    const match = trimmed.match(/^([A-Z_0-9]+):\s*"(.*)"$/);
    if (match) {
      vars.set(match[1], match[2]);
    }
  }

  console.log(`\u2713 CLIENT.md lu (${vars.size} variables)`);

  // --- Collect parsed values -----------------------------------------------

  const get = (key: string) => vars.get(key) ?? "";

  // Identity
  const prenomDirigeant = get("PRENOM_DIRIGEANT");
  const nomDirigeant = get("NOM_DIRIGEANT");
  const nomEntreprise = get("NOM_ENTREPRISE");
  const nomLegal = get("NOM_LEGAL");
  const genreDirigeant = get("GENRE_DIRIGEANT");
  const founder = `${prenomDirigeant} ${nomDirigeant}`.trim();

  // Contact
  const telephone = get("TELEPHONE");
  const telephoneHref = phoneToHref(telephone);
  const telephoneUrgence = get("TELEPHONE_URGENCE");
  const email = get("EMAIL");
  const adresse = get("ADRESSE");
  const ville = get("VILLE");
  const codePostal = get("CODE_POSTAL");
  const departement = get("DEPARTEMENT");
  const region = get("REGION");
  const zoneIntervention = get("ZONE_INTERVENTION");
  const zoneKm = get("ZONE_KM");

  // Horaires
  const horairesSemaine = get("HORAIRES_SEMAINE");
  const horairesSamedi = get("HORAIRES_SAMEDI");
  const horairesDimanche = get("HORAIRES_DIMANCHE");
  const horairesUrgence = get("HORAIRES_URGENCE");

  // Branding
  const couleurPrimaireHue = get("COULEUR_PRIMAIRE_HUE");
  const couleurAccentHue = get("COULEUR_ACCENT_HUE");

  // Social
  const facebookUrl = get("FACEBOOK_URL");
  const instagramUrl = get("INSTAGRAM_URL");
  const googleUrl = get("GOOGLE_URL");
  const domaine = get("DOMAINE");
  const url = urlFromDomaine(domaine);

  // Legal
  const siret = get("SIRET");
  const rge = get("RGE");
  const assuranceDecennale = get("ASSURANCE_DECENNALE");

  // Chiffres
  const anneesExperience = extractNumber(get("ANNEES_EXPERIENCE")) || 15;
  const nombreInterventions = extractNumber(get("NOMBRE_INTERVENTIONS")) || 500;
  const noteGoogle = extractNumber(get("NOTE_GOOGLE")) || 4.8;
  const nombreAvis = extractNumber(get("NOMBRE_AVIS")) || 45;
  const anneeCreation = extractNumber(get("ANNEE_CREATION")) || 2010;
  const delaiIntervention = get("DELAI_INTERVENTION");
  const disponibilite = get("DISPONIBILITE");
  const tauxSatisfaction = get("TAUX_SATISFACTION").replace(/%/g, "").trim() || "98";

  // Geo
  const latitude = get("LATITUDE");
  const longitude = get("LONGITUDE");

  // Communes
  const communesRaw = get("COMMUNES");
  const communes = communesRaw
    ? communesRaw.split("|").map(parseCommune)
    : [];

  // Services are hardcoded in src/config/services.ts

  // Testimonials
  const testimonials: ReturnType<typeof parseTestimonial>[] = [];
  for (let i = 1; i <= 50; i++) {
    const key = `TEMOIGNAGE_${i}`;
    if (vars.has(key)) {
      testimonials.push(parseTestimonial(vars.get(key)!));
    }
  }

  // Admin
  const adminPassword = get("ADMIN_PASSWORD");

  // SEO
  const metaTitleAccueil = get("META_TITLE_ACCUEIL");
  const metaDescAccueil = get("META_DESC_ACCUEIL");
  const descriptionEntreprise = get("DESCRIPTION_ENTREPRISE");
  const slogan = get("SLOGAN");

  // --- Generate TypeScript --------------------------------------------------

  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

  const communesTs = communes
    .map((c) => `    { name: "${esc(c.name)}", postalCode: "${esc(c.postalCode)}" },`)
    .join("\n");

  const servicesTs = "";

  const testimonialsTs = testimonials
    .map(
      (t) =>
        `    { name: "${esc(t.name)}", rating: ${t.rating}, text: "${esc(t.text)}", date: "${esc(t.date)}", source: "${esc(t.source)}" },`
    )
    .join("\n");

  const output = `// \u26a0\ufe0f FICHIER AUTO-G\u00c9N\u00c9R\u00c9 \u2014 ne pas modifier manuellement
// Modifie CLIENT.md puis relance : npm run sync-client

export const clientConfig = {
  identity: {
    prenomDirigeant: "${esc(prenomDirigeant)}",
    nomDirigeant: "${esc(nomDirigeant)}",
    nomEntreprise: "${esc(nomEntreprise)}",
    nomLegal: "${esc(nomLegal)}",
    genreDirigeant: "${esc(genreDirigeant)}",
    founder: "${esc(founder)}",
  },
  contact: {
    telephone: "${esc(telephone)}",
    telephoneHref: "${esc(telephoneHref)}",
    telephoneUrgence: "${esc(telephoneUrgence)}",
    email: "${esc(email)}",
    adresse: "${esc(adresse)}",
    ville: "${esc(ville)}",
    codePostal: "${esc(codePostal)}",
    departement: "${esc(departement)}",
    region: "${esc(region)}",
    zoneIntervention: "${esc(zoneIntervention)}",
    zoneKm: "${esc(zoneKm)}",
  },
  horaires: {
    semaine: "${esc(horairesSemaine)}",
    samedi: "${esc(horairesSamedi)}",
    dimanche: "${esc(horairesDimanche)}",
    urgence: "${esc(horairesUrgence)}",
  },
  branding: {
    couleurPrimaireHue: "${esc(couleurPrimaireHue)}",
    couleurAccentHue: "${esc(couleurAccentHue)}",
  },
  social: {
    facebook: "${esc(facebookUrl)}",
    instagram: "${esc(instagramUrl)}",
    google: "${esc(googleUrl)}",
  },
  domaine: "${esc(domaine)}",
  url: "${esc(url)}",
  legal: {
    siret: "${esc(siret)}",
    rge: "${esc(rge)}",
    assuranceDecennale: "${esc(assuranceDecennale)}",
  },
  chiffres: {
    anneesExperience: ${anneesExperience},
    nombreInterventions: ${nombreInterventions},
    noteGoogle: ${noteGoogle},
    nombreAvis: ${nombreAvis},
    anneeCreation: ${anneeCreation},
    delaiIntervention: "${esc(delaiIntervention)}",
    disponibilite: "${esc(disponibilite)}",
    tauxSatisfaction: "${esc(tauxSatisfaction)}",
  },
  geo: {
    latitude: "${esc(latitude)}",
    longitude: "${esc(longitude)}",
  },
  communes: [
${communesTs}
  ],
  services: [],
  testimonials: [
${testimonialsTs}
  ],
  admin: {
    password: "${esc(adminPassword)}",
  },
  seo: {
    metaTitleAccueil: "${esc(metaTitleAccueil)}",
    metaDescAccueil: "${esc(metaDescAccueil)}",
    descriptionEntreprise: "${esc(descriptionEntreprise)}",
    slogan: "${esc(slogan)}",
  },
} as const;

export type ClientConfig = typeof clientConfig;
`;

  writeFileSync(OUTPUT, output, "utf-8");
  console.log(`\u2713 client.config.ts g\u00e9n\u00e9r\u00e9 -> ${OUTPUT}`);

  // --- Patch static files with template variables --------------------------
  patchStaticFiles(ROOT, {
    "{VILLE}": ville,
    "{COMMUNE_1}": communes[0]?.name ?? "",
    "{COMMUNE_2}": communes[1]?.name ?? "",
    "{COMMUNE_3}": communes[2]?.name ?? "",
    "{ZONE_KM}": zoneKm,
    "{NOM_ENTREPRISE}": nomEntreprise,
    "{DISPONIBILITE}": disponibilite,
  });
}

main();
