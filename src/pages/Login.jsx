// File: src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) navigate("/dashboard");
    else setError("Invalid email or password");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Dental Center Login
        </h1>
        {error && (
          <div className="p-2 text-sm text-red-600 bg-red-100 border border-red-200 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
