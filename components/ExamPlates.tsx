type PlateProps = { caption?: string };

function Boat({ x, y, rot = 0, color = "#dfe8ee" }: { x: number; y: number; rot?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <polygon points="0,-26 14,18 0,12 -14,18" fill={color} stroke="#0b2730" strokeWidth="1.6" />
    </g>
  );
}

export function CollisionHeadOn({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 520 240" role="img" aria-label="Deux navires à moteur face à face : chacun vient sur tribord pour se croiser bâbord sur bâbord.">
        <rect width="520" height="240" rx="16" fill="#0e3a46" />
        <path d="M40 120 C 140 70, 220 70, 260 120" fill="none" stroke="#7ec8c3" strokeWidth="3" strokeDasharray="7 6" />
        <path d="M480 120 C 380 170, 300 170, 260 120" fill="none" stroke="#7ec8c3" strokeWidth="3" strokeDasharray="7 6" />
        <Boat x={120} y={118} rot={90} />
        <Boat x={400} y={122} rot={-90} />
        <path d="M148 132 C 190 168, 230 168, 250 140" fill="none" stroke="#e9523d" strokeWidth="3" markerEnd="url(#arrow-a)" />
        <path d="M372 108 C 330 72, 290 72, 270 100" fill="none" stroke="#e9523d" strokeWidth="3" markerEnd="url(#arrow-a)" />
        <defs>
          <marker id="arrow-a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="#e9523d" />
          </marker>
        </defs>
        <text x="86" y="64" fill="#c5dde2" fontSize="13" fontWeight="700">Navire A</text>
        <text x="370" y="48" fill="#c5dde2" fontSize="13" fontWeight="700">Navire B</text>
        <text x="150" y="198" fill="#e9523d" fontSize="12" fontWeight="800">vient sur TRIBORD</text>
        <text x="292" y="78" fill="#e9523d" fontSize="12" fontWeight="800">vient sur TRIBORD</text>
        <text x="160" y="226" fill="#9cc0c7" fontSize="12">Passage bâbord / bâbord</text>
      </svg>
      <figcaption>{caption ?? "Face à face : chacun vient sur tribord, on se croise bâbord sur bâbord."}</figcaption>
    </figure>
  );
}

export function CollisionCrossing({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 520 260" role="img" aria-label="Croisement : le navire qui voit l'autre sur son tribord s'écarte.">
        <rect width="520" height="260" rx="16" fill="#0e3a46" />
        <path d="M80 210 L80 70" stroke="#7ec8c3" strokeWidth="3" strokeDasharray="7 6" />
        <path d="M80 210 L250 210" stroke="#7ec8c3" strokeWidth="2" opacity=".35" />
        <Boat x={80} y={168} rot={0} />
        <Boat x={210} y={210} rot={-90} color="#f3d27a" />
        <path d="M104 150 C 150 150, 170 170, 170 210" fill="none" stroke="#e9523d" strokeWidth="3" markerEnd="url(#arrow-b)" />
        <defs>
          <marker id="arrow-b" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="#e9523d" />
          </marker>
        </defs>
        <circle cx="80" cy="210" r="18" fill="none" stroke="#e9523d" strokeWidth="2" opacity=".8" />
        <text x="300" y="84" fill="#fff" fontSize="14" fontWeight="800">Vous = navire à écarter</text>
        <text x="300" y="108" fill="#c5dde2" fontSize="13">L'autre est sur votre TRIBORD.</text>
        <text x="300" y="132" fill="#e9b4ab" fontSize="13">Vous vous écartez, sans passer devant si possible.</text>
        <text x="38" y="52" fill="#c5dde2" fontSize="12">Votre cap</text>
        <text x="168" y="248" fill="#f3d27a" fontSize="12">L'autre navire</text>
      </svg>
      <figcaption>{caption ?? "Croisement moteur / moteur : celui qui voit l'autre à tribord s'écarte."}</figcaption>
    </figure>
  );
}

