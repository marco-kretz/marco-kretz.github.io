---
title: 'Agent Skills einfach hinzufügen'
description: 'Wie man ganz leicht Agent Skills aus beliebigen Git-Repositories installieren kann'
pubDate: 2026-01-16
readTime: '5 min'
tags: ['Claude Code', 'OpenCode', 'Tipps', 'Codex', 'CLI', 'GitHub']
---

<img src="/images/add-agent-skills.webp" alt="Agent Skills hinzufügen">

Agent Skills gehören zu den mächtigsten Features von modernen Coding-Agenten wie Claude Code, OpenCode oder Codex. Sie erweitern die Fähigkeiten deines Agents um spezialisierte Workflows und Anweisungen, ohne dass du jedes Mal alles neu erklären musst.

Aber wie kommt man an diese Skills? Manuell aus GitHub-Repositories klonen, Dateien kopieren, Ordnerstrukturen anlegen? Das ist mühsam. Zum Glück gibt es **add-skill**, ein CLI-Tool von Vercel Labs, das genau dieses Problem löst.

## Was sind Agent Skills?

Agent Skills sind wiederverwendbare Anweisungssets, die deinen Coding-Agenten erweitern. Sie werden in einer `SKILL.md`-Datei mit YAML-Frontmatter definiert und enthalten sowohl einen `name` als auch eine `description`. Der Agent erkennt anhand der `description` automatisch, wann ein Skill relevant ist und nutzt ihn dann.

Skills können einfache Anweisungen sein, aber auch komplexe Multi-Step-Workflows mit mehreren Dateien, Skripten und Referenzen enthalten. Sie sind perfekt für:

-   Spezialisierte Code-Reviews (z.B. WordPress Performance)
-   Automatisierte Release Notes aus Git-History
-   PR-Erstellung nach Team-Konventionen
-   Integration mit externen Tools (Linear, Notion, etc.)

## add-skill: Installation in einem Befehl

**add-skill** ist ein npx-Tool, das Skills direkt aus Git-Repositories installiert. Es unterstützt OpenCode, Claude Code, Codex, Cursor und Antigravity, also praktisch alle gängigen Coding-Agenten.

### Installation

Die Installation ist denkbar einfach:

```bash
npx add-skill vercel-labs/agent-skills
```

Das Tool erkennt automatisch, welche Agenten du installiert hast, und installiert die Skills in die richtigen Verzeichnisse. Fertig.

### Verschiedene Quellen

**add-skill** unterstützt verschiedene Quellformate:

```bash
# GitHub Shorthand
npx add-skill vercel-labs/agent-skills

# Vollständige GitHub-URL
npx add-skill https://github.com/vercel-labs/agent-skills

# Direkter Pfad zu einem Skill in einem Repo
npx add-skill https://github.com/vercel-labs/agent-skills/tree/main/skills/frontend-design

# GitLab URL
npx add-skill https://gitlab.com/org/repo

# Beliebige Git-URL
npx add-skill git@github.com:vercel-labs/agent-skills.git
```

### Nützliche Optionen

| Option                    | Beschreibung                                                      |
| ------------------------- | ----------------------------------------------------------------- |
| `-g, --global`            | Installation ins Home-Verzeichnis (für alle Projekte)             |
| `-a, --agent <agents...>` | Spezifische Agenten: `opencode`, `claude-code`, `codex`, `cursor` |
| `-s, --skill <skills...>` | Nur bestimmte Skills installieren                                 |
| `-l, --list`              | Verfügbare Skills auflisten ohne Installation                     |
| `-y, --yes`               | Alle Bestätigungen überspringen (perfekt für CI/CD)               |

### Praktische Beispiele

```bash
# Skills auflisten
npx add-skill vercel-labs/agent-skills --list

# Nur bestimmte Skills installieren
npx add-skill vercel-labs/agent-skills --skill frontend-design --skill skill-creator

# Für spezifische Agenten
npx add-skill vercel-labs/agent-skills -a claude-code -a opencode

# Global installieren (für alle Projekte)
npx add-skill vercel-labs/agent-skills -g -y
```

## Praktisches Beispiel: WordPress Performance Review Skill

Hier mal ein Beispiel, wie das in der Praxis aussieht. Ich installiere den **WordPress Performance Review Skill** aus dem Repository von elvismdev:

```bash
npx add-skill https://github.com/elvismdev/claude-wordpress-skills/tree/master/skills/wp-performance-review
```

Dieser Skill erweitert deinen Agenten um systematische Performance-Analysen für WordPress-Code. Er scannt automatisch nach kritischen Problemen wie:

-   **Unbounded Queries** (`posts_per_page => -1`)
-   **Cache-Bypass** (`session_start()` auf Frontend)
-   **N+1 Query Problems** (Datenbankabfragen in Loops)
-   **Polling-Patterns** in JavaScript (`setInterval` + fetch)

