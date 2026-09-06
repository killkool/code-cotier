export type ExamPlateId =
  | "collision-head-on"
  | "collision-crossing"
  | "collision-overtaking"
  | "lights-power"
  | "lights-fishing"
  | "lights-constrained"
  | "sounds"
  | "cardinals"
  | "port-traffic"
  | "day-marks"
  | "boat-plan"
  | "boat-proue"
  | "boat-poupe"
  | "boat-babord"
  | "boat-tribord"
  | "boat-travers"
  | "cap-route"
  | "gisement"
  | "amures"
  | "au-vent"
  | "region-a"
  | "region-b"
  | "tide-levels"
  | "light-sectors"
  | "light-rhythms";

export type LessonImage = {
  src: string;
  alt: string;
  caption: string;
  wide?: boolean;
};

export type VocabTerm = {
  term: string;
  meaning: string;
};

export type Question = {
  id: string;
  question: string;
  choices: string[];
  correct: number;
  explanation: string;
  image?: string;
  imageAlt?: string;
  plate?: ExamPlateId;
};

export type Section = {
  title: string;
  definition?: string;
  body: string[];
  remember?: string[];
  warning?: string;
  traps?: string[];
  terms?: VocabTerm[];
  images?: LessonImage[];
  plate?: ExamPlateId;
  plates?: ExamPlateId[];
};

export type Chapter = {
  id: string;
  number: number;
  title: string;
  icon: string;
  duration: string;
  cover: string;
  summary: string;
  objectives: string[];
  glossary?: VocabTerm[];
  sections: Section[];
  questions: Question[];
};

