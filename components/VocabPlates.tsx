import type { ReactNode } from "react";

type PlateProps = { caption?: string };
type BoatPart = "all" | "proue" | "poupe" | "babord" | "tribord" | "travers";

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 520 268" role="img" aria-label={label}>
      <rect width="520" height="268" rx="16" fill="#0e3a46" />
      {children}
    </svg>
  );
}

function Hull({ highlight = "all" }: { highlight?: BoatPart }) {
  const active = (part: BoatPart) => highlight === "all" || highlight === part;
  const glow = (part: BoatPart) => highlight === part;
  return (
    <g transform="translate(260 136)">
      {glow("babord") && <ellipse cx="-28" cy="12" rx="42" ry="88" fill="#e9523d" opacity=".22" />}
      {glow("tribord") && <ellipse cx="28" cy="12" rx="42" ry="88" fill="#2f9e73" opacity=".28" />}
      {glow("proue") && <ellipse cx="0" cy="-78" rx="38" ry="36" fill="#f3d27a" opacity=".35" />}
      {glow("poupe") && <ellipse cx="0" cy="78" rx="48" ry="34" fill="#f3d27a" opacity=".35" />}
      {glow("travers") && (
        <>
          <line x1="-118" y1="18" x2="118" y2="18" stroke="#7ec8c3" strokeWidth="3" strokeDasharray="7 6" />
          <polygon points="-118,18 -102,10 -102,26" fill="#7ec8c3" />
          <polygon points="118,18 102,10 102,26" fill="#7ec8c3" />
        </>
      )}
      <polygon points="0,-96 52,92 0,68 -52,92" fill="#e8eef1" stroke="#0b2730" strokeWidth="2" />
      <path d="M0,-96 L-52,92 L-36,92 L0,-72 Z" fill="#d93f3f" opacity={active("babord") ? 0.95 : 0.28} />
      <path d="M0,-96 L52,92 L36,92 L0,-72 Z" fill="#15865d" opacity={active("tribord") ? 0.95 : 0.28} />
      <polygon points="0,-78 30,70 0,52 -30,70" fill="#f7fbfc" />
      <rect x="-15" y="12" width="30" height="32" rx="5" fill="#c5d5dc" />
      <ellipse cx="0" cy="10" rx="10" ry="14" fill="#0b2730" />
      <circle cx="0" cy="-12" r="7" fill="#0b2730" />
      <line x1="-7" y1="4" x2="-24" y2="12" stroke="#d93f3f" strokeWidth="4" strokeLinecap="round" opacity={active("babord") ? 1 : 0.35} />
      <line x1="7" y1="4" x2="24" y2="12" stroke="#15865d" strokeWidth="4" strokeLinecap="round" opacity={active("tribord") ? 1 : 0.35} />
    </g>
  );
}

function BoatLabels({ highlight = "all" }: { highlight?: BoatPart }) {
  const on = (part: BoatPart) => highlight === "all" || highlight === part;
  const Label = ({ x, y, text, part, color }: { x: number; y: number; text: string; part: BoatPart; color: string }) => (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={color}
      fontSize={highlight === part ? 18 : 15}
      fontWeight="800"
      opacity={on(part) ? 1 : 0.28}
    >
      {text}
    </text>
  );
  return (
    <>
      <Label x={260} y={28} text="PROUE" part="proue" color="#f3d27a" />
      <Label x={260} y={256} text="POUPE" part="poupe" color="#f3d27a" />
      <Label x={72} y={148} text="BÂBORD" part="babord" color="#ff8a7a" />
      <Label x={448} y={148} text="TRIBORD" part="tribord" color="#7ed9b0" />
      {highlight === "all" && (
        <>
          <text x={72} y={166} textAnchor="middle" fill="#ff8a7a" fontSize="11" fontWeight="700">gauche · rouge</text>
          <text x={448} y={166} textAnchor="middle" fill="#7ed9b0" fontSize="11" fontWeight="700">droite · vert</text>
        </>
      )}
      {highlight === "travers" && (
        <>
          <text x={72} y={118} textAnchor="middle" fill="#7ec8c3" fontSize="13" fontWeight="800">TRAVERS</text>
          <text x={448} y={118} textAnchor="middle" fill="#7ec8c3" fontSize="13" fontWeight="800">TRAVERS</text>
        </>
      )}
    </>
  );
}

