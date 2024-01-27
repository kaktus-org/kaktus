import React, { useState } from "react";
import "./Signup.css";
import api from "api";

interface UserRegistrationData {
    email: string;
    password: string;
}

interface RegisterUserResponse {
  userData: JSON
}

const registerUser = async (userData: UserRegistrationData) => {
    try {
        const response: RegisterUserResponse = await api.post("/users/", false, userData);
        console.log("User registered:", response.userData);
    } catch (error) { 
        console.error("Error registering user:", error)
        // TODO: handle the error better, display error to user.
    }
}

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordRequirements = {
    minLength: password.length >= 8,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const handleRegister = async (e: any) => { 
    e.preventDefault();
    const registrationData: UserRegistrationData = {email, password};
    await registerUser(registrationData);
  }

  return (
    <div className="flex justify-center items-center md:bg-gray-200 sm:bg-white md:h-screen md:w-screen">
        <div className="bg-white p-10 rounded-xl lg:shadow-xl m-auto md:mr-0 md:ml-0 h-full md:h-auto md:w-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-hunterGreen">Create your account</h2>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full p-2 border border-gray-300 rounded mt-1"
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
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              <ul className="requirements pt-4 pl-7">
                <li className={passwordRequirements.minLength ? "valid" : "invalid"}>Be at least 8 characters in length</li>
                <li className={passwordRequirements.specialChar ? "valid" : "invalid"}>Include at least 1 special character</li>
                <li className={passwordRequirements.lowercase ? "valid" : "invalid"}>Include 1 lowercase letter</li>
                <li className={passwordRequirements.uppercase ? "valid" : "invalid"}>Include 1 uppercase letter</li>
                <li className={passwordRequirements.number ? "valid" : "invalid"}>Include 1 number</li>
              </ul>
            </div>
            <div className="flex justify-between">
              <button 
                type="submit"
                className="px-4 py-2 bg-hunterGreen text-white rounded font-bold w-full focus:outline-none focus:border-burntOrange focus:ring-2 focus:ring-burntOrange hover:bg-burntOrange transition-colors duration-300"
              >
                Create
              </button>
            </div>
            <div className="text-center text-sm text-gray-600">
              Already have an account? <a href="/login" className="text-hotOrange hover:underline">Log in</a>
            </div>
          </form>
        </div>
    </div>
  );
};

export default RegistrationForm;
