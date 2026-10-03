# Un projet

Un projet est un dossier sous `my-projects/` avec une constitution (`CLAUDE.md`), un
cockpit (`casp/`) et son propre historique git. `/new-project` en crée un à partir d'un
profil, avec vos réponses, et prouve qu'il est démarrable avant de se terminer. Vous
n'écrivez jamais une constitution depuis une page blanche.

## Les six profils

| Profil | Pour | Première phase |
|---|---|---|
| `job-search` | candidatures, lettres, relances et entretiens, suivis jusqu'à la signature d'un contrat ; l'assistant prépare tout et n'envoie rien | kit de candidature : documents maîtres, fichier de suivi, règles de contenu |
| `book-or-thesis` | un texte long avec des chapitres, des sources et une échéance ; l'assistant structure, questionne et corrige, la voix et les affirmations restent celles de l'auteur | plan, sources sur disque, règles d'écriture |
| `small-business` | offres, prix, clients, devis, factures et tâches récurrentes ; rien n'atteint un client, un fournisseur, une banque ou une administration sans le propriétaire | base d'exploitation : ce qui est vendu, à qui, à quel prix, avec quelles tâches récurrentes |
| `event` | une conférence, un mariage, un lancement, un atelier ou un voyage avec une date, un lieu, des prestataires et un budget ; confirmations écrites pour chaque engagement | périmètre, date, enveloppe budgétaire, la liste des décisions |
| `content-creation` | une newsletter, un blog, une chaîne ou une présence sociale avec un rythme ; des briefs avant les brouillons, des sources derrière les faits ; l'assistant rédige et ne publie jamais | base éditoriale : audience, voix, piliers, calendrier |
| `software` | une base de code avec une vérification de sortie (tests, build, lint) qui doit passer avant tout push ; rien n'est publié, déployé ni payé sans le propriétaire | squelette fonctionnel : la vérification de sortie tourne, un parcours de bout en bout fonctionne |

Les six partagent une règle : Claude prépare, vous envoyez, signez, payez, publiez ou
poussez. Chaque profil est un dossier sous `templates/` avec trois fichiers ;
`templates/README.md` dit comment en ajouter un septième.

## Ce que `/new-project` demande

Une question à la fois, en conversation ordinaire, jamais sous forme de formulaire :

1. Le projet en deux ou trois phrases. Conservé mot pour mot.
2. La première chose à faire. Le profil en propose une ; vous la confirmez ou la remplacez.
3. Les questions propres au profil, trois ou quatre. Pour `job-search` : le poste visé,
   votre situation actuelle, où et comment vous cherchez. Pour `software` : la pile
   technique, les commandes qui doivent passer avant un push, comment il atteint les
   utilisateurs.

Une réponse vide est redemandée une fois, puis la commande s'arrête : une constitution
avec un blanc est une règle que personne n'a acceptée. Votre formulation n'est jamais
réécrite, accents compris.

## Ce qu'il écrit

```
my-projects/<name>/
  CLAUDE.md                          the constitution, from the profile and your answers
  README.md                          five lines
  casp/                              the cockpit: state.json, now.md, roadmap.md
  docs/plan/sessions/PHASE-1-<SLUG>.md   the first queued prompt
```

La constitution contient, dans cet ordre : identité, règle numéro un, invariants (chacun
avec le défaut qu'il évite), organisation des fichiers, sources de vérité, cycle de
session, `## Pre-approved decisions`, ce qui alerte le propriétaire, et une liste de dette.
Trois titres doivent rester tels quels : `## Pre-approved decisions` et `## Gate`
(logiciel uniquement, une commande par ligne) sont lus par leur nom par d'autres
commandes ; `## Not done yet and should be` est l'endroit où les sessions ajoutent la
dette qu'elles rencontrent.

Le premier prompt est la première phase du profil, avec vos réponses à l'intérieur,
`status: queued`. Les autres phases du profil sont listées en backlog dans le cockpit.

## La langue de la constitution

Les six modèles sont écrits en anglais ; vos réponses sont conservées dans la langue où
vous les avez données. Un propriétaire francophone obtient donc une constitution en
anglais avec des phrases en français à l'intérieur. C'est une décision, pas un oubli :

- Les commandes du kit lisent la constitution par ses titres. Un seul jeu de titres, dans
  une seule langue, c'est une seule chose à maintenir juste.
- Claude vous répond dans la langue où vous écrivez, quelle que soit la langue de la
  constitution (`CLAUDE.md` racine, bloc `<language>`). La constitution est lue par Claude
  bien plus souvent que par vous.
- Douze fichiers de plus à tenir à jour en même temps que les fichiers anglais coûteraient
  à chaque version plus qu'ils n'apporteraient à un utilisateur débutant.

Si vous voulez la constitution de votre projet en français, demandez-le dès la première
session : « Traduis `CLAUDE.md` en français, en gardant les trois titres
`## Pre-approved decisions`, `## Gate` et `## Not done yet and should be` exactement tels
quels. » C'est une décision de niveau 2 dans ce projet : une session, un commit,
réversible.

## Ce qu'il prouve avant de se terminer

Trois commandes, leur sortie affichée pour vous :

```
grep -rn '{{' my-projects/<name>/ --include='*.md' | wc -l      # must print 0
(cd my-projects/<name> && casp check --quiet; echo "exit=$?")     # must print exit=0
(cd my-projects/<name> && casp status --plain | sed -n '1,12p')
```

Un `{{` qui reste est un espace réservé que vous n'avez jamais vu ; un `casp check` au
rouge est un cockpit qui ment dès le premier jour. Ni l'un ni l'autre n'a le droit de
survivre à la commande.

## Après `/new-project`

Le projet n'a pas de dépôt distant : rien ne quitte votre machine tant que vous n'en créez
pas un, et c'est une décision de niveau 1 que vous prenez. Le message de clôture donne la
commande suivante : `/next <name> --solo "first slice of a new project"` pour démarrer
maintenant, ou `/cto <name>` pour faire relire le plan d'abord.

Lisez la constitution une fois, une minute. Puis démarrez.

## Ce qu'il faut taper

```
/new-project job-search --profile job-search
```

Sans `--profile`, le menu liste les six profils avec une ligne chacun, ceux qui
correspondent à votre type de travail en premier.

## Ce que vous devez voir

Les trois preuves, telles qu'affichées le 2026-10-03 pour un projet créé à partir du
profil `job-search` (celui figé sous `examples/job-search/`) :

```
       0            # grep -rn '{{' | wc -l
exit=0              # casp check --quiet

casp-managed-project · branch main · HEAD 132bd58

STATE
────────────────────────────────────────
  current_phase    phase-0-init
  next_phase       phase-1-application-kit
  next_prompt      docs/plan/sessions/PHASE-1-APPLICATION-KIT.md
  last_session_id  pending
  last_commit      pending

  progress  ........................  0 shipped - 1 queued - 4 backlog
```

`pending` sur les deux dernières lignes est normal le premier jour : aucune session n'a
encore tourné. Le premier `/next` les remplit.
