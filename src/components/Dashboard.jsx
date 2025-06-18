import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import KeywordChart from './KeywordChart';
import LineChart from './LineChart';
import '../styles/main.css';

const Dashboard = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <>
      <Navbar className="gabler-navbar" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/assets/Gabler_transp_hvit.png"
              alt="Gabler Logo"
              style={{ width: 200, height: 'auto', marginRight: 10 }}
            />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button className="logout-button" onClick={handleLogout}>
              Logg ut
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="dashboard-wrapper">
        <Container className="mt-4">
          <Row className="welcome-row justify-content-center">
            <Col md={8}>
              <Card className="welcome-card text-center p-4 mb-4 neomorph-card">
                <Card.Body>
                  <Card.Title className="welcome-title">IT-Drift Dashboard</Card.Title>
                  <Card.Text className="welcome-text">
                    Velkommen! Her ser du helpdesk saker!
                  </Card.Text>
                </Card.Body>
              </Card>
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
              <Card className="mb-4 neomorph-card">
                <Card.Body>
                  <Card.Text>Her kan du se utviklingen av saker over tid.</Card.Text>
                  <LineChart />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
