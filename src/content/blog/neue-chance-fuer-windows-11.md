---
title: 'Neue Chance für Windows 11'
description: 'Nach ein paar Monaten unter Omarchy/Linux gebe ich Windows 11 eine neue Chance.'
pubDate: 2026-02-20
readTime: '5 min'
tags: ['OS', 'Windows 11', 'WSL2', 'Linux', 'Web Development']
---

Ich war die letzten paar Monate tapfer ausschließlich unter <a href="https://omarchy.org/" target="_blank" rel="noreferrer">Omarchy</a> unterwegs. Es hat viele Boxen bei mir abgehakt und es war die Distribution, die mich bis heute am längsten gehalten hat.

## Die Vorzüge

1. **Easy Setup**<br>
   Die Installation geht schnell und liefert alles Wichtige mit. Kein langes _„Welche Tools brauchte ich nochmal?“_ oder _„Wo finde ich nochmal die geile Config für Waybar?“_. Das System ist quasi komplett und über die intuitive Bedienung kriege ich schnell alles nachinstalliert.

2. **Opinionated Linux**<br>
   Übersetzt heißt das **meinungsstark** und äußert sich darin, dass der Autor eine starke persönliche Präferenz hat, welche Tools für welche Aufgabe am besten geeignet sind. Das senkt die doch teilweise sehr ermüdende Suche nach "dem besten Tool".

3. **Easy to Learn**<br>
   Viele würden bei Tiling-Window-Managern wie Hyprland das Weite suchen. Auch dass man für quasi alles mindestens einen Keyboard-Shortcut nutzen muss, schreckt viele ab. Allerdings gewöhnt man sich da recht schnell dran. Da offene Tools wie Hyprland, Waybar, Walker, etc. genutzt werden, kann man, wenn man denn möchte, die Standards genauso gut über den Haufen werfen und seine eigenen Configs nutzen, ohne dass diese beim nächsten Update überschrieben werden.

4. **Backup OOTB**<br>
   Omarchy kommt mit automatischen BTRFS-Snapshots, sodass man sich um fehlgeschlagene Updates keinen Kopf machen muss. Reboot -> Snapshot laden -> Weiterarbeiten.

## Was ist passiert?

Tja, trotz all der positiven Dinge, gab es auch einiges, was mich richtig genervt hat. Das fing mit Kleinigkeiten an bis hin zu Systemaufhängern, die mich richtig wütend gemacht haben. Hier mal eine Liste von **nervt ein bisschen** hin zu **F\*\*\*CK**:

1. **Discord Streaming**<br>
   Ich hab hier sowohl den offiziellen Discord-Client getestet als auch alternative Wrapper wie Vesktop oder Equibop. Streaming ist ein absolutes Glücksspiel, mal geht es einwandfrei, mal übertrage ich nur ein schwarzes Bild. Super nervig, wenn man im Channel "mal eben was zeigen will".

2. **MS Teams mit mehreren Organisationen**<br>
   Ich bin von Berufs wegen auf MS Teams angewiesen (leider) und dort in mehr als einer Organisation. Das ist an sich schon nervig, weil man in Teams diese explizit über das Menü rechts oben wechseln muss. Schlimmer aber unter Linux ist, dass es keine native App gibt, also nur die Web-App genutzt werden kann. Diese zeigt aber, während man in einer Organisation ist, keine Benachrichtigungen aus anderen an. Ich habe dadurch regelmäßig Nachrichten verpasst! Unter Windows ist das nicht der Fall.

3. **Hyprland nicht perfekt**<br>
   Hyprland ist super. Ich mag Tiling-Window-Manager. Für meinen Geschmack gibt es aber zu viele Edge-Cases, die immer wieder nerven. Wenn ich in einem Game war (Fullscreen) und aus Versehen aus dem Vollbildmodus via Hyprlands Tastenkombination rausgewechselt bin, hat sich, je nach Game, die Auflösung komplett zerhauen, konnte sich teilweise nicht mehr "fangen" und ich musste das Game komplett neustarten.<br>
   Auch bei einfachen Fokuswechseln zu anderen Apps schoben sich Games auf einmal komisch in die Mitte des Bildschirms und blieben dann da. Sind vielleicht Einzelfälle, aber das sind halt die Games, die ich spiele.<br>
   Weiterhin hatte ich immer wieder komische Glitches bei den PiP-Popups von Google Chat, Probleme beim Teilen meines Screens und starkes Flackern bei aktivierten FreeSync.

