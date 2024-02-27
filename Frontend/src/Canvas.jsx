import React, { useRef, useEffect, useState, useContext } from "react";
import socket from "./components/Utils/Socket";
import { UserContext } from "./contexts/UserContext";

function Canvas({ users, randomPrompt, hiddenWord }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingCommands, setDrawingCommands] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const [rotationAngle, setRotationAngle] = useState(0);

  const { setLives, user } = useContext (UserContext)

  const currentDrawer = users.users.find((player) => player.draw)
  const currentGuesser = users.users.find((player) => player.guess)
  const saboteur = users.users.find((player) => player.isSaboteur)


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "black";
    context.lineWidth = 5; // if we want to change the width of the line
    context.lineCap = "round";
    context.lineJoin = "round";

    const img = new Image();
    img.src = "../images/gridPaper.png";
    img.onload = () => {
      setBackgroundImage(img);
    };
  }, []);

 
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.moveTo(offsetX, offsetY);
    context.beginPath();
    if (currentDrawer[0] === user.username) {
      setIsDrawing(true);
      socket.emit("frontend_canvas_mouse_click");
    }
  };

  const drawFE = ({ nativeEvent }) => {
    if (isDrawing) {
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineTo(offsetX, offsetY);

      if (currentDrawer[0] === user.username) {
        context.stroke();
        socket.emit("frontend_canvas_mouse_move", {
          mouseX: offsetX,
          mouseY: offsetY,
        });
      }
    }
  };

  useEffect(() => {
    function onCavasMove(data) {
      // console.log(data);
      mirrorDrawBE(data);
    }

    function onCanvasRotate() {
      let start = null;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const angle = (progress / 2000) * 360; // Rotate over 2 seconds
        setRotationAngle(angle);
        if (progress < 2000) {
          requestAnimationFrame(animate);
        } else {
          // Reset rotation angle to 0 after rotation completes
          setRotationAngle(0);
        }
      };
      requestAnimationFrame(animate);
    }

    socket.on("backend_canvas_rotate", onCanvasRotate);

    socket.on("backend_canvas_mouse_move", onCavasMove);

    return () => {
      socket.off("backend_canvas_mouse_move", onCavasMove);
      socket.off("backend_canvas_rotate", onCanvasRotate);
    };
  }, []);

  const mirrorDrawBE = (data) => {
    if(user.username !== currentDrawer){
    console.log("inside mirror draw");
    // if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineTo(data.mouseX, data.mouseY);
    // console.log("in mirrorDrawBE");
    context.stroke();
    }
  };


  const finishDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      setDrawingCommands([...drawingCommands, canvas.toDataURL()]);
      socket.emit("frontend_canvas_mouse_release");
    }
  };


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (backgroundImage) {
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    drawingCommands.forEach((command) => {
      const img = new Image();
      img.src = command;
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
    });
  }, [drawingCommands, backgroundImage]);

  const handleReset = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setDrawingCommands([]);
    setRotationAngle(0); // Reset rotation angle
  };

  // Function to handle the rotation animation
  const rotateCanvas = () => {
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const angle = (progress / 2000) * 360; // Rotate over 2 seconds
      setRotationAngle(angle);
      if (progress < 2000) {
        requestAnimationFrame(animate);
      } else {
        // Reset rotation angle to 0 after rotation completes
        setRotationAngle(0);
      }
    };
    requestAnimationFrame(animate);
    socket.emit("frontend_canvas_rotate");
  };

  const [win, setWin] = useState(false)

  const [lose, setLose] = useState(false)

  const guess = useRef(null)


  const handleGuess = ((e) => {
    e.preventDefault()
    const currentGuess = guess.current.value
    if (currentGuess.toLowerCase() === randomPrompt.toLowerCase()){
        setWin(true)
    }
  })

  const roundLength = 19000

  useEffect(() => {
    const roundPageTimer = setTimeout(() => {
      if (!win) {
        setLives((currentLives) => currentLives - 1);
        setLose(true);
      }
    }, roundLength);
  return () => clearTimeout(roundPageTimer);
}, [])

  return (
    <div>
       <h1> {currentDrawer[0]} is Drawing...  {currentGuesser[0]} is Guessing...</h1> 
       {win && <h2> Correct Answer! Sail onto the next Round!</h2>}
       {lose && <h2> Too Slow! The crew loses a life</h2>}

      <canvas className="draw-canvas"
        ref={canvasRef}
        width={1000}
        height={800}

        onMouseDown={(e) => currentDrawer[0] === user.username && startDrawing(e)}
        onMouseMove={(e) => currentDrawer[0] === user.username && drawFE(e)}
        onMouseUp={() => currentDrawer[0] === user.username && finishDrawing()}
        onMouseOut={() => currentDrawer[0] === user.username && finishDrawing()}

        style={{
          backgroundColor: "white",
          transform: `rotate(${rotationAngle}deg)`,
          border: "7px solid lightseagreen",
        }}
      />

      <div>
         {currentDrawer[0] === user.username ? <h1 className = 'drawPrompt'>Draw a {randomPrompt}</h1> : <h1> Guess the Word ... {hiddenWord.flat()} </h1>} 
         {currentDrawer[0] === user.username && <button onClick={handleReset}>Reset</button>}
         {currentGuesser[0] === user.username && 
         <form method="post">
         <div>
           <input type="text" placeholder="SwordBoat" name="guess" ref={guess}/>
           <button onClick={handleGuess} type="submit" name="guess">Guess</button>
          </div>
          </form>}
         {saboteur[0] === user.username && (
           <button onClick={rotateCanvas}>Rotate</button>
         )}
       </div>
      </div>
  );
}



export default Canvas;