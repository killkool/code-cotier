import fs from "node:fs";

const COURSE = "data/course.ts";
const PLATES = "components/ExamPlates.tsx";

let course = fs.readFileSync(COURSE, "utf8");
let plates = fs.readFileSync(PLATES, "utf8");

function replaceRequired(text, search, replacement, label) {
  if (!text.includes(search)) {
    throw new Error(`Correction target not found: ${label}`);
  }
  return text.replace(search, replacement);
}

function replaceOptional(text, search, replacement, label) {
  if (!text.includes(search)) {
    console.warn(`Optional target not found: ${label}`);
    return text;
  }
  return text.replace(search, replacement);
}

function replaceRegexRequired(text, regex, replacement, label) {
  if (!regex.test(text)) {
    throw new Error(`Regex correction target not found: ${label}`);
  }
  return text.replace(regex, replacement);
}

function insertBeforeOnce(text, marker, insertion, uniqueNeedle, label) {
  if (text.includes(uniqueNeedle)) return text;
  if (!text.includes(marker)) throw new Error(`Insertion target not found: ${label}`);
  return text.replace(marker, `${insertion}${marker}`);
}

// ---------------------------------------------------------------------------
// 1. Balisage : eaux saines + signalisation des plages
// ---------------------------------------------------------------------------
course = replaceRequired(
  course,
  "Eaux saines : bandes verticales rouges et blanches, une boule rouge. Feu blanc, souvent à un éclat. Milieu de chenal, atterrissage ou zone d'eau sûre. Ce n'est pas un danger.",
  "Eaux saines : bandes verticales rouges et blanches, une boule rouge. Le feu est blanc et peut être isophase (Iso), à occultations (Oc), à un éclat long toutes les 10 secondes (LFl 10s) ou Morse A (Mo(A)). Milieu de chenal, atterrissage ou zone d'eau sûre. Ce n'est pas un danger.",
  "safe-water light characteristics"
);

course = replaceRequired(
  course,
  '{ term: "Pavillons de plage", meaning: "Vert : baignade surveillée. Jaune : dangereuse mais surveillée. Rouge : interdite. Violet : pollution. Manche à air orange : vent fort, gonflables interdits." },',
  '{ term: "Pavillons de plage", meaning: "Vert : baignade surveillée sans danger apparent. Jaune : baignade surveillée avec danger limité ou marqué. Rouge : baignade interdite. Deux drapeaux rouge et jaune délimitent la zone de baignade surveillée. Un signal violet peut notamment signaler une pollution, des espèces aquatiques dangereuses ou une zone marine/sous-marine protégée. La manche à air orange signale des conditions de vent défavorables pour certains équipements nautiques, notamment les gonflables." },',
  "beach flag glossary"
);

course = replaceRequired(
  course,
  '{ id: "bal-20", question: "Cette manche à air orange sur une plage signifie surtout :", choices: ["Baignade interdite pour pollution", "Vent fort : engins gonflables interdits", "Port fermé", "Plongée en cours"], correct: 1, explanation: "Manche à air orange = vent fort, matelas et bouées gonflables interdits.", image: "/images/manche-air-orange.jpg", imageAlt: "Manche à air orange de plage." },',
  '{ id: "bal-20", question: "Cette manche à air orange sur une plage signale surtout :", choices: ["Une pollution de l’eau", "Des conditions de vent défavorables pour certains équipements nautiques, notamment les gonflables", "La fermeture du port", "Une plongée en cours"], correct: 1, explanation: "La manche à air orange signale des conditions de vent défavorables pour certains équipements nautiques. Elle ne constitue pas, à elle seule, une interdiction nationale automatique de tous les gonflables : la signalisation et les règles locales restent à respecter.", image: "/images/manche-air-orange.jpg", imageAlt: "Manche à air orange de plage." },',
  "orange windsock quiz"
);

// ---------------------------------------------------------------------------
// 2. Signaux portuaires AISM + détresse
// ---------------------------------------------------------------------------
course = replaceRequired(
  course,
  "Combinaisons souvent enseignées en France : trois feux rouges verticaux = entrée (et parfois sortie) interdite ; deux feux verts verticaux = entrée autorisée. D'autres feux (blanc intercalé, clignotant) signalent une restriction ou une urgence. Ce n'est pas un code universel identique dans tous les ports du monde : on vérifie Instructions nautiques, guide du port, VHF du port.",
  "Dans la signalisation principale AISM de trafic portuaire, le message est composé de trois feux verticaux. Trois rouges fixes (ou à occultations lentes synchronisées) signifient que les navires ne doivent pas poursuivre. Trois verts signifient que les navires peuvent poursuivre avec trafic à sens unique. Vert-vert-blanc autorise la poursuite avec trafic dans les deux sens. Vert-blanc-vert signifie que le navire ne peut poursuivre qu'après un ordre spécifique. Trois rouges clignotant ensemble signalent une urgence grave : tous les navires doivent s'arrêter ou se dérouter selon les instructions. Les signaux auxiliaires et prescriptions locales restent à vérifier dans les documents du port.",
  "port traffic lesson"
);

