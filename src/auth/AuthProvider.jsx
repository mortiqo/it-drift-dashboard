// AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const currentAccounts = msalInstance.getAllAccounts();
        if (currentAccounts.length > 0) {
            setAccount(currentAccounts[0]);
        }
    }, []);

    const login = async () => {
        try {
            const loginResponse = await msalInstance.loginPopup(loginRequest);
            setAccount(loginResponse.account);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = () => {
        msalInstance.logoutPopup();
    };

    return (
        <AuthContext.Provider value={{ account, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
