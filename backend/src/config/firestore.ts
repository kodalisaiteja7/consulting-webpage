import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || 'teja-consulting',
  // Add other config if needed
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Connect to emulator in development
if (process.env.NODE_ENV === 'development' && process.env.FIRESTORE_EMULATOR_HOST) {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export default db;