course = replaceRequired(
  course,
  '"3 rouges verticaux : accès souvent interdit.",\n          "2 verts : accès souvent autorisé.",\n          "Toujours confirmer sur les documents du port.",',
  '"3 rouges : ne pas poursuivre.",\n          "3 verts : passage possible, trafic à sens unique. Vert-vert-blanc : passage possible dans les deux sens.",\n          "Vert-blanc-vert : seulement après ordre spécifique. Toujours respecter les instructions et documents du port.",',
  "port traffic remember"
);

course = replaceRequired(
  course,
  '{ id: "sig-6", question: "Trois feux rouges verticaux à l\'entrée d\'un port signifient le plus souvent :", choices: ["Accès autorisé", "Accès interdit", "Baignade surveillée", "Chenal préféré à tribord"], correct: 1, explanation: "Combinaison souvent enseignée : trois rouges = entrée interdite. Confirmer toujours sur les documents du port.", plate: "port-traffic" },',
  '{ id: "sig-6", question: "Trois feux rouges verticaux de trafic portuaire signifient :", choices: ["Je peux poursuivre", "Je ne dois pas poursuivre", "Baignade surveillée", "Chenal préféré à tribord"], correct: 1, explanation: "Dans la signalisation principale AISM, trois rouges signifient que les navires ne doivent pas poursuivre.", plate: "port-traffic" },',
  "port traffic red quiz"
);

course = replaceRequired(
  course,
  '{ id: "sig-7", question: "Deux feux verts verticaux à l\'entrée d\'un port indiquent le plus souvent :", choices: ["Port fermé", "Entrée autorisée", "Détresse", "Mouillage obligatoire"], correct: 1, explanation: "Deux verts : accès souvent autorisé, sans dispenser des règles de chenal et de vitesse.", plate: "port-traffic" },',
  '{ id: "sig-7", question: "Trois feux verts verticaux de trafic portuaire indiquent :", choices: ["Ne pas poursuivre", "Les navires peuvent poursuivre, avec trafic à sens unique", "Une détresse", "Un mouillage obligatoire"], correct: 1, explanation: "Trois verts autorisent la poursuite avec trafic à sens unique. Vert-vert-blanc indique que les navires peuvent poursuivre avec trafic dans les deux sens.", plate: "port-traffic" },',
  "port traffic green quiz"
);

course = replaceRequired(
  course,
  "Le RIPAM et les conventions listent les signaux reconnus. Au permis : feu rouge à main, fusée parachute rouge, fumigène orange, appel MAYDAY, touche DISTRESS ASN, miroir, signal sonore continu… On ne « teste » pas une fusée pour le plaisir.",
  "Le RIPAM et les conventions listent les signaux reconnus. Au permis : feu rouge à main, fusée parachute rouge, fumigène orange, appel MAYDAY, alerte DISTRESS ASN, émission continue d'un signal sonore, etc. Le miroir de signalisation peut servir à attirer l'attention mais n'est pas, à lui seul, un signal de détresse de l'annexe IV du RIPAM. Le signal gestuel reconnu consiste à lever et abaisser lentement et de façon répétée les bras étendus de chaque côté. On ne « teste » jamais une fusée pour le plaisir.",
  "distress signal wording"
);

// ---------------------------------------------------------------------------
// 3. Sécurité : 300 m, plongeurs, catégories CE, coupe-circuit
// ---------------------------------------------------------------------------
course = replaceRequired(
  course,
  'definition: "Dans la bande des 300 m le long du littoral, la vitesse est généralement limitée à 5 nœuds, sauf chenaux d\'accès réglementés et arrêtés locaux contraires.",',
  'definition: "Dans la bande des 300 m le long du littoral, on utilise les chenaux prévus pour les engins à moteur et on reste à moins de 5 nœuds. Les arrêtés locaux peuvent organiser ou restreindre davantage la navigation.",',
  "300m definition"
);

