import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from '../database/requests';
import { TextInput } from '../components/Common';

const Login = () => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = () => {
    login(emailInput, passwordInput, (res) => {
      console.log(res);
      localStorage.setItem('uid', res.uid);
      navigate("/main")
    });
  };

  useEffect(() => {
    //if (localStorage.getItem("uid")) navigate("/main");
  }, [])
  
  return (
    <div className="absolute h-full w-full bg-black flex flex-col items-center">
      <div className="absolute w-full h-60 bg-gray"></div>
      <div className="z-20 w-5/6 md:w-1/2 max-w-[400px] p-10 mt-20 bg-black justify-self-center flex flex-col items-center border border-bone/40 rounded-xl">
        <h2 className="text-2xl text-white mb-10 text-center font-bold">Login</h2>
        <TextInput
          onChange={(e) => {setEmailInput(e.target.value)}}
          type="text"
          placeholder="Email"
        />
        <TextInput
          onChange={(e) => {setPasswordInput(e.target.value)}}
          type="password"
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