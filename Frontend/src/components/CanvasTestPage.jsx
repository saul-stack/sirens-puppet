import Canvas from "../Canvas";
import { useEffect, useState } from "react";
import { getPictonaryPrompts } from "./Utils/utils";

function CanvasTestPage({ mousePos, users, setUsers, timerCountdownSeconds }) {

  let drawTurn = -1;
  let guessTurn = 0;

  const pickTurn = () => {
    drawTurn++;
    guessTurn++;
    if (drawTurn === users.users.length) {
      drawTurn = 0;
    }
    console.log(users.users[drawTurn][drawTurn], 'drawturn');
    const currentDraw = users.users[drawTurn][drawTurn]
    console.log(currentDraw, 'currentDraw');
    currentDraw === user.username ? user.draw = true : user.draw = false
    if (guessTurn === users.users.length) {
      guessTurn = 0;
    }
    const currentGuess = users.users[guessTurn][guessTurn]
    console.log(currentGuess, 'currentGuess');
    currentGuess === user.username ? user.guess = true : user.guess = false
  }; 



  const [picturePrompts, setpicturePrompts] = useState([]);

  useEffect(() => {
    pickTurn()
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
      <Canvas timerCountdownSeconds={timerCountdownSeconds} users={users} setUsers={setUsers} randomPrompt={randomPrompt} hiddenWord={hiddenWord}/>
      
    </div>
  );
}

export default CanvasTestPage;
