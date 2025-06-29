import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function PatientDashboard() {
  const { user } = useAuth();
  const { incidents } = useData();
  const myAppointments = incidents.filter(i => i.patientId === user.patientId);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome, Patient</h1>
      <h2 className="text-lg font-semibold">Your Appointments</h2>
      <ul className="space-y-2">
        {myAppointments.map(apt => (
          <li key={apt.id} className="p-2 bg-green-50 rounded">
            <strong>{apt.title}</strong> — {new Date(apt.appointmentDate).toLocaleString()} — ₹{apt.cost}
          </li>
        ))}
      </ul>
    </div>
  );
}
