import { Routes, Route } from 'react-router-dom';
import IinPage from './pages/IinPage/IinPage';
import PincodePage from './pages/PinCodePage/PinCodePage';
import './globals.css'
import EmailPage from './pages/EmailPage/EmailPage';

function App() {

  return (
    <div className="wrapper">
        <Routes>
          <Route path={'iin-page'} element={<IinPage />} />
          <Route path={'pincode-page'} element={<PincodePage />} />
          <Route path={'email-page'} element={<EmailPage />} />
        </Routes>
    </div>
  )
}

export default App
