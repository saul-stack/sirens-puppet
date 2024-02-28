import React, { useState, useEffect } from "react";
import "../App.css";

function Timer({ timerCountdownSeconds, onTimeUp }) {
  const [seconds, setSeconds] = useState(timerCountdownSeconds);
  const [isRunning, setIsRunning] = useState(true); // Set to true to start automatically
  let timeUp = false;

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      if (seconds === 0) {
        setIsRunning(false);
        if (onTimeUp) onTimeUp();
        return;
      }
      timerInterval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning, seconds]);

  // No button handlers needed

  return (
    <div className="timer-container">
      <div className="timer-display">{seconds}</div>
    </div>
  );
}

export default Timer;
