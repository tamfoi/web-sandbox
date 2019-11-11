importScripts("https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.3.0/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "952876012433"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(payload);
  return self.registration.showNotification(
    "Background Message Title",
    (notificationOptions = {
      body: "Background Message body."
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
