import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
import socket from "./Utils/Socket";

export default function ChatBox({ messages, roomName }) {
  const [inputMessage, setInputMessage] = useState("");

  const { user } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("frontend_send_message", {
      name: user.username,
      message: inputMessage,
      room: roomName,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message: </label>
        <input
          id="message"
          type="text"
          placeholder="Enter message: "
          value={inputMessage}
          onChange={(event) => setInputMessage(event.target.value)}
        />
      </form>
      <div>
        {messages.map((message, index) => {
          return <p key={message + index}>{message}</p>;
        })}
      </div>
    </>
  );
}