function BoatPartPlate({ highlight, caption, label }: { highlight: BoatPart; caption?: string; label: string }) {
  return (
    <figure className="exam-plate">
      <Frame label={label}>
        <Hull highlight={highlight} />
        <BoatLabels highlight={highlight} />
        {highlight === "all" && (
          <text x="260" y="46" textAnchor="middle" fill="#9cc0c7" fontSize="11">
            Place-toi DANS le bateau, regard vers la proue.
          </text>
        )}
      </Frame>
      <figcaption>{caption ?? ""}</figcaption>
    </figure>
  );
}

export function BoatPlanPlate({ caption }: PlateProps) {
  return (
    <BoatPartPlate
      highlight="all"
      caption={caption ?? "Proue = avant. Poupe = arrière. Bâbord = gauche = rouge. Tribord = droite = vert."}
      label="Plan du bateau vu du dessus : proue en haut, poupe en bas, bâbord à gauche en rouge, tribord à droite en vert."
    />
  );
}

export function BoatProuePlate({ caption }: PlateProps) {
  return <BoatPartPlate highlight="proue" caption={caption} label="La proue est la partie avant du navire." />;
}

export function BoatPoupePlate({ caption }: PlateProps) {
  return <BoatPartPlate highlight="poupe" caption={caption} label="La poupe est la partie arrière du navire." />;
}

export function BoatBabordPlate({ caption }: PlateProps) {
  return <BoatPartPlate highlight="babord" caption={caption} label="Bâbord est le côté gauche, couleur rouge." />;
}

export function BoatTribordPlate({ caption }: PlateProps) {
  return <BoatPartPlate highlight="tribord" caption={caption} label="Tribord est le côté droit, couleur verte." />;
}

export function BoatTraversPlate({ caption }: PlateProps) {
  return <BoatPartPlate highlight="travers" caption={caption} label="Le travers est la direction à 90 degrés de l'axe du navire." />;
}

export function CapRoutePlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <Frame label="Le cap est l'axe du bateau. La route est la trajectoire réelle sur le fond, déviée par le courant.">
        <defs>
          <marker id="cap-head" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="#f3d27a" />
          </marker>
          <marker id="route-head" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="#7ec8c3" />
          </marker>
        </defs>
        <text x="28" y="32" fill="#8ec4d0" fontSize="12" fontWeight="700">Courant →</text>
        {[70, 130, 190, 250].map((y) => (
          <path key={y} d={`M40 ${y} H200`} fill="none" stroke="#3d8a9a" strokeWidth="2" markerEnd="url(#route-head)" opacity=".55" />
        ))}
        <g transform="translate(248 150) rotate(28)">
          <polygon points="0,-54 22,48 0,34 -22,48" fill="#e8eef1" stroke="#0b2730" strokeWidth="1.6" />
          <path d="M0,-54 L-22,48 L-14,48 L0,-40 Z" fill="#d93f3f" />
          <path d="M0,-54 L22,48 L14,48 L0,-40 Z" fill="#15865d" />
        </g>
        <path d="M214 186 L318 82" fill="none" stroke="#f3d27a" strokeWidth="4" markerEnd="url(#cap-head)" />
        <path d="M236 178 L430 178" fill="none" stroke="#7ec8c3" strokeWidth="4" strokeDasharray="8 7" markerEnd="url(#route-head)" />
        <text x="300" y="72" fill="#f3d27a" fontSize="16" fontWeight="800">CAP</text>
        <text x="300" y="90" fill="#f3d27a" fontSize="11">où pointe le nez</text>
        <text x="390" y="164" fill="#7ec8c3" fontSize="16" fontWeight="800">ROUTE</text>
        <text x="390" y="200" fill="#7ec8c3" fontSize="11">où il va sur le fond</text>
        <text x="260" y="248" textAnchor="middle" fill="#9cc0c7" fontSize="12">Le courant (et le vent) écartent la route du cap.</text>
      </Frame>
      <figcaption>{caption ?? "Cap = axe du navire. Route = trajectoire réelle sur le fond."}</figcaption>
    </figure>
  );
}

