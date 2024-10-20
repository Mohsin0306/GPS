// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token'); // Assume you store token in local storage
    setIsLoggedIn(!!token);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close sidebar on mobile
    }
  };

  return (
    <nav className="bg-gray-300 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="./images/2.png" alt="Logo" className="h-10 mr-2" />
          <span className="font-bold text-xl">Ghazali Public School</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <button onClick={() => scrollToSection('homepage')} className="text-blue-600 hover:text-blue-800" style={{ fontWeight: 'bolder' }}>School</button>
          <button onClick={() => scrollToSection('about')} className="text-blue-600 hover:text-blue-800" style={{ fontWeight: 'bolder' }}>About</button>
          <button onClick={() => scrollToSection('events')} className="text-blue-600 hover:text-blue-800" style={{ fontWeight: 'bolder' }}>Events</button>
          <button onClick={() => scrollToSection('links')} className="text-blue-600 hover:text-blue-800" style={{ fontWeight: 'bolder' }}>Links</button>
          <button onClick={() => scrollToSection('achievements')} className="text-blue-600 hover:text-blue-800" style={{ fontWeight: 'bolder' }}>Achievements</button>
          <button onClick={() => scrollToSection('contact')} className="text-blue-600 hover:text-blue-800" style={{ fontWeight: 'bolder' }}>Contact</button>
          <button onClick={() => scrollToSection('news')} className="text-blue-600 hover:text-blue-800" style={{ fontWeight: 'bolder' }}>News</button>
        </div>

        {/* Enroll Now Button */}
        <div className="hidden md:flex">
          <Link to="/register" className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
            Register
          </Link>
        </div>

        {/* Logout Button */}
        {isLoggedIn && (
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="text-blue-600 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-300 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button onClick={toggleSidebar} className="absolute top-4 right-4 text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="flex flex-col mt-16">
          <button onClick={() => scrollToSection('homepage')} className="text-blue-600 hover:text-blue-800 py-2">School</button>
          <button onClick={() => scrollToSection('about')} className="text-blue-600 hover:text-blue-800 py-2">About</button>
          <button onClick={() => scrollToSection('events')} className="text-blue-600 hover:text-blue-800 py-2">Events</button>
          <button onClick={() => scrollToSection('links')} className="text-blue-600 hover:text-blue-800 py-2">Links</button>
          <button onClick={() => scrollToSection('achievements')} className="text-blue-600 hover:text-blue-800 py-2">Achievements</button>
          <button onClick={() => scrollToSection('contact')} className="text-blue-600 hover:text-blue-800 py-2">Contact</button>
          <button onClick={() => scrollToSection('news')} className="text-blue-600 hover:text-blue-800 py-2">News</button>
          <Link to="/register" className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-4">
            Register
          </Link>
          {isLoggedIn && (
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-4">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
