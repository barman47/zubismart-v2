import * as firebase from 'firebase';

const config = {
    apiKey: process.env.NODE_ENV_FIREBASE_API_KEY,
    authDomain: process.env.NODE_ENV.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NODE_ENV_FIREBASE_DATABASE_URL,
    projectId: process.env.NODE_ENV_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NODE_ENV_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NODE_ENV_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NODE_ENV_FIREBASE_APP_ID,
    measurementId: process.env.NODE_ENV_FIREBASE_MEASUREMENT_ID
  };
  // Initialize Firebase
  firebase.initializeApp(config);
//   firebase.analytics();

export { firebase };