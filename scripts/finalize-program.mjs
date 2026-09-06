import fs from "node:fs";

const file = "data/course.ts";
let s = fs.readFileSync(file, "utf8");

function req(search, replacement, label) {
  if (!s.includes(search)) throw new Error(`Target not found: ${label}`);
  s = s.replace(search, replacement);
}

function ins(marker, block, needle, label) {
  if (s.includes(needle)) return;
  if (!s.includes(marker)) throw new Error(`Marker not found: ${label}`);
  s = s.replace(marker, block + marker);
}

// ---------------------------------------------------------------------------
// Cohérence des feux vus de bâbord : ne pas montrer le feu de poupe au travers.
// ---------------------------------------------------------------------------
req(
  "Un navire à propulsion mécanique faisant route montre ses feux de côté, un feu de poupe et un ou deux feux de tête de mât selon la longueur. Vu de face : blanc en haut, rouge à gauche (son bâbord), vert à droite (son tribord). Vu de bâbord : rouge + blancs, jamais de vert. Vu de poupe : seulement le blanc arrière.",
  "Un navire à propulsion mécanique faisant route montre ses feux de côté, un feu de poupe et un ou deux feux de tête de mât selon la longueur. Vu de face : blanc en haut, rouge à gauche (son bâbord), vert à droite (son tribord). Vu du travers bâbord : on voit le feu rouge de côté et le ou les feux de tête de mât, mais pas le feu de poupe. En passant suffisamment sur l'arrière, le feu rouge disparaît et le feu de poupe blanc devient visible. Vu exactement de poupe : le feu de poupe blanc domine la lecture.",
  "feux secteurs bâbord"
);
req(
  "Cas concret : tu vois un blanc et un rouge, pas de vert. Tu es sur son bâbord (ou presque). S'il y a aussi un feu de tête de mât, c'est un moteur. S'il n'y a que rouge et blanc de poupe sans tête de mât, ce peut être un voilier vu de bâbord.",
  "Cas concret : tu vois un feu rouge de côté avec un feu blanc de tête de mât : tu observes un navire à moteur depuis son secteur bâbord. Si tu te déplaces vers son arrière, le rouge finit par disparaître et le feu de poupe blanc apparaît. Les secteurs des feux permettent donc d'estimer son orientation relative.",
  "feux cas concret"
);
req(
  '          { src: "/images/feux-cote-babord.jpg", alt: "Navire à moteur vu de son bâbord de nuit : feu rouge de côté, feu de tête de mât blanc et feu de poupe blanc.", caption: "Vu de bâbord : on voit le rouge, le blanc de tête de mât et le blanc de poupe. Pas de vert." },\n',
  "",
  "ancienne image bâbord"
);
req(
  '{ id: "feu-1", question: "Sur cette vue de bâbord, le feu de côté bâbord est :", choices: ["Vert", "Rouge", "Blanc", "Jaune"], correct: 1, explanation: "Bâbord = rouge ; tribord = vert.", image: "/images/feux-cote-babord.jpg", imageAlt: "Navire vu de bâbord de nuit." },',
  '{ id: "feu-1", question: "Vu du travers bâbord d’un navire à moteur faisant route, quel feu de côté voyez-vous ?", choices: ["Vert", "Rouge", "Jaune", "Aucun feu de côté"], correct: 1, explanation: "Bâbord = rouge. Au travers bâbord on voit le rouge et le ou les feux de tête de mât ; le feu de poupe n’est pas visible dans ce secteur.", plate: "lights-power" },',
  "qcm feu bâbord"
);

