# Le manuel

Comment mener un projet, technique ou non, avec Claude Code comme partenaire de travail, à
l'aide de ce kit. Six chapitres, dans l'ordre où une première semaine les rencontre. Chaque
chapitre se termine par « Ce qu'il faut taper », les commandes exactes dans l'ordre, et
« Ce que vous devez voir », la sortie brute telle qu'elle a été imprimée lors d'une
exécution réelle le 2026-10-03.

| Chapitre | Fichier | À lire quand |
|---|---|---|
| Une journée | `a-day.md` | avant votre première matinée avec le kit |
| Une session | `a-session.md` | avant votre premier `/thales:next` |
| Un projet | `a-project.md` | avant votre premier `/thales:new-project` |
| L'état | `the-state.md` | la première fois que `casp check` imprime un FAIL, ou avant |
| Commandes natives | `native-commands.md` | la première fois que vous vous demandez ce que fait `/compact` ou `/rewind` ; vérifié contre un Claude Code installé |
| Pièges | `pitfalls.md` | à la fin de la première semaine, puis chaque fois que quelque chose a semblé anormal |

Le manuel est plus long que `/thales:learn` (sept chapitres de cinq à huit minutes, avec un
exercice chacun) et plus court qu'un livre. `/thales:learn` enseigne ; ce manuel est ce que vous
ouvrez quand vous avez une question. Deux projets terminés auxquels comparer le vôtre se
trouvent dans `examples/` : `examples/job-search/` (non technique) et `examples/software/`
(technique). Chacun a un `README.md` qui dit quoi regarder et dans quel ordre.

La version anglaise, `docs/en/`, a les mêmes six chapitres sous les mêmes noms de fichiers.
Le `CLAUDE.md` racine et les commandes du kit répondent dans la langue dans laquelle vous
écrivez, quel que soit le manuel que vous lisez.

## Trois mots, avant toute chose

- **Constitution** : le `CLAUDE.md` d'un projet. Chargé à chaque tour de chaque session.
  Il contient ce qu'est le projet, les règles qui ne plient jamais, et les questions
  auxquelles Claude peut répondre seul.
- **Cockpit** : le dossier `casp/` d'un projet. Trois fichiers qui disent où en est le
  projet et ce qui vient ensuite. Un outil, `casp`, les vérifie contre git.
- **Session** : une séance de travail sur un projet, une tranche de travail, close par un
  journal écrit et le brief de la session suivante.
