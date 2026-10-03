# Les pièges

Les erreurs de la première semaine, chacune avec la commande ou la ligne qui la rattrape. Les
trois premières sont celles que tout le monde commet ; les autres ont été rencontrées pendant
que les deux exemples de `examples/` étaient joués, le 2026-10-03.

## 1. Tout demander d'un coup

« Écris tout le plan d'affaires. » La réponse est longue, vague et invérifiable, et la
session se termine sans rien qu'une seconde session puisse contrôler. Une tranche par
session, celle que le prompt nomme.

Ce qui le rattrape : la liste `## MUST` du prompt. Une session qui ne peut pas la tenir en
une seule traite le dit avant le premier fichier et propose la découpe. Si l'un de vos prompts
a huit MUST, découpez-le vous-même avant `/next`.

## 2. Croire « c'est fait »

« Fait », « envoyé », « testé », « corrigé » sont des affirmations. Un code de sortie aussi :
l'export du CV de `examples/job-search/` a rendu le code 0 et le PDF portait encore les
marques de titre Markdown ; le script de test de `examples/software/` était faux à sa
première exécution et la vérification de sortie était rouge. Les deux ont été rattrapés en
lisant la sortie, pas le statut.

Ce qui le rattrape : deux questions à chaque rapport. « Montre-moi la sortie brute. »
« Qu'as-tu vérifié, et qu'as-tu déduit ? » Dans le journal, le bloc `## Verify` contient les
commandes et ce qu'elles ont affiché ; un élément sans sortie dessous n'est pas fait. Quand
la preuve est hors de portée, le journal porte
`Proof due: <what> — on <where> — blocked by <what is missing>`, et l'élément reste ouvert.

## 3. Laisser la session tourner des heures

La mémoire de travail de Claude se remplit. Après quelques heures, il travaille à partir d'un
résumé de son propre travail antérieur, et la qualité chute sans prévenir. Fermez, puis
ouvrez une nouvelle session : l'état est dans les fichiers.

Ce qui le rattrape : `/context` montre la part utilisée. Quand Claude dit que le contexte
s'allonge, terminez la tranche, clôturez proprement et recommencez. `/compact` gagne du
temps ; il ne remplace pas une clôture.

## 4. Lancer `claude` à l'intérieur d'un projet

Les commandes et les permissions du kit se chargent depuis le dossier du kit. Lancé dans
`my-projects/<name>/`, Claude n'en a aucune : pas de `/next`, pas de `/day`, et la
constitution du projet seule.

Ce qui le rattrape : tapez `/`. Si `/next` n'est pas dans la liste, vous êtes dans le mauvais
dossier. Chaque commande prend le nom du projet en argument depuis le dossier du kit.

## 5. Croire le prompt

Le prompt a été écrit par la session précédente, d'après ce qu'elle croyait à ce moment-là.
« Les masters existent » peut être vrai, ou peut être ce que cette session avait l'intention
de faire. Les règles racines disent de rejouer les assertions d'un prompt face aux fichiers
avant de les croire ; `/cto <project>` est la commande qui le fait à fond, et `/next`
s'arrête quand un fichier ou un état que le prompt suppose n'existe pas.

Ce qui le rattrape : la section `## CONTEXT` du prompt nomme le dernier commit. Si
l'historique l'a dépassé, le prompt est peut-être périmé ; `/next` le dit avant de démarrer.

## 6. Déplacer les pointeurs dans le mauvais ordre

`casp ship` marque une phase comme livrée mais ne déplace aucun pointeur. Lancez `casp close`
juste après, avec `next_prompt` pointant encore vers le prompt qui vient d'être livré, et il
sort en code 1 avec `CASP-PROMPT-003`. La session suivante réexécuterait une phase terminée.

Ce qui le rattrape : `casp close` lui-même. Le code 1 est le signal ; rédigez le prochain
prompt, déplacez `next_phase` et `next_prompt`, puis clôturez de nouveau. `a-session.md`
donne la séquence complète.

## 7. Un commit au lieu de deux

Le travail et l'état committés ensemble font pointer le `last_commit` du cockpit vers un
commit qui a aussi changé le code, et la treizième ligne de `casp check` (« last_commit is
the parent of HEAD, touches only the state surface », soit : le dernier commit est le parent
de HEAD et ne touche que l'état) ne tient plus. C'est un WARN, pas un FAIL (provoqué sur une
copie de `examples/job-search/` le 2026-10-03 :
`WARN  CASP-GIT-001 last_commit is in history but not at HEAD`), mais l'historique cesse de
dire quel commit a livré quoi.

Ce qui le rattrape : le rythme à deux commits dans l'historique listé à la fin du `README.md`
de chaque exemple. Le travail d'abord, l'état ensuite.

## 8. Envoyer

Chaque profil a la même règle numéro un : Claude prépare, vous envoyez, signez, payez,
publiez ou poussez. Une session qui « pourrait l'envoyer maintenant » est devant une question
de niveau 1 et doit s'arrêter. Si elle ne s'est pas arrêtée, il manque une ligne à la
constitution.

Ce qui le rattrape : le tableau `## Pre-approved decisions` de la constitution. Le profil
`job-search` porte la ligne « Send an e-mail, submit a form, post on a job board?
Never. » (envoyer un courriel, soumettre un formulaire, publier sur un site d'offres ?
Jamais). Lisez le vôtre une fois ; ajoutez la ligne qui manque à votre projet.

## 9. Réparer la vérification de sortie en la rendant plus silencieuse

Un `casp check` rouge, un test qui échoue, une erreur de build : le correctif est un fichier
à écrire ou un pointeur à déplacer, jamais un contournement. `--no-verify`, un test sauté,
une assertion commentée, un SHA tapé à la main sont les façons dont un projet commence à se
mentir.

Ce qui le rattrape : le `CLAUDE.md` racine, bloc `<never>`, et la seconde ligne de chaque
FAIL, qui nomme le vrai correctif.

## Ce qu'il faut taper

À la fin de toute session qui a semblé bancale, dans cet ordre :

```
/context
casp check
```

La première dit si la session a tourné trop longtemps (piège 3). La seconde dit si le
cockpit dit la vérité (pièges 6, 7 et 9).

## Ce que vous devez voir

`/context` affiche une grille ou un pourcentage de la mémoire de travail utilisée ; au-delà
d'environ trois quarts, clôturez la session proprement plutôt que de la compacter.
`casp check` affiche une ligne par règle ; le cas du piège 6, provoqué sur une copie de
`examples/job-search/` le 2026-10-03, se lit :

```
casp:check · 16 PASS · 1 WARN · 1 FAIL
  FAIL  CASP-PROMPT-003 next_prompt is already SHIPPED · docs/plan/sessions/PHASE-1-APPLICATION-KIT.md has status: shipped — casp was not bumped after that session
        → either update state.json.next_prompt to the real next slice, or re-execute the shipped prompt explicitly
```

La seconde ligne est le correctif. Une clôture propre se lit `0 FAIL` et
`✓ state in sync with git. Clear for push.`