// ---------------------------------------------------------------------------
// Chapitre signaux : objectifs, glossaire, visibilité réduite complète.
// ---------------------------------------------------------------------------
req(
  'title: "Signaux sonores, détresse et trafic portuaire",',
  'title: "Signaux sonores, météo, détresse et trafic portuaire",',
  "titre signaux"
);
req(
  'summary: "Sons de manœuvre, visibilité réduite, MAYDAY / PAN PAN / SÉCURITÉ, et feux de trafic d\'un port.",',
  'summary: "Sons de manœuvre et de brume, signaux météo de sémaphore, MAYDAY / PAN PAN / SÉCURITÉ et trafic portuaire.",',
  "résumé signaux"
);
req(
  '      "Connaître 1, 2, 3 et 5 sons brefs, et le son prolongé.",\n      "Choisir MAYDAY, PAN PAN ou SÉCURITÉ selon la gravité.",\n      "Lire les feux de trafic portuaire les plus courants et rester prudent.",',
  '      "Connaître les signaux phoniques de manœuvre et ceux prescrits par visibilité réduite.",\n      "Reconnaître les principaux signaux météorologiques de sémaphore enseignés au permis.",\n      "Choisir MAYDAY, PAN PAN ou SÉCURITÉ et lire les principaux signaux de trafic portuaire.",',
  "objectifs signaux"
);
req(
  '{ term: "Feux de trafic", meaning: "Signaux d\'entrée de port : souvent 3 rouges = interdit, 2 verts = autorisé." },',
  '{ term: "Feux de trafic", meaning: "Signalisation AISM à trois feux verticaux : 3 rouges = ne pas poursuivre ; 3 verts = passage possible à sens unique ; vert-vert-blanc = passage possible dans les deux sens." },',
  "glossaire trafic"
);

const oldFog = `      {
        title: "Visibilité réduite",
        definition: "Brouillard, brume, forte pluie : vitesse de sécurité, feux, veille renforcée, signaux sonores périodiques.",
        body: [
          "Navire à moteur avec erre : un son prolongé à intervalles (ordre de grandeur : pas plus de 2 minutes). Stoppé, au mouillage, voilier, pêche : combinaisons distinctes (deux sons, cloche…). Au permis, retiens surtout : on signale sa présence, on ralentit, on n'improvise pas un dépassement aveugle.",
          "Cas concret : brume à l'entrée d'un port. Tu allumes les feux, tu réduis, tu écoutes, tu n'accéléres pas « pour en finir ».",
        ],
        remember: [
          "Moteur avec erre : son prolongé périodique.",
          "On ralentit avant de « chercher à voir ».",
        ],
      },`;

const newFog = `      {
        title: "Visibilité réduite : signaux phoniques complets",
        definition: "Dans ou près d'une zone de visibilité réduite, de jour comme de nuit, la règle 35 du RIPAM impose des signaux périodiques adaptés à la situation du navire.",
        body: [
          "Navire à moteur faisant route AVEC erre : 1 son prolongé à intervalles ne dépassant pas 2 minutes. Navire à moteur faisant route mais stoppé et sans erre : 2 sons prolongés successifs, séparés d'environ 2 secondes, à intervalles ne dépassant pas 2 minutes.",
          "Voilier, navire en pêche, non maître de sa manœuvre, à capacité de manœuvre restreinte, contraint par son tirant d'eau, ou navire remorquant/poussant : 1 son prolongé suivi de 2 sons brefs, à intervalles ne dépassant pas 2 minutes. Mémo : LONG — BREF — BREF.",
          "Navire remorqué habité : 1 son prolongé suivi de 3 sons brefs, si possible immédiatement après le signal du remorqueur. Un bateau-pilote en service peut ajouter 4 sons brefs à son signal réglementaire.",
          "Au mouillage : sonnerie rapide de cloche pendant environ 5 secondes au plus toutes les minutes ; les grands navires ajoutent un gong à l'arrière. Échoué : même signal que le mouillage, avec en plus 3 coups de cloche distincts avant et après la sonnerie rapide. Les petits navires bénéficiant d'exemptions d'équipement doivent néanmoins produire un signal sonore efficace selon le cas.",
          "Conduite : vitesse de sécurité, moteurs prêts à manœuvrer, feux de navigation allumés, veille visuelle et auditive. Si tu entends devant le travers le signal de brume d'un navire et que le risque n'est pas écarté, réduis au minimum permettant de gouverner, enlève toute erre si nécessaire et navigue avec une extrême prudence.",
        ],
        remember: [
          "Moteur avec erre : 1 LONG / ≤ 2 min.",
          "Moteur stoppé sans erre : 2 LONGS / ≤ 2 min.",
          "Voile, pêche, NUC, manœuvre restreinte, tirant d'eau, remorquage : 1 LONG + 2 BREFS / ≤ 2 min.",
          "Mouillage : cloche ~5 s / ≤ 1 min. Échoué : 3 coups + cloche + 3 coups.",
        ],
        traps: [
          "Appliquer les règles de priorité 'en vue' comme si tu voyais l'autre : en visibilité réduite et sans contact visuel, la règle 19 s'applique.",
          "Confondre 2 sons prolongés (moteur stoppé sans erre) avec 1 long + 2 brefs (voilier/pêche/navire contraint).",
        ],
      },`;
