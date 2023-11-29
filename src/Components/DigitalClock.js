// DigitalClock.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'

const DigitalClock = ({offsetTime, start }) => {
  // const [start, setStart]=useState(true)
  const [time, setTime] = useState(offsetTime);
  const [isRunning, setIsRunning] = useState(true);
  // const [formattedTime, setFormattedTime]=useState()

  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit',hour12: false}
  const formattedTime =time?.toLocaleTimeString('en-US', options);

useEffect(() => {
  console.log("offsetTime", offsetTime)
  let intervalID;
  if(start===true){
  intervalID = setInterval(() => {
    console.log("value check", new Date());
    setTime((prevTime) => {
      const newTime = new Date(prevTime?.getTime() + 1000);
      console.log("new time",newTime);
      return newTime;
    });
  }, 1000);
}

  // Clean up the interval when the component unmounts
  return () => clearInterval(intervalID);
}, [start]); // Dependency array to re-run the effect when 'city' changes


  return (      
      <div className="digital-clock">
        {/* <button onClick={()=>setStart(!start)}>Start/Pause</button> */}
        {formattedTime}
      </div>
    
  );
};

export default DigitalClock;
