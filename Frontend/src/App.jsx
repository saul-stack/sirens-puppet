import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TitlePage from "./components/TitlePage";
import StoryPage from "./components/StoryPage";
import LobbyPage from "./components/LobbyPage";
import JoinRoom from "./components/JoinRoom";
import useSound from "use-sound";
import BattleShip from "../music/BattleShip.mp3";
import Mute from "./components/Mute";
import SocketFunctions from "./components/SocketFunctions";
import ChatBox from "./components/ChatBox";
import GameRoom from "./components/GameRoom";
import { UserProvider } from "./contexts/UserContext";
import ErrorHandler from "./components/ErrorHandler";
import EndGamePage from "./components/EndGamePage";
// import CanvasTestPage from './components/CanvasTestPage'

function App() {
  const [mousePos, setMousePos] = useState({});

  const [musicPlaying, setMusicPlaying] = useState(false);

  const [isMute, setIsMute] = useState(false);

  const [play, { stop }] = useSound(BattleShip, { volume: 0.05 });

  const [roomName, setRoomName] = useState(null);

  const [username, setUsername] = useState("");

  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  const playerList = [];

  let needsEmit = false;

  const playMusic = () => {
    play();
  };

  // const [roomsArr, setRoomsArr] = useState([]);
  const [roomArr, setRoomArr] = useState([]);

  const stopMusic = () => {
    stop();
  };
  return (
    <>
      <UserProvider>
        <SocketFunctions
          roomName={roomName}
          setRoomName={setRoomName}
          setUsers={setUsers}
          needsEmit={needsEmit}
          setMessages={setMessages}
          users={users}
        />

        <Mute
          isMute={isMute}
          setIsMute={setIsMute}
          playMusic={playMusic}
          musicPlaying={musicPlaying}
          stopMusic={stopMusic}
        />
        <Routes>
          <Route
            path="/"
            element={
              <TitlePage
                setIsMute={setIsMute}
                playMusic={playMusic}
                setMusicPlaying={setMusicPlaying}
              />
            }
          />
          <Route
            path="/story"
            element={
              <StoryPage
                roomName={roomName}
                username={username}
                setUsername={setUsername}
                setRoomName={setRoomName}
                needsEmit={needsEmit}
              />
            }
          />
          <Route
            path="/rooms/:room_code"
            element={
              <LobbyPage
                users={users}
                roomName={roomName}
                setUsers={setUsers}
                playerList={playerList}
              />
            }
          />
          <Route
            path="/rooms"
            element={
              <JoinRoom
                username={username}
                needsEmit={needsEmit}
                roomArr={roomArr}
                setRoomArr={setRoomArr}
                users={users}
                setUsername={setUsername}
                setRoomName={setRoomName}
              />
            }
          />
          <Route
            path="/rooms/:room_code/role"
            element={
              <GameRoom mousePos={mousePos} users={users} setUsers={setUsers} playerList={playerList}/>
            }
          />
          <Route
            path="/rooms/:room_code/play"
            element={<ChatBox messages={messages} roomName={roomName} />}
          />
          <Route path="*" element={<ErrorHandler code={404} />} />

          <Route path="/EndGamePageTest" element={<EndGamePage />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
