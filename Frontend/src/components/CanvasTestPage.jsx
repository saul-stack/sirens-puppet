import Canvas from "../Canvas";

function CanvasTestPage({mousePos}) {
  return (
    <div>
      <h1 className="canvas">
        "Ready, set, doodle! Let's see if your masterpiece speaks louder than
        words
      </h1>
      <Canvas />
    </div>
  );
}

export default CanvasTestPage;
