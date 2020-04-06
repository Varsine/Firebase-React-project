import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAJ3p9VjGl7vpJQhrzjdCbmVlXWlcvptaE",
  authDomain: "react-project-f1263.firebaseapp.com",
  databaseURL: "https://react-project-f1263.firebaseio.com",
  projectId: "react-project-f1263",
  storageBucket: "react-project-f1263.appspot.com",
  messagingSenderId: "970600271089",
  appId: "1:970600271089:web:a78a50adb610a2e39e2d50",
  measurementId: "G-BJ9RG38PM8"
}

const app = firebase.initializeApp(firebaseConfig)
firebase.firestore(app)
///settings({timestampsInSnapshots: true})
export default firebase
