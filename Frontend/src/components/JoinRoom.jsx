import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useState } from "react";
import socket from "./Utils/Socket";
import { useEffect } from "react";

export default function JoinRoom({username, needsEmit, roomArr, setRoomArr, users, setUsername}) {
    const { user } = useContext(UserContext);
  let navigate = useNavigate();
  const [roomCodeInput, setRoomCodeInput] = useState("");
  
  let rooms;
  useEffect(() => {
    function initialRooms(data) {
      console.log(data);
      rooms = Object.keys(data);
      setRoomArr(rooms);
      console.log(rooms, "<<Initial Rooms List");
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
    user.username = username
    event.preventDefault();
    socket.emit("frontend_join_room", {
      name: username,
      room: roomCodeInput,
    });
    navigate(`/rooms/${roomCodeInput}`);
  };

  const handleRoomClick = (event) => {
    event.preventDefault();
    user.username = username
    // console.log(usernameInput);
    console.log(event.target.value);
    console.log("clicked");
    socket.emit("frontend_join_room", {
      name: username,
      room: event.target.innerText,
    });
    navigate(`/rooms/${event.target.innerText}`)
  };

  function handleInput(value) {
    setUsername(value);
  }

  return (
    <main className="room-container">
      {console.log(users)}
      <div className="room-scroll-parent">
        <img src={"../../images/scroll2.png"} className="title-scroll" />
        <div className="room-child">
          <h1> Pick a Ship!</h1>
        </div>
      </div>
      <form className="room-button-container">

      <label htmlFor="username">Enter Username</label>
        <br />
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
        <button onClick={handleJoin}>Join Room</button>
        <ul>
        {roomArr !== 0 &&
          roomArr.map((room) => {
            console.log(room, "<<room");
            return (
              <button onClick={handleRoomClick} key={room}>
                {room}
              </button>
            );
          })}
      </ul>
      </form>
    </main>
  );
}
