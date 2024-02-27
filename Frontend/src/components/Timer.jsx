import React, { useState, useEffect } from 'react';
import '../App.css';

function Timer() {
  const [seconds, setSeconds] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  let timerInterval;

  useEffect(() => {
    if (isRunning) {
      if (seconds === 0) {
        setIsRunning(false);
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

  const handleStartStop = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setSeconds(10); // Reset seconds to 10 when stopping
    }
  };

  const handleReset = () => {
    setSeconds(10);
  };

  const handleIncrement = () => {
    setSeconds((prevSeconds) => prevSeconds + 1);
  };

  const handleDecrement = () => {
    setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : prevSeconds));
  };

  return (
    <div className="timer-container">
      <div className="timer-display">{seconds}</div>
      <div className="timer-buttons">
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        {seconds === 0 ? (
          <button onClick={handleReset}>Reset</button>
        ) : (
          <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
        )}
      </div>
    </div>
  );
}

export default Timer;

