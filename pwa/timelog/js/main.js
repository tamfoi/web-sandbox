(function() {
  /**
   * Firebase
   */
  firebase.initializeApp({
    messagingSenderId: "952876012433"
  });
  const messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BArZNqQ5vVUstUK6Y2XC8kz81fZY9sysUhluKgowzYqr3qfaDSpU9QKAtjyERmAPNRjHFPYWina2SHxrpRSBbY4"
  );

  /**
   * ServiceWorker
   */
  navigator.serviceWorker
    .register("/web-sandbox/pwa/timelog/sw.js", {
      scope: "/web-sandbox/pwa/timelog/"
    })
    .then(function(registration) {
      console.log("serviceworker registered success", registration);
      //FCMで使用するServiceWorkerを変更する
      messaging.useServiceWorker(registration);

      /* 3. 通知の受信許可を求める */
      messaging
        .requestPermission()
        .then(function() {
          // 通知が許可されたときの処理を書く
          messaging
            .getToken()
            .then(function(refreshedToken) {
              // トークン取得後の処理を書く
              console.log(refreshedToken);
            })
            .catch(function(err) {});
        })
        .catch(function(err) {
          // 通知が拒否されたときの処理を書く
        });

      // トークンが更新されているときのイベントハンドラ
      messaging.onTokenRefresh(function() {
        /*  4. トークンを取得する */
        messaging
          .getToken()
          .then(function(refreshedToken) {
            // トークン取得後の処理を書く
            console.log(refreshedToken);
          })
          .catch(function(err) {});
      });

      /* 5. メッセージを受信する */
      // ページがフォアグラウンドの時にメッセージを受信する用のイベントハンドラ
      messaging.onMessage(function(payload) {
        console.log(payload);
        if (!("Notification" in window)) {
          // ブラウザが通知機能に対応しているかを判定
        } else if (Notification.permission === "granted") {
          // 通知許可されていたら通知する
          var notification = new Notification("test", {
            body: "test"
          });
        }
      });
    })
    .catch(function(error) {
      console.log("serviceworker registered error");
    });

  /**
   * indexedDB
   */
  const dbName = "timelogDb";
  const storeName = "timelogStore";

  const openRequest = indexedDB.open(dbName);

  openRequest.addEventListener("upgradeneeded", function(event) {
    console.log("indexedDB upgradeneeded");

    const db = event.target.result;
    db.createObjectStore(storeName, { keyPath: "id" });
  });

  openRequest.addEventListener("success", function(event) {
    console.log("indexedDB success");

    const db = event.target.result;
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const putRequest = objectStore.put({
      id: "test",
      name: "test"
    });

    putRequest.addEventListener("success", function() {
      console.log("indexedDB put data success");
    });

    transaction.addEventListener("complete", function() {
      console.log("indexedDB put data complete");
    });

    db.close();
  });

  openRequest.addEventListener("error", function(event) {
    console.log("indexedDB error");
  });
})();
