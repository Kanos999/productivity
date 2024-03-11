import './App.css';
import React from "react";

import { initializeApp } from "firebase/app";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileBuilder from './pages/ProfileBuilder';



function App() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDizA_8--2sCX_CrkC1nfDhq7_jCN9AfjY",
    authDomain: "productivity-345ab.firebaseapp.com",
    projectId: "productivity-345ab",
    storageBucket: "productivity-345ab.appspot.com",
    messagingSenderId: "735401720025",
    appId: "1:735401720025:web:bfcdc10be036763be166c8",
    measurementId: "G-MQ68BTN13Y",
    databaseURL: "https://productivity-345ab-default-rtdb.asia-southeast1.firebasedatabase.app"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup app={app} />} />
        <Route path="/main" element={<Main app={app} />} />
        <Route path="/login" element={<Login app={app} />} />
        <Route path="/signup" element={<Signup app={app} />} />
        <Route path="/profileSetup" element={<ProfileBuilder app={app} />} />
      </Routes>
    </Router>
  );
}

export default App;
