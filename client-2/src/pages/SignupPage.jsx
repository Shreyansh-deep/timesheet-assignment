import { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "associate",
  });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Signup successful! Now log in.");
      navigate("/");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded-md w-full p-2 mb-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md w-full p-2 mb-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md w-full p-2 mb-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="border border-gray-300 rounded-md w-full p-2 mb-4"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="associate">Associate</option>
          <option value="manager">Manager</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign up
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