export function CollisionOvertaking({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 520 220" role="img" aria-label="Rattrapage : le navire qui rattrape s'écarte jusqu'à être définitivement paré et clair.">
        <rect width="520" height="220" rx="16" fill="#0e3a46" />
        <path d="M70 110 L450 110" stroke="#7ec8c3" strokeWidth="3" strokeDasharray="7 6" />
        <Boat x={330} y={110} rot={90} />
        <Boat x={150} y={110} rot={90} color="#f3d27a" />
        <path d="M170 86 C 240 40, 310 40, 380 86" fill="none" stroke="#e9523d" strokeWidth="3" markerEnd="url(#arrow-c)" />
        <defs>
          <marker id="arrow-c" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="#e9523d" />
          </marker>
        </defs>
        <text x="96" y="168" fill="#f3d27a" fontSize="12" fontWeight="800">Rattrapant</text>
        <text x="292" y="168" fill="#c5dde2" fontSize="12" fontWeight="800">Rattrapé (maintient)</text>
        <text x="150" y="200" fill="#e9b4ab" fontSize="12">Le rattrapant reste à l'écart jusqu'à être paré et clair.</text>
      </svg>
      <figcaption>{caption ?? "Rattrapage : c'est toujours le navire qui rattrape qui s'écarte."}</figcaption>
    </figure>
  );
}

function Light({ cx, cy, color, r = 9 }: { cx: number; cy: number; color: string; r?: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r + 7} fill={color} opacity=".22" />
      <circle cx={cx} cy={cy} r={r} fill={color} />
    </>
  );
}

export function LightsPowerPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 560 230" role="img" aria-label="Feux d'un navire à moteur faisant route : feu de tête de mât blanc, feu bâbord rouge, feu tribord vert, feu de poupe blanc.">
        <rect width="560" height="230" rx="16" fill="#07151b" />
        <text x="24" y="32" fill="#9cc0c7" fontSize="13" fontWeight="800">NAVIRE À MOTEUR — FAISANT ROUTE</text>
        <g transform="translate(70 48)">
          <text x="70" y="18" fill="#d7e6ea" fontSize="12">Face à face</text>
          <polygon points="90,46 118,150 90,138 62,150" fill="#1d3c46" stroke="#4e6d76" />
          <Light cx={90} cy={40} color="#f4f1de" r={8} />
          <Light cx={64} cy={118} color="#e23b3b" />
          <Light cx={116} cy={118} color="#1ea35a" />
          <text x="8" y="176" fill="#e23b3b" fontSize="11">Bâbord rouge</text>
          <text x="108" y="176" fill="#1ea35a" fontSize="11">Tribord vert</text>
        </g>
        <g transform="translate(300 48)">
          <text x="40" y="18" fill="#d7e6ea" fontSize="12">Vu de bâbord</text>
          <rect x="20" y="78" width="170" height="36" rx="16" fill="#1d3c46" stroke="#4e6d76" />
          <polygon points="190,96 230,78 230,114" fill="#1d3c46" stroke="#4e6d76" />
          <Light cx={118} cy={58} color="#f4f1de" r={8} />
          <Light cx={70} cy={96} color="#e23b3b" />
          <Light cx={28} cy={96} color="#f4f1de" r={7} />
          <text x="8" y="176" fill="#f4f1de" fontSize="11">Poupe blanche + tête de mât + rouge</text>
        </g>
      </svg>
      <figcaption>{caption ?? "Bâbord = rouge. Tribord = vert. Tête de mât et poupe = blanc."}</figcaption>
    </figure>
  );
}

