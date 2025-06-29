import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';
import Incidents from '../pages/Incidents';
import Calendar from '../pages/Calendar';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
};

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/patients" element={<PrivateRoute roles={["Admin"]}><Patients /></PrivateRoute>} />
        <Route path="/incidents" element={<PrivateRoute roles={["Admin"]}><Incidents /></PrivateRoute>} />
        <Route path="/calendar" element={<PrivateRoute roles={["Admin"]}><Calendar /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}