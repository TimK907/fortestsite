/* ---------- Azure AD реєстрація ДЛЯ САЙТУ ---------- */
const siteClientId = '05bdb70e-0233-4120-8a95-5e64e9801c84';
const tenantId     = 'd06629ae-56db-44af-880b-80afafa24182';

/* ---------- MSAL instance ---------- */
const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId   : siteClientId,
    authority  : `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: window.location.origin + '/'
  },
  cache: { cacheLocation: 'sessionStorage' }
});

/* ---------- scopes ---------- */
const apiScope = 'api://bcbeea24-4189-43f8-9360-65529eb7a556/access_as_user';
const loginRequest = {
  scopes: ['openid', 'profile', apiScope]
};

/* ---------- sign-in/out ---------- */
function signIn() {
  msalInstance.loginPopup(loginRequest)
    .then(handleResponse)
    .catch(console.error);
}

function signOut() {
  msalInstance.logoutPopup();
}

function handleResponse(resp) {
  // після повернення або при refresh
  const account = resp ? resp.account : msalInstance.getAllAccounts()[0];
  if (!account) return;

  document.getElementById('hello').textContent = `Hello, ${account.username}`;
  document.getElementById('login-btn').style.display = 'none';
  document.getElementById('user-ico').style.display  = 'none';
  document.getElementById('logout-ico').style.display = 'inline';

  // забираємо access_token для API бота
  acquireToken(account);
}

/* ---------- token & запуск бота ---------- */
function acquireToken(account) {
  const tokenRequest = { account, scopes: [apiScope] };

  msalInstance.acquireTokenSilent(tokenRequest)
    .then(r => initBotFrame(r.accessToken))
    .catch(() =>
      msalInstance.acquireTokenPopup(tokenRequest)
        .then(r => initBotFrame(r.accessToken))
        .catch(console.error)
    );
}

function initBotFrame(accessToken) {
  if (!accessToken) return;

  const botClientId = 'bcbeea24-4189-43f8-9360-65529eb7a556';
  const base =
    'https://copilotstudio.microsoft.com/environments/aa9a827b-aedf-ee7d-b575-bfb7ebdcf717' +
    '/bots/cr7d7_undefinedNameOfTouristInformationAgen/webchat';

  const botSrc = `${base}?__version__=2&enableSingleSignOn=true` +
                 `&ssoAuthType=azureADv2` +
                 `&clientId=${botClientId}` +
                 `&tenantId=${tenantId}` +
                 `&ssoToken=${encodeURIComponent(accessToken)}`;

  document.getElementById('bot-frame').src = botSrc;
}

/* ---------- init ---------- */
window.addEventListener('load', () => handleResponse());
