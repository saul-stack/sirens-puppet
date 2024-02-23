import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useState } from "react";
import socket from "../utils/Socket";

export default function JoinRoom({username}) {
    const { user } = useContext(UserContext);
  let navigate = useNavigate();
  const [roomCodeInput, setRoomCodeInput] = useState("");

  function handleClick(room_code) {

  }

  const handleJoin = (event) => {
    user.username = username
    event.preventDefault();
    socket.emit("frontend_join_room", {
      name: username,
      room: roomCodeInput,
    });
    navigate(`/rooms/${roomCodeInput}`);
  };

  return (
    <main className="room-container">
      <div className="room-scroll-parent">
        <img src={"../../images/scroll2.png"} className="title-scroll" />
        <div className="room-child">
          <h1> Pick a Ship!</h1>
        </div>
      </div>
      <form className="room-button-container">
        <label htmlFor="room-code"> Room Code: </label>
        <input
          id="room-code"
          type="text"
          placeholder="Enter the room code"
          value={roomCodeInput}
          onChange={(event) => setRoomCodeInput(event.target.value)}
        />
        <button onClick={handleJoin}>Join Room</button>
        <li>
          <button onClick={() => handleClick(room_code)}>Ship 1</button>
        </li>
        <li>
          <button onClick={() => handleClick(room_code)}>Ship 2</button>
        </li>
      </form>
    </main>
  );
}
