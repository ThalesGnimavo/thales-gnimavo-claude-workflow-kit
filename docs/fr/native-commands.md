# Les commandes natives

Les commandes ci-dessous appartiennent à Claude Code lui-même, pas au kit. Les commandes
du kit (`/next`, `/casp`, `/day` …) vivent dans `.claude/skills/` et sont listées dans le
`CLAUDE.md` racine. Cette fiche existe parce que le `CLAUDE.md` racine et `pitfalls.md`
nomment cinq commandes natives (`/compact`, `/context`, `/rewind`, `/model`, `/schedule`)
et qu'une première semaine en rencontre quelques autres.

## Vérifiée sur quelle version, et comment

- **Version.** `claude --version` a affiché `2.1.288 (Claude Code)` le 2026-10-03 (macOS,
  cask Homebrew `claude-code@latest`).
- **Méthode.** Claude Code embarque sa table de commandes dans le binaire installé. Chaque
  ligne ci-dessous a été lue dans cette table (`strings` sur le binaire, puis recherche de
  `name:"<commande>",description:"…"`) : la description en une ligne est celle du
  programme, pas un souvenir. Trois commandes ont aussi été lancées depuis une session non
  interactive (`claude -p "/<commande>"`) : les résultats bruts sont sous « Ce que vous
  devez voir ».
- **Limite.** Une description lue dans le binaire prouve que la commande existe dans cette
  version. Elle ne prouve pas ce que l'écran affiche quand vous la tapez : cette partie est
  interactive, et cette fiche a été écrite depuis une session sans écran. Les commandes dont
  le comportement n'a pas été observé sont listées sous « À confirmer sur votre machine »,
  avec la commande qui les confirme.

Votre version peut différer. Tapez `/help` dans une session interactive et comparez : une
commande listée ici que `/help` n'affiche pas a été renommée ou retirée dans votre
version ; faites confiance à `/help`.

## Celles dont le manuel dépend

| Commande | Ce qu'elle fait (les mots de Claude Code, 2.1.288) | Quand le kit s'en sert |
|---|---|---|
| `/compact` | Free up context by summarizing the conversation so far | quand Claude dit que le contexte s'allonge et que la tranche n'est pas finie ; elle gagne du temps, elle ne remplace pas une clôture (`pitfalls.md`, piège 3) |
| `/context` | Visualize current context usage as a colored grid | avant de choisir entre « finir la tranche » et « clôturer maintenant » |
| `/rewind` | alias `/checkpoint`, `/undo` dans la table ; pas de description. Formulation de ce manuel : restaure le code, la conversation, ou les deux, à un message antérieur | après une mauvaise modification, avant le prompt suivant ; interactive seulement (`supportsNonInteractive: false` dans la table) |
| `/model` | Set model for this session (not persisted) | nommée dans le `CLAUDE.md` racine ; se choisit une fois par session, « not persisted » est le mot du programme |
| `/schedule` | alias `/routines` ; create and manage scheduled remote Claude Code agents | non utilisée par les commandes du kit ; `/chain` tourne en local et n'a besoin d'aucune planification |

## Celles qu'une première semaine rencontre

| Commande | Ce qu'elle fait (les mots de Claude Code, 2.1.288) |
|---|---|
| `/help` | Show help and available commands |
| `/clear` | Start a new session with empty context; previous session stays on disk (resumable with `/resume`) |
| `/resume` | Resume a previous conversation |
| `/exit` (alias `/quit`) | quitter la session |
| `/status` | Show Claude Code status including version, model, account, API connectivity, and tool statuses |
| `/usage` (alias `/cost`, `/stats`) | Show session cost, plan usage, and activity stats |
| `/permissions` (alias `/allowed-tools`) | Manage allow and deny tool permission rules |
| `/config` | Open settings |
| `/mcp` | Manage MCP servers |
| `/memory` | Edit CLAUDE.md files and memory settings |
| `/skills` | List available skills (les commandes du kit devraient y apparaître ; à confirmer ci-dessous) |
| `/doctor` (alias `/checkup`) | vérifie l'installation ; la description est calculée à l'exécution |
| `/init` | écrit un premier `CLAUDE.md` pour un dossier ; `/new-project`, du kit, le fait pour vous depuis un gabarit |
| `/plan` | Enable plan mode or view the current session plan |
| `/btw` | Ask a quick side question without interrupting the main conversation |
| `/version` | Print the version this session is running (not what autoupdate downloaded) |
| `/release-notes` | ce qui a changé dans Claude Code ; interactive seulement |
| `/login`, `/logout` | se connecter à son compte Anthropic, ou s'en déconnecter |
| `/bug`, `/feedback` | Report a bug or share your conversation; envoyer un retour à Anthropic |

Six d'entre elles n'ont pas de description dans la table (`/rewind`, `/exit`, `/doctor`,
`/init`, `/release-notes`, `/login`) : le programme construit le texte à l'exécution selon
vos réglages. Pour celles-là, la formulation ci-dessus est celle de ce manuel, pas celle du
programme.

## Ce qu'il faut taper

Dans une session interactive, depuis le dossier du kit :

```
claude
/help
/context
/skills
```

Depuis un terminal, pour confirmer la version contre laquelle cette fiche a été vérifiée :

```
claude --version
```

## Ce que vous devez voir

`claude --version`, 2026-10-03 :

```
2.1.288 (Claude Code)
```

Les trois mêmes commandes depuis une session non interactive (`claude -p`), 2026-10-03. La
première est instructive : `/version` n'est pas dans la table non interactive, Claude l'a
donc lue comme une question et a répondu depuis le dossier ; les deux autres affichent le
refus du programme lui-même.

```
### claude -p "/version"
`/version` n'est pas une commande installée ici. Voici les versions relevées :
[a table of kit, casp and Claude Code versions]

### claude -p "/status"
/status isn't available in this environment.

### claude -p "/help"
/help isn't available in this environment.
```

Leçon : les commandes natives sont faites pour l'écran interactif. Les commandes du kit
(`/next`, `/casp` …) sont des skills et fonctionnent dans les deux modes ; c'est ainsi que
`/chain` les lance.

## À confirmer sur votre machine

Non observé depuis cette session ; lancez la commande et comparez avec la table.

- `/help` : la liste qu'elle affiche fait autorité pour votre version. Si `/rewind`,
  `/compact` ou `/context` manquent, notez la version et lisez les notes de version.
- `/rewind` : ouvrez-la une fois sur une modification sans importance pour voir les trois
  choix (restaurer le code, restaurer la conversation, restaurer les deux) avant d'en avoir
  besoin dans l'urgence.
- `/skills` : les commandes du kit (`/next`, `/casp`, `/day` …) doivent figurer dans la
  liste ; sinon, `claude` a été lancé depuis un autre dossier que celui du kit.
- `/model` : ouvrez-la une fois pour voir quels modèles votre offre propose et ce que
  « not persisted » signifie chez vous (une nouvelle session repart sur le modèle par défaut).
- `/permissions` : vérifiez que les règles du `.claude/settings.json` du kit apparaissent
  dans la liste des autorisations.
- `/doctor` : lancez-la une fois après `/setup` ; c'est la vérification de l'installation
  par le programme lui-même.
