import { useState, useEffect } from "react";
import socket from "../utils/Socket";
import StoryPage from "./StoryPage";
// import ConnectionManager from "./Components/ConnectionManager";
// import Form from "./Components/Form";
// import ChatRoom from "./Components/ChatRoom";

export default function SocketFunctions({ roomName, setRoomName, roomsArr }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [joined, setJoined] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [left, setLeft] = useState([]);

  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(data) {
      setMessages((prevMessage) => [
        ...prevMessage,
        `${data.name} : ${data.message}`,
      ]);

      console.log(data.message === roomName, "<<data.message === roomName ?");
      console.log(data, "<<message");
      console.log("message sent");
    }

    function onJoin(data) {
      setRoomName(data.room);
      console.log(data);
      console.log(data.room);
      setJoined(data.name + " has joined the room " + data.room);
      console.log(data.name + " has joined the room " + data.room);

      if (!users.includes(data.name)) {
        setUsers((prevUsers) => [...prevUsers, data.name]);
      }
    }

    function onLeave(data) {
      console.log(data);
      setLeft(data.name + " has left the room " + data.room);
      console.log(data.name + " has left the room " + data.room);
    }

    function onCreate(data) {
      setRoomName(data);
    }

    function exitingRooms(data) {
      console.log(data);
      //   setRoomsArr((prevRoomsArr) => [...prevRoomsArr, Object.keys(data)]);
      if (!roomsArr.includes(Object.keys(data))) {
        roomsArr.push(Object.keys(data)).flat()
      }
      console.log(roomsArr, '<<roomsArr');
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("send-message", onMessage);
    socket.on("join-room", onJoin);
    socket.on("leave-room", onLeave);
    socket.on("backend_terminal_message", onCreate);
    socket.on("backend_send_message", onMessage);
    socket.on("backend_list_existing_rooms", exitingRooms);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  //   return <StoryPage />;

  // <>
  //   <ConnectionManager />
  //   <Form messages={messages} users={users} roomName={roomName} usernameInput={usernameInput} setUsernameInput={setUsernameInput} />
  //   <button
  //     onClick={() => {
  //       setIsConnected(false);
  //     }}
  //   >
  //     Disconnect
  //   </button>
  //   <ChatRoom users={users} messages={messages} roomName={roomName} usernameInput={usernameInput} />
  // </>
}