export function LightsFishingPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 560 210" role="img" aria-label="Feux de pêche : chalut vert sur blanc, autre pêche rouge sur blanc.">
        <rect width="560" height="210" rx="16" fill="#07151b" />
        <g transform="translate(40 28)">
          <text x="0" y="16" fill="#9cc0c7" fontSize="12" fontWeight="800">CHALUT</text>
          <rect x="70" y="70" width="90" height="28" rx="12" fill="#1d3c46" />
          <Light cx={115} cy={38} color="#1ea35a" />
          <Light cx={115} cy={64} color="#f4f1de" />
          <text x="70" y="132" fill="#d7e6ea" fontSize="13">Vert sur blanc</text>
        </g>
        <g transform="translate(300 28)">
          <text x="0" y="16" fill="#9cc0c7" fontSize="12" fontWeight="800">AUTRE PÊCHE</text>
          <rect x="70" y="70" width="90" height="28" rx="12" fill="#1d3c46" />
          <Light cx={115} cy={38} color="#e23b3b" />
          <Light cx={115} cy={64} color="#f4f1de" />
          <text x="62" y="132" fill="#d7e6ea" fontSize="13">Rouge sur blanc</text>
        </g>
      </svg>
      <figcaption>{caption ?? "Chalut : vert sur blanc. Autre pêche : rouge sur blanc."}</figcaption>
    </figure>
  );
}

export function LightsConstrainedPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 560 220" role="img" aria-label="Feux de navires contraints : non maître deux rouges, manœuvre restreinte rouge-blanc-rouge, mouillage un blanc.">
        <rect width="560" height="220" rx="16" fill="#07151b" />
        <g transform="translate(18 24)">
          <text x="0" y="14" fill="#9cc0c7" fontSize="11" fontWeight="800">NON MAÎTRE</text>
          <Light cx={70} cy={48} color="#e23b3b" />
          <Light cx={70} cy={76} color="#e23b3b" />
          <text x="18" y="120" fill="#d7e6ea" fontSize="12">Rouge / rouge</text>
        </g>
        <g transform="translate(196 24)">
          <text x="0" y="14" fill="#9cc0c7" fontSize="11" fontWeight="800">MANŒUVRE RESTREINTE</text>
          <Light cx={90} cy={40} color="#e23b3b" />
          <Light cx={90} cy={66} color="#f4f1de" />
          <Light cx={90} cy={92} color="#e23b3b" />
          <text x="28" y="134" fill="#d7e6ea" fontSize="12">Rouge-blanc-rouge</text>
        </g>
        <g transform="translate(400 24)">
          <text x="0" y="14" fill="#9cc0c7" fontSize="11" fontWeight="800">MOUILLAGE</text>
          <Light cx={70} cy={66} color="#f4f1de" r={11} />
          <text x="18" y="120" fill="#d7e6ea" fontSize="12">Blanc horizon</text>
        </g>
      </svg>
      <figcaption>{caption ?? "Deux rouges = non maître. Rouge-blanc-rouge = manœuvre restreinte. Un blanc = mouillage."}</figcaption>
    </figure>
  );
}

export function SoundSignalsPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 560 180" role="img" aria-label="Signaux sonores : un bref tribord, deux brefs bâbord, trois brefs arrière, cinq brefs doute.">
        <rect width="560" height="180" rx="16" fill="#0e3a46" />
        {[
          { x: 28, label: "1 bref", sub: "Je viens sur tribord", n: 1 },
          { x: 158, label: "2 brefs", sub: "Je viens sur bâbord", n: 2 },
          { x: 288, label: "3 brefs", sub: "Je bats en arrière", n: 3 },
          { x: 418, label: "5 brefs", sub: "Doute / danger", n: 5 },
        ].map((item) => (
          <g key={item.label} transform={`translate(${item.x} 28)`}>
            <text x="0" y="16" fill="#fff" fontSize="13" fontWeight="800">{item.label}</text>
            {Array.from({ length: item.n }).map((_, i) => (
              <rect key={i} x={i * 16} y="36" width="10" height="28" rx="3" fill={item.n === 5 ? "#e9523d" : "#7ec8c3"} />
            ))}
            <text x="0" y="92" fill="#c5dde2" fontSize="11">{item.sub}</text>
          </g>
        ))}
      </svg>
      <figcaption>{caption ?? "1 bref = tribord. 2 brefs = bâbord. 3 brefs = arrière. 5 brefs = doute."}</figcaption>
    </figure>
  );
}

