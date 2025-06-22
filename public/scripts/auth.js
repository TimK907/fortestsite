/* ----------- AAD реєстрація ДЛЯ САЙТУ ----------- */
const siteClientId = '05bdb70e-0233-4120-8a95-5e64e9801c84';
const tenantId     = 'd06629ae-56db-44af-880b-80afafa24182';

const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId   : siteClientId,
    authority  : `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: window.location.origin + '/'
  },
  cache: { cacheLocation: 'sessionStorage' }
});

const loginRequest = { scopes: ['openid', 'profile', 'User.Read'] };

function signIn() {
  msalInstance.loginPopup(loginRequest)
    .then(handleResponse)
    .catch(console.error);
}

function signOut() {
  msalInstance.logoutPopup();
}

function handleResponse(resp) {
  // коли повертаємось зі сторінки логіну
  if (!resp) {
    const acc = msalInstance.getAllAccounts()[0];
    if (acc) loadUI(acc);
    return;
  }
  loadUI(resp.account, resp.idToken);
}

function loadUI(account, idToken) {
  if (!account) return;

  // збережемо id_token – передамо у Web Chat
  if (idToken) sessionStorage.setItem('id_token', idToken);

  document.getElementById('hello').textContent = `Hello, ${account.username}`;
  document.getElementById('login-btn').style.display = 'none';
  document.getElementById('user-ico').style.display  = 'none';
  document.getElementById('logout-ico').style.display = 'inline';

  /* ---------- ініціалізація бот-фрейму з SSO ---------- */
  const botClientId = 'bcbeea24-4189-43f8-9360-65529eb7a556';
  const base =
    'https://copilotstudio.microsoft.com/environments/aa9a827b-aedf-ee7d-b575-bfb7ebdcf717' +
    '/bots/cr7d7_undefinedNameOfTouristInformationAgen/webchat';

  const token = encodeURIComponent(sessionStorage.getItem('id_token'));
  const botSrc = `${base}?__version__=2&enableSingleSignOn=true` +
                 `&clientId=${botClientId}&tenantId=${tenantId}&ssoToken=${token}`;

  document.getElementById('bot-frame').src = botSrc;
}

/* ----  початок ---- */
window.addEventListener('load', () => handleResponse());
