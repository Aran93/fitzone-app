 FitZone Management App

## 1. System-Architektur & Zielsetzung
Die App ist eine lokale Web-App (gestartet via `npm run`), die als zentrales Verwaltungstool für das Frauen-Fitnessstudio "FitZone" dient. Das System läuft lokal auf einem Laptop und verzichtet auf externe Bezahlschnittstellen. Es dient der reinen Datenverwaltung und Ablaufsteuerung.

---

## 2. Rollen & Berechtigungen (RBAC)
Das System unterscheidet strikt zwischen vier Benutzerrollen:

*   **Inhaberin (Lisa):** Vollzugriff auf alle Daten. Kann Tarife wechseln, Zahlungsstati ändern, Trainer-Statistiken einsehen, Kurse absagen und das Auslastungs-Ampelsystem einsehen.
*   **Rezeption (Jessi):** Kann Mitglieder am Tresen einchecken, neue Studio-Mitglieder anlegen und Kursbuchungen verwalten. Kein Zugriff auf Finanzen oder Trainer-Statistiken.
*   **Trainer (z.B. Marie, Tom):** Sehen ausschließlich ihren persönlichen Wochenplan. Können die Anwesenheitsliste für ihre eigenen Kurse live einsehen und die Anwesenheit ("Da" / "No-Show") abhaken.
*   **Mitglieder:** Können das Video-Archiv sehen (tarifabhängig), Kurse buchen, freie Plätze einsehen und Personal Training buchen.

---

## 3. Datenmodell & Entitäten

### 3.1 Mitglied (User)
*   `id` (UUID, Primary Key)
*   `vorname`, `nachname` (String, Pflichtfeld – zwingend wegen Verwechslungsgefahr)
*   `foto` (URL/Pflicht-String, optional)
*   `geburtsdatum` (Date, optional – falls angegeben: Geburtstags-Trigger)
*   `tarif` (Enum: 'Online', 'Basic', 'Plus', 'Premium')
*   `status` (Enum: 'Aktiv', 'Pausiert', 'Gekündigt', 'Zahlung ausstehend')
*   `ist_gesperrt` (Boolean, Default: false)
*   `gesperrt_bis` (Timestamp, optional)
*   `altvertrag` (Boolean, Default: false – kennzeichnet Verträge mit monatlicher Kündigungsfrist)

### 3.2 Kurs & Kurstermin
*   `id` (UUID)
*   `titel` (String, z.B. 'Yoga', 'Spinning', 'Functional Training')
*   `raum` (Enum: 'Großer Kursraum', 'Spinning-Raum')
*   `max_plaetze` (Integer, z.B. 15 für Functional, 20 für Yoga)
*   `trainer_id` (Foreign Key -> Trainer)
*   `start_zeit` (Timestamp)
*   `dauer_minuten` (Integer, wichtig für Trainer-Abrechnung)
*   `status` (Enum: 'Geplant', 'Storniert')

### 3.3 Buchung
*   `id` (UUID)
*   `mitglied_id` (Foreign Key)
*   `kurstermin_id` (Foreign Key)
*   `status` (Enum: 'Gebucht', 'Warteliste', 'Anwesend', 'No-Show', 'Zu spät storniert')
*   `warteliste_index` (Integer, optional, für Nachrücker-Reihenfolge)
*   `nachrueck_zeitstempel` (Timestamp, für 1-Stunden-Frist)

### 3.4 Personal Training (1-zu-1)
*   `id` (UUID)
*   `trainer_id` (Foreign Key)
*   `mitglied_id` (Foreign Key, optional wenn Slot noch frei)
*   `start_zeit` (Timestamp)
*   `dauer_minuten` (Integer)
*   `raum_benoetigt` (Boolean, falls true -> blockiert 'Großer Kursraum')
*   `preis` (Decimal, 60.00 bis 80.00 € je nach Trainer-Qualifikation)
*   `ist_bezahlt` (Boolean, Default: false)

---

## 4. Kern-Geschäftslogik & Validierungen (Constraints)

### 4.1 Tarif-Restriktionen für Mitglieder
*   **Basic:** Nur Studio-Zutritt. Maximal 2 Kursbuchungen pro Woche. Kein Zugriff auf Videos/Live-Streams.
*   **Plus:** Unbegrenzt Kurse im Studio + voller Zugriff auf das Video-Archiv und Live-Streams.
*   **Premium:** Unbegrenzt Kurse + Video-Archiv + Freigetränke + **1 kostenloser Personal-Training-Slot pro Kalendermonat inklusive**.

