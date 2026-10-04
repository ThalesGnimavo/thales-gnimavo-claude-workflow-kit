# Une journée

Une journée avec le kit a trois moments : dix minutes le matin, rien pendant la journée
sauf si Claude s'arrête, quinze minutes le soir. La méthode fonctionne parce que l'état
vit dans des fichiers et non dans la mémoire de quiconque, celle de Claude comprise.

## Le matin, dix minutes

Ouvrez un terminal dans le dossier du kit (celui qui contient ce `docs/`), tapez `claude`,
puis `/thales:day`. Un tableau apparaît, une ligne par projet sous `my-projects/`, avec sa phase,
ce qui vient ensuite, le dernier point de sauvegarde et un état. Sous le tableau, les
projets qui ne sont pas prêts, chacun avec la commande qui le débloque.

`/thales:day` pose ensuite une question en deux parties : quel projet, et une session ou
plusieurs. Une session est la réponse normale. « Plusieurs » signifie des sessions
parallèles sur un même projet ; cela coûte plusieurs fois plus cher et exige macOS avec
iTerm2 ; laissez cela pour plus tard.

`/thales:day` ouvre `/thales:next <project>` pour vous. La session lit la constitution du projet, son
cockpit et le prompt en file, vérifie que ce prompt est toujours le bon, dit en une phrase
ce qu'elle commence, et commence. Elle n'attend pas de « go » ; interrompez-la et corrigez
le prompt s'il est faux. Puis partez.

Lancez toujours `claude` depuis le dossier du kit, jamais depuis l'intérieur d'un projet.
Les commandes et les permissions du kit se chargent depuis là, et chaque commande prend le
nom du projet en argument.

## Pendant la journée

Ne surveillez pas. Vous n'envoyez que trois sortes de messages :

- **Une décision**, quand Claude s'est arrêté sur une question de niveau 1 (envoyer,
  publier, payer, supprimer, un choix qui engage plus d'une phase). Il a écrit la question
  en un paragraphe et attend.
- **Un déblocage**, quand il lui manque quelque chose que vous seul avez : un fichier, un
  nom, une date, un mot de passe que vous tapez vous-même.
- **Une correction**, quand vous lisez quelque chose de faux.

Tout le reste attend le soir. Une question qui peut être annulée en moins d'une session,
Claude y répond seul et l'écrit ; vous la lisez ce soir.

## Le soir, quinze minutes

Lisez le journal de session, pas la conversation. Il est sous
`my-projects/<project>/session-logs/`, le fichier le plus récent. Dans cet ordre :

1. **Ce qui a été livré.** Pour chaque élément marqué fait, le journal doit montrer la
   commande et ce qu'elle a imprimé. « Fait » sans sortie est une affirmation ; demandez la
   sortie.
2. **Les décisions prises sans l'utilisateur.** Chacune a un retour en arrière en une
   ligne. Opposez votre veto à ce qui vous déplaît ; un veto coûte une correction.
3. **Le prochain prompt.** Ouvrez le fichier nommé sur la ligne `next_prompt` de
   `casp status`. Il doit nommer une tranche qu'une session neuve pourrait commencer seule.
   S'il en nomme trois, coupez.
4. **`casp check`.** Une ligne par règle, PASS ou FAIL. Un FAIL nomme la règle et le
   correctif. Rien n'est poussé tant qu'un FAIL subsiste.

Puis fermez le terminal. La session suivante part des fichiers.

## Ce qui ne se délègue jamais

À quoi sert le projet. Ce qui passe en premier. Tout ce qui dépense de l'argent. Tout ce
qui part vers une autre personne. Tout ce qui se juge sur un appareil réel, dans une salle
réelle, par un lecteur réel. Le tableau `## Pre-approved decisions` de la constitution dit
ce que Claude peut décider seul ; tout ce qui a une conséquence externe vous revient.

## Ce qu'il faut taper

```
cd <the kit's folder>
claude
/thales:day --dry-run
/thales:day
```

`--dry-run` imprime le tableau et s'arrête, sans question ; utilisez-le la première fois,
pour lire l'écran sans rien ouvrir.

## Ce que vous devez voir

Le tableau pour les deux projets d'`examples/`, tel que `/thales:day` le présente, avec les
valeurs que leurs cockpits contenaient le 2026-10-03 :

```
2026-10-03

Project          Phase   Next                   Last commit   State
job-search       1/5     phase-2-first-wave     2026-10-03    blocked: First application (Meridian Travel Assistance)
software         2/4     phase-3-hardening      2026-10-03    ready, to confirm

Blocked
- job-search: the owner sends from their mailbox and gives the date; `/thales:next job-search` writes it
- software: `/thales:cto software`, or `/thales:next software --solo "<reason>"` for a slice you know is small
```

« 1/5 » est une phase livrée sur cinq. La ligne `software` est le nom du dossier : ce
projet a été joué sous le nom `ledger-cli`, et son propre `README.md` dit
`/thales:next ledger-cli` ; sous `my-projects/`, le nom du dossier et le nom du projet sont
identiques. « blocked » vient d'une vraie ligne sous `## Blocked` dans le
`casp/roadmap.md` du projet : la première candidature est à `ready` et seul son
propriétaire peut l'envoyer. « ready, to confirm » signifie que l'étape en file n'a pas
été confirmée comme une session ou plusieurs ; `/thales:next software --solo "<reason>"` la
confirme en un geste.

Puis la question unique, en deux parties : quel projet, une session ou plusieurs.
Répondez-y, et `/thales:next` prend le relais.
