import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// import { getStorage } from 'firebase/storage';

// Config is copyable here: https://console.firebase.google.com/u/0/project/avian-display-290222/settings/general/web:YWJmOTQ0ZjgtNjY2NC00Yjk0LTljODQtYjA4NTE2Y2IyYTBl
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

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// export const storage = getStorage(app, 'gs://avian-display-290222.appspot.com');
export const auth = getAuth(app);
