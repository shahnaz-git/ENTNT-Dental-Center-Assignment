import { useData } from '../context/DataContext';
import { useState } from 'react';
import IncidentForm from '../components/Incidents/IncidentForm';

export default function Incidents() {
  const { incidents, patients, updateIncidents } = useData();
  const [editingIncident, setEditingIncident] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this incident?')) {
      updateIncidents(incidents.filter(i => i.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Appointments / Incidents</h1>
        <button
          onClick={() => {
            setEditingIncident(null);
            setShowForm(true);
          }}
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Add Incident
        </button>
      </div>
      <table className="w-full mt-4 bg-white rounded shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 text-left">Patient</th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(incident => (
            <tr key={incident.id} className="border-t">
              <td className="p-2">{patients.find(p => p.id === incident.patientId)?.name || 'N/A'}</td>
              <td className="p-2">{incident.title}</td>
              <td className="p-2">{new Date(incident.appointmentDate).toLocaleString()}</td>
              <td className="p-2">{incident.status || 'Pending'}</td>
              <td className="p-2 space-x-2 text-center">
                <button
                  onClick={() => {
                    setEditingIncident(incident);
                    setShowForm(true);
                  }}
                  className="px-2 py-1 text-sm text-white bg-yellow-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(incident.id)}
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
        <IncidentForm
          incident={editingIncident}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}