export function GisementPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <Frame label="Le gisement est l'angle entre l'avant du bateau et un objet. 0 degrés = devant, 90 degrés = travers.">
        <Hull />
        <path d="M260 136 L260 36" stroke="#f3d27a" strokeWidth="2.5" />
        <path d="M260 136 L438 92" stroke="#7ec8c3" strokeWidth="2.5" strokeDasharray="7 6" />
        <path d="M260 78 A58 58 0 0 1 312 92" fill="none" stroke="#e9523d" strokeWidth="3" />
        <text x="292" y="72" fill="#e9523d" fontSize="13" fontWeight="800">GISEMENT</text>
        <circle cx="448" cy="86" r="16" fill="#f3d27a" />
        <rect x="442" y="58" width="12" height="22" fill="#c5dde2" />
        <text x="448" y="118" textAnchor="middle" fill="#f3d27a" fontSize="11" fontWeight="700">amer</text>
        <text x="274" y="52" fill="#f3d27a" fontSize="11">0° avant</text>
        <text x="86" y="154" fill="#7ec8c3" fontSize="11">90° travers</text>
        <text x="260" y="250" textAnchor="middle" fill="#9cc0c7" fontSize="12">Relèvement = direction au compas. Gisement = par rapport à l&apos;axe.</text>
      </Frame>
      <figcaption>{caption ?? "Gisement : angle depuis l'avant. Relèvement : direction au compas."}</figcaption>
    </figure>
  );
}

function Sail({ x, y, boom = "right", tint = "#e8eef1" }: { x: number; y: number; boom?: "left" | "right"; tint?: string }) {
  const boomX = boom === "right" ? 38 : -38;
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points="0,-40 16,36 0,24 -16,36" fill={tint} stroke="#0b2730" strokeWidth="1.4" />
      <line x1="0" y1="-36" x2="0" y2="8" stroke="#0b2730" strokeWidth="2" />
      <path d={`M0,-36 Q ${boomX / 2} -8 ${boomX} 8`} fill="#c5dde2" stroke="#0b2730" strokeWidth="1.2" />
      <line x1="0" y1="8" x2={boomX} y2="8" stroke="#0b2730" strokeWidth="2" />
    </g>
  );
}

export function AmuresPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <Frame label="Amures : côté d'où vient le vent. Bâbord amures s'écarte de tribord amures.">
        {[40, 70, 100, 130].map((y) => (
          <g key={y}>
            <path d={`M24 ${y} H150`} stroke="#7ec8c3" strokeWidth="2" opacity=".7" />
            <polygon points={`150,${y} 138,${y - 5} 138,${y + 5}`} fill="#7ec8c3" />
          </g>
        ))}
        <text x="28" y="32" fill="#7ec8c3" fontSize="12" fontWeight="800">VENT</text>
        <Sail x={200} y={150} boom="right" />
        <Sail x={370} y={150} boom="left" tint="#f3d27a" />
        <text x="200" y="214" textAnchor="middle" fill="#ff8a7a" fontSize="13" fontWeight="800">BÂBORD AMURES</text>
        <text x="200" y="232" textAnchor="middle" fill="#e9b4ab" fontSize="11">vent de bâbord · s&apos;écarte</text>
        <text x="370" y="214" textAnchor="middle" fill="#7ed9b0" fontSize="13" fontWeight="800">TRIBORD AMURES</text>
        <text x="370" y="232" textAnchor="middle" fill="#9cc0c7" fontSize="11">vent de tribord · maintient</text>
        <text x="260" y="256" textAnchor="middle" fill="#9cc0c7" fontSize="12">Le boom est du côté opposé au vent.</text>
      </Frame>
      <figcaption>{caption ?? "Bâbord amures s'écarte de tribord amures."}</figcaption>
    </figure>
  );
}

