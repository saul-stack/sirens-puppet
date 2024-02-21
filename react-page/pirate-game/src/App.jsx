import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TitlePage from './components/TitlePage'
import StoryPage from './components/StoryPage'

function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<TitlePage/>}/>
      <Route path="/story" element={<StoryPage/>}/>
     </Routes>
    </>
  )
}

export default App
