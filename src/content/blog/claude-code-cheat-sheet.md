---
title: 'Claude Code Cheat Sheet'
description: 'Wichtige Tipps und Tricks für die Verwendung von Claude Code.'
pubDate: 2026-01-07
readTime: '12 min'
tags: ['Claude Code', 'Cheat Sheet', 'Tipps', 'Shortcuts', 'CLI']
---

Ich habe in den letzten Tagen sowohl viel mit Claude Code als auch mit OpenCode gearbeitet. Beide haben Vor- und Nachteile. Vor allem bei Claude Code haben mir ein paar Sachen gefehlt, die bei OpenCode schöner gelöst waren. Daher hier einmal mein persönliches **Claude Code Cheat Sheet** mit allen wichtigen Tipps und Tricks.

_Disclaimer: Ich schreibe hier für Beispiele häufiger deutsche Prompts oder Inhalte. Das kann man machen, jedoch ist es erwiesen, dass englische Prompts zu einer etwas besseren Qualität führen. Privat prompte ich fast ausschließlich auf Englisch._

## Das Hilfe-Menü

Wer es noch nicht wusste: Man kann via Eingabe von `?` ein kleines Hilfemenü einblenden lassen mit den wichtigsten Tastenkombinationen. Ich werde im Folgenden einmal kurz auf jeden Shortcut eingehen.

```text
! for bash mode       double tap esc to clear input      ctrl + _ to undo
/ for commands        shift + tab to auto-accept edits   ctrl + z to suspend
@ for file paths      ctrl + o for verbose output        ctrl + v to paste images
& for background      ctrl + t to show todos             alt + p to switch model
                      shift + ⏎ for newline              ctrl + s to stash prompt
```

### Der Bash-Modus

Im **Bash-Modus** lassen sich beliebige Kommandozeilenaufrufe ausführen, indem man diese einfach mit einem vorangestellten `!` aufruft:

```bash
! date
  ⎿  Mi 7. Jan 14:35:42 CET 2026

! git branch
  ⎿    cc-sonnet
     * main
       omo-minimax
```

### Kommandos ausführen (Commands)

Via `/` können sogenannte **Commands** ausgeführt werden. Dies sind vorprogrammierte Routinen wie bspw. `/compact` zum Zusammenfassen des aktuellen Kontext-Fensters oder `/clear` um den aktuellen Verlauf zu löschen und einen neuen Chat zu starten. Claude Code liefert von Haus aus einige Commands mit, welche man durch das Drücken von `/` und dann mit Navigieren der Pfeiltasten erkunden kann.

Neue Commands lassen sich sowohl via Plugins installieren als auch vom Benutzer selber integrieren (zu beidem später mehr).

### Dateien direkt referenzieren

Will man Claude Code gezielt Dateien oder Ordner in den Kontext mitgeben, so kann man diese via `@` direkt referenzieren. Dies ist hilfreich, wenn man bereits weiß, in welcher Datei oder welchem Ordner jetzt gearbeitet werden muss. Ansonsten versucht Claude Code dies über Tools wie `grep`, `glob` usw. selbst herauszufinden.

#### Einzelne Datei

```text
> Please check my blog post in @src/content/blog/claude-code-cheat-sheet.md for spelling mistakes.
```

#### Mehrere Dateien

```text
> Please check my config files for mistakes @tailwind.config.mjs @astro.config.mjs
```

#### Ganze Ordner

```text
> Please check all my blog posts in @src/pages/blog/ for mistakes
```

### Hintergrundaufgaben (Background Tasks)

Mit `&` am Anfang einer Nachricht lässt sich ein Task im Hintergrund starten. Claude Code arbeitet dann eigenständig weiter, während man parallel andere Dinge erledigen kann. Der Status lässt sich jederzeit mit `/tasks` überprüfen.

```text
& Refactor the authentication module and add unit tests
```

### Tastenkombinationen im Überblick

