import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('role') === 'admin';

    if (!isAdmin) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="danger">
                    Du har ikke tilgang til denne siden.
                </Alert>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Gå til forsiden
                </Button>
            </Container>
        );
    }

    return (
        <Container className="mt-5 text-center">
            <h2>Adminpanel</h2>
            <p>Dette området er reservert for administratorer.</p>
            <p>(Innhold kommer senere)</p>
        </Container>
    );
};

export default Admin;
