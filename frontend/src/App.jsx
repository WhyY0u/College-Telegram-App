import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import { Route, Routes} from 'react-router-dom'
import Form from './components/Form.jsx'
import './App.css'
function App() {
  const {tg} = useTelegram()
  useEffect(() => {
    tg.ready()
  }, []);
  return (
      <div className="App">
        <Routes>
          <Route index element={<Form/>}/>
        </Routes>
      </div>
  );
}

export default App;
