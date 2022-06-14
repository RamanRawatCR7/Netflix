import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {firebaseconfig} from './firebaseconfig';


const firebaseApp = initializeApp(firebaseconfig);
const db = getFirestore(firebaseApp);
const Auth = getAuth();

export {Auth};
export default db;