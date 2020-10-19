import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
