import React from "react";
import { useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const current = msalInstance.getAllAccounts();
    if (current && current.length > 0) {
      setAccount(current[0]);
    }
  }, []);

  const signIn = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      setAccount(loginResponse.account);

      // ---! Ось так отримай токен для передачі в BOT ---
      // const token = await msalInstance.acquireTokenSilent(loginRequest);
      // // Допоміжна функція: відправ токен в бот по необхідній інструкції

    } catch (e) {
      alert(e.message);
    }
  };

  const signOut = () => {
    msalInstance.logoutPopup();
    setAccount(null);
  };

  const userName = account?.name || account?.username;

  return (
    <div>
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 0 1rem 0"
      }}>
        {account ? (
          <>
            <span style={{marginRight:8}}>{`Hello, ${userName}`}</span>
            <button
              style={{
                border: "none",
                background: "none",
                color: "#FFF",
                cursor: "pointer",
                fontSize: "1.5rem",
                marginLeft: "8px"
              }}
              onClick={signOut}
              title="Logout"
            >
              <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20.41 7.41L19 6l-5 5 5 5 1.41-1.41L17.83 12z"/>
              </svg>
            </button>
          </>
        ) : (
          <>
            <svg width="32" height="32" fill="white" viewBox="0 0 24 24" style={{marginRight:8}}>
              <circle cx="12" cy="7" r="5"/>
              <path d="M12 14c-7 0-10 3.5-10 7v1h20v-1c0-3.5-3-7-10-7z"/>
            </svg>
            <span style={{marginRight:12}}>Hello, Anonymous User</span>
            <button
              style={{
                padding: "8px 18px",
                background: "rgba(0,0,0,0.4)",
                color: "#FFF",
                border: "none",
                borderRadius: "5px",
                fontSize: "1.1rem",
                cursor: "pointer"
              }}
              onClick={signIn}
            >
              Sign in with Microsoft
            </button>
          </>
        )}
      </header>
      <h1 style={{textAlign:"center",marginTop:"3rem",fontWeight:700, textShadow:"2px 2px 10px #111"}}>Welcome to Travel Assistant.</h1>
    </div>
  );
}

export default App;