export function AuVentPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <Frame label="Même bord : le voilier au vent s'écarte du voilier sous le vent.">
        {[36, 64, 92, 120].map((y) => (
          <g key={y}>
            <path d={`M24 ${y} H200`} stroke="#7ec8c3" strokeWidth="2" opacity=".7" />
            <polygon points={`200,${y} 188,${y - 5} 188,${y + 5}`} fill="#7ec8c3" />
          </g>
        ))}
        <text x="28" y="28" fill="#7ec8c3" fontSize="12" fontWeight="800">VENT</text>
        <Sail x={230} y={168} boom="right" tint="#f3d27a" />
        <Sail x={390} y={168} boom="right" />
        <text x="230" y="226" textAnchor="middle" fill="#f3d27a" fontSize="14" fontWeight="800">AU VENT</text>
        <text x="230" y="244" textAnchor="middle" fill="#e9b4ab" fontSize="11">plus près du vent · s&apos;écarte</text>
        <text x="390" y="226" textAnchor="middle" fill="#c5dde2" fontSize="14" fontWeight="800">SOUS LE VENT</text>
        <text x="390" y="244" textAnchor="middle" fill="#9cc0c7" fontSize="11">côté abrité · maintient</text>
      </Frame>
      <figcaption>{caption ?? "Même amures : l'au vent s'écarte du sous le vent."}</figcaption>
    </figure>
  );
}

function LateralMark({ x, y, color, shape }: { x: number; y: number; color: string; shape: "can" | "cone" }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {shape === "can" ? (
        <>
          <rect x="-14" y="8" width="28" height="46" rx="4" fill={color} stroke="#0b2730" strokeWidth="1.4" />
          <rect x="-10" y="-10" width="20" height="18" rx="3" fill={color} stroke="#0b2730" strokeWidth="1.4" />
        </>
      ) : (
        <>
          <polygon points="0,8 16,54 -16,54" fill={color} stroke="#0b2730" strokeWidth="1.4" />
          <polygon points="0,-12 12,10 -12,10" fill={color} stroke="#0b2730" strokeWidth="1.4" />
        </>
      )}
    </g>
  );
}

function RegionPlate({ inverted, caption }: { inverted: boolean; caption?: string }) {
  const left = inverted ? "#15865d" : "#d93f3f";
  const right = inverted ? "#d93f3f" : "#15865d";
  const leftShape = inverted ? "cone" : "can";
  const rightShape = inverted ? "can" : "cone";
  const title = inverted ? "RÉGION B — pas la France" : "RÉGION A — France";
  const leftLabel = inverted ? "vert à bâbord" : "rouge à bâbord";
  const rightLabel = inverted ? "rouge à tribord" : "vert à tribord";
  return (
    <figure className="exam-plate">
      <Frame label={inverted ? "Région B : en entrant, rouge à tribord et vert à bâbord." : "Région A : en entrant, rouge à bâbord et vert à tribord."}>
        <path d="M160 240 C 160 120, 360 120, 360 28" fill="none" stroke="#7ec8c3" strokeWidth="46" opacity=".22" />
        <path d="M160 240 C 160 120, 360 120, 360 28" fill="none" stroke="#7ec8c3" strokeWidth="3" strokeDasharray="8 7" />
        <polygon points="360,28 350,44 370,44" fill="#7ec8c3" />
        <text x="378" y="36" fill="#c5dde2" fontSize="12" fontWeight="800">PORT</text>
        <text x="86" y="248" fill="#c5dde2" fontSize="12" fontWeight="800">LARGE</text>
        <LateralMark x={148} y={150} color={left} shape={leftShape as "can" | "cone"} />
        <LateralMark x={372} y={150} color={right} shape={rightShape as "can" | "cone"} />
        <text x="148" y="228" textAnchor="middle" fill={inverted ? "#7ed9b0" : "#ff8a7a"} fontSize="12" fontWeight="800">{leftLabel}</text>
        <text x="372" y="228" textAnchor="middle" fill={inverted ? "#ff8a7a" : "#7ed9b0"} fontSize="12" fontWeight="800">{rightLabel}</text>
        <text x="260" y="32" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800">{title}</text>
        <text x="260" y="52" textAnchor="middle" fill="#9cc0c7" fontSize="12">En venant du large, dans le chenal.</text>
      </Frame>
      <figcaption>{caption ?? (inverted ? "Région B, entrée : rouge à tribord." : "Région A, entrée : rouge à bâbord, vert à tribord.")}</figcaption>
    </figure>
  );
}

