// src/routes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Fjern BrowserRouter fra import her, den er i App.jsx
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from "@azure/msal-react";

// Importer komponentene dine
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import Admin from './components/Admin';

// Oppdater ProtectedRoute til å bruke MSAL's tilstand
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated(); // Hent autentiseringsstatus fra MSAL

  // Hvis brukeren ikke er autentisert, send dem til /login
  if (!isAuthenticated) {
    // Du kan også trigge innlogging direkte her om ønskelig
    // const { instance } = useMsal();
    // instance.loginRedirect(); // Eller loginPopup()
    return <Navigate to="/Login" replace />;
  }

  // Hvis autentisert, render barnkomponenten
  return children;
};

const AppRoutes = () => {
  return (
    // <Router> er NÅ FLYTTET til App.jsx, så den fjernes her
    <Routes>
      {/* Rute for innloggingssiden. Denne skal ikke beskyttes. */}
      <Route path="/Login" element={<Login />} />

      {/* Beskyttede ruter som krever autentisering */}
      <Route
        path="/Dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* Standard rute: Omdiriger til Dashboard hvis autentisert, ellers til Login */}
      <Route path="/" element={
        <>
          <AuthenticatedTemplate>
            {/* Hvis logget inn, naviger til Dashboard */}
            <Navigate to="/Dashboard" replace />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            {/* Hvis IKKE logget inn, naviger til Login */}
            <Navigate to="/Login" replace />
          </UnauthenticatedTemplate>
        </>
      } />

      {/* Fallback for ukjente ruter */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;