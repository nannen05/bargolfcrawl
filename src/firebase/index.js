import firebase from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyCGJmpSXrJRPfD4To6eJJVe_zQArqOTWl4",
    authDomain: "bargolfcrawl.firebaseapp.com",
    databaseURL: "https://bargolfcrawl.firebaseio.com",
    projectId: "bargolfcrawl",
    storageBucket: "bargolfcrawl.appspot.com",
    messagingSenderId: "723963950318"
  };

const FIREBASE_APP = firebase.initializeApp(config);

const FIREBASE_DATABASE = FIREBASE_APP.database()

export const DATAREF = FIREBASE_DATABASE.ref('flamelink/environments/production/content/flameLinkTest/en-US')