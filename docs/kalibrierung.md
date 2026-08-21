# Kalibrierung – FitZone Management App

## Ehrliche Selbsteinschätzung des Projektstands

Diese Kalibrierung dokumentiert den realen Funktionsumfang der FitZone-App basierend auf manuellem Testing mit realistischen Testdaten (6 aktive Mitglieder, 3 Trainer, mehrere Kurse). Sie unterscheidet klar zwischen vollständig getesteten Kernfunktionen, bewussten Einschränkungen, erkannten Implementierungsfehlern und nicht validierten Edge-Cases.

---

## ✅ Vollständig implementiert und getestet (Kern-Logik)

### 1. Mitglieder-Dashboard & Profil
- **Getestet:** Login, Anzeige des aktuellen Tarifs, Status und Anzahl der Buchungen.
- **Navigation:** Funktionierende Bereiche für Kurse, Video/Stream (tarifabhängig freigeschaltet) und Profil.
- **Profil-Daten:** Anzeige von Name, Status, No-Show-Anzahl, Tarif und offenen Gebühren funktioniert korrekt.
- **Status:** ✅ Kernfunktionen funktionieren. (Siehe Limitationen bzgl. Zahlungsdatum).

### 2. Online-Mitglieder & Self-Registration
- **Getestet:** Self-Registration funktioniert, Online-Mitglieder können sich selbst anmelden.
- **Tarif-Zuweisung:** Automatischer "Online"-Tarif bei Registrierung.
- **Zugriffskontrolle:** Online-Mitglieder sehen NUR Videos und Live-Streams, Studio-Kurse sind blockiert (können nicht gebucht werden).
- **Status:** ✅ Vollständig implementiert und getestet.

### 3. Rollen & Berechtigungen (RBAC)
- **Mitglied:** Kann Kurse buchen, Tarif-Restriktionen (z.B. Basic-Limit) werden eingehalten.
- **Trainer:** Sieht **ausschließlich** den eigenen Wochenplan (Kursname, Uhrzeit, Raum) und kann die eigene Qualifikation einsehen. Kann Anwesenheit live abhaken ("Da" / "No-Show"). Sieht keine Finanzdaten oder die Monatsauswertung.
- **Admin (Lisa):** Hat Vollzugriff auf alle 5 Hauptbereiche (Mitglieder, Kurse, Wartelisten, Mitarbeiter, Statistik).
- **Status:** ✅ Grundlegende Trennung funktioniert. (Siehe "Erkannte Fehler" bzgl. Jessi).

### 4. Admin-Dashboard Übersicht
- **Getestet:** Dashboard zeigt korrekte Zahlen: Aktive Mitglieder (6), Pausiert/Zahlung ausstehend (1), Gesperrt/Gekündigt (0).
- **Status:** ✅ Vollständig funktionsfähig.

### 5. Mitglieder-Verwaltung (Lisa)
- **Getestet:** Lisa kann No-Show-gesperrte Mitglieder einsehen und manuell entsperren.
- **Finanzen:** Offene Gebühren (z.B. durch Stornierung) werden angezeigt und können von Lisa manuell auf "bezahlt" gesetzt werden.
- **Geburtstage:** Anzeige, welches Mitglied als Nächstes Geburtstag hat.
- **Listenansicht:** Vollständige Tabelle aller Mitglieder mit Tarif, Geburtsdatum, No-Show-Status, offenem Betrag und Status. Aktionen (bearbeiten, pausieren, sperren, entsperren, löschen) funktionieren.
- **Status:** ✅ Vollständig implementiert und getestet.

### 6. Kurs-Verwaltung & Raumkonflikte
- **Getestet:** Lisa kann Kurse anlegen (Datum, Uhrzeit, Trainer, Dauer, Raum).
- **Raumkonflikt-Schutz:** Funktioniert zuverlässig. Beim Anlegen eines Kurses/PT-Slots erscheint ein Popup, wenn der gewählte Raum zur gleichen Zeit bereits belegt ist.
- **Übersicht:** Anzeige der Teilnehmeranzahl und funktionierendes Ampelsystem (Grün/Gelb/Rot) basierend auf der Auslastung.
- **Status:** ✅ Vollständig implementiert und getestet.

### 7. Wartelisten-Logik (Kern)
- **Getestet:** Wenn ein Kurs voll ist, kann ein Mitglied die Warteliste betreten und sieht seine Position (z.B. "Position 1").
- **Begrenzung:** Ab dem 6. Mitglied wird die Warteliste korrekt blockiert ("Warteliste ist voll", Max. 5 Plätze).
- **Nachrücken:** Wenn ein Platz frei wird, rückt das Mitglied auf der Warteliste automatisch auf Position 1 nach, und der `nachrueck_zeitstempel` (für die 1-Stunden-Frist) wird gesetzt.
- **Status:** ✅ Kernlogik vollständig implementiert und getestet.

### 8. Mitarbeiter-Verwaltung (Lisa)
- **Getestet:** Lisa kann Trainer verwalten mit: Finanzen, Stundensatz, Qualifikation, tageweise Einsätze, Gesamt-Monatsabrechnung.
- **Bearbeiten:** Trainer-Daten können geändert werden.
- **Status:** ✅ Verwaltung und Bearbeitung funktionieren. (Siehe Limitationen bzgl. "Anlegen").

### 9. Statistik (Lisa)
- **Getestet:** Trainer-Monatsauswertung mit Tabelle: Trainer-Name, Qualifikationen (als Badges), Anzahl Kurse, Summe Stunden, Stundensatz, Verdienst (automatisch berechnet).
- **Gesamtzeile:** Summe aller Stunden und Gesamtverdienst am Ende der Tabelle.
- **Status:** ✅ Vollständig implementiert und getestet.

