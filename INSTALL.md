# Install

**[English](#install-1) · [Français](#installation)**

---

## Install

Three steps. After that, Claude does everything else with you, in conversation, and helps
you if something goes wrong.

### 1. Get a paid Claude plan

Subscribe to **Pro** (or higher) at https://claude.ai. The free plan does not include
Claude Code.

**Windows only:** also install Git from https://git-scm.com/downloads/win. Open the
downloaded file and click **Next** on every screen.

### 2. Install Claude

Open a **terminal**, the window where you type instructions:

- **Mac:** press `Cmd + Space`, type `Terminal`, press Enter.
- **Windows:** click Start, type `PowerShell`, press Enter.

Copy the line for your computer (copy button on the right of the grey box), paste it into
the terminal, press **Enter**:

**Mac**
```
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows**
```
irm https://claude.ai/install.ps1 | iex
```

When it is done, **close the terminal and open a new one**.

### 3. Start Claude and let it guide you

Type this and press Enter:

```
claude
```

- If asked to pick a look (theme), press **Enter**.
- If asked how to log in, choose your **Claude account**. A browser page opens: log in.
- If asked whether you trust this folder, choose **Yes**.

Then copy this message, paste it to Claude and press Enter:

```
Hello. I am not technical. Please install the workflow kit for me: clone https://github.com/ThalesGnimavo/thales-gnimavo-claude-workflow-kit into my home folder, then open the file INSTALL.md inside it, read its section "For Claude" and follow it. Explain each step simply, and tell me exactly what to do when you need me.
```

Claude takes it from there. When it asks permission to do something on your computer, read
what it says and answer **Yes**. At one point it will ask you to close Claude and reopen it
inside the kit folder: when Claude asks again whether you trust the folder, answer **Yes**.
That is what switches on the kit's commands.

> **If something fails before Claude starts** ("command not found", "is not recognized"):
> close the terminal, open a new one, and try again. If it still fails, redo step 2.

### Coming back another day

Open a terminal (step 2), then:

```
cd thales-gnimavo-claude-workflow-kit
claude
```

Always start Claude **from inside this folder**: the kit's commands (they all start with
`/thales:`) only exist there.

### For Claude

You are reading this because a person pasted the message of step 3 and you have just
cloned the kit. The kit's own commands are not loaded yet: they load only when Claude
starts inside this folder and the person trusts it. Open
`.claude/skills/thales/skills/setup/SKILL.md`, section "Installing the kit for someone who
is not technical", and run its **bootstrap** steps, in order, one action at a time. They
end with the person restarting Claude inside this folder; the kit continues from there.

---

## Installation

Trois étapes. Ensuite, Claude fait tout le reste avec vous, en conversation, et vous aide si
quelque chose bloque.

### 1. Prenez un abonnement Claude payant

Abonnez-vous à **Pro** (ou plus) sur https://claude.ai. Le plan gratuit ne comprend pas
Claude Code.

**Windows uniquement :** installez aussi Git depuis https://git-scm.com/downloads/win.
Ouvrez le fichier téléchargé et cliquez sur **Next** à chaque écran.

### 2. Installez Claude

Ouvrez un **terminal**, la fenêtre où l'on tape des instructions :

- **Mac :** appuyez sur `Cmd + Espace`, tapez `Terminal`, validez.
- **Windows :** cliquez sur Démarrer, tapez `PowerShell`, validez.

Copiez la ligne qui correspond à votre ordinateur (bouton copier à droite du cadre gris),
collez-la dans le terminal, appuyez sur **Entrée** :

**Mac**
```
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows**
```
irm https://claude.ai/install.ps1 | iex
```

Quand c'est terminé, **fermez le terminal et ouvrez-en un nouveau**.

### 3. Lancez Claude et laissez-vous guider

Tapez ceci et validez :

```
claude
```

- Si on vous demande de choisir une apparence (thème), appuyez sur **Entrée**.
- Si on vous demande comment vous connecter, choisissez votre **compte Claude**. Une page
  s'ouvre dans le navigateur : connectez-vous.
- Si on vous demande si vous faites confiance à ce dossier, choisissez **Oui**.

Copiez ensuite ce message, collez-le à Claude et validez :

```
Bonjour. Je ne suis pas technicien. Installe-moi le kit de travail : clone https://github.com/ThalesGnimavo/thales-gnimavo-claude-workflow-kit dans mon dossier personnel, puis ouvre le fichier INSTALL.md qu'il contient, lis sa section « For Claude » et suis-la. Explique chaque étape simplement, et dis-moi exactement quoi faire quand tu as besoin de moi.
```

Claude prend le relais. Quand il demande la permission de faire quelque chose sur votre
ordinateur, lisez ce qu'il dit et répondez **Oui**. À un moment, il vous demandera de fermer
Claude et de le rouvrir dans le dossier du kit : quand Claude vous redemande si vous faites
confiance au dossier, répondez **Oui**. C'est ce qui active les commandes du kit.

> **Si quelque chose échoue avant que Claude démarre** (« command not found », « n'est pas
> reconnu ») : fermez le terminal, ouvrez-en un nouveau et réessayez. Si ça échoue encore,
> refaites l'étape 2.

### Revenir un autre jour

Ouvrez un terminal (étape 2), puis :

```
cd thales-gnimavo-claude-workflow-kit
claude
```

Lancez toujours Claude **depuis ce dossier** : les commandes du kit (elles commencent toutes
par `/thales:`) n'existent que là.