course = replaceRequired(
  course,
  "Exceptions fréquentes : le chenal d'accès à un port ou un chenal traversier de plage peut prévoir un régime différent — ce n'est pas un permis d'y foncer. Les ports ont souvent leur propre limite. Un arrêté préfectoral peut durcir (voire interdire certaines activités).",
  "Dans la bande des 300 m, la règle à retenir pour le permis est de rester à moins de 5 nœuds et d'utiliser les chenaux balisés lorsqu'ils existent pour rejoindre ou quitter le rivage. Les arrêtés locaux, les ports et les zones de baignade peuvent imposer des restrictions supplémentaires : ils ne sont jamais une raison d'accélérer au milieu des usagers vulnérables.",
  "300m channels paragraph"
);

course = replaceOptional(
  course,
  '"300 m : 5 nœuds en règle générale.",\n          "Chenaux et arrêtés locaux peuvent prévoir autre chose : les lire.",',
  '"300 m : moins de 5 nœuds ; utiliser les chenaux prévus pour les engins à moteur.",\n          "Les arrêtés locaux peuvent être plus restrictifs : les lire.",',
  "300m remember"
);

course = replaceRequired(
  course,
  "Des plongeurs peuvent être loin du bateau support. Un pavillon de plongée loisir (croix de Saint-André rouge/blanc) se rencontre aussi : même réflexe de prudence. On ne passe pas entre le bateau et les bulles.",
  "Des plongeurs peuvent être loin du bateau support. Il faut rester à au moins 100 m des pavillons signalant des plongeurs : pavillon Alpha (blanc et bleu), pavillon rouge à diagonale blanche / croix de Saint-André selon la signalisation rencontrée. Même prudence envers les lignes de pêche signalées : au moins 100 m. On ne passe jamais entre le bateau support et les bulles.",
  "diver 100m rule"
);

course = replaceRequired(
  course,
  '"Alpha = plongée = loin et lent.",',
  '"Plongeurs signalés : au moins 100 m de distance, loin et lent.",',
  "diver remember"
);

const ceSection = `      {
        title: "Catégories de conception CE",
        definition: "Les catégories A, B, C et D décrivent les conditions de vent et de vagues pour lesquelles un bateau de plaisance a été conçu. Elles ne donnent pas une distance maximale de navigation.",
        body: [
          "Catégorie A : conçue pour des conditions pouvant dépasser force 8 Beaufort et 4 m de hauteur significative de vague, hors conditions exceptionnelles. Catégorie B : jusqu'à force 8 incluse et vagues jusqu'à 4 m. Catégorie C : jusqu'à force 6 incluse et vagues jusqu'à 2 m. Catégorie D : jusqu'à force 4 incluse et vagues significatives jusqu'à 0,30 m, avec des vagues occasionnelles jusqu'à 0,50 m.",
          "Piège d'examen : une catégorie C ne signifie pas « côtier » au sens de 6 milles. Le permis, l'armement, la météo, la catégorie de conception et les limites du constructeur sont des contraintes différentes qui doivent toutes être respectées.",
        ],
        remember: [
          "A : > 8 / > 4 m possibles hors conditions exceptionnelles.",
          "B : ≤ 8 / ≤ 4 m. C : ≤ 6 / ≤ 2 m. D : ≤ 4 / ≤ 0,30 m (0,50 m occasionnel).",
          "Catégorie CE ≠ distance d'un abri.",
        ],
        traps: ["Confondre la lettre C de catégorie de conception avec le permis côtier."],
      },
`;

course = insertBeforeOnce(
  course,
  '      {\n        title: "Nombre de personnes et charge",',
  ceSection,
  'title: "Catégories de conception CE"',
  "CE design categories section"
);

const killSwitchSection = `      {
        title: "Coupe-circuit du moteur hors-bord",
        definition: "Sur les moteurs hors-bord concernés, le conducteur doit rester relié au coupe-circuit lorsque le moteur tourne et le bateau fait route. Un second coupe-circuit filaire doit être rapidement et facilement accessible à bord.",
        body: [
          "Le coupe-circuit arrête le moteur si le conducteur tombe à l'eau. Le second dispositif sert à redémarrer pour récupérer la personne tombée : sa localisation doit être connue des personnes à bord. On ne contourne pas le dispositif avec une pince ou un montage permanent.",
        ],
        remember: [
          "Conducteur relié au coupe-circuit lorsque les conditions réglementaires l'exigent.",
          "Second coupe-circuit filaire : rapidement accessible et emplacement connu à bord.",
        ],
        traps: ["Laisser le coupe-circuit accroché au tableau de bord au lieu de le porter."],
      },
`;

