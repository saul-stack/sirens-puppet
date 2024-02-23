import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TitlePage from './components/TitlePage'
import StoryPage from './components/StoryPage'
import JoinRoom from './components/JoinRoom'
import useSound from 'use-sound'
import BattleShip from '../music/BattleShip.mp3'
import Mute from './components/Mute'


function App() {

  const [musicPlaying, setMusicPlaying] = useState(false)

  const[isMute, setIsMute] = useState(false)

  const [play, { stop }] = useSound(BattleShip, {volume: 0.05})

  const playMusic = () => {
    if (!musicPlaying && !isMute) {
      play();
    } else {
      stop();
    }
  }
  
  return (
    <>
     <Mute isMute={isMute} setIsMute={setIsMute} stop={stop} playMusic={playMusic} setMusicPlaying={setMusicPlaying}/>
     <Routes>
      <Route path="/" element={<TitlePage playMusic={playMusic}/>}/>
      <Route path="/story" element={<StoryPage/>}/>
      <Route path="/rooms" element={<JoinRoom/>}/>
     </Routes>
    </>
  )
}

export default App
