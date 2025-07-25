import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import AdminDashboard from './components/AdminDashboard';

export type UserRole = 'student' | 'faculty' | 'admin';
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Routes>
      <Route path="/" element={
        currentUser ? (
          currentUser.role === 'student' ? <StudentDashboard user={currentUser} onLogout={handleLogout} /> :
          currentUser.role === 'faculty' ? <FacultyDashboard user={currentUser} onLogout={handleLogout} /> :
          currentUser.role === 'admin' ? <AdminDashboard user={currentUser} onLogout={handleLogout} /> :
          <LoginPage onLogin={handleLogin} />
        ) : <LoginPage onLogin={handleLogin} />
      } />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;