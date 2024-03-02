import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store'; // Adjust this import according to your store setup
import { logout } from 'features/auth/authSlice';
import './Header.css'; // Reusing styles from your main header

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userEmail } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-hunterGreen text-white font-bold">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6 relative">
        
        {/* Hamburger menu for small screens */}
        <div className="md:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </div>

        <div className="text-2xl md:mx-0 md:relative flex-grow md:flex-grow-0">
          <span><a href="/admin">Kaktus Admin</a></span>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-gold transition-colors duration-300">
            <a href="/admin/dashboard">Dashboard</a>
          </li>
          <li className="hover:text-gold transition-colors duration-300">
            <a href="/admin/users">Users</a>
          </li>
        </ul>

        <div>
          <button
            onClick={handleLogout}
            className="text-white hover:bg-hunterGreen px-4 py-2 rounded focus:outline-none"
          >
            Sign out {userEmail}
          </button>
        </div>

        {/* Responsive menu for small screens */}
        {isMenuOpen && (
          <div className={`${isMenuOpen ? 'menu-entering' : 'menu-exiting'} absolute top-full left-0 w-full md:hidden`}>
            <ul className="flex flex-col absolute top-full left-0 w-full text-center pb-4 bg-hunterGreen md:hidden">
              <li className="hover:text-gold transition-colors duration-300">
                <a href="/admin/dashboard" className="block py-2 px-4">Dashboard</a>
              </li>
              <li className="hover:text-gold transition-colors duration-300">
                <a href="/admin/users" className="block py-2 px-4">Users</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default AdminHeader;
