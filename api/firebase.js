import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCM6uKGBrz5l_B2kjpi1dI9nAJUCLU8xsk',
    authDomain: 'expense-tracker-kea.firebaseapp.com',
    projectId: 'expense-tracker-kea',
    storageBucket: 'expense-tracker-kea.appspot.com',
    messagingSenderId: '12179317226',
    appId: '1:12179317226:web:299d068530cb267a571293'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);