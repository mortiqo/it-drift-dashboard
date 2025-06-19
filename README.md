# IT-Drift Dashboard – Systemdokumentasjon (Sammendrag generert av AI)

> Dette er et AI-generert sammendrag basert på brukerens opprinnelige systemdokumentasjon og brukerveiledning. Sammendraget er laget for GitHub README-format og gir en oversikt over formål, teknologi, sikkerhet og videreutvikling.

---

## 📌 Introduksjon

**IT-Drift Dashboard** er en webapplikasjon utviklet for å gi oversikt over helpdeskhenvendelser filtrert på applikasjoner. Den er skreddersydd for Gabler og bidrar til datadrevet beslutningstaking i IT-Drift og ledergruppen.

---

## ⚙️ Teknologistack

- **Frontend:** React
- **Datavisualisering:** ChartJS
- **Datahåndtering:** Axios
- **UI:** Bootstrap
- **Autentisering:** Microsoft Entra ID (MSAL)
- **Hosting:** Azure Static Web App
- **Datahenting:** Postman + PowerShell fra Jira REST API
- **Versjonskontroll:** GitHub

---

## 🎯 Formål og brukerbehov

- Visualisere volumet av helpdeskhenvendelser per applikasjon
- Gi innsikt til IT-Drift, CTO og ledergruppen
- Brukes i vurderinger av nye applikasjoner og forbedringsprosjekter
- Forenkle rapportering og støtte beslutningsprosesser med statistikk

---

## 🧑‍💼 Målgruppe

- Ansatte i IT-Drift
- CTO
- Ledergruppen i Gabler

---

## 🧩 Systemarkitektur

- Data hentes via Postman fra Jira API og vaskes med PowerShell
- JSON-data leses av Axios og visualiseres i ChartJS
- Tilgangsstyring skjer via Entra ID og gruppemedlemskap i `itd-helpdeskdashboard-user`
- MFA er påkrevd ved pålogging utenfor Gablers nettverk

---

## 🔐 Sikkerhet og etterlevelse

- **GDPR:** Persondata som e-post, reporter og assignee fjernes
- **DORA:** System og dataflyt er dokumentert og vurdert mhp. risiko og kontinuitet
- **Entra ID:** Brukes for autentisering, SSO og RBAC
- **HTTPS:** Tvangsaktivert via Azure Static Web App
- **Sign-in logs:** Logging av tilgang i Entra gir revisjonsspor
- **Tokens og API-nøkler:** Lagres i sikre miljøvariabler

---

## 📊 Funksjonalitet

- **Piechart:** Fordeling av saker etter nøkkelord
- **Linjediagram:** Saksmengde over tid (dag, 7 dager, 30 dager)
- **(Kommende)** Barchart: Status på saker (`done`, `in progress`, `not started`)
- **Responsivt design:** Bootstrap sikrer bruk på mobil, nettbrett og desktop
- **Login:** Bruker MSAL for Entra ID-autentisering
- **Feilhåndtering:** Viser "Laster data" ved Axios-feil

---

## 🧪 Testing og kvalitet

### Manuell testing utført:

- Filtrering av nøkkelord og tidsintervaller
- Innlogging med Entra ID og MFA
- Responsivt design testet på ulike enheter
- Tilgangsstyring testet med/uten medlemskap i AD-gruppe
- HTTPS-beskyttelse verifisert

---

## 🛡 Risikovurdering

| Trussel                          | Konsekvens                                         | Tiltak                                      |
|----------------------------------|----------------------------------------------------|---------------------------------------------|
| Uautorisert tilgang              | Eksponering av sensitive data                     | Entra ID + MFA + RBAC                       |
| Eksponering av personopplysninger | GDPR-brudd og tap av tillit                       | PowerShell-datavask                         |
| Feil i visualisering             | Feil beslutningsgrunnlag                          | Filtrering og kontroll i frontend           |
| Utdaterte biblioteker            | Sikkerhetshull                                    | Bruk av oppdaterte biblioteker + GitHub     |

---

## 🚀 Videreutvikling og forbedringspotensial

- Fullintegrasjon med Jira REST API via Azure Functions
- Flytte datavask til backend
- Lagring av filtrert JSON i Azure Blob Storage
- Legge til bar chart for statusvisning
- Admin-grensesnitt for brukermønstre og logganalyse
- Søkefunksjon for nøkkelord
- Utvidelse til andre helpdesk-køer (f.eks. GROW)

---

## 📚 Dekning av læreplanmål (IT-utviklerfaget IUV03-01)

### Kjerneelementer

- **Etikk og lovverk:** Etterlever GDPR og DORA
- **Kodeferdigheter:** Strukturert React-kode, komponentbasert utvikling
- **Sikkerhet:** MFA, RBAC, ingen lagring av personopplysninger
- **Arkitektur:** Azure Static Web App, planlagt integrasjon med Azure Functions
- **Prosjektmetodikk:** Iterativ utvikling med dokumentasjon

---

## 📥 Installasjon og oppsett

```bash
git clone https://github.com/mortiqo/itdrift-dashboard.git
cd itdrift-dashboard
npm install
npm start
