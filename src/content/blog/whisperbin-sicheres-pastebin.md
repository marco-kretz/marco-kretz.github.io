---
title: 'Whisperbin – Mein selbstgebauter Pastebin-Service'
description: 'Sicheres Teilen von Code-Snippets und Secrets mit Client-seitiger Verschlüsselung, Ablaufzeiten und selbstzerstörenden Pastes.'
pubDate: 2026-01-24
readTime: '5 min'
tags: ['SvelteKit', 'Open Source', 'Security', 'Side Project']
---

Ich habe mir einen eigenen Pastebin-Service gebaut: **[Whisperbin](https://bin.marco-kretz.de/)**. Warum? Weil die meisten Pastebin-Dienste entweder mit Werbung überladen sind, fragwürdige Datenschutzpraktiken haben oder schlicht keine Ende-zu-Ende-Verschlüsselung bieten.

## Das Problem mit klassischen Pastebins

Wer kennt es nicht: Man will schnell ein Code-Snippet mit einem Kollegen teilen oder ein API-Token sicher übermitteln. Die üblichen Verdächtigen wie Pastebin.com speichern alles im Klartext. Das ist für sensible Daten ein No-Go.

Natürlich gibt es Alternativen wie PrivateBin – aber ich wollte etwas Eigenes, das genau auf meine Bedürfnisse zugeschnitten ist. Außerdem: Was gibt es Schöneres als ein Wochenendprojekt?

## Features von Whisperbin

### Client-seitige AES-GCM Verschlüsselung

Der Kern von Whisperbin ist die **Client-seitige Verschlüsselung**. Alles wird direkt im Browser verschlüsselt, bevor es den Server erreicht. Der Server sieht zu keinem Zeitpunkt den Klartext – er speichert nur verschlüsselte Daten.

```javascript
// Vereinfachtes Beispiel der Verschlüsselung
const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
);

const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(content),
);
```

Optional kann man zusätzlich ein **Passwort** vergeben. Das Passwort wird dann zusammen mit dem generierten Schlüssel verwendet, um die Daten zu verschlüsseln. Ohne Passwort kann niemand den Inhalt lesen – selbst wenn jemand die URL abfängt.

### Konfigurierbare Ablaufzeiten

Nicht jedes Snippet soll ewig leben. Whisperbin bietet verschiedene **TTL-Optionen** (Time To Live):

- 1 Stunde
- 6 Stunden
- 24 Stunden
- 7 Tage

Nach Ablauf wird das Paste automatisch gelöscht. Keine Datenleichen, kein unnötiger Speicherverbrauch.

### One-Time Pastes

Für besonders sensible Inhalte gibt es die **Selbstzerstörungs-Funktion**. Ein One-Time Paste kann nur ein einziges Mal geöffnet werden. Nach dem ersten View wird es sofort gelöscht.

Perfekt für:

- API-Tokens und Secrets
- Temporäre Zugangsdaten
- Einmal-Passwörter

### Syntax Highlighting

Damit Code auch lesbar bleibt, unterstützt Whisperbin **Syntax Highlighting** für die gängigsten Sprachen:

- JavaScript / TypeScript
- PHP
- JSON
- HTML / CSS
- Bash
- Markdown
- Plaintext

### Bestätigungsanforderung

Bevor ein Paste angezeigt wird, muss der Empfänger explizit bestätigen, dass er den Inhalt sehen möchte. Das verhindert versehentliches "Verbrennen" von One-Time Pastes durch Link-Previews in Messengern.

## Tech Stack

Whisperbin ist komplett mit **SvelteKit** gebaut – sowohl Frontend als auch Backend. SvelteKit bietet sich für solche Projekte ideal an:

- Server-Side Rendering für schnelle initiale Ladezeiten
- API-Routes im gleichen Projekt
- TypeScript out of the box
- Minimaler Bundle-Size

Als Datenbank nutze ich SQLite mit einer einfachen Key-Value-Struktur. Mehr braucht es nicht. Die Pastes werden als verschlüsselte Blobs gespeichert, zusammen mit Metadaten wie Ablaufzeit und View-Status.

## Fazit

Whisperbin löst für mich ein konkretes Problem: Sicheres Teilen von Code und Secrets ohne Datenschutz-Kopfschmerzen. Es ist simpel, schnell und macht genau das, was es soll.

Falls du selbst mal ein Snippet sicher teilen willst: **[bin.marco-kretz.de](https://bin.marco-kretz.de/)**