export function CardinalSchematic({ caption }: PlateProps) {
  const Cone = ({ x, y, up }: { x: number; y: number; up: boolean }) =>
    up ? <polygon points={`${x},${y - 14} ${x + 10},${y + 6} ${x - 10},${y + 6}`} fill="#111" />
      : <polygon points={`${x},${y + 14} ${x + 10},${y - 6} ${x - 10},${y - 6}`} fill="#111" />;

  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 560 230" role="img" aria-label="Les quatre marques cardinales : couleurs et voyants.">
        <rect width="560" height="230" rx="16" fill="#f4f7f8" />
        {[
          { x: 40, title: "Nord", bands: ["#111", "#f2c548"], cones: ["up", "up"] as const },
          { x: 160, title: "Est", bands: ["#111", "#f2c548", "#111"], cones: ["up", "down"] as const },
          { x: 280, title: "Sud", bands: ["#f2c548", "#111"], cones: ["down", "down"] as const },
          { x: 400, title: "Ouest", bands: ["#f2c548", "#111", "#f2c548"], cones: ["down", "up"] as const },
        ].map((m) => (
          <g key={m.title} transform={`translate(${m.x} 18)`}>
            <text x="48" y="18" textAnchor="middle" fontSize="13" fontWeight="800" fill="#102c36">{m.title}</text>
            <Cone x={48} y={42} up={m.cones[0] === "up"} />
            <Cone x={48} y={64} up={m.cones[1] === "up"} />
            <g transform="translate(28 86)">
              {m.bands.map((color, i) => (
                <rect key={color + i} x="0" y={i * (88 / m.bands.length)} width="40" height={88 / m.bands.length} fill={color} stroke="#c5d0d4" />
              ))}
            </g>
          </g>
        ))}
      </svg>
      <figcaption>{caption ?? "Les pointes du voyant indiquent où se trouve le noir. On passe du côté indiqué par le nom."}</figcaption>
    </figure>
  );
}

export function PortTrafficPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 560 220" role="img" aria-label="Feux de trafic portuaire : trois rouges entrée interdite, deux verts entrée autorisée.">
        <rect width="560" height="220" rx="16" fill="#07151b" />
        <g transform="translate(50 28)">
          <text x="0" y="16" fill="#e9b4ab" fontSize="12" fontWeight="800">ENTRÉE INTERDITE</text>
          <rect x="48" y="36" width="36" height="118" rx="8" fill="#12262c" stroke="#4e6d76" />
          <circle cx="66" cy="58" r="12" fill="#e23b3b" />
          <circle cx="66" cy="90" r="12" fill="#e23b3b" />
          <circle cx="66" cy="122" r="12" fill="#e23b3b" />
          <text x="0" y="176" fill="#c5dde2" fontSize="12">3 feux rouges verticaux</text>
        </g>
        <g transform="translate(250 28)">
          <text x="0" y="16" fill="#9cc0c7" fontSize="12" fontWeight="800">ENTRÉE AUTORISÉE</text>
          <rect x="48" y="52" width="36" height="90" rx="8" fill="#12262c" stroke="#4e6d76" />
          <circle cx="66" cy="78" r="12" fill="#1ea35a" />
          <circle cx="66" cy="114" r="12" fill="#1ea35a" />
          <text x="0" y="176" fill="#c5dde2" fontSize="12">2 feux verts verticaux</text>
        </g>
        <g transform="translate(430 70)">
          <text x="0" y="0" fill="#f3d27a" fontSize="12" fontWeight="800">À confirmer</text>
          <text x="0" y="22" fill="#c5dde2" fontSize="12">Documents du port</text>
          <text x="0" y="42" fill="#c5dde2" fontSize="12">et Instructions nautiques</text>
        </g>
      </svg>
      <figcaption>{caption ?? "Trois rouges : entrée souvent interdite. Deux verts : entrée souvent autorisée. Toujours vérifier le port."}</figcaption>
    </figure>
  );
}

