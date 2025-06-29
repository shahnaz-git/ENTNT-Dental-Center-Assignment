// src/context/DataContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    const storedIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    setPatients(storedPatients);
    setIncidents(storedIncidents);
  }, []);

  const updatePatients = (newData) => {
    setPatients(newData);
    localStorage.setItem('patients', JSON.stringify(newData));
  };

  const updateIncidents = (newData) => {
    setIncidents(newData);
    localStorage.setItem('incidents', JSON.stringify(newData));
  };

  return (
    <DataContext.Provider value={{ patients, incidents, updatePatients, updateIncidents }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);