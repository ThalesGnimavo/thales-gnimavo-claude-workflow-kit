# Thales Gnimavo Claude Workflow Kit

**Run any project, technical or not, with Claude Code as a working partner.**

Three human steps (`INSTALL.md`), then type `claude`. Claude reads this folder, checks your machine, teaches you
the method one chapter at a time, and creates your first project with its own cockpit.
No prior experience with Claude Code is assumed.

**Release status.** This is a pre-release: every command of the table below, the six
templates, the manual in English and in French (`docs/en/`, `docs/fr/`, six chapters each,
native commands checked against Claude Code 2.1.288) and the two examples ship today. What
remains before v0.1.0 is the blank-machine test and the download page. `CHANGELOG.md` is
the authority on what exists.

*Version française plus bas.*

## What is inside

| Folder | What it is |
|---|---|
| `CLAUDE.md` | The rules every session follows: roles, session cycle, decision levels, verification. |
| `INSTALL.md` | The three human steps before the first `claude`; Claude installs the rest with you. |
| `.claude/skills/` | The kit's commands, loaded automatically: `/thales:setup`, `/thales:learn`, `/thales:new-project`, `/thales:day`, `/thales:casp`, `/thales:next`, `/thales:cto`, `/thales:verify`, `/thales:notify`, `/thales:humanizer`, `/thales:update`, and the advanced `/thales:chain`, `/thales:fleet`, `/thales:audit-batch`. |
| `docs/en/`, `docs/fr/` | The manual: a day, a session, a project, the state protocol, native commands, pitfalls. |
| `templates/` | A constitution and a cockpit for each profile: job search, book or thesis, small business, event, content creation, software project. |
| `examples/` | Two complete projects, one non-technical (a job search), one technical. |
| `my-projects/` | Yours. Each project is its own git repository with its own `CLAUDE.md` and `casp/`. |

## The method in four lines

1. **One project, one constitution.** A `CLAUDE.md` holds the goal, the invariants, the
   decisions and their reasons. The context window is finite; the project is not.
2. **One session, one slice.** Start with `/thales:next`, ship one thing, write the next prompt,
   close. The next session must be startable by someone who has read nothing but the cockpit.
