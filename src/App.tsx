
import './App.css'
import React from 'react'
import Home from './pages/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CityWeather from './pages/CityWeather/CityWeather'

const App:React.FC =()=> {
  return (
    <div className='w-screen h-screen flex flex-col justify-start items-center'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = { <Home/>}/>
          <Route path="/:lon/:lat" element={<CityWeather/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
