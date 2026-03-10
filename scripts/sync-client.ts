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

function extractNumber(s: string): number {
  const match = s.match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

function phoneToHref(phone: string): string {
  const digits = phone.replace(/\s+/g, "");
  if (digits.startsWith("0")) {
    return "tel:+33" + digits.slice(1);
  }
  return "tel:" + digits;
}

function urlFromDomaine(domaine: string): string {
  return "https://www." + domaine;
}

function parseCommune(raw: string): { name: string; postalCode: string } {
  const [name, postalCode] = raw.split(":");
  return { name: name.trim(), postalCode: (postalCode ?? "").trim() };
}

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

const NUMBER_KEYS = new Set([
  "ANNEES_EXPERIENCE",
  "NOMBRE_INTERVENTIONS",
  "NOTE_GOOGLE",
  "NOMBRE_AVIS",
  "ANNEE_CREATION",
]);

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
      console.log("\u2713 " + rel + " patche");
    }
  }
}

// ---------------------------------------------------------------------------
// Escape helper for generated TS strings
// ---------------------------------------------------------------------------

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

// ---------------------------------------------------------------------------
// Generate default config when CLIENT.md is missing
// ---------------------------------------------------------------------------

function generateDefaultConfig(): string {
  const L: string[] = [];
  L.push("// Auto-generated default config (CLIENT.md not yet available)");
  L.push("export const clientConfig = {");
  L.push('  identity: { prenomDirigeant: "", nomDirigeant: "", nomEntreprise: "Mon Entreprise", nomLegal: "", genreDirigeant: "M", founder: "" },');
  L.push('  contact: { telephone: "", telephoneHref: "", telephoneUrgence: "", email: "", adresse: "", ville: "", codePostal: "", departement: "", region: "", zoneIntervention: "", zoneKm: "" },');
  L.push('  horaires: { semaine: "", samedi: "", dimanche: "", urgence: "" },');
  L.push('  branding: { couleurPrimaireHue: "210", couleurAccentHue: "30" },');
  L.push('  social: { facebook: "", instagram: "", google: "" },');
  L.push('  domaine: "", url: "",');
  L.push('  legal: { siret: "", rge: "", assuranceDecennale: "" },');
  L.push('  chiffres: { anneesExperience: 0, nombreInterventions: 0, noteGoogle: 0, nombreAvis: 0, anneeCreation: 0, delaiIntervention: "", disponibilite: "", tauxSatisfaction: "" },');
  L.push('  geo: { latitude: "", longitude: "" },');
  L.push("  communes: [], services: [], testimonials: [],");
  L.push('  admin: { password: "" },');
  L.push('  seo: { metaTitleAccueil: "", metaDescAccueil: "", descriptionEntreprise: "", slogan: "" },');
  L.push("} as const;");
  L.push("export type ClientConfig = typeof clientConfig;");
  L.push("");
  return L.join("\n");
}

// ---------------------------------------------------------------------------
// Generate full config from parsed CLIENT.md variables
// ---------------------------------------------------------------------------

