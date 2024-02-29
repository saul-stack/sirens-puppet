import React, { useRef, useEffect, useState, useContext } from "react";
import socket from "./components/Utils/Socket";
import Timer from "./components/Timer";

import { LivesContext } from "./contexts/LivesContext";
import { UserContext } from "./contexts/UserContext";

function Canvas({
  users,
  randomPrompt,
  hiddenWord,
  timerCountdownSeconds,
  isDrawer,
  isGuesser,
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingCommands, setDrawingCommands] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const [rotationAngle, setRotationAngle] = useState(0);

  const { setLives } = useContext(LivesContext);
  const { user } = useContext(UserContext);

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
    if (user.draw) {
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

      if (user.draw) {
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
    if (!user.draw) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.lineTo(data.mouseX, data.mouseY);
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

  const [win, setWin] = useState(false);

  const [lose, setLose] = useState(false);

  const guess = useRef(null);

  const handleGuess = (e) => {
    e.preventDefault();
    const currentGuess = guess.current.value;
    if (currentGuess.toLowerCase() === randomPrompt.toLowerCase()) {
      setWin(true);
    }
  };

  const roundLength = 29000;

  useEffect(() => {
    const roundPageTimer = setTimeout(() => {
      if (!win) {
        setLives((currentLives) => currentLives - 1);
        setLose(true);
      }
    }, roundLength);
    return () => clearTimeout(roundPageTimer);
  }, []);

  return (
    <div>
      <h1>
        {" "}
        {isDrawer} is Drawing... : {isGuesser} is Guessing...
      </h1>
      <Timer timerCountdownSeconds={timerCountdownSeconds} />
      {win && <h2> Correct Answer! Sail onto the next Round!</h2>}
      {lose && <h2> Too Slow! The crew loses a life</h2>}

      <canvas
        className="draw-canvas"
        ref={canvasRef}
        width={1000}
        height={800}
        onMouseDown={(e) => user.draw && startDrawing(e)}
        onMouseMove={(e) => user.draw && drawFE(e)}
        onMouseUp={() => user.draw && finishDrawing()}
        onMouseOut={() => user.draw && finishDrawing()}
        style={{
          backgroundColor: "white",
          transform: `rotate(${rotationAngle}deg)`,
          border: "7px solid lightseagreen",
        }}
      />

      <div>
        {user.draw ? (
          <h1 className="drawPrompt">Draw a {randomPrompt}</h1>
        ) : (
          <h1> Guess the Word ... {hiddenWord.flat()} </h1>
        )}
        {user.draw && <button onClick={handleReset}>Reset</button>}
        {user.guess && (
          <form method="post">
            <div>
              <input
                type="text"
                placeholder="SwordBoat"
                name="guess"
                ref={guess}
              />
              <button onClick={handleGuess} type="submit" name="guess">
                Guess
              </button>
            </div>
          </form>
        )}
        {user.isSaboteur && <button onClick={rotateCanvas}>Rotate</button>}
      </div>
    </div>
  );
}

export default Canvas;
