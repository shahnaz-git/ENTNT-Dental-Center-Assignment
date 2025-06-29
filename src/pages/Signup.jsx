// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    contact: '',
    healthInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing data
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const patients = JSON.parse(localStorage.getItem('patients')) || [];

    // Check for duplicate email
    if (users.find(u => u.email === formData.email)) {
      alert('Email already exists!');
      return;
    }

    // Create patient and user entry
    const patientId = `p${Date.now()}`;
    const newUser = {
      id: `${Date.now()}`,
      role: 'Patient',
      email: formData.email,
      password: formData.password,
      patientId
    };

    const newPatient = {
      id: patientId,
      name: formData.name,
      dob: formData.dob,
      contact: formData.contact,
      healthInfo: formData.healthInfo,
    };

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    localStorage.setItem('patients', JSON.stringify([...patients, newPatient]));

    alert('Account created successfully!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-700">Create Your Patient Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
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
          placeholder="Health Info"
          value={formData.healthInfo}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account? <a href="/login" className="text-blue-500 underline">Login</a>
        </p>
      </form>
    </div>
  );
}
