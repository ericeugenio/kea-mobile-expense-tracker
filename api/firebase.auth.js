import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase"

export const userAuth = {
    login: async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            console.log(error);
        }
    },
    signup: async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            console.log(error);
        }
    },
    signout: async () => {
        try {
            await signOut(auth);
        }
        catch (error) {
            console.log(error);
        }
    },
    user: () => {
        return auth.currentUser;
    },
    listener: (callback) => {
        return onAuthStateChanged(auth, callback);
    }
};
