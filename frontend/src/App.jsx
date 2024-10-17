import { Suspense, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './globals.css'
import ProtectedRoutes from './protected/Protected'
import axios from 'axios';
import ProtectedByRole from './protected/ProtectedByRole';
import BouncingBallsAsync from './components/BouncingBalls/BoundcingBallsAsync/BouncingBallsAsync';
import SignupAsync from './pages/Signup/SignupAsync/SignupAsync';
import SigninAsync from './pages/Signin/SigninAsync/SigninAsync';
import MainPageUserAsync from './pages/MainPageUser/MainPageUserAsync/MainPageUserAsync';
import TicketCreationPageUserAsync from './pages/TicketCreationPageUser/TicketCreationPageUserAsync/TicketCreationPageUserAsync';
import TicketWatchPageUserAsync from './pages/TicketWatchPageUser/TicketWatchPageUserAsync/TicketWatchPageUserAsync';
import TicketWatchPageAdminAsync from './pages/TicketWatchPageAdmin/TicketWatchPageAdminAsync/TicketWatchPageAdminAsync';
import MainPageAdminAsync from './pages/MainPageAdmin/MainPageAdminAsync/MainPageAdminAsync';
import NewsCreationPageAsync from './pages/NewsCreationPage/NewsCreationPageAsync/NewsCreationPageAsync';
import NewsPageUserAsync from './pages/NewsPageUser/NewsPageUserAsync/NewsPageUserAsync';
import ProfilePageAsync from './pages/ProfilePage/ProfilePageAsync/ProfilePageAsync';
import Loader from './components/Loader/Loader';


const backendServer = import.meta.env.VITE_BACKEND_SERVER || 'localhost:3000'

function App() {
  const token = localStorage.getItem('token');
  const [isAuth, setAuth] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    WebApp.ready();

    WebApp.setTitle('My Mini App');

    WebApp.expand();
  if(isAuth != undefined) {
  axios.post(`${backendServer}/auth/checktoken`, 
    {
      headers: { 
          'Content-Type': 'application/json', 
          'authorization': `Bearer ${localStorage.getItem('token')}`
      },
  },
  ).then(setAuth(true)).catch(error => {
    setAuth(false);
  });
  } else {
    setAuth(false); 
  }
 },[]);
  return (
    <Suspense fallback={<Loader />}>
      <div className="wrapper">
        <Routes>
        <Route element={<ProtectedByRole isAuth={!isAuth}/>}>
          <Route path="/" element={<SigninAsync />} />
          <Route path="signup" element={<SignupAsync />} />
        </Route>
      <Route element={<ProtectedRoutes isAuth={isAuth}/>}>
      
        <Route element={<ProtectedByRole isRole={'Student'}/>}>
            <Route path="main-page-user" element={<MainPageUserAsync />} />
            <Route path="ticket-creation-page-user" element={<TicketCreationPageUserAsync />} />
            <Route path="ticket-watch-page-user/:id" element={<TicketWatchPageUserAsync />} />
        </Route>

        <Route element={<ProtectedByRole isRole={'Confidant'}/>}>
            <Route path="ticket-watch-page-admin/:id" element={<TicketWatchPageAdminAsync />} />
            <Route path="main-page-admin" element={<MainPageAdminAsync />} />
            <Route path="news-creation-page" element={<NewsCreationPageAsync />} />
        </Route>

        <Route path="news-page-user" element={<NewsPageUserAsync />} />
        <Route path="profile-page" element={<ProfilePageAsync />} />
      </Route>

      </Routes>
      <BouncingBallsAsync />
      </div>
    </Suspense>
  )
}

export default App
