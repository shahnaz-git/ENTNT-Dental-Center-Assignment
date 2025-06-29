import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="text-xl font-bold text-blue-600">
        ENTNT Dental
      </div>
      {user && (
        <div className="flex items-center gap-4 text-sm">
          {user.role === 'Admin' && (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <Link to="/patients" className="hover:text-blue-600">Patients</Link>
              <Link to="/incidents" className="hover:text-blue-600">Incidents</Link>
              <Link to="/calendar" className="hover:text-blue-600">Calendar</Link>
            </>
          )}
          {user.role === 'Patient' && (
            <Link to="/dashboard" className="hover:text-blue-600">My Records</Link>
          )}
          <button onClick={handleLogout} className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}