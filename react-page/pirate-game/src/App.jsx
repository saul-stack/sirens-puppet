import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TitlePage from './components/TitlePage'
import StoryPage from './components/StoryPage'
import JoinRoom from './components/JoinRoom'
import Sound from 'react-sound'
import Mute from './components/Mute'


function App() {

  const [musicPlaying, setMusicPlaying] = useState(false)

  const playMusic = () => {
    setMusicPlaying(true)
  }
  
  return (
    <>
    <Sound url={'../music/BattleShip.mp3'}
    playStatus={musicPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
    autoLoad={true}
    loop={true} />
     <Mute musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} />
     <Routes>
      <Route path="/" element={<TitlePage playMusic={playMusic}/>}/>
      <Route path="/story" element={<StoryPage/>}/>
      <Route path="/rooms" element={<JoinRoom/>}/>
     </Routes>
    </>
  )
}

export default App
