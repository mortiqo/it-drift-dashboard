// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // VIKTIG: Importér Router her
import AppRoutes from './routes';

// IMPORTER MSAL-RELATERTE TING HER
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

// --- MSAL Konfigurasjon ---

const msalConfig = {
    auth: {
        clientId: "Ye8c120a6-bbb9-430a-98da-cfada887eace", // F.eks. "e8c120a6-bbb9-430a-98da-cfada887eace"
        authority: "https://login.microsoftonline.com/4f9b015f-aad5-4697-a05e-7290cda687ed", 
       // redirectUri: "https://ambitious-ocean-0721e3203.6.azurestaticapps.net/", 
        redirectUri: "http://localhost:4280", // For test
    },
    cache: {
        cacheLocation: "sessionStorage", // Anbefalt for SPAs
        storeAuthStateInCookie: false,
    },
};

// Initialiser MSAL PublicClientApplication instansen én gang
const msalInstance = new PublicClientApplication(msalConfig);

const App = () => {
  return (
    // MsalProvider MÅ pakke BrowserRouter
    <MsalProvider instance={msalInstance}>
      <Router> {/* BrowserRouter må pakkes inn i MsalProvider */}
        <AppRoutes /> {/* Dine ruter defineres og rendres herfra */}
      </Router>
    </MsalProvider>
  );
};

export default App;