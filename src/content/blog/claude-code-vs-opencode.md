---
title: 'Schluss mit Vendor Lock-in: Warum ich Cursor für OpenCode verlassen habe'
description: 'Bist du die Abos und starren Limits leid? Ich zeige dir, wie du mit OpenCode und Claude Code die volle Kontrolle über deine KI-Workflows zurückholst – ohne grafischen Ballast.'
pubDate: 2026-01-01
readTime: '8 min'
tags: ['Claude Code', 'OpenCode', 'Comparison', 'Coding', 'CLI']
---

KI-unterstützte Programmierung ist hier, um zu bleiben. Achtung, persönliche Meinung: Ob man es nun mag oder nicht – wer seinen Workflow nicht adaptiert, wird früher oder später den Anschluss verlieren. Ich habe daher versucht, die für mich optimale Kombination aus Tools + Modell zu finden. Ein kleiner Einblick in meine Reise bisher.

## Warum CLI-Tools und keine IDE?

Diese Frage ist total berechtigt. Warum nutze ich nicht einfach einen Editor oder eine IDE mit KI-Integration wie bspw. **Cursor** oder **Antigravity**?
Ist doch super: Alles an einem Ort, maximale Integration, einfache Abrechnung.

Für viele Einsteiger ist das eine solide Lösung. Ich habe selbst lange Cursor genutzt, aber aus diesen vier Gründen den Schlussstrich gezogen:

1. **Vendor Lock-in**: Man setzt alles auf einen Anbieter und gerät so auf Dauer in eine zumindest Teilabhängigkeit.<br>
   Sollte der Anbieter auf einmal sein Produkt ändern, es verkaufen oder seine Preise stark anheben, dann muss man sich mit anpassen oder seinen gesamten Workflow wieder ändern.
2. **Systemunabhängigkeit**: Ich will nicht auf ein grafisches Tool angewiesen sein. Wenn ich auf anderen Systemen, die keine grafische Nutzeroberfläche aufweisen, unterwegs bin, kann ich meine CLI-Tools weiter nutzen.<br>
   <small>Ja, Cursor hat auch inzwischen ein CLI-Tool, was aber mit den Alternativen noch nicht wirklich mithalten kann.</small>
3. **Kosten**: Cursor bietet aktuell für das gezahlte Geld am wenigsten, zumindest wenn man nach den reinen Requests geht. Andere Abonnements bieten für das gleiche Geld deutlich mehr. Antigravity bspw. hat zur Zeit relativ "freundliche" Limits, selbst mit Google AI Pro Abonnement – das sind aber "Lock-Limits", um Kunden an die Plattform zu binden, und diese Limits werden nicht ewig so hoch sein.
4. **Flexibilität**: Wer experimentierfreudig ist oder immer das optimale Modell für die aktuelle Aufgabe nutzen will, ist bei Cursor & Co. auch nicht so gut aufgehoben. Das Auto-Routing funktioniert mal mehr, mal weniger gut, und um selbst das richtige Modell auswählen zu können, muss man sehr mit der Materie vertraut sein. Das Motto **"Opus 4.5 für alles"** ist dumm, unwirtschaftlich und – faktisch gesehen, wenn man mal von den Kosten und den indirekten Folgen für die Umwelt absieht – auch einfach nicht das beste Modell für jede Aufgabe.

## Welche CLI-Tools kommen in Frage?

Wenn wir von agentenbasierten CLI-Tools für's Coden sprechen, dann kommen wir an **Claude Code** nicht vorbei. Der "So wird's gemacht"-Standard, an dem sich alle anderen Tools messen müssen. Auch wenn es andere Tools gibt, die manche Funktionen eventuell früher implementiert hatten, so schafft Anthropic es, diese SOTA-mäßig (State of the Art) umzusetzen.

Ich habe mir einige Konkurrenzprodukte angeschaut, sei es nun **Aider**, **Codex von OpenAI**, **Gemini CLI von Google** oder **Cline**, am besten gefällt mir einfach **OpenCode**. Woran es genau liegt, weiß ich gar nicht, aber ich mag das Interface, die User-Experience, die Konfiguration und auch, dass es mit einem Pay-as-you-Go-Service namens **Zen** kommt, über den ich schnell auf alle, von den Entwicklern als gut befundenen, Modelle zugreifen kann.

