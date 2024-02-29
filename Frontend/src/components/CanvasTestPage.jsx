import Canvas from "../Canvas";
import { useEffect, useState, useContext } from "react";
import { getPictonaryPrompts } from "./Utils/utils";
import socket from "./Utils/Socket";
import { UserContext } from "../contexts/UserContext";

function CanvasTestPage({ mousePos, users, setUsers, timerCountdownSeconds, isDrawer, isGuesser }) {

  const [picturePrompts, setpicturePrompts] = useState([]);

  const { user } = useContext(UserContext)

  // const change

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
    console.log(newPrompt, '<<<<<newPrompt');
    socket.emit('front-end-randomPrompt', {prompt: newPrompt})
    }
  }, [picturePrompts])


  useEffect(() => {
    function fetchRandomPrompt(data){
      setRandomPrompt(data.prompt)
      if(data.prompt){
        for (let i = 0; i < data.prompt.length; i++) {
          hiddenWord.push("_");
    }
  }
  }
    socket.on('backend-randomPrompt', fetchRandomPrompt)
  })

  let hiddenWord = ''

  useEffect(() => {
  if(randomPrompt){
  for (let i = 0; i < randomPrompt.length; i++) {
    hiddenWord += '_'
  }
  } 
  }, [randomPrompt])

  console.log(hiddenWord, 'hiddenWord');


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