4. **Extreme Suspend-Probleme mit AMD**<br>
   Ich will hier nur mal anmerken, dass ich eine AMD-Karte habe (7900 XT). Es wird im Internet immer wieder behauptet, dass damit "alles besser sei". Ja, der Treiber ist direkt im Kernel, Mesa ist ein tolles Projekt und meistens stimmt das auch, bis man sich dem Thema **Suspend** (Energiesparmodus) widmet. Natürlich hab ich keine Lust jeden Morgen alle meine Apps wieder zu öffnen, daher -> Suspend. Hier haben sich zwei krasse Probleme gezeigt:<br>
    1. Immer wieder hatte ich nach dem Suspend auf einem Monitor horizontale, flackernde Artefaktlinien. Ich habe jede erdenkliche Kernel-Version getestet, Boot-Parameter, Undervolting, neue Kabel gekauft, versch. Bildschirme getestet, es war immer das gleiche Problem. Das hat wohl was mit dem DP-Handshake zu tun. Es gibt zig Threads und Tickets dazu. Überall steht "ist mit Kernel 6.12" behoben oder ähnliches, ist es leider nicht. Hier half dann immer nur ein Neustart des Monitors.

    2. Der viel krassere Fall, aber auch seltener, war ein **kompletter Hardfreeze** nach dem Suspend. Der Bildschirm geht an und ist eingefroren. Es geht nichts mehr, kein TTY-Wechsel, keine Maus und das schlimmste: Keine Logs. Der Crash ist so heftig, dass keine Error-Logs mehr geschrieben werden, daher konnte ich es nie debuggen. Hier ist die Angst vor Datenverlust akut.

Natürlich gibt's noch mehr Dinge, aber diese haben für mich herausgestochen.

## Windows für Webentwickler

Als Webentwickler ist man auf einige Dinge angewiesen, mit denen ich mich vorher unter Windows nur halbherzig beschäftigt habe. Das habe ich nun aber nachgeholt und will hier für euch meine wichtigsten Findings dokumentieren.

### Die Windows-Installation

Ich gebe zu, dass **aktuell** der Windows-Installer schon recht nervig ist. Man kommt kaum drum herum einen Online-Account anzulegen, wird bei der Installation schon mit Abo-Werbung genervt und generell ist es einfach ein nerviger Akt.

Die Lösung? **autounattend.xml**

Wichtig: Das ist für eine Neuinstallation gedacht, nicht für ein In-Place-Upgrade.

Was das ist? Das ist eine einfache XML-Datei, die man zur normalen Windows-ISO geben kann und wodurch die Installation so gut wie alleine abläuft. Diese Datei zu erstellen ist etwas frickelig, weshalb es dafür dedizierte Tools wie bspw. den **<a href="https://schneegans.de/windows/unattend-generator/" target="_blank" rel="noreferrer">Unattend-Generator</a>** gibt. Einfach durcharbeiten und ganz unten die XML-Datei runterladen. Dann legt ihr die Datei einfach in das **Root-Verzeichnis** eures Windows-USB-Sticks und fertig. Mehr Infos dazu gibt's <a href="https://schneegans.de/windows/unattend-generator/usage/" target="_blank" rel="noreferrer">hier</a>.

Ich selbst habe mir eine erstellt, die direkt ein lokales Konto anlegt, den meisten Müll an vorinstallierten Apps nicht mitbringt, Telemetry auf ein Minimum reduziert und ein paar QoL-Einstellungen direkt setzt. **Praktisch!**

### WinGet als Pendant zu apt, dnf, pacman, etc.

Ja, auch Windows hat inzwischen einen etablierten Paketmanager zur Installation von Software. Im Gegensatz zu Linux-Paketmanagern ist dieser allerdings **nicht** für Windows selbst, sondern nur für zusätzliche Software (Browser, Launcher, etc.). Trotzdem super, da ich so nicht auf etliche Websites gehen muss, um mein Basis-Set an Apps zu installieren.

WinGet ist von Haus aus installiert und kann direkt über die PowerShell oder Windows Terminal genutzt werden:

- `winget list` - Liefert eine Liste aller installierten Pakete
- `winget search spotify` - Sucht nach Programmen
- `winget install Spotify.Spotify` - Installiert ein Programm
- `winget update --all` - Aktualisiert alle installierten Programme

Jegliche Software, bis auf eine Ausnahme, konnte ich so installieren.

### Entwicklungsumgebung

