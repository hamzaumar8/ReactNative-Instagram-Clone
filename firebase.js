import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDXARDutkvy3JYyxqVZJMIJCaAxFInCji0",
  authDomain: "reactnativeinstagramclon-56ac9.firebaseapp.com",
  projectId: "reactnativeinstagramclon-56ac9",
  storageBucket: "reactnativeinstagramclon-56ac9.appspot.com",
  messagingSenderId: "230251735727",
  appId: "1:230251735727:web:bf2cd326fe783ab9d7825a"
};


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export {firebase, db}




