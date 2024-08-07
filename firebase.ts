import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4YF4PIioU42K7mIuBqpcE9takRNICgXM",
  authDomain: "samagra-fcm.firebaseapp.com",
  projectId: "samagra-fcm",
  storageBucket: "samagra-fcm.appspot.com",
  messagingSenderId: "666184174787",
  appId: "1:666184174787:web:e6fcb9ca1fca7503e92676",
  measurementId: "G-Y0V87C9GF3"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
