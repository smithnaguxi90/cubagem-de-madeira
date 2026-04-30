import {
  initializeApp,
  getApps,
  getApp,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTh5AkFbeg_QZqLND12t62ST-aPKxZriA",
  authDomain: "cubagempro.firebaseapp.com",
  projectId: "cubagempro",
  storageBucket: "cubagempro.firebasestorage.app",
  messagingSenderId: "136448783606",
  appId: "1:136448783606:web:a2122e6ee0ed89099668d7",
};

export function initFirebaseApp(onUserStatusChanged) {
  const appName = "CubagemProApp";
  const existingApps = getApps().filter((a) => a.name === appName);

  const app =
    existingApps.length > 0
      ? getApp(appName)
      : initializeApp(firebaseConfig, appName);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Registra o ouvinte de autenticação
  onAuthStateChanged(auth, onUserStatusChanged);

  return { app, auth, db };
}