export function RegionAPlate({ caption }: PlateProps) {
  return <RegionPlate inverted={false} caption={caption} />;
}

export function RegionBPlate({ caption }: PlateProps) {
  return <RegionPlate inverted caption={caption} />;
}

export function TideLevelsPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <svg viewBox="0 0 520 268" role="img" aria-label="Zéro hydrographique, sonde, hauteur d'eau et tirant d'eau.">
        <rect width="520" height="268" rx="16" fill="#f4f8fa" />
        <rect x="70" y="36" width="200" height="196" fill="#d7eef3" />
        <rect x="70" y="196" width="200" height="36" fill="#c4b39a" />
        <rect x="70" y="118" width="200" height="78" fill="#7eb8c4" />
        <line x1="70" y1="196" x2="270" y2="196" stroke="#0b2730" strokeWidth="2" />
        <g transform="translate(170 118)">
          <polygon points="0,-28 22,18 0,8 -22,18" fill="#e8eef1" stroke="#0b2730" strokeWidth="1.4" />
          <line x1="0" y1="8" x2="0" y2="42" stroke="#0b2730" strokeWidth="2" />
          <line x1="-10" y1="42" x2="10" y2="42" stroke="#0b2730" strokeWidth="2" />
        </g>
        <text x="300" y="54" fill="#102c36" fontSize="13" fontWeight="800">Surface (flottaison)</text>
        <path d="M270 118 H292" stroke="#102c36" strokeWidth="1.5" />
        <text x="300" y="132" fill="#0e3a46" fontSize="13" fontWeight="800">Hauteur d&apos;eau</text>
        <text x="300" y="148" fill="#4f666d" fontSize="11">du ZH jusqu&apos;à la mer du moment</text>
        <text x="300" y="176" fill="#0e3a46" fontSize="13" fontWeight="800">Tirant d&apos;eau</text>
        <text x="300" y="192" fill="#4f666d" fontSize="11">quille → flottaison + marge</text>
        <text x="300" y="216" fill="#0e3a46" fontSize="13" fontWeight="800">ZH — zéro hydrographique</text>
        <text x="88" y="88" fill="#0e3a46" fontSize="12" fontWeight="800">Sonde</text>
        <text x="88" y="104" fill="#4f666d" fontSize="11">ZH → fond</text>
        <text x="36" y="202" fill="#102c36" fontSize="11" fontWeight="800">ZH</text>
      </svg>
      <figcaption>{caption ?? "Profondeur du moment ≈ sonde + hauteur d'eau. Toujours une marge sous la quille."}</figcaption>
    </figure>
  );
}

