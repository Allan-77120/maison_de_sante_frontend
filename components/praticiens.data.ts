export type Praticien = {
  id: number;
  nom: string;
  initiales: string;
  specialite: string;
  langues: string[];
  url: string;
  rpps?: string;
  diplome?: string;
  formation?: string;
  convention?: string;
  paiements?: string[];
  carteVitale?: boolean;
  adresse?: string[];
  acces?: string;
  horaires?: string;
telephone?: string;
};

export const praticiens: Praticien[] = [
  {
    id: 1,
    nom: "Dr Marion Thevenot",
    initiales: "MT",
    specialite: "Medecin generaliste",
    langues: ["Francais"],
    rpps: "1010616964",
    diplome: "D.E.S. Medecine generale",
    formation: "Master 2 méthodologie et statistiques en recherche biomédicale",
    convention: "Conventionne secteur 1",
    paiements: ["CB", "Especes", "Chèques"],
    carteVitale: true,
    url: "https://docteur-thevenot.sante.pro/",
  },
  {
    id: 2,
    nom: "Dr Marion Berrebi",
    initiales: "MB",
    specialite: "Medecin generaliste",
    langues: ["Francais"],
    carteVitale: true,
    diplome: "D.E.S. Medecine generale",
    convention: "Conventionne secteur 1",
    url: "https://docteur-berrebi.sante.pro/",
  },
  {
    id: 3,
    nom: "Dr Iveta Ivanova",
    initiales: "II",
    specialite: "Medecin generaliste",
    langues: ["Francais", "Anglais", "Bulgare"],
    url: "https://docteur-ivanova.sante.pro/",
    rpps: "1010616964",
    diplome: "D.E.S. Medecine generale",
    formation:
      "DIU Formation complementaire en Gynecologie et Obstetrique pour medecins generalistes, DIU Contraception et Orthogenie",
    convention: "Conventionne secteur 1",
    paiements: ["CB", "Especes"],
    carteVitale: true,
  },
];
