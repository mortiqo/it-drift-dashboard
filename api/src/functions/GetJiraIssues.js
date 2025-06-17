// api/src/functions/GetJiraIssues.js

// Importer nødvendige moduler.
// '@azure/functions' er spesifikk for Azure Functions v4 (etter at du installerte den i api/ via 'npm install @azure/functions').
// 'axios' for å gjøre HTTP-kall til Jira API.
// 'dotenv' for å lese .env.local filen ved lokal testing.
const { app } = require('@azure/functions');
const axios = require('axios');
require('dotenv').config(); // Dette laster inn variabler fra .env.local når du tester lokalt

// Definerer Azure Function HTTP-triggeren.
// 'GetJiraIssues' er navnet på funksjonen din, som også vil være en del av URL-en (f.eks. /api/GetJiraIssues).
app.http('GetJiraIssues', {
    methods: ['GET', 'POST'], // Tillater både GET og POST forespørsler. GET er mest relevant her.
    authLevel: 'anonymous',    // Dette krever en API-nøkkel for å kalles. Azure Static Web Apps håndterer dette for deg.
                              // For å teste lokalt uten API-nøkkel, kan du midlertidig sette til 'anonymous'.
                              // HUSK å endre tilbake til 'function' for produksjon hvis du vil ha den sikkerheten!
    
    // Dette er selve handler-funksjonen som kjører når din Azure Function kalles.
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request for Jira issues.');

        // Hent miljøvariabler som inneholder dine Jira-autentiseringsdetaljer.
        // Disse hentes fra process.env, som vil være Azure Application Settings i produksjon
        // og fra .env.local filen din under lokal testing.
        const JIRA_BASE_URL = process.env.JIRA_BASE_URL; // F.eks. https://your-domain.atlassian.net
        const JIRA_API_USERNAME = process.env.JIRA_API_USERNAME; // Din e-postadresse til Jira
        const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;     // Ditt genererte Jira API-token

        // Sjekk om alle nødvendige miljøvariabler er satt.
        if (!JIRA_BASE_URL || !JIRA_API_USERNAME || !JIRA_API_TOKEN) {
            context.log.error("Jira API-detaljer mangler i miljøvariabler. Sjekk konfigurasjonen.");
            return {
                status: 500,
                body: "Serverkonfigurasjonsfeil: Nødvendige Jira API-detaljer mangler."
            };
        }

        // Opprett Basic Authentication-headeren som kreves av Jira API.
        // Dette koder brukernavn og API-token i Base64.
        const authHeader = 'Basic ' + Buffer.from(`${JIRA_API_USERNAME}:${JIRA_API_TOKEN}`).toString('base64');

        // Definer din JQL-spørring (Jira Query Language) for å hente saker.
        // TILPASS DENNE JQL-SPØRRINGEN TIL DINE BEHOV!
        // Eksempler:
        // - Alle åpne saker i prosjekt "ITD": 'project = "ITD" AND statusCategory != "Done" ORDER BY created DESC'
        // - Saker med et spesifikt nøkkelord i summary: 'summary ~ "Uni Micro" ORDER BY created DESC'
        const jqlQuery = 'project = "HELP" ORDER BY created DESC'; // Standard IT-Drift prosjekt, nyeste først

        // Definer hvilke felt du vil hente for hver sak.
        // TILPASS DISSE FALTENE!
        // Husk at jo færre felt, jo raskere respons.
        const fields = 'summary,status,issuetype,created';

        try {
            // Gjør et GET-kall til Jira Cloud REST API's søke-endepunkt.
            const response = await axios.get(`${JIRA_BASE_URL}/rest/api/3/search`, {
                headers: {
                    'Authorization': authHeader, // Bruk den genererte autentiseringsheaderen
                    'Accept': 'application/json' // Fortell Jira at vi forventer JSON-respons
                },
                params: {
                    jql: jqlQuery,      // Din JQL-spørring
                    fields: fields,     // Feltene du vil ha
                    maxResults: 50      // Maks antall resultater å hente. Tilpass dette!
                }
            });

            // ---------- VELDIG VIKTIG: ANONYMISERING OG FILTRERING AV DATA ----------
            // Denne delen er kritisk for GDPR og sikkerhet.
            // Du må sørge for at INGEN SENSITIV INFORMASJON (som personnavn, e-postadresser,
            // eller andre ting som kan identifisere individer) sendes tilbake til frontend.
            // Jira-responsen kan inneholde mye informasjon. Vi mapper den til et nytt objekt
            // og anonymiserer spesifikke felt.
            const anonymizedIssues = response.data.issues.map(issue => ({
                id: issue.id,
                key: issue.key,
                summary: issue.fields.summary,
                status: issue.fields.status.name,
                issueType: issue.fields.issuetype.name,
                priority: issue.fields.priority ? issue.fields.priority.name : 'Ingen prioritet',
                created: issue.fields.created,
                // Eksempler på anonymisering:
                // I stedet for å sende 'issue.fields.reporter.displayName' eller 'issue.fields.reporter.emailAddress'
                // sender vi bare en generisk streng eller sjekker om feltet eksisterer.
                reporter: issue.fields.reporter ? 'Anonym Bruker' : 'Ukjent',
                assignee: issue.fields.assignee ? 'Anonym Bruker' : 'Ikke Tildelt',
                // Legg til andre felter du trenger, men VÆR EKSTREMT FORSIKTIG med PERSONOPPLYSNINGER.
                // Hvis du viser kommentarer eller beskrivelser, må du også vurdere anonymisering/filtrering der.
            }));

            // Returner den anonymiserte dataen som JSON til frontend.
            return {
                status: 200, // HTTP OK
                jsonBody: { issues: anonymizedIssues } // Sender et JSON-objekt med 'issues' arrayen
            };

        } catch (error) {
            // Håndter feil som oppstår under API-kallet til Jira.
            context.log.error("Feil ved henting av Jira-data fra eksternt API:", error.response ? error.response.data : error.message);

            // Returner en feilmelding til frontend med passende HTTP-statuskode.
            // Dette hjelper frontend med å vise en meningsfull feilmelding til brukeren.
            return {
                status: error.response ? error.response.status : 500, // Bruk Jira sin statuskode, eller 500 (Internal Server Error)
                body: error.response ? `Feil fra Jira API: ${error.response.status} - ${error.response.statusText || JSON.stringify(error.response.data)}` : "En uventet feil oppstod ved kommunikasjon med Jira."
            };
        }
    }
});