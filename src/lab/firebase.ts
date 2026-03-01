// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD386Fel6qcqiDcNY2RkkvXpqg8-LYsy2M",
  authDomain: "dawood-trader.firebaseapp.com",
  projectId: "dawood-trader",
  storageBucket: "dawood-trader.firebasestorage.app",
  messagingSenderId: "394127306168",
  appId: "1:394127306168:web:371b227cadc073d2ecf34d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
