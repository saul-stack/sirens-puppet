import React, { useState, useEffect } from "react";
import PlayerDesignation from "./PlayerDesignation";
import RoundPage from "./RoundPage";
import CanvasTestPage from "./CanvasTestPage";

function GameRoom() {
  const [showPlayerDesignation, setShowPlayerDesignation] = useState(true);
  const [showRoundPage, setShowRoundPage] = useState(false);
  const [showCanvasTestPage, setShowCanvasTestPage] = useState(false);
  const [round, setRound] = useState(0);

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
      {showCanvasTestPage && <CanvasTestPage />}
    </div>
  );
}

export default GameRoom;
