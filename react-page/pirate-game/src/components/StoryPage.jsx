import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function StoryPage() {
  const {user} = useContext(UserContext)
  let navigate = useNavigate();
  const [username, setUsername] = useState("");

  function handleJoin() {
    user.username = username
    navigate("/rooms");
  }
  function handleCreate() {
    user.username = username
    navigate("/newRoom");
  }
  function handleInput(value) {
    setUsername(value);
  }

  return (
    <>
      <div className="container">
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
      <center>
        <form>
          <label htmlFor="username">Enter Username</label>
          <br />
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
      </center>
      </div>
    </>
  );
}
