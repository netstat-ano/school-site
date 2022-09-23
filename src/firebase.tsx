import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyCvfNiHDkY-HCTQLh0Q7vvMW7-n_V7wLKI",
    authDomain: "school-site-170c6.firebaseapp.com",
    projectId: "school-site-170c6",
    storageBucket: "school-site-170c6.appspot.com",
    messagingSenderId: "701180289673",
    appId: "1:701180289673:web:ad4922f0c6d58317285c58",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);
