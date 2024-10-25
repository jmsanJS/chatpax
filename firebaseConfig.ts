import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_FB_APPID
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);

// Collections
export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');

import AsyncStorage from '@react-native-async-storage/async-storage';

// Only in development (use when a user is deleted manually from Firestore)
export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("App data cleared.");
  } catch (e) {
    console.error("Failed to clear app data.", e);
  }
};
