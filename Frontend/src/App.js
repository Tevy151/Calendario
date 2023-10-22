import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Calendario from './pages/Calendario';
import Nosotros from './pages/Nosotros'
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
