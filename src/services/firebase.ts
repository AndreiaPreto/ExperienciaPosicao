import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Inicializa app
const app = initializeApp(firebaseConfig);

// Serviços
// Use named database if provided in config with long polling fallback to bypass iframe and proxy connectivity issues.
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);

// Standard Auth initialization
const auth = getAuth(app);

// Exporta tudo centralizado
export { app, db, auth };
