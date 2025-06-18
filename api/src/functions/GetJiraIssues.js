
const { app } = require('@azure/functions');
const axios = require('axios');
require('dotenv').config(); 

app.http('GetJiraIssues', {
    methods: ['GET', 'POST'], 
    authLevel: 'anonymous',    
                              
    
    // Dette er selve handler-funksjonen som kjører når din Azure Function kalles.
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request for Jira issues.');

     
        const JIRA_BASE_URL = process.env.JIRA_BASE_URL; // 
        const JIRA_API_USERNAME = process.env.JIRA_API_USERNAME; 
        const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;     

        // Sjekk om alle nødvendige miljøvariabler er satt.
        if (!JIRA_BASE_URL || !JIRA_API_USERNAME || !JIRA_API_TOKEN) {
            context.log.error("Jira API-detaljer mangler i miljøvariabler. Sjekk konfigurasjonen.");
            return {
                status: 500,
                body: "Serverkonfigurasjonsfeil: Nødvendige Jira API-detaljer mangler."
            };
        }

   
        const authHeader = 'Basic ' + Buffer.from(`${JIRA_API_USERNAME}:${JIRA_API_TOKEN}`).toString('base64');


        const jqlQuery = 'project = "HELP" ORDER BY created DESC'; // Standard Helpdesk prosjekt


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

            const anonymizedIssues = response.data.issues.map(issue => ({
                id: issue.id,
                key: issue.key,
                summary: issue.fields.summary,
                status: issue.fields.status.name,
                issueType: issue.fields.issuetype.name,
                priority: issue.fields.priority ? issue.fields.priority.name : 'Ingen prioritet',
                created: issue.fields.created,
                
                reporter: issue.fields.reporter ? 'Anonym Bruker' : 'Ukjent',
                assignee: issue.fields.assignee ? 'Anonym Bruker' : 'Ikke Tildelt',
            }));

            return {
                status: 200, 
                jsonBody: { issues: anonymizedIssues } 
            };

        } catch (error) {
            // Håndter feil som oppstår under API-kallet til Jira.
            context.log.error("Feil ved henting av Jira-data fra eksternt API:", error.response ? error.response.data : error.message);

            return {
                status: error.response ? error.response.status : 500, // Bruk Jira sin statuskode, eller 500 (Internal Server Error)
                body: error.response ? `Feil fra Jira API: ${error.response.status} - ${error.response.statusText || JSON.stringify(error.response.data)}` : "En uventet feil oppstod ved kommunikasjon med Jira."
            };
        }
    }
});