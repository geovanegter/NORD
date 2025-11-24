import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Metro permite importar JSON diretamente; mantenha este arquivo sincronizado para o seed script.
// eslint-disable-next-line import/no-commonjs, global-require
const firebaseConfig = require('./firebaseConfig.json');

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
