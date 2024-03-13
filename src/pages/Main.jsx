import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import { getActivities, getSessions } from '../database/requests';

import { ActivityButton, MonthDivider, SessionCard, Badge } from '../components/Common';
import MusicController from '../components/MusicController';

const Main = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [currentActivity, setCurrentActivity] = useState("");
  const [dialogState, setDialogState] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("uid"))
      navigate("/login");
    
    getActivities(setActivities);
    getSessions(setAllSessions);
  }, [navigate]);

  // Filter sessions per activity
  useEffect(() => {
    console.log("Current Activity:", currentActivity);
    let tmp = allSessions.filter(s => s.activity === currentActivity);
    setFilteredSessions(tmp);

    let timeSum = 0;
    tmp.forEach((s) => {
      timeSum += s.time;
    });
    setTotalTime(timeSum);
  }, [currentActivity, allSessions]);

  const openDialog = () => {
    setDialogState(true);
  };

  const closeDialog = () => {
    setDialogState(false);
  };

  return (
    <div className="absolute h-full w-full bg-black flex flex-row">

      {/* Activities Dialog */}
      <div className={`absolute h-full w-full grid place-content-center 
                    transition-opacity ease-in-out duration-300 ${dialogState ? "opacity-1 z-30" : "opacity-0 -z-30"}`}>
        <div onClick={closeDialog} className="absolute h-full w-full bg-black/40 z-10"></div>
        <div className="bg-gray rounded-xl p-10 z-30">
          <h2 className="text-2xl text-white font-bold">Edit Activities</h2>
          <button className="border border-lightGray p-4 rounded-lg text-xl text-white font-bold">Save Changes</button>
        </div>
      </div>
    
      
      {/* LEFT SECTION */}
      <div className="border-r border-r-lightGray mr-8 h-full w-24 pt-5 z-20">
        {activities.map((activity) => {
          return(
            <ActivityButton
              id={activity.id}
              key={activity.id}
              currentActivity={currentActivity}
              onClick={() => setCurrentActivity(activity.id)}>{activity.name}</ActivityButton>);
        })}
        <div 
          className="translate-x-3/4"
          onClick={openDialog}>
            <div className="pt-1 pb-2 w-12 rounded-full bg-black text-center text-xl text-white 
                            font-bold border border-lightGray 
                            transition ease-in-out duration-300 hover:cursor-pointer hover:bg-gray">
              ...
            </div>
          </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="h-full grow flex flex-col items-center">
        
        {/* Control button group for time and music */}
        <MusicController currentActivity={currentActivity} />

        <div className="h-auto w-5/6 overflow-y-auto noScrollbar">
          {/* List of previous times */}
          <MonthDivider month="April" />

          {/* Recorded time card */}
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 w-full my-10">
            {filteredSessions.map((session) => {
              return(
                <SessionCard
                  time={session.time}
                  date={session.date}
                  rating={80} />
              )
            })}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="h-full w-1/4 p-6 bg-black text-left border-l border-l-lightGray text-white flex flex-col items-start">
        <h2 className="text-2xl font-bold">Stats</h2>

        <Badge>Total time spent</Badge>
        <p>{Math.floor(totalTime / 3600)} Hours,</p>  
        <p>{Math.floor((totalTime % 3600)/60)} Minutes,</p> 
        <p>{Math.floor(totalTime % 60)} Seconds </p>

        <Badge>Past week</Badge>
        <p>6 hours, 25 mins</p>
      </div>
    </div>
  );
};

export default Main;