course = insertBeforeOnce(
  course,
  '      {\n        title: "Bande des 300 mètres et limitations de vitesse",',
  killSwitchSection,
  'title: "Coupe-circuit du moteur hors-bord"',
  "kill switch section"
);

course = replaceRequired(
  course,
  '{ id: "sec-6", question: "La limite de 5 nœuds dans les 300 m :", choices: ["S\'applique seulement s\'il y a des baigneurs visibles", "Est la règle générale, hors chenaux et arrêtés locaux", "Autorise 20 nœuds le matin", "Ne concerne que les voiliers"], correct: 1, explanation: "C\'est une règle générale de prudence littorale, avec des régimes particuliers possibles dans les chenaux." },',
  '{ id: "sec-6", question: "Dans la bande des 300 m, la règle à retenir est :", choices: ["5 nœuds seulement s\'il y a des baigneurs visibles", "Rester à moins de 5 nœuds et utiliser les chenaux prévus pour les engins à moteur", "20 nœuds dans les chenaux", "Aucune limite pour les voiliers"], correct: 1, explanation: "Dans les 300 m, on reste à moins de 5 nœuds et on emprunte les chenaux prévus lorsqu\'ils existent. La réglementation locale peut être plus restrictive." },\n      { id: "sec-7", question: "Un bateau de catégorie de conception C est conçu notamment pour :", choices: ["Force 6 Beaufort au maximum et vagues jusqu\'à 2 m", "Force 12 sans limite de vague", "Uniquement les eaux intérieures", "Naviguer automatiquement jusqu\'à 6 milles"], correct: 0, explanation: "La catégorie C correspond à des conditions jusqu\'à force 6 incluse et une hauteur significative de vague jusqu\'à 2 m. Elle ne fixe pas une distance d\'un abri." },\n      { id: "sec-8", question: "Les catégories de conception CE A, B, C et D indiquent principalement :", choices: ["La distance maximale du port", "Les conditions de vent et de vagues pour lesquelles le bateau a été conçu", "Le nombre de permis à bord", "La fréquence VHF"], correct: 1, explanation: "Les catégories de conception portent sur les conditions environnementales de conception, pas sur la limite géographique du permis." },\n      { id: "sec-9", question: "À quelle distance minimale faut-il se tenir d\'un pavillon signalant des plongeurs ?", choices: ["10 m", "25 m", "50 m", "100 m"], correct: 3, explanation: "Il faut rester à au moins 100 m des pavillons signalant des plongeurs." },\n      { id: "sec-10", question: "Le second coupe-circuit filaire d\'un hors-bord concerné doit être :", choices: ["Caché dans un coffre fermé à clé", "Rapidement et facilement accessible, avec son emplacement connu à bord", "Conservé à terre", "Remplacé par une pince permanente"], correct: 1, explanation: "Le second coupe-circuit permet de redémarrer pour récupérer un conducteur tombé à l\'eau ; il doit être accessible et son emplacement connu." },',
  "safety quizzes"
);

// ---------------------------------------------------------------------------
// 4. Division 240 : EIF 2 à < 6 milles
// ---------------------------------------------------------------------------
course = replaceRequired(
  course,
  "Règle générale enseignée : jusqu'à 2 milles, niveau 50 ; de 2 à 6 milles, niveau 100. Les enfants et personnes de faible masse ont des exigences spécifiques : un adulte 100 mal sanglé sur un enfant est dangereux.",
  "Règle générale : jusqu'à 2 milles, niveau de performance 50 ; de 2 à moins de 6 milles, niveau 100 par personne. En côtier, l'EIF 100 n'est toutefois pas exigé pour une personne sachant nager qui porte effectivement soit un EIF de niveau 50, soit une combinaison conforme apportant au moins 50 N de flottabilité intrinsèque avec les éléments de visibilité prévus. L'équipement doit toujours être adapté à la morphologie de l'utilisateur.",
  "EIF coastal exception"
);

course = replaceRequired(
  course,
  '{ id: "mat-3", question: "Le niveau de performance général d\'un EIF de 2 à 6 milles est au moins :", choices: ["25", "50", "100", "300"], correct: 2, explanation: "La règle générale de la Division 240 prévoit 100 pour la zone de 2 à 6 milles." },',
  '{ id: "mat-3", question: "Dans le cas général, le niveau de performance d\'un EIF de 2 à moins de 6 milles est au moins :", choices: ["25", "50", "100", "300"], correct: 2, explanation: "La règle générale prévoit un EIF de niveau 100 par personne en côtier. Il existe une exception pour une personne sachant nager qui porte effectivement un EIF 50 ou une combinaison conforme répondant aux conditions de la Division 240." },',
  "EIF quiz nuance"
);

