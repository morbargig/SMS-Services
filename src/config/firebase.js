import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyB1vBJ_5kg4ZsbQZYd5TO1dxhvNw3Good0",
    authDomain: "morbargig-a81d2.firebaseapp.com",
    databaseURL: "https://morbargig-a81d2.firebaseio.com",
    projectId: "morbargig-a81d2",
    storageBucket: "gs://morbargig-a81d2.appspot.com",
    messagingSenderId: "475426301650",
    appId: "1:475426301650:web:eead04a34d707791"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase