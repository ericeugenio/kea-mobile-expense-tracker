import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';

import { monthToString } from '../utils/dateHelper';
import { userAuth } from './firebase.auth';

export const expenseDB = {
    create: async (expense) => {
        const docRef = await addDoc((collection(db, 'expenses')), {
            merchant: expense.merchant,
            description: expense.description,
            amount: expense.amount,
            createdAt: serverTimestamp(),
            hasImage: expense.hasImage,
        });

        return docRef.id;
    },
    readAll: async () => {
        const expenses = [];

        const q = query(collection(db, 'expenses'), where('userId', '==', userAuth.user().uid), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {            
            let docData = doc.data();
            let expense = {
                id: doc.id,
                merchant: docData.merchant,
                description: docData.description,
                amount: docData.amount,
                createdAt: new Date(docData.createdAt.seconds * 1000),
                hasImage: docData.hasImage,
            };

            let expenseTitle = `${monthToString(expense.createdAt.getMonth())} ${expense.createdAt.getFullYear()}`;
            let i = expenses.findIndex((e) => e.title === expenseTitle);
            
            if (i >= 0) {
                expenses[i].data.push(expense);
            }
            else {
                let data = [expense];

                expenses.push({
                    title: expenseTitle,
                    data: data
                });
            }

        });

        return expenses;
    },
    update: async (expense) => {
        const ref = doc(db, 'expenses', expense.id);

        await updateDoc(ref, {
            merchant: expense.merchant,
            description: expense.description,
            amount: expense.amount,
            hasImage: expense.hasImage,
        });
    },
};
