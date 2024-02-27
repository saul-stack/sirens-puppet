import React, { useState, useEffect } from "react";
import PlayerDesignation from "./PlayerDesignation";
import RoundPage from "./RoundPage";
import CanvasTestPage from "./CanvasTestPage";
import ChatWindow from "./ChatWindow";
import VotePage from "./VotePage";

function GameRoom(users, setUsers) {
  const [showPlayerDesignation, setShowPlayerDesignation] = useState(true);
  const [showRoundPage, setShowRoundPage] = useState(false);
  const [showCanvasTestPage, setShowCanvasTestPage] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [round, setRound] = useState(0);

  let drawTurn = -1;
  let guessTurn = 0;

  const pickTurn = () => {
    drawTurn++;
    if (drawTurn === users.users.length) {
      drawTurn = 0;
    }
    users.users.forEach((player, index) => {
      index === drawTurn ? (player.draw = true) : (player.draw = false);
    });
    guessTurn++;
    if (guessTurn === users.users.length) {
      guessTurn = 0;
    }
    users.users.forEach((player, index) => {
      index === guessTurn ? (player.guess = true) : (player.guess = false);
    });
  };

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
      console.log(round + 1, "<--currentRound");
      console.log(numberOfRounds, "<--numberOfRounds");
      console.log(gameOver, "<--gameOver, round > numberOfRounds");

      if (round + 1 > numberOfRounds) setGameOver(true);
      else {
        const roundPageTimer = setTimeout(() => {
          pickTurn();
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
      {!gameOver && (
        <div>
          {showPlayerDesignation && <PlayerDesignation />}
          {showRoundPage && <RoundPage round={round} setRound={setRound} />}
          {showCanvasTestPage && (
            <CanvasTestPage users={users} setUsers={setUsers} />
          )}
        </div>
      )}
      {gameOver && <VotePage />}
      <ChatWindow />
    </div>
  );
}

export default GameRoom;
