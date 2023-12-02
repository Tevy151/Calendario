import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Calendario from './pages/Calendario';
import Nosotros from './pages/Nosotros'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Logout from './pages/Logout'
//
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/Home" element={<Home/>} />
        <Route path="/Calendario" element={<Calendario/>} />
        <Route path="/Nosotros" element={<Nosotros/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registro/>} />
        <Route path="/logout" element={<Logout/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
