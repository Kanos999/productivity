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

const ConfirmationModal = ({state, close, title, body, callBack}) => {
  return (
    <div className={`absolute h-full w-full grid place-content-center 
                    transition-opacity ease-in-out duration-300 ${state ? "opacity-1 z-40" : "opacity-0 -z-40"}`}>
      <div onClick={close} className="absolute h-full w-full bg-black/60 z-10"></div>
      <div className="bg-gray rounded-xl p-10 z-30">
        <h2 className="w-full text-center text-2xl text-white font-bold">{title}</h2>
        <div className="text-lightGray">{body}</div>
        <div className="flex flex-row w-full mt-4">
          <button 
            onClick={close}
            className="border border-lightGray grow mr-2 p-4 rounded-lg text-xl text-white font-bold">
            Cancel
          </button>
          <button 
            onClick={callBack}
            className="border border-lightGray grow ml-2 p-4 rounded-lg text-xl text-white font-bold bg-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export { TextInput, ActivityButton, MonthDivider, SessionCard, Badge, ConfirmationModal };