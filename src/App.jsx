import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './auth/ProtectedRoute'
import Login from './auth/Login'
import StudentDashboard from './pages/user/StudentDashboard'
import {ToastContainer} from 'react-toastify'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />

        <Route path='/admin-dashboard' element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path='/user-dashboard' element={
          <ProtectedRoute allowedRole="USER">
            <StudentDashboard />
          </ProtectedRoute>
        } />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App;