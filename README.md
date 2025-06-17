# Gabler IT-Drift Dashboard

## Prosjektoversikt

Dette prosjektet er utviklet som en fagprøve innen IT-utviklerfaget, med mål om å løse et konkret forretningsproblem for Gabler AS. Dashboardet er designet for å gi IT-ansvarlige og andre nøkkelpersoner i bedriften en visuell og datadrevet oversikt over volumet og typen av helpdesk-saker IT-drift mottar. Formålet er å muliggjøre databaserte beslutninger for å identifisere og adressere "showstoppers" – gjentatte problemer med systemer eller applikasjoner som reduserer de ansattes produktivitet og medfører unødvendige kostnader.

**Visjon:** Å transformere anekdotisk feedback om IT-problemer til kvantifiserbare statistikker, slik at Gabler kan ta proaktive grep for å forbedre IT-infrastrukturen, optimalisere arbeidsflyt og øke den generelle produktiviteten.

## Funksjonalitet

Dashboardet tilbyr følgende kjernefunksjonalitet:

* **Autentisering:** Sikker innlogging med Microsoft Entra ID (tidligere Azure AD) for å sikre at kun autoriserte brukere får tilgang til sensitive data.
* **Oversikt over helpdesk-saker:** Viser de siste 50 innkomne helpdesk-sakene for rask overblikk.
* **Nøkkelordsfiltrering og visualisering (Pie Chart):** En interaktiv kakediagram som visualiserer fordelingen av helpdesk-saker basert på nøkkelord filtrert fra sakstitler. Dette gir umiddelbar innsikt i de mest frekvente problemområdene.
* **Trendanalyse (Line Chart):** En linjediagram som viser utviklingen av saksvolum over tid, slik at IT-drift kan identifisere trender og sesongmessige mønstre.
* **Responsivt Design:** Bruker React-Bootstrap for å sikre en god brukeropplevelse på tvers av ulike skjermstørrelser og enheter.
* **Feilhåndtering:** Innebygde mekanismer for å informere brukeren ved API-feil eller andre uforutsette hendelser.

## Teknologi-stakk

Prosjektet er bygget med moderne webteknologier for å sikre skalerbarhet, ytelse og vedlikeholdbarhet:

* **Frontend:**
    * **React:** Et JavaScript-bibliotek for å bygge brukergrensesnitt. Valgt for dets komponentbaserte arkitektur, virtuelle DOM for ytelse, og et stort økosystem av verktøy og biblioteker.
    * **Chart.js:** Et enkelt, men kraftig JavaScript-bibliotek for datavisualisering, brukt for å generere de interaktive kakediagrammene og linjediagrammene.
    * **Axios:** En løftebasert HTTP-klient for nettleseren og Node.js, brukt for å forenkle API-kall.
    * **React-Bootstrap:** En implementasjon av Bootstrap-komponenter for React, brukt for rask og responsiv UI-utvikling, samt for å sikre god universell utforming.
    * **React Router DOM:** For klient-side ruting og navigasjon mellom sidene i applikasjonen.
* **Autentisering:**
    * **Microsoft Entra ID (tidligere Azure AD):** Microsofts skybaserte identitets- og tilgangsstyringstjeneste, valgt for sikker og skalerbar autentisering i et enterprise-miljø.
    * **MSAL.js (Microsoft Authentication Library for JavaScript):** Et bibliotek som gjør det enkelt å integrere Entra ID-autentisering i JavaScript-applikasjoner.
* **Data Kilde (Simulert):**
    * For fagprøven simuleres data basert på et uttrekk fra Jira REST API. Dette er for å demonstrere funksjonalitet uten å kreve direkte integrasjon med et levende Jira-system. Løsningen er designet for enkel overgang til et faktisk API.
* **Versjonskontroll:**
    * **Git / GitHub:** Brukes for versjonskontroll, samarbeid og sporing av endringer i kildekoden.

## Installasjon og Kjøring (Lokal Utvikling)

For å sette opp og kjøre prosjektet lokalt, følg disse trinnene:

1.  **Klon repositoryet:**
    ```bash
    git clone [DITT_GITHUB_REPO_URL]
    cd gabler-it-dashboard
    ```