function generateConfig(vars: Map<string, string>): string {
  const get = (key: string) => vars.get(key) ?? "";

  // Identity
  const prenomDirigeant = get("PRENOM_DIRIGEANT");
  const nomDirigeant = get("NOM_DIRIGEANT");
  const nomEntreprise = get("NOM_ENTREPRISE");
  const nomLegal = get("NOM_LEGAL");
  const genreDirigeant = get("GENRE_DIRIGEANT");
  const founder = (prenomDirigeant + " " + nomDirigeant).trim();

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

  // Testimonials
  const testimonials: ReturnType<typeof parseTestimonial>[] = [];
  for (let i = 1; i <= 50; i++) {
    const key = "TEMOIGNAGE_" + i;
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

  // --- Build output using lines.push (avoids template literal issues) ------

  const L: string[] = [];
  L.push("// \u26a0\ufe0f FICHIER AUTO-G\u00c9N\u00c9R\u00c9 \u2014 ne pas modifier manuellement");
  L.push("// Modifie CLIENT.md puis relance : npm run sync-client");
  L.push("");
  L.push("export const clientConfig = {");

  // Identity
  L.push("  identity: {");
  L.push('    prenomDirigeant: "' + esc(prenomDirigeant) + '",');
  L.push('    nomDirigeant: "' + esc(nomDirigeant) + '",');
  L.push('    nomEntreprise: "' + esc(nomEntreprise) + '",');
  L.push('    nomLegal: "' + esc(nomLegal) + '",');
  L.push('    genreDirigeant: "' + esc(genreDirigeant) + '",');
  L.push('    founder: "' + esc(founder) + '",');
  L.push("  },");

  // Contact
  L.push("  contact: {");
  L.push('    telephone: "' + esc(telephone) + '",');
  L.push('    telephoneHref: "' + esc(telephoneHref) + '",');
  L.push('    telephoneUrgence: "' + esc(telephoneUrgence) + '",');
  L.push('    email: "' + esc(email) + '",');
  L.push('    adresse: "' + esc(adresse) + '",');
  L.push('    ville: "' + esc(ville) + '",');
  L.push('    codePostal: "' + esc(codePostal) + '",');
  L.push('    departement: "' + esc(departement) + '",');
  L.push('    region: "' + esc(region) + '",');
  L.push('    zoneIntervention: "' + esc(zoneIntervention) + '",');
  L.push('    zoneKm: "' + esc(zoneKm) + '",');
  L.push("  },");

  // Horaires
  L.push("  horaires: {");
  L.push('    semaine: "' + esc(horairesSemaine) + '",');
  L.push('    samedi: "' + esc(horairesSamedi) + '",');
  L.push('    dimanche: "' + esc(horairesDimanche) + '",');
  L.push('    urgence: "' + esc(horairesUrgence) + '",');
  L.push("  },");

  // Branding
  L.push("  branding: {");
  L.push('    couleurPrimaireHue: "' + esc(couleurPrimaireHue) + '",');
  L.push('    couleurAccentHue: "' + esc(couleurAccentHue) + '",');
  L.push("  },");

  // Social
  L.push("  social: {");
  L.push('    facebook: "' + esc(facebookUrl) + '",');
  L.push('    instagram: "' + esc(instagramUrl) + '",');
  L.push('    google: "' + esc(googleUrl) + '",');
  L.push("  },");

  // Domain
  L.push('  domaine: "' + esc(domaine) + '",');
  L.push('  url: "' + esc(url) + '",');

  // Legal
  L.push("  legal: {");
  L.push('    siret: "' + esc(siret) + '",');
  L.push('    rge: "' + esc(rge) + '",');
  L.push('    assuranceDecennale: "' + esc(assuranceDecennale) + '",');
  L.push("  },");

  // Chiffres
  L.push("  chiffres: {");
  L.push("    anneesExperience: " + anneesExperience + ",");
  L.push("    nombreInterventions: " + nombreInterventions + ",");
  L.push("    noteGoogle: " + noteGoogle + ",");
  L.push("    nombreAvis: " + nombreAvis + ",");
  L.push("    anneeCreation: " + anneeCreation + ",");
  L.push('    delaiIntervention: "' + esc(delaiIntervention) + '",');
  L.push('    disponibilite: "' + esc(disponibilite) + '",');
  L.push('    tauxSatisfaction: "' + esc(tauxSatisfaction) + '",');
  L.push("  },");

  // Geo
  L.push("  geo: {");
  L.push('    latitude: "' + esc(latitude) + '",');
  L.push('    longitude: "' + esc(longitude) + '",');
  L.push("  },");

  // Communes
  L.push("  communes: [");
  for (const c of communes) {
    L.push('    { name: "' + esc(c.name) + '", postalCode: "' + esc(c.postalCode) + '" },');
  }
  L.push("  ],");

  // Services - hardcoded in src/config/services.ts, empty here
  L.push("  services: [],");

  // Testimonials
  L.push("  testimonials: [");
  for (const t of testimonials) {
    L.push('    { name: "' + esc(t.name) + '", rating: ' + t.rating + ', text: "' + esc(t.text) + '", date: "' + esc(t.date) + '", source: "' + esc(t.source) + '" },');
  }
  L.push("  ],");

  // Admin
  L.push("  admin: {");
  L.push('    password: "' + esc(adminPassword) + '",');
  L.push("  },");

  // SEO
  L.push("  seo: {");
  L.push('    metaTitleAccueil: "' + esc(metaTitleAccueil) + '",');
  L.push('    metaDescAccueil: "' + esc(metaDescAccueil) + '",');
  L.push('    descriptionEntreprise: "' + esc(descriptionEntreprise) + '",');
  L.push('    slogan: "' + esc(slogan) + '",');
  L.push("  },");

  L.push("} as const;");
  L.push("");
  L.push("export type ClientConfig = typeof clientConfig;");
  L.push("");

  return L.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!existsSync(CLIENT_MD)) {
    console.warn("CLIENT.md introuvable - build avec config par defaut.");
    writeFileSync(OUTPUT, generateDefaultConfig(), "utf-8");
    console.log("client.config.ts genere avec valeurs par defaut -> " + OUTPUT);
    process.exit(0);
  }

  const content = readFileSync(CLIENT_MD, "utf-8");
  const lines = content.split(/\r?\n/);

  const vars = new Map<string, string>();

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^([A-Z_0-9]+):\s*"(.*)"$/);
    if (match) {
      vars.set(match[1], match[2]);
    }
  }

  console.log("\u2713 CLIENT.md lu (" + vars.size + " variables)");

  const output = generateConfig(vars);
  writeFileSync(OUTPUT, output, "utf-8");
  console.log("\u2713 client.config.ts genere -> " + OUTPUT);

  // --- Patch static files with template variables --------------------------
  const get = (key: string) => vars.get(key) ?? "";
  const communesRaw = get("COMMUNES");
  const communes = communesRaw ? communesRaw.split("|").map(parseCommune) : [];

  patchStaticFiles(ROOT, {
    "{VILLE}": get("VILLE"),
    "{COMMUNE_1}": communes[0]?.name ?? "",
    "{COMMUNE_2}": communes[1]?.name ?? "",
    "{COMMUNE_3}": communes[2]?.name ?? "",
    "{ZONE_KM}": get("ZONE_KM"),
    "{NOM_ENTREPRISE}": get("NOM_ENTREPRISE"),
    "{DISPONIBILITE}": get("DISPONIBILITE"),
  });
}

main();
