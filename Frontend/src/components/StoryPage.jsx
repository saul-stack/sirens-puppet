import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import CandleBackground from "./CandleBackground";
import socket from "./Utils/Socket";
import Timer from "./Timer";

export default function StoryPage({
  roomName,
  username,
  setUsername,
  setRoomName,
  needsEmit,
}) {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    function onJoin(data) {
      const room = data.room;
      // console.log(data.name + " has joined the room " + data.room);
      // console.log(room);
      needsEmit = true;

      setRoomName(data.room);
    }

    socket.on("join-room", onJoin);

    return () => {
      socket.off("join-room", onJoin);
    };
  }, []);

  function handleJoin() {
    socket.emit("frontend_request_existing_rooms_list");
    navigate("/rooms");
    window.location.reload();
  }

  const handleCreate = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  function handleInput(value) {
    setUsername(value);
  }
  function handleSubmit(event) {
    socket.emit("frontend_create_room", { name: username });
    user.username = username;
    event.preventDefault();
  }

  return (
    <div className="container">
      {roomName ? navigate(`/rooms/${roomName}`) : null}
      {/* {console.log(roomName, username)} */}
      <div className="parent">
        <img src={"../../images/scroll.png"} className="story-scroll" />
        <div className="child">
          <p>
            An infamous crew of fearsome pirates sail the seven seas, plundering
            and pillaging all in their wake.
            <br />
            <br />
            Unbeknownst to the rest of the crew, one of the pirates is seduced
            by The Siren, who longs to bring the ship to its watery demise.
            <br />
            <br />
            Will the crew make it to land, or will they be united with The Siren
            for all eternity?
          </p>
        </div>
      </div>
      <form>
        {isOpen && (
          <>
            <label htmlFor="username">Enter Username</label>
            <br />
            <input
              value={username}
              onChange={(event) => handleInput(event.target.value)}
              id="username"
              type="text"
              placeholder="Username"
            />
            <button onClick={handleSubmit}>Submit</button>
          </>
        )}

        <br />
        <button onClick={handleJoin}>Join Room</button>
        <button onClick={handleCreate}>Create Room</button>
      </form>
    </div>
  );
}
