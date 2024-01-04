import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDy-wdZzx5GP7ChJtPClQ88Nz4Rw2lVqYQ",
  authDomain: "leaf-iot-b21f8.firebaseapp.com",
  projectId: "leaf-iot-b21f8",
  storageBucket: "leaf-iot-b21f8.appspot.com",
  messagingSenderId: "440280545482",
  appId: "1:440280545482:web:05fd390ed71aade8b25c33",
  measurementId: "G-X3N3D6SC8E",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth(app);
export default firebaseConfig;
