import React, { useState } from "react";
import Timer from "./Timer";
import EndGamePage from "./EndGamePage"; // Import the EndGamePage component
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

//timer countdown length
let timerCountdownSeconds = 30;

// Sample object for testing purposes
const players = [
  {
    name: "John Doe",
    profileImage: "../../images/gold coin image.png",
  },
  {
    name: "Jane Smith",
    profileImage: "../../images/gold coin image.png",
  },
  {
    name: "Alice Johnson",
    profileImage: "../../images/gold coin image.png",
  },
];

function VotePage() {
  const { usersArray } = useContext(UserContext);
  console.log(usersArray, "<-- users from the context");

  const [votedIndex, setVotedIndex] = useState(null);
  const [timerCompleted, setTimerCompleted] = useState(false); // State to track if timer completed

  // Function to handle voting
  const handleVote = (index) => {
    if (votedIndex === null) {
      setVotedIndex(index);
    }
  };

  const handleTimeUp = () => {
    setTimerCompleted(true); // Set timer completed state to true
  };

  const votedPerson = votedIndex !== null ? usersArray[votedIndex] : null;

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: "20px",
        borderRadius: "10px",
        color: "black",
        fontSize: "50px",
        boxShadow: "1px 1px 50px black",
      }}
    >
      {!timerCompleted ? ( // Render Timer component if timer is not completed
        <>
          <h2>Hunt down the traitor!</h2>
          <Timer
            timerCountdownSeconds={timerCountdownSeconds}
            onTimeUp={handleTimeUp}
          />
          {usersArray.map((person, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                boxShadow: "1px 1px 50px #888888",
              }}
            >
              <img
                src={person.avatarURL}
                style={{ width: "100px", marginRight: "10px" }}
              />
              <div>{person.username}</div>
              {/* Button for voting */}
              <button
                onClick={() => handleVote(index)}
                disabled={votedIndex !== null}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  fontSize: "14px",
                }}
              >
                Vote
              </button>
            </div>
          ))}
          {votedPerson && (
            <div style={{ marginTop: "20px" }}>
              <h3>{votedPerson.username} is about to walk the plank!</h3>
              <div>
                <img
                  src={votedPerson.avatarURL}
                  style={{ width: "100px", marginRight: "10px" }}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <EndGamePage
          votedPerson={votedPerson.username}
          usersArray={usersArray}
        /> // Render EndGamePage component when timer is completed
      )}
    </div>
  );
}

export default VotePage;
