import Canvas from "../Canvas";
import { useEffect, useState, useContext } from "react";
import { getPictonaryPrompts } from "./Utils/utils";
import socket from "./Utils/Socket";
import { UserContext } from "../contexts/UserContext";

function CanvasTestPage({ mousePos, users, setUsers, timerCountdownSeconds, isDrawer, isGuesser }) {

  const [picturePrompts, setpicturePrompts] = useState([]);

  const { user } = useContext(UserContext)

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

  const [randomPrompt, setRandomPrompt] = useState()


  useEffect(() => {
    if (user.draw){
    const newPrompt = getRandomPrompt()
    socket.emit('front-end-randomPrompt', {prompt: newPrompt})
    }
  }, [picturePrompts])


  useEffect(() => {
    function fetchRandomPrompt(data){
      setRandomPrompt(data.prompt)
    }
    socket.on('backend-randomPrompt', fetchRandomPrompt)
  })


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
      <Canvas timerCountdownSeconds={timerCountdownSeconds} users={users} setUsers={setUsers} randomPrompt={randomPrompt} hiddenWord={hiddenWord} isDrawer={isDrawer} isGuesser={isGuesser}/>
      
    </div>
  );
}

export default CanvasTestPage;