export function LightSectorsPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <Frame label="Feux de route : rouge à bâbord, vert à tribord, blanc de poupe vers l'arrière.">
        <path d="M260 136 L260 18 A118 118 0 0 0 148 228 Z" fill="#d93f3f" opacity=".35" />
        <path d="M260 136 L260 18 A118 118 0 0 1 372 228 Z" fill="#15865d" opacity=".35" />
        <path d="M260 136 L148 228 A118 118 0 0 0 372 228 Z" fill="#f4f8fa" opacity=".28" />
        <Hull />
        <text x="110" y="88" fill="#ff8a7a" fontSize="13" fontWeight="800">ROUGE</text>
        <text x="110" y="106" fill="#ff8a7a" fontSize="11">bâbord</text>
        <text x="390" y="88" fill="#7ed9b0" fontSize="13" fontWeight="800">VERT</text>
        <text x="390" y="106" fill="#7ed9b0" fontSize="11">tribord</text>
        <text x="260" y="250" textAnchor="middle" fill="#e8eef1" fontSize="13" fontWeight="800">BLANC · poupe</text>
      </Frame>
      <figcaption>{caption ?? "Vu de face : rouge à gauche (son bâbord), vert à droite (son tribord). Vu de poupe : blanc seulement."}</figcaption>
    </figure>
  );
}

function RhythmRow({ y, label, pattern, note }: { y: number; label: string; pattern: ("on" | "off")[]; note: string }) {
  return (
    <g>
      <text x="20" y={y + 14} fill="#c5dde2" fontSize="12" fontWeight="800">{label}</text>
      {pattern.map((bit, i) => (
        <rect
          key={`${label}-${i}`}
          x={130 + i * 28}
          y={y}
          width="24"
          height="18"
          rx="3"
          fill={bit === "on" ? "#f3d27a" : "#16343c"}
          stroke="#7ec8c3"
          strokeWidth="1"
        />
      ))}
      <text x="360" y={y + 14} fill="#9cc0c7" fontSize="11">{note}</text>
    </g>
  );
}

export function LightRhythmsPlate({ caption }: PlateProps) {
  return (
    <figure className="exam-plate">
      <Frame label="Rythmes de feux : éclat, occultation, isophase et scintillement.">
        <text x="20" y="32" fill="#fff" fontSize="14" fontWeight="800">Rythme du feu</text>
        <text x="130" y="32" fill="#9cc0c7" fontSize="11">jaune = allumé · sombre = éteint</text>
        <RhythmRow y={56} label="Éclat" pattern={["on", "off", "off", "off", "on", "off", "off"]} note="lumière plus courte" />
        <RhythmRow y={100} label="Occultation" pattern={["on", "on", "on", "off", "on", "on", "on"]} note="obscurité plus courte" />
        <RhythmRow y={144} label="Isophase" pattern={["on", "on", "off", "off", "on", "on", "off"]} note="durées égales" />
        <RhythmRow y={188} label="Scintillement" pattern={["on", "off", "on", "off", "on", "off", "on"]} note="très rapide (cardinale N)" />
        <text x="20" y="246" fill="#9cc0c7" fontSize="12">De nuit on lit couleur + rythme. De jour on lit forme + voyant.</text>
      </Frame>
      <figcaption>{caption ?? "Éclat : lumière brève. Occultation : extinction brève. Isophase : durées égales."}</figcaption>
    </figure>
  );
}

export const vocabPlates = {
  "boat-plan": BoatPlanPlate,
  "boat-proue": BoatProuePlate,
  "boat-poupe": BoatPoupePlate,
  "boat-babord": BoatBabordPlate,
  "boat-tribord": BoatTribordPlate,
  "boat-travers": BoatTraversPlate,
  "cap-route": CapRoutePlate,
  gisement: GisementPlate,
  amures: AmuresPlate,
  "au-vent": AuVentPlate,
  "region-a": RegionAPlate,
  "region-b": RegionBPlate,
  "tide-levels": TideLevelsPlate,
  "light-sectors": LightSectorsPlate,
  "light-rhythms": LightRhythmsPlate,
};