| Kombination         | Funktion                                                 |
| ------------------- | -------------------------------------------------------- |
| `[ESC] 2x`          | Aktuelle Eingabe löschen                                 |
| `[SHIFT] + [TAB]`   | Modus wechseln: Normal -> Auto accept edits -> Plan mode |
| `[SHIFT] + [Enter]` | Manueller Zeilenumbruch                                  |
| `[CTRL] + O`        | Gesamte Ausgabe anzeigen                                 |
| `[CTRL] + T`        | Aktuelle To-Do-Liste anzeigen (wenn vorhanden)           |
| `[CTRL] + Z`        | "Schlafmodus", durch `fg` wieder aufrufbar               |
| `[CTRL] + \_`       | Undo - Letzte Änderung rückgängig machen                 |
| `[CTRL] + V`        | Bilder aus der Zwischenablage einfügen                   |
| `[CTRL] + S`        | Prompt zwischenspeichern (Stash)                         |
| `[ALT] + P`         | Modell wechseln (z.B. Sonnet -> Opus)                    |

## Die Status-Line

Die Status-Line (das, was unter der Eingabezeile steht) ist bei Claude Code von Haus aus eher, sagen wir, dezent. Es fehlen Informationen wie der aktuelle Ordner oder auf welchem Git-Branch gearbeitet wird. Das sind Informationen, die nicht fehlen dürfen. Genau für dieses Problem gibt es das `/statusline`-Command. Mit diesem Command kann man die Status-Line mit Hilfe von natürlicher Sprache anpassen. Ein einfaches Beispiel:

```text
> /statusline show the current folder's name as well as the current git branch

● I'll help you configure the status line to show the current folder name and git branch.

● statusline-setup(Configure statusline display settings)
  ⎿  Done (4 tool uses · 8.6k tokens · 38s)

● Your status line has been successfully configured! It will now display:
  - The current folder name (marco-kretz.de)
  - The current git branch in brackets (e.g., [main])

  The display format will look like: marco-kretz.de [main]
```

Und das Ergebnis sieht dann so aus. Einfacher geht's nicht!

![Claude Code Status-Line](/images/cc-statusline-git.png)

Hier sind natürlich der Kreativität keine Grenzen gesetzt. Man kann mit Farben arbeiten, mit externen Programmen und vieles mehr. Es gibt zahlreiche GitHub-Repos, die vollständig angepasste Status-Lines vorkonfigurieren.

## Die CLAUDE.md Datei

Eine der mächtigsten Funktionen von Claude Code, die viele übersehen: Die **CLAUDE.md** Datei im Projekt-Root. Diese Datei wird automatisch von Claude Code eingelesen und dient als zentrale Wissensbasis über dein Projekt. Sieh es als eine "README für Claude".

Neben der projekt-spezifischen CLAUDE.md gibt es auch eine **globale Version** unter `~/.claude/CLAUDE.md`, die für alle Projekte gilt. Perfekt für persönliche Präferenzen wie bevorzugte Sprache, Coding-Style oder allgemeine Anweisungen.

### Wofür ist die CLAUDE.md?

Die CLAUDE.md enthält alle projekt-spezifischen Informationen, die Claude kennen sollte:

- Projekt-Struktur und Architektur
- Code-Konventionen und Best Practices
- Tech-Stack und verwendete Libraries
- Design-Patterns und Coding-Standards
- Deployment-Prozesse
- Häufige Tasks und wie sie umgesetzt werden

Der große Vorteil: Man muss diese Infos nicht bei jedem Chat neu erklären. Claude liest die Datei automatisch ein und kennt somit den Projekt-Kontext.

### Ein praktisches Beispiel

Für meine Website könnte ich z. B. solch eine CLAUDE.md erstellen:

````markdown
# AI Agent Guidelines for marco-kretz.de

## Project Overview

**Type**: Personal business card website with blog
**Framework**: Astro 5.x (Static Site Generator)
**Styling**: Tailwind CSS 3.x
**Deployment**: Static hosting via Vercel

### Design Philosophy

- **Theme**: Modern terminal-inspired design
- **Vibe**: "Coder" aesthetic without being too hacky
- **Tone**: Professional, warm, approachable

### Color Palette

```css
Background: #0d1117 (dark terminal)
Border:     #30363d (subtle borders)
Text:       #c9d1d9 (primary text)
Accent:     #d29922 (warm amber)
```

### Things to avoid

- ❌ Don't change the color palette significantly
- ❌ Don't add heavy frameworks without discussion
- ❌ Don't make the design too "hacker-ish"
````

Jetzt weiß Claude automatisch:

- Welche Farben verwendet werden sollen
- Welche Framework-Version im Einsatz ist
- Was der Design-Stil ist
- Was vermieden werden soll

