"use client";

import { useEffect, useMemo, useState } from "react";
import { allQuestions, chapters, officialProgram, type Chapter, type ExamPlateId, type LessonImage, type Question, type VocabTerm } from "@/data/course";
import { ExamPlate } from "@/components/ExamPlates";
import { lexicon, searchLexicon, vocabCategories, type VocabCategoryId } from "@/data/vocabulary";
import { assetPath } from "@/lib/asset";
import type { ImgHTMLAttributes } from "react";

function AppImage({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={assetPath(typeof src === "string" ? src : undefined)} {...props} />;
}

type View =
  | { type: "dashboard" }
  | { type: "program" }
  | { type: "chapter"; chapterId: string }
  | { type: "quiz"; chapterId: string }
  | { type: "exam" }
  | { type: "flashcards" }
  | { type: "vocabulary" }
  | { type: "sources" };

type StoredProgress = {
  completed: string[];
  quizScores: Record<string, number>;
  bestExam?: number;
};

const emptyProgress: StoredProgress = { completed: [], quizScores: {} };

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function ProgressRing({ value }: { value: number }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="progress-ring-wrap" aria-label={`${value}% du parcours terminé`}>
      <svg className="progress-ring" viewBox="0 0 120 120">
        <circle className="ring-bg" cx="60" cy="60" r={radius} />
        <circle
          className="ring-value"
          cx="60"
          cy="60"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="ring-label">
        <strong>{value}%</strong>
        <span>terminé</span>
      </div>
    </div>
  );
}