export function DayMarksPlate({ caption }: PlateProps) {
  const Ball = ({ cx, cy }: { cx: number; cy: number }) => <circle cx={cx} cy={cy} r="10" fill="#1a1a1a" />;
  const Diamond = ({ cx, cy }: { cx: number; cy: number }) => (
    <polygon points={`${cx},${cy - 12} ${cx + 10},${cy} ${cx},${cy + 12} ${cx - 10},${cy}`} fill="#1a1a1a" />
  );
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 560 250" role="img" aria-label="Marques de jour : mouillage une boule, non maître deux boules, manœuvre restreinte boule-losange-boule, voilier au moteur un cône pointe en bas.">
        <rect width="560" height="250" rx="16" fill="#f4f7f8" />
        <g transform="translate(24 18)">
          <text x="48" y="16" textAnchor="middle" fontSize="12" fontWeight="800" fill="#102c36">Mouillage</text>
          <Ball cx={48} cy={48} />
          <text x="48" y="92" textAnchor="middle" fontSize="11" fill="#4f666d">1 boule</text>
          <text x="48" y="108" textAnchor="middle" fontSize="11" fill="#0b2730">Nuit : 1 blanc</text>
        </g>
        <g transform="translate(156 18)">
          <text x="48" y="16" textAnchor="middle" fontSize="12" fontWeight="800" fill="#102c36">Non maître</text>
          <Ball cx={48} cy={40} />
          <Ball cx={48} cy={64} />
          <text x="48" y="92" textAnchor="middle" fontSize="11" fill="#4f666d">2 boules</text>
          <text x="48" y="108" textAnchor="middle" fontSize="11" fill="#0b2730">Nuit : 2 rouges</text>
        </g>
        <g transform="translate(288 18)">
          <text x="48" y="16" textAnchor="middle" fontSize="12" fontWeight="800" fill="#102c36">Manœuvre restreinte</text>
          <Ball cx={48} cy={36} />
          <Diamond cx={48} cy={58} />
          <Ball cx={48} cy={80} />
          <text x="48" y="108" textAnchor="middle" fontSize="11" fill="#0b2730">Nuit : R-B-R</text>
        </g>
        <g transform="translate(424 18)">
          <text x="48" y="16" textAnchor="middle" fontSize="12" fontWeight="800" fill="#102c36">Voilier au moteur</text>
          <polygon points="48,36 60,70 36,70" fill="#1a1a1a" />
          <text x="48" y="92" textAnchor="middle" fontSize="11" fill="#4f666d">cône pointe en bas</text>
          <text x="48" y="108" textAnchor="middle" fontSize="11" fill="#0b2730">Règles du moteur</text>
        </g>
        <text x="28" y="150" fill="#102c36" fontSize="13" fontWeight="800">Pêche : 2 cônes pointes contre pointes · Échoué : 3 boules · Tirant d&apos;eau : cylindre</text>
        <text x="28" y="176" fill="#4f666d" fontSize="12">De jour on lit les formes noires. De nuit on lit les feux. Même signification, deux langages.</text>
        <text x="28" y="200" fill="#e9523d" fontSize="12" fontWeight="700">Piège : une boule n&apos;est pas « non maître ». Non maître = deux boules.</text>
        <text x="28" y="224" fill="#4f666d" fontSize="12">Remorquage de plus de 200 m : un losange. Navire contraint par son tirant d&apos;eau : un cylindre.</text>
      </svg>
      <figcaption>{caption ?? "Marques de jour : une boule = mouillage. Deux boules = non maître. Boule-losange-boule = manœuvre restreinte."}</figcaption>
    </figure>
  );
}

import { vocabPlates } from "./VocabPlates";

export const examPlates = {
  "collision-head-on": CollisionHeadOn,
  "collision-crossing": CollisionCrossing,
  "collision-overtaking": CollisionOvertaking,
  "lights-power": LightsPowerPlate,
  "lights-fishing": LightsFishingPlate,
  "lights-constrained": LightsConstrainedPlate,
  "sounds": SoundSignalsPlate,
  "cardinals": CardinalSchematic,
  "port-traffic": PortTrafficPlate,
  "day-marks": DayMarksPlate,
  ...vocabPlates,
};

export type ExamPlateId = keyof typeof examPlates;

export function ExamPlate({ id, caption }: { id: ExamPlateId; caption?: string }) {
  const Plate = examPlates[id];
  return <Plate caption={caption} />;
}
