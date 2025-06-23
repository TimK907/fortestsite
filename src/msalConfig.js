export const msalConfig = {
    auth: {
        // Для САЙТУ (App registration 1)
        clientId: "05bdb70e-0233-4120-8a95-5e64e9801c84",
        authority: "https://login.microsoftonline.com/d06629ae-56db-44af-880b-80afafa24182",
        redirectUri: window.location.origin
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

export const loginRequest = {
    scopes: ["openid", "profile", "email"], // +додай scopes для API якщо треба
};
