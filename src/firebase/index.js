import firebase from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyAxzmIxJ052De6uGeNiOImXXiUiyB2JEbc",
    authDomain: "flamelinktesting.firebaseapp.com",
    databaseURL: "https://flamelinktesting.firebaseio.com",
    projectId: "flamelinktesting",
    storageBucket: "flamelinktesting.appspot.com",
    messagingSenderId: "304946994944"
  };

const FIREBASE_APP = firebase.initializeApp(config);

const FIREBASE_DATABASE = FIREBASE_APP.database()

export const DATAREF = FIREBASE_DATABASE.ref('flamelink/environments/production/content/flameLinkTest/en-US')