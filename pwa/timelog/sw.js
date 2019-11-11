importScripts("https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "952876012433"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(payload);
  return self.registration.showNotification("Background Message Title", {
    body: "Background Message body."
  });
});

self.addEventListener("push", function(event) {
  event.waitUntil(
    self.registration.showNotification("test", {
      body: "Tes"
    })
  );
});

self.addEventListener("install", function(event) {
  console.log("serviceworker install");
});

self.addEventListener("activate", event => {
  console.log("serviceworker activate");
});

self.addEventListener("fetch", event => {
  console.log("serviceworker fetch");
});
