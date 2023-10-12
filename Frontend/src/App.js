import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/Home" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
