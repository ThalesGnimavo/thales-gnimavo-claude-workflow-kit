# Thales Gnimavo Claude Workflow Kit

**Run any project, technical or not, with Claude Code as a working partner.**

Download, unzip, type `claude`. Claude reads this folder, checks your machine, teaches you
the method one chapter at a time, and creates your first project with its own cockpit.
No prior experience with Claude Code is assumed.

**Release status.** This is a pre-release: `/setup` and `/learn` ship today; `/new-project`,
`/day` and the other commands, the manual, the templates and the examples arrive with
v0.1.0. `CHANGELOG.md` is the authority on what exists.

*Version française plus bas.*

## What is inside

| Folder | What it is |
|---|---|
| `CLAUDE.md` | The rules every session follows: roles, session cycle, decision levels, verification. |
| `INSTALL.md` | The five human steps before the first `claude`. |
| `.claude/skills/` | The kit's commands, loaded automatically: `/setup`, `/learn`, `/new-project`, `/day`, `/casp`, `/next`, `/cto`, `/verify`, `/notify`, `/humanizer`, `/update`, and the advanced `/chain`, `/fleet`, `/audit-batch`. |
| `docs/en/`, `docs/fr/` | The manual: a day, a session, a project, the state protocol, native commands, pitfalls. |
| `templates/` | A constitution and a cockpit for each profile: job search, book or thesis, small business, event, content creation, software project. |
| `examples/` | Two complete projects, one non-technical (a job search), one technical. |
| `my-projects/` | Yours. Each project is its own git repository with its own `CLAUDE.md` and `casp/`. |

## The method in four lines

1. **One project, one constitution.** A `CLAUDE.md` holds the goal, the invariants, the
   decisions and their reasons. The context window is finite; the project is not.
2. **One session, one slice.** Start with `/next`, ship one thing, write the next prompt,
   close. The next session must be startable by someone who has read nothing but the cockpit.
3. **State is validated, not narrated.** [`casp`](https://casp.sh) checks the recorded
   state against git and blocks the push on drift.
4. **Claude decides the reversible, you decide the rest.** Three decision levels, written
   down, so the work continues while you are away.

## Requirements

Claude Code with a paid Anthropic plan, Node.js 22 or newer, git. See `INSTALL.md`.

## Author

Juste "Thales" Gnimavo, founder of ZeroSuite, Abidjan. Seven products shipped with zero
human engineers; the method is documented at
[thalesandhisaictoclaude.com](https://thalesandhisaictoclaude.com) and the state tool at
[casp.sh](https://casp.sh). MIT license.

---

# Kit de workflow Claude de Thales Gnimavo

**Pilotez n'importe quel projet, technique ou non, avec Claude Code comme partenaire de travail.**

Téléchargez, décompressez, tapez `claude`. Claude lit ce dossier, vérifie votre machine,
vous enseigne la méthode chapitre par chapitre, et crée votre premier projet avec son
cockpit. Aucune expérience préalable de Claude Code n'est supposée.

**État de la version.** Pré-version : `/setup` et `/learn` sont livrés ; `/new-project`,
`/day` et les autres commandes, le manuel, les gabarits et les exemples arrivent avec la
v0.1.0. `CHANGELOG.md` fait foi sur ce qui existe.

## Ce qu'il contient

| Dossier | Ce que c'est |
|---|---|
| `CLAUDE.md` | Les règles que chaque session suit : rôles, cycle de session, niveaux de décision, vérification. |
| `INSTALL.md` | Les cinq étapes humaines avant le premier `claude`. |
| `.claude/skills/` | Les commandes du kit, chargées automatiquement : `/setup`, `/learn`, `/new-project`, `/day`, `/casp`, `/next`, `/cto`, `/verify`, `/notify`, `/humanizer`, `/update`, et les avancées `/chain`, `/fleet`, `/audit-batch`. |
| `docs/fr/`, `docs/en/` | Le manuel : une journée, une session, un projet, le protocole d'état, les commandes natives, les pièges. |
| `templates/` | Une constitution et un cockpit par profil : recherche d'emploi, livre ou mémoire, petite entreprise, événement, création de contenu, projet logiciel. |
| `examples/` | Deux projets complets, un non technique (une recherche d'emploi), un technique. |
| `my-projects/` | Les vôtres. Chaque projet est son propre dépôt git avec son `CLAUDE.md` et son `casp/`. |

## La méthode en quatre lignes

1. **Un projet, une constitution.** Un `CLAUDE.md` porte l'objectif, les invariants, les
   décisions et leurs raisons. La fenêtre de contexte est finie ; le projet ne l'est pas.
2. **Une session, une tranche.** Démarrer par `/next`, livrer une chose, écrire le prompt
   suivant, clore. La session suivante doit pouvoir démarrer avec le seul cockpit.
3. **L'état se valide, il ne se raconte pas.** [`casp`](https://casp.sh) confronte l'état
   enregistré à git et bloque le push en cas de dérive.
4. **Claude tranche le réversible, vous tranchez le reste.** Trois niveaux de décision,
   écrits, pour que le travail continue en votre absence.

## Prérequis

Claude Code avec un abonnement Anthropic payant, Node.js 22 ou plus, git. Voir `INSTALL.md`.

## Auteur

Juste « Thales » Gnimavo, fondateur de ZeroSuite, Abidjan. Sept produits livrés sans
ingénieur humain ; la méthode est documentée sur
[thalesandhisaictoclaude.com](https://thalesandhisaictoclaude.com) et l'outil d'état sur
[casp.sh](https://casp.sh). Licence MIT.
