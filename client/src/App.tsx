import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Users from './pages/rootAdmin/Users';
import SetAdmin from './pages/rootAdmin/SetAdmin';
import Faculties from './pages/rootAdmin/Faculties';
import Departments from './pages/facultyAdmin/Departments';
import SetFacultyAdmin from './pages/rootAdmin/SetFacultyAdmin';
import AuthGuard from './utils/components/AuthGuard';
import SetDepartmentAdmin from './pages/facultyAdmin/SetDepartmentAdmin';
import Courses from './pages/departmentAdmin/Courses';
import SetCourseAdmin from './pages/departmentAdmin/SetCourseAdmin';
import LearningMaterials from './pages/courseAdmin/LearningMaterials';
import MeasuringTools from './pages/courseAdmin/MeasuringTools';
import SetCourseSupervisor from './pages/courseAdmin/SetCourseSupervisor';
import { Applications } from './pages/courseSupervisor/Applications';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <AuthGuard>
              <Users />
            </AuthGuard>
          }
        />
        <Route
          path="/set-admin"
          element={
            <AuthGuard>
              <SetAdmin />
            </AuthGuard>
          }
        />
        <Route
          path="/faculties"
          element={
            <AuthGuard>
              <Faculties />
            </AuthGuard>
          }
        />
        <Route
          path="/set-faculty-admin"
          element={
            <AuthGuard>
              <SetFacultyAdmin />
            </AuthGuard>
          }
        />
        <Route
          path="/departments"
          element={
            <AuthGuard>
              <Departments />
            </AuthGuard>
          }
        />
        <Route
          path="/set-department-admin"
          element={
            <AuthGuard>
              <SetDepartmentAdmin />
            </AuthGuard>
          }
        />
        <Route
          path="/courses"
          element={
            <AuthGuard>
              <Courses />
            </AuthGuard>
          }
        />
        <Route
          path="/set-course-admin"
          element={
            <AuthGuard>
              <SetCourseAdmin />
            </AuthGuard>
          }
        />
        <Route
          path="/learning-materials"
          element={
            <AuthGuard>
              <LearningMaterials />
            </AuthGuard>
          }
        />
        <Route
          path="/measuring-tools"
          element={
            <AuthGuard>
              <MeasuringTools />
            </AuthGuard>
          }
        />
        <Route
          path="/set-course-supervisor"
          element={
            <AuthGuard>
              <SetCourseSupervisor />
            </AuthGuard>
          }
        />
        <Route
          path="/applications"
          element={
            <AuthGuard>
              <Applications />
            </AuthGuard>
          }
        />
        <Route
          path="*"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