Dass Windows jetzt nicht das Highlight ist, um bspw. Docker-basierte Entwicklungsumgebungen bereitzustellen, ist ja bekannt. Hierfür nutze ich WSL2. Das **Windows Subsystem for Linux** ist quasi Linux in Windows. Hierzu startet Windows via Hyper-V eine ganz leichtgewichtige, virtuelle Maschine. Es ist keine klassische VM wie man sie sonst kennt, sondern um einiges schneller und besser mit dem Hauptsystem verwoben. Man bekommt über ein ganz normales Terminal Zugriff darauf, muss nichts extra starten und hat vollen Zugriff auf die Windows-Dateien. Die Dateien innerhalb der WSL2-Distribution liegen in einer virtuellen Festplatte.

Die Installation ist einfach: `wsl --install` in der Windows-CMD eingeben, neustarten, fertig.

Und der Rest geht genauso wie bei einem "normalen" Linux: Docker installieren, DDEV installieren und losarbeiten. Auch mein Main-Editor **VSCode** läuft mit WSL2 einwandfrei. Es gibt allerdings eine Ausnahme: **SSH Keys**.

#### SSH-Keys

Was mich immer genervt hat unter WSL2, war, dass ich immer wieder meinen SSH-Key entsperren musste. Dafür gibt es aber eine relativ elegante Lösung:

1. `[WIN] + [R]` -> `services.msc`
2. **OpenSSH-Authentifizierungs-Agent**: Starttyp auf _Automatisch_ setzen und starten
3. Den SSH-Key unter Windows dem Agenten hinzufügen: `ssh-add C:\Pfad\zum\key\id_ed1234` (so viele man will)
4. Mit WinGet `npiperelay` installieren: `winget install albertony.npiperelay`
5. Windows einmal neustarten, damit `npiperelay` im `$PATH` ist
6. Innerhalb der WSL-Distro dann `socat` installieren: `sudo apt install socat`
7. In die `.bashrc` (geht auch mit ZSH, etc.) dann folgendes eintragen:

```bash
export SSH_AUTH_SOCK=$HOME/.ssh/agent.sock
if ! socat -u OPEN:/dev/null UNIX-CLIENT:$SSH_AUTH_SOCK >/dev/null 2>&1; then
  rm -f $SSH_AUTH_SOCK
  (setsid socat UNIX-LISTEN:$SSH_AUTH_SOCK,fork EXEC:"/mnt/c/Users/<username>/AppData/Local/Microsoft/WinGet/Links/npiperelay.exe -ei -s //./pipe/openssh-ssh-agent",nofork &) >/dev/null 2>&1
fi
```

Was hier passiert, ist, dass eine Brücke gebaut wird, sodass wir unter Linux den SSH-Agent von Windows nutzen können. Einmal in Windows hinzugefügt, müssen wir den Schlüssel nicht mehr mit Passwort entsperren, da das nun über unseren User-Account passiert. Für Interessierte hier einmal etwas genauer, was da passiert, wenn man bspw. ein `git pull` macht:

1. `git` fragt die Variable `SSH_AUTH_SOCK` ab und geht zur Datei `agent.sock`.
2. Hinter der Datei wartet `socat` (Linux).
3. `socat` nimmt die kryptografische Anfrage und reicht sie an `npiperelay.exe` (Windows) weiter.
4. `npiperelay.exe` drückt die Anfrage in die Windows Named Pipe (`//./pipe/openssh-ssh-agent`).
5. Der Windows SSH-Agent prüft den Key, nickt ihn ab und schickt das "Okay" auf demselben Weg rückwärts an git in WSL2 zurück.

Das ist extrem elegant. So hat man seine SSH-Keys nur an einer Stelle in Windows, muss keine doppelte Pflege durchführen und auch nicht mehr jedes Mal sein Passwort eingeben. Grüße gehen raus an `keychain`.

### Nerviger Windows-Kram

Hier noch ein paar Kleinigkeiten, die ich aber gut lösen konnte.

#### "Virtueller Desktop"-Wechsel laggt

Junge, das hat genervt. Wenn man von Hyprland kommt, wo die virtuellen Desktops instant wechseln, regt einen die langsame Reaktionszeit beim Wechsel via `[STRG]+[WIN]+[Pfeil links/rechts]` extrem auf. Das Problem: Wenn ich in Windows 11 die Animationen deaktiviere, ist es zwar instant, aber dann gehen auch auf keiner Website mehr Animationen - als Webentwickler denkbar schlecht.

Die Lösung hier ist <a href="https://windhawk.net/" target="_blank" rel="noreferrer">Windhawk</a>. Das ist ein Tool für Anpassungen an Windows in der Form von Mods, das versucht, tiefe Eingriffe ins System zu vermeiden. Dort gibt es die Mod <a href="https://windhawk.net/mods/disable-virtual-desktop-transition" target="_blank" rel="noreferrer">Disable Virtual Desktop Transition Animation</a>. Installiert, funktioniert, Problem gelöst.