### Wie der Skill funktioniert

Der Skill wird automatisch aktiv, wenn du deinen Agenten bittest, WordPress-Code auf Performance-Probleme zu überprüfen. Du musst nicht explizit den Skill aufrufen – der Agent erkennt anhand der `description` im Frontmatter, wann der Skill relevant ist:

```yaml
---
name: wp-performance-review
description: WordPress performance code review and optimization analysis.
    Use when reviewing WordPress PHP code for performance issues,
    auditing themes/plugins for scalability, optimizing WP_Query,
    analyzing caching strategies, checking code before launch,
    or detecting anti-patterns...
---
```

### Beispiel-Output

Wenn du jetzt deinen Agenten bittest: "Bitte überprüfe diesen WordPress-Plugin-Code auf Performance-Probleme", wird der Skill automatisch aktiv und liefert strukturierte Ergebnisse:

```markdown
## Performance Review: my-plugin.php

### Critical Issues

-   **Line 42**: Unbounded query (`posts_per_page => -1`) -
    Will cause memory exhaustion at scale -
    Set reasonable limit (e.g., 100) and paginate if needed

-   **Line 78**: `session_start()` on frontend -
    Bypasses all page caching -
    Remove or move to admin-only context

### Warnings

-   **Line 156**: Database query inside loop (N+1 problem) -
    Query multiplication under load -
    Fetch all data before loop, use `wp_cache_get_multiple`

### Recommendations

-   Consider using `no_found_rows => true` for non-paginated queries
-   Wrap `url_to_postid()` calls with object cache

### Summary

-   Total issues: 2 Critical, 1 Warning, 2 Info
-   Estimated impact: High
```

Der Skill kennt WordPress-spezifische Anti-Patterns, berücksichtigt verschiedene Hosting-Umgebungen (Managed WordPress, Self-Hosted, Shared Hosting) und liefert konkrete Lösungsvorschläge mit Code-Beispielen.

## Installation-Pfade

Skills werden je nach Agent und Scope an unterschiedlichen Orten installiert:

### Projekt-Level (Standard)

Skills werden im aktuellen Projekt installiert und können via Git geteilt werden:

| Agent       | Pfad                      |
| ----------- | ------------------------- |
| OpenCode    | `.opencode/skill/<name>/` |
| Claude Code | `.claude/skills/<name>/`  |
| Codex       | `.codex/skills/<name>/`   |
| Cursor      | `.cursor/skills/<name>/`  |

### Global (`--global`)

Skills werden im Home-Verzeichnis installiert und sind für alle Projekte verfügbar:

| Agent       | Pfad                               |
| ----------- | ---------------------------------- |
| OpenCode    | `~/.config/opencode/skill/<name>/` |
| Claude Code | `~/.claude/skills/<name>/`         |
| Codex       | `~/.codex/skills/<name>/`          |
| Cursor      | `~/.cursor/skills/<name>/`         |

Ich hoffe inständig, dass sich in absehbarer Zeit auch hier auf einen gemeinsamen Standard geeinigt wird!

## Eigene Skills erstellen

Natürlich kannst du auch eigene Skills erstellen. Die Struktur ist einfach:

```
.claude/skills/my-skill/
└── SKILL.md
```

Die `SKILL.md` benötigt YAML-Frontmatter mit `name` und `description`:

```markdown
---
name: my-skill
description: What this skill does and when to use it
---

# My Skill

Instructions for the agent to follow when this skill is activated.
```

**add-skill** sucht automatisch nach Skills in diesen Verzeichnissen:

-   Root-Verzeichnis (wenn `SKILL.md` vorhanden)
-   `skills/`
-   `skills/.curated/`
-   `skills/.experimental/`
-   `.claude/skills/`
-   `.opencode/skill/`
-   `.cursor/skills/`

## Fazit

**add-skill** macht die Installation von Agent Skills zum Kinderspiel. Statt manuell Repositories zu klonen und Dateien zu kopieren, reicht ein einziger Befehl. Das Tool erkennt automatisch deine installierten Agenten und installiert die Skills an den richtigen Stellen.

Besonders praktisch: Du kannst Skills aus beliebigen Git-Repositories installieren – nicht nur aus offiziellen Sammlungen. Das öffnet die Tür für Community-Skills, Team-interne Skills oder eigene, spezialisierte Workflows.

Für mich ist **add-skill** ein Must-Have-Tool. Es spart Zeit und macht die Arbeit mit Agent Skills deutlich angenehmer. Probier es einfach mal aus: ein `npx add-skill vercel-labs/agent-skills --list` zeigt dir, was alles verfügbar ist.

<a href="https://github.com/vercel-labs/add-skill" target="_blank" rel="noopener">add-skill auf GitHub</a>