export const chapters: Chapter[] = [
  {
    id: "balisage",
    number: 1,
    title: "Balisage maritime",
    icon: "⚓",
    duration: "45 min",
    cover: "/images/mark-babord-a.jpg",
    summary: "Reconnaître les marques AISM, les feux, le balisage des plages, les pictogrammes et l'initiation à la région B.",
    objectives: [
      "Identifier une balise par couleur, forme, voyant et feu, de jour comme de nuit.",
      "Savoir de quel côté passer chaque type de marque, y compris un chenal préféré.",
      "Lire le balisage des plages, les pictogrammes et le principe de la région B.",
    ],
    glossary: [
      { term: "AISM / IALA", meaning: "Système mondial de balisage : région A (France) et région B (couleurs latérales inversées)." },
      { term: "Voyant", meaning: "Forme au sommet de la marque (cylindre, cône, boules, X, deux cônes)." },
      { term: "Éclat", meaning: "Brève apparition de lumière ; on compte les éclats par période." },
      { term: "Chenal préféré", meaning: "Marque latérale à bande de couleur opposée, à une bifurcation." },
    ],
    sections: [
      {
        title: "Région A : marques latérales",
        definition: "En région A, en venant du large vers un port (ou en remontant un chenal conventionnel), on laisse le rouge à bâbord (gauche) et le vert à tribord (droite).",
        body: [
          "La France métropolitaine utilise le système AISM région A. Le « sens conventionnel » est l'entrée depuis le large, ou la remontée d'un fleuve / d'un estuaire selon ce qui est indiqué sur la carte. Ce n'est pas « le côté gauche de la photo » : on se place dans le sens du chenal.",
          "Marque bâbord : entièrement rouge, forme cylindrique (tourelle, espar ou bouée) et voyant cylindrique. Marque tribord : entièrement verte, forme conique, voyant conique pointe en haut. Si la couleur est mal lue (contre-jour, salissure), le voyant tranche.",
          "De nuit, le feu a la couleur de la marque : rouge à bâbord, vert à tribord. Le rythme (éclat, occultation, groupe) permet de distinguer deux marques de même couleur. De jour on lit forme + voyant ; de nuit on lit couleur + rythme. Les deux langages disent la même chose.",
          "Cas concret : tu rentres au port, une tourelle rouge à cylindre est sur ta gauche, une verte à cône sur ta droite. Tu es dans le chenal. Si tu sors du port, tu inverses : le rouge passe à ta droite, mais la marque reste une marque bâbord du chenal.",
        ],
        remember: [
          "Région A, entrée : rouge à gauche, vert à droite.",
          "Bâbord = rouge = cylindre. Tribord = vert = cône pointe en haut.",
          "Le voyant confirme quand la couleur est douteuse.",
          "Sortir du port n'inverse pas la nature de la marque, seulement sa position relative.",
        ],
        traps: [
          "Confondre « bâbord du bateau » et « bâbord du chenal » en sortant : la marque rouge reste la marque bâbord, même si elle est alors à ta droite.",
          "Inventer un feu blanc sur une latérale : en région A, latéral = rouge ou vert, pas blanc.",
        ],
        plate: "boat-plan",
        terms: [
          { term: "Bâbord", meaning: "Gauche du navire, regard vers l'avant. Marque rouge en région A." },
          { term: "Tribord", meaning: "Droit du navire. Marque verte en région A." },
          { term: "Voyant", meaning: "Marque de jour au sommet : cylindre ou cône pour les latérales." },
        ],
        images: [
          { src: "/images/mark-babord-a.jpg", alt: "Marque latérale bâbord région A, entièrement rouge, forme cylindrique et voyant cylindrique.", caption: "Bâbord, région A : rouge, cylindre, voyant cylindrique. En entrant, on la laisse à gauche." },
          { src: "/images/mark-tribord-a.jpg", alt: "Marque latérale tribord région A, entièrement verte, forme conique et voyant conique pointe en haut.", caption: "Tribord, région A : vert, cône, voyant conique pointe en haut. En entrant, on la laisse à droite." },
        ],
      },
      {
        title: "Chenal préféré",
        definition: "À une bifurcation, une marque latérale portant une large bande horizontale de la couleur opposée indique le chenal recommandé. L'autre bras peut rester navigable.",
        body: [
          "On lit d'abord la couleur dominante et la forme : une marque « comme une bâbord » (rouge, cylindre) avec une bande verte dit que le chenal préféré est à tribord. Une marque « comme une tribord » (verte, cône) avec une bande rouge dit que le chenal préféré est à bâbord.",
          "Cas concret : tu arrives sur deux bras. La carte et la marque te disent lequel est le principal. Tu peux parfois emprunter l'autre, mais profondeur, largeur et balisage peuvent être moins favorables. En cas de doute, suis le préféré et la carte.",
        ],
        remember: [
          "Rouge + bande verte = chenal préféré à tribord.",
          "Vert + bande rouge = chenal préféré à bâbord.",
          "La forme (cylindre ou cône) est celle de la couleur dominante.",
        ],
        traps: [
          "Inverser « préféré à bâbord / à tribord » : retiens la couleur dominante comme une latérale normale, puis la bande comme l'indice du bras secondaire.",
        ],
        images: [
          { src: "/images/mark-chenal-prefere-tribord.jpg", alt: "Marque de chenal préféré à tribord : cylindre rouge avec une large bande verte horizontale.", caption: "Chenal préféré à tribord : rouge avec une bande verte (forme de marque bâbord)." },
          { src: "/images/mark-chenal-prefere-babord.jpg", alt: "Marque de chenal préféré à bâbord : cône vert avec une large bande rouge horizontale.", caption: "Chenal préféré à bâbord : vert avec une bande rouge (forme de marque tribord)." },
        ],
      },
      {
        title: "Les 4 balises à bien distinguer",
        definition: "Même situation, quatre cas. On se place dans le bateau, on vient du large vers le port : bâbord à gauche, tribord à droite.",
        body: [
          "Les deux marques simples d'abord : rouge = je la laisse à bâbord, donc je passe à droite de la balise. Vert = je la laisse à tribord, donc je passe à gauche de la balise.",
          "Les chenaux préférés se lisent comme une latérale de la couleur dominante. Rouge + bande verte : je la laisse à bâbord, le chenal principal part à droite (préféré à tribord). Vert + bande rouge : je la laisse à tribord, le chenal principal part à gauche (préféré à bâbord).",
        ],
        remember: [
          "Rouge simple → à gauche du bateau.",
          "Vert simple → à droite du bateau.",
          "Rouge dominant + bande verte → à gauche, puis le principal part à droite.",
          "Vert dominant + bande rouge → à droite, puis le principal part à gauche.",
        ],
        traps: [
          "Lire « chenal préféré à tribord » comme « je laisse la marque à tribord ». Non : on laisse la marque comme sa couleur dominante, et le chenal recommandé est de l'autre côté.",
        ],
        images: [
          {
            src: "/images/planche-4-balises.jpg",
            wide: true,
            alt: "Planche région A : bateau vu de dessus, bâbord à gauche et tribord à droite, face à une balise rouge, une verte, un chenal préféré à tribord et un chenal préféré à bâbord.",
            caption: "Région A, du large vers le port. Le bateau a son bâbord à gauche et son tribord à droite. La planche montre où on passe selon la balise.",
          },
        ],
      },
      {
        title: "Marques cardinales",
        definition: "Une cardinale indique de quel côté (nord, est, sud ou ouest) se trouvent les eaux sûres par rapport au danger. On passe du côté qui porte le nom de la marque.",
        body: [
          "Couleurs : noir et jaune uniquement. Les deux cônes noirs du voyant donnent la direction, et les pointes indiquent où se trouve le noir sur le corps de la balise.",
          "Nord : deux pointes vers le haut, noir au-dessus du jaune. Est : pointes opposées (comme un sablier inversé / diamant), noir-jaune-noir. Sud : deux pointes vers le bas, jaune au-dessus du noir. Ouest : pointes face à face (comme un verre à cocktail), jaune-noir-jaune.",
          "Feux blancs. Mémo des éclats : Est = 3 (comme un E à 3 branches dans certains moyens mnémotechniques), Ouest = 9, Sud = 6 éclats + 1 éclat long (comme 6 + 1 = 7, « sud »). Nord = scintillement continu. Compte les éclats sur une période complète.",
          "Cas concret : un haut-fond au nord d'une passe. Une cardinale Sud, posée au sud du danger, te dit de passer au sud. Passer au nord de cette marque te met sur le danger.",
        ],
        remember: [
          "On passe du côté du nom : Nord → au nord de la marque, etc.",
          "Les pointes du voyant = où est le noir.",
          "Feux blancs : Est 3, Sud 6 + 1 long, Ouest 9, Nord scintille.",
        ],
        traps: [
          "Passer « du côté du danger » : non, on passe du côté des eaux sûres, celui du nom.",
          "Confondre Est (pointes opposées, noir-jaune-noir) et Ouest (pointes face à face, jaune-noir-jaune).",
          "Attribuer un feu rouge ou vert à une cardinale : le feu cardinale est blanc.",
        ],
        terms: [
          { term: "Éclat", meaning: "Brève lumière ; Fl(3) = trois éclats par période." },
          { term: "Scintillement", meaning: "Rythme très rapide, typique de la cardinale Nord." },
        ],
        plate: "cardinals",
        images: [
          { src: "/images/mark-cardinale-nord.jpg", alt: "Cardinale Nord : noir au-dessus du jaune, deux cônes noirs pointes vers le haut.", caption: "Nord : noir sur jaune. Voyant : deux pointes vers le haut. On passe au nord." },
          { src: "/images/mark-cardinale-est.jpg", alt: "Cardinale Est : noir-jaune-noir, deux cônes noirs pointes opposées.", caption: "Est : noir-jaune-noir. Voyant : pointes opposées. On passe à l'est." },
          { src: "/images/mark-cardinale-sud.jpg", alt: "Cardinale Sud : jaune au-dessus du noir, deux cônes noirs pointes vers le bas.", caption: "Sud : jaune sur noir. Voyant : deux pointes vers le bas. On passe au sud." },
          { src: "/images/mark-cardinale-ouest.jpg", alt: "Cardinale Ouest : jaune-noir-jaune, deux cônes noirs pointes face à face.", caption: "Ouest : jaune-noir-jaune. Voyant : pointes face à face. On passe à l'ouest." },
        ],
      },
      {
        title: "Danger isolé, eaux saines, marque spéciale",
        definition: "Trois marques « tout autour » : danger isolé (on passe autour, pas dessus), eaux saines (eau navigable tout autour), spéciale (zone particulière à lire sur la carte).",
        body: [
          "Danger isolé : noir avec une ou plusieurs bandes rouges horizontales, deux boules noires. Feu blanc à groupes de deux éclats. Le danger est localisé ; des eaux navigables existent autour, mais la marque elle-même n'est pas un lieu de passage.",
          "Eaux saines : bandes verticales rouges et blanches, une boule rouge. Feu blanc, souvent à un éclat. Milieu de chenal, atterrissage ou zone d'eau sûre. Ce n'est pas un danger.",
          "Marque spéciale : entièrement jaune, voyant en X (croix de Saint-André). Feu jaune. Câble, émissaire, mouillage, travaux, zone réglementée, parc ostréicole, etc. Sans la carte, tu sais seulement « attention, cas particulier ».",
        ],
        remember: [
          "Deux boules noires = danger isolé. Une boule rouge = eaux saines.",
          "Vertical rouge/blanc = eaux saines. Horizontal noir/rouge = danger isolé.",
          "Jaune + X = spéciale : lire la carte.",
        ],
        traps: [
          "Prendre une eaux saines pour un danger isolé (rayures verticales vs bandes horizontales).",
          "Traiter une marque spéciale comme une cardinale parce qu'on a vu du jaune : le jaune cardinale est toujours associé au noir.",
        ],
        images: [
          { src: "/images/mark-danger-isole.jpg", alt: "Marque de danger isolé noire avec une bande rouge et deux boules noires superposées.", caption: "Danger isolé : noir et rouge, deux boules noires. On peut passer autour, pas dessus." },
          { src: "/images/mark-eaux-saines.jpg", alt: "Marque d'eaux saines à rayures verticales rouges et blanches surmontée d'une boule rouge.", caption: "Eaux saines : rayures verticales rouge/blanc, une boule rouge. Eau navigable tout autour." },
          { src: "/images/mark-speciale.jpg", alt: "Marque spéciale entièrement jaune avec un voyant en X jaune.", caption: "Marque spéciale : jaune, voyant en X. Lire la carte pour savoir ce qu'elle protège." },
        ],
      },
      {
        title: "Balisage des plages et pictogrammes",
        definition: "Près des plages, des bouées jaunes délimitent souvent la baignade ; des chenaux traversiers réservent l'accès des engins ; des pictogrammes à terre disent ce qui est autorisé ou interdit.",
        body: [
          "La zone de baignade est fréquemment matérialisée par des bouées jaunes, souvent jusqu'à environ 300 m du rivage selon l'organisation locale. Dedans : baigneurs, parfois engins de plage. Les navires à moteur n'y circulent pas, sauf le chenal prévu.",
          "Le chenal traversier est un couloir perpendiculaire à la plage pour que kayaks, annexes, jet-skis ou bateaux rejoignent le large. La baignade y est interdite. On le franchit lentement, sans le bloquer, sans y skier.",
          "Les pictogrammes affichés sur la plage (et parfois sur ponton) complètent le balisage flottant : baignade surveillée ou interdite, navires interdits, ski nautique interdit ou autorisé dans un secteur, planche / kite, etc. Un pictogramme barré d'une bande rouge = activité interdite. L'absence de pictogramme ne veut pas dire « tout est permis » : l'arrêté local et le balisage priment.",
          "Cas concret : tu veux rejoindre un mouillage depuis une plage. Tu empruntes le chenal d'accès, tu respectes 5 nœuds dans la bande des 300 m hors régime particulier du chenal, tu ne rases pas les bouées jaunes de baignade.",
        ],
        remember: [
          "Bouées jaunes de plage = limite de baignade, pas une cardinale ni une marque spéciale de large.",
          "Chenal traversier : passage des engins, pas de baignade.",
          "Pictogramme barré = interdit. Toujours croiser avec l'affichage local.",
        ],
        traps: [
          "Traiter une bouée jaune de baignade comme une marque spéciale AISM du large : le contexte plage / 300 m change la lecture.",
          "Couper la zone de baignade « parce qu'il n'y a personne » : l'interdiction tient au balisage, pas à l'occupation du moment.",
        ],
        terms: [
          { term: "Pictogramme", meaning: "Panneau normalisé d'activité autorisée ou interdite sur la plage." },
          { term: "Chenal traversier", meaning: "Couloir d'accès des engins, perpendiculaire à la plage." },
          { term: "Pavillons de plage", meaning: "Vert : baignade surveillée. Jaune : dangereuse mais surveillée. Rouge : interdite. Violet : pollution. Manche à air orange : vent fort, gonflables interdits." },
        ],
        images: [
          { src: "/images/plage-bouees-jaunes.jpg", alt: "Ligne de bouées sphériques jaunes délimitant une zone de baignade le long d'une plage.", caption: "Bouées jaunes de plage = limite de baignade. Ce n'est pas une marque spéciale AISM du large." },
          { src: "/images/plage-chenal-acces.jpg", alt: "Chenal d'accès vu depuis la mer : bouée rouge cylindrique à bâbord, bouée verte conique à tribord, bateau dans le couloir.", caption: "Chenal traversier depuis la mer : rouge à bâbord, vert à tribord. On n'y nage pas." },
          { src: "/images/picto-baignade-surveillee.jpg", alt: "Pictogramme officiel bleu avec un nageur blanc : baignade autorisée ou surveillée.", caption: "Panneau bleu, nageur blanc : baignade surveillée / autorisée." },
          { src: "/images/picto-baignade-interdite.jpg", alt: "Pictogramme d'interdiction : nageur noir barré d'une bande rouge.", caption: "Nageur barré = baignade interdite, même si l'eau paraît calme." },
          { src: "/images/picto-navires-interdits.jpg", alt: "Pictogramme d'interdiction : bateau à moteur barré d'une bande rouge.", caption: "Bateau barré : navires interdits, souvent dans la zone de baignade." },
          { src: "/images/picto-ski-interdit.jpg", alt: "Pictogramme d'interdiction : skieur nautique barré d'une bande rouge.", caption: "Ski et engins tractés interdits dans ce secteur." },
          { src: "/images/plage-pavillons.jpg", alt: "Mât de poste de secours avec pavillons vert, jaune, rouge, violet et manche à air orange.", caption: "Pavillons de plage : vert / jaune / rouge / violet, plus la manche à air orange." },
          { src: "/images/picto-vitesse-5-noeuds.jpg", alt: "Panneau circulaire de limitation à 5 nœuds au bord d'une plage, avec bouées jaunes en arrière-plan.", caption: "Bande des 300 m : 5 nœuds en règle générale, hors chenaux et arrêtés locaux." },
        ],
      },
      {
        title: "Initiation à la région B",
        definition: "En région B (Amériques, Japon, Corée, Philippines notamment), les couleurs latérales sont inversées : en entrant, le rouge est à tribord et le vert à bâbord.",
        body: [
          "Le permis côtier français demande une initiation, pas une expertise de navigation aux Antilles ou aux États-Unis. L'idée à retenir : seul le couple rouge/vert des latérales s'inverse. Cardinales, danger isolé, eaux saines et marques spéciales restent identiques.",
          "Les formes suivent la logique du côté : en région B, la marque tribord (rouge, à droite en entrant) a la logique de forme du côté tribord (cône). Ne mémorise pas un tableau trop fin si le QCM ne porte que sur l'inversion des couleurs : « en région B, en entrant, rouge à tribord ».",
          "Cas concret d'examen : photo d'une marque rouge. La question précise « région B, en entrant ». Tu la laisses à tribord. Sans mention de région, en France on raisonne région A.",
        ],
        remember: [
          "Région B, entrée : rouge à tribord, vert à bâbord.",
          "Cardinales et marques « tout autour » ne changent pas de région.",
          "Sans précision, un QCM français se traite en région A.",
        ],
        traps: [
          "Inverser aussi les cardinales en région B : erreur classique. Seules les latérales changent de couleur de côté.",
        ],
        plate: "region-b",
        warning: "Ne jamais déduire une règle d'une couleur aperçue au loin : confirmer avec la forme, le voyant, le feu, la carte et la région AISM indiquée.",
      },
    ],
    questions: [
      { id: "bal-1", question: "En région A, en entrant au port, cette marque rouge se laisse généralement :", choices: ["À tribord", "À bâbord", "Toujours derrière soi", "Indifféremment"], correct: 1, explanation: "En région A, en entrant, le rouge matérialise le côté bâbord du chenal.", image: "/images/mark-babord-a.jpg", imageAlt: "Marque latérale rouge cylindrique." },
      { id: "bal-2", question: "Cette marque, avec deux cônes noirs pointes vers le bas, est une cardinale :", choices: ["Nord", "Est", "Sud", "Ouest"], correct: 2, explanation: "Cardinale Sud : jaune sur noir, deux pointes vers le bas ; les eaux sûres sont au sud de la marque.", image: "/images/mark-cardinale-sud.jpg", imageAlt: "Cardinale Sud jaune sur noir." },
      { id: "bal-3", question: "Cette marque noire et rouge avec deux boules noires indique :", choices: ["Des eaux saines", "Un danger isolé", "Une zone de baignade", "Un chenal préféré"], correct: 1, explanation: "Deux boules noires = marque de danger isolé. On peut passer autour, pas dessus.", image: "/images/mark-danger-isole.jpg", imageAlt: "Marque de danger isolé." },
      { id: "bal-4", question: "Cette marque jaune avec un voyant en X est :", choices: ["Une marque spéciale", "Une marque cardinale", "Une marque de danger isolé", "Une marque latérale"], correct: 0, explanation: "Le jaune avec voyant en X caractérise une marque spéciale.", image: "/images/mark-speciale.jpg", imageAlt: "Marque spéciale jaune." },
      { id: "bal-5", question: "En région B, en entrant au port, le rouge est généralement :", choices: ["À bâbord", "À tribord", "Réservé aux plages", "Absent"], correct: 1, explanation: "L'initiation à la région B consiste notamment à retenir l'inversion des couleurs latérales." },
      { id: "bal-6", question: "Quelle est cette marque à rayures verticales rouge et blanc ?", choices: ["Danger isolé", "Cardinale Ouest", "Eaux saines", "Marque spéciale"], correct: 2, explanation: "Rayures verticales rouge/blanc et une boule rouge = eaux saines, navigables tout autour.", image: "/images/mark-eaux-saines.jpg", imageAlt: "Marque d'eaux saines." },
      { id: "bal-7", question: "Cette cardinale noire-jaune-noire, voyant à pointes opposées, se laisse :", choices: ["Au nord", "À l'est", "Au sud", "À l'ouest"], correct: 1, explanation: "Noir-jaune-noir et pointes opposées = cardinale Est. On passe à l'est de la marque.", image: "/images/mark-cardinale-est.jpg", imageAlt: "Cardinale Est." },
      { id: "bal-8", question: "Cette marque verte avec une bande rouge indique un chenal préféré :", choices: ["À tribord", "À bâbord", "Des deux côtés également", "Interdit"], correct: 1, explanation: "Vert avec bande rouge = marque tribord modifiée = chenal préféré à bâbord.", image: "/images/mark-chenal-prefere-babord.jpg", imageAlt: "Chenal préféré à bâbord." },
      { id: "bal-9", question: "Ce balisage de plage (bouées jaunes) délimite le plus souvent :", choices: ["Un chenal commercial", "Une zone de baignade", "Une cardinale Ouest", "Un danger isolé"], correct: 1, explanation: "Les bouées jaunes de plage matérialisent en général la limite de baignade, à distinguer d'une marque spéciale du large.", image: "/images/plage-bouees-jaunes.jpg", imageAlt: "Ligne de bouées jaunes le long d'une plage." },
      { id: "bal-10", question: "Ce couloir, vu depuis la mer, est un chenal traversier. La baignade y est :", choices: ["Toujours prioritaire", "Interdite", "Autorisée la nuit seulement", "Libre hors juillet-août"], correct: 1, explanation: "Le chenal est réservé à l'accès des engins nautiques ; on n'y nage pas. Depuis la mer : rouge à bâbord, vert à tribord.", image: "/images/plage-chenal-acces.jpg", imageAlt: "Chenal d'accès avec bouée rouge à gauche et verte à droite." },
      { id: "bal-11", question: "Le voyant d'une marque sert principalement à :", choices: ["Mesurer le vent", "Identifier la marque de jour, même si la couleur est mal lue", "Remplacer la carte", "Indiquer la profondeur exacte"], correct: 1, explanation: "Cylindre, cône, boules ou X permettent l'identification diurne." },
      { id: "bal-12", question: "Les feux des marques cardinales sont :", choices: ["Rouges", "Verts", "Blancs", "Jaunes"], correct: 2, explanation: "Les cardinales portent un feu blanc, distingué par le rythme d'éclats." },
      { id: "bal-13", question: "Ce pictogramme / ce balisage indique :", choices: ["Baignade surveillée", "Baignade interdite", "Ski nautique autorisé", "Chenal préféré"], correct: 1, explanation: "Un nageur barré d'une bande rouge = baignade interdite.", image: "/images/picto-baignade-interdite.jpg", imageAlt: "Pictogramme nageur barré." },
      { id: "bal-14", question: "Ce pictogramme / ce balisage indique :", choices: ["Baignade interdite", "Baignade surveillée ou autorisée", "Accès portuaire fermé", "Danger isolé"], correct: 1, explanation: "Panneau bleu au nageur blanc : activité de baignade autorisée / surveillée.", image: "/images/picto-baignade-surveillee.jpg", imageAlt: "Pictogramme bleu nageur." },
      { id: "bal-15", question: "Ce pictogramme / ce balisage indique :", choices: ["Voile obligatoire", "Navires et moteurs interdits", "Eaux saines", "Mouillage autorisé"], correct: 1, explanation: "Bateau barré d'une bande rouge = navires interdits dans le secteur.", image: "/images/picto-navires-interdits.jpg", imageAlt: "Pictogramme bateau barré." },
      { id: "bal-16", question: "Ce pictogramme / ce balisage indique :", choices: ["Ski nautique et engins tractés interdits", "Baignade surveillée", "Planche à voile obligatoire", "Chenal commercial"], correct: 0, explanation: "Skieur barré = ski et activités tractées interdits ici.", image: "/images/picto-ski-interdit.jpg", imageAlt: "Pictogramme ski nautique interdit." },
      { id: "bal-17", question: "Ce pavillon de plage indique :", choices: ["Baignade interdite", "Baignade surveillée, pas de danger apparent", "Pollution", "Vent fort"], correct: 1, explanation: "Pavillon vert : baignade surveillée sans danger apparent.", image: "/images/pavillon-vert-plage.jpg", imageAlt: "Pavillon de plage vert." },
      { id: "bal-18", question: "Ce pavillon de plage indique :", choices: ["Baignade surveillée sans danger", "Baignade interdite", "Chenal ouvert", "Ski autorisé"], correct: 1, explanation: "Pavillon rouge : baignade interdite.", image: "/images/pavillon-rouge-plage.jpg", imageAlt: "Pavillon de plage rouge." },
      { id: "bal-19", question: "Ce panneau, près du littoral, rappelle surtout :", choices: ["20 nœuds hors baignade", "5 nœuds dans la bande des 300 m, hors régimes locaux", "Interdiction totale de naviguer", "Obligation de mouiller"], correct: 1, explanation: "La règle générale enseignée est 5 nœuds dans les 300 m, sous réserve des chenaux et arrêtés locaux.", image: "/images/picto-vitesse-5-noeuds.jpg", imageAlt: "Panneau de limitation à 5 nœuds." },
      { id: "bal-20", question: "Cette manche à air orange sur une plage signifie surtout :", choices: ["Baignade interdite pour pollution", "Vent fort : engins gonflables interdits", "Port fermé", "Plongée en cours"], correct: 1, explanation: "Manche à air orange = vent fort, matelas et bouées gonflables interdits.", image: "/images/manche-air-orange.jpg", imageAlt: "Manche à air orange de plage." },
    ],
  },
  {
    id: "route",
    number: 2,
    title: "Règles de barre et de route",
    icon: "🧭",
    duration: "45 min",
    cover: "/images/feux-face-a-face.jpg",
    summary: "Éviter les abordages : veille, relèvement, croisement, rattrapage, chenaux et responsabilités.",
    objectives: [
      "Détecter un risque d'abordage et manœuvrer de façon lisible.",
      "Savoir qui s'écarte en face-à-face, croisement, rattrapage, voile et chenal.",
      "Ne jamais transformer « navire privilégié » en droit de passer coûte que coûte.",
    ],
    glossary: [
      { term: "RIPAM", meaning: "Règlement international pour prévenir les abordages en mer." },
      { term: "Relèvement", meaning: "Direction d'un objet ; constant + distance ↓ = risque d'abordage." },
      { term: "Rattrapage", meaning: "Arrivée par un secteur arrière ; le rattrapant s'écarte jusqu'à être paré et clair." },
      { term: "Navire privilégié", meaning: "Doit maintenir cap et vitesse, mais reste tenu d'éviter la collision." },
    ],
    sections: [
      {
        title: "Veille et vitesse de sécurité",
        definition: "Tout navire doit assurer en permanence une veille visuelle et auditive adaptée, et adopter une vitesse permettant d'éviter une collision et de s'arrêter à temps.",
        body: [
          "La veille, c'est l'avant, les côtés, l'arrière, les sons (corne, cloche, brouillard) et les aides (radar, AIS, VHF) sans s'y fier aveuglément. Un GPS ne voit pas un kayak. Un radar mal réglé rate une petite cible.",
          "La vitesse de sécurité n'est pas une limite chiffrée unique. On tient compte de la visibilité, de la densité du trafic, de la distance d'arrêt, du vent, de la mer, du courant, du tirant d'eau et des moyens de détection. Dans un chenal encombré ou un brouillard, ralentir n'est pas optionnel.",
        ],
        remember: [
          "Veille = vue + ouïe + aides, en permanence.",
          "Vitesse de sécurité = pouvoir manœuvrer et s'arrêter à temps.",
        ],
        traps: [
          "Croire que « j'ai l'AIS, donc je peux aller vite ». L'AIS n'équipe pas tous les usagers (annexe, paddle, baigneur).",
        ],
      },
      {
        title: "Risque d'abordage",
        definition: "Un relèvement qui reste sensiblement constant alors que la distance diminue est l'indice majeur d'un risque d'abordage. En cas de doute, on considère que le risque existe.",
        body: [
          "Le relèvement se prend au compas sur l'autre navire, un phare ou un amer. S'il ne change pas et que l'autre grossit, vos routes se coupent au même point. Si le relèvement diminue ou augmente franchement, vous passerez l'un derrière l'autre — encore faut-il assez d'eau et de marge.",
          "La manœuvre d'évitement doit être franche, ample et précoce : un petit 5° répété n'est pas lu. De nuit, un changement de feux visibles (disparition d'un feu de côté) aide l'autre à comprendre.",
        ],
        remember: [
          "Relèvement constant + distance qui diminue = danger.",
          "Doute = on retient le risque.",
          "Manœuvre grande, tôt, lisible.",
        ],
        traps: [
          "Attendre que l'autre « ait l'air proche ». Le RIPAM veut une action dès que le risque est établi, pas au dernier moment.",
        ],
        plate: "gisement",
        terms: [
          { term: "Relèvement", meaning: "Direction d'un objet mesurée depuis le navire, souvent au compas." },
          { term: "Gisement", meaning: "Angle par rapport à l'axe du bateau (0° = avant)." },
        ],
      },
      {
        title: "Deux navires à moteur",
        definition: "Face à face : chacun vient sur tribord. Croisement : celui qui a l'autre à tribord s'écarte. Rattrapage : le rattrapant s'écarte jusqu'à être paré et clair.",
        body: [
          "Face à face ou presque : on se croise bâbord contre bâbord. De nuit, tu vois rouge et vert de l'autre en même temps (et souvent son feu de tête de mât). Si tu n'es pas sûr que c'est un face-à-face, traite-le comme tel.",
          "Croisement : l'autre est sur ton tribord → tu t'écartes, et tu évites si possible de lui passer devant. L'autre est sur ton bâbord → tu maintiens, tout en surveillant.",
          "Rattrapage : tu arrives d'un secteur arrière, plus de 22,5° sur l'arrière du travers de l'autre (là où, de nuit, tu ne verrais que son feu de poupe). Tu t'écartes, voilier ou moteur, petit ou grand, jusqu'à l'avoir définitivement dépassé et laissé clair.",
        ],
        remember: [
          "Face à face : les deux viennent sur tribord.",
          "Croisement : autre à tribord → je m'écarte.",
          "Rattrapant s'écarte, quel que soit le type des navires.",
        ],
        traps: [
          "Croire qu'un voilier rattrapant un moteur est « prioritaire ». Non : le rattrapant s'écarte toujours.",
          "Couper devant au lieu de ralentir ou de passer derrière.",
        ],
        plate: "collision-head-on",
        plates: ["collision-head-on", "collision-crossing", "collision-overtaking"],
      },
      {
        title: "Voiliers, pêche et navires contraints",
        definition: "Entre voiliers : bâbord amures s'écarte de tribord amures ; à amures identiques, l'au vent s'écarte. Un moteur s'écarte d'un voilier faisant route, sauf exceptions (chenal, navire contraint, rattrapage…).",
        body: [
          "Un voilier au moteur n'est plus traité comme un voilier : cône pointe en bas de jour, feux de navire à moteur de nuit, règles du moteur.",
          "Un navire en pêche (engins qui restreignent la manœuvre, pas une simple ligne traînée de plaisance) et les navires non maîtres ou à capacité de manœuvre restreinte doivent être identifiés avant de parler de « priorité ». Un petit moteur de plaisance s'écarte largement.",
          "Cas concret : tu es à moteur, un voilier croise, mais tu es dans un chenal étroit où un cargo ne peut pas sortir. Le voilier (et toi) ne devez pas gêner le navire qui ne peut naviguer qu'en chenal.",
        ],
        remember: [
          "Bâbord amures s'écarte de tribord amures.",
          "Même bord : l'au vent s'écarte.",
          "Moteur s'écarte du voilier, sauf chenal, contrainte, rattrapage, etc.",
        ],
        traps: [
          "Utiliser le mot priorité comme au code de la route. En mer, même le privilégié doit éviter la collision.",
        ],
        plates: ["amures", "au-vent"],
        warning: "Identifier d'abord la situation complète (type de navires, chenal, rattrapage) avant d'appliquer une règle isolée.",
      },
      {
        title: "Chenaux étroits et trafic dense",
        definition: "Dans un chenal étroit, on serre le bord tribord du chenal. Un navire de moins de 20 m ou un voilier ne doit pas gêner un navire qui ne peut naviguer qu'en chenal.",
        body: [
          "Serrer tribord évite les face-à-face improvisés. On ne coupe pas un chenal pour gagner 30 secondes. On n'y mouille pas sans nécessité.",
          "Les navires en pêche ne doivent pas non plus gêner la navigation dans un chenal étroit. En cas de doute : s'écarter tôt, ralentir, appeler au besoin sur le canal du port.",
          "Cas concret : entrée de port un samedi. Un ferry, des annexes. Tu restes à tribord, tu réduis, tu n'essaies pas de doubler dans un goulet. Le trafic commercial n'a souvent aucune possibilité de s'écarter comme un semi-rigide.",
        ],
        remember: [
          "Chenal étroit : on serre tribord.",
          "Ne pas gêner qui ne peut naviguer que dans le chenal.",
          "Ne pas mouiller dans un chenal sans nécessité.",
        ],
        traps: [
          "Doubler à toute vitesse dans un goulet « parce que je suis prioritaire ».",
        ],
      },
      {
        title: "Action du navire privilégié",
        definition: "Le navire qui doit maintenir cap et vitesse surveille. S'il devient évident que l'autre ne manœuvre pas, il peut puis doit agir pour éviter l'abordage.",
        body: [
          "D'abord on maintient, pour rester lisible. Si l'autre ne vient pas sur tribord, ne ralentit pas, ne change pas de feu visible, on n'attend pas le choc : on réduit, on stoppe, on vient franchement d'un côté clair.",
          "Toute manœuvre vise une situation nette : grand changement de cap, réduction, arrêt, ou combinaison. Après l'évitement, on reprend une route claire.",
        ],
        remember: [
          "Privilégié ≠ droit de percuter.",
          "D'abord maintenir pour être lu, puis agir si l'autre ne fait rien.",
        ],
        traps: [
          "Maintenir jusqu'au bout par principe. Le RIPAM impose d'agir quand la collision ne peut plus être évitée par le seul autre navire.",
        ],
      },
    ],
    questions: [
      { id: "rou-1", question: "Deux bateaux à moteur se rencontrent face à face. Ils doivent :", choices: ["Venir tous les deux sur bâbord", "Venir tous les deux sur tribord", "Accélérer", "S'arrêter obligatoirement"], correct: 1, explanation: "Chacun vient sur tribord pour passer bâbord sur bâbord.", plate: "collision-head-on" },
      { id: "rou-2", question: "Deux bateaux à moteur se croisent. Vous voyez l'autre sur votre tribord. En principe vous devez :", choices: ["Maintenir coûte que coûte", "Vous écarter de sa route", "Toujours passer devant lui", "Mettre au mouillage"], correct: 1, explanation: "Dans une situation de croisement entre navires à moteur, celui qui voit l'autre sur son tribord s'écarte.", plate: "collision-crossing" },
      { id: "rou-3", question: "Qui doit s'écarter lors d'un rattrapage ?", choices: ["Le navire rattrapé", "Le navire rattrapant", "Le plus petit", "Le plus rapide seulement"], correct: 1, explanation: "Le rattrapant doit rester à l'écart jusqu'à avoir définitivement dépassé l'autre.", plate: "collision-overtaking" },
      { id: "rou-4", question: "Un relèvement stable alors que la distance diminue signifie :", choices: ["Aucun risque", "Un risque possible d'abordage", "Que l'autre est au mouillage", "Que vous êtes dans un chenal"], correct: 1, explanation: "C'est un signe classique de route de collision." },
      { id: "rou-5", question: "En cas de doute sur l'existence d'un risque d'abordage :", choices: ["On considère qu'il n'y en a pas", "On considère que le risque existe", "On coupe la VHF", "On se fie uniquement au GPS"], correct: 1, explanation: "Le doute doit conduire à retenir l'hypothèse du risque." },
      { id: "rou-6", question: "Dans un chenal étroit, un petit bateau de plaisance doit :", choices: ["Gêner le ferry s'il a le vent", "Serrer tribord et ne pas gêner un navire qui ne peut naviguer que dans le chenal", "Mouiller au milieu pour attendre", "Toujours doubler par bâbord"], correct: 1, explanation: "On serre le côté tribord du chenal et on ne gêne pas les navires contraints au chenal." },
      { id: "rou-7", question: "Un voilier qui rattrape un bateau à moteur doit :", choices: ["Maintenir car c'est un voilier", "S'écarter jusqu'à être paré et clair", "Exiger que le moteur s'arrête", "Passer forcément devant"], correct: 1, explanation: "Le rattrapant s'écarte, quel que soit le type des deux navires." },
    ],
  },
  {
    id: "feux",
    number: 3,
    title: "Feux et marques des navires",
    icon: "💡",
    duration: "45 min",
    cover: "/images/feux-face-a-face.jpg",
    summary: "Reconnaître de nuit les feux et de jour les marques : même signification, deux langages.",
    objectives: [
      "Lire les feux de route et en déduire le cap relatif.",
      "Associer chaque situation (mouillage, pêche, non maître…) à ses feux ET à sa marque de jour.",
      "Identifier un voilier au moteur et les navires contraints.",
    ],
    glossary: [
      { term: "Marque de jour", meaning: "Formes noires (boule, cône, losange, cylindre) équivalentes aux feux de nuit." },
      { term: "Feu de côté", meaning: "Rouge bâbord, vert tribord, secteurs latéraux." },
      { term: "Feu visible sur tout l'horizon", meaning: "360° : mouillage, non maître, manœuvre restreinte…" },
    ],
    sections: [
      {
        title: "Feux fondamentaux",
        definition: "Bâbord = rouge, tribord = vert, poupe = blanc, tête de mât = blanc vers l'avant. Ces feux de route disent à la fois le type (moteur / voile) et le cap relatif.",
        body: [
          "Un navire à propulsion mécanique faisant route montre ses feux de côté, un feu de poupe et un ou deux feux de tête de mât selon la longueur. Vu de face : blanc en haut, rouge à gauche (son bâbord), vert à droite (son tribord). Vu de bâbord : rouge + blancs, jamais de vert. Vu de poupe : seulement le blanc arrière.",
          "Un voilier faisant route (sans moteur) : feux de côté + poupe, pas de feu de tête de mât obligatoire comme un moteur. Il peut porter en tête de mât un feu tricolore (remplaçant côté + poupe sur les petites unités) ou des feux rouge/vert en tête en plus. Dès qu'il utilise le moteur, il est un navire à moteur : feux de moteur, et de jour un cône noir pointe en bas.",
          "Cas concret : tu vois un blanc et un rouge, pas de vert. Tu es sur son bâbord (ou presque). S'il y a aussi un feu de tête de mât, c'est un moteur. S'il n'y a que rouge et blanc de poupe sans tête de mât, ce peut être un voilier vu de bâbord.",
        ],
        remember: [
          "Rouge = son bâbord. Vert = son tribord. Blanc arrière = poupe.",
          "Face à face moteur : blanc + rouge à gauche + vert à droite.",
          "Voilier au moteur = règles et feux du moteur + cône pointe en bas de jour.",
        ],
        traps: [
          "Inverser rouge et vert « comme les feux de circulation » : en mer, rouge est à bâbord du navire observé, donc à ta gauche s'il vient vers toi.",
          "Traiter un voilier au moteur comme un voilier « prioritaire ».",
        ],
        plates: ["lights-power", "light-sectors"],
        images: [
          { src: "/images/feux-face-a-face.jpg", alt: "Navire à moteur vu de face de nuit : feu de tête de mât blanc, feu bâbord rouge à gauche, feu tribord vert à droite.", caption: "Vu de face : blanc en haut, rouge à gauche (son bâbord), vert à droite (son tribord). Risque de face-à-face." },
          { src: "/images/feux-cote-babord.jpg", alt: "Navire à moteur vu de son bâbord de nuit : feu rouge de côté, feu de tête de mât blanc et feu de poupe blanc.", caption: "Vu de bâbord : on voit le rouge, le blanc de tête de mât et le blanc de poupe. Pas de vert." },
        ],
      },
      {
        title: "Marques de jour et feux : le même message",
        definition: "De jour, des formes noires remplacent les feux caractéristiques. Il faut savoir relier les deux colonnes, c'est un classique d'examen.",
        body: [
          "Mouillage : de jour une boule à l'avant ; de nuit un feu blanc visible sur tout l'horizon (et un second blanc à l'arrière sur les plus grands navires). Échoué : on ajoute la signalisation de non maître (deux boules / deux rouges) à celle du mouillage ; de jour, trois boules.",
          "Non maître de sa manœuvre : deux boules / deux feux rouges superposés. Capacité de manœuvre restreinte : boule-losange-boule / rouge-blanc-rouge. Contraint par son tirant d'eau : un cylindre / trois feux rouges. Pêche : deux cônes superposés par les pointes ; de nuit vert sur blanc (chalut) ou rouge sur blanc (autre pêche).",
          "Remorquage : feux de tête de mât supplémentaires selon la longueur du remorquage ; si le remorquage dépasse 200 m, un losange de jour. On ne se faufile jamais entre remorqueur et remorqué.",
        ],
        remember: [
          "1 boule = mouillage. 2 boules = non maître. 3 boules = échoué.",
          "Boule-losange-boule = manœuvre restreinte = R-B-R de nuit.",
          "Cône pointe en bas = voilier qui utilise son moteur.",
        ],
        traps: [
          "Confondre une boule (mouillage) et deux boules (non maître).",
          "Prendre rouge sur blanc pour un chalut : chalut = vert sur blanc ; autre pêche = rouge sur blanc.",
        ],
        plate: "day-marks",
        images: [
          { src: "/images/marque-mouillage.jpg", alt: "Navire au mouillage de jour portant une boule noire à l'avant.", caption: "De jour, au mouillage : une boule noire. De nuit : un feu blanc visible sur tout l'horizon." },
        ],
      },
      {
        title: "Pêche",
        definition: "Chalut : vert sur blanc. Autre pêche : rouge sur blanc. De jour : deux cônes pointes contre pointes.",
        body: [
          "« En pêche » au sens du RIPAM, ce n'est pas un plaisancier avec une ligne. C'est un navire qui met en œuvre un engin qui restreint sa manœuvrabilité. On s'en écarte largement, on ne passe pas sur l'engin.",
          "D'autres feux (côté, poupe, projecteur sur l'engin) complètent selon la taille et le déploiement. L'essentiel au permis : distinguer chalut / autre pêche, et ne pas confondre avec non maître (deux rouges sans blanc du milieu).",
        ],
        remember: ["Chalut : vert sur blanc.", "Autre pêche : rouge sur blanc.", "Jour : 2 cônes, pointes en contact."],
        traps: ["Rouge sur blanc n'est pas un « stop » : c'est une pêche autre que le chalut."],
        plate: "lights-fishing",
        images: [
          { src: "/images/feux-chalut.jpg", alt: "Chalutier de nuit avec deux feux superposés vert sur blanc.", caption: "Pêche au chalut : vert sur blanc." },
          { src: "/images/feux-peche.jpg", alt: "Navire en pêche autre que le chalutage de nuit, feux rouge sur blanc.", caption: "Autre pêche : rouge sur blanc." },
        ],
      },
      {
        title: "Navires contraints",
        definition: "Deux rouges = non maître. Rouge-blanc-rouge = manœuvre restreinte. Trois rouges = contraint par son tirant d'eau. Un blanc horizon = mouillage (cas général des petites unités).",
        body: [
          "Non maître : circonstance exceptionnelle (avarie) qui l'empêche de manœuvrer selon le RIPAM. Manœuvre restreinte : la nature du travail (dragage, câble, relevé) limite la capacité à s'écarter. Ce n'est pas la même situation.",
          "Un remorqueur ajoute des feux de tête de mât ; l'ensemble remorqueur-remorqué est long, peu manœuvrant, parfois peu visible entre les deux. Distance, lenteur, jamais couper le câble.",
        ],
        remember: [
          "2 rouges = non maître = 2 boules.",
          "R-B-R = manœuvre restreinte = boule-losange-boule.",
          "1 blanc horizon = mouillage = 1 boule.",
        ],
        traps: [
          "Prendre deux rouges pour un mouillage. Le mouillage est blanc.",
        ],
        plate: "lights-constrained",
        images: [
          { src: "/images/feux-non-maitre.jpg", alt: "Navire de nuit portant deux feux rouges superposés, signal de navire non maître de sa manœuvre.", caption: "Non maître de sa manœuvre : deux feux rouges superposés. De jour : deux boules noires." },
          { src: "/images/feux-manoeuvre-restreinte.jpg", alt: "Navire de nuit portant trois feux superposés rouge, blanc et rouge.", caption: "Capacité de manœuvre restreinte : rouge-blanc-rouge. De jour : boule-losange-boule." },
        ],
      },
      {
        title: "Méthode d'identification",
        definition: "On ne cherche pas d'abord le nom du navire : on lit les feux de haut en bas, puis les feux de route pour le cap.",
        body: [
          "1) Y a-t-il des feux tout horizon superposés (rouges, blancs) ? Cela donne l'activité. 2) Y a-t-il rouge et/ou vert ? Cela donne le cap relatif. 3) Un seul blanc isolé, bas : souvent mouillage. 4) De jour, on fait le même raisonnement avec les formes.",
          "À l'examen, une photo de face teste le face-à-face ; une photo de bâbord teste rouge + blancs ; une boule teste le mouillage. Relis la légende : « de jour » ou « de nuit » change le langage, pas la signification.",
        ],
        remember: [
          "Haut en bas = activité. Côtés = cap.",
          "Jour = formes. Nuit = feux. Même message.",
        ],
      },
    ],
    questions: [
      { id: "feu-1", question: "Sur cette vue de bâbord, le feu de côté bâbord est :", choices: ["Vert", "Rouge", "Blanc", "Jaune"], correct: 1, explanation: "Bâbord = rouge ; tribord = vert.", image: "/images/feux-cote-babord.jpg", imageAlt: "Navire vu de bâbord de nuit." },
      { id: "feu-2", question: "Ces deux feux rouges superposés caractérisent notamment un navire :", choices: ["Non maître de sa manœuvre", "Au mouillage", "Pilote", "À voile uniquement"], correct: 0, explanation: "Rouge sur rouge = navire non maître de sa manœuvre.", image: "/images/feux-non-maitre.jpg", imageAlt: "Deux feux rouges superposés." },
      { id: "feu-3", question: "Cette séquence verticale rouge-blanc-rouge correspond à :", choices: ["Un navire de pêche au chalut", "Un navire à capacité de manœuvre restreinte", "Un bateau pilote", "Un voilier"], correct: 1, explanation: "La séquence rouge-blanc-rouge signale une capacité de manœuvre restreinte.", image: "/images/feux-manoeuvre-restreinte.jpg", imageAlt: "Feux rouge blanc rouge." },
      { id: "feu-4", question: "Ce navire présente de jour une boule noire. Dans le cas général, il est :", choices: ["Au mouillage", "En pêche au chalut", "Non maître de sa manœuvre", "À capacité de manœuvre restreinte"], correct: 0, explanation: "La boule noire est la marque de jour classique du mouillage.", image: "/images/marque-mouillage.jpg", imageAlt: "Boule noire de mouillage." },
      { id: "feu-5", question: "Un voilier qui navigue au moteur est considéré, pour les règles de route, comme :", choices: ["Toujours un voilier", "Un navire à propulsion mécanique", "Un navire en pêche", "Un navire non maître"], correct: 1, explanation: "Dès que la propulsion mécanique est utilisée, les règles du navire à moteur s'appliquent." },
      { id: "feu-6", question: "Ces feux vert sur blanc caractérisent :", choices: ["Un navire au mouillage", "Une pêche autre que le chalut", "Un navire en pêche au chalut", "Un navire non maître"], correct: 2, explanation: "Chalut = vert sur blanc. Autre pêche = rouge sur blanc.", image: "/images/feux-chalut.jpg", imageAlt: "Feux de chalutier vert sur blanc." },
      { id: "feu-7", question: "Vu de face, ce navire à moteur montre :", choices: ["Deux feux verts", "Blanc en haut, rouge à gauche, vert à droite", "Uniquement un feu blanc", "Rouge à droite et vert à gauche"], correct: 1, explanation: "Face à face : tête de mât blanche, son bâbord à votre gauche (rouge), son tribord à votre droite (vert).", image: "/images/feux-face-a-face.jpg", imageAlt: "Navire à moteur vu de face de nuit." },
      { id: "feu-8", question: "De jour, deux boules noires superposées correspondent à :", choices: ["Un mouillage", "Un navire non maître de sa manœuvre", "Un voilier au moteur", "Une pêche au chalut"], correct: 1, explanation: "Deux boules = non maître. Une boule = mouillage. Cône pointe en bas = voilier au moteur." },
      { id: "feu-9", question: "La marque de jour du mouillage est :", choices: ["Deux cônes", "Une boule", "Un losange", "Un cylindre"], correct: 1, explanation: "Une boule noire de jour, un feu blanc tout horizon de nuit (cas général enseigné)." },
    ],
  },
  {
    id: "signaux",
    number: 4,
    title: "Signaux sonores, détresse et trafic portuaire",
    icon: "📣",
    duration: "40 min",
    cover: "/images/detresse-fusee.jpg",
    summary: "Sons de manœuvre, visibilité réduite, MAYDAY / PAN PAN / SÉCURITÉ, et feux de trafic d'un port.",
    objectives: [
      "Connaître 1, 2, 3 et 5 sons brefs, et le son prolongé.",
      "Choisir MAYDAY, PAN PAN ou SÉCURITÉ selon la gravité.",
      "Lire les feux de trafic portuaire les plus courants et rester prudent.",
    ],
    glossary: [
      { term: "Son bref", meaning: "Environ 1 seconde. 1 = tribord, 2 = bâbord, 3 = arrière." },
      { term: "MAYDAY", meaning: "Détresse grave et imminente, assistance immédiate." },
      { term: "Feux de trafic", meaning: "Signaux d'entrée de port : souvent 3 rouges = interdit, 2 verts = autorisé." },
    ],
    sections: [
      {
        title: "Signaux de manœuvre",
        definition: "En vue l'un de l'autre, un navire à propulsion mécanique peut indiquer son intention : un son bref = je viens sur tribord ; deux = bâbord ; trois = je bats en arrière.",
        body: [
          "Un son bref dure environ une seconde ; un son prolongé, de 4 à 6 secondes. Au voisinage d'un coude ou d'un obstacle qui masque, un son prolongé avertit de sa présence ; on répond par un son prolongé.",
          "Ces signaux n'autorisent pas une manœuvre dangereuse. Ils la rendent lisible. Si tu viens sur tribord, viens vraiment, tôt, et assez.",
        ],
        remember: [
          "1 bref = tribord ; 2 brefs = bâbord ; 3 brefs = arrière.",
          "Son prolongé au coude : « je suis là ».",
        ],
        traps: [
          "Inverser 1 et 2. Mémo : un doigt = tribord (comme on « vient sur tribord » en premier dans le face-à-face).",
        ],
        plate: "sounds",
      },
      {
        title: "Doute et danger",
        definition: "Au moins cinq sons brefs et rapides = doute ou danger sur les intentions de l'autre.",
        body: [
          "Tu es privilégié, l'autre devrait s'écarter, il ne le fait pas : tu peux « crier » en sonore, et tu te prépares à manœuvrer. Le signal n'exonère jamais d'éviter la collision.",
        ],
        remember: ["5 brefs = « je ne comprends pas / danger »."],
        traps: ["Prendre 5 brefs pour un MAYDAY. La détresse a d'autres signaux (fusée rouge, appel radio, etc.)."],
      },
      {
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
      },
      {
        title: "MAYDAY, PAN PAN, SÉCURITÉ",
        definition: "Trois niveaux radio : détresse (MAYDAY), urgence (PAN PAN), sécurité de navigation ou météo (SÉCURITÉ).",
        body: [
          "MAYDAY : danger grave et imminent, assistance immédiate (incendie incontrôlé, voie d'eau majeure, personne en danger vital, abandon). On le répète trois fois, on donne identité, position, nature, nombre de personnes, intentions.",
          "PAN PAN : urgence sérieuse sans détresse imminente (panne avec risque limité, médical non immédiatement vital, besoin d'assistance). SÉCURITÉ : phare éteint, objet dérivant, avis météo important — pas une détresse personnelle.",
          "Cas concret : moteur en panne, mer belle, 0,5 mille d'un port, personne à bord va bien → plutôt assistance ou PAN PAN, pas MAYDAY. Homme à la mer de nuit, tu le perds de vue → MAYDAY.",
        ],
        remember: [
          "MAYDAY = détresse imminente.",
          "PAN PAN = urgence sans détresse imminente.",
          "SÉCURITÉ = info navigation / météo.",
        ],
        traps: [
          "Lancer MAYDAY pour une panne bénigne : tu mobilises CROSS, SNSM, navires autour. C'est fautif si ce n'est pas une détresse.",
        ],
      },
      {
        title: "Signaux de détresse",
        definition: "Fusée ou feu rouge, fumée orange, MAYDAY, alerte ASN, bras écartés, etc. Un usage sans motif réel est une infraction grave.",
        body: [
          "Le RIPAM et les conventions listent les signaux reconnus. Au permis : feu rouge à main, fusée parachute rouge, fumigène orange, appel MAYDAY, touche DISTRESS ASN, miroir, signal sonore continu… On ne « teste » pas une fusée pour le plaisir.",
          "Après l'alerte : rester à l'écoute, suivre les instructions du CROSS, préparer le matériel de récupération, ne pas quitter le navire trop tôt.",
        ],
        remember: [
          "Feu / fusée rouge = détresse.",
          "Jamais un signal de détresse « pour rire ».",
        ],
        images: [
          { src: "/images/detresse-fusee.jpg", alt: "Feu rouge à main de détresse allumé au-dessus de la mer.", caption: "Feu rouge à main : signal de détresse reconnu. Ne jamais l'utiliser sans motif réel." },
        ],
      },
      {
        title: "Trafic portuaire",
        definition: "À l'entrée d'un port, des feux de trafic indiquent si on peut entrer, sortir, ou si le port est fermé. Les combinaisons locales figurent dans les documents nautiques.",
        body: [
          "Combinaisons souvent enseignées en France : trois feux rouges verticaux = entrée (et parfois sortie) interdite ; deux feux verts verticaux = entrée autorisée. D'autres feux (blanc intercalé, clignotant) signalent une restriction ou une urgence. Ce n'est pas un code universel identique dans tous les ports du monde : on vérifie Instructions nautiques, guide du port, VHF du port.",
          "Même « port ouvert », tu restes à tribord du chenal, tu cèdes aux navires de commerce peu manœuvrants, tu respectes la vitesse du port, tu n'encombre pas le goulet. Un ferry en manœuvre n'a pas ta capacité à s'arrêter.",
          "Cas concret : tu arrives, tu vois trois rouges. Tu attends au large ou dans la zone d'attente, tu n'forces pas « entre deux navires ». Tu peux appeler le port sur son canal de travail (souvent indiqué sur la carte ou l'almanach).",
        ],
        remember: [
          "3 rouges verticaux : accès souvent interdit.",
          "2 verts : accès souvent autorisé.",
          "Toujours confirmer sur les documents du port.",
        ],
        traps: [
          "Inventer le sens d'un feu inconnu. Si tu ne l'as pas appris pour CE port, tu n'entres pas à l'aveugle.",
        ],
        plate: "port-traffic",
      },
    ],
    questions: [
      { id: "sig-1", question: "Trois sons brefs signifient :", choices: ["Je viens sur tribord", "Je viens sur bâbord", "Je bats en arrière", "Je suis au mouillage"], correct: 2, explanation: "Trois sons brefs indiquent que les machines battent en arrière.", plate: "sounds" },
      { id: "sig-2", question: "Au moins cinq sons brefs et rapides expriment :", choices: ["Une demande météo", "Un doute ou un danger", "Une arrivée au port", "Une détresse médicale uniquement"], correct: 1, explanation: "C'est le signal de doute/danger." },
      { id: "sig-3", question: "MAYDAY est utilisé pour :", choices: ["Une information météo", "Une urgence grave et imminente", "Une simple panne sans danger", "Demander l'heure"], correct: 1, explanation: "MAYDAY est le message de détresse.", image: "/images/detresse-fusee.jpg", imageAlt: "Fusée ou feu rouge de détresse." },
      { id: "sig-4", question: "PAN PAN indique :", choices: ["Une urgence sérieuse sans détresse grave et imminente", "Un message commercial", "Une manœuvre de port", "Une balise cardinale"], correct: 0, explanation: "PAN PAN est un message d'urgence, moins critique que MAYDAY." },
      { id: "sig-5", question: "SÉCURITÉ sert principalement à annoncer :", choices: ["Un message lié à la sécurité de navigation ou météo", "Une réservation de port", "Une collision certaine", "Une demande de carburant"], correct: 0, explanation: "SÉCURITÉ précède un message de sécurité maritime." },
      { id: "sig-6", question: "Trois feux rouges verticaux à l'entrée d'un port signifient le plus souvent :", choices: ["Accès autorisé", "Accès interdit", "Baignade surveillée", "Chenal préféré à tribord"], correct: 1, explanation: "Combinaison souvent enseignée : trois rouges = entrée interdite. Confirmer toujours sur les documents du port.", plate: "port-traffic" },
      { id: "sig-7", question: "Deux feux verts verticaux à l'entrée d'un port indiquent le plus souvent :", choices: ["Port fermé", "Entrée autorisée", "Détresse", "Mouillage obligatoire"], correct: 1, explanation: "Deux verts : accès souvent autorisé, sans dispenser des règles de chenal et de vitesse.", plate: "port-traffic" },
    ],
  },
  {
    id: "securite",
    number: 5,
    title: "Sécurité et navigation côtière",
    icon: "🛟",
    duration: "40 min",
    cover: "/images/pavillon-alpha.jpg",
    summary: "Chef de bord, bande des 300 m, vitesse, plongeurs, charge et visibilité réduite.",
    objectives: [
      "Appliquer 5 nœuds dans la bande des 300 m, hors régimes locaux et chenaux.",
      "Reconnaître le pavillon Alpha et les zones à risques.",
      "Assumer le rôle du chef de bord (charge, météo, décision de partir).",
    ],
    glossary: [
      { term: "Chef de bord", meaning: "Responsable de la conduite, de la sécurité et de la décision de partir." },
      { term: "Bande des 300 m", meaning: "Bande littorale : 5 nœuds en règle générale, usagers vulnérables." },
      { term: "Pavillon Alpha", meaning: "Blanc et bleu, queue d'aronde : opérations de plongée." },
    ],
    sections: [
      {
        title: "Chef de bord",
        definition: "Le chef de bord est responsable de la conduite du navire, de la sécurité des personnes et du respect des règles. Il décide de partir, d'adapter ou d'annuler.",
        body: [
          "Il prépare : météo marine, marée, carburant, matériel, itinéraire, capacités de l'équipage (nagers, mal de mer, enfants). Un bateau « autorisé jusqu'à 6 milles » n'oblige jamais à y aller par force 6.",
          "À bord : briefing (gilets, homme à la mer, VHF), sobriété, veille. En cas d'accident, des responsabilités civiles et pénales peuvent être engagées. La prudence n'est pas un luxe, c'est le métier.",
        ],
        remember: [
          "C'est le chef de bord qui dit oui ou non au départ.",
          "Le permis ne remplace ni la météo ni le bon sens.",
        ],
        traps: ["Croire que le propriétaire absent est responsable à la place du conducteur du jour."],
      },
      {
        title: "Bande des 300 mètres et limitations de vitesse",
        definition: "Dans la bande des 300 m le long du littoral, la vitesse est généralement limitée à 5 nœuds, sauf chenaux d'accès réglementés et arrêtés locaux contraires.",
        body: [
          "Pourquoi 5 nœuds : baigneurs, paddle, kayaks, annexes, enfants. Un sillage violent blesse autant qu'une collision. 5 nœuds ≈ 9 km/h : c'est lent, c'est voulu.",
          "Exceptions fréquentes : le chenal d'accès à un port ou un chenal traversier de plage peut prévoir un régime différent — ce n'est pas un permis d'y foncer. Les ports ont souvent leur propre limite. Un arrêté préfectoral peut durcir (voire interdire certaines activités).",
          "Autres limitations : distance aux plongeurs, aux zones de baignade (bouées jaunes), aux parcs ostréicoles, aux réserves. On ne se cale pas « au GPS 301 m » pour accélérer au raz des baigneurs.",
          "Cas concret : tu sors du port par le chenal, tu restes prudent ; une fois hors chenal mais encore dans les 300 m hors baignade, tu es à 5 nœuds jusqu'à en être sorti. Tu ne rases pas la plage pour « faire un passage ».",
        ],
        remember: [
          "300 m : 5 nœuds en règle générale.",
          "Chenaux et arrêtés locaux peuvent prévoir autre chose : les lire.",
          "Le sillage fait partie de la vitesse responsable.",
        ],
        traps: [
          "Croire que 5 nœuds ne s'appliquent que s'il y a des baigneurs visibles.",
          "Accélérer dans un chenal de plage comme sur un circuit.",
        ],
        images: [
          { src: "/images/picto-vitesse-5-noeuds.jpg", alt: "Panneau circulaire limité à 5 nœuds au bord d'une plage, bouées jaunes en arrière-plan.", caption: "Bande des 300 m : 5 nœuds en règle générale. Chenaux et arrêtés locaux peuvent prévoir un autre régime." },
        ],
      },
      {
        title: "Plongeurs, pêche et obstacles",
        definition: "Le pavillon Alpha (blanc et bleu, queue d'aronde) signale des opérations de plongée : on s'écarte et on passe lentement.",
        body: [
          "Des plongeurs peuvent être loin du bateau support. Un pavillon de plongée loisir (croix de Saint-André rouge/blanc) se rencontre aussi : même réflexe de prudence. On ne passe pas entre le bateau et les bulles.",
          "Filets, casiers, filières, parcs : peu visibles, parfois balisés en jaune (marque spéciale). La carte et la veille évitent de t'enrouler l'hélice.",
        ],
        remember: [
          "Alpha = plongée = loin et lent.",
          "Les engins de pêche sont des pièges pour l'hélice.",
        ],
        images: [
          { src: "/images/pavillon-alpha.jpg", alt: "Pavillon Alpha blanc et bleu à queue d'aronde hissé près de plongeurs en surface.", caption: "Pavillon Alpha : opérations de plongée. S'écarter et passer lentement." },
          { src: "/images/picto-plongee.jpg", alt: "Pictogramme bleu d'un plongeur : zone de plongée, s'écarter et passer lentement.", caption: "Pictogramme de plongée à terre : même réflexe que le pavillon Alpha — loin et lent." },
        ],
      },
      {
        title: "Nombre de personnes et charge",
        definition: "On ne dépasse ni le nombre de personnes ni la charge prévus par le constructeur et les documents du navire.",
        body: [
          "La plaque ou le manuel donne des limites. Personnes mouillées, glacières, annexe, plein d'eau douce : tout pèse. Une charge mal répartie (trop à l'arrière) noie le tableau, réduit la visibilité, dégrade la stabilité.",
          "Mer formée : on embarque moins, on rentre plus tôt. Un « on a toujours fait comme ça » n'est pas une règle.",
        ],
        remember: ["Limites constructeur = maximum, pas un objectif.", "Répartir la charge, garder de la stabilité."],
        traps: ["Compter un enfant pour « une demi-personne » hors ce que prévoit le navire."],
      },
      {
        title: "Visibilité réduite",
        definition: "On ralentit, on veille, on allume les feux prescrits, on utilise les sons et les aides électroniques sans leur faire une confiance aveugle.",
        body: [
          "Le GPS donne une position, pas la certitude d'être vu. Le radar / l'AIS aident ; un paddle n'émet rien. En brume près d'une plage, 5 nœuds c'est encore trop si tu ne vois pas à 20 m.",
        ],
        remember: ["Électronique = aide. Veille = obligation."],
      },
    ],
    questions: [
      { id: "sec-1", question: "Qui porte la responsabilité générale de la sécurité et de la conduite du bateau ?", choices: ["Le passager le plus âgé", "Le chef de bord", "Le propriétaire uniquement", "Le port"], correct: 1, explanation: "Le chef de bord organise et assume la conduite et la sécurité du navire." },
      { id: "sec-2", question: "Dans la bande des 300 m, la vitesse est généralement limitée à :", choices: ["3 nœuds", "5 nœuds", "10 nœuds", "20 nœuds"], correct: 1, explanation: "La règle générale enseignée est 5 nœuds, sous réserve de la réglementation locale.", image: "/images/picto-vitesse-5-noeuds.jpg", imageAlt: "Panneau 5 nœuds au bord d'une plage." },
      { id: "sec-3", question: "Ce pavillon attire notamment l'attention sur :", choices: ["Des opérations de plongée", "Un bateau au mouillage seulement", "Une panne de GPS", "Une régate terminée"], correct: 0, explanation: "Le pavillon Alpha (blanc et bleu, queue d'aronde) est associé à des opérations de plongée et appelle à la prudence.", image: "/images/pavillon-alpha.jpg", imageAlt: "Pavillon Alpha." },
      { id: "sec-4", question: "En visibilité réduite, le GPS :", choices: ["Remplace la veille", "Dispense de ralentir", "Est une aide mais ne remplace pas la veille", "Donne la priorité"], correct: 2, explanation: "Les aides électroniques complètent la veille ; elles ne la remplacent pas." },
      { id: "sec-5", question: "La charge maximale du bateau :", choices: ["Peut être dépassée par beau temps", "Doit respecter les limites du constructeur", "Ne concerne que le carburant", "Est sans effet sur la stabilité"], correct: 1, explanation: "Les limites prévues pour le navire doivent être respectées." },
      { id: "sec-6", question: "La limite de 5 nœuds dans les 300 m :", choices: ["S'applique seulement s'il y a des baigneurs visibles", "Est la règle générale, hors chenaux et arrêtés locaux", "Autorise 20 nœuds le matin", "Ne concerne que les voiliers"], correct: 1, explanation: "C'est une règle générale de prudence littorale, avec des régimes particuliers possibles dans les chenaux." },
    ],
  },
  {
    id: "materiel",
    number: 6,
    title: "Matériel de sécurité — Division 240",
    icon: "🧰",
    duration: "45 min",
    cover: "/images/materiel-securite.jpg",
    summary: "Abri, EIF, armement basique et côtier jusqu'à 6 milles : ce que le permis exige de retenir.",
    objectives: [
      "Définir un abri et choisir l'armement selon l'éloignement.",
      "Connaître EIF 50 / 100 et les ajouts côtiers.",
      "Vérifier l'état du matériel, pas seulement sa présence.",
    ],
    glossary: [
      { term: "Abri", meaning: "Lieu côtier où l'on se met en sécurité et d'où l'on repart sans assistance, selon météo, marée et bateau." },
      { term: "EIF", meaning: "Équipement individuel de flottabilité adapté à la morphologie et à la zone." },
      { term: "Armement côtier", meaning: "De 2 à moins de 6 milles : basique adapté + récupération, feux rouges, compas, cartes, RIPAM, balisage." },
    ],
    sections: [
      {
        title: "Distance d'un abri",
        definition: "Un abri est un endroit de la côte où le navire et son équipage peuvent se mettre en sécurité (mouiller, atterrir ou accoster) et repartir sans assistance, compte tenu de la météo, de la marée et des caractéristiques du bateau.",
        body: [
          "Ce n'est pas « n'importe quel port sur la carte ». Un port dont la barre est impraticable aujourd'hui, une plage qui déferle, un chenal trop peu profond à marée basse : ce n'est pas un abri pour CE bateau, CE jour. L'éloignement se mesure par rapport à un abri réellement utilisable.",
          "Moins de 2 milles d'un abri : armement basique. De 2 à moins de 6 milles : armement côtier. Au-delà : d'autres catégories (semi-hauturier, hauturier) hors champ du permis côtier pour la conduite, mais utiles à connaître pour ne pas « déborder » sans matériel.",
        ],
        remember: [
          "Abri = sécurité réelle ici et maintenant, pas un nom sur la carte.",
          "< 2 milles : basique. 2 à 6 milles : côtier.",
        ],
        traps: [
          "Compter 6 milles depuis le port d'attache alors que le seul abri utilisable est plus loin, ou l'inverse.",
        ],
      },
      {
        title: "Équipement individuel de flottabilité",
        definition: "L'EIF doit être adapté à la morphologie, au poids, et au niveau de performance exigé par la zone. Accessible immédiatement s'il n'est pas porté.",
        body: [
          "Règle générale enseignée : jusqu'à 2 milles, niveau 50 ; de 2 à 6 milles, niveau 100. Les enfants et personnes de faible masse ont des exigences spécifiques : un adulte 100 mal sanglé sur un enfant est dangereux.",
          "Gilet automatique : vérifier la cartouche, la date, le déclencheur. Gonflable hors d'usage = tu n'as pas d'EIF. Le porter par mer fraîche, de nuit, ou si tu ne nages pas, n'est pas « excessif ».",
        ],
        remember: [
          "2 milles : 50. 2 à 6 milles : 100 (cas général).",
          "Adapté à la personne, accessible, en état.",
        ],
        traps: ["Un gilet 50 « pour tout le monde jusqu'à 6 milles » : faux dans le cas général."],
      },
      {
        title: "Armement basique",
        definition: "Matériel minimal à moins de 2 milles d'un abri : flottabilité, lumière, incendie, assèchement, remorquage, mouillage selon les cas, marées hors Méditerranée.",
        body: [
          "Liste de principe (toujours recouper le texte officiel à jour) : un EIF adapté par personne, un dispositif lumineux étanche d'au moins 6 h (collectif ou individuel), les extincteurs prévus pour le bateau, un moyen d'assèchement manuel pour les navires concernés, un dispositif de remorquage, une ligne de mouillage adaptée sauf exemptions, un moyen de connaître heures et coefficients de marée du jour hors Méditerranée. Hors eaux territoriales : pavillon national.",
          "Le permis pose des questions de logique : « qu'est-ce qui manque pour aller à 3 milles ? » plutôt qu'une récitation de virgules. Sache ce qui est basique, ce qui s'ajoute au côtier.",
        ],
        remember: [
          "Basique = très près d'un abri, pas « léger pour 6 milles ».",
          "Marées : requises hors Méditerranée dans le basique enseigné.",
        ],
      },
      {
        title: "Armement côtier, de 2 à 6 milles",
        definition: "Le côtier reprend le basique adapté et ajoute notamment récupération d'homme à la mer, EIF 100, 3 feux rouges à main, compas, cartes officielles à jour, RIPAM et document de balisage.",
        body: [
          "Bouée fer à cheval ou couronne + bout : pour signaler et aider à récupérer. Trois feux rouges à main : détresse visuelle. Compas magnétique de route visible du poste de conduite : le GPS peut lâcher. Cartes officielles de la zone, tenues à jour (papier ou électronique consultable selon les conditions prévues). RIPAM ou résumé textuel et graphique conforme. Document du balisage de la zone fréquentée.",
          "Cas concret : tu prévois un pique-nique à 4 milles. Vérifie EIF 100, bouée, fusées/feux, cartes, compas, VHF si tu en as une — et l'état de tout ça, pas la photo du coffre.",
        ],
        remember: [
          "Côtier = 3 feux rouges à main + compas + cartes + RIPAM + balisage + récupération + EIF 100.",
          "Les cartes doivent être officielles et à jour.",
        ],
        traps: [
          "Une capture d'écran d'appli grand public n'est pas forcément la carte marine officielle exigée.",
        ],
        warning: "La Division 240 évolue. Pour naviguer réellement, la liste réglementaire officielle à jour prévaut toujours sur une fiche de révision.",
        images: [
          { src: "/images/materiel-securite.jpg", alt: "Gilet de sauvetage, feu rouge à main et bouée fer à cheval posés sur le pont.", caption: "De 2 à 6 milles : EIF 100, bouée de récupération, trois feux rouges à main, compas, cartes et documents de balisage." },
        ],
      },
      {
        title: "Contrôle avant départ",
        definition: "Présent, accessible, en état de marcher : les trois conditions. Un extincteur périmé dans le fond d'un coffre ne compte pas.",
        body: [
          "Dates, gonflage, cartouche, charge des lampes et de la VHF, étanchéité, amarrage de la ligne de mouillage, fonctionnement de l'assèchement. Briefing équipage : où sont les gilets, comment on alerte.",
        ],
        remember: ["Un matériel hors d'usage = un matériel absent."],
      },
    ],
    questions: [
      { id: "mat-1", question: "À moins de 2 milles d'un abri, on parle principalement d'armement :", choices: ["Hauturier", "Basique", "Océanique", "Fluvial"], correct: 1, explanation: "La Division 240 distingue notamment le matériel basique pour la navigation à moins de 2 milles d'un abri." },
      { id: "mat-2", question: "De 2 à 6 milles d'un abri, le matériel est dit :", choices: ["Basique seulement", "Côtier", "Grande plaisance", "Sans catégorie"], correct: 1, explanation: "De 2 à 6 milles, on applique l'armement côtier." },
      { id: "mat-3", question: "Le niveau de performance général d'un EIF de 2 à 6 milles est au moins :", choices: ["25", "50", "100", "300"], correct: 2, explanation: "La règle générale de la Division 240 prévoit 100 pour la zone de 2 à 6 milles." },
      { id: "mat-4", question: "L'armement côtier comprend notamment :", choices: ["Trois feux rouges à main", "Une combinaison de plongée pour chaque bateau", "Un radar obligatoire", "Un pilote automatique obligatoire"], correct: 0, explanation: "Les trois feux rouges à main figurent parmi les compléments côtiers.", image: "/images/materiel-securite.jpg", imageAlt: "Matériel de sécurité côtier." },
      { id: "mat-5", question: "Un gilet de sauvetage doit être choisi principalement selon :", choices: ["La couleur du bateau", "La morphologie et la zone de navigation", "Le prix", "La puissance du moteur uniquement"], correct: 1, explanation: "Il doit être adapté à l'utilisateur et au niveau de performance requis." },
    ],
  },
  {
    id: "permis",
    number: 7,
    title: "Permis, réglementation et documents à bord",
    icon: "📘",
    duration: "35 min",
    cover: "/images/permis-conduite.jpg",
    summary: "Champ du permis côtier, examen, chef de bord et documents du navire comme de la radio.",
    objectives: [
      "Savoir ce que permet l'option côtière (4,5 kW, 6 milles, jour et nuit).",
      "Citer les documents de conduite, du navire et nautiques.",
      "Ne pas confondre révision en ligne et formation réglementaire.",
    ],
    glossary: [
      { term: "Option côtière", meaning: "Conduite en mer jusqu'à 6 milles d'un abri, moteur > 4,5 kW." },
      { term: "Titre de navigation", meaning: "Document d'identité du navire (francisation ou équivalent selon le registre)." },
      { term: "CRR", meaning: "Certificat pour utiliser une VHF du service mobile maritime (règles à vérifier)." },
    ],
    sections: [
      {
        title: "Option côtière",
        definition: "Le permis plaisance option côtière est obligatoire en mer pour un bateau de plaisance à moteur dès que la puissance propulsive dépasse 4,5 kW (6 ch). Il autorise, dans son champ, jour et nuit jusqu'à 6 milles d'un abri.",
        body: [
          "Les limites du bateau (conception, catégorie de conception, charge), la météo, l'armement, les arrêtés locaux et les compétences de l'équipage restent au-dessus du titre. Un permis valide dans un semi-rigide surchargé par force 6 n'est pas une autorisation de partir.",
          "L'extension hauturière est un autre titre, pour aller au-delà de 6 milles. Ne pas « grignoter » 8 milles avec un côtier et un armement côtier : tu sors du cadre.",
        ],
        remember: [
          "Seuil moteur : plus de 4,5 kW.",
          "Côtier = jusqu'à 6 milles d'un abri, jour et nuit.",
        ],
        traps: ["Confondre 6 milles d'un abri et 6 milles de la côte à vol d'oiseau sans abri utilisable."],
        images: [
          { src: "/images/permis-conduite.jpg", alt: "Chef de bord concentré à la barre d'un bateau à moteur en mer.", caption: "Le permis côtier autorise jusqu'à 6 milles d'un abri, de jour comme de nuit, au-delà de 4,5 kW. La décision de partir reste celle du chef de bord." },
        ],
      },
      {
        title: "Examen et formation",
        definition: "L'épreuve théorique officielle : 40 questions, 5 erreurs admises. La formation en établissement agréé reste obligatoire.",
        body: [
          "Première option de base : au moins 5 h de théorie avec formateur. Pratique commune : au minimum 3 h 30 dont 2 h de conduite effective par candidat (repères de l'arrêté, à confirmer dans le texte en vigueur). Ce site prépare le QCM ; il ne délivre rien.",
        ],
        remember: ["40 questions, 5 erreurs max.", "La pratique se valide en établissement agréé."],
      },
      {
        title: "Responsabilité du chef de bord",
        definition: "Il choisit de partir ou non, vérifie bateau, matériel, météo, réglementation, et informe l'équipage.",
        body: [
          "Sobriété, vitesse adaptée, veille, assistance raisonnable à autrui : ce sont des obligations autant que des réflexes. L'assurance ne remplace pas la prudence, mais naviguer sans assurance est un risque juridique et financier majeur — à vérifier selon les obligations du moment.",
        ],
        remember: ["Décision de départ = chef de bord.", "Permis + bateau en règle + conditions acceptables."],
      },
      {
        title: "Documents à bord",
        definition: "On distingue le titre du conducteur, les papiers du navire, les documents radio s'il y a VHF, et les documents nautiques exigés par l'armement.",
        body: [
          "Conducteur : le permis plaisance correspondant à la zone et à la machine. Navire : titre de navigation (acte de francisation ou titre équivalent selon l'immatriculation et la taille). Les formalités exactes dépendent du registre ; en cas de doute, administration et textes officiels.",
          "Radio : si une VHF du service mobile maritime est installée, licence de station et, pour l'utiliser, généralement un CRR (certificat restreint de radiotéléphoniste). Les usages de VHF portable font l'objet de précisions : ne pas inventer une exemption.",
          "Nautiques (surtout armement côtier) : cartes officielles de la zone tenues à jour, RIPAM ou résumé conforme, document de balisage, moyen de connaître marées et coefficients hors Méditerranée. Support papier ou électronique s'ils restent consultables dans les conditions prévues.",
          "Cas concret avant d'appareiller : permis dans la pochette, papiers du bateau, VHF licenciée et CRR si tu l'utilises, cartes de la zone, marée du jour. Un contrôle en mer porte souvent là-dessus autant que sur les gilets.",
        ],
        remember: [
          "Permis du conducteur + titre du navire.",
          "VHF installée : licence + CRR (cas général enseigné).",
          "Côtier : cartes, RIPAM, balisage, marées (hors Méditerranée).",
        ],
        traps: [
          "Croire que le GPS du téléphone remplace à lui seul cartes officielles et RIPAM.",
        ],
        warning: "La liste exacte dépend du navire et des textes en vigueur. Cette leçon prépare l'examen ; elle ne se substitue pas à un contrôle administratif personnalisé.",
      },
    ],
    questions: [
      { id: "per-1", question: "L'examen théorique côtier comporte actuellement :", choices: ["20 questions", "30 questions", "40 questions", "50 questions"], correct: 2, explanation: "Le QCM officiel comporte 40 questions." },
      { id: "per-2", question: "Combien d'erreurs sont admises à l'épreuve théorique ?", choices: ["2", "3", "5", "10"], correct: 2, explanation: "Cinq erreurs sont admises." },
      { id: "per-3", question: "Le permis côtier permet, dans son champ normal, de naviguer jusqu'à :", choices: ["2 milles d'un abri", "6 milles d'un abri", "20 milles d'un abri", "Sans limite"], correct: 1, explanation: "L'option côtière correspond à une navigation jusqu'à 6 milles d'un abri." },
      { id: "per-4", question: "Un site de révision en ligne :", choices: ["Remplace toujours la formation obligatoire", "Ne remplace pas la formation réglementaire", "Délivre automatiquement le permis", "Supprime la pratique"], correct: 1, explanation: "La préparation en ligne est un complément ; elle ne remplace pas le parcours réglementaire." },
      { id: "per-5", question: "Qui décide finalement si les conditions permettent de partir en sécurité ?", choices: ["Le vendeur du bateau", "Le chef de bord", "Le GPS", "La météo seule"], correct: 1, explanation: "Le chef de bord doit prendre la décision en intégrant l'ensemble des paramètres." },
      { id: "per-6", question: "Le permis plaisance devient obligatoire pour un bateau de plaisance à moteur lorsque la puissance propulsive est supérieure à :", choices: ["2 kW", "4,5 kW", "10 kW", "20 kW"], correct: 1, explanation: "Le seuil réglementaire est supérieur à 4,5 kW, soit 6 chevaux." },
      { id: "per-7", question: "Parmi les documents nautiques de l'armement côtier, on trouve notamment :", choices: ["Un contrat de location saisonnière uniquement", "Les cartes marines officielles de la zone tenues à jour", "Un atlas routier", "Un permis voiture"], correct: 1, explanation: "Cartes officielles à jour, RIPAM et document de balisage font partie des exigences côtières enseignées." },
      { id: "per-8", question: "Pour utiliser une VHF marine du service mobile maritime, on exige généralement :", choices: ["Aucun titre", "Un CRR (certificat restreint de radiotéléphoniste)", "Un permis hauturier obligatoire", "Un diplôme de capitaine"], correct: 1, explanation: "Le CRR est le titre radio généralement enseigné pour la VHF, en plus de la licence de station si l'appareil est installé." },
    ],
  },
  {
    id: "vhf",
    number: 8,
    title: "VHF, ASN, SMDSM et sauvetage",
    icon: "📻",
    duration: "45 min",
    cover: "/images/vhf-asn.jpg",
    summary: "Canal 16 et 70, MMSI, ASN, message de détresse, SMDSM zone A1, CROSS et 196.",
    objectives: [
      "Distinguer canal 16 (voix) et canal 70 (ASN seulement).",
      "Structurer un MAYDAY et utiliser DISTRESS à bon escient.",
      "Situer le permis côtier dans le SMDSM (zone A1) et les secours français (CROSS, 196).",
    ],
    glossary: [
      { term: "Canal 16", meaning: "Appel, détresse, urgence, sécurité en phonie." },
      { term: "ASN / DSC", meaning: "Alerte numérique, canal 70, jamais en voix." },
      { term: "SMDSM", meaning: "Système mondial de détresse et de sécurité en mer." },
      { term: "CROSS", meaning: "Centre qui coordonne les secours en mer en France." },
    ],
    sections: [
      {
        title: "Canal 16",
        definition: "Le canal 16 est le canal international d'appel, de détresse, d'urgence et de sécurité en radiotéléphonie. On ne l'encombre pas.",
        body: [
          "Après un contact normal, on bascule vers un canal de travail (port, ship-to-ship autorisé). On écoute avant de parler. On parle lentement, alphabet phonétique pour les indicatifs.",
          "La portée VHF est à peu près optique : quelques milles à quelques dizaines selon antenne, hauteur, relief. Une VHF portable en fond de cockpit porte moins qu'une fixe en tête de mât.",
        ],
        remember: ["16 = voix : appel, détresse, urgence, sécurité.", "On libère le 16 après le premier contact."],
        traps: ["Discuter longuement sur 16 « parce que tout le monde l'écoute »."],
        images: [
          { src: "/images/vhf-asn.jpg", alt: "VHF marine fixe avec combiné, écran et bouton DISTRESS protégé par un capot.", caption: "Canal 16 : appel, détresse, urgence, sécurité en phonie. Canal 70 : réservé à l'ASN, jamais à la voix." },
        ],
      },
      {
        title: "ASN, canal 70 et MMSI",
        definition: "L'ASN (DSC) envoie des alertes numériques. Le canal 70 lui est réservé. Le MMSI identifie la station.",
        body: [
          "Une VHF ASN programmée avec le MMSI du navire et reliée à une position (GPS) transmet identité et position lors d'une alerte DISTRESS. Un MMSI d'un autre bateau, ou pas de MMSI, retarde les secours.",
          "La touche DISTRESS est sous capot, souvent à maintien prolongé, pour éviter les fausses alertes. Une fausse alerte se signale immédiatement aux stations côtières pour l'annuler.",
        ],
        remember: [
          "70 = ASN uniquement, jamais la voix.",
          "MMSI = identité numérique du bateau.",
          "DISTRESS = détresse réelle, puis MAYDAY vocal sur 16 si possible.",
        ],
        traps: ["Appeler en phonie sur le 70. Impossible / interdit : le 70 n'est pas un canal vocal."],
      },
      {
        title: "Message MAYDAY",
        definition: "Alerte courte : MAYDAY trois fois, identité, position, nature, assistance, nombre de personnes, intentions.",
        body: [
          "Exemple de structure : « MAYDAY MAYDAY MAYDAY, ici [nom / indicatif], MAYDAY [nom], position [lat/long ou relèvement-distance d'un amer], [nature], [besoin], [N personnes], [infos : radeau, blessés], à vous. » On reste à l'écoute. Si l'ASN a été envoyé, on complète en voix.",
          "Si tu n'as plus la VHF du bord : portable, téléphone 196 en France, fusées. Le CROSS a besoin d'une position, même approximative (amer, plage, GPS du téléphone).",
        ],
        remember: ["Position + nature + personnes = le trio vital.", "Rester à l'écoute après l'appel."],
      },
      {
        title: "SMDSM et sauvetage en mer (niveau permis)",
        definition: "Le SMDSM (GMDSS) organise l'alerte et la diffusion de sécurité à l'échelle mondiale. Le côtier se situe typiquement en zone A1 : couverture VHF ASN des stations côtières.",
        body: [
          "Zones (repères) : A1 = VHF ASN ; A2 = BLU/MF ASN au-delà ; A3 = satellitaire hors pôles ; A4 = pôles. Tu n'as pas à devenir radio-officier : retiens que tes 6 milles d'un abri relèvent de la logique côtière VHF, d'où l'intérêt d'une VHF ASN bien réglée.",
          "En France, le CROSS (Gris-Nez, Jobourg, Corsen, Étel, La Garde, Antilles-Guyane, etc.) coordonne. Il déclenche SNSM, moyens d'État, navires sur zone. Le 196 est le numéro d'urgence mer depuis un mobile. Le 112 reste un secours terrestre ; en mer, 196 + VHF 16 sont les bons réflexes.",
          "Moyens que tu peux rencontrer : VHF phonie, ASN, RLS/EPIRB (radiobalise, surtout au-delà du côtier), SART, NAVTEX pour les infos de sécurité. Au permis : connaître le principe (alerter vite, se faire localiser, écouter) plutôt que le détail technique de chaque boîte.",
          "Cas concret : voie d'eau à 3 milles. DISTRESS si VHF ASN, MAYDAY 16, gilets, pomper, préparer un moyen de flottabilité, donner une position claire. Ne pas quitter le bateau tant qu'il flotte, sauf s'il devient plus dangereux que l'eau.",
        ],
        remember: [
          "Côtier ≈ zone A1 : VHF / ASN.",
          "CROSS + canal 16 + 196 (France).",
          "Fausse alerte : l'annuler tout de suite.",
        ],
        traps: [
          "Appeler le 15 ou le 18 en premier depuis la mer alors qu'une VHF 16 est à portée : tu perds du temps ; le CROSS est l'interlocuteur mer.",
        ],
        terms: [
          { term: "SMDSM", meaning: "Système mondial de détresse et de sécurité en mer." },
          { term: "Zone A1", meaning: "Couverture d'au moins une station côtière VHF à ASN." },
          { term: "RLS", meaning: "Radiobalise de localisation des sinistres (EPIRB)." },
        ],
      },
      {
        title: "Alphabet phonétique",
        definition: "Alfa, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.",
        body: [
          "On épelle indicatif, MMSI par groupes, nom difficile, lettre d'une marque. B = Bravo, pas Baker. A = Alfa (un F).",
        ],
        remember: ["B = Bravo.", "On épelle dès qu'il y a un risque de confusion."],
      },
    ],
    questions: [
      { id: "vhf-1", question: "Le canal VHF 16 sert principalement :", choices: ["Aux conversations privées", "À l'appel, la détresse, l'urgence et la sécurité", "À l'ASN uniquement", "À la météo satellite"], correct: 1, explanation: "Le 16 est le canal vocal international de sécurité et d'appel.", image: "/images/vhf-asn.jpg", imageAlt: "Poste VHF marine." },
      { id: "vhf-2", question: "Le canal 70 est réservé :", choices: ["À la voix", "À l'ASN", "Aux ports de plaisance", "Aux bulletins météo uniquement"], correct: 1, explanation: "Le canal 70 est réservé aux appels numériques ASN/DSC." },
      { id: "vhf-3", question: "Le MMSI est :", choices: ["Une vitesse maximale", "Un identifiant numérique de station maritime", "Une carte marine", "Un type de gilet"], correct: 1, explanation: "Le MMSI identifie la station dans les systèmes numériques maritimes." },
      { id: "vhf-4", question: "Dans un MAYDAY, il faut notamment donner :", choices: ["La position", "Le prix du bateau", "La marque du moteur uniquement", "Son permis de conduire routier"], correct: 0, explanation: "La position est une information essentielle pour permettre l'intervention." },
      { id: "vhf-5", question: "La lettre B s'épelle en alphabet phonétique :", choices: ["Beta", "Bravo", "Baker", "Berlin"], correct: 1, explanation: "B = Bravo." },
      { id: "vhf-6", question: "Le SMDSM, au niveau du permis côtier, se rattache surtout à la zone :", choices: ["A4 polaire", "A1, couverture VHF ASN", "Uniquement satellitaire", "Aucune zone"], correct: 1, explanation: "Les 6 milles d'un abri relèvent de la logique côtière A1 (stations VHF à ASN)." },
      { id: "vhf-7", question: "En France, le numéro d'urgence maritime depuis un mobile est :", choices: ["15 uniquement", "196", "3617", "08 bateau"], correct: 1, explanation: "Le 196 joint les secours mer. Il complète la VHF canal 16, il ne la remplace pas si elle est disponible." },
    ],
  },
  {
    id: "meteo",
    number: 9,
    title: "Météorologie marine",
    icon: "🌦️",
    duration: "40 min",
    cover: "/images/meteo-beaufort.jpg",
    summary: "Bulletin marin, Beaufort, rafales, état de mer et décision de partir.",
    objectives: [
      "Lire un bulletin marin jusqu'au bout (vent, rafales, mer, visibilité, avis).",
      "Relier une force Beaufort à l'aspect de la mer.",
      "Reporter une sortie si ça dépasse bateau ou équipage.",
    ],
    glossary: [
      { term: "Beaufort", meaning: "Échelle 0 à 12 de la force du vent et de ses effets." },
      { term: "Rafale", meaning: "Pic de vent au-dessus du vent moyen." },
      { term: "Houle", meaning: "Ondes souvent nées ailleurs, plus longues que la mer du vent." },
    ],
    sections: [
      {
        title: "Préparer la météo",
        definition: "On consulte une source marine adaptée à la zone et à l'horaire, puis on compare avec le ciel, le vent et la mer réels.",
        body: [
          "Un bulletin se lit en entier : situation, prévisions horaires, avis, vent moyen, rafales, direction, état de mer, visibilité, orages. Un pictogramme d'appli grand public ne suffit pas.",
          "On regarde l'évolution : un 3 Beaufort le matin peut être un 6 l'après-midi (brise thermique, front). On prévoit une heure de rentrée avec marge.",
        ],
        remember: ["Source marine + observation réelle.", "Lire rafales et avis, pas seulement le vent moyen."],
        traps: ["Partir parce que « ça a l'air calme dans le port » alors que le cap est déjà blanc dehors."],
      },
      {
        title: "Échelle de Beaufort",
        definition: "De 0 (calme) à 12 (ouragan). Pour le permis : relier la force à l'ordre de grandeur du vent et à l'aspect de la mer.",
        body: [
          "Repères : 0 calme ; 3 petite brise (crêtes commencent) ; 4 jolie brise ; 5 bonne brise (moutons nombreux) ; 6 vent frais (lames, écume fréquente) ; 7 grand frais ; 8 coup de vent. Au-delà, la petite plaisance n'a plus rien à faire dehors.",
          "Les petits semi-rigides et annexes souffrent dès 4–5 selon l'exposition. Force 6 n'est pas « encore bon » pour un premier permis.",
        ],
        remember: [
          "4 = jolie brise, 5 = bonne brise, 6 = vent frais, 8 = coup de vent.",
          "Ce n'est pas parce que c'est « que du 4 » que c'est bon pour tout le monde.",
        ],
        traps: ["Confondre Beaufort (vent) et échelle de mer (Douglas) ou le coefficient de marée."],
        images: [
          { src: "/images/meteo-beaufort.jpg", alt: "Mer formée avec crêtes d'écume fréquentes, typique d'un vent frais autour de force 6 Beaufort.", caption: "Force 6, vent frais : lames importantes, crêtes d'écume fréquentes. Souvent trop pour une petite unité de plaisance." },
        ],
      },
      {
        title: "Vent moyen, rafales et effets côtiers",
        definition: "Les rafales dépassent le vent moyen et gîtent, déstabilisent, font embarquer de l'eau. Le relief accélère ou dévie le vent.",
        body: [
          "Un bulletin « 15 nœuds, rafales 25 » se gère sur les 25. Brise thermique, accélération aux caps, rabattantes sous une falaise, vents canalisés dans une ria : la côte n'est pas un champ uniforme.",
        ],
        remember: ["On dimensionne la sortie sur les rafales et l'exposition, pas sur le vent moyen du port."],
      },
      {
        title: "État de la mer",
        definition: "Hauteur, période et direction comptent autant que le vent. Vent contre courant = mer plus dure.",
        body: [
          "Près d'un haut-fond, d'une barre, d'une passe, d'un cap : la mer se dresse. Une houle longue de 1 m peut être tenable ; 1 m court contre jusant peut être dangereux pour un petit bateau.",
        ],
        remember: ["Vent contre courant = mer plus mauvaise.", "Les hauts-fonds et passes changent tout."],
      },
      {
        title: "Décision de départ",
        definition: "La question n'est pas « est-ce légal ? » mais « est-ce raisonnable pour ce bateau, cet équipage, cette route, avec une marge et un repli ? »",
        body: [
          "Si ça se dégrade, on rentre tôt. Reporter n'est pas un échec, c'est le métier de chef de bord. Prévoir un abri alternatif, du carburant, un horaire de marée pour rentrer.",
        ],
        remember: ["Marge + solution de repli.", "Le permis n'oblige jamais à partir."],
      },
    ],
    questions: [
      { id: "met-1", question: "L'échelle de Beaufort décrit principalement :", choices: ["La profondeur", "La force du vent", "La marée", "La visibilité uniquement"], correct: 1, explanation: "Beaufort classe la force du vent selon ses effets et sa vitesse.", image: "/images/meteo-beaufort.jpg", imageAlt: "Mer formée force 6." },
      { id: "met-2", question: "Force 0 Beaufort correspond à :", choices: ["Calme", "Grand frais", "Tempête", "Jolie brise"], correct: 0, explanation: "0 Beaufort = calme." },
      { id: "met-3", question: "Avant une sortie, il faut :", choices: ["Consulter uniquement une appli non marine", "Lire un bulletin marin et observer les conditions", "Se fier à la veille", "Ignorer les rafales"], correct: 1, explanation: "Il faut croiser prévision marine et observation réelle." },
      { id: "met-4", question: "Une mer peut devenir plus forte près d'un cap ou d'un haut-fond :", choices: ["Vrai", "Faux", "Seulement de nuit", "Seulement sans vent"], correct: 0, explanation: "Relief, courant, profondeur et vent peuvent amplifier localement l'état de mer." },
      { id: "met-5", question: "Si la météo dépasse les capacités de l'équipage :", choices: ["On part quand même avec le permis", "On reporte ou adapte la sortie", "On accélère", "On coupe la VHF"], correct: 1, explanation: "La décision doit rester adaptée aux capacités réelles." },
    ],
  },
  {
    id: "carte-maree",
    number: 10,
    title: "Carte marine et marées",
    icon: "🗺️",
    duration: "40 min",
    cover: "/images/carte-maree.jpg",
    summary: "Sondes, zéro hydrographique, milles, marnage, coefficient et marge sous la quille.",
    objectives: [
      "Lire une sonde par rapport au zéro hydrographique, pas au niveau du moment.",
      "Mesurer les distances sur l'échelle des latitudes (1' = 1 mille).",
      "Relier coefficient, marnage, courants et marge de sécurité.",
    ],
    glossary: [
      { term: "Zéro hydrographique", meaning: "Référence des sondes, proche des plus basses mers astronomiques." },
      { term: "Marnage", meaning: "Différence de hauteur entre une pleine mer et une basse mer successives." },
      { term: "Coefficient", meaning: "Indice français de l'amplitude relative (vives-eaux / mortes-eaux)." },
    ],
    sections: [
      {
        title: "Carte marine",
        definition: "La carte marine décrit profondeurs, dangers, balises, phares, zones réglementées et nature des fonds. Elle doit couvrir la zone et être tenue à jour.",
        body: [
          "Une carte périmée peut omettre une nouvelle balise, un éolien, un chenal déplacé. Les Corrections aux cartes et les avis aux navigateurs existent pour ça. L'appli du dimanche n'est pas automatiquement une carte officielle au sens de la Division 240.",
          "On identifie l'unité des sondes (mètres en France), le zéro, les symboles (rocher, épave, haut-fond, câble). En cas de doute sur un symbole : document de symboles SHOM / INT 1.",
        ],
        remember: ["Carte de la zone, officielle, à jour.", "Sondes en mètres par rapport au zéro hydrographique."],
        traps: ["Lire une sonde « 2 » comme 2 m sous la quille maintenant."],
        images: [
          { src: "/images/carte-maree.jpg", alt: "Carte marine papier, compas et table des marées sur une table à cartes.", caption: "Carte adaptée à la zone, tenue à jour. Les sondes se lisent par rapport au zéro hydrographique, pas au niveau du moment." },
        ],
      },
      {
        title: "Latitude et longitude",
        definition: "Latitude = nord-sud (équateur). Longitude = est-ouest (Greenwich). Les distances se mesurent sur l'échelle des latitudes.",
        body: [
          "Une minute de latitude = 1 mille marin (1 852 m). Les minutes de longitude ne valent un mille qu'à l'équateur ; aux latitudes françaises elles sont plus courtes. D'où la règle : compas de relèvement / règle, on reporte sur le côté gauche ou droit de la carte (latitude).",
        ],
        remember: ["1' de latitude = 1 mille.", "On ne mesure pas les milles sur l'échelle des longitudes."],
        traps: ["Mesurer un trajet sur le haut ou le bas de la carte (longitudes)."],
      },
      {
        title: "Zéro hydrographique et hauteur d'eau",
        definition: "La sonde est comptée depuis le zéro hydrographique jusqu'au fond. La hauteur d'eau du moment s'ajoute (en restant prudent sur le type de sonde).",
        body: [
          "Ordre de grandeur enseigné : profondeur ≈ sonde + hauteur de marée. Si la sonde est 1,2 m et la marée 4,0 m, tu as environ 5,2 m d'eau, avant houle, assiette et incertitude. Une sonde soulignée / asséchante peut découvrir à basse mer.",
          "Le tirant d'eau du bateau + une marge (houle, squat, vase, pression, erreur) doit rester inférieur à cette profondeur. Viser « pile le tirant d'eau » est un classique d'échouement d'examen… et de réel.",
        ],
        remember: [
          "Sonde + hauteur de marée ≈ eau du moment (principe).",
          "Toujours une marge sous la quille.",
        ],
        traps: ["Oublier que par coefficient fort, les basses mers sont plus basses (moins d'eau à BM)."],
        plate: "tide-levels",
      },
      {
        title: "Marée, courant, coefficient et marnage",
        definition: "Le marnage est l'amplitude entre une PM et une BM successives. Le coefficient (France) indique si on est plutôt en vives-eaux ou mortes-eaux.",
        body: [
          "Vives-eaux (coefficients élevés, souvent près de 95 et plus) : PM plus hautes, BM plus basses, courants souvent plus forts. Mortes-eaux (autour de 45) : faible amplitude. En Méditerranée, le phénomène est faible : le document de marée n'est pas exigé dans le basique de la même façon.",
          "Flot = courant de marée montante, jusant = descendante. Vent contre courant dresse la mer, surtout dans une passe. L'étale de marée (niveau) et l'étale de courant ne coïncident pas toujours.",
        ],
        remember: [
          "Marnage = PM − BM.",
          "Coefficient élevé ≠ « plus d'eau en permanence ».",
          "Vent contre courant = mer plus dure.",
        ],
        traps: ["Croire qu'un coefficient 110 garantit de l'eau partout, y compris à basse mer."],
      },
      {
        title: "Marge de sécurité",
        definition: "On ne vise jamais une profondeur théorique égale au tirant d'eau.",
        body: [
          "Houle, vague, assiette au moteur, sonde ancienne, vase, pression atmosphérique basse (surcote inverse parfois), erreur de lecture : tout mange de la marge. Dans une passe, on passe plutôt près de la pleine mer si le fond est juste.",
        ],
        remember: ["Marge sous la quille = non négociable.", "Passe juste = plutôt près de PM, sans se jeter dans un courant ingérable."],
      },
    ],
    questions: [
      { id: "car-1", question: "Une minute de latitude correspond à environ :", choices: ["1 mètre", "1 kilomètre", "1 mille marin", "10 milles"], correct: 2, explanation: "C'est le repère classique utilisé pour mesurer les distances sur une carte marine." },
      { id: "car-2", question: "Le marnage est :", choices: ["La vitesse du courant", "La différence de hauteur entre pleine et basse mer", "La longueur du bateau", "Le vent moyen"], correct: 1, explanation: "Le marnage exprime l'amplitude verticale de la marée entre deux niveaux successifs." },
      { id: "car-3", question: "Une carte marine doit être :", choices: ["Décorative", "Adaptée à la zone et tenue à jour", "Toujours ancienne", "Utilisée uniquement de nuit"], correct: 1, explanation: "Une carte obsolète peut omettre un nouveau balisage ou une nouvelle réglementation.", image: "/images/carte-maree.jpg", imageAlt: "Carte marine et documents de marée." },
      { id: "car-4", question: "La marée peut modifier :", choices: ["La hauteur d'eau et les courants", "Seulement la couleur de l'eau", "La puissance moteur", "La VHF"], correct: 0, explanation: "Elle agit sur le niveau d'eau et génère des courants." },
      { id: "car-5", question: "Pour passer sur un haut-fond, il est prudent de :", choices: ["Prendre zéro marge", "Conserver une marge sous la quille", "Couper le sondeur", "Accélérer au maximum"], correct: 1, explanation: "Une marge de sécurité tient compte des incertitudes et mouvements du bateau." },
      { id: "car-6", question: "Une sonde lue sur la carte est comptée depuis :", choices: ["La flottaison du moment", "Le zéro hydrographique", "Le niveau de pleine mer", "Le pont du bateau"], correct: 1, explanation: "Les sondes se rapportent au zéro hydrographique, pas à la hauteur d'eau actuelle." },
      { id: "car-7", question: "Un coefficient de marée élevé signifie surtout :", choices: ["Qu'il y a plus d'eau même à basse mer", "Une plus grande amplitude (PM plus hautes, BM souvent plus basses)", "L'absence de courant", "Un vent force 8"], correct: 1, explanation: "Les vives-eaux augmentent le marnage : plus haut à PM, souvent moins d'eau à BM." },
    ],
  },
  {
    id: "carburant",
    number: 11,
    title: "Autonomie et carburant",
    icon: "⛽",
    duration: "25 min",
    cover: "/images/carburant-port.jpg",
    summary: "Consommation réelle, calcul simple, réserve et conduite en cas de panne.",
    objectives: [
      "Calculer une consommation horaire et n'utiliser jamais 100 % du réservoir.",
      "Intégrer mer, vent, courant et détours.",
      "Savoir quoi faire si le moteur s'arrête près d'un danger.",
    ],
    glossary: [
      { term: "Consommation horaire", meaning: "Litres par heure à un régime donné, à affiner selon mer et charge." },
      { term: "Réserve", meaning: "Carburant non planifié, pour imprévu, attente et dégradation." },
    ],
    sections: [
      {
        title: "Consommation réelle",
        definition: "La conso dépend du régime, de la charge, de la coque, de la mer, du vent et du courant. Les valeurs constructeur ne sont qu'un point de départ.",
        body: [
          "Coque sale, 4 personnes, mer formée, vent contraire : la conso s'envole. Le retour n'est jamais « le même trajet à l'envers ». Un courant de 2 nœuds sur un bateau qui file 6 nœuds change le temps de trajet de façon brutale.",
        ],
        remember: ["Aller ≠ retour.", "Mer, vent, courant, charge : tout compte."],
        traps: ["Se fier à la seule jauge, souvent imprécise sur petite unité."],
        images: [
          { src: "/images/carburant-port.jpg", alt: "Ravitaillement en carburant d'un bateau à un ponton de port de plaisance.", caption: "La consommation réelle dépend du régime, de la charge, de la mer, du vent et du courant. Toujours garder une réserve." },
        ],
      },
      {
        title: "Calcul simple",
        definition: "Litres nécessaires ≈ conso horaire × temps moteur, puis on ajoute une réserve large.",
        body: [
          "20 L/h × 2 h = 40 L théoriques. Ajoute attente au port, recherche de mouillage, déroutement, ralenti. Un ordre de grandeur de réserve souvent enseigné est d'éviter de planifier au-delà d'une fraction confortable du réservoir (beaucoup de marins gardent 20 à 30 % ou plus selon l'isolement). Ce n'est pas un chiffre réglementaire unique : c'est de la prudence.",
        ],
        remember: ["Temps × litres/heure, puis réserve.", "Prévoir le pire retour, pas le meilleur."],
      },
      {
        title: "Réserve",
        definition: "On ne planifie jamais une navigation sur 100 % du carburant embarqué.",
        body: [
          "Plus la côte est inhospitalière, la météo douteuse ou le moteur gourmand, plus la marge doit être large. Un jerrican bien arrimé et compatible n'est pas un luxe ; un jerrican qui fuit dans le cockpit est un incendie en puissance.",
        ],
        remember: ["100 % du réservoir = plan faux.", "Zone isolée = plus de marge."],
      },
      {
        title: "Panne sèche",
        definition: "Perte de propulsion près d'un danger : sécuriser les gens, évaluer la dérive, mouiller si utile, alerter avant que ça devienne une détresse.",
        body: [
          "Gilets, éloignement d'une côte sous le vent, ancre si fond et abri le permettent, PAN PAN ou MAYDAY selon le danger. Une panne au large par beau temps n'est pas la même chose qu'une panne sous une falaise avec jusant.",
        ],
        remember: ["Dérive d'abord, ego ensuite.", "Alerter tôt, pas quand tu es dans les rochers."],
        traps: ["Attendre d'être sur le danger pour appeler, « pour ne pas déranger »."],
      },
    ],
    questions: [
      { id: "fuel-1", question: "Un moteur consomme 15 L/h pendant 3 h. Consommation théorique :", choices: ["15 L", "30 L", "45 L", "60 L"], correct: 2, explanation: "15 × 3 = 45 litres, avant ajout de la réserve." },
      { id: "fuel-2", question: "Une bonne planification consiste à :", choices: ["Utiliser 100 % du réservoir", "Prévoir une réserve", "Ignorer le retour", "Se fier uniquement à la jauge"], correct: 1, explanation: "Une réserve permet d'absorber les imprévus." },
      { id: "fuel-3", question: "La consommation peut augmenter avec :", choices: ["Une mer formée", "Un fort vent contraire", "Une coque sale", "Toutes ces réponses"], correct: 3, explanation: "Tous ces facteurs peuvent augmenter la consommation." },
      { id: "fuel-4", question: "Le trajet retour consommera forcément autant que l'aller :", choices: ["Vrai", "Faux", "Seulement avec GPS", "Seulement à marée haute"], correct: 1, explanation: "Vent, courant et mer peuvent changer." },
      { id: "fuel-5", question: "En cas de panne moteur près d'un danger, il faut d'abord :", choices: ["Attendre sans rien faire", "Évaluer la dérive et sécuriser la situation", "Se jeter à l'eau", "Éteindre tous les moyens de communication"], correct: 1, explanation: "Il faut empêcher la situation de se transformer en accident grave." },
    ],
  },
  {
    id: "environnement",
    number: 12,
    title: "Environnement et pêche de loisir",
    icon: "🐟",
    duration: "30 min",
    cover: "/images/environnement-dechets.jpg",
    summary: "Rejets, zones protégées, pêche de loisir (pas de vente) et pêche sous-marine.",
    objectives: [
      "Garder les déchets à bord et éviter toute pollution d'hydrocarbures.",
      "Savoir que la pêche de loisir n'est pas commercialisable.",
      "Vérifier tailles, zones et signalisation avant de pêcher.",
    ],
    glossary: [
      { term: "Pêche de loisir", meaning: "Pour la consommation familiale ; vente interdite." },
      { term: "Zone marine protégée", meaning: "Secteur à règles particulières, à lire avant d'entrer." },
    ],
    sections: [
      {
        title: "Rejets et déchets",
        definition: "Les déchets, hydrocarbures et substances polluantes ne se jettent pas à la mer. On les ramène à terre dans les filières prévues.",
        body: [
          "Un plein soigneux, un absorbant, pas de « petit débordement ». Une nappe d'essence est un délit et un incendie. Les plastiques tuent la faune ; le « ça se dilue » est un piège d'examen autant qu'un faux confort.",
        ],
        remember: ["Déchets = à terre.", "Zéro hydrocarbure à l'eau."],
        traps: ["Jeter un mégot ou un nylon « biodégradable » au large."],
        images: [
          { src: "/images/environnement-dechets.jpg", alt: "Équipier ramassant des déchets plastiques à bord au lieu de les jeter à la mer.", caption: "Les déchets restent à bord et se déposent à terre. Aucun rejet d'hydrocarbures." },
        ],
      },
      {
        title: "Eaux usées et équipements sanitaires",
        definition: "Les navires habitables et leurs sanitaires sont soumis à des règles destinées à limiter les rejets. On respecte cuves, distances et interdictions locales.",
        body: [
          "Dans un port, une calanque, une zone de baignade : on n'évacue pas. Les textes précisent distances et équipements ; l'esprit à retenir au permis : on ne pollue pas le littoral.",
        ],
        remember: ["Port et baignade : pas de rejet d'eaux usées."],
      },
      {
        title: "Antifouling et entretien",
        definition: "Peintures et résidus d'entretien ne vont pas dans l'eau. Ponçage et carénage se font dans des aires prévues.",
        body: [
          "Un carénage sauvage sur la plage disperse des biocides. C'est contraire à l'esprit du programme environnement, et souvent à la police des ports.",
        ],
        remember: ["Caréner dans les filières prévues.", "Pas de résidus dans le milieu."],
      },
      {
        title: "Pêche de loisir",
        definition: "La pêche de loisir nourrit le pêcheur et sa famille dans le cadre réglementaire. La vente du produit est interdite.",
        body: [
          "Tailles minimales, quotas, repos biologiques, engins autorisés, marquage de certaines espèces, cantonnements : tout varie. On vérifie avant, on ne « fait comme le voisin ». Une zone Natura 2000 ou un cantonnement peut interdire jusqu'à la pêche à la ligne.",
        ],
        remember: ["Vente interdite.", "Tailles et zones = à jour, locales."],
        traps: ["Pêcher dans un chenal ou une zone de baignade « parce que ça mord »."],
      },
      {
        title: "Pêche sous-marine",
        definition: "Règles spécifiques : signalisation, distances, âge, zones, sécurité vis-à-vis des bateaux et des autres usagers.",
        body: [
          "Un chasseur non signalé près d'un chenal est un danger mutuel. Pavillon, distance aux navires, pas de chasse dans les zones interdites. Le chef de bord qui approche un plongeur applique la même prudence qu'avec un pavillon Alpha.",
        ],
        remember: ["Signaler la plongée / chasse.", "Jamais au milieu du trafic."],
      },
    ],
    questions: [
      { id: "env-1", question: "Le produit de la pêche maritime de loisir peut être vendu :", choices: ["Oui librement", "Non", "Seulement le week-end", "Seulement au port"], correct: 1, explanation: "La pêche de loisir n'a pas vocation à être commercialisée." },
      { id: "env-2", question: "Les déchets à bord doivent en principe :", choices: ["Être jetés au large", "Être conservés et déposés à terre", "Être brûlés sur le bateau", "Être cachés dans le mouillage"], correct: 1, explanation: "La prévention de la pollution impose de gérer les déchets à terre selon les filières prévues.", image: "/images/environnement-dechets.jpg", imageAlt: "Déchets conservés à bord." },
      { id: "env-3", question: "Les règles de taille ou quota des captures :", choices: ["Ne changent jamais", "Peuvent varier selon espèce, zone et période", "N'existent pas", "Concernent seulement les professionnels"], correct: 1, explanation: "Il faut vérifier la réglementation locale et à jour." },
      { id: "env-4", question: "Un antifouling doit être manipulé :", choices: ["Sans précaution", "En évitant la dispersion de résidus", "Directement dans l'eau", "Uniquement de nuit"], correct: 1, explanation: "Les produits et résidus peuvent être nocifs pour le milieu marin." },
      { id: "env-5", question: "Une zone marine protégée peut avoir :", choices: ["Des règles particulières", "Aucune règle", "Uniquement des règles pour les voiliers", "Toujours une navigation interdite"], correct: 0, explanation: "Les restrictions dépendent de la zone ; il faut les consulter." },
    ],
  },
  {
    id: "tractes-ecluses",
    number: 13,
    title: "Engins tractés, ski nautique et écluses",
    icon: "🏄",
    duration: "30 min",
    cover: "/images/ski-tracte.jpg",
    summary: "Zones autorisées, veille du pratiquant, hélice, et passage d'écluse sans se coincer une aussière.",
    objectives: [
      "Ne skier que dans les zones et horaires autorisés, hors baignade.",
      "Séparer conduite et surveillance du pratiquant.",
      "Préparer aussières et pare-battages avant le sas, accompagner le niveau.",
    ],
    glossary: [
      { term: "Aussière", meaning: "Amarre ; en écluse elle doit pouvoir filer avec le niveau." },
      { term: "Pare-battage", meaning: "Protection entre coque et ouvrage, à sortir avant d'entrer." },
    ],
    sections: [
      {
        title: "Ski nautique et engins tractés",
        definition: "L'activité n'est licite que dans les zones, sens et horaires prévus. Le conducteur conduit ; une autre personne surveille le pratiquant selon les règles applicables.",
        body: [
          "Pas dans les 300 m / zones de baignade, pas dans un chenal commercial, pas au milieu des kayaks. Pictogrammes et arrêtés locaux tranchent. Gilet du pratiquant, bout adapté, coupure circuit, briefing des signes (OK, stop, rentrer).",
          "Cas concret : un pictogramme « ski interdit » sur la plage + bouées jaunes = tu vas plus loin, dans le secteur autorisé, ou tu ne skis pas.",
        ],
        remember: [
          "Zone autorisée d'abord, plaisir ensuite.",
          "Le pilote ne peut pas à la fois bien conduire et bien voir le skieur : d'où l'observateur.",
        ],
        traps: ["Skier dans le chenal traversier « parce qu'il est vide »."],
        images: [
          { src: "/images/ski-tracte.jpg", alt: "Skieur nautique tracté derrière un bateau, avec un observateur à bord.", caption: "Le conducteur conduit. Une autre personne surveille le pratiquant. Rester dans les zones autorisées." },
          { src: "/images/picto-ski-interdit.jpg", alt: "Pictogramme de plage : skieur nautique barré d'une bande rouge.", caption: "Pictogramme ski interdit + bouées jaunes : tu vas plus loin, dans le secteur autorisé, ou tu ne skis pas." },
        ],
      },
      {
        title: "Chute du pratiquant",
        definition: "On ralentit, on revient en évitant l'hélice et le bout, on garde le pratiquant en vue.",
        body: [
          "Moteur au point mort à l'approche, voire coupé pour récupérer à l'arrière selon la configuration. Un bout dans l'hélice + une personne à l'eau = urgence. Signaler la personne aux autres navires (bras, gilet voyant).",
        ],
        remember: ["Hélice = danger n°1 à la récupération.", "Ne jamais perdre le pratiquant des yeux."],
      },
      {
        title: "Approche d'une écluse",
        definition: "On ralentit, on lit les feux / l'éclusier, on n'entre pas sans autorisation, on prépare aussières et pare-battages avant le sas.",
        body: [
          "File d'attente, pas de dépassement dans le goulet. Moteur prêt à manœuvrer, équipage briefé : qui tient quelle aussière, personne avec une boucle autour du poignet. Les écluses de plaisance ont souvent un feu rouge/vert analogue à une route : rouge = on attend.",
        ],
        remember: ["Préparer avant d'entrer.", "Pas d'amarre autour d'un membre."],
        traps: ["Entrer « vite fait » pendant que les portes ferment."],
        images: [
          { src: "/images/ecluse.jpg", alt: "Petit bateau à moteur entrant dans une écluse, pare-battages sortis, aussières prêtes.", caption: "Avant d'entrer : ralentir, observer la signalisation, préparer aussières et pare-battages." },
        ],
      },
      {
        title: "Dans le sas",
        definition: "On tient le bateau en laissant les aussières accompagner la montée ou la descente. On ne quitte pas avant le signal.",
        body: [
          "Une aussière bloquée sur un taquet pendant que le plan d'eau baisse pend le bateau ou casse le taquet. Une aussière trop molle laisse percuter. Mains et pieds à l'intérieur. Hélice au ralenti, attention aux remous d'ouverture des portes.",
        ],
        remember: ["L'eau monte ou descend : l'amarre doit pouvoir filer.", "On sort seulement quand c'est autorisé."],
        traps: ["Sauter sur le quai sans amarre tenue, ou passer une boucle au bras « pour tenir »."],
      },
    ],
    questions: [
      { id: "tra-1", question: "Pendant une activité tractée, le conducteur doit :", choices: ["Regarder uniquement le pratiquant", "Rester concentré sur la conduite et organiser une surveillance adaptée", "Naviguer dans les zones de baignade", "Couper tout moyen de communication"], correct: 1, explanation: "La conduite et la surveillance du pratiquant doivent toutes deux être assurées correctement.", image: "/images/ski-tracte.jpg", imageAlt: "Ski nautique." },
      { id: "tra-2", question: "Pour récupérer un skieur tombé, il faut :", choices: ["Approcher vite par l'arrière", "Revenir prudemment en maîtrisant le risque lié à l'hélice", "Lancer l'ancre sur lui", "Accélérer avant contact"], correct: 1, explanation: "Le principal danger lors de la récupération est notamment la proximité de l'hélice et du bateau." },
      { id: "tra-3", question: "Avant d'entrer dans une écluse :", choices: ["On prépare aussières et pare-battages", "On accélère", "On descend tous les passagers à l'eau", "On ignore la signalisation"], correct: 0, explanation: "La préparation en amont évite les manœuvres précipitées dans le sas.", image: "/images/ecluse.jpg", imageAlt: "Bateau à l'entrée d'une écluse." },
      { id: "tra-4", question: "Dans une écluse, une aussière doit :", choices: ["Pouvoir accompagner les variations de niveau", "Toujours être bloquée définitivement", "Être attachée autour du poignet", "Être jetée à l'eau"], correct: 0, explanation: "Le niveau change : une aussière bloquée peut mettre le bateau en danger." },
      { id: "tra-5", question: "Les activités tractées :", choices: ["Sont autorisées partout", "Peuvent être soumises à des règles locales", "N'ont aucune règle de sécurité", "Sont toujours interdites à moins de 6 milles"], correct: 1, explanation: "Les arrêtés locaux et le balisage peuvent imposer des règles spécifiques." },
    ],
  },
];

export const allQuestions = chapters.flatMap((chapter) =>
  chapter.questions.map((question) => ({ ...question, chapterId: chapter.id, chapterTitle: chapter.title }))
);

export const officialProgram = [
  "Balisage des côtes, plages et pictogrammes",
  "Initiation au système de balisage région B",
  "Règles de barre et de route",
  "Signaux sonores, détresse, trafic portuaire et météo",
  "Feux et marques des navires",
  "Navigation, sécurité, matériel, limitations et documents",
  "Réglementation du titre de conduite",
  "VHF, MMSI, ASN, SMDSM et sauvetage en mer",
  "Ski nautique et engins tractés",
  "Responsabilité du chef de bord",
  "Autonomie carburant",
  "Protection de l'environnement et pêche de loisir",
  "Météorologie et échelle de Beaufort",
  "Lecture élémentaire de carte marine et marées",
  "Utilisation des écluses",
];
