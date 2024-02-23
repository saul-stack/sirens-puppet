import React, { useRef, useEffect, useState } from "react";

function Canvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingCommands, setDrawingCommands] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0); // State for rotation angle

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
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const finishDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      setDrawingCommands([...drawingCommands, canvas.toDataURL()]);
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
          transform: `rotate(${rotationAngle}deg)`, // Apply rotation
          border: "7px solid red", // Add red border
        }}
      />
      <div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={rotateCanvas}>Rotate</button>{" "}
        {/* Button to trigger rotation */}
      </div>
    </div>
  );
}

export default Canvas;
