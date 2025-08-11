import admin from 'firebase-admin'
import serviceAccount from './service-account-key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

export default { db }
