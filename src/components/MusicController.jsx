import React, { useState } from 'react';
import YouTube from 'react-youtube';


const MusicController = ({currentActivity}) => {
  const [selectedMusic, setSelectedMusic] = useState("");
  const [activityInProgress, setActivityInProgress] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const [player, setPlayer] = useState({});

  const startStopActivity = () => {
    // Toggle the activity state
    if (activityInProgress !== -1) {
      player.pauseVideo();
      
      setActivityInProgress(-1);
      setElapsed(0);
    }
    else {
      player.playVideo();
      setActivityInProgress(currentActivity);
    }
  }

  return (
    <div className="w-4/6 h-auto justify-self-center flex flex-row my-10 rounded-full overflow-visible justify-between items-center bg-gray">
      <button 
        className="text-white py-2 pl-6 pr-10 text-md font-semibold"
        onClick={startStopActivity}>
        Start Timer
      </button>
      <Timer>{elapsed}</Timer>
      <MusicSelector setSelectedMusic={setSelectedMusic}>Music Choice</MusicSelector>
      <MusicPlayer setPlayer={setPlayer} selectedMusic={selectedMusic} />
    </div>  
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

const MusicSelector = ({ setPlayer, setSelectedMusic }) => {
  return (
    <div>
      <select className="text-white bg-gray rounded-r-full py-2 pr-6 pl-10 text-md font-semibold" 
          onChange={(event) => setSelectedMusic(event.target.value)}>
        <option value="">None</option>
        <option value="VZxzRSq9deQ">Lofi</option>
        <option value="tSlOlKRuudU">Piano</option>
        <option value="J1qgmniS8VM">House</option>
      </select>
    </div>
  );
}


const Timer = ({inProgress, children}) => {

  return (
    <div className="text-white py-2 text-md text-center font-bold grow border-x border-x-bone/10">
      {Math.floor(children / 60)}:{("0" + children % 60).slice(-2)}
    </div>
  );
};

export default MusicController;