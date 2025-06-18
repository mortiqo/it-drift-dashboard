import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card } from 'react-bootstrap';

// HENT MSAL FRA KONTEKST
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

const Login = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleMicrosoftLogin = () => {
    instance.loginRedirect()
      .catch(e => {
        console.error("Innloggingsfeil:", e);
        alert("Innlogging mislyktes. Sjekk konsollen for detaljer.");
      });
  };

  if (isAuthenticated) return null;

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

export default Login;
