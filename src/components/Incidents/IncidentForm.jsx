import { useState } from 'react';
import { useData } from '../../context/DataContext';

export default function IncidentForm({ incident, onClose }) {
  const isEdit = Boolean(incident);
  const { incidents, updateIncidents, patients } = useData(); 

  const [formData, setFormData] = useState(
    incident || {
      id: Date.now().toString(),
      patientId: patients[0]?.id || '',
      title: '',
      description: '',
      comments: '',
      appointmentDate: '',
      cost: '',
      treatment: '',
      status: '',
      nextDate: '',
      files: []
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setFormData(prev => ({ ...prev, files: [...prev.files, ...fileData] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateIncidents(incidents.map(i => (i.id === formData.id ? formData : i)));
    } else {
      updateIncidents([...incidents, formData]);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <h2 className="mb-4 text-xl font-bold">{isEdit ? 'Edit' : 'Add'} Incident</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          <input type="datetime-local" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required className="w-full px-4 py-2 border rounded" />
          <input name="cost" placeholder="Cost" type="number" value={formData.cost} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          <input name="treatment" placeholder="Treatment" value={formData.treatment} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Status</option>
            <option value="Appointment Scheduled">Appointment Scheduled</option>
            <option value="Patient Attended">Patient Attended</option>
            <option value="Treatment Done">Treatment Done</option>
            <option value="Recovered">Recovered</option>
          </select>

          <input type="datetime-local" name="nextDate" value={formData.nextDate} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          <input type="file" multiple onChange={handleFileChange} className="w-full" />
          <div className="flex flex-wrap gap-2">
            {formData.files.map((f, idx) => (
              <div key={idx} className="p-2 bg-gray-100 rounded">
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{f.name}</a>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">{isEdit ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}