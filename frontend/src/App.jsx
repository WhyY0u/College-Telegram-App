import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './globals.css'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup';
import MainPageUser from './pages/MainPageUser/MainPageUser';
import TicketCreationPageUser from './pages/TicketCreationPageUser/TicketCreationPageUser';

function App() {

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="main-page-user" element={<MainPageUser />} />
        <Route path="ticker-creation-page-user" element={<TicketCreationPageUser />} />
      </Routes>
    </div>
  )
}

export default App
