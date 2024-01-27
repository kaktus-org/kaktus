import { useState } from "react";
import api from "api";
import qs from "qs";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const formData = qs.stringify({
      username: username,
      password: password,
      grant_type: "",
      scope: "",
      client_id: "",
      client_secret: "",
    });

    try {
      await api.post("/users/login", formData);
      localStorage.setItem('isLoggedIn', "true");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-hunterGreen">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <a href="/forgot-password" className="text-sm text-hunterGreen hover:text-gold">Forgot password?</a>
            <button
              type="submit"
              className="px-4 py-2 bg-hunterGreen text-white font-bold rounded focus:outline-none focus:border-burntOrange focus:ring-2 focus:ring-burntOrange hover:bg-burntOrange transition-colors duration-300"
            >
              Log in
            </button>
          </div>
          <div className="text-center text-sm text-gray-600">
            Don't have an account? <a href="/register" className="text-hunterGreen hover:text-gold">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
