import { initializeApp, applicationDefault } from 'firebase-admin/app';
import 'dotenv/config';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({
  credential: applicationDefault()
});

const db: FirebaseFirestore.Firestore = getFirestore();

export default db;