function downloadJSON(data) {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  let title = data["title"];
  title = title.replaceAll(" ", "-");
  title += "-data.json";
  a.download = title;
  a.href = url;
  a.click();
}

function storeCredentials(username, password) {
  const expirationTime = new Date().getTime() + 9999;
  const credentials = { username, password, expirationTime };
  localStorage.setItem("credentials", JSON.stringify(credentials));
}

function storeUrl(url) {
  localStorage.setItem("url", url);
}

function getStoredCredentials() {
  const credentials = JSON.parse(localStorage.getItem("credentials"));
  if (credentials) {
    return credentials;
  }
  localStorage.removeItem("credentials");
  return null;
}

function storeUrl(url) {
  localStorage.setItem("url", url);
}

function getStoredUrl() {
  return localStorage.getItem("url");
}

document.addEventListener("DOMContentLoaded", function () {
  const storedCredentials = getStoredCredentials();
  const storedUrl = getStoredUrl();

  if (storedCredentials) {
    document.getElementById("username").value = storedCredentials.username;
    document.getElementById("password").value = storedCredentials.password;
    document.getElementById("connexion-div").classList.add("hidden");
    document.getElementById("sending-div").classList.add("visible");

    if (storedUrl) {
      document.getElementById("url").value = storedUrl;
    }
  }

  document
    .getElementById("connect-button")
    .addEventListener("click", function () {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username && password) {
        storeCredentials(username, password);
        document.getElementById("error").textContent = "";
        document.getElementById("connexion-div").classList.add("hidden");
        document.getElementById("sending-div").classList.add("visible");
      } else {
        document.getElementById("error").textContent =
          "identifiant et mot de passe requis.";
      }
    });

  document.getElementById("send-button").addEventListener("click", function () {
    const url = document.getElementById("url").value;
    if (url) {
      storeUrl(url);
      document.getElementById("error").textContent =
        "Processing de l'url " + url;

      fetch(url + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: document.getElementById("username").value,
          password: document.getElementById("password").value,
        }),
      })
        .then((response) => {
          if (response.status != 200) {
            localStorage.removeItem("credentials");
            document.getElementById("error").textContent =
              "Identifiants invalides. Session expirée.";
          } else {
            response.json().then((data) => {
              if (data && data.message) {
                localStorage.setItem("bearerToken", data.message);

                document.getElementById("error").textContent =
                  "Token obtenu " + data.message;

                loadScript("navigator.js")
                  .then(() => loadScript("getContent.js"))
                  .then(() => {
                    browser.tabs
                      .executeScript({ file: "navigator.js" })
                      .then(() => {
                        browser.tabs
                          .executeScript({ file: "getContent.js" })
                          .then((results) => {
                            const data = results[0];
                            document.getElementById("error").textContent =
                              "Session ouverte avec succès, démarrage de l'envoi.";

                            fetch(url + "/api/admin/cars/save", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem(
                                  "bearerToken"
                                )}`,
                              },
                              body: JSON.stringify(data),
                            })
                              .then((response) => response.json())
                              .then((result) => {
                                if (result.status === 400) {
                                  document.getElementById("error").textContent =
                                    result.message;
                                } else {
                                  document.getElementById("error").textContent =
                                    "Envoi vers l'API : OK";
                                }
                              });
                          })
                          .catch((err) => {
                            document.getElementById("error").textContent =
                              "Erreur d'exécution des scripts : " + err;
                          });
                      })
                      .catch((err) => {
                        document.getElementById("error").textContent =
                          "Erreur lors du chargement des scripts : " + err;
                      });
                  });
              }
            });
          }
        })
        .catch((err) => {
          document.getElementById("error").textContent =
            "Erreur réseau: " + err;
        });
    } else {
      document.getElementById("error").textContent = "URL requise.";
    }
  });

  function loadScript(scriptName) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = scriptName;
      script.onload = () => resolve();
      script.onerror = (err) =>
        reject(`Impossible de charger ${scriptName}: ${err}`);
      document.head.appendChild(script);
    });
  }

  document
    .getElementById("download-button")
    .addEventListener("click", function () {
      let data = {};
      browser.tabs.executeScript({ file: "navigator.js" }).then(() => {
        browser.tabs
          .executeScript({ file: "getContent.js" })
          .then((results) => {
            data = results[0];
            downloadJSON(data);
          })
          .catch((err) => {
            document.getElementById("error").textContent = err;
          });
      });
    });
});

function storeCredentials(username, password) {
  const expirationTime = new Date().getTime() + 9999;
  const credentials = { username, password, expirationTime };
  localStorage.setItem("credentials", JSON.stringify(credentials));
}

function getStoredCredentials() {
  const credentials = JSON.parse(localStorage.getItem("credentials"));
  if (credentials) {
    return credentials;
  }
  localStorage.removeItem("credentials");
  return null;
}

function storeUrl(url) {
  localStorage.setItem("url", url);
}

function getStoredUrl() {
  return localStorage.getItem("url");
}

function storeToken(token) {
  const now = new Date().getTime();
  const tokenData = { token, timestamp: now };
  localStorage.setItem("bearerTokenData", JSON.stringify(tokenData));
}

function getStoredToken() {
  const tokenData = JSON.parse(localStorage.getItem("bearerTokenData"));
  if (tokenData) {
    return tokenData;
  }
  return null;
}

function isTokenValid() {
  const tokenData = getStoredToken();
  if (tokenData) {
    const now = new Date().getTime();
    const twoHoursInMillis = 2 * 60 * 60 * 1000;
    return now - tokenData.timestamp < twoHoursInMillis;
  }
  return false;
}

function downloadJSON(data) {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  let title = data["title"] || "data";
  title = title.replaceAll(" ", "-");
  title += "-data.json";
  a.download = title;
  a.href = url;
  a.click();
}

function loadScript(scriptName) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = scriptName;
    script.onload = () => resolve();
    script.onerror = (err) =>
      reject(`Impossible de charger ${scriptName}: ${err}`);
    document.head.appendChild(script);
  });
}

function sendDataToApi(url) {
  loadScript("navigator.js")
    .then(() => loadScript("getContent.js"))
    .then(() => {
      browser.tabs
        .executeScript({ file: "navigator.js" })
        .then(() => {
          browser.tabs
            .executeScript({ file: "getContent.js" })
            .then((results) => {
              const data = results[0];
              document.getElementById("error").textContent =
                "Session ouverte avec succès";

              fetch(url + "/api/admin/cars/save", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getStoredToken().token}`,
                },
                body: JSON.stringify(data),
              })
                .then((response) => response.json())
                .then((result) => {
                  if (result.status !== 200) {
                    document.getElementById("error").textContent =
                      result.message;
                  } else {
                    document.getElementById("error").textContent =
                      "Envoi vers l'API : OK";
                  }
                });
            })
            .catch((err) => {
              document.getElementById("error").textContent =
                "Erreur d'exécution des scripts : " + err;
            });
        })
        .catch((err) => {
          document.getElementById("error").textContent =
            "Erreur lors du chargement des scripts : " + err;
        });
    });
}