### Weitere Inhalte für die CLAUDE.md

Je nach Projekt können folgende Abschnitte sinnvoll sein:

**Projektstruktur:**

```markdown
## Project Structure

src/
├── components/ # Reusable Astro components
├── content/blog/ # Blog post markdown files
├── layouts/ # Page layouts
└── pages/ # Routes
```

**Coding-Konventionen:**

```markdown
## Coding Conventions

- Use TypeScript strict mode
- Prefer Tailwind utilities over custom CSS
- Component names in PascalCase
- Max line length: 100 characters
```

**Commit-Conventions:**

```markdown
## Git Commit Format

feat(scope): Add new feature
fix(scope): Bug fix
docs(scope): Documentation update
```

**Deployment:**

```markdown
## Deployment

- Push to `main` triggers auto-deployment
- Run `npm run build` before pushing
- Check build locally with `npm run preview`
```

### Warum das so hilfreich ist

Ohne CLAUDE.md muss man bei jedem neuen Chat erklären: "Wir nutzen Astro, bitte keine React-Komponenten, achte auf die Farben, halte dich an unsere Commit-Conventions..."

Mit CLAUDE.md kennt Claude das alles bereits. Das spart Zeit und führt zu konsistenteren Ergebnissen. Besonders bei längeren Projekten oder im Team ist das Gold wert.

### Tipp: AGENTS.md für Modularität

Für größere Projekte kann man die CLAUDE.md auch modular gestalten. In meinem Projekt referenziere ich eine separate AGENTS.md:

**CLAUDE.md:**

```markdown
@AGENTS.md
```

**AGENTS.md:**

```markdown
# AI Agent Guidelines for marco-kretz.de

[Alle detaillierten Informationen hier...]
```

So bleibt die Struktur sauber und man kann verschiedene Instruktions-Dateien für unterschiedliche Aspekte des Projekts anlegen.

## Custom-Commands und Skills

Wie bereits erwähnt, lassen sich in Claude Code eigene Commands definieren. Was viele nicht wissen: Es gibt dabei zwei verschiedene Konzepte - **Slash Commands** und **Agent Skills**. Beide haben ihre Berechtigung, aber für völlig unterschiedliche Use-Cases.

### Slash Commands vs. Skills

| Aspekt            | Slash Commands                  | Agent Skills                        |
| ----------------- | ------------------------------- | ----------------------------------- |
| **Aufruf**        | Explizit via `/command`         | Claude erkennt und nutzt bei Bedarf |
| **Komplexität**   | Einfache Prompts                | Komplexe Workflows                  |
| **Dateistruktur** | Eine `.md`-Datei                | Ordner mit `SKILL.md` + Dateien     |
| **Verwendung**    | Wiederkehrende Standard-Prompts | Komplexe Multi-Step-Workflows       |

**Slash Commands** sind im Grunde gespeicherte Prompts, die man immer wieder verwenden möchte. Man ruft sie explizit auf, indem man `/command-name` tippt. Perfekt für wiederkehrende Aufgaben wie "Review meinen Code" oder "Schreibe einen Commit".

**Agent Skills** hingegen sind komplexere Fähigkeiten, die Claude automatisch erkennt und verwendet, wenn sie zur Aufgabe passen. Sie können mehrere Dateien, Skripte und detaillierte Anleitungen enthalten. Claude entscheidet selbst, wann ein Skill relevant ist.

### Eigene Slash Commands erstellen

Slash Commands sind schnell erstellt. Man legt einfach eine Markdown-Datei an - entweder projekt-spezifisch oder global für alle Projekte:

**Projekt-Commands** (werden via Git geteilt):

```bash
.claude/commands/review.md
```

**Globale Commands** (nur für dich):

```bash
~/.claude/commands/optimize.md
```

#### Ein einfaches Beispiel

Erstellen wir einen Command, der Code auf Performance-Probleme überprüft:

```markdown
---
description: Analysiere Code auf Performance-Probleme
---

Analysiere diesen Code auf Performance-Probleme und schlage Optimierungen vor:

- Identifiziere Bottlenecks
- Schlage algorithmische Verbesserungen vor
- Empfehle Caching-Strategien
```

Speichern als `.claude/commands/optimize.md`, fertig! Nun kann man via `/optimize` jederzeit eine Performance-Analyse starten.