// ---------------------------------------------------------------------------
// 5. Permis, documents et radiocommunications (CRR)
// ---------------------------------------------------------------------------
course = replaceRequired(
  course,
  '{ term: "Titre de navigation", meaning: "Document d\'identité du navire (francisation ou équivalent selon le registre)." },',
  '{ term: "Titre de navigation", meaning: "Le certificat d’enregistrement est aujourd’hui le titre de navigation courant des navires de plaisance enregistrés en France ; les anciens titres encore valides peuvent continuer à être présentés." },',
  "navigation title glossary"
);

course = replaceRequired(
  course,
  '{ term: "CRR", meaning: "Certificat pour utiliser une VHF du service mobile maritime (règles à vérifier)." },',
  '{ term: "CRR", meaning: "Certificat restreint de radiotéléphoniste. En eaux territoriales françaises, le permis plaisance maritime permet l’utilisation d’une VHF fixe ou ASN ; à l’étranger, le CRR est requis. Une VHF portative ≤ 6 W sans ASN ne nécessite pas de qualification radio en France." },',
  "CRR glossary"
);

course = replaceRequired(
  course,
  "Conducteur : le permis plaisance correspondant à la zone et à la machine. Navire : titre de navigation (acte de francisation ou titre équivalent selon l'immatriculation et la taille). Les formalités exactes dépendent du registre ; en cas de doute, administration et textes officiels.",
  "Conducteur : le permis plaisance correspondant à la zone et à la machine. Navire : le certificat d'enregistrement constitue aujourd'hui le titre de navigation courant pour les navires de plaisance enregistrés en France. Les anciennes cartes de circulation ou actes de francisation encore valides peuvent rester utilisables. Les formalités exactes dépendent du navire et de son enregistrement.",
  "certificate of registration"
);

course = replaceRequired(
  course,
  "Radio : si une VHF du service mobile maritime est installée, licence de station et, pour l'utiliser, généralement un CRR (certificat restreint de radiotéléphoniste). Les usages de VHF portable font l'objet de précisions : ne pas inventer une exemption.",
  "Radio : la station radio du navire doit disposer de la licence radiomaritime requise. En eaux territoriales françaises, le permis plaisance maritime permet d'utiliser une VHF fixe ou une VHF portative avec ASN sans CRR supplémentaire. Une VHF portative d'au plus 6 W sans ASN peut être utilisée en France sans qualification radio. À l'étranger, le CRR est requis. Ne pas confondre la licence de la station et la qualification de l'opérateur.",
  "VHF CRR rule"
);

course = replaceRequired(
  course,
  "Cas concret avant d'appareiller : permis dans la pochette, papiers du bateau, VHF licenciée et CRR si tu l'utilises, cartes de la zone, marée du jour. Un contrôle en mer porte souvent là-dessus autant que sur les gilets.",
  "Cas concret avant d'appareiller : permis dans la pochette, certificat d'enregistrement ou ancien titre encore valide, licence radiomaritime si la station VHF l'exige, qualification adaptée à la zone de navigation, cartes de la zone et marée du jour. En eaux françaises, ton permis maritime suffit pour la qualification opérateur d'une VHF fixe/ASN ; à l'étranger, pense au CRR.",
  "documents practical example"
);

course = replaceRequired(
  course,
  '"VHF installée : licence + CRR (cas général enseigné).",',
  '"VHF : distinguer licence de station et qualification opérateur. En France, permis maritime = qualification suffisante pour VHF fixe/ASN ; à l’étranger, CRR requis.",',
  "VHF remember"
);

course = replaceRequired(
  course,
  '{ id: "per-8", question: "Pour utiliser une VHF marine du service mobile maritime, on exige généralement :", choices: ["Aucun titre", "Un CRR (certificat restreint de radiotéléphoniste)", "Un permis hauturier obligatoire", "Un diplôme de capitaine"], correct: 1, explanation: "Le CRR est le titre radio généralement enseigné pour la VHF, en plus de la licence de station si l\'appareil est installé." },',
  '{ id: "per-8", question: "En eaux territoriales françaises, pour utiliser une VHF fixe ou une VHF portative avec ASN à bord d’un bateau de plaisance, le titulaire du permis plaisance maritime :", choices: ["Doit obligatoirement ajouter un CRR", "Dispose déjà de la qualification opérateur nécessaire", "Doit posséder le permis hauturier", "Ne peut jamais utiliser la VHF"], correct: 1, explanation: "En France, le permis plaisance maritime permet l’utilisation de la VHF fixe ou ASN sans CRR supplémentaire. La licence radiomaritime de la station reste une question distincte. À l’étranger, le CRR est requis." },\n      { id: "per-9", question: "À l’étranger, pour utiliser la VHF maritime de plaisance, le certificat généralement requis pour l’opérateur est :", choices: ["Le CRR", "Le permis automobile", "Aucun document", "Le permis hauturier uniquement"], correct: 0, explanation: "Le CRR est requis pour l’utilisation de la VHF maritime à l’étranger. Il ne faut pas le confondre avec la licence radiomaritime de la station." },',
  "CRR quizzes"
);