req(oldFog, newFog, "signaux visibilité réduite");

const weatherSection = `      {
        title: "Signaux météorologiques de sémaphore",
        definition: "Le programme officiel comprend les signaux météorologiques. Les signaux visuels traditionnellement enseignés au permis annoncent surtout grand frais, coup de vent/tempête et ouragan.",
        body: [
          "De jour : 1 boule noire = avis de grand frais (force 7) de direction quelconque. Pour un coup de vent à violente tempête (forces 8 à 11), les cônes donnent le secteur : 1 cône = Ouest, 2 cônes = Est ; pointe(s) vers le haut = Nord, pointe(s) vers le bas = Sud. Donc : 1 cône pointe en haut = Nord-Ouest ; 2 cônes pointes en haut = Nord-Est ; 1 cône pointe en bas = Sud-Ouest ; 2 cônes pointes en bas = Sud-Est. Une croix noire = avis d'ouragan, force 12, direction quelconque.",
          "De nuit : blanc sur vert = grand frais ; rouge sur rouge = secteur Nord-Ouest ; rouge sur blanc = Nord-Est ; blanc sur blanc = Sud-Ouest ; blanc sur rouge = Sud-Est. Rouge-vert-rouge correspond à l'avis d'ouragan.",
          "Ces signaux sont des avertissements : ils ne remplacent jamais un bulletin météo marin actualisé. À leur vue, on réévalue immédiatement le départ ou la poursuite de la navigation.",
        ],
        remember: [
          "Jour : boule noire = grand frais toutes directions.",
          "1 cône = Ouest ; 2 cônes = Est. Pointe en haut = Nord ; pointe en bas = Sud.",
          "Croix noire = ouragan.",
          "Nuit : blanc/vert = grand frais ; RR = NW ; R/W = NE ; WW = SW ; W/R = SE.",
        ],
        traps: [
          "Confondre un cône météo de sémaphore avec le cône noir pointe en bas porté par un voilier au moteur : le contexte et l'emplacement sont différents.",
          "Voir un signal météo sévère et partir quand même parce que le port paraît calme.",
        ],
      },
`;
ins('      {\n        title: "MAYDAY, PAN PAN, SÉCURITÉ",', weatherSection, 'title: "Signaux météorologiques de sémaphore"', "section météo sémaphore");

