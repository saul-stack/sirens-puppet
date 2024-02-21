import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function StoryPage() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");

  function handleJoin() {
    navigate("/rooms");
  }
  function handleCreate() {
    navigate("/newRoom");
  }
  function handleInput(value) {
    setUsername(value);
  }

  return (
    <>
      <div className="parent">
        <img src={"../../images/scroll.png"} className="story-scroll" />
        <div className="child">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
            incidunt, numquam facilis odit cum nihil eum nulla, aliquam
            exercitationem error nisi fuga nobis possimus facere rerum, veniam
            sequi soluta deleniti.
          </p>
        </div>
      </div>
      <form>
        <label htmlFor="username">Enter Username</label>
        <input
          value={username}
          onChange={(event) => handleInput(event.target.value)}
          id="username"
          type="text"
          placeholder="Username"
        />
        <br />
        <button onClick={handleJoin}>Join Room</button>
        <button onClick={handleCreate}>Create Room</button>
      </form>
    </>
  );
}
