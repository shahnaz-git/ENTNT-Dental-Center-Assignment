// Enhanced Dashboard with Beautiful UI (Admin & Patient)
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { incidents, patients } = useData();

  if (user.role === 'Patient') {
    const patientIncidents = incidents.filter(i => i.patientId === user.patientId);

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Welcome Back 👋</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {patientIncidents.length > 0 ? patientIncidents.map(i => (
              <div key={i.id} className="p-6 border border-blue-200 bg-white rounded-2xl shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-blue-700">{i.title}</h2>
                <p className="text-sm text-gray-600 mb-1">{new Date(i.appointmentDate).toLocaleString()}</p>
                <p className="text-gray-800 mb-2">{i.description}</p>
                {i.treatment && <p className="text-sm font-medium text-blue-500">💊 Treatment: {i.treatment}</p>}
                {i.cost && <p className="text-sm text-green-600">💰 Cost: ₹{i.cost}</p>}
                {i.files?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700">📎 Attachments:</p>
                    <ul className="list-disc list-inside text-sm text-blue-600">
                      {i.files.map((f, idx) => (
                        <li key={idx}>
                          <a href={f.url} target="_blank" rel="noopener noreferrer" className="underline">{f.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )) : <p className="text-center text-gray-500 col-span-2">No appointments found.</p>}
          </div>
        </div>
      </div>
    );
  }

  const nextAppointments = incidents
    .filter(i => new Date(i.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const completed = incidents.filter(i => i.status === 'Completed').length;
  const pending = incidents.filter(i => !i.status || i.status === 'Pending').length;
  const revenue = incidents.reduce((acc, i) => acc + (i.cost || 0), 0);

  const topPatients = patients.map(p => ({
    ...p,
    count: incidents.filter(i => i.patientId === p.id).length
  })).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-blue-800 text-center">Admin Dashboard 📊</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-xl shadow border-t-4 border-green-400">
            <h2 className="text-sm text-gray-600">Completed Treatments</h2>
            <p className="text-3xl font-bold text-green-600">{completed}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow border-t-4 border-yellow-400">
            <h2 className="text-sm text-gray-600">Pending Treatments</h2>
            <p className="text-3xl font-bold text-yellow-600">{pending}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow border-t-4 border-blue-400">
            <h2 className="text-sm text-gray-600">Total Patients</h2>
            <p className="text-3xl font-bold text-blue-600">{patients.length}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow border-t-4 border-purple-400">
            <h2 className="text-sm text-gray-600">Revenue</h2>
            <p className="text-3xl font-bold text-purple-600">₹{revenue}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">🗓 Upcoming Appointments</h3>
            <ul className="space-y-3">
              {nextAppointments.map(a => (
                <li key={a.id} className="p-3 bg-blue-50 border rounded-lg">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-gray-500">{new Date(a.appointmentDate).toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{patients.find(p => p.id === a.patientId)?.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">🏆 Top Patients</h3>
            <ul className="space-y-2">
              {topPatients.map(p => (
                <li key={p.id} className="flex justify-between border-b pb-2 text-sm">
                  <span>{p.name}</span>
                  <span className="text-blue-500 font-semibold">{p.count} visits</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
