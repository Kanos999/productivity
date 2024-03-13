import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { postSession } from '../database/requests';


const MusicController = ({currentActivity}) => {
  const [selectedMusic, setSelectedMusic] = useState("");
  const [activityInProgress, setActivityInProgress] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const [player, setPlayer] = useState({});

  const startStopActivity = () => {
    // Toggle the activity state
    if (activityInProgress !== -1) {
      player.pauseVideo();
      postSession(localStorage.getItem("uid"), activityInProgress, elapsed);
      setElapsed(0);
      setActivityInProgress(-1);
    }
    else {
      player.playVideo();
      setActivityInProgress(currentActivity);
    }
  }

  useEffect(() => {
    if (activityInProgress === -1) return;
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setElapsed(elapsed + 1);
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [elapsed, activityInProgress]);

  return (
    <div className="shadow-lg shadow-black w-full z-10 px-24 mr-2">
      <div className="h-auto justify-self-center flex flex-row my-10 rounded-full overflow-visible justify-between items-center bg-gray">
        <StartStopButton activityInProgress={activityInProgress} startStopActivity={startStopActivity}/>
        <Timer activityInProgress={activityInProgress}>{elapsed}</Timer>
        <MusicSelector activityInProgress={activityInProgress} setSelectedMusic={setSelectedMusic}>Music Choice</MusicSelector>
        <MusicPlayer setPlayer={setPlayer} selectedMusic={selectedMusic} />
      </div>
    </div>
  );
}

const StartStopButton = ({ activityInProgress, startStopActivity }) => {

  return (
    <button 
      className={`text-white py-2 px-6 text-md font-semibold transition-all ease-in-out duration-300
                ${activityInProgress !== -1 ? "w-1/4" : "w-full"}`}
      onClick={startStopActivity}>
      {activityInProgress === -1 ? <>Start <br></br> Timer</> : <>Stop <br></br> Timer</>}
    </button>
  );
}

const MusicPlayer = ({ setPlayer, selectedMusic }) => {
  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  };

  const onLoad = (event) => {
    console.log("Video player loaded");
    setPlayer(event.target);
  }

  return (
    <div>
      <YouTube videoId={selectedMusic} opts={opts} onReady={onLoad} />
    </div>
  );
}

const MusicSelector = ({ activityInProgress, setSelectedMusic }) => {
  return (
    <div className={`${activityInProgress !== -1 ? "w-1/4 opacity-1" : "w-0 opacity-0"}`}>
      <select className={`text-white bg-gray rounded-r-full py-2 text-md font-semibold
                        transition-all ease-in-out duration-300
                        ${activityInProgress !== -1 ? "w-full px-6" : "w-0 px-0"}`}
          onChange={(event) => setSelectedMusic(event.target.value)}>
        <option value="">None</option>
        <option value="VZxzRSq9deQ">Lofi</option>
        <option value="tSlOlKRuudU">Piano</option>
        <option value="J1qgmniS8VM">House</option>
      </select>
    </div>
  );
}


const Timer = ({ activityInProgress, children}) => {
  return (
    <div className={`text-white py-2 text-md text-center font-bold border-x border-x-bone/10 
                    transition-all ease-in-out duration-300
                    ${activityInProgress !== -1 ? "grow opacity-1" : "w-0 opacity-0"}`}>
      {Math.floor(children / 60)}:{("0" + children % 60).slice(-2)}
    </div>
  );
};

export default MusicController;