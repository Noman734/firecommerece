import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD47BbRMZXtpqJQRH5EGtp2niRs1W9tTs0",
  authDomain: "firecommerece.firebaseapp.com",
  projectId: "firecommerece",
  storageBucket: "firecommerece.appspot.com",
  messagingSenderId: "568910473780",
  appId: "1:568910473780:web:292bb380190fc5a6aff861",
  measurementId: "G-3DNQRFE1DW"
};
const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);
const FireDB=getFirestore(app)
export default FireDB