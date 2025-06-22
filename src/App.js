import React from "react";
import { useEffect, useState } from "react";
import { msalInstance, loginRequest } from "./authConfig";
import { useMsal, MsalProvider } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

const backgroundStyle = {
  minHeight: "100vh",
  backgroundImage: "url(https://images.pexels.com/photos/163856/sunset-train-road-163856.jpeg)",
  backgroundPosition: "center",
  backgroundSize: "cover",
};

function AuthButton() {
  const { instance, accounts, inProgress } = useMsal();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      setProfile({ name: accounts[0].name, username: accounts[0].username });
    } else {
      setProfile(null);
    }
  }, [accounts]);

  const handleLogin = () => { instance.loginRedirect(loginRequest); };
  const handleLogout = () => { instance.logoutRedirect(); };

  if (inProgress !== InteractionStatus.None) return null;

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", color: "white", width: "100%"
    }}>
      {profile === null ?
        <>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div style={{ margin: 8 }}>
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <svg width={32} height={32} fill="white" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20v-1a8 8 0 1 1 16 0v1z"/></svg>
              </span>
            </div>
            <span style={{ color: "white", fontSize: "20px" }}>Hello, Anonymous User</span>
            <button style={{
              marginTop: 10,
              background: "#0078d4",
              color: "white",
              border: "none",
              padding: "8px 20px",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: "bold"
            }} onClick={handleLogin}>Login with Microsoft</button>
          </div>
        </>
        :
        <>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div style={{ margin: 8 }}>
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <svg width={32} height={32} fill="white" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20v-1a8 8 0 1 1 16 0v1z"/></svg>
              </span>
            </div>
            <span style={{ color: "white", fontSize: "20px" }}>
              Hello, {profile.name || profile.username}
            </span>
            <button style={{
              marginTop: 10,
              background: "#cf2e2e",
              color: "white",
              border: "none",
              padding: "8px 20px",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center"
            }} onClick={handleLogout}>
              <svg style={{ marginRight: '8px' }} width={18} height={18} fill="white" viewBox="0 0 24 24">
                <path d="M16 13v-2H7v-2l-5 4 5 4v-2zM20 3a2 2 0 0 0-2 2v4h2V5h2v14h-2v-4h-2v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
              </svg>
              Logout
            </button>
          </div>
        </>
      }
    </div>
  );
}

function BotFrame() {
  return (
    <div style={{
      width: "100%",
      height: "70vh",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      borderRadius: 16,
      overflow: "hidden",
      marginTop: 24,
      background: "rgba(0,0,0,0.3)"
    }}>
      <iframe src="https://copilotstudio.microsoft.com/environments/aa9a827b-aedf-ee7d-b575-bfb7ebdcf717/bots/cr7d7_undefinedNameOfTouristInformationAgen/webchat?__version__=2"
        frameBorder="0"
        title="CopilotBot"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

function MainPage() {
  return (
    <div style={backgroundStyle}>
      <div style={{ textAlign: "center", padding: 24 }}>
        <h1 style={{
          color: "white", fontWeight: "bold", fontSize: "2.8rem",
          textShadow: "0 4px 12px rgba(0,0,0,0.6)", marginTop: 0
        }}>
          Welcome to Travel Assistant.
        </h1>
        <AuthButton />
        <BotFrame />
      </div>
    </div>
  );
}

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <MainPage />
    </MsalProvider>
  );
}
export default App;
