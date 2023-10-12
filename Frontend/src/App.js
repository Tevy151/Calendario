import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Etapa1 from './pages/Etapa1';
import Etapa2 from './pages/Etapa2';
import Etapa3 from './pages/Etapa3';
import NotaC from './pages/NotaC';
import Memorice from'./pages/Memorice';
import Llave  from './pages/Llave';
import Metronomo from './pages/Pulso';
import Altura2 from './pages/Altura2';
import Pentagrama from './pages/Pentagrama';
import Compositor from './pages/Compositor';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/Home" element={<Home/>} />
        <Route path="/Etapa1" element={<Etapa1/>} />
        <Route path="/Etapa2" element={<Etapa2/>} />
        <Route path="/Etapa3" element={<Etapa3/>} />
        <Route path="/NotaC" element={<NotaC/>} />
        <Route path="/Memorice" element={<Memorice/>} />
        <Route path="/Llave" element={<Llave/>} />
        <Route path="/Metronomo" element={<Metronomo/>} />
        <Route path="/Altura2" element={<Altura2/>} />
        <Route path="/Pentagrama" element={<Pentagrama/>} />
        <Route path="/Compositor" element={<Compositor/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
