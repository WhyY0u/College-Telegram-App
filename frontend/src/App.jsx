import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './globals.css'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup';
import MainPageUser from './pages/MainPageUser/MainPageUser';
import TicketCreationPageUser from './pages/TicketCreationPageUser/TicketCreationPageUser';
import TicketWatchPageUser from './pages/TicketWatchPageUser/TicketWatchPageUser';

function App() {

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="main-page-user" element={<MainPageUser />} />
        <Route path="ticket-creation-page-user" element={<TicketCreationPageUser />} />
        <Route path="ticket-watch-page-user/:id" element={<TicketWatchPageUser />} />
      </Routes>
    </div>
  )
}

export default App
