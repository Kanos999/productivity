import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { initialiseAccount } from '../database/requests';

const ProfileBuilder = () => {
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState([])

  const activityOptions = [{
    text: 'Work'
  }, {
    text: 'Study'
  }, {
    text: 'Exercise'
  }, {
    text: 'Sports'
  }, {
    text: 'Hobbies'
  }];

  const selectActivity = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(item => item !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  }

  const progressToNext = () => {
    initialiseAccount(localStorage.getItem("uid"), selectedActivities, () => {
      navigate('/main')
    });
  };

  return (
    <div className="bg-black absolute w-full h-full">
      <div className="flex h-full flex-row items-center">

        {/* Left half */}
        <div className="w-1/2 p-20 h-full border-r border-r-lightGray flex flex-row items-center">
          <h2 className="text-white inline-block align-middle font-semibold text-4xl text-right w-full">What do you do?</h2>
        </div>

        {/* right half */}
        <div className="h-auto w-1/2 p-20">
          <div className="w-full flex flex-wrap items-start">
            {activityOptions.map((activity, index) => ActivitySelectButton(activity, selectedActivities, selectActivity))}
          </div>
        </div>
      </div>

      <button 
        className="absolute left-1/2 transform -translate-x-1/2 bottom-40 text-lg font-semibold text-white p-6 bg-gray rounded-full"
        onClick={progressToNext}>
        Continue
      </button>
    </div>
  );
}

const ActivitySelectButton = (activity, selectedActivities, selectActivity) => {
  return (
    <button 
      className={
        `m-2 py-3 px-6 h-16 font-medium border border-lightGray rounded-full transition duration-300 ease-in-out
        ${selectedActivities.includes(activity.text) ? "bg-ghost text-black" : "text-white"}`}
      onClick={() => {selectActivity(activity.text)}}
      key={activity.text}>
        {activity.text}
    </button>
  );
}

export default ProfileBuilder;
