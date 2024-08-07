importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4YF4PIioU42K7mIuBqpcE9takRNICgXM",
  authDomain: "samagra-fcm.firebaseapp.com",
  projectId: "samagra-fcm",
  storageBucket: "samagra-fcm.appspot.com",
  messagingSenderId: "666184174787",
  appId: "1:666184174787:web:e6fcb9ca1fca7503e92676",
  measurementId: "G-Y0V87C9GF3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message", payload);

  const link = payload.fcmOptions?.link || payload.data?.link;
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
    data: { url: link },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.");

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      const url = event.notification.data.url;

      if (!url) return;

      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        console.log("Opening new window for URL:", url);
        return clients.openWindow(url);
      }
    })
  );
});