// ---------------------------------------------------------------------------
// 6. VHF / SMDSM : zones A1-A4 + 196/112 + anglais de base
// ---------------------------------------------------------------------------
course = replaceRequired(
  course,
  'definition: "Le SMDSM (GMDSS) organise l\'alerte et la diffusion de sécurité à l\'échelle mondiale. Le côtier se situe typiquement en zone A1 : couverture VHF ASN des stations côtières.",',
  'definition: "Le SMDSM (GMDSS) organise l’alerte et la diffusion de sécurité à l’échelle mondiale. Les zones A1 à A4 sont définies par la couverture des moyens d’alerte, pas par la limite de 6 milles du permis côtier.",',
  "GMDSS definition"
);

course = replaceRequired(
  course,
  "Zones (repères) : A1 = VHF ASN ; A2 = BLU/MF ASN au-delà ; A3 = satellitaire hors pôles ; A4 = pôles. Tu n'as pas à devenir radio-officier : retiens que tes 6 milles d'un abri relèvent de la logique côtière VHF, d'où l'intérêt d'une VHF ASN bien réglée.",
  "Zones : A1 = zone couverte par au moins une station côtière VHF assurant en continu l'alerte ASN ; A2 = hors A1, zone couverte par une station côtière MF assurant en continu l'alerte ASN ; A3 = hors A1/A2, zone couverte par un service mobile satellitaire reconnu permettant l'alerte continue ; A4 = hors A1/A2/A3. La frontière des 6 milles d'un abri du permis côtier ne définit aucune de ces zones.",
  "GMDSS zones"
);

course = replaceRequired(
  course,
  "En France, le CROSS (Gris-Nez, Jobourg, Corsen, Étel, La Garde, Antilles-Guyane, etc.) coordonne. Il déclenche SNSM, moyens d'État, navires sur zone. Le 196 est le numéro d'urgence mer depuis un mobile. Le 112 reste un secours terrestre ; en mer, 196 + VHF 16 sont les bons réflexes.",
  "En France, le CROSS coordonne les secours en mer et peut mobiliser SNSM, moyens d'État et navires sur zone. Depuis un navire équipé, la VHF canal 16 est le moyen à privilégier car l'alerte est entendue par les secours et les navires proches. Depuis le littoral pour une urgence en mer, le 196 permet de joindre les CROSS. Le 112 reste le numéro européen général d'urgence et peut relayer une alerte, mais il ne remplace pas la VHF 16 en mer.",
  "196 and 112 wording"
);

course = replaceRequired(
  course,
  '"Côtier ≈ zone A1 : VHF / ASN.",',
  '"A1 = couverture VHF avec alerte ASN continue ; ce n’est pas une distance de 6 milles.",',
  "GMDSS remember"
);

course = replaceRequired(
  course,
  '{ id: "vhf-6", question: "Le SMDSM, au niveau du permis côtier, se rattache surtout à la zone :", choices: ["A4 polaire", "A1, couverture VHF ASN", "Uniquement satellitaire", "Aucune zone"], correct: 1, explanation: "Les 6 milles d\'un abri relèvent de la logique côtière A1 (stations VHF à ASN)." },',
  '{ id: "vhf-6", question: "Dans le SMDSM, une zone A1 est :", choices: ["Une zone définie par les 6 milles du permis côtier", "Une zone couverte par au moins une station côtière VHF assurant en continu l’alerte ASN", "Une zone uniquement satellitaire", "Une zone réservée aux ports"], correct: 1, explanation: "A1 est définie par la couverture VHF/ASN d’une station côtière. Elle n’est pas définie par la limite de 6 milles du permis côtier." },',
  "GMDSS quiz"
);