req(
  '      { id: "sig-7", question: "Trois feux verts verticaux de trafic portuaire indiquent :", choices: ["Ne pas poursuivre", "Les navires peuvent poursuivre, avec trafic à sens unique", "Une détresse", "Un mouillage obligatoire"], correct: 1, explanation: "Trois verts autorisent la poursuite avec trafic à sens unique. Vert-vert-blanc indique que les navires peuvent poursuivre avec trafic dans les deux sens.", plate: "port-traffic" },',
  '      { id: "sig-7", question: "Trois feux verts verticaux de trafic portuaire indiquent :", choices: ["Ne pas poursuivre", "Les navires peuvent poursuivre, avec trafic à sens unique", "Une détresse", "Un mouillage obligatoire"], correct: 1, explanation: "Trois verts autorisent la poursuite avec trafic à sens unique. Vert-vert-blanc indique que les navires peuvent poursuivre avec trafic dans les deux sens.", plate: "port-traffic" },\n      { id: "sig-8", question: "Par visibilité réduite, un navire à moteur faisant route avec erre émet :", choices: ["1 son prolongé au plus toutes les 2 minutes", "2 sons brefs toutes les minutes", "1 long + 2 brefs", "Une cloche uniquement"], correct: 0, explanation: "Moteur avec erre : un son prolongé à intervalles ne dépassant pas deux minutes." },\n      { id: "sig-9", question: "Par visibilité réduite, un navire à moteur faisant route mais stoppé sans erre émet :", choices: ["1 son bref", "2 sons prolongés successifs", "1 long + 3 brefs", "5 sons brefs"], correct: 1, explanation: "Moteur stoppé sans erre : deux sons prolongés, séparés d’environ deux secondes, au plus toutes les deux minutes." },\n      { id: "sig-10", question: "Par visibilité réduite, un voilier faisant route émet :", choices: ["1 long + 2 brefs", "2 longs", "3 brefs", "Une cloche seulement"], correct: 0, explanation: "Voilier, pêche, non maître, manœuvre restreinte, tirant d’eau et remorquage utilisent un son prolongé suivi de deux sons brefs." },\n      { id: "sig-11", question: "Une boule noire sur un mât de sémaphore météo indique :", choices: ["Un avis de grand frais de direction quelconque", "Une marée descendante", "Un port fermé", "Un navire au mouillage"], correct: 0, explanation: "La boule noire est le signal de jour traditionnel d’avis de grand frais, force 7, de direction quelconque." },\n      { id: "sig-12", question: "Un seul cône noir pointe en haut sur un sémaphore météo annonce un coup de vent/tempête de secteur :", choices: ["Nord-Ouest", "Nord-Est", "Sud-Ouest", "Sud-Est"], correct: 0, explanation: "Mémo : 1 cône = Ouest ; pointe en haut = Nord. Donc Nord-Ouest." },\n      { id: "sig-13", question: "Deux cônes noirs pointes vers le bas sur un sémaphore météo annoncent un secteur :", choices: ["Nord-Ouest", "Nord-Est", "Sud-Ouest", "Sud-Est"], correct: 3, explanation: "Mémo : 2 cônes = Est ; pointes en bas = Sud. Donc Sud-Est." },\n      { id: "sig-14", question: "De nuit, deux feux rouges superposés sur un mât de sémaphore météo indiquent :", choices: ["Grand frais toutes directions", "Coup de vent/tempête de Nord-Ouest", "Sud-Ouest", "Ouragan toutes directions"], correct: 1, explanation: "Deux rouges superposés correspondent au secteur Nord-Ouest dans la signalisation météo traditionnelle de sémaphore." },',
  "qcm signaux complémentaires"
);

// ---------------------------------------------------------------------------
// Sécurité : objectifs, image 300 m, conchyliculture et QCM.
// ---------------------------------------------------------------------------
req(
  '      "Appliquer 5 nœuds dans la bande des 300 m, hors régimes locaux et chenaux.",',
  '      "Rester à moins de 5 nœuds dans la bande des 300 m et utiliser les chenaux prévus pour les engins à moteur.",',
  "objectif 300 m"
);
req(
  'caption: "Bande des 300 m : 5 nœuds en règle générale. Chenaux et arrêtés locaux peuvent prévoir un autre régime."',
  'caption: "Bande des 300 m : rester à moins de 5 nœuds et utiliser les chenaux prévus. Les arrêtés locaux peuvent imposer des restrictions supplémentaires."',
  "caption 300 m"
);

