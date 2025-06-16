

export const msalConfig = {
    auth: {
        clientId: "placeholder", // Placeholder for entra app registration 
        authority: "https://login.microsoftonline.com/4f9b015f-aad5-4697-a05e-7290cda687ed", 
        redirectUri: "/", 
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};
