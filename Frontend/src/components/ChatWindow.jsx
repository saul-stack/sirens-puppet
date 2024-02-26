import React, { useState, useEffect, useRef } from "react";

import "../App.css";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const chatMessageRef = useRef(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const currentTime = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
      });
      const newMessage = { text: inputText, sender: "Me", time: currentTime };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  useEffect(() => {
    chatMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="chat-window-container"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="chat-window" style={{ width: "100%", height: "100%" }}>
        <div className="chat-message-container">
          {messages.map((message, index) => (
            <div key={index} className="chat-message">
              <div className="chat-message-text">
                <span className="chat-message-sender">{message.sender}: </span>
                {message.text}
                <span className="chat-message-details">{message.time}</span>
              </div>
            </div>
          ))}
          <div ref={chatMessageRef}></div>
        </div>
        <div className="chat-input-container">
          <input
            style={{ width: "100%" }}
            className="chat-input-text"
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button className="chat-send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
