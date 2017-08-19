import firebase from 'firebase'

const fbConfig = {
  apiKey: 'AIzaSyBp-VoO4yMdfcJjHeG8rCLYmlovp634-yY',
  authDomain: 'vuejs-firebase-01-55b96.firebaseapp.com',
  databaseURL: 'https://vuejs-firebase-01-55b96.firebaseio.com',
  projectId: 'vuejs-firebase-01-55b96',
  storageBucket: 'vuejs-firebase-01-55b96.appspot.com',
  messagingSenderId: '687212823219'
}

const firebaseApp = firebase.initializeApp(fbConfig)

export const db = firebaseApp.database()
