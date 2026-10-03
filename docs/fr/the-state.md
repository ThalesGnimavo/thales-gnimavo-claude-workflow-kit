# L'état

Chaque projet possède un dossier `casp/`, le cockpit. Il répond à « où en sommes-nous ? »
sans relire la conversation, et un outil, `casp`, vérifie que la réponse est vraie face à git.
Le cockpit est écrit par les sessions et lu par vous, par `/day`, par `/next`. Il tourne sur
votre machine et n'envoie rien nulle part.

## Les trois fichiers

| Fichier | Pour qui | Ce qu'il contient |
|---|---|---|
| `casp/state.json` | l'outil | la phase en cours, la suivante, le fichier qui ouvre la prochaine session, le dernier journal, le dernier commit, les listes des phases livrées, en file et en backlog |
| `casp/now.md` | vous | un écran : le focus du moment, quoi faire avec quinze minutes, une heure, une demi-journée, et par quoi ne pas se laisser distraire |
| `casp/roadmap.md` | les deux | les trois prochaines choses à livrer dans l'ordre, ce qui est bloqué et pourquoi, le tableau des phases |

`casp/templates/` contient les gabarits vierges que `casp new log` et `casp new prompt`
recopient ; `casp/README.md` est le protocole de l'outil lui-même. Ni l'un ni l'autre ne se
modifie à la main.

Deux dossiers accompagnent le cockpit : `docs/plan/sessions/`, un fichier par prompt de
session, et `session-logs/`, un fichier par journal de session. Un prompt porte une ligne
`status:` dans son en-tête (`queued`, puis `shipped`) et une ligne `next_after:` qui nomme le
journal qui l'a rédigé. Un journal porte une ligne `phase:` qui nomme la phase qu'il a livrée,
ou aucune quand il n'a livré aucune phase.

## Les mots

- Une **phase** est une tranche nommée du projet : `phase-1-application-kit`.
- Un **prompt** est le brief d'une session, écrit par la précédente.
- Un **journal** est le compte rendu d'une session, écrit à sa clôture.
- **Ship** marque une phase comme livrée : `casp ship <phase> --log <log id>`.
- **Close** écrit l'état de fin de session : `casp close`.
- **Check** compare l'état avec git : `casp check`.

## `casp status`

Lancez-le depuis le dossier du projet. Il affiche l'état, les premières lignes du prochain
prompt, les commits récents et le focus du moment, dans cet ordre. Les deux lignes qui
comptent au début d'une session sont `next_phase` et `next_prompt` ; les deux qui comptent à
la fin sont `last_session_id` et `last_commit`.

## `casp check`

Une ligne par règle, PASS, WARN ou FAIL. Un WARN ne bloque pas. Un FAIL bloque le push
jusqu'à sa correction, et sa seconde ligne dit comment. Les règles se répartissent en quatre
groupes :

1. L'état a ses champs (`updated_at`, `last_session_id`, `last_commit`, les phases,
   `next_phase`, `next_prompt`).
2. Le prochain prompt existe et est `queued` ; le cockpit, une fois qu'il a livré quelque
   chose, nomme toujours quelque chose à démarrer.
3. Chaque journal et chaque phase livrée se répondent : `last_session_id` a un fichier,
   chaque phase livrée a un journal qui la déclare, chaque prompt livré pointe vers son
   journal, la chaîne `next_after` est cohérente.
4. Git est d'accord : `last_commit` existe dans l'historique, les fichiers d'état sont
   committés.

## Les FAIL courants et leur correctif

Chaque ligne ci-dessous a été provoquée sur une copie de `examples/job-search/` le
2026-10-03 et est citée telle qu'affichée ; la dernière a été lue sur le cockpit du kit
lui-même le même jour.

**Le prochain prompt a déjà été livré.** La session a livré sa phase mais a laissé
`next_prompt` pointer vers le prompt qu'elle venait de livrer.

```
FAIL  CASP-PROMPT-003 next_prompt is already SHIPPED · docs/plan/sessions/PHASE-1-APPLICATION-KIT.md has status: shipped — casp was not bumped after that session
      → either update state.json.next_prompt to the real next slice, or re-execute the shipped prompt explicitly
```

Correctif : rédigez le prochain prompt s'il n'existe pas, puis déplacez `next_phase` et
`next_prompt` vers lui. `casp close` sort en code 1 tant que ce FAIL subsiste ; ce code de
sortie est un vrai signal, pas du bruit.