const englishRadioSection = `      {
        title: "Anglais radio de base",
        definition: "Le programme du permis demande quelques notions d'anglais utiles pour comprendre ou transmettre un message simple de sécurité.",
        body: [
          "Mots et expressions à reconnaître : THIS IS = ici / de la part de ; POSITION = position ; PERSONS ON BOARD = personnes à bord ; I REQUIRE ASSISTANCE = j'ai besoin d'assistance ; MAN OVERBOARD = homme à la mer ; FIRE = incendie ; TAKING WATER = voie d'eau ; STAND BY = restez en attente ; OVER = à vous.",
          "En détresse, priorité à un message court et compréhensible : identité, position, nature du danger, assistance demandée et nombre de personnes à bord. L'alphabet phonétique aide à épeler un nom ou un indicatif.",
        ],
        remember: [
          "POSITION = position. PERSONS ON BOARD = personnes à bord.",
          "I REQUIRE ASSISTANCE = j'ai besoin d'assistance. OVER = à vous.",
        ],
      },
`;

course = insertBeforeOnce(
  course,
  '      {\n        title: "Alphabet phonétique",',
  englishRadioSection,
  'title: "Anglais radio de base"',
  "basic radio English"
);

course = replaceRequired(
  course,
  '{ id: "vhf-7", question: "En France, le numéro d\'urgence maritime depuis un mobile est :", choices: ["15 uniquement", "196", "3617", "08 bateau"], correct: 1, explanation: "Le 196 joint les secours mer. Il complète la VHF canal 16, il ne la remplace pas si elle est disponible." },',
  '{ id: "vhf-7", question: "En France, pour une urgence en mer depuis le littoral ou un téléphone mobile, le numéro dédié aux CROSS est :", choices: ["15 uniquement", "196", "3617", "08 bateau"], correct: 1, explanation: "Le 196 permet de joindre les CROSS. Depuis un navire équipé, la VHF canal 16 reste le moyen à privilégier." },\n      { id: "vhf-8", question: "En anglais radio, « PERSONS ON BOARD » signifie :", choices: ["Position du bateau", "Personnes à bord", "Moteur en panne", "Fin de message"], correct: 1, explanation: "PERSONS ON BOARD = personnes à bord, une information importante dans un message de détresse." },',
  "VHF 196 and English quiz"
);

// ---------------------------------------------------------------------------
// 7. Marée / pression atmosphérique
// ---------------------------------------------------------------------------
course = replaceRequired(
  course,
  "Houle, vague, assiette au moteur, sonde ancienne, vase, pression atmosphérique basse (surcote inverse parfois), erreur de lecture : tout mange de la marge. Dans une passe, on passe plutôt près de la pleine mer si le fond est juste.",
  "Houle, vague, assiette au moteur, sonde ancienne, vase et erreur de lecture peuvent réduire la marge. La pression atmosphérique modifie aussi le niveau réel : une pression élevée tend à faire baisser le niveau par rapport à la prédiction, tandis qu'une pression basse tend à le relever (effet barométrique inverse). On ne calcule donc jamais une passe juste sans marge.",
  "atmospheric pressure and sea level"
);

// ---------------------------------------------------------------------------
// 8. Environnement / pêche de loisir
// ---------------------------------------------------------------------------
course = replaceRequired(
  course,
  'definition: "La pêche de loisir nourrit le pêcheur et sa famille dans le cadre réglementaire. La vente du produit est interdite.",',
  'definition: "Les captures de pêche maritime de loisir sont destinées à la consommation du pêcheur et de sa famille : leur vente et leur colportage sont interdits, et l’achat de captures provenant de la pêche de loisir est également interdit.",',
  "recreational fishing definition"
);

course = replaceRequired(
  course,
  '"Vente interdite.", "Tailles et zones = à jour, locales."',
  '"Vente et colportage interdits ; ne pas acheter de captures issues de la pêche de loisir.", "Tailles, quotas, périodes et zones = à vérifier à jour."',
  "recreational fishing remember"
);

