import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
