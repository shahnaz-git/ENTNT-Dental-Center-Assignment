import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from '../src/components/Shared/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Incidents from './pages/Incidents';
import Calendar from './pages/Calendar';
import Signup from './pages/Signup';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/patients"
          element={<PrivateRoute>{user?.role === 'Admin' ? <Patients /> : <Navigate to="/dashboard" />}</PrivateRoute>}
        />
        <Route
          path="/incidents"
          element={<PrivateRoute>{user?.role === 'Admin' ? <Incidents /> : <Navigate to="/dashboard" />}</PrivateRoute>}
        />
        <Route
          path="/calendar"
          element={<PrivateRoute>{user?.role === 'Admin' ? <Calendar /> : <Navigate to="/dashboard" />}</PrivateRoute>}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;