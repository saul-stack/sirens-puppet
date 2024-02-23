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
import CandleBackground from "./components/CandleBackground";
import PlayerDesignation from "./components/PlayerDesignation"

function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);

  const [isMute, setIsMute] = useState(true);

  const [play, { stop }] = useSound(BattleShip, { volume: 0.05 });

  const playMusic = () => {
    if (musicPlaying && !isMute) {
      play();
    } else {
      stop();
    }
  };

  return (
    <>
      <CandleBackground />
      <Mute
        isMute={isMute}
        setIsMute={setIsMute}
        playMusic={playMusic}
        setMusicPlaying={setMusicPlaying}
      />
      <Routes>
        <Route path="/" element={<TitlePage setIsMute={setIsMute} playMusic={playMusic} setMusicPlaying={setMusicPlaying} />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/rooms/:room_code" element={<LobbyPage />} />
        <Route path="/rooms" element={<JoinRoom />} />
        <Route path="/testing" element={<PlayerDesignation />} />
      </Routes>
    </>
  );
}

export default App;
