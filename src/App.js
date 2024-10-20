import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import LoginPage from './components/Login';
import PrincipalDashboard from './pages/PrincipalDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TeacherStudentManagement from './pages/new';
import RegistrationForm from './components/Register';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/principal-dashboard" element={<PrincipalDashboard />} />
                    <Route path="/teacher-dashboard/:teacherId" element={<TeacherDashboard />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/studentdashboard" element={<TeacherStudentManagement />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
