import admin from 'firebase-admin'
import serviceAccount from './service-account-key.json';
import dotenv from 'dotenv';

if(!process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL_KEY || !process.env.PROJECT_ID) {
  throw new Error('No credential');
}

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\/n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL_KEY,
    projectId: process.env.PROJECT_ID
  })
});

export const db = admin.firestore();