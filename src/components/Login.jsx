import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card } from 'react-bootstrap';
import '../styles/main.css'; // Husk å tilpasse sti hvis nødvendig

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
    instance.loginRedirect().catch(e => {
      console.error("Innloggingsfeil:", e);
      alert("Innlogging mislyktes. Sjekk konsollen for detaljer.");
    });
  };

  if (isAuthenticated) return null;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#c4dadf',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Container style={{ maxWidth: 400 }}>
        <Card className="p-4 shadow">
          <img
            src="/assets/gabler_blaa_transp_2018_RGB.png"
            alt="Gabler Logo"
            className="mb-6 mx-auto d-block"
            style={{ width: 180, height: 'auto' }}
          />
          <p className="text-xl font-semibold text-center text-gray-800 mb-6">Bruk Gabler-kontoen din for å logge inn på IT-dashbordet</p>
          <Button
          className="gabler-primary w-100 d-flex align-items-center justify-content-center gap-2"
          variant="primary"
          onClick={handleMicrosoftLogin}
          >
          <img
        src="/assets/Microsoft_Logo.png"
        alt="Microsoft logo"
        style={{ width: '20px', height: '20px' }}
  />
  Logg inn 
</Button>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
