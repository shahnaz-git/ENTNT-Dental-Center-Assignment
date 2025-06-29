import { useData } from '../context/DataContext';
import { useState } from 'react';
import PatientForm from '../components/Patients/PatientForm';

export default function Patients() {
  const { patients, updatePatients } = useData();
  const [editingPatient, setEditingPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id) => {
  // Just patient deletion
  // if (confirm('Are you sure you want to delete this patient?')) {
  //     updatePatients(patients.filter(p => p.id !== id));
  //   }

    if (confirm('Are you sure you want to delete this patient and all their data?')) {
      const updatedPatients = patients.filter(p => p.id !== id);
      updatePatients(updatedPatients);
      // If you want to delete the user account too - uncomment this
      // const users = JSON.parse(localStorage.getItem('users')) || [];
      // const updatedUsers = users.filter(u => u.patientId !== id);
      // localStorage.setItem('users', JSON.stringify(updatedUsers));

      const incidents = JSON.parse(localStorage.getItem('incidents')) || [];
      const updatedIncidents = incidents.filter(i => i.patientId !== id);
      localStorage.setItem('incidents', JSON.stringify(updatedIncidents));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Patients</h1>
        <button
          onClick={() => {
            setEditingPatient(null);
            setShowForm(true);
          }}
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Add Patient
        </button>
      </div>
      <table className="w-full mt-4 bg-white rounded shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">DOB</th>
            <th className="p-2 text-left">Contact</th>
            <th className="p-2 text-left">Health Info</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id} className="border-t">
              <td className="p-2">{patient.name}</td>
              <td className="p-2">{patient.dob}</td>
              <td className="p-2">{patient.contact}</td>
              <td className="p-2">{patient.healthInfo}</td>
              <td className="p-2 space-x-2 text-center">
                <button
                  onClick={() => {
                    setEditingPatient(patient);
                    setShowForm(true);
                  }}
                  className="px-2 py-1 text-sm text-white bg-yellow-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="px-2 py-1 text-sm text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <PatientForm
          patient={editingPatient}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}