#### Commands mit Argumenten

Noch mächtiger wird es mit Argumenten. Mit `$ARGUMENTS` (für alle Argumente) oder `$1`, `$2` usw. (für einzelne) lassen sich dynamische Werte übergeben:

```markdown
---
argument-hint: [issue-nummer]
description: Behebe ein spezifisches GitHub-Issue
---

Behebe Issue #$ARGUMENTS gemäß unseren Coding-Standards.
Erstelle dabei Tests und aktualisiere die Dokumentation.
```

Aufruf dann via `/fix-issue 123`.

#### Bash-Befehle und Datei-Referenzen

Commands können auch Bash-Befehle ausführen (mit `!`) oder direkt auf Dateien verweisen (mit `@`):

```markdown
---
allowed-tools: Bash(git status:*), Bash(git diff:*)
description: Review aktueller Git-Changes
---

## Aktueller Status

!`git status`

## Diff der Änderungen

!`git diff HEAD`

Bitte reviewe die obigen Änderungen auf Code-Qualität und Best Practices.
```

### Agent Skills erstellen

Skills sind komplexer, aber auch mächtiger. Sie bestehen aus mindestens einem Ordner mit einer `SKILL.md`-Datei:

```
.claude/skills/blog-review/
└── SKILL.md
```

Oder mit zusätzlichen Dateien:

```
.claude/skills/pdf-processing/
├── SKILL.md
├── FORMS.md
├── REFERENCE.md
└── scripts/
    └── fill_form.py
```

#### Ein praktisches Beispiel

Für meinen Blog könnte ich einen Review-Skill erstellen, der automatisch aktiv wird, wenn ich Claude bitte, einen Blogpost zu prüfen:

**`.claude/skills/blog-review/SKILL.md`**:

```yaml
---
name: blog-review
description: "Review blog posts for quality and consistency. Use when reviewing blog content or improving blog posts."
allowed-tools: [Read, Grep]
---

# Blog Post Review

## Standards für marco-kretz.de

- Terminal-inspiriertes Design
- Professioneller, warmer, zugänglicher Ton
- Code-Beispiele mit Syntax-Highlighting
- Frontmatter: title, description, pubDate (Pflicht)

## Review-Checkliste

Beim Review von Blogposts prüfe:

1. **Content-Qualität**
   - Klare, ansprechende Sprache
   - Praktische Code-Beispiele
   - Korrekte Markdown-Syntax

2. **Format**
   - Alle Pflichtfelder im Frontmatter
   - Datei in src/content/blog/
   - Slug passt zum Dateinamen

3. **Style**
   - Terminal-Ästhetik eingehalten
   - Professioneller Ton
   - Keine zu grellen Farben
```

Jetzt muss ich Claude nicht mehr jedes Mal die Projekt-Standards erklären - der Skill wird automatisch aktiv, sobald ich sage: "Bitte reviewe meinen neuen Blogpost".

### Skills testen und debuggen

Um zu sehen, welche Skills verfügbar sind, kann man Claude einfach fragen:

```text
> What skills are available?
```

Funktioniert ein Skill nicht wie erwartet, hilft oft ein Blick auf die YAML-Syntax. Häufige Fehler:

- Leerzeilen vor dem `---` am Anfang
- Tabs statt Spaces in der Indentierung
- Fehlende oder falsche `name` und `description`

### Wann nutze ich was?

**Slash Commands** sind ideal für:

- Wiederkehrende, explizite Prompts
- Einfache, einmalige Anweisungen
- Quick-Templates

**Agent Skills** sind perfekt für:

- Komplexe Workflows, die Claude automatisch erkennen soll
- Team-weite Standards und Guidelines
- Multi-File-Dokumentation mit Scripts

Für mein Projekt nutze ich Commands für wiederkehrende Tasks wie `/commit` oder `/review-pr`, während Skills die projekt-spezifischen Standards und Patterns meiner Astro-Website kodieren.

## Schlusswort

Claude Code ist extrem mächtig und sehr stark auf die eigenen Bedürfnisse anpassbar. Ich habe hier längst nicht alle Features angerissen. Es gibt noch einen eingebauten Plugin-Store, Hooks, Agents und mehr. Dazu werde ich aber einen eigenen Post verfassen.

Und jetzt viel Spaß beim Coden :)
