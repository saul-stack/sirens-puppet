import Canvas from "../Canvas";
import { useEffect, useState, useContext } from "react";
import { getPictonaryPrompts } from "./Utils/utils";
import socket from "./Utils/Socket";
import { UserContext } from "../contexts/UserContext";
function CanvasTestPage({
  mousePos,
  users,
  setUsers,
  timerCountdownSeconds,
  currentDraw,
  currentGuess,
}) {
  const [picturePrompts, setpicturePrompts] = useState([]);
  const { user } = useContext(UserContext);
  let word;

  useEffect(() => {
    getPictonaryPrompts().then((data) => {
      const { PictionaryPrompts } = data;
      setpicturePrompts(PictionaryPrompts);
    });
  }, []);

  function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * picturePrompts.length);
    return picturePrompts[randomIndex];
  }

  const [randomPrompt, setRandomPrompt] = useState();

  useEffect(() => {
    if (user.draw) {
      const newPrompt = getRandomPrompt();
      console.log(newPrompt, "<<<<<newPrompt");
      socket.emit("front-end-randomPrompt", { prompt: newPrompt });
    }
  }, [picturePrompts]);

  useEffect(() => {
    function fetchRandomPrompt(data) {
      setRandomPrompt(data.prompt);
      word = data.prompt;
      // if (data.prompt) {
      //   for (let i = 0; i < data.prompt.length; i++) {
      //     hiddenWord.push("_");
      //   }
      // }
    }
    socket.on("backend-randomPrompt", fetchRandomPrompt);

    return () => {
      socket.off("backend-randomPrompt", fetchRandomPrompt);
    };
  }, []);

  let hiddenWord = "";

  // useEffect(() => {
  //   if (randomPrompt) {
  //     for (let i = 0; i < randomPrompt.length; i++) {
  //       hiddenWord += '_'
  //     }
  //   }
  // }, [randomPrompt])

  // console.log(hiddenWord, 'hiddenWord');
  return (
    <div className="canvas-container">
      {/* {user.draw ? (
        <h1 className="drawPrompt">Draw a {word}</h1>
      ) : (
        <h1> Guess the Word ... {hiddenWord} </h1>
      )} */}
      <Canvas
        timerCountdownSeconds={timerCountdownSeconds}
        users={users}
        setUsers={setUsers}
        randomPrompt={randomPrompt}
        hiddenWord={hiddenWord}
        currentDraw={currentDraw}
        currentGuess={currentGuess}
      />
    </div>
  );
}
export default CanvasTestPage;