// ---------------------------------------------------------------------------
// 9. Principaux schémas d'examen : feux de route + trafic portuaire
// ---------------------------------------------------------------------------
const lightsPowerPlate = `export function LightsPowerPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 620 240" role="img" aria-label="Feux d'un navire à moteur : vu de face, blanc de tête de mât avec rouge bâbord et vert tribord ; vu du travers bâbord, feu rouge et feu de tête de mât, sans feu de poupe.">
        <rect width="620" height="240" rx="16" fill="#07151b" />
        <text x="24" y="30" fill="#9cc0c7" fontSize="13" fontWeight="800">NAVIRE À MOTEUR — FAISANT ROUTE</text>
        <g transform="translate(36 44)">
          <text x="95" y="16" fill="#d7e6ea" fontSize="12" fontWeight="700">VU DE FACE</text>
          <polygon points="96,42 126,150 96,138 66,150" fill="#1d3c46" stroke="#4e6d76" />
          <Light cx={96} cy={36} color="#f4f1de" r={8} />
          <Light cx={68} cy={118} color="#e23b3b" />
          <Light cx={124} cy={118} color="#1ea35a" />
          <text x="22" y="180" fill="#e23b3b" fontSize="11">Rouge = son bâbord</text>
          <text x="112" y="180" fill="#1ea35a" fontSize="11">Vert = son tribord</text>
        </g>
        <g transform="translate(300 44)">
          <text x="74" y="16" fill="#d7e6ea" fontSize="12" fontWeight="700">VU DU TRAVERS BÂBORD</text>
          <rect x="20" y="82" width="186" height="34" rx="16" fill="#1d3c46" stroke="#4e6d76" />
          <polygon points="206,99 242,82 242,116" fill="#1d3c46" stroke="#4e6d76" />
          <Light cx={126} cy={58} color="#f4f1de" r={8} />
          <Light cx={84} cy={99} color="#e23b3b" />
          <text x="22" y="150" fill="#e23b3b" fontSize="11">Feu de côté rouge</text>
          <text x="22" y="168" fill="#f4f1de" fontSize="11">+ feu de tête de mât blanc</text>
          <text x="22" y="190" fill="#e9b4ab" fontSize="11" fontWeight="700">Pas de feu de poupe au travers.</text>
        </g>
      </svg>
      <figcaption>{caption ?? "Face : blanc + rouge + vert. Au travers bâbord : rouge + feu de tête de mât ; le feu de poupe n'est pas visible dans ce secteur."}</figcaption>
    </figure>
  );
}`;

plates = replaceRegexRequired(
  plates,
  /export function LightsPowerPlate\(\{ caption \}: PlateProps\) \{[\s\S]*?\n\}\n\nexport function LightsFishingPlate/,
  `${lightsPowerPlate}\n\nexport function LightsFishingPlate`,
  "LightsPowerPlate"
);

const portTrafficPlate = `export function PortTrafficPlate({ caption }: PlateProps) {
  const Signal = ({ x, colors, label, note }: { x: number; colors: string[]; label: string; note: string }) => (
    <g transform={\`translate(\${x} 28)\`}>
      <text x="62" y="14" textAnchor="middle" fill="#d7e6ea" fontSize="11" fontWeight="800">{label}</text>
      <rect x="44" y="30" width="36" height="126" rx="8" fill="#12262c" stroke="#4e6d76" />
      {colors.map((color, i) => <circle key={\`\${label}-\${i}\`} cx="62" cy={52 + i * 36} r="12" fill={color} />)}
      <text x="62" y="180" textAnchor="middle" fill="#c5dde2" fontSize="10">{note}</text>
    </g>
  );
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 620 230" role="img" aria-label="Signalisation principale AISM de trafic portuaire : trois rouges ne pas poursuivre, trois verts passage à sens unique, vert vert blanc passage à double sens.">
        <rect width="620" height="230" rx="16" fill="#07151b" />
        <Signal x={30} colors={["#e23b3b", "#e23b3b", "#e23b3b"]} label="3 ROUGES" note="NE PAS POURSUIVRE" />
        <Signal x={220} colors={["#1ea35a", "#1ea35a", "#1ea35a"]} label="3 VERTS" note="PASSAGE · SENS UNIQUE" />
        <Signal x={410} colors={["#1ea35a", "#1ea35a", "#f4f1de"]} label="VERT · VERT · BLANC" note="PASSAGE · DOUBLE SENS" />
        <text x="310" y="220" textAnchor="middle" fill="#9cc0c7" fontSize="10">Vert-blanc-vert : poursuivre seulement après un ordre spécifique.</text>
      </svg>
      <figcaption>{caption ?? "Trafic portuaire AISM : 3 rouges = ne pas poursuivre ; 3 verts = passage à sens unique ; vert-vert-blanc = passage dans les deux sens."}</figcaption>
    </figure>
  );
}`;

plates = replaceRegexRequired(
  plates,
  /export function PortTrafficPlate\(\{ caption \}: PlateProps\) \{[\s\S]*?\n\}\n\nexport function DayMarksPlate/,
  `${portTrafficPlate}\n\nexport function DayMarksPlate`,
  "PortTrafficPlate"
);

fs.writeFileSync(COURSE, course);
fs.writeFileSync(PLATES, plates);
console.log("Regulatory corrections applied successfully.");
