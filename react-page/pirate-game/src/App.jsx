import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TitlePage from './components/TitlePage'
import StoryPage from './components/StoryPage'
import LobbyPage from './components/LobbyPage'

function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<TitlePage/>}/>
      <Route path="/story" element={<StoryPage/>}/>
      <Route path="/rooms/:room_code" element={<LobbyPage/>}/>
     </Routes>
    </>
  )
}

export default App
