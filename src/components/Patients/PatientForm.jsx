import { useState } from 'react';
import { useData } from '../../context/DataContext';

export default function PatientForm({ patient, onClose }) {
  const isEdit = Boolean(patient);
  const { patients, updatePatients } = useData();

  const [formData, setFormData] = useState(
    patient || { id: Date.now().toString(), name: '', dob: '', contact: '', healthInfo: '' }
  );

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updatePatients(patients.map(p => (p.id === formData.id ? formData : p)));
    } else {
      updatePatients([...patients, formData]);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
        <h2 className="mb-4 text-xl font-bold">{isEdit ? 'Edit' : 'Add'} Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="contact"
            placeholder="Contact Info"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            name="healthInfo"
            placeholder="Health Information"
            value={formData.healthInfo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {isEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}