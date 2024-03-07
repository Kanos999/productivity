import React from 'react';

const Main = () => {


  return (
    <div className="absolute h-full w-full bg-black flex flex-row">
      {/* LEFT SECTION */}
      <div className="border-r border-r-gray h-full w-20 pt-5">
        <div className="p-2 translate-x-1/2 rounded-lg bg-white text-black font-bold mb-6">All</div>
        <div className="p-2 translate-x-1/2 rounded-lg bg-bone text-black font-bold">Another thing</div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="h-full grow flex flex-col items-center">
        
        {/* Control button group for time and music */}
        <div className="w-4/6 h-auto justify-self-center flex flex-row my-10 rounded-full overflow-visible justify-between items-center bg-gray">
          <div className="text-white py-2 pl-6 pr-10 text-md font-semibold">Start Timer</div>
          <div className="text-white py-2 text-md font-bold grow border-x border-x-bone/10">00:00</div>
          <div className="text-white py-2 pr-6 pl-10 text-md font-semibold">Music Choice</div>
        </div>

        {/* List of previous times */}
        <div className="w-5/6 border-b border-b-gray flex flex-col items-center">
          <div className="translate-y-1/2 rounded-full bg-gray text-white p-2 w-40">April</div>
        </div>

        {/* Recorded time card */}
        <div class="grid grid-cols-2 gap-6 text-white my-10 w-5/6">
          <div className="flex flex-row rounded-lg border border-gray text-left items-end">
            <div className="grow">
              <h2 className="ml-6 mt-6 font-bold text-xl">1:20:23</h2>
              <p className="ml-6 mb-6 text-md text-bone">13/04</p>
            </div>
            <div className="r-0 h-2/3 rounded-lg w-6 bg-bone"></div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="h-full w-1/4 p-6 bg-black text-left border-l border-l-gray text-white flex flex-col items-start">
        <h2 className="text-2xl font-bold">Stats</h2>

        <div className="rounded-full border border-gray bg-gray py-2 px-4 mt-10 mb-4 -ml-2 w-auto font-semibold">Total time spent</div>
        <p>13 hours, 55 mins</p>

        <div className="rounded-full border border-gray bg-gray py-2 px-4 mt-10 mb-4 -ml-2 w-auto font-semibold">Past week</div>
        <p>6 hours, 25 mins</p>
      </div>
    </div>
  );
};

export default Main;