import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Card } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/Dashboard');
    } else {
      alert('Vennligst fyll inn brukernavn og passord');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h2 className="mb-4 text-center">Logg inn</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Brukernavn</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Skriv inn brukernavn"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Passord</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Skriv inn passord"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Logg inn
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
