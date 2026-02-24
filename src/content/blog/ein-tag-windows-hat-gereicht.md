---
title: 'Ein Tag Windows hat gereicht – CachyOS, Niri & DankMaterialShell'
description: 'Ich hatte versprochen, Windows eine Chance zu geben. Windows hat diese Chance nicht genutzt. Jetzt läuft CachyOS mit Niri und DankMaterialShell – und ich bin begeistert.'
pubDate: 2026-02-24
readTime: '5 min'
tags: ['OS', 'Linux', 'CachyOS', 'Niri', 'Wayland']
---

Ich weiß, ich weiß. Der letzte Blogpost ist gerade mal drei Tage alt. Ich hab gesagt, Windows bekommt eine neue Chance. Ich hab sogar damit gerechnet, dass der Friede vielleicht ein paar Wochen hält.

**Einen Tag.**

Ein einziger Tag hat gereicht.

## Warum Windows schon wieder fliegt

Ich will gar nicht zu sehr ins Detail gehen, weil ich das Gefühl habe, dass die meisten das ohnehin kennen. Aber kurz zusammengefasst:

1. **Träge. Einfach träge.**<br>
   Frisch installiert, kein Bloat drauf, SSD – und trotzdem: gefühlt zwei Sekunden vom Klick bis zur Reaktion. Animationen, die sich zäh anfühlen wie Honig im Januar. Unter Arch-basierten Systemen bin ich das schlicht nicht mehr gewöhnt und das fällt sofort auf.

2. **FreeSync – gehofft, enttäuscht**<br>
   FreeSync war unter Linux schon nicht perfekt, aber ich hatte gehofft, dass es unter Windows zumindest zuverlässig funktioniert. Nope. Dazu kam ein konkretes Problem: Trackmania 2020 im exklusiven Vollbild hat meinen Monitor auf 60 Hz gelocked. Liegt nicht am Bildschirm, liegt nicht an den Kabeln – liegt an Windows. Unter Niri? Kein Problem, volle Refreshrate, sofort.

3. **Input Lag im Terminal**<br>
   Ich hab im letzten Post noch das Windows Terminal gelobt. Aber wenn du den ganzen Tag im Terminal arbeitest, merkst du den Input Lag. Du tippst, und die Zeichen kommen einen Tick zu spät. Unter Linux? Jeder Tastendruck ist sofort da. Klingt nach Kleinigkeit, macht aber über den Tag einen riesigen Unterschied.

4. **Das Gesamtgefühl**<br>
   Windows ist für viele Menschen gemacht, die viele verschiedene Dinge wollen. Das Ergebnis ist eine UI, die... da ist. Sie funktioniert. Aber sie inspiriert mich zu nichts. Und ich merke, dass mir das anscheinend nicht egal ist.

Nach einem Tag hatte ich genug und hab den USB-Stick gezückt. Der USB-Stick, der nie wirklich weggelegt wurde, wenn ich ehrlich bin.

## CachyOS

Omarchy basiert auf Arch. <a href="https://cachyos.org/" target="_blank" rel="noreferrer">CachyOS</a> auch. Der Unterschied: CachyOS ist auf Performance getrimmt. Es bringt einen gepatchten Kernel mit BORE-Scheduler mit, optimierte Pakete direkt aus dem Repo und einen Installer, der einem den ganzen Arch-Aufwand abnimmt. Im Grunde bekommst du ein schlankes, blitzschnelles Arch-Linux, ohne den tagesfüllenden Installations-Marathon.

Die Installation? Schnell, unkompliziert, keine Überraschungen. Die Community ist aktiv, das Wiki gut. Mehr brauche ich nicht.

## Niri – Ein Window Manager, der mein Gehirn versteht

Jetzt wird's interessant. Statt direkt wieder zu Hyprland zu greifen, hab ich diesmal <a href="https://github.com/YaLTeR/niri" target="_blank" rel="noreferrer">Niri</a> ausprobiert. Und ich bin verliebt.

Niri ist ein **Scrollable Tiling Wayland Compositor**. Das klingt nach viel Buzzword-Salat, ist aber ein genial einfaches Konzept:

- Fenster werden nebeneinander in einer endlosen horizontalen Reihe angeordnet
- Workspaces stapeln sich vertikal
- Du navigierst per Tastenkombination durch alles – flüssig, sofort, ohne nachzudenken

Was das für mich konkret bedeutet: Ich verliere keine Fenster mehr. Ich weiß _immer_, wo was ist. Browser links, Terminal daneben, Editor dahinter. Das klingt trivial, ist es für mein ADHD-Gehirn aber nicht. Bei Hyprland hatte ich immer diesen Moment, wo ich kurz orientierungslos war – welcher Workspace, wo war nochmal das Terminal? Bei Niri gibt es diesen Moment einfach nicht.

Es ist wie ein riesiger, aufgeräumter Schreibtisch, statt einem Stapel übereinanderliegender Zettel.

Und die Edge-Cases aus Hyprland? Kein einziges Mal aufgetreten. Keine komischen Auflösungsprobleme, kein Game, das sich selbst in die Bildschirmmitte schiebt, kein Flackern beim Fokuswechsel. Es läuft einfach. Was für ein Konzept.

## DankMaterialShell – Das i-Tüpfelchen

Niri alleine wäre schon gut genug. Ich hab aber <a href="https://danklinux.com/" target="_blank" rel="noreferrer">DankMaterialShell</a> obendrauf gepackt und das hebt das Setup nochmal auf ein anderes Level.

DMS liefert alles, was ein moderner Desktop braucht: eine saubere Bar, Workspaceübersicht, Systeminfos auf einen Blick – und das in einem Look, der einfach _stimmt_. Nicht überladen, nicht so minimalistisch, dass du nichts mehr findest. Genau richtig.

Ich starte den Rechner und denke kurz: _„Das schaut schick aus."_ Klingt banal, ist es aber nicht. Eine Umgebung, die du gerne anschaust, motiviert dich. Das merke ich jeden Morgen.

## Wie schnell ist es wirklich?

Lächerlich schnell. Der CachyOS-Kernel mit dem BORE-Scheduler macht einen spürbaren Unterschied im Alltag. Apps öffnen quasi instant, Workspace-Wechsel passieren sofort, Docker-Container starten in Sekunden. Kein Wackeln, kein Luftholen.

Zum Vergleich: Unter Windows hab ich nach dem Klick auf VSCode manchmal kurz auf die Uhr geschaut. Hier ist es offen, bevor ich den Finger vom Touchpad nehme.

## Fazit

Ich hatte gehofft, Windows zu mögen. Ehrlich. Die Kombination aus FreeSync-Problemen, einer trägen UI und dem Gefühl, dass das System _für_ mich entscheidet statt _mit_ mir zu arbeiten, hat mich nach einem einzigen Tag wieder zurückgetrieben.

CachyOS mit Niri und DankMaterialShell ist mein bisher bestes Linux-Setup. Es ist schnell, es sieht gut aus, und es passt zu meiner Arbeitsweise auf eine Art, die ich vorher nicht hatte. Niri fühlt sich an wie ein Window Manager, der für meinen Kopf gebaut wurde. Das klingt übertrieben, ist es aber nicht.

Ja, ich reserviere mir das Recht, nächste Woche wieder die Meinung zu ändern – ihr kennt mich inzwischen. Aber gerade fühlt sich das hier richtig an.
