import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Card } from 'react-bootstrap';

// Importer MSAL-biblioteker
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";

// --- MSAL Konfigurasjon ---
// Du må erstatte placeholderne med dine faktiske Entra ID verdier
const msalConfig = {
    auth: {
        clientId: "e8c120a6-bbb9-430a-98da-cfada887eace", // Din "Application (client) ID"
        authority: "https://login.microsoftonline.com/4f9b015f-aad5-4697-a05e-7290cda687ed", // Din "Directory (tenant) ID"
        redirectUri: "https://ambitious-ocean-0721e3203.6.azurestaticapps.net/Login", // Din lokale URL for testing, eller Static Web App URL i prod
        // redirectUri: "https://your-static-app.azurestaticapps.net/", // For produksjon
    },
    cache: {
        cacheLocation: "sessionStorage", // Lagrer tokens i sessionStorage
        storeAuthStateInCookie: false,
    },
};

const msalInstance = new PublicClientApplication(msalConfig);

// Dette er selve Login-komponenten
const LoginContent = () => {
  const { instance } = useMsal(); // Hent MSAL instansen
  const isAuthenticated = useIsAuthenticated(); // Sjekk autentiseringsstatus
  const navigate = useNavigate();

  // Når brukeren er logget inn, omdiriger til Dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/Dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleMicrosoftLogin = () => {
    // Start innloggingsflyten
    instance.loginPopup() // Eller instance.loginRedirect() for full sideomdirigering
      .then(response => {
        console.log("Innlogging vellykket:", response);
        // Ingen navigate her, useEffect vil håndtere det basert på isAuthenticated
      })
      .catch(e => {
        console.error("Innloggingsfeil:", e);
        alert("Innlogging mislyktes. Sjekk konsollen for detaljer.");
      });
  };

  if (isAuthenticated) {
    return null; // Ikke vis innloggingsskjema hvis allerede logget inn
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h2 className="mb-4 text-center">Logg inn</h2>
        <p className="text-center">Vennligst logg inn med din organisasjonskonto.</p>
        <Button variant="primary" onClick={handleMicrosoftLogin} className="w-100">
          Logg inn med Microsoft Entra ID
        </Button>
      </Card>
    </Container>
  );
};

// Wrapper LoginContent med MsalProvider for å gi MSAL-kontekst
const Login = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <LoginContent />
    </MsalProvider>
  );
};

export default Login;