export const msalConfig = {
    auth: {
        clientId: "05bdb70e-0233-4120-8a95-5e64e9801c84", // App#1
        authority: "https://login.microsoftonline.com/d06629ae-56db-44af-880b-80afafa24182",
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

export const loginRequest = {
    scopes: [
        "openid",
        "profile",
        "email",
        "api://bcbeea24-4189-43f8-9360-65529eb7a556/user_impersonation"
    ],
};
