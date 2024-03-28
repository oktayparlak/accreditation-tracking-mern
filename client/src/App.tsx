import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Users from './pages/rootAdmin/Users';
import SetAdmin from './pages/SetAdmin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/set-admin" element={<SetAdmin />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
