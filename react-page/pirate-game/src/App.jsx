import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TitlePage from './components/TitlePage'
import StoryPage from './components/StoryPage'
import JoinRoom from './components/JoinRoom'
import Candles from './components/Candles'

function App() {
  

  return (
    <>
    <Candles />
     <Routes>
      <Route path="/" element={<TitlePage/>}/>
      <Route path="/story" element={<StoryPage/>}/>
      <Route path="/rooms" element={<JoinRoom/>}/>
     </Routes>
    </>
  )
}

export default App
