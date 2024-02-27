import Canvas from "../Canvas";

function CanvasTestPage({mousePos, users, setUsers}) {
  return (
    <div>
      <h1 className="canvas">
        "Ready, set, doodle! Let's see if your masterpiece speaks louder than
        words
      </h1>
      <Canvas users={users} setUsers={setUsers}/>
    </div>
  );
}

export default CanvasTestPage;
