import Canvas from "../Canvas";
import { useEffect, useState, useContext } from "react";
import { getPictonaryPrompts } from "./Utils/utils";
import { UserContext } from "../contexts/UserContext";

function CanvasTestPage({
  mousePos,
  users,
  setUsers,
  timerCountdownSeconds,
  isDrawer,
  isGuesser,
}) {
  const [picturePrompts, setpicturePrompts] = useState([]);

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

  const randomPrompt = getRandomPrompt();

  const hiddenWord = [];

  useEffect(() => {
    if (randomPrompt) {
      for (let i = 0; i < randomPrompt.length; i++) {
        hiddenWord.push("_");
      }
    }
  }, [randomPrompt]);

  return (
    <div className="canvas-container">
      <Canvas
        timerCountdownSeconds={timerCountdownSeconds}
        users={users}
        setUsers={setUsers}
        randomPrompt={randomPrompt}
        hiddenWord={hiddenWord}
        isDrawer={isDrawer}
        isGuesser={isGuesser}
      />
    </div>
  );
}

export default CanvasTestPage;
