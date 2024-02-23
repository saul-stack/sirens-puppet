
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
import CanvasTestPage from './components/CanvasTestPage'


function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);

  const [isMute, setIsMute] = useState(false);

  const [play, { stop }] = useSound(BattleShip, { volume: 0.05 });

  const playMusic = () => {
      play();
  };

  const stopMusic = () => {
    stop()
  }
  
  return (
    <>

      <CandleBackground />
      <Mute
        isMute={isMute}
        setIsMute={setIsMute}
        playMusic={playMusic}
        musicPlaying={musicPlaying} 
        stopMusic={stopMusic}
      />
      <Routes>
        <Route path="/" element={<TitlePage isMute={isMute} playMusic={playMusic} musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying}/>} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/rooms/:room_code" element={<LobbyPage />} />
        <Route path="/rooms" element={<JoinRoom />} />
        <Route path="/rooms/:room_code/play" element={<PlayerDesignation />} />
        <Route path="/canvas" element={<CanvasTestPage/>}/>
      </Routes>
    </>
  );
}

export default App;
