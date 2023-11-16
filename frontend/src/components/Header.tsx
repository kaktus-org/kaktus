import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "api";

const Header = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <header className="bg-[#476A6F] flex justify-between items-center p-4 text-white">
          <img alt="Logo" className="h-10" />
          <nav>
            <Link to="/" className="text-[#FBFFF1] hover:text-[#E2E2E2] mx-3 font-bold transition-colors">
              Home
            </Link>
          </nav>
          <button 
            className="bg-[#519E8A] text-[#FBFFF1] px-5 py-2 rounded hover:bg-[#519E8A]/80 transition-colors"
            onClick={() => {/* handle login/signup click */}}>
            Log in / Register
          </button>
        </header>
      );
};

export default Header;
