import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyAFBV1vWOBT3WyWrfaTtvm4Y8DqYVxLcVk',
    authDomain: 'foof-koala.firebaseapp.com',
    databaseURL: 'https://foof-koala.firebaseio.com',
    projectId: 'foof-koala',
    storageBucket: 'foof-koala.appspot.com',
    messagingSenderId: '758863475140',
    appId: '1:758863475140:web:d6cefd8bd5b82f7acff491',
    measurementId: 'G-TTHCDDCHYM',
};

firebase.initializeApp(firebaseConfig);

export default firebase;