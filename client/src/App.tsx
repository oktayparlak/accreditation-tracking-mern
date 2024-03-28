import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Users from './pages/rootAdmin/Users';
import SetAdmin from './pages/rootAdmin/SetAdmin';
import Faculties from './pages/rootAdmin/Faculties';
import Departments from './pages/facultyAdmin/Departments';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/set-admin" element={<SetAdmin />} />
        <Route path="/faculties" element={<Faculties />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
