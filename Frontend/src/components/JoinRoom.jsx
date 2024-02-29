import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useState } from "react";
import socket from "./Utils/Socket";
import { useEffect } from "react";

export default function JoinRoom({
  username,
  needsEmit,
  roomArr,
  setRoomArr,
  users,
  setUsername,
}) {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [roomInputError, setRoomInputError] = useState(false);
  const [usernameInputError, setUsernameInputError] = useState(false);
  const usernameErrorMessage = "Please enter a valid username";
  const roomErrorMessage = "Please enter a valid room name";

  let rooms;
  useEffect(() => {
    function initialRooms(data) {
      rooms = Object.keys(data);
      setRoomArr(rooms);
    }
    socket.emit("frontend_request_existing_rooms_list");

    socket.on("backend_list_existing_rooms", initialRooms);

    return () => {
      socket.off("backend_list_existing_rooms", initialRooms);
    };
  }, [rooms]);

  useEffect(() => {
    if (needsEmit) {
      socket.emit("frontend_request_existing_rooms_list");
      needsEmit = false;
    }
  }, []);

  const handleJoin = (event) => {
    if (!roomCodeInput.length || !roomArr.includes(roomCodeInput)) {
      setRoomInputError(true);
      event.preventDefault();
    } else if (!username.length) {
      setUsernameInputError(true);
      event.preventDefault();
    } else {
      setRoomInputError(false);
      user.username = username;
      event.preventDefault();
      socket.emit("frontend_join_room", {
        name: username,
        room: roomCodeInput,
      });
      navigate(`/rooms/${roomCodeInput}`);
    }
  };

  const handleRoomClick = (event) => {
    if (!username.length) {
      setUsernameInputError(true);
      event.preventDefault();
    }
    event.preventDefault();
    user.username = username;
    socket.emit("frontend_join_room", {
      name: username,
      room: event.target.innerText,
    });
    navigate(`/rooms/${event.target.innerText}`);
  };

  function handleInput(value) {
    setUsernameInputError(false);
    setUsername(value);
  }

  return (
    <main className="room-container">
      <div className="room-scroll-parent">
        <img src={"../../images/scroll2.png"} className="title-scroll" />
        <div className="room-child">
          <h1> Pick a Ship!</h1>
        </div>
      </div>
      <form className="room-button-container">
        <label htmlFor="username">Enter Username</label>
        <br />
        {usernameInputError ? (
          <p className="error-message">{usernameErrorMessage}</p>
        ) : null}
        <input
          value={username}
          onChange={(event) => handleInput(event.target.value)}
          id="username"
          type="text"
          placeholder="Username"
        />

        <label htmlFor="room-code"> Room Code: </label>
        <input
          id="room-code"
          type="text"
          placeholder="Enter the room code"
          value={roomCodeInput}
          onChange={(event) => setRoomCodeInput(event.target.value)}
        />
        {roomInputError ? (
          <p className="error-message">{roomErrorMessage}</p>
        ) : null}
        <button onClick={handleJoin}>Join Room</button>
      </form>
      <br />
      <ul>
        {roomArr !== 0 &&
          roomArr.map((room) => {
            return (
              <button onClick={handleRoomClick} key={room}>
                {room}
              </button>
            );
          })}
      </ul>
    </main>
  );
}