2.  **Installer avhengigheter:**
    ```bash
    npm install
    # eller
    yarn install
    ```
3.  **Konfigurer Entra ID (hvis du skal teste autentisering lokalt):**
    * Registrer en applikasjon i din Entra ID-leier.
    * Opprett en `.env` fil i rotmappen av prosjektet ditt.
    * Legg til følgende variabler (erstatt plassholderne med dine egne verdier):
        ```
        REACT_APP_AZURE_CLIENT_ID=<Din_Applikasjons-ID_fra_Entra_ID>
        REACT_APP_AZURE_TENANT_ID=<Din_Tenant-ID_fra_Entra_ID>
        REACT_APP_AZURE_REDIRECT_URI=http://localhost:3000
        ```
    * Sørg for at `http://localhost:3000` er registrert som en gyldig omdirigerings-URI for din Entra ID-applikasjon.
4.  **Start utviklingsserveren:**
    ```bash
    npm start
    # eller
    yarn start
    ```
    Applikasjonen vil nå være tilgjengelig på `http://localhost:3000`.

## Utplassering (Deployment)

Dashboardet er designet for å deployeres som en Single Page Application (SPA) til en skyplattform.

* **Azure Static Web Apps:** Prosjektet er konfigurert for utplassering til Azure Static Web Apps for enkel hosting, global tilgjengelighet og integrert CI/CD (Continuous Integration/Continuous Deployment) fra GitHub. Dette gir en kostnadseffektiv og skalerbar løsning.
* **CI/CD Pipeline:** En GitHub Actions-arbeidsflyt vil automatisk bygge og distribuere applikasjonen ved hver push til `main`-grenen.

## Sikkerhet og Personvern

Sikkerhet og personvern har vært sentrale hensyn gjennom hele utviklingsprosessen, i tråd med relevante lovverk og bransjestandarder:

* **Microsoft Entra ID:** Brukes for robust og sentralisert identitetsstyring, og sikrer autentisering av brukere. Dette minimerer risikoen for uautorisert tilgang.
* **HTTPS:** All kommunikasjon er sikret med HTTPS for å beskytte data i transit.
* **Prinsippet om minst privilegium:** Tilgang til data og funksjonalitet er begrenset til det absolutt nødvendige.
* **GDPR (General Data Protection Regulation):** Designvalg og implementasjon tar hensyn til GDPRs prinsipper for dataminimering, formålsbegrensning og innebygd personvern. Ingen personidentifiserbare data lagres lokalt i applikasjonen utover det som er nødvendig for autentisering og sesjonsstyring, og all data som visualiseres, er anonymisert eller aggregert der det er hensiktsmessig.
* **DORA (Digital Operational Resilience Act):** Selv om DORA primært gjelder for finansielle enheter, er prinsippene for digital operasjonell motstandsdyktighet (f.eks. robusthet, testbarhet, hendelseshåndtering) vurdert og innarbeidet i designet. Løsningen er bygget for å være robust og for å gi innsikt som kan støtte Gablers evne til å opprettholde kritiske IT-tjenester.

## Bidrag og Fremtidig Utvikling

Dette dashboardet er utviklet som en del av en fagprøve og representerer en prototype. Potensielle fremtidige forbedringer og utvidelser kan inkludere:

* **Direkte integrasjon med Jira API:** For å hente sanntidsdata.
* **SCIM (System for Cross-domain Identity Management):** For å automatisere brukertilgang og provisjonering i et større økosystem.
* **Mer avansert rapportering:** Mulighet for dypere analyser, tilpassede rapporter og eksport av data.
* **Ytelsesoptimalisering:** Ved caching av data eller server-side rendering for store datasett.
* **Utvidet universell utforming:** Videre testing og forbedringer for å sikre full tilgjengelighet for alle brukere, samt legge til et admingrensesnitt, med Azure RBAC tilgang. 

## Kontakt

For spørsmål eller tilbakemeldinger angående dette prosjektet:

Morten Pettersen Ollestad
mpo@gabler.no / mortenollestad451@gmail.com 
https://www.linkedin.com/in/morten-pettersen-ollestad-019054251/

---
