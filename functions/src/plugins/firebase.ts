import * as admin from 'firebase-admin';

import serviceAccount from "../Key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  //databaseURL: "https://omin-vtf-default-rtdb.asia-southeast1.firebasedatabase.app"
});

export const db = admin.firestore();
export default admin;
