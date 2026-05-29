import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/user/StudentDashboard';

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/student-dashboard' element={<StudentDashboard />} />
      </Routes>

    </>
  )
}

export default App;