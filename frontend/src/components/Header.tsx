import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { logout } from "features/auth/authSlice";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn, userEmail } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-hunterGreen text-white font-bold">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6 relative">

        {/* Hamburger menu icon for small screens */}
        <div className="md:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </div>

        <div className="text-2xl md:mx-0 md:relative flex-grow md:flex-grow-0">
          <span className="hidden md:inline"><a href="/">Kaktus</a></span>
          <span className="md:hidden absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"><a href="/">Kaktus</a></span>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-gold transition-colors duration-300">
            <a href="/">Home</a>
          </li>
          <li className="hover:text-gold transition-colors duration-300">
            <a href="/services">Services</a>
          </li>
          <li className="hover:text-gold transition-colors duration-300">
            <a href="/beta">Beta</a>
          </li>
        </ul>

        <div>
          {!isLoggedIn ? (
            <ul className="hidden md:flex space-x-6">
              <li className="text-white hover:opacity-100">
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register" className="bg-burntOrange px-4 py-1 rounded hover:bg-lightBlue transition-colors duration-300">Register</a>
              </li>
            </ul>
          ) : (
            <div>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-white hover:bg-hunterGreen px-4 py-2 rounded-t focus:outline-none"
                id="user-menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Welcome {userEmail}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 py-2 bg-white rounded-md shadow-xl z-20">
                  <a
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-hunterGreen hover:text-white"
                    onClick={() => { return; }}
                  >
                    Dashboard
                  </a>
                  <a
                    href="/profle"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-hunterGreen hover:text-white"
                    onClick={() => { return; }}
                  >
                    Profile
                  </a>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-hunterGreen hover:text-white"
                    onClick={handleLogout}
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Menu for small screens */}
        {isMenuOpen && (
          <div className={`${isMenuOpen ? 'menu-entering' : 'menu-exiting'} absolute top-full left-0 w-full md:hidden`}>
            <ul className="flex flex-col absolute top-full left-0 w-full text-center pb-4 bg-hunterGreen md:hidden">
              <li className="hover:text-gold transition-colors duration-300">
                <a href="/" className="block py-2 px-4">Home</a>
              </li>
              <li className="hover:text-gold transition-colors duration-300">
                <a href="/services" className="block py-2 px-4">Services</a>
              </li>
              <li className="hover:text-gold transition-colors duration-300">
                <a href="/beta" className="block py-2 px-4">Beta</a>
              </li>
              {!isLoggedIn && (
                <div>
                  <li className="text-white hover:opacity-100">
                    <a href="/login">Login</a>
                  </li>
                  <li>
                    <a href="/register" className="bg-burntOrange mx-auto px-4 py-1 rounded hover:bg-lightBlue transition-colors duration-300 inline-block">Register</a>
                  </li>
                </div>)}
            </ul>
          </div>
        )}
      </nav>
    </header >
  );
};

export default Header;