**Le journal nommé par l'état n'existe pas.** `last_session_id` nomme un fichier qui n'a
jamais été écrit, ou qui a été écrit sous un autre nom.

```
FAIL  CASP-SESSION-001 last_session_id does not map to a session log · expected session-logs/26-10-03-002-first-wave.md
      → write the session log (try `npx @justethales/casp new log --slug <slug>`) OR fix last_session_id
```

Correctif : écrivez le journal, ou corrigez l'identifiant. `casp new log --slug <slug>` crée
le fichier avec le bon nom.

**Le dernier commit n'est pas dans git.** Un SHA a été tapé à la main, ou l'historique a été
réécrit.

```
FAIL  CASP-GIT-001 last_commit not found in git · state=abc1234 does not exist in this repo
      → set state.last_commit to a real SHA (HEAD = c3354bd)
```

Correctif : `casp close` le renseigne depuis git ; ne le tapez jamais.

**L'état est modifié mais pas committé.** Un WARN, pas un FAIL, mais le push laisserait le
dépôt distant en retard sur le cockpit.

```
WARN  CASP-WORKTREE-001 casp / sessions / logs have uncommitted changes · M casp/now.md
```

Correctif : le commit d'état, second commit de la session.

**Le dernier commit est en retard sur HEAD.** Un WARN aussi. Il apparaît quand du travail a
été committé après le commit d'état, ce qui est la forme normale au début de la session
suivante.

```
WARN  CASP-GIT-001 last_commit is in history but not at HEAD · state=7cda8c9 HEAD=9318249
      → if the new commits are out-of-band work, bump state.last_commit to 9318249
```

Rien à corriger avant une session ; `casp close` à sa fin déplace le pointeur.

## Quand la phase n'est pas terminée

Une session qui a manqué de temps, ou qui s'est arrêtée sur une question à laquelle vous seul
pouvez répondre, ne livre pas. Son journal le dit dans ses premières lignes ; `next_prompt`
reste où il était, toujours `queued` ; `casp/now.md` est rafraîchi ; `casp close` enregistre
le journal et le commit ; `casp check` reste vert. La seconde session de
`examples/job-search/` est ce cas : la première candidature est à `ready`, son propriétaire
ne l'a pas envoyée, la phase attend.

## Ce qu'il faut taper

Depuis le dossier du projet, ou via `/casp <project>` depuis le dossier du kit :

```
casp status
casp check
```

## Ce que vous devez voir

Juste après `/new-project`, avant toute session, le compte est `14 PASS · 2 WARN · 0 FAIL`.
Les deux WARN disent que `last_session_id` et `last_commit` valent encore `pending` : rien
n'a encore été travaillé. Ils disparaissent à la clôture de la première session. Observé
sur deux projets neufs le 2026-10-03 (session 006). Un projet qui a vécu quelques sessions
montre ceci :

`casp check` sur `examples/job-search/` le 2026-10-03, toutes les lignes :

```
casp:check · 18 PASS · 0 WARN · 0 FAIL
──────────────────────────────────────────────────────────────────────
  PASS  state.json has 'updated_at'
  PASS  state.json has 'last_session_id'
  PASS  state.json has 'last_commit'
  PASS  state.json has 'current_phase'
  PASS  state.json has 'phases_shipped'
  PASS  state.json has 'next_phase'
  PASS  state.json has 'next_prompt'
  PASS  the cockpit has shipped and still names something to start
  PASS  next_prompt file exists · docs/plan/sessions/PHASE-2-FIRST-WAVE.md
  PASS  next_prompt status is 'queued' · docs/plan/sessions/PHASE-2-FIRST-WAVE.md
  PASS  last_session_id has a matching session log · session-logs/26-10-03-002-first-wave.md
  PASS  every shipped phase has a declaring session log · all 1 shipped phase(s)
  PASS  last_commit is the parent of HEAD (state-bump commit) · state=489bea9 HEAD=c3354bd touches only the state surface
  PASS  phases_shipped is unique (1 entries)
  PASS  all 2 prompt(s) have canonical status
  PASS  every shipped prompt has a session_log pointer
  PASS  the queued next_after chain is coherent · 1 chained prompt(s)
  PASS  casp + sessions + logs are committed

✓ state in sync with git. Clear for push.
```

La treizième ligne est la signature d'une clôture propre : le dernier commit est le travail,
HEAD est le commit d'état juste après lui, et ce commit n'a touché que l'état.
