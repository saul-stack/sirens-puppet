import React, { useRef, useEffect, useState } from "react";
import socket from "./components/Utils/Socket";

function Canvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingCommands, setDrawingCommands] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0); // State for rotation angle
  const [mousePos, setMousePos] = useState({});

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
    setIsDrawing(true);
    socket.emit("frontend_canvas_mouse_click", "hey from canvas fe");
  };

  const draw = ({ nativeEvent }) => {
    console.log(isDrawing, "<---is drawing");
    // if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineTo(offsetX, offsetY);

    if (isDrawing) {
      context.stroke();
      socket.emit("frontend_canvas_mouse_move", {
        mouseX: offsetX,
        mouseY: offsetY,
      });
    }
  };

  useEffect(() => {
    function onCavasMove(data) {
      console.log(data);
      mirrorDraw(data);
    }

    function onCanvasRotate(data) {
      console.log(data);
    }
  
    socket.on("backend_canvas_rotate", onCanvasRotate);
    socket.on("backend_canvas_mouse_move", onCavasMove);

    return () => {
      socket.off("backend_canvas_mouse_move", onCavasMove);
      socket.off("backend_canvas_rotate", onCanvasRotate)
    };
  }, []);


  const mirrorDraw = (data) => {
    // if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineTo(data.mouseX, data.mouseY);
    console.log("in mirrorDraw");
    context.stroke();
  };

  const finishDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      setDrawingCommands([...drawingCommands, canvas.toDataURL()]);
      socket.emit(
        "frontend_canvas_mouse_release",
        "canvas mouse release from fe"
      );
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

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={800}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
        style={{
          backgroundColor: "white",
          transform: `rotate(${rotationAngle}deg)`,
          border: "7px solid red",
        }}
      />
      <div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={rotateCanvas}>Rotate</button>{" "}
      </div>
    </div>
  );
}

export default Canvas;