### OpenCode

**OpenCode** kommt standardmäßig mit zwei Primär-Agenten (Modi): **Build** und **Plan**. Im Plan-Modus nimmt OpenCode keinerlei Dateiänderungen vor, es wird lediglich ein Plan erstellt, wie man das aktuelle Problem am besten angeht. Nach dem Wechsel in den Build-Modus und einem `implement it` startet OpenCode dann mit der Umsetzung. Das Coole: Man kann für jeden Modus ein separates Modell auswählen, so kann man bspw. Claude's Sonnet 4.5 die Planung übernehmen lassen, während die Planumsetzung, die in der Regel, wenn ein Plan schon existiert, ein nicht ganz so fähiges Modell braucht, von einem etwas günstigeren Modell wie MiniMax M2.1 oder Grok Code Fast übernommen werden kann → maximale Kontrolle.

OpenCode wird unter der **MIT-Lizenz** entwickelt. Das bedeutet, dass der Code beliebig geändert und weitervertrieben werden kann. Es ist ein echtes Open-Source-Projekt in seiner Reinform. Man muss bei eigenen Weiterentwicklungen lediglich einen Verweis auf den Originalautor nennen.

<a href="https://github.com/sst/opencode" target="_blank" rel="noopener">OpenCode auf Github</a>

### Claude Code

**Claude Code** wiederum ist tief verzahnt mit den proprietären Modellen von Anthropic selbst und auf diese hochgradig optimiert. Auch Claude Code hat inzwischen einen Plan-Modus und – wie OpenCode auch – eine sehr gute User-Experience. Es ist anders aufgebaut, aber ebenbürtig in der Benutzung. Die Modellauswahl ist hier eingeschränkter, weil man von Haus aus nur die Anthropic-Modelle Opus, Sonnet und Haiku hat. Wer experimentieren will, muss über Umgebungsvariablen die Modelle manuell ändern und braucht einen Service, der eine Anthropic-kompatible API anbietet wie bspw. von openrouter.ai.

Claude Code hat nur eine proprietäre Lizenz. Es ist nicht gestattet, den Code zu modifizieren und/oder zu verbreiten ohne die ausdrückliche Genehmigung von Anthropic. Es ist mehr ein SaaS-Produkt mit einem CLI-Wrapper.

<a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener">Claude Code auf GitHub</a>

## Der Workflow

Der Fairness halber habe ich beide Tools in ihrer Ausgangskonfiguration getestet und lediglich zwei MCPs bei beiden hinzugefügt:

-   **<a href="https://mcp.grep.app" target="_blank" rel="noopener">grep.app</a>**: Durchsucht blitzschnell Millionen von öffentlichen GitHub-Repositories. Ideal zum Finden von Beispielen zur Implementierung bestimmter Funktionen.
-   **<a href="https://context7.com/" target="_blank" rel="noopener">Context7</a>**: Durchsuchen von Dokumentationen zu tausenden von Bibliotheken.

Hier als Beispiel meine `opencode.json` nur für die MCPs:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "autoupdate": true,
    "mcp": {
        "grep": {
            "type": "remote",
            "url": "https://mcp.grep.app",
            "enabled": true
        },
        "context7": {
            "type": "remote",
            "url": "https://mcp.context7.com/mcp",
            "enabled": true,
            "headers": {
                "CONTEXT7_API_KEY": "<dein-api-key>"
            }
        }
    }
}
```

Und damit OpenCode die MCPs auch nutzt, habe ich folgendes in meine globale `AGENTS.md` geschrieben:

```
## MCP usage

