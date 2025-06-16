import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <Container className="text-center mt-5">
            <h1>404 - Siden finnes ikke</h1>
            <p>Beklager, vi fant ikke siden du lette etter.</p>
            <Button variant="primary" onClick={handleBackHome}>
                Gå tilbake til forsiden
            </Button>
        </Container>
    );
};

export default NotFound;
