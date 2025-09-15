require('dotenv').config();
const admin = require('firebase-admin');

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function setSuperAdmin() {
  await admin.auth().setCustomUserClaims("EPQDsHQw9WQPePSVX9KpxuA0Rry2", { role: "superadmin" });
console.log("Super admin role set!");
}
setSuperAdmin();


const uid = "u97LewxQ6tblfbtYxFyoFSn4bmt1";

admin.auth().setCustomUserClaims(uid, { role: "admin" })
  .then(() => {
    console.log("Custom claims set for admin!");
  })
  .catch(console.error);


const db = admin.firestore();

module.exports = { admin, db };