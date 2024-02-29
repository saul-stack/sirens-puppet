import React, { useState } from "react";
import Timer from "./Timer";
import EndGamePage from "./EndGamePage"; // Import the EndGamePage component
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { VotesContext } from "../contexts/VotesContext";

//timer countdown length
let timerCountdownSeconds = 30;

function VotePage({ playerList }) {
  const { usersArray } = useContext(UserContext);
  const { setVotes } = useContext(VotesContext);

  const [votedIndex, setVotedIndex] = useState(null);
  const [timerCompleted, setTimerCompleted] = useState(false);

  // Function to handle voting
  const handleVote = (index) => {
    if (votedIndex === null) {
      setVotedIndex(index);
    }
    const votedPerson = playerList[index].username;
    setVotes((currentVotes) => {
      return { ...currentVotes, [votedPerson]: +1 };
    });
  };

  const handleTimeUp = () => {
    setTimerCompleted(true);
  };

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
      {!timerCompleted ? (
        <>
          <h2>Hunt down the traitor!</h2>
          <Timer
            timerCountdownSeconds={timerCountdownSeconds}
            onTimeUp={handleTimeUp}
          />
          {playerList.map((person, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                boxShadow: "1px 1px 50px #888888",
              }}
            >
              <div>{person.username}</div>
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
        </>
      ) : (
        <EndGamePage playerList={playerList} />
      )}
    </div>
  );
}

export default VotePage;
