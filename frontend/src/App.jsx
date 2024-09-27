import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import { Route, Routes} from 'react-router-dom'
import './App.css'
import Main from "./pages/Main/Main.jsx";
function App() {
  const {tg} = useTelegram()
  useEffect(() => {
    tg.ready()
  }, []);
  return (
      <div className="App">
        <Routes>
          <Route index element={<Main/>}/>
        </Routes>
      </div>
  );
}

export default App;
