import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './auth/AuthContext';

const App = () => {
  return (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
  );
};

export default App;