function LessonMedia({ images, plate, plates }: { images?: LessonImage[]; plate?: ExamPlateId; plates?: ExamPlateId[] }) {
  const plateIds = plates ?? (plate ? [plate] : []);
  return (
    <>
      {plateIds.map((id) => <ExamPlate key={id} id={id} />)}
      {images && images.length > 0 && (
        <div className={images.length > 1 ? "figure-grid" : "figure-single"}>
          {images.map((img) => (
            <figure className="lesson-figure" key={img.src}>
              <AppImage src={img.src} alt={img.alt} />
              <figcaption>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  );
}

function QuestionVisual({ question }: { question: Question }) {
  if (!question.image && !question.plate) return null;
  return (
    <div className="question-visual">
      {question.plate && <ExamPlate id={question.plate} caption="" />}
      {question.image && (
        <figure className="quiz-figure">
          <AppImage src={question.image} alt={question.imageAlt ?? "Illustration de la question"} />
        </figure>
      )}
    </div>
  );
}

function BeachPictograms() {
  const items = [
    { src: "/images/plage-bouees-jaunes.jpg", title: "Bouées jaunes", note: "Limite de la zone de baignade. Les navires à moteur n'y circulent pas, sauf le chenal prévu." },
    { src: "/images/plage-chenal-acces.jpg", title: "Chenal traversier", note: "Depuis la mer : rouge à bâbord, vert à tribord. Baignade interdite dans le couloir." },
    { src: "/images/picto-baignade-surveillee.jpg", title: "Baignade surveillée", note: "Pictogramme bleu, nageur blanc. Activité de baignade autorisée / surveillée." },
    { src: "/images/picto-baignade-interdite.jpg", title: "Baignade interdite", note: "Nageur barré d'une bande rouge : on ne nage pas, même si l'eau est calme." },
    { src: "/images/picto-engins-plage.jpg", title: "Engins de plage", note: "Zone réservée aux engins non motorisés (pédalo, kayak, annexes de plage)." },
    { src: "/images/picto-navires-interdits.jpg", title: "Navires interdits", note: "Bateau barré : pas de moteur dans le secteur (souvent la baignade)." },
    { src: "/images/picto-ski-interdit.jpg", title: "Ski / tractés interdits", note: "Skieur barré : activité tractée hors zone, hors horaires, hors chenal." },
    { src: "/images/picto-planche-voile.jpg", title: "Planche à voile", note: "Pictogramme bleu : secteur réservé ou activité autorisée." },
    { src: "/images/picto-kitesurf.jpg", title: "Kitesurf", note: "Secteur réservé. Hors de la baignade et hors du chenal traversier." },
    { src: "/images/picto-jetski-interdit.jpg", title: "Jet-ski interdit", note: "Engin motorisé barré : pas dans la baignade ni près des nageurs." },
    { src: "/images/picto-vitesse-5-noeuds.jpg", title: "5 nœuds / 300 m", note: "Bande littorale : 5 nœuds en règle générale, hors chenaux et arrêtés locaux." },
    { src: "/images/plage-pavillons.jpg", title: "Pavillons de plage", note: "Vert : surveillée. Jaune : dangereuse. Rouge : interdite. Violet : pollution." },
    { src: "/images/pavillon-vert-plage.jpg", title: "Pavillon vert", note: "Baignade surveillée, pas de danger apparent." },
    { src: "/images/pavillon-jaune-plage.jpg", title: "Pavillon jaune", note: "Baignade dangereuse, mais encore surveillée." },
    { src: "/images/pavillon-rouge-plage.jpg", title: "Pavillon rouge", note: "Baignade interdite. On ne nage pas." },
    { src: "/images/pavillon-violet-plage.jpg", title: "Pavillon violet", note: "Pollution : baignade déconseillée / interdite selon l'affichage." },
    { src: "/images/manche-air-orange.jpg", title: "Manche à air orange", note: "Vent fort : engins gonflables de plage interdits." },
  ];
  return (
    <div className="pictogram-grid" aria-label="Pictogrammes de plage">
      {items.map((item) => (
        <article className="pictogram-card photo" key={item.src}>
          <AppImage src={item.src} alt={item.title} />
          <strong>{item.title}</strong>
          <span>{item.note}</span>
        </article>
      ))}
    </div>
  );
}

function TermsList({ terms }: { terms: VocabTerm[] }) {
  return (
    <div className="terms-box">
      <strong>Vocabulaire du chapitre</strong>
      {terms.map((item) => (
        <div key={item.term}><em>{item.term}</em> — {item.meaning}</div>
      ))}
    </div>
  );
}

function BuoyGallery() {
  const marks = [
    { src: "/images/mark-babord-a.jpg", name: "Bâbord", note: "Rouge • cylindre" },
    { src: "/images/mark-tribord-a.jpg", name: "Tribord", note: "Vert • cône" },
    { src: "/images/mark-cardinale-nord.jpg", name: "Cardinale Nord", note: "Noir / jaune • ↑ ↑" },
    { src: "/images/mark-cardinale-est.jpg", name: "Cardinale Est", note: "Noir / jaune / noir • ← →" },
    { src: "/images/mark-cardinale-sud.jpg", name: "Cardinale Sud", note: "Jaune / noir • ↓ ↓" },
    { src: "/images/mark-cardinale-ouest.jpg", name: "Cardinale Ouest", note: "Jaune / noir / jaune • → ←" },
    { src: "/images/mark-danger-isole.jpg", name: "Danger isolé", note: "Noir / rouge • ● ●" },
    { src: "/images/mark-eaux-saines.jpg", name: "Eaux saines", note: "Rouge / blanc • ●" },
    { src: "/images/mark-speciale.jpg", name: "Spéciale", note: "Jaune • X" },
    { src: "/images/mark-chenal-prefere-babord.jpg", name: "Chenal préféré à bâbord", note: "Vert + bande rouge" },
    { src: "/images/mark-chenal-prefere-tribord.jpg", name: "Chenal préféré à tribord", note: "Rouge + bande verte" },
  ];
  return (
    <div className="buoy-grid">
      {marks.map((mark) => (
        <div className="buoy-card photo" key={mark.name}>
          <AppImage src={mark.src} alt={mark.name} />
          <div>
            <strong>{mark.name}</strong>
            <span>{mark.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Sidebar({ view, setView, progress }: { view: View; setView: (v: View) => void; progress: number }) {
  const active = (type: View["type"]) => view.type === type;
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => setView({ type: "dashboard" })}>
        <span className="brand-mark">C</span>
        <span>
          <strong>Cap Côtier</strong>
          <small>Permis bateau</small>
        </span>
      </button>

      <nav className="main-nav">
        <button className={active("dashboard") ? "active" : ""} onClick={() => setView({ type: "dashboard" })}>
          <span>⌂</span> Tableau de bord
        </button>
        <button className={active("program") || active("chapter") || active("quiz") ? "active" : ""} onClick={() => setView({ type: "program" })}>
          <span>☰</span> Programme complet
        </button>
        <button className={active("vocabulary") ? "active" : ""} onClick={() => setView({ type: "vocabulary" })}>
          <span>Aa</span> Vocabulaire
        </button>
        <button className={active("exam") ? "active" : ""} onClick={() => setView({ type: "exam" })}>
          <span>✓</span> Examen blanc
        </button>
        <button className={active("flashcards") ? "active" : ""} onClick={() => setView({ type: "flashcards" })}>
          <span>⚡</span> Fiches express
        </button>
      </nav>

      <div className="sidebar-progress">
        <div className="progress-line"><span style={{ width: `${progress}%` }} /></div>
        <div><strong>{progress}%</strong><span>du parcours</span></div>
      </div>

      <button className={`source-link ${active("sources") ? "active" : ""}`} onClick={() => setView({ type: "sources" })}>
        Sources officielles
      </button>
    </aside>
  );
}

function Header({ title, subtitle, query, setQuery }: { title: string; subtitle?: string; query: string; setQuery: (s: string) => void }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">OPTION CÔTIÈRE</p>
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      <label className="search-box">
        <span>⌕</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un terme ou un cours…" />
      </label>
    </header>
  );
}

function Dashboard({ progressData, setView }: { progressData: StoredProgress; setView: (v: View) => void }) {
  const completion = Math.round((progressData.completed.length / chapters.length) * 100);
  const next = chapters.find((c) => !progressData.completed.includes(c.id)) ?? chapters[0];
  return (
    <>
      <section className="hero-card">
        <AppImage className="hero-photo" src="/images/hero-cotier.jpg" alt="Bateau de plaisance dans un chenal côtier au coucher du soleil." />
        <div className="hero-copy">
          <span className="pill">Programme officiel couvert</span>
          <h2>Apprends le code côtier<br /><em>sans te noyer dans le cours.</em></h2>
          <p>13 chapitres, lexique d'examen, quiz corrigés et examens blancs de 40 questions.</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => setView({ type: "chapter", chapterId: next.id })}>Continuer — chapitre {next.number}</button>
            <button className="secondary" onClick={() => setView({ type: "exam" })}>Lancer un examen blanc</button>
          </div>
        </div>
        <ProgressRing value={completion} />
      </section>

      <section className="stats-row">
        <article><span>📚</span><div><strong>{chapters.length}</strong><small>chapitres</small></div></article>
        <article><span>❓</span><div><strong>{allQuestions.length}</strong><small>questions originales</small></div></article>
        <article><span>Aa</span><div><strong>{lexicon.length}</strong><small>termes du lexique</small></div></article>
        <article><span>🏆</span><div><strong>{progressData.bestExam ?? "—"}</strong><small>meilleur examen /40</small></div></article>
      </section>

      <div className="section-heading">
        <div><p className="eyebrow">PARCOURS</p><h2>Les chapitres à maîtriser</h2></div>
        <button className="text-button" onClick={() => setView({ type: "program" })}>Voir tout le programme →</button>
      </div>

      <section className="chapter-grid">
        {chapters.slice(0, 6).map((chapter) => {
          const done = progressData.completed.includes(chapter.id);
          const score = progressData.quizScores[chapter.id];
          return (
            <button className="chapter-card" key={chapter.id} onClick={() => setView({ type: "chapter", chapterId: chapter.id })}>
              <div className="chapter-cover"><AppImage src={chapter.cover} alt="" /></div>
              <div className="chapter-card-body">
                <div className="chapter-icon">{chapter.icon}</div>
                <div className="chapter-content">
                  <div className="chapter-meta"><span>Chapitre {chapter.number}</span><span>{chapter.duration}</span></div>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.summary}</p>
                  <div className="chapter-status">
                    <span className={done ? "done" : "todo"}>{done ? "✓ Terminé" : "À apprendre"}</span>
                    {typeof score === "number" && <span>{score}/{chapter.questions.length} au quiz</span>}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </section>

      <section className="exam-banner vocab-banner">
        <div>
          <span className="pill">LEXIQUE</span>
          <h2>Le vocabulaire du code côtier, au même endroit.</h2>
          <p>Bâbord, abri, ASN, marnage, MAYDAY… Définitions d'examen, pas du remplissage.</p>
        </div>
        <button onClick={() => setView({ type: "vocabulary" })}>Ouvrir le vocabulaire →</button>
      </section>

      <section className="exam-banner">
        <div>
          <span className="pill dark">CONDITIONS RÉELLES</span>
          <h2>40 questions. 5 erreurs maximum.</h2>
          <p>L'examen blanc pioche dans tous les chapitres et affiche une correction détaillée à la fin.</p>
        </div>
        <button onClick={() => setView({ type: "exam" })}>Je me teste →</button>
      </section>
    </>
  );
}

function Program({ progressData, setView, query }: { progressData: StoredProgress; setView: (v: View) => void; query: string }) {
  const q = query.trim().toLowerCase();
  const filtered = chapters.filter((chapter) => {
    if (!q) return true;
    const blob = [
      chapter.title,
      chapter.summary,
      ...chapter.objectives,
      ...(chapter.glossary ?? []).flatMap((t) => [t.term, t.meaning]),
      ...chapter.sections.flatMap((s) => [
        s.title,
        s.definition ?? "",
        ...s.body,
        ...(s.remember ?? []),
        ...(s.traps ?? []),
        s.warning ?? "",
        ...(s.terms ?? []).flatMap((t) => [t.term, t.meaning]),
      ]),
    ].join(" ").toLowerCase();
    return blob.includes(q);
  });
  return (
    <>
      <div className="program-intro">
        <div><span className="pill">13 chapitres</span><h2>Le programme complet</h2><p>Travaille dans l'ordre ou attaque directement tes points faibles.</p></div>
        <div className="program-score"><strong>{progressData.completed.length}/{chapters.length}</strong><span>chapitres validés</span></div>
      </div>
      <section className="program-list">
        {filtered.map((chapter) => {
          const done = progressData.completed.includes(chapter.id);
          return (
            <button key={chapter.id} className="program-item" onClick={() => setView({ type: "chapter", chapterId: chapter.id })}>
              <span className="program-number">{String(chapter.number).padStart(2, "0")}</span>
              <span className="program-thumb"><AppImage src={chapter.cover} alt="" /></span>
              <span className="program-main"><strong>{chapter.title}</strong><small>{chapter.summary}</small></span>
              <span className="program-duration">{chapter.duration}</span>
              <span className={`program-state ${done ? "done" : ""}`}>{done ? "✓" : "→"}</span>
            </button>
          );
        })}
        {filtered.length === 0 && <div className="empty-search">Aucun chapitre ne correspond à « {query} ».</div>}
      </section>
    </>
  );
}

function ChapterView({ chapter, completed, onToggleComplete, setView }: { chapter: Chapter; completed: boolean; onToggleComplete: () => void; setView: (v: View) => void }) {
  return (
    <div className="lesson-layout">
      <main className="lesson-main">
        <button className="back" onClick={() => setView({ type: "program" })}>← Retour au programme</button>
        <div className="lesson-cover"><AppImage src={chapter.cover} alt="" /></div>
        <div className="lesson-title">
          <div className="lesson-big-icon">{chapter.icon}</div>
          <div><p className="eyebrow">CHAPITRE {chapter.number} • {chapter.duration}</p><h2>{chapter.title}</h2><p>{chapter.summary}</p></div>
        </div>

        <section className="objectives">
          <h3>À la fin de ce chapitre, tu dois savoir :</h3>
          {chapter.objectives.map((o) => <div key={o}><span>✓</span>{o}</div>)}
        </section>

        {chapter.id === "balisage" && <BuoyGallery />}
        {chapter.id === "balisage" && (
          <section className="pictogram-panel">
            <h3>Pictogrammes de plage à reconnaître</h3>
            <p>Photos et panneaux officiels : bouées jaunes, chenal, pictogrammes et pavillons. Un symbole barré d'une bande rouge = interdit. L'arrêté local prime.</p>
            <BeachPictograms />
          </section>
        )}

        {chapter.glossary && chapter.glossary.length > 0 && (
          <TermsList terms={chapter.glossary} />
        )}

        <div className="lesson-sections">
          {chapter.sections.map((section, i) => (
            <section className="lesson-section" key={section.title}>
              <div className="section-index">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3>{section.title}</h3>
                {section.definition && (
                  <div className="definition-box"><strong>Définition</strong><span>{section.definition}</span></div>
                )}
                {section.body.map((p) => <p key={p}>{p}</p>)}
                <LessonMedia images={section.images} plate={section.plate} plates={section.plates} />
                {section.terms && section.terms.length > 0 && (
                  <div className="terms-box compact">
                    <strong>Vocabulaire</strong>
                    {section.terms.map((item) => (
                      <div key={item.term}><em>{item.term}</em> — {item.meaning}</div>
                    ))}
                  </div>
                )}
                {section.remember && (
                  <div className="remember-box"><strong>🧠 À retenir</strong>{section.remember.map((r) => <span key={r}>{r}</span>)}</div>
                )}
                {section.traps && section.traps.length > 0 && (
                  <div className="trap-box">
                    <strong>Piège d'examen</strong>
                    {section.traps.map((trap) => <span key={trap}>{trap}</span>)}
                  </div>
                )}
                {section.warning && <div className="warning-box"><strong>⚠ Point de vigilance</strong><span>{section.warning}</span></div>}
              </div>
            </section>
          ))}
        </div>

        <div className="lesson-finish">
          <div><strong>Chapitre terminé ?</strong><span>Valide-le puis teste-toi immédiatement.</span></div>
          <div className="finish-actions">
            <button className={completed ? "complete active" : "complete"} onClick={onToggleComplete}>{completed ? "✓ Chapitre validé" : "Marquer comme appris"}</button>
            <button className="primary" onClick={() => setView({ type: "quiz", chapterId: chapter.id })}>Faire le quiz →</button>
          </div>
        </div>
      </main>
      <aside className="lesson-aside">
        <div className="sticky-note">
          <p className="eyebrow">EXAMEN</p>
          <strong>{chapter.questions.length} questions</strong>
          <span>Quiz de fin de chapitre avec correction immédiate.</span>
          <button onClick={() => setView({ type: "quiz", chapterId: chapter.id })}>Me tester</button>
        </div>
        <div className="sticky-note muted">
          <p className="eyebrow">RÈGLE</p>
          <strong>Comprendre avant de mémoriser</strong>
          <span>À l'examen, les situations changent. Retenir uniquement une photo ou une phrase ne suffit pas.</span>
        </div>
        <button className="aside-lexicon" onClick={() => setView({ type: "vocabulary" })}>
          Ouvrir le vocabulaire →
        </button>
      </aside>
    </div>
  );
}

function QuizView({ chapter, onSave, setView }: { chapter: Chapter; onSave: (score: number) => void; setView: (v: View) => void }) {
  const [questions] = useState(() => shuffle(chapter.questions));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const current = questions[index];
  const selected = answers[current?.id];
  const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);

  const validate = () => {
    if (selected === undefined) return;
    if (!revealed) setRevealed(true);
    else if (index < questions.length - 1) { setIndex(index + 1); setRevealed(false); }
    else { setFinished(true); onSave(score); }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <section className="result-card">
        <div className={`result-score ${pct >= 80 ? "pass" : "fail"}`}><strong>{score}/{questions.length}</strong><span>{pct}%</span></div>
        <p className="eyebrow">QUIZ TERMINÉ</p>
        <h2>{pct >= 80 ? "Chapitre bien maîtrisé." : "Encore un passage et ça va rentrer."}</h2>
        <p>Relis les explications des erreurs puis refais le quiz jusqu'à obtenir un score solide.</p>
        <div className="result-actions"><button className="secondary" onClick={() => setView({ type: "chapter", chapterId: chapter.id })}>Revoir le cours</button><button className="primary" onClick={() => setView({ type: "program" })}>Continuer le programme</button></div>
      </section>
    );
  }

  return (
    <section className="quiz-shell">
      <div className="quiz-top"><button className="back" onClick={() => setView({ type: "chapter", chapterId: chapter.id })}>← Quitter le quiz</button><span>{index + 1}/{questions.length}</span></div>
      <div className="quiz-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      <p className="eyebrow">{chapter.title.toUpperCase()}</p>
      <h2>{current.question}</h2>
      <QuestionVisual question={current} />
      <div className="choices">
        {current.choices.map((choice, i) => {
          let cls = "choice";
          if (selected === i) cls += " selected";
          if (revealed && i === current.correct) cls += " correct";
          if (revealed && selected === i && i !== current.correct) cls += " wrong";
          return <button disabled={revealed} className={cls} key={choice} onClick={() => setAnswers({ ...answers, [current.id]: i })}><span>{String.fromCharCode(65 + i)}</span>{choice}</button>;
        })}
      </div>
      {revealed && <div className={`explanation ${selected === current.correct ? "good" : "bad"}`}><strong>{selected === current.correct ? "✓ Bonne réponse" : "✕ À revoir"}</strong><span>{current.explanation}</span></div>}
      <button className="primary quiz-next" disabled={selected === undefined} onClick={validate}>{revealed ? (index === questions.length - 1 ? "Voir mon résultat" : "Question suivante →") : "Valider ma réponse"}</button>
    </section>
  );
}

function ExamView({ onSave }: { onSave: (score: number) => void }) {
  const [exam, setExam] = useState<Array<Question & { chapterId?: string; chapterTitle?: string }>>([]);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  const start = () => {
    setExam(shuffle(allQuestions).slice(0, 40));
    setAnswers({}); setIndex(0); setFinished(false); setStarted(true);
  };

  const score = exam.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
  const answered = Object.keys(answers).length;

  if (!started) return (
    <section className="exam-start">
      <AppImage className="exam-hero" src="/images/feux-face-a-face.jpg" alt="Navire à moteur vu de face de nuit, feux de route." />
      <p className="eyebrow">SIMULATION</p>
      <h2>Examen blanc côtier</h2>
      <p>40 questions tirées aléatoirement de tout le programme, avec les mêmes visuels d'identification que dans le cours. Pour être reçu dans cette simulation, vise au moins 35 bonnes réponses.</p>
      <div className="exam-rules"><div><strong>40</strong><span>questions</span></div><div><strong>5</strong><span>erreurs max.</span></div><div><strong>13</strong><span>thèmes</span></div></div>
      <button className="primary big" onClick={start}>Commencer l'examen</button>
      <small>Questions pédagogiques originales — ce simulateur n'est pas l'examen officiel.</small>
    </section>
  );

  if (finished) {
    const errors = 40 - score;
    const pass = errors <= 5;
    return (
      <section className="exam-result">
        <div className={pass ? "result-badge pass" : "result-badge fail"}>{pass ? "RÉUSSI" : "À REVOIR"}</div>
        <h2>{score}/40</h2>
        <p>{errors} erreur{errors > 1 ? "s" : ""}. {pass ? "Tu es dans la zone de réussite du format officiel." : "Il faut descendre à 5 erreurs maximum."}</p>
        <div className="review-list">
          {exam.map((q, i) => {
            const ok = answers[q.id] === q.correct;
            return <details key={q.id} className={ok ? "review ok" : "review ko"}><summary><span>{ok ? "✓" : "✕"}</span> Q{i + 1}. {q.question}</summary>{q.image && <AppImage className="review-thumb" src={q.image} alt="" />}<p><strong>Bonne réponse :</strong> {q.choices[q.correct]}</p><p>{q.explanation}</p></details>;
          })}
        </div>
        <button className="primary" onClick={start}>Refaire un examen</button>
      </section>
    );
  }

  const current = exam[index];
  return (
    <section className="exam-shell">
      <div className="exam-toolbar"><div><span>Question</span><strong>{index + 1}/40</strong></div><div><span>Répondues</span><strong>{answered}/40</strong></div><button onClick={() => setStarted(false)}>Quitter</button></div>
      <div className="quiz-progress"><span style={{ width: `${((index + 1) / 40) * 100}%` }} /></div>
      <p className="eyebrow">{current.chapterTitle?.toUpperCase()}</p>
      <h2>{current.question}</h2>
      <QuestionVisual question={current} />
      <div className="choices">
        {current.choices.map((choice, i) => <button className={`choice ${answers[current.id] === i ? "selected" : ""}`} key={choice} onClick={() => setAnswers({ ...answers, [current.id]: i })}><span>{String.fromCharCode(65 + i)}</span>{choice}</button>)}
      </div>
      <div className="exam-nav">
        <button className="secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}>← Précédente</button>
        {index < 39 ? <button className="primary" onClick={() => setIndex(index + 1)}>Suivante →</button> : <button className="primary" disabled={answered < 40} onClick={() => { onSave(score); setFinished(true); }}>Terminer l'examen</button>}
      </div>
      {index === 39 && answered < 40 && <p className="exam-hint">Réponds aux {40 - answered} question(s) restante(s) avant de terminer.</p>}
    </section>
  );
}

function Flashcards() {
  const cards = useMemo(() => chapters.flatMap((chapter) => chapter.sections.flatMap((section) => (section.remember ?? []).map((fact) => ({ chapter: chapter.title, icon: chapter.icon, fact })))), []);
  const [index, setIndex] = useState(0);
  return (
    <section className="flash-page">
      <div className="section-heading"><div><p className="eyebrow">MÉMORISATION</p><h2>Fiches express</h2></div><span>{cards.length} réflexes essentiels</span></div>
      <div className="flash-card">
        <span className="flash-icon">{cards[index]?.icon}</span>
        <p>{cards[index]?.chapter}</p>
        <h3>{cards[index]?.fact}</h3>
        <div className="flash-count">{index + 1} / {cards.length}</div>
      </div>
      <div className="flash-controls"><button className="secondary" onClick={() => setIndex((index - 1 + cards.length) % cards.length)}>← Précédente</button><button className="primary" onClick={() => setIndex((index + 1) % cards.length)}>Suivante →</button></div>
    </section>
  );
}

function Vocabulary({ query, setView }: { query: string; setView: (v: View) => void }) {
  const [category, setCategory] = useState<VocabCategoryId | "all">("all");
  const results = useMemo(() => searchLexicon(query, category), [query, category]);
  return (
    <section className="vocab-page">
      <div className="vocab-intro">
        <div>
          <span className="pill">{lexicon.length} termes</span>
          <h2>Lexique du code côtier</h2>
          <p>Les mots que l&apos;examen attend, illustrés : photo du bateau ou de la marque, plus un schéma d&apos;orientation quand ça aide (proue, poupe, bâbord, tribord…).</p>
        </div>
      </div>
      <div className="vocab-filters" role="tablist" aria-label="Catégories du lexique">
        <button className={category === "all" ? "active" : ""} onClick={() => setCategory("all")}>Tout</button>
        {vocabCategories.map((item) => (
          <button key={item.id} className={category === item.id ? "active" : ""} onClick={() => setCategory(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      {(category === "all" || category === "bord") && (
        <div className="vocab-hero-plate">
          <ExamPlate id="boat-plan" caption="Vue du dessus : le skipper regarde vers la proue. Sa gauche = bâbord = rouge. Sa droite = tribord = vert." />
          <figure className="vocab-hero-photo">
            <AppImage src="/images/vocab-cockpit-avant.png?v=2" alt="Depuis le poste de barre, regard vers l'avant : feu rouge à gauche, feu vert à droite." />
            <figcaption>Même chose depuis le volant, nez vers l&apos;avant : gauche rouge, droite verte.</figcaption>
          </figure>
        </div>
      )}
      <p className="vocab-count">{results.length} entrée{results.length > 1 ? "s" : ""}{query.trim() ? ` pour « ${query.trim()} »` : ""}</p>
      <div className="vocab-grid">
        {results.map((item) => {
          const chapter = item.chapterId ? chapters.find((c) => c.id === item.chapterId) : undefined;
          return (
            <article className="vocab-card" key={item.id}>
              {(item.image || item.plate) && (
                <div className="vocab-media">
                  {item.image && (
                    <figure className="vocab-photo">
                      <AppImage src={item.image} alt={item.imageAlt ?? item.term} />
                      {item.imageCaption && <figcaption>{item.imageCaption}</figcaption>}
                    </figure>
                  )}
                  {item.plate && (
                    <div className="vocab-plate">
                      <ExamPlate id={item.plate} caption="" />
                    </div>
                  )}
                </div>
              )}
              <div className="vocab-card-body">
                <p className="eyebrow">{vocabCategories.find((c) => c.id === item.category)?.label}</p>
                <h3>
                  {item.term}
                  {item.colorHint === "red" && (
                    <span className="side-color red" title="Couleur : rouge">
                      <i aria-hidden="true" />
                      Rouge
                    </span>
                  )}
                  {item.colorHint === "green" && (
                    <span className="side-color green" title="Couleur : vert">
                      <i aria-hidden="true" />
                      Vert
                    </span>
                  )}
                </h3>
                <p>{item.definition}</p>
                {item.exam && <div className="trap-box compact"><strong>Piège d'examen</strong><span>{item.exam}</span></div>}
                {chapter && (
                  <button className="text-button" onClick={() => setView({ type: "chapter", chapterId: chapter.id })}>
                    Voir le cours — {chapter.title} →
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {results.length === 0 && <div className="empty-search">Aucun terme ne correspond à « {query} ».</div>}
    </section>
  );
}

function Sources() {
  return (
    <section className="sources-page">
      <p className="eyebrow">BASE RÉGLEMENTAIRE</p>
      <h2>Sources utilisées pour structurer le cours</h2>
      <p>Le contenu pédagogique est rédigé spécialement pour cette application. Les thèmes et points réglementaires sont contrôlés contre des sources publiques officielles.</p>
      <div className="source-cards">
        <article><span>01</span><div><strong>Arrêté du 28 septembre 2007 — permis plaisance</strong><p>Programme officiel de l'option côtière, format de l'épreuve et formation.</p><a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000428843/" target="_blank" rel="noreferrer">Ouvrir Légifrance ↗</a></div></article>
        <article><span>02</span><div><strong>Division 240 — sécurité de la plaisance</strong><p>Matériel d'armement et de sécurité selon l'éloignement d'un abri.</p><a href="https://www.legifrance.gouv.fr/codes/section_lc/JORFTEXT000000841523/LEGISCTA000021367661/" target="_blank" rel="noreferrer">Ouvrir Légifrance ↗</a></div></article>
        <article><span>03</span><div><strong>Ministère chargé de la Mer</strong><p>Informations pratiques de sécurité, balisage et plaisance.</p><a href="https://www.mer.gouv.fr/" target="_blank" rel="noreferrer">Ouvrir mer.gouv.fr ↗</a></div></article>
      </div>
      <div className="source-warning"><strong>Important</strong><p>La réglementation peut évoluer. Avant une navigation réelle, vérifier les textes et avis locaux à jour. Cette application est un support de préparation et ne remplace pas la formation réglementaire en établissement agréé.</p></div>
      <h3 className="program-source-title">Programme couvert dans cette version</h3>
      <div className="official-program">{officialProgram.map((item) => <div key={item}><span>✓</span>{item}</div>)}</div>
    </section>
  );
}

export default function CourseApp() {
  const [view, setView] = useState<View>({ type: "dashboard" });
  const [progressData, setProgressData] = useState<StoredProgress>(emptyProgress);
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("cap-cotier-progress");
      if (saved) setProgressData(JSON.parse(saved));
    } catch { /* ignore malformed storage */ }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cap-cotier-progress", JSON.stringify(progressData));
  }, [progressData]);

  const completion = Math.round((progressData.completed.length / chapters.length) * 100);

  const toggleComplete = (chapterId: string) => setProgressData((prev) => ({
    ...prev,
    completed: prev.completed.includes(chapterId) ? prev.completed.filter((id) => id !== chapterId) : [...prev.completed, chapterId],
  }));

  const saveQuiz = (chapterId: string, score: number) => setProgressData((prev) => ({ ...prev, quizScores: { ...prev.quizScores, [chapterId]: Math.max(prev.quizScores[chapterId] ?? 0, score) } }));
  const saveExam = (score: number) => setProgressData((prev) => ({ ...prev, bestExam: Math.max(prev.bestExam ?? 0, score) }));

  let title = "Tableau de bord";
  let subtitle = "Ton parcours de préparation au permis plaisance option côtière.";
  if (view.type === "program") { title = "Programme complet"; subtitle = "Tous les thèmes à maîtriser pour le code côtier."; }
  if (view.type === "chapter") { const c = chapters.find((x) => x.id === view.chapterId); title = c?.title ?? "Cours"; subtitle = `Chapitre ${c?.number ?? ""}`; }
  if (view.type === "quiz") { title = "Quiz"; subtitle = "Valide tes connaissances immédiatement."; }
  if (view.type === "exam") { title = "Examen blanc"; subtitle = "40 questions, comme le format officiel."; }
  if (view.type === "flashcards") { title = "Fiches express"; subtitle = "Les réflexes à mémoriser."; }
  if (view.type === "vocabulary") { title = "Vocabulaire"; subtitle = "Lexique d'examen du permis côtier."; }
  if (view.type === "sources") { title = "Sources officielles"; subtitle = "D'où viennent le programme et les règles réglementaires."; }

  return (
    <div className="app-shell">
      <Sidebar view={view} setView={setView} progress={completion} />
      <div className="content-shell">
        <Header title={title} subtitle={subtitle} query={query} setQuery={setQuery} />
        <div className="page-content">
          {view.type === "dashboard" && <Dashboard progressData={progressData} setView={setView} />}
          {view.type === "program" && <Program progressData={progressData} setView={setView} query={query} />}
          {view.type === "chapter" && (() => { const chapter = chapters.find((c) => c.id === view.chapterId); return chapter ? <ChapterView chapter={chapter} completed={progressData.completed.includes(chapter.id)} onToggleComplete={() => toggleComplete(chapter.id)} setView={setView} /> : null; })()}
          {view.type === "quiz" && (() => { const chapter = chapters.find((c) => c.id === view.chapterId); return chapter ? <QuizView chapter={chapter} onSave={(score) => saveQuiz(chapter.id, score)} setView={setView} /> : null; })()}
          {view.type === "exam" && <ExamView onSave={saveExam} />}
          {view.type === "flashcards" && <Flashcards />}
          {view.type === "vocabulary" && <Vocabulary query={query} setView={setView} />}
          {view.type === "sources" && <Sources />}
        </div>
      </div>
    </div>
  );
}
