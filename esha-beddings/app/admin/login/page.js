"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    adminUsername: "",
    adminPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  // Access the credentials from the environment variables
  const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle login form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered username and password match the stored ones in the .env file
    if (formData.adminUsername === adminUsername && formData.adminPassword === adminPassword) {
      sessionStorage.setItem("adminLoggedIn", "true"); // Set the login flag in sessionStorage
      router.push("/admin"); // Redirect to the admin page
    } else {
      setError("Invalid username or password"); // Show error if credentials are incorrect
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="py-2 font-bold">Admin Username:</h1>
        <input
          type="text"
          name="adminUsername"
          placeholder="Admin Username"
          className="w-full border p-2 mb-4 rounded-lg"
          value={formData.adminUsername}
          onChange={handleChange}
          required
        />
        <h1 className="py-2 font-bold">Admin Password:</h1>
        <input
          type="password"
          name="adminPassword"
          placeholder="Admin Password"
          className="w-full border p-2 mb-4 rounded-lg"
          value={formData.adminPassword}
          onChange={handleChange}
          required
        />
        <div className="flex justify-center items-center mb-4">
        <button type="submit" className="w-auto  bg-black text-white py-2 px-6 rounded-lg">
          Login
        </button>
        </div>
      </form>
    </div>
  );
}
