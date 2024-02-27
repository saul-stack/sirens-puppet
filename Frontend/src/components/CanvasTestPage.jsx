import Canvas from "../Canvas";

function CanvasTestPage({mousePos, users, setUsers}) {
  return (
    <div className="canvas-container">
      <h1 className="canvas-title">
        "Ready, set, doodle! Let's see if your masterpiece speaks louder than
        words
      </h1>
      <Canvas users={users} setUsers={setUsers}/>
    </div>
  );
}

export default CanvasTestPage;
