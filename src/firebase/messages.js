import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseMessagesConfig = {
  apiKey: "AIzaSyC3Q2iPFmJJ6-FzczjD0RRDl3-2DFUthOw",
  authDomain: "barcrawlgolf-messages.firebaseapp.com",
  databaseURL: "https://barcrawlgolf-messages.firebaseio.com",
  projectId: "barcrawlgolf-messages",
  storageBucket: "barcrawlgolf-messages.appspot.com",
  messagingSenderId: "260124317655",
  appId: "1:260124317655:web:16bdbf4f031a15e7a11d92"
};

const FIREBASE_APP_MESSAGES = firebase.initializeApp(firebaseMessagesConfig, 'messages');

const settings = {};
const messagesDB = FIREBASE_APP_MESSAGES.firestore()
messagesDB.settings(settings)

export {
  messagesDB
};