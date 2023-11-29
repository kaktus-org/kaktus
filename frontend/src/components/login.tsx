import React, { useState } from "react";
import api from "api";
import qs from "qs";

interface AccessToken {
  data: {
    access_token: string
  }
}

const LoginForm = () => {
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
      const response: AccessToken = await api.post("/users/login", false, formData);
      console.log(response)
      const token = response.data.access_token;
      localStorage.setItem('jwtToken', token);
      console.log("success");
      console.log(token)
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
