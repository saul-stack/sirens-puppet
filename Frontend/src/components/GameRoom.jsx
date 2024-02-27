import React, { useState, useEffect } from "react";
import PlayerDesignation from "./PlayerDesignation";
import RoundPage from "./RoundPage";
import CanvasTestPage from "./CanvasTestPage";
import ChatWindow from "./ChatWindow";

function GameRoom(users, setUsers) {
  const [showPlayerDesignation, setShowPlayerDesignation] = useState(true);
  const [showRoundPage, setShowRoundPage] = useState(false);
  const [showCanvasTestPage, setShowCanvasTestPage] = useState(false);

  const [round, setRound] = useState(0);

  console.dir(users.users, 'users');

  let drawTurn = -1
  let guessTurn = 0
  
  const pickTurn = (users) => {
    drawTurn++;
    if (drawTurn === users.length) {
      drawTurn = 0;
    }
    users.forEach((player, index) => {
      index === drawTurn ? player.draw = true : player.draw = false;
    });
    guessTurn++;
    if (guessTurn === users.length) {
      guessTurn = 0;
    }
    users.forEach((player, index) => {
      index === guessTurn ? player.guess = true : player.guess = false
    });
  };

  let playerDesignationLength = 10000;
  let roundLength = 20000;
  let roundBreakLength = 5000;

  useEffect(() => {
    const playerDesignationTimer = setTimeout(() => {
      setShowPlayerDesignation(false);
      setShowRoundPage(true);
    }, playerDesignationLength);

    return () => clearTimeout(playerDesignationTimer);
  }, []);

  useEffect(() => {
    if (showRoundPage) {
      const roundPageTimer = setTimeout(() => {
        pickTurn()
        setShowRoundPage(false);
        setShowCanvasTestPage(true);
      }, roundBreakLength);

      return () => clearTimeout(roundPageTimer);
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
      {showPlayerDesignation && <PlayerDesignation />}
      {showRoundPage && <RoundPage round={round} setRound={setRound} />}
      {showCanvasTestPage && <CanvasTestPage users={users} setUsers={setUsers} />}
      <ChatWindow />
    </div>
  );
}

export default GameRoom;
