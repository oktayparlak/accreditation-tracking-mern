import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Users from './pages/Users';
import CreateFaculty from './pages/CreateFaculty';
import SetFacultyAdmin from './pages/SetFacultyAdmin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<Users />} />
        <Route path="/create-faculty" element={<CreateFaculty />} />
        <Route path="/set-faculty-admin" element={<SetFacultyAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
