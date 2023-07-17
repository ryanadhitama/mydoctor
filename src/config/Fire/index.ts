import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  Auth
} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDY1LD3sQCpyHRhL9nxLJ5Wy6M9kXVQwcQ',
  authDomain: 'mydoctor-5d3bb.firebaseapp.com',
  databaseURL: 'https://mydoctor-5d3bb-default-rtdb.firebaseio.com',
  projectId: 'mydoctor-5d3bb',
  storageBucket: 'mydoctor-5d3bb.appspot.com',
  messagingSenderId: '982743034587',
  appId: '1:982743034587:web:0a5136f148a1e190223afe',
  measurementId: 'G-FK69TTZ0JT'
};

let app: FirebaseApp;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth, app };
