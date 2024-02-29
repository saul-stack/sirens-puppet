import { useState, useEffect } from "react";
import socket from "./Utils/Socket";
import StoryPage from "./StoryPage";
import { useNavigate, useParams } from "react-router-dom";

export default function SocketFunctions({
  roomName,
  setRoomName,
  setUsers,
  needsEmit,
  setMessages,
  users,
}) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [left, setLeft] = useState([]);
  const [usernameInput, setUsernameInput] = useState("");
  const navigate = useNavigate();
  const { room_code } = useParams();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onLeave(data) {
      setLeft(data.name + " has left the room " + data.room);
      socket.emit("frontend_send_users", { room: roomName });
    }

    function onCreate(data) {
      setRoomName(data);
    }

    function onUsersList(data) {
      setUsers([data]);
    }

    function onMessage(data) {
      if (data.room === roomName) {
        setMessages((prevMessage) => [
          ...prevMessage,
          `${data.name} : ${data.message}`,
        ]);
      }
    }

    function onCanvasClick(data) {
      console.log(data);
    }

    function onCanvasRelease(data) {
      console.log(data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.on("join-room", onJoin);
    socket.on("leave-room", onLeave);
    socket.on("backend_terminal_message", onCreate);
    socket.on("backend_send_users", onUsersList);
    socket.on("send-message", onMessage);
    socket.on("backend_send_message", onMessage);
    socket.on("backend_canvas_mouse_click", onCanvasClick);
    // socket.on("backend_canvas_mouse_move", onCavasMove)
    socket.on("backend_canvas_mouse_release", onCanvasRelease);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // socket.off("join-room", onJoin);
      socket.off("leave-room", onLeave);
      socket.off("backend_terminal_message", onCreate);
      socket.off("send-message", onMessage);
      socket.off("backend_send_message", onMessage);
    };
  }, []);
}