#### Übersicht & Kontrolle laufender Media-Anwendungen

Das brauche ich öfter. Ich hab Spotify immer an, evtl. mehrere Videos. Genau für den Fall gibt's <a href="https://apps.microsoft.com/detail/9nbxbp78896q" target="_blank" rel="noreferrer">Media Flyout</a>. Hier bekommt man ein Tray-Icon, das einem per Klick eine sehr schöne Mediensteuerung über alle aktuell laufenden Dinge bereitstellt. Mit WinGet schnell installiert: `winget install 9NBXBP78896Q`

#### Der Mouse-Cursor

Ich weiß nicht genau warum, aber der Standard-Mouse-Cursor ist einfach nicht schön. Hier gibt es nur eine wirkliche Alternative: <a href="https://www.michieldb.nl/other/cursors/" target="_blank" rel="noreferrer">Posy's Cursor</a>.

#### Terminal

Windows Terminal ist schon eine echt gute Verbesserung, da sehe ich keinen Wechsel-Bedarf. Allerdings nehme ich ein paar optische Anpassungen vor:

- **Font**: <a href="https://www.nerdfonts.com/font-downloads" target="_blank" rel="noreferrer">JetBrainsMono Nerd Font</a>
- **ColorScheme**: <a href="https://github.com/HenriqueMiossi/Windows-Terminal-Monokai-Pro" target="_blank" rel="noreferrer">Monokai Pro</a>
- **Prompt**: <a href="https://starship.rs/" target="_blank" rel="noreferrer">Starship</a>

<img src="/images/windows-terminal.avif" alt="Windows Terminal mit Monokai Pro und Starship">

## Fazit

Omarchy war für mich das bislang rundeste Linux-Erlebnis, aber am Ende haben mich die vielen kleinen Reibungspunkte und die Suspend-Probleme zu sehr aus dem Flow gerissen. Windows 11 ist als Betriebssystem immer noch kein Highlight, aber mit ein paar Kniffen (Unattend, WinGet, WSL2, kleine Tools) bekomme ich eine produktive Umgebung, die für meine Arbeit gerade besser funktioniert. Mal sehen, wie lange der Frieden hält.
Ich kann mir auch sehr gut vorstellen, dass ich in ein paar Wochen nochmal einen Versuch wage, aber aktuell überwiegen für mich leider die Störfaktoren.

Zum Abschluss hier noch eine kleine Liste der Software, die ich aktuell verwende:

- **Browser:** <a href="https://brave.com/de/" target="_blank" rel="noreferrer">Brave</a>
- **E-Mail:** <a href="https://proton.me/de/mail" target="_blank" rel="noreferrer">ProtonMail</a>, <a href="https://outlook.office.com/mail/" target="_blank" rel="noreferrer">Outlook.com</a> (jeweils die Web-App als "Pinned Tab" im Browser)
- **Messaging**: <a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer">WhatsApp Web</a>, <a href="https://chat.google.com/" target="_blank" rel="noreferrer">Google Chat</a>, MS Teams (nativ), <a href="https://vesktop.dev/" target="_blank" rel="noreferrer">Vesktop (Discord-Wrapper)</a>
- **Terminal**: <a href="https://apps.microsoft.com/detail/9n0dx20hk701?hl=de-DE&gl=DE" target="_blank" rel="noreferrer">Windows Terminal</a>
- **Editor**: <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">VS Code</a>, <a href="https://neovim.io/" target="_blank" rel="noreferrer">Neovim</a>
- **Music**: <a href="https://open.spotify.com/" target="_blank" rel="noreferrer">Spotify</a>
- **Screenshots:** <a href="https://support.microsoft.com/de-de/windows/aufnehmen-von-screenshots-mithilfe-des-snipping-tools-00246869-1843-655f-f220-97299b865f6b" target="_blank" rel="noreferrer">Windows Snipping Tool</a>
- **Datenbank-Viewer**: <a href="https://dbeaver.io/" target="_blank" rel="noreferrer">DBeaver</a>
- **API-Client:** <a href="https://www.usebruno.com/" target="_blank" rel="noreferrer">Bruno</a>

P.S.: Microsoft hat angekündigt, sich dieses Jahr auf die bestehenden Probleme von Windows zu
konzentrieren. Ich bin gespannt, ob sie Wort halten.
