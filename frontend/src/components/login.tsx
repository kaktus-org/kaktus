import React, { useState } from "react";
import { api } from "api/index";
import qs from "qs";

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
            const response = await api.post("/users/login", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            console.log(response)
            const token = response.data.access_token;
            localStorage.setItem('jwtToken', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token for future requests
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
