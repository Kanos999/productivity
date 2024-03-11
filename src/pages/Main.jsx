import React, { useState, useEffect } from 'react';

import { ActivityButton, MonthDivider, SessionCard, Badge } from '../components/Common';
import MusicController from '../components/MusicController';
import { getDatabase, ref, onValue } from "firebase/database";

//import { getActivities } from '../database/requests';


const Main = () => {
  const [activities, setActivities] = useState(JSON.parse(localStorage.getItem("activities")));
  const [allSessions, setAllSessions] = useState(JSON.parse(localStorage.getItem("allSessions")));
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [currentActivity, setCurrentActivity] = useState("");
  const [dialogState, setDialogState] = useState(false);

  const db = getDatabase();

  useEffect(() => {
    const activitiesRef = ref(db, 'activities/' + localStorage.getItem("uid"));
    onValue(activitiesRef, (snapshot) => {
      const data = snapshot.val();
      const flattenedArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value
      }));
      setActivities(flattenedArray);
      localStorage.setItem("activities", JSON.stringify(flattenedArray));
    });

    const sessionsRef = ref(db, 'sessions/' + localStorage.getItem("uid"));
    onValue(sessionsRef, (snapshot) => {
      const data = Object.values(snapshot.val());
      setAllSessions(data);
      localStorage.setItem("allSessions", JSON.stringify(data));
    });
  }, [db]);

  const openDialog = () => {
    setDialogState(true);
  };

  const closeDialog = () => {
    setDialogState(false);
  };

  return (
    <div className="absolute h-full w-full bg-black flex flex-row">

      {/* Activities Dialog */}
    
      <div 
        onClick={closeDialog}
        className={`absolute h-full w-full bg-black/40 grid place-content-center 
                    transition-opacity ease-in-out duration-300 ${dialogState ? "opacity-1 z-30" : "opacity-0 -z-30"}`}>
        <div className="bg-gray rounded-xl p-10 pointer-events-none">
          <h2 className="text-2xl text-white font-bold">Edit Activities</h2>
          <button className="border border-lightGray p-4 rounded-lg text-xl text-white font-bold">Save Changes</button>
        </div>
      </div>
    
      
      {/* LEFT SECTION */}
      <div className="border-r border-r-lightGray mr-8 h-full w-20 pt-5">
        {activities.map((activity) => {
          return(
            <ActivityButton
              id={activity.id}
              key={activity.id}
              currentActivity={currentActivity}
              onClick={() => setCurrentActivity(activity.id)}>{activity.name}</ActivityButton>);
        })}
        <div 
          className="pt-1 pb-2 translate-x-1/2 rounded-full bg-black text-center text-xl text-white 
                    font-bold border border-lightGray 
                    transition ease-in-out duration-300 hover:cursor-pointer hover:bg-gray"
          onClick={openDialog}>...</div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="h-full grow flex flex-col items-center">
        
        {/* Control button group for time and music */}
        <MusicController />

        {/* List of previous times */}
        <MonthDivider month="April" />

        {/* Recorded time card */}
        <SessionCard
          time="1:20:45"
          date="13/04/2024"
          rating={80} />
      </div>

      {/* RIGHT SECTION */}
      <div className="h-full w-1/4 p-6 bg-black text-left border-l border-l-lightGray text-white flex flex-col items-start">
        <h2 className="text-2xl font-bold">Stats</h2>

        <Badge>Total time spent</Badge>
        <p>13 hours, 55 mins</p>

        <Badge>Past week</Badge>
        <p>6 hours, 25 mins</p>
      </div>
    </div>
  );
};

export default Main;