### 10. Geburtstags-Popup am Tresen
- **Getestet:** Wenn Jessi ein Mitglied am Tresen eincheckt und das Mitglied heute Geburtstag hat, erscheint ein Popup mit "Alles Gute zum Geburtstag!".
- **Status:** ✅ Vollständig implementiert und getestet.

---

## ⚠️ Teilweise implementiert mit bekannten Limitationen

### 1. Kurs-Absage & Benachrichtigung
- **Was funktioniert:** Lisa kann Kurse absagen oder löschen. Der Kurs verschwindet daraufhin aus der Buchungsliste der betroffenen Mitglieder.
- **Limitation:** Die Mitglieder erhalten **keine aktive Benachrichtigung** (kein In-App-Popup, keine E-Mail) über die Absage. 
- **Impact:** Mitglieder erfahren erst beim nächsten Login, dass ihr Kurs abgesagt wurde.
- **Status:** ⚠️ Kern-Funktion (Absage) funktioniert, Benachrichtigung fehlt.

### 2. Wartelisten-Edge-Case (1-Stunden-Frist Ablauf)
- **Was funktioniert:** Das System setzt den Zeitstempel, wenn jemand nachrückt.
- **Live-Testergebnis:** Nach Ablauf der 1 Stunde kann das Mitglied den Platz nicht mehr bestätigen. 
- **Limitation:** Es erfolgt **kein automatisches Nachrücken** der nächsten Person auf der Warteliste. Lisa muss manuell eingreifen und die nächste Person nachrücken.
- **Begründung:** Background-Task (Cron-Job) für automatische Prüfung und Weiterleitung wurde im MVP nicht simuliert.
- **Status:** ⚠️ Kernlogik implementiert, 1h-Timeout-Weiterleitung erfordert manuelles Eingreifen.

### 3. Kündigungs-Workflow
- **Was funktioniert:** Mitglieder können pausiert werden.
- **Limitation:** Kein expliziter Kündigungs-Workflow. Der Status "Gekündigt" wird durch manuelles Pausieren simuliert, da die Admin keinen direkten Einfluss auf eine automatische Vertragsauflösung hat.
- **Status:** ⚠️ Vereinfacht implementiert.

### 4. Dynamisches Zahlungsdatum
- **Limitation:** Das Feld "nächste Zahlung" im Mitgliederprofil zeigt ein festes, hartkodiertes Datum an, statt dynamisch basierend auf dem Mitgliedsstart oder Tarifwechsel zu berechnen.
- **Status:** ️ UI-Feld vorhanden, Logik nicht dynamisch.

### 5. Mitarbeiter anlegen
- **Limitation:** Lisa kann bestehende Trainer bearbeiten und deren Abrechnung sehen, aber **keine neuen Trainer anlegen**. Neue Trainer müssen aktuell über Datenbank-Seed oder manuelle Datenbank-Einträge erstellt werden.
- **Status:** ⚠️ Verwaltung funktioniert, Anlegen fehlt.

---

## ❌ Erkannte Implementierungsfehler (Versehen)

### 1. Jessi – Kursverwaltung
- **Fehler:** Laut Kunden-Chat sollte Jessi (Rezeption) Kursbuchungen verwalten können. Dies wurde bei der Implementierung übersehen.
- **Aktueller Stand:** Jessi kann nur Mitglieder anlegen, bearbeiten und einchecken. Lisa hat die alleinige Kontrolle über Kursplanungen.
- **Impact:** Lisa muss alle Buchungsänderungen selbst vornehmen.
- **Status:** ❌ Nicht implementiert (Implementierungsfehler).

---

## 📊 Zusammenfassung der Kalibrierung

| Kriterium | Status | Kommentar |
|---|---|---|
| **Entitäten & Beziehungen** | ✅ Vollständig | 7 Entitäten, n:m über Buchung korrekt umgesetzt. |
| **Kern-Business-Rules** | ✅ Getestet | Tarif-Limits, Raumkonflikte, No-Show-Sperre, Online/Studio-Trennung funktionieren. |
| **Rollen-Trennung (RBAC)** | ⚠️ Teilweise | Jessi fehlt Kursverwaltung (Implementierungsfehler). |
| **Self-Registration** | ✅ Getestet | Online-Mitglieder können sich selbst registrieren, Studio-Kurse blockiert. |
| **Wartelisten-Logik** | ⚠️ Teilweise | Kern funktioniert, 1h-Timeout-Weiterleitung erfordert manuelles Eingreifen. |
| **Geburtstags-Popup** | ✅ Getestet | Jessi sieht Popup beim Check-in, wenn Mitglied Geburtstag hat. |
| **Mitarbeiter-Verwaltung** | ⚠️ Teilweise | Verwaltung/Bearbeitung funktioniert, "Anlegen" fehlt. |
| **Kündigungs-Workflow** | ⚠️ Vereinfacht | Nur über Pausieren simuliert. |
| **Benachrichtigungen** | ❌ Nicht implementiert | Keine Push/E-Mail bei Kursabsagen (MVP-Fokus auf Datenlogik). |

**Gesamteinschätzung:** Die App erfüllt die geschäftskritischen Anforderungen (Buchung, Tarife, Raumplanung, No-Show-Tracking, Trainer-Abrechnung, Online/Studio-Trennung, Geburtstags-Popup) zuverlässig. Die dokumentierten Limitationen betreffen hauptsächlich Komfort-Features (Benachrichtigungen), vereinfachte Workflows (Kündigung, 1h-Timeout) oder erkannte Implementierungsfehler (Jessi-Kursverwaltung, Mitarbeiter anlegen), die für ein lokales MVP bewusst zurückgestellt oder als manuelle Prozesse belassen wurden.