import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVLmF4vsJm9lLILXiGJbSUzCFWzHYqF_c",
  authDomain: "whatsapp-3cee7.firebaseapp.com",
  projectId: "whatsapp-3cee7",
  storageBucket: "whatsapp-3cee7.appspot.com",
  messagingSenderId: "1082172081691",
  appId: "1:1082172081691:web:01ca95c3c459b74cda1abe",
  measurementId: "G-W36BYR502D"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
