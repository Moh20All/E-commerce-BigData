import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBlbJV20PHLLRh3CtiskjFzAYrixJOncA",
  authDomain: "bigdata-bbab6.firebaseapp.com",
  projectId: "bigdata-bbab6",
  storageBucket: "bigdata-bbab6.firebasestorage.app",
  messagingSenderId: "908377350595",
  appId: "1:908377350595:web:4cb7b0fe9e553925bddd76",
  measurementId: "G-PQJCNEX6RS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user); // Call the callback with the user object
  });
};

// Google Login Function
const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: user.displayName,
        photo: user.photoURL,
        lastName: "",
      });
    }
    
    return user; // Return user data
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    return null;
  }
};

// Logout function
const logout = async () => {
  await signOut(auth);
  console.log("Signed out")
};

export { auth, db, checkAuthState, googleLogin, logout };