3. **State is validated, not narrated.** [`casp`](https://casp.sh) checks the recorded
   state against git and blocks the push on drift.
4. **Claude decides the reversible, you decide the rest.** Three decision levels, written
   down, so the work continues while you are away.

## Requirements

Claude Code with a paid Anthropic plan. Node.js 22 or newer, for the `casp` state tool, not for
Claude: Claude installs it with you. Git: required by Claude Code on Windows only; on macOS
Claude installs it if missing. See `INSTALL.md`.

## Already using Claude Code with your own skills?

Every kit command is a skill of a project plugin named `thales`, so it is typed
`/thales:next`, `/thales:casp`, `/thales:setup` … A personal `/next` or `/casp` under
`~/.claude/skills/` keeps working beside them: the plugin namespace is the one mechanism
Claude Code guarantees against a name collision, with personal, project or native commands.
Two conditions, both from the Claude Code documentation: start `claude` at the kit root,
and accept the trust dialog for this folder. One reserved name: a personal
`~/.claude/skills/thales/` with a manifest would shadow the kit's plugin.

## Author

Juste "Thales" Gnimavo, founder of ZeroSuite, Abidjan. Seven products shipped with zero
human engineers; the method is documented at
[thalesandhisaictoclaude.com](https://thalesandhisaictoclaude.com) and the state tool at
[casp.sh](https://casp.sh). MIT license.

---

# Kit de workflow Claude de Thales Gnimavo

**Pilotez n'importe quel projet, technique ou non, avec Claude Code comme partenaire de travail.**

Trois étapes humaines (`INSTALL.md`), puis tapez `claude`. Claude lit ce dossier, vérifie votre machine,
vous enseigne la méthode chapitre par chapitre, et crée votre premier projet avec son
cockpit. Aucune expérience préalable de Claude Code n'est supposée.

**État de la version.** Pré-version : toutes les commandes du tableau ci-dessous, les six
gabarits, le manuel en anglais et en français (`docs/en/`, `docs/fr/`, six chapitres
chacun, commandes natives vérifiées contre Claude Code 2.1.288) et les deux exemples sont
livrés. Restent avant la v0.1.0 le test sur machine vierge et la page de téléchargement.
`CHANGELOG.md` fait foi sur ce qui existe.

## Ce qu'il contient

| Dossier | Ce que c'est |
|---|---|
| `CLAUDE.md` | Les règles que chaque session suit : rôles, cycle de session, niveaux de décision, vérification. |
| `INSTALL.md` | Les trois étapes humaines avant le premier `claude` ; Claude installe le reste avec vous. |
| `.claude/skills/` | Les commandes du kit, chargées automatiquement : `/thales:setup`, `/thales:learn`, `/thales:new-project`, `/thales:day`, `/thales:casp`, `/thales:next`, `/thales:cto`, `/thales:verify`, `/thales:notify`, `/thales:humanizer`, `/thales:update`, et les avancées `/thales:chain`, `/thales:fleet`, `/thales:audit-batch`. |
| `docs/fr/`, `docs/en/` | Le manuel : une journée, une session, un projet, le protocole d'état, les commandes natives, les pièges. |
| `templates/` | Une constitution et un cockpit par profil : recherche d'emploi, livre ou mémoire, petite entreprise, événement, création de contenu, projet logiciel. |
| `examples/` | Deux projets complets, un non technique (une recherche d'emploi), un technique. |
| `my-projects/` | Les vôtres. Chaque projet est son propre dépôt git avec son `CLAUDE.md` et son `casp/`. |

## La méthode en quatre lignes

1. **Un projet, une constitution.** Un `CLAUDE.md` porte l'objectif, les invariants, les
   décisions et leurs raisons. La fenêtre de contexte est finie ; le projet ne l'est pas.
2. **Une session, une tranche.** Démarrer par `/thales:next`, livrer une chose, écrire le prompt
   suivant, clore. La session suivante doit pouvoir démarrer avec le seul cockpit.
3. **L'état se valide, il ne se raconte pas.** [`casp`](https://casp.sh) confronte l'état
   enregistré à git et bloque le push en cas de dérive.
4. **Claude tranche le réversible, vous tranchez le reste.** Trois niveaux de décision,
   écrits, pour que le travail continue en votre absence.

## Prérequis

Claude Code avec un abonnement Anthropic payant. Node.js 22 ou plus, pour l'outil d'état `casp`,
pas pour Claude : Claude l'installe avec vous. Git : exigé par Claude Code sous Windows
seulement ; sous macOS, Claude l'installe s'il manque. Voir `INSTALL.md`.

## Vous utilisez déjà Claude Code avec vos propres skills ?

Chaque commande du kit est un skill d'un plugin de projet nommé `thales` : on tape
`/thales:next`, `/thales:casp`, `/thales:setup` … Un `/next` ou un `/casp` personnel sous
`~/.claude/skills/` continue de fonctionner à côté : l'espace de noms de plugin est le seul
mécanisme que Claude Code garantit contre une collision de noms, avec les commandes
personnelles, de projet ou natives. Deux conditions, toutes deux issues de la documentation
de Claude Code : lancer `claude` à la racine du kit, et accepter le dialogue de confiance
pour ce dossier. Un nom réservé : un `~/.claude/skills/thales/` personnel avec manifeste
masquerait le plugin du kit.

## Auteur

Juste « Thales » Gnimavo, fondateur de ZeroSuite, Abidjan. Sept produits livrés sans
ingénieur humain ; la méthode est documentée sur
[thalesandhisaictoclaude.com](https://thalesandhisaictoclaude.com) et l'outil d'état sur
[casp.sh](https://casp.sh). Licence MIT.
