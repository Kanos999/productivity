import './App.css';
import React from "react";

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
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profileSetup" element={<ProfileBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
