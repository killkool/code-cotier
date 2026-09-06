# Cap Côtier

Application de révision du permis plaisance **option côtière**.

## Fonctions incluses

- 13 chapitres couvrant le programme réglementaire de l'option côtière
- cours structurés et fiches « À retenir »
- mini-visuels et schémas pédagogiques
- banque de questions pédagogiques originales avec corrections
- quiz par chapitre
- examen blanc de 40 questions, réussite simulée à 35/40
- suivi de progression et meilleurs scores dans `localStorage`
- recherche dans le cours
- interface responsive desktop/mobile
- page de sources officielles

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

Pour une version de production :

```bash
npm run build
npm start
```

## Structure

- `app/page.tsx` : point d'entrée
- `components/CourseApp.tsx` : interface et logique pédagogique
- `data/course.ts` : contenu des cours et banque de questions
- `app/globals.css` : design complet responsive

## Base réglementaire

Le programme est structuré à partir de l'arrêté du 28 septembre 2007 relatif au permis plaisance, dans sa version en vigueur, du RIPAM/COLREG et des règles de sécurité de la Division 240.

Dernière passe de vérification réglementaire : **septembre 2026**.

Le contenu est un support pédagogique original. Il ne remplace pas la formation réglementaire obligatoire ni les textes officiels à jour.
