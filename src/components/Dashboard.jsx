import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import KeywordChart from './KeywordChart';
import LineChart from './LineChart';
import '../styles/main.css'; 

const Dashboard = () => {
  const { instance, accounts } = useMsal();
  const handleLogout = () => instance.logoutRedirect();

  const userName = accounts[0]?.name || accounts[0]?.username;

  return (
    <>
      <Navbar className="gabler-navbar" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/assets/Gabler_transp_hvit.png"
              alt="Gabler Logo"
              style={{ width: '200px', height: 'auto', marginRight: '10px' }}
            />
          </Navbar.Brand>

          <Nav className="ms-auto align-items-center">
            {userName && (
              <Navbar.Text className="text-light me-3">
                Logget inn som <strong>{userName}</strong>
              </Navbar.Text>
            )}
            <Button className="gabler-logout-btn" onClick={handleLogout}>
              Logg ut
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          <Col>
            <h2>IT-Drift Dashboard</h2>
            <p className="welcome-text">Velkommen! her ser du helpdesk saker!</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="mb-4 neomorph-card">
              <Card.Body>
                <Card.Title>Filtrering av type henvendelser</Card.Title>
                <Card.Text>
                  Her kan du filtrere på forskjellige type henvendelser, som "Azure", "Grow", og "Tilgang"
                </Card.Text>
                <KeywordChart />
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Utvikling over tid</Card.Title>
                <Card.Text>Her kan du se utviklingen av saker over tid.</Card.Text>
                <LineChart />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
