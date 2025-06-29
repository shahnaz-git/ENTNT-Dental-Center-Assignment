// File: src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email, password) => {
    const data = JSON.parse(localStorage.getItem('users')) || [];
    const found = data.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem('currentUser', JSON.stringify(found));
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
