import { useData } from '../../context/DataContext';
import { useMemo } from 'react';

export default function AdminDashboard() {
  const { incidents, patients } = useData();

  const stats = useMemo(() => {
    const upcoming = incidents.filter(i => new Date(i.appointmentDate) > new Date());
    const revenue = incidents.reduce((sum, i) => sum + (i.cost || 0), 0);
    const completed = incidents.filter(i => i.status === 'Completed').length;
    const pending = incidents.filter(i => i.status !== 'Completed').length;

    return {
      nextAppointments: upcoming.slice(0, 10),
      revenue,
      completed,
      pending,
      topPatients: [...new Set(incidents.map(i => i.patientId))].slice(0, 3).map(pid =>
        patients.find(p => p.id === pid)
      )
    };
  }, [incidents, patients]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white rounded shadow">Revenue: ₹{stats.revenue}</div>
        <div className="p-4 bg-white rounded shadow">Completed: {stats.completed}</div>
        <div className="p-4 bg-white rounded shadow">Pending: {stats.pending}</div>
        <div className="p-4 bg-white rounded shadow">Total Patients: {patients.length}</div>
      </div>
      <div className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">Next 10 Appointments</h2>
        <ul className="space-y-2">
          {stats.nextAppointments.map(apt => (
            <li key={apt.id} className="p-2 bg-blue-50 rounded">
              <strong>{apt.title}</strong> — {new Date(apt.appointmentDate).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}