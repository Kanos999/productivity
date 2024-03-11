import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";

const Login = ({ app }) => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, emailInput, passwordInput)
    .then((userCredential) => {
      // Logged in 
      const user = userCredential.user;
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("accessToken", user.accessToken);
      navigate('/main')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  };
  
  return (
    <div className="absolute h-full w-full bg-black flex flex-col items-center">
      <div className="absolute w-full h-60 bg-gray"></div>
      <div className="z-20 w-1/2 max-w-[400px] p-10 mt-20 bg-black justify-self-center flex flex-col items-center border border-bone/40 rounded-xl">
        <h2 className="text-2xl text-white mb-10 text-center font-bold">Login</h2>
        <input
          onChange={(e) => {setEmailInput(e.target.value)}}
          type="text"
          className="bg-black border border-bone/60 text-white p-4 w-full my-4 rounded-lg"
          placeholder="Email"
        />
        <input
          onChange={(e) => {setPasswordInput(e.target.value)}}
          type="password"
          className="bg-black border border-bone/60 text-white p-4 w-full my-4 rounded-lg"
          placeholder="Password"
        />
        <button className="bg-bone/40 text-white mx-aut font-bold text-xl p-4 my-5 text-center rounded-full" onClick={handleSubmit}>Continue</button>
      </div>
      <button 
        className="text-white font-bold text-lg mt-6"
        onClick={() => {navigate('/signup')}}>Don't have an account? Sign up &#8594;</button>
    </div>
  );
};

export default Login;