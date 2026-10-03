# Install — five steps before the first `claude`

*Français ci-dessous.*

The kit cannot install Claude Code for you: Claude has to be running to read this folder.
Everything after these five steps is done by Claude, in conversation with you.

**Five words you will meet.** A *terminal* is the window where you type commands: on macOS
open "Terminal" from Applications, on Windows open "PowerShell" from the Start menu.
*git* records every change to your files. *Node.js* runs small programs written in
JavaScript; *npm* installs them. *casp* is the small program this method uses to check that
a project's recorded state matches reality; it runs on your machine and sends nothing anywhere.

1. **Create an Anthropic account with a paid plan**: Pro, Max, Team or Enterprise at
   https://claude.ai, or API access at https://console.anthropic.com. The free plan does not
   include Claude Code.
2. **Install Node.js 22 or newer** from https://nodejs.org (choose "LTS"). On Windows, also
   install Git for Windows from https://git-scm.com/downloads/win. Close and reopen the
   terminal afterwards. Check with `node --version` and `git --version`.
3. **Install Claude Code** by pasting one line in the terminal:
   - macOS, Linux, Windows WSL: `curl -fsSL https://claude.ai/install.sh | bash`
   - Windows PowerShell: `irm https://claude.ai/install.ps1 | iex`
   - Windows CMD: `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`
   - Any system, with Node.js installed: `npm install -g @anthropic-ai/claude-code`
   Then open a new terminal and check with `claude --version`. If you prefer no terminal at
   all, the Claude Desktop app runs Claude Code too: https://claude.com/download.
4. **Download the kit** from
   https://github.com/ThalesGnimavo/thales-gnimavo-claude-workflow-kit/releases/latest, unzip it,
   and open a terminal inside the unzipped folder (macOS: drag the folder onto the Terminal
   icon; Windows: Shift + right-click in the folder, "Open PowerShell window here").
   Keep this folder: it becomes your workspace.
5. **Type `claude` and press Enter.** Log in when the browser opens. When asked whether you
   trust the files in this folder, answer yes. Then type `hello` (or `bonjour`) and press
   Enter: Claude greets you, reads the folder, and runs `/setup`.

From here, type `/learn` to be taught the method. `/new-project` arrives with v0.1.0.

---

# Installation — cinq étapes avant le premier `claude`

Le kit ne peut pas installer Claude Code à votre place : Claude doit déjà tourner pour lire
ce dossier. Tout ce qui suit ces cinq étapes est fait par Claude, en conversation avec vous.

**Cinq mots que vous allez rencontrer.** Un *terminal* est la fenêtre où l'on tape des
commandes : sur macOS, ouvrez « Terminal » depuis Applications ; sur Windows, ouvrez
« PowerShell » depuis le menu Démarrer. *git* enregistre chaque modification de vos
fichiers. *Node.js* exécute de petits programmes écrits en JavaScript ; *npm* les installe.
*casp* est le petit programme que la méthode utilise pour vérifier que l'état enregistré
d'un projet correspond à la réalité ; il tourne sur votre machine et n'envoie rien nulle part.

1. **Créez un compte Anthropic avec un abonnement payant** : Pro, Max, Team ou Enterprise sur
   https://claude.ai, ou un accès API sur https://console.anthropic.com. Le plan gratuit ne
   comprend pas Claude Code.
2. **Installez Node.js 22 ou plus** depuis https://nodejs.org (choisissez « LTS »). Sous
   Windows, installez aussi Git for Windows depuis https://git-scm.com/downloads/win. Fermez
   puis rouvrez le terminal. Vérifiez avec `node --version` et `git --version`.
3. **Installez Claude Code** en collant une ligne dans le terminal :
   - macOS, Linux, Windows WSL : `curl -fsSL https://claude.ai/install.sh | bash`
   - Windows PowerShell : `irm https://claude.ai/install.ps1 | iex`
   - Windows CMD : `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`
   - Tout système, avec Node.js installé : `npm install -g @anthropic-ai/claude-code`
   Ouvrez ensuite un nouveau terminal et vérifiez avec `claude --version`. Si vous ne voulez
   pas de terminal du tout, l'application Claude Desktop fait aussi tourner Claude Code :
   https://claude.com/download.
4. **Téléchargez le kit** depuis
   https://github.com/ThalesGnimavo/thales-gnimavo-claude-workflow-kit/releases/latest,
   décompressez-le, puis ouvrez un terminal dans le dossier décompressé (macOS : glissez le
   dossier sur l'icône Terminal ; Windows : Maj + clic droit dans le dossier, « Ouvrir une
   fenêtre PowerShell ici »). Gardez ce dossier : il devient votre espace de travail.
5. **Tapez `claude` et validez.** Connectez-vous quand le navigateur s'ouvre. Quand on vous
   demande si vous faites confiance aux fichiers de ce dossier, répondez oui. Tapez ensuite
   `bonjour` et validez : Claude vous accueille, lit le dossier et lance `/setup`.

Ensuite, tapez `/learn` pour apprendre la méthode. `/new-project` arrive avec la v0.1.0.
