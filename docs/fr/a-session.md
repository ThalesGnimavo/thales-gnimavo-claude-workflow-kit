# Une session

Une session est un temps de travail avec Claude sur un projet. Elle livre une tranche, celle
que nomme le prompt en file, et se termine par une trace écrite et le brief de la session
suivante. Elle compte quatre temps ; aucun n'est sauté, aucun n'est fusionné avec un autre.

## 1. Démarrer

`/next <project>` depuis le dossier du kit. La session lit, dans cet ordre :

1. Le `CLAUDE.md` du projet : la constitution.
2. `casp status` : le cockpit. Quelle phase est en cours, laquelle vient ensuite, quel
   fichier ouvre cette session.
3. Le prompt en file, le fichier indiqué sur la ligne `next_prompt`. Il a été écrit par la
   session précédente. Un prompt est une affirmation, pas une spécification : `/next`
   vérifie qu'il est encore `queued`, que son `next_after` nomme le dernier journal, que son
   `## CONTEXT` nomme le dernier commit, et s'arrête quand un fichier ou un état qu'il
   suppose n'existe pas. La relecture approfondie de ses affirmations contre les fichiers
   est ce que fait `/cto <project>` avant de confirmer une étape.

`/next` refuse de démarrer une étape que personne n'a confirmée comme une session ou
plusieurs. La confirmation est écrite dans `casp/state.json` par `/cto <project>` (qui relit
d'abord la file) ou par `/next <project> --solo "<reason>"`, la forme en un geste pour une
tranche que vous savez petite. Un projet qui sort de `/new-project` n'a pas encore de
confirmation ; le message de clôture de `/new-project` vous donne la commande exacte.

Puis la session dit en une phrase ce qu'elle s'apprête à faire, et commence. Elle ne
demande pas si elle doit continuer : le prompt est le périmètre.

## 2. Travailler

Une tranche. Tout ce qui est remarqué en chemin va dans `casp/roadmap.md` et y reste. Un
prompt dont la liste MUST ne tient pas en un temps de travail est signalé à voix haute avant
le premier fichier, avec la découpe proposée ; il n'est pas réduit en silence.

La section `## MUST NOT` du prompt se lit au pied de la lettre. C'est la garde contre la
dérive du périmètre.

Des questions surgissent. Chacune est classée avant d'être posée :

- **Niveau 0** : la réponse est dans le tableau `## Pre-approved decisions` de la
  constitution. Appliquée, la ligne citée.
- **Niveau 1** : conséquence externe, irréversible, engage plus d'une phase, change ce que
  vous avez validé. La session s'arrête et écrit la question en un paragraphe.
- **Niveau 2** : réversible en moins d'une session. Décidée, écrite dans le journal sous
  « Decisions taken without the user » avec un chemin de retour, et le travail continue.

## 3. Clôturer

Dans cet ordre, et l'ordre compte :

1. **Le travail est committé** (un point de sauvegarde dans git), en premier et seul.
2. **Le journal de session** est écrit sous `session-logs/`, nommé
   `YY-MM-DD-NNN-<slug>.md`. Il dit ce qui a été livré, ce qui ne l'a pas été et pourquoi,
   la sortie brute de chaque vérification, les éléments différés avec leur ligne
   `Proof due`, et les décisions prises sans vous.
3. **Le prompt suivant** est rédigé sous `docs/plan/sessions/`, `status: queued`, son
   `next_after` nommant le journal de cette session.
4. Si la phase est terminée : `casp ship <phase> --log <log id>` la marque livrée ; les
   trois pointeurs (`current_phase`, `next_phase`, `next_prompt`) sont déplacés vers la
   phase suivante. Si elle n'est pas terminée : le journal le dit dans ses premières lignes,
   le prompt reste en file, `casp/now.md` est rafraîchi.
5. `casp close` enregistre le dernier commit et le dernier journal dans l'état.
6. **L'état est committé**, second commit.

Deux commits par session : le travail, puis l'état. Regardez l'historique listé à la fin du
`README.md` de l'un ou l'autre exemple dans `examples/` : le rythme est visible dans la liste
des commits.

## 4. Vérification de sortie

`casp check` compare le cockpit avec git, une règle par ligne, PASS ou FAIL. Il sort en 0
avant tout push. Un FAIL se corrige, il ne se contourne jamais : le correctif est toujours
un fichier à écrire ou un pointeur à déplacer, et la ligne FAIL dit lequel. `the-state.md`
liste les cas courants.

## La session suivante doit pouvoir être démarrée par quelqu'un qui n'a rien lu d'autre que le cockpit

Cette phrase est le test d'une bonne clôture. Si le prompt suivant a besoin de la
conversation qui l'a écrit pour être compris, il n'est pas terminé.

## Ce qu'il faut taper

```
/next job-search
```

À la fin, la session exécute la clôture elle-même. Si vous clôturez à la main, la séquence
est :

```
casp new log --slug <slug>           # then write session-logs/<id>.md
casp new prompt --slug <next-slug>   # then write docs/plan/sessions/<FILE>.md, status: queued
casp ship <phase> --log <id>         # only when the phase is finished
# then, by hand, in casp/state.json: current_phase = <phase>, next_phase = <next-slug>,
# next_prompt = docs/plan/sessions/<FILE>.md, and <next-slug> added to phases_queued
casp close --yes
casp check
```

`casp ship` déplace la phase vers la liste des phases livrées et rien d'autre ; les trois
pointeurs sont à vous à déplacer. Sautez cette ligne et `casp close` sort en 1 (voir
`the-state.md`).

## Ce que vous devez voir

`casp status` au début d'une session, sur `examples/job-search/` le 2026-10-03 :

```
casp-managed-project · branch main · HEAD c3354bd

STATE
────────────────────────────────────────
  current_phase    phase-1-application-kit
  next_phase       phase-2-first-wave
  next_prompt      docs/plan/sessions/PHASE-2-FIRST-WAVE.md
  last_session_id  26-10-03-002-first-wave
  last_commit      489bea9

  progress  ████████████░░░░░░░░░░░░  1 shipped · 1 queued · 3 backlog

NEXT PROMPT
────────────────────────────────────────
  path     docs/plan/sessions/PHASE-2-FIRST-WAVE.md
  status   queued
  log      pending
  # Session — phase-2-first-wave : The first employer folder, sent by the owner before the next
```

`casp ship` et `casp close` à la fin d'une session qui a terminé sa phase (la première
session du même exemple) :

```
$ casp ship phase-1-application-kit --log 26-10-03-001-application-kit
        moved 'phase-1-application-kit' → phases_shipped

$ casp close --yes
        last_commit     → ebf97fa
        last_session_id → 26-10-03-001-application-kit
        updated_at      → 2026-10-03
```

Et la vérification de sortie, au vert :

```
$ casp check
casp:check · 18 PASS · 0 WARN · 0 FAIL
✓ state in sync with git. Clear for push.
```

Le journal de session qui accompagne ces lignes est
`examples/job-search/session-logs/26-10-03-001-application-kit.md`. Lisez-le une fois : sa
forme est celle qu'aura chacune de vos sessions.
