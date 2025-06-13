import React, { use } from 'react';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import KeywordChart from './KeyWordChart';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    return (
        <>
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>IT-Drift Dashboard</Navbar.Brand>
                <Nav className="ms-auto">
                    <Button variant="outline-light" onClick={handleLogout}>
                        Logg ut
                    </Button>
                </Nav>
            </Container>
        </Navbar>

        <Container className="mt-4">
            <Row>
                <Col>
                <h2>Dashboard</h2>
                <p>Velkommen! her ser du helpdesk saker!</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                 <Card className="mb-4 shadow-sm">
                    <Card.Body>
                        <Card.Title>Filtrering av type henvendelser</Card.Title>
                        <Card.Text>Her kan du filtrere på forskjellige type henvendelser, som "Printer", "Office", "Passord"</Card.Text>
                        <KeywordChart />
                    </Card.Body>
                 </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default Dashboard;