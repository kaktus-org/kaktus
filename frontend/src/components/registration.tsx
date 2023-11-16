import { api } from "api";
import React, { useState } from "react";

interface UserRegistrationData {
    email: string;
    password: string;
}

const registerUser = async (userData: UserRegistrationData) => {
    try {
        const response = await api.post("/users/", userData);
        console.log("User registered:", response.data);
    } catch (error) { 
        console.error("Error registering user:", error)
        // TODO: handle the error better, display error to user.
    }
}

const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await registerUser({ email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Register</button>
        </form>
    )
};

export default RegistrationForm;
