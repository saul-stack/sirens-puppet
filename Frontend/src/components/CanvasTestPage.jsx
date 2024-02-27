import Canvas from "../Canvas";
import { useEffect, useState } from "react";
import { getPictonaryPrompts } from "./Utils/utils";

function CanvasTestPage({mousePos, users, setUsers}) {

  const [picturePrompts, setpicturePrompts] = useState([]);

  useEffect(() => {
    getPictonaryPrompts().then((data) => {
      const { PictionaryPrompts } = data
      setpicturePrompts(PictionaryPrompts)
    })
  }, [])

  function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * picturePrompts.length);
    return picturePrompts[randomIndex];
  }

  const randomPrompt = getRandomPrompt()

  const hiddenWord = []

  useEffect(() => {
  if(randomPrompt){
  for (let i = 0; i < randomPrompt.length; i++) {
    hiddenWord.push("_");
  }
  } 
  }, [randomPrompt])


  return (
    <div className="canvas-container">
      <h1 className="canvas-title">
        "Ready, set, doodle! Let's see if your masterpiece speaks louder than
        words
      </h1>
      <Canvas users={users} setUsers={setUsers} randomPrompt={randomPrompt} hiddenWord={hiddenWord}/>
    </div>
  );
}

export default CanvasTestPage;
