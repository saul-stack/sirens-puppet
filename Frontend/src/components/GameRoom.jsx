import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import PlayerDesignation from "./PlayerDesignation";
import RoundPage from "./RoundPage";
import CanvasTestPage from "./CanvasTestPage";
import ChatWindow from "./ChatWindow";
import VotePage from "./VotePage";
import { LivesContext } from "../contexts/LivesContext";
import { useNavigate } from "react-router-dom";
import EndGamePage from "./EndGamePage";

function GameRoom(users, setUsers) {
  const navigate = useNavigate();
  const teamLives = useContext(LivesContext);

  const [showPlayerDesignation, setShowPlayerDesignation] = useState(true);
  const [showRoundPage, setShowRoundPage] = useState(false);
  const [showCanvasTestPage, setShowCanvasTestPage] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { user } = useContext(UserContext);
  const [drawTurn, setDrawTurn] = useState(0);
  const [guessTurn, setGuessTurn] = useState(1);
  const [isDrawer, setIsDrawer] = useState();
  const [isGuesser, setIsGuesser] = useState();
  const [teamLose, setTeamLose] = useState(false);
  const [round, setRound] = useState(0);

  const pickTurn = () => {
    setDrawTurn((prevTurn) => prevTurn + 1);
    setGuessTurn((prevTurn) => prevTurn + 1);
    if (drawTurn === users.users[0].length - 1) {
      setDrawTurn(0);
    }
    const currentDraw = users.users[0][drawTurn];
    setIsDrawer(currentDraw);
    currentDraw === user.username ? (user.draw = true) : (user.draw = false);
    if (guessTurn === users.users[0].length - 1) {
      setGuessTurn(0);
    }
    const currentGuess = users.users[0][guessTurn];
    setIsGuesser(currentGuess);
    currentGuess === user.username ? (user.guess = true) : (user.guess = false);
  };

  let playerDesignationLength = 5000;
  let roundLength = 30000;
  let roundBreakLength = 5000;
  let numberOfRounds = 5;

  useEffect(() => {
    const playerDesignationTimer = setTimeout(() => {
      setShowPlayerDesignation(false);
      setShowRoundPage(true);
    }, playerDesignationLength);

    return () => clearTimeout(playerDesignationTimer);
  }, []);

  useEffect(() => {
    if (showRoundPage) {
      pickTurn();
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

  useEffect(() => {
    if (teamLives.lives < 1) {
      setGameOver(true);
      setTeamLose(true);
    }
  }, [teamLives]);

  return (
    <div>
      <h2>Lives: {teamLives.lives}</h2>
      {!gameOver && !teamLose && (
        <div>
          {showPlayerDesignation && <PlayerDesignation />}
          {showRoundPage && <RoundPage round={round} setRound={setRound} />}
          {showCanvasTestPage && (
            <CanvasTestPage
              timerCountdownSeconds={roundLength / 1000}
              users={users}
              setUsers={setUsers}
              isDrawer={isDrawer}
              isGuesser={isGuesser}
            />
          )}
        </div>
      )}
      {!teamLose && gameOver && <VotePage playerList={users.playerList} />}
      {teamLose && (
        <EndGamePage playerList={users.playerList} resultsVisible={true} />
      )}
      <ChatWindow />
    </div>
  );
}

export default GameRoom;
