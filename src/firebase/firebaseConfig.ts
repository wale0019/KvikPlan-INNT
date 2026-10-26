import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsNMV5V-nRky2u4cUNUPuz2MvBkQIDfKQ",
  authDomain: "kvikplan.firebaseapp.com",
  projectId: "kvikplan",
  storageBucket: "kvikplan.firebasestorage.app",
  messagingSenderId: "443913158892",
  appId: "1:443913158892:web:738d84a8969b62698725c9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
