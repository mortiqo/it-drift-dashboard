import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const handleMicrosoftLogin = () => {
    // Dette er URL-en som Static Web Apps bruker for å starte Entra ID (Azure AD) innloggingsflyten
    // SWA vil håndtere omdirigeringen til Microsofts påloggingsside og deretter tilbake til appen din.
    window.location.href = '/.auth/login/aad';
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h2 className="mb-4 text-center">Velkommen til Dashboard!</h2>
        <p className="text-center">For å fortsette, vennligst logg inn med din organisasjonskonto.</p>
        <Button variant="primary" onClick={handleMicrosoftLogin} className="w-100">
          Logg inn med Microsoft Entra ID
        </Button>
      </Card>
    </Container>
  );
};

export default Login;