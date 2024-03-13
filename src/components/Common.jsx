import React from 'react';
//import { useNavigate } from "react-router-dom";

const TextInput = ({ onChange, type, placeholder }) => {
  return (
    <input
      onChange={onChange}
      type={type}
      className="bg-black border border-bone/60 text-white p-4 w-full my-4 rounded-lg
                transition-all ease-in-out duration-300"
      placeholder={placeholder}
    />
  );
}

const ActivityButton = ({ id, children, attention, onClick, currentActivity }) => {
  return (
    <div 
      onClick={onClick}
      className={`p-2 translate-x-1/2 z-20 rounded-lg border border-lightGray text-center font-bold 
                mb-6 transition-all ease-in-out duration-200 hover:cursor-pointer hover:bg-gray
                ${currentActivity === id ? "!bg-white !text-black" : "bg-black text-white"}`}>
      {children}
    </div>
  );
}

const MonthDivider = ({month}) => {
  return (
    <div className="w-full border-b border-b-lightGray flex flex-col items-center">
      <div className="translate-y-1/2 rounded-full bg-gray text-white text-center p-2 w-40">{month}</div>
    </div>
  );
}

const SessionCard = ({time, date, rating}) => {
  return (
    <div className="text-white">
      <div className="flex flex-row rounded-lg border border-lightGray text-left items-end">
        <div className="grow">
          <h2 className="ml-6 mt-6 font-bold text-xl">{Math.floor(time / 60)}:{("0" + time % 60).slice(-2)}</h2>
          <p className="ml-6 mb-6 text-md text-bone">{date}</p>
        </div>
        <div className="r-0 rounded-lg w-6 bg-bone" style={{height: rating}}></div>
      </div>
    </div>
  );
}

const Badge = ({children}) => {
  return (
    <div className="rounded-full bg-gray py-2 px-4 mt-10 mb-4 -ml-2 w-auto font-semibold">{children}</div>
  );
}

export { TextInput, ActivityButton, MonthDivider, SessionCard, Badge };