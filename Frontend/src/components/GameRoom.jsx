import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import PlayerDesignation from "./PlayerDesignation";
import RoundPage from "./RoundPage";
import CanvasTestPage from "./CanvasTestPage";
import ChatWindow from "./ChatWindow";
import VotePage from "./VotePage";
import { LivesContext } from "../contexts/LivesContext";
import { useNavigate } from "react-router-dom";

function GameRoom(users, setUsers) {
  const navigate = useNavigate;
  let teamLives = useContext(LivesContext);
  console.log(teamLives.lives, "<----team Lives");

  const [showPlayerDesignation, setShowPlayerDesignation] = useState(true);
  const [showRoundPage, setShowRoundPage] = useState(false);
  const [showCanvasTestPage, setShowCanvasTestPage] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { user } = useContext(UserContext);

  const [round, setRound] = useState(0);

  console.log(users.users, '<users')

  let drawTurn = -1;
  let guessTurn = 0;

  const pickTurn = () => {
    drawTurn++;
    guessTurn++;
    if (drawTurn === users.users.length) {
      drawTurn = 0;
    }
    const currentDraw = users.users[0][drawTurn]
    console.log(currentDraw, 'currentDraw');
    currentDraw === user.username ? user.draw = true : user.draw = false
    if (guessTurn === users.users.length) {
      guessTurn = 0;
    }
    const currentGuess = users.users[0][guessTurn]
    console.log(currentGuess, 'currentGuess');
    currentGuess === user.username ? user.guess = true : user.guess = false
  }; 


  console.log(user, 'userUpdated ');

  let playerDesignationLength = 3000;
  let roundLength = 5000;
  let roundBreakLength = 2000;

  let numberOfRounds = 3;

  useEffect(() => {
    const playerDesignationTimer = setTimeout(() => {
      setShowPlayerDesignation(false);
      setShowRoundPage(true);
    }, playerDesignationLength);

    return () => clearTimeout(playerDesignationTimer);
  }, []);

  useEffect(() => {
    if (showRoundPage) {
        pickTurn()
      if (round + 1 > numberOfRounds) setGameOver(true);
      else {
        const roundPageTimer = setTimeout(() => {
          setShowRoundPage(false);
          setShowCanvasTestPage(true);
        }, roundBreakLength);

        return () => clearTimeout(roundPageTimer);
      }
    }
  }, [showRoundPage]);

  useEffect(() => {
    if (showCanvasTestPage) {
      const canvasTestPageTimer = setTimeout(() => {
        setShowCanvasTestPage(false);
        setShowRoundPage(true);
      }, roundLength);

      return () => clearTimeout(canvasTestPageTimer);
    }
  }, [showCanvasTestPage]);

  return (
    <div>
      <h2>Lives: {teamLives.lives}</h2>
      {teamLives.lives > 1
        ? console.log("team has lives remaining")
        : () => {
            console.log("team has no lives remaining");
            navigate("/endGamePageTest");
          }}
      {!gameOver && (
        <div>
          {showPlayerDesignation && <PlayerDesignation />}
          {showRoundPage && <RoundPage round={round} setRound={setRound} />}
          {showCanvasTestPage && (
            <CanvasTestPage
              timerCountdownSeconds={roundLength / 1000}
              users={users}
              setUsers={setUsers}
            />
          )}
        </div>
      )}
      {gameOver && <VotePage />}
      <ChatWindow />
    </div>
  );
}

export default GameRoom;