### 4.2 Wartelisten- & Nachrücker-Logik
*   Die Warteliste pro Kurs ist auf **maximal 5 Plätze** begrenzt. Danach gilt der Kurs als absolut ausgebucht.
*   Sagt ein Teilnehmer ab, rückt die erste Person der Warteliste nach (*First-Come-First-Served*).
*   **Die 1-Stunden-Regel:** Das nachgerückte Mitglied erhält im Profil den Status "Nachgerückt – Bestätigung offen" und einen Zeitstempel. Das Mitglied hat exakt **1 Stunde Zeit**, um den Platz in der App manuell zu bestätigen. Verstreicht die Frist, verfällt der Anspruch und der nächste auf der Warteliste rückt nach.

### 4.3 No-Show-Sperrsystem
*   Die Trainer haken die Anwesenheit *während* des Kurses live in der App ab.
*   Fehlt ein Mitglied **3-mal hintereinander unentschuldigt** (Status 'No-Show'), setzt das System `ist_gesperrt = true` und `gesperrt_bis = aktuelle_zeit + 14 Tage`.
*   Während dieser 2 Wochen ist das Buchen von Live-Kursen für das Mitglied technisch blockiert.

### 4.4 Stornogebühren-Regelung
*   Absagen bis zu 2 Stunden vor Kursbeginn sind kostenlos.
*   Absagen **unter 2 Stunden** vor Kursbeginn triggern eine Pauschalgebühr von **5,00 €** (gilt für Basic und Plus).
*   **Ausnahme:** Premium-Mitglieder dürfen jederzeit ohne Stornogebühr absagen.
*   Die 5,00 € werden im Profil als offener Posten vermerkt. Die Abrechnung erfolgt manuell außerhalb der App.

### 4.5 Raumkonflikt-Sperre ("Mamma Mia"-Schutz)
*   Das System darf niemals Doppelbuchungen für denselben Raum zur gleichen Zeit zulassen.
*   *Prüfung beim Erstellen eines Kurses oder PT-Slots (mit `raum_benoetigt = true`):* Überschneidet sich die Zeitspanne mit einem bereits existierenden Event im `Großen Kursraum`, wird das Speichern blockiert.
*   **Fehlermeldung:** *"Dieser Raum ist zu der Zeit belegt, wähl einen anderen!"*
*   *Ausnahme:* Personal Trainings im Freihantelbereich oder Outdoor triggern keine Raumsperre. Der `Spinning-Raum` ist exklusiv für Gruppen-Spinning gesperrt.

### 4.6 Onboarding-Prozess
*   **Online-Kunden:** Können sich über ein öffentliches Formular selbst registrieren (*Self-Registration*), wählen den Online-Tarif und sind **sofort aktiv** geschaltet.
*   **Studio-Kunden (Basic, Plus, Premium):** Die Registrierungsfunktion ist für sie blockiert. Sie müssen persönlich erscheinen. Jessi/Lisa legt das Mitglied manuell über das Admin-Formular an. Der Account ist **sofort aktiv** ohne manuelle Freigabeschleifen.

---

## 5. UI/UX & Dashboard-Features

### 5.1 Mitglieder-Ansicht: Die Platzanzeige
*   Mitglieder sehen bei den Kursen live die freien Plätze (z.B. `"Nur noch 3 von 15 Plätzen frei"`). 
*   Fällt die Zahl der freien Plätze unter 4, wird die Anzeige visuell hervorgehoben (Dringlichkeits-Effekt).

### 5.2 Admin-Ansicht: Das Ampelsystem & Trainer-Statistik
*   **Auslastungs-Ampel:** Kurstermine werden basierend auf der Belegung automatisch farblich markiert:
    *   **Grün:** Gute Auslastung (> 75% der Plätze belegt)
    *   **Gelb:** Mittlere Auslastung (40% - 75%)
    *   **Rot:** Schlechte Auslastung (< 40% – Handlungsbedarf für Lisa)
*   **Trainer-Monatsauswertung:** Auf Knopfdruck generiert die App eine Übersicht für einen gewählten Monat: `Trainer | Anzahl geleitete Kurse | Summe geleistete Arbeitsstunden`. Kein Excel-Export nötig, direkte Tabellenansicht.

### 5.3 Tresen-Ansicht: Der Geburtstags-Moment 🎂
*   Checkt Jessi ein Mitglied am Tresen ein, prüft das System das optionale `geburtsdatum`.
*   Stimmen Tag und Monat mit dem aktuellen Datum überein, poppt ein dezentes **Kuchen- oder Konfetti-Symbol** im Check-in-Fenster auf, damit Jessi gratulieren kann.
*   Für Lisa gibt es eine Monatsliste, die alle Mitglieder anzeigt, die im aktuellen Monat Geburtstag feiern (für persönliche Aufmerksamkeiten).