const conchySection = `      {
        title: "Zones de conchyliculture et cultures marines",
        definition: "Parcs à huîtres, bouchots, tables et filières sont des zones de travail et des obstacles à la navigation. Leur accès et les interdictions applicables dépendent du balisage, de la carte et des arrêtés locaux.",
        body: [
          "Ces installations peuvent être peu visibles, partiellement immergées à marée haute ou entourées de pieux, cordages et filières. On garde une veille attentive, on réduit l'allure et on ne coupe pas à travers une exploitation pour gagner du temps.",
          "Il n'existe pas une distance nationale unique valable pour toutes les concessions. Les limites et prescriptions sont fixées localement. Certaines zones réservent la circulation aux professionnels ou interdisent navigation, mouillage et échouage sur ou aux abords des concessions. La carte marine, le balisage et les arrêtés du préfet maritime / de l'autorité locale font foi.",
          "Ne jamais s'amarrer à une table, un pieu, une filière ou un équipement conchylicole. Ne pas gêner les navires professionnels qui travaillent dans les concessions. En cas de doute, contourner largement la zone par le chenal navigable.",
        ],
        remember: [
          "Conchyliculture = zone de travail + obstacles parfois peu visibles.",
          "Pas de distance nationale unique : vérifier carte, balisage et réglementation locale.",
          "Ne pas mouiller, s'échouer ni s'amarrer sur les installations ; contourner si doute.",
        ],
        traps: [
          "Inventer une règle nationale de 100 m pour tous les parcs : les 100 m concernent notamment les plongeurs signalés ; la conchyliculture relève surtout des règles locales.",
          "Passer entre les tables ou filières parce que le GPS trace une ligne droite.",
        ],
      },
`;
ins('      {\n        title: "Catégories de conception CE",', conchySection, 'title: "Zones de conchyliculture et cultures marines"', "section conchyliculture");

req(
  '      { id: "sec-10", question: "Le second coupe-circuit filaire d\'un hors-bord concerné doit être :", choices: ["Caché dans un coffre fermé à clé", "Rapidement et facilement accessible, avec son emplacement connu à bord", "Conservé à terre", "Remplacé par une pince permanente"], correct: 1, explanation: "Le second coupe-circuit permet de redémarrer pour récupérer un conducteur tombé à l\'eau ; il doit être accessible et son emplacement connu." },',
  '      { id: "sec-10", question: "Le second coupe-circuit filaire d\'un hors-bord concerné doit être :", choices: ["Caché dans un coffre fermé à clé", "Rapidement et facilement accessible, avec son emplacement connu à bord", "Conservé à terre", "Remplacé par une pince permanente"], correct: 1, explanation: "Le second coupe-circuit permet de redémarrer pour récupérer un conducteur tombé à l\'eau ; il doit être accessible et son emplacement connu." },\n      { id: "sec-11", question: "Dans une zone de conchyliculture, la bonne conduite consiste à :", choices: ["Couper entre les tables si le passage paraît libre", "Vérifier carte, balisage et règles locales et contourner les installations si nécessaire", "S’amarrer aux pieux", "Suivre uniquement le GPS routier"], correct: 1, explanation: "Les concessions sont des zones de travail avec des obstacles. Les règles sont locales : carte, balisage et arrêtés doivent être respectés." },\n      { id: "sec-12", question: "Existe-t-il une distance nationale unique de 100 m à respecter autour de tous les parcs conchylicoles ?", choices: ["Oui, toujours", "Non : les prescriptions sont notamment locales et dépendent de la zone", "Oui, mais seulement la nuit", "Seulement pour les voiliers"], correct: 1, explanation: "Il ne faut pas transposer la règle des 100 m des plongeurs à toutes les concessions. La navigation autour des cultures marines dépend du balisage et des réglementations locales." },',
  "qcm conchyliculture"
);

// ---------------------------------------------------------------------------
// VHF : retirer les dernières formulations qui assimilaient côtier à A1.
// ---------------------------------------------------------------------------
req(
  'summary: "Canal 16 et 70, MMSI, ASN, message de détresse, SMDSM zone A1, CROSS et 196.",',
  'summary: "Canal 16 et 70, MMSI, ASN, message de détresse, zones SMDSM A1 à A4, CROSS et 196.",',
  "résumé VHF"
);
req(
  '      "Situer le permis côtier dans le SMDSM (zone A1) et les secours français (CROSS, 196).",',
  '      "Comprendre les zones SMDSM A1 à A4 sans les confondre avec la limite des 6 milles, et connaître CROSS / 196.",',
  "objectif VHF"
);

fs.writeFileSync(file, s);
console.log("Programme côtier finalisé.");