- Use `grep` to lookup code snippets and example implementations
- Use `context7` to lookup current documentation for all kinds of libraries
```

Mein genereller Workflow ist denkbar einfach:

1. Start im **Plan-Modus** und ausführliche Formulierung der anstehenden Aufgabe
2. Vor dem Abschicken überlege ich mir, welches Modell wahrscheinlich am besten geeignet ist, auch mit Blick auf den Kosten/Nutzen-Faktor:<br>
    - Nur eine einfache Anpassung? Da reicht **GLM-4.7**
    - Erstellung von Frontend-Komponenten? Hier ist **Gemini 3 Flash** ungeschlagen
    - Komplexe Planung mit wichtigen und sicherheitsrelevanten Architekturentscheidungen? **Opus 4.5**
3. Durchlesen des gesamten Plans und eventuelle Anpassungen
4. Wechsel in den **Build-Modus** und auf ein einfacheres Modell wie bspw. **Grok Code Fast**, was nur den Plan umsetzen muss. Danach Bestätigung zur Durchführung des erstellten Plans.

Dieser **Plan-First-Ansatz** hat sich in meiner täglichen Programmierarbeit mehr als bewährt. Ich sehe ganz genau, was umgesetzt werden soll, kann nachjustieren und erst nach meiner Freigabe des Plans werden Änderungen durchgeführt.

Für das reine Vibe-Coding ist das natürlich nur mäßig geeignet, weil man für diese Art des Promptings verstehen muss, was das LLM nun machen will. Hat man keinen technischen Background und weiß nicht, was da alles passiert, dann ist der Plan-Modus planlos.

#### Beispiel

Besonders stark ist der Plan-Modus, wenn ich alten PHP-Code in moderne, funktionale Strukturen umbaue. Ich sage dem Agenten: 'Refactor diese Klasse zu einem Readonly DTO und nutze Enums statt Magic Strings.' – Da trennt sich bei den Modellen schnell die Spreu vom Weizen.

### Ergebnis

Beide Tools bieten den Workflow den ich brauche. In Zukunft werde ich mir noch dedizierte Subagents sowie Skills anlegen, um den Kontext meines Haupt-Agenten nicht zu sehr zu verunreinen. Beide Tools können das, hier entscheidet rein das Design und die UX.

## Die Modelle

Das ist das eigentliche Problem. Wir haben inzwischen so viele und auch gute Modelle zur Verfügung, dass man sich, wenn man sich ein bisschen mit der Materie auseinandersetzt, schnell überfordert fühlen kann. Mir geht es ehrlich gesagt genauso. Ich springe immer wieder hin und her. Benchmarks sind erstmal nur ein grober Anhaltspunkt, der aber meistens mit der Wirklichkeit nicht immer übereinstimmt. Benchmarks laufen in einem synthetischen Vakuum - in der Realität gibt es aber viel zu viele Faktoren, die die Qualität der Modelle beeinflussen:

1. Wie gut ist der Prompt des Users?
2. Welchen Umfang hat der Kontext des Prompts?
3. Welche Tools stehen dem LLM zu Verfügung?
4. Wie gut kommuniziert das Tool mit dem LLM?

Tools wie Claude Code oder OpenCode geben den LLMs ja nicht nur den eigenen Prompt mit, sondern auch einen Systemprompt. Dieser beeinflusst stark, was das LLM letzendlich alles tut. Bei Claude Code ist dieser Systemprompt natürlich maximal auf die hauseigenen Modelle maßgeschneidert, hier hat OpenCode einen Nachteil, weil es unmöglich für alle verfügbaren Modelle den optimalen Systemprompt mitgeben kann.

### Kosten

#### Claude

Wem Geld egal ist kann es sich einfach machen: **Claude Max für 90€ - 200€ im Monat**. Solange man immer nur an einer Sache gleichzeitig arbeitet und nicht fünf Claude Code Instanzen an mehreren Projekte gleichzeitig arbeiten lässt, sollte man nur schwer an das monatliche Limit kommen. Man sollte auch beachten, dass der tatsächliche Gegenwert, den man für den Preis in Form von API-Aufrufen bekommt, den tatsächlichen Pay-as-you-Go Preisen überlegen ist. Reizt man also die Limits aus kriegt man mehr Nutzung als würde man jeden Request einzeln bezahlen.

Allerdings nutzt Claude Code als Standard immer Opus 4.5. Das ist zwar das mächtigste Modell, was es derzeit gibts, aber für 80%-90% der täglichen Aufgaben eines Entwicklers auch absoluter Overkill. Auch hat man mit dem Claude Abo nur Zugriff auf die drei Anthropic Modelle. Kein Gemini, kein GPT oder GLM. Experimetieren und optimieren ist hier nicht drin.

Achja, und sollte man das Limit nicht erreichen, hat man trotzdem dafür bezahlt, ohne es zu nutzen.

#### OpenCode Zen

OpenCode Zen ist kein Abo. Man hat ein Credit-Konto, welches man auflädt, und von diesem werden die API-Aufrufe direkt bezahlt. Vorteil: Maximale Kostentransparenz.
Weiterhin bietet Zen Zugriff auf alle großen Modelle:

-   Claude Sonnet 4.5 und Opus 4.5
-   GPT 5.1/5.2
-   Gemini 3 Pro/Flash

Auch einige der besten chinesischen Modelle wie bspw. GLM-4.7 und MiniMax M2.1 stehen zur Verfügung. Da Zen noch in der Anfangsphase ist gibt es immer wieder Modelle komplett zur kostenfreien Nutzung. Aktuell sind das:

-   Grok Code Fast 1
-   Big Pickle (angepasste Variante von GLM-4.6)
-   MiniMax M2.1
-   GLM 4.7

Hier sieht man den Vorteil: Man kann sowohl auf die Modelle von Claude Code, als auch auf alle anderen Zugreifen und so einfach mal ausprobieren, welche Modelle für die eigenen Anforderungen die besten Ergebnisse liefern.

#### OpenCode + Andere Anbieter

OpenCode bietet weiterhin die Möglichkeit sich mit einer ganzen Liste an Drittanbieter-Services/Subscriptions zu verbinden wie bspw.:

-   Anthropic (API oder Subscription)
-   Google (API Key)
-   OpenRouter.ai (API Key)
-   GitHub Copilot

und noch viele mehr! Über ein <a href="https://github.com/NoeFabris/opencode-antigravity-auth" target="_blank">Drittanbieterplugin</a> ist es sogar möglich sich per OAuth mit seiner Google AI Pro Sbscription zu verbinden und so die Antigravity Limits zu nutzen. Geil!

## Fazit

| Feature      | Claude Code                           | OpenCode                                 |
| ------------ | ------------------------------------- | ---------------------------------------- |
| Lizenz       | Proprietär (SaaS-like)                | MIT (Open Source)                        |
| Modelle      | Nur Anthropic (Opus, Sonnet, Haiku)\* | Alle (Claude, GPT, Gemini, GLM, etc.)    |
| Bezahlung    | Abo (Claude Max, fix ca. 90-200€)"    | Pay-as-you-Go (Zen) oder eigene API-Keys |
| Workflow     | Hochgradig optimiert auf Claude       | Maximal flexibel & konfigurierbar        |
| Einstieg     | "It just works"                       | Erfordert etwas mehr Konfiguration       |
| Flexibilität | Gering (Vendor Lock-in)               | Hoch (Anbieter jederzeit wechselbar)     |

<small>\*Andere Modelle/Anbieter über die Änderung von Umgebungsvariablen</small>

Ich könnte hier noch viele Seiten füllen. Dieser Beitrag soll einfach nur einen Einblick in die Möglichkeiten bieten, die es da draußen, abseits vom "Mainstream", gibt. Es stellt sich wie immer die Frage zwischen **Convenience** und **Customization**. Will man ein **funktioniert einfach** und Geld ist nicht so wichtig, geht man mit Claude Max Abo und Claude Code. Will man experimentieren können, neue Dinge testen und seinen eigenen, hochgradig optimierten Workflow schaffen oder eventuell einfach nur **flexibel und anbieterunabhängig** sein, dann wählt man OpenCode mit einem Anbieter seiner Wahl. So oder so bekommt man einen starken Partner für die tägliche Arbeit.

Ebenso wichtig wie das LLM und das Tool sind die eigenen Skills, beides richtig einzusetzen. Erst aus der richtigen Kombination dieser Dinge entsteht die Qualität, die man bei der täglichen Programmierarbeit braucht und auf die man sich verlassen kann.

Ich für meinen Teil werde definitiv bei OpenCode bleiben und weiter versuchen das für mich optimale Setup zu finden.
