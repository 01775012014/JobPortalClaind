import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router';
import { Routes, Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext';
import {
  Briefcase,
  Search,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Settings,
  FileText,
  Building,
  Heart,
  Bell,
  Home
} from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Find Jobs', path: '/jobs', icon: Search },
    { name: 'Companies', path: '/companies', icon: Building },
    { name: 'Post a Job', path: '/post-job', icon: FileText, authRequired: true, role: 'employer' },
  ];

  return (
    <nav className={`fixed w-full  top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <div className="bg-gradient-to-r  p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="hidden sm:block">CareerCode</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const shouldShow = !link.authRequired || currentUser;
              
              if (!shouldShow) return null;
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 font-medium"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side - Auth & Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications - only for logged in users */}
            {currentUser && (
              <button className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
            )}

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-gradient-to-r rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <div className="px-4 py-3 border-b border-gray-200">
                            <p className="font-medium text-gray-900">{currentUser.displayName || currentUser.email}</p>
                            <p className="text-sm text-gray-500">User</p>
                          </div>
                      <Link 
                        to="/profile" 
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link 
                        to="/saved-jobs" 
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Heart className="h-4 w-4" />
                        <span>Saved Jobs</span>
                      </Link>
                      <Link 
                        to="/applications" 
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FileText className="h-4 w-4" />
                        <span>My Applications</span>
                      </Link>
                      <Link 
                        to="/settings" 
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-gradient-to-r bg-gray-700  text-white rounded-lg  font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-500 rounded-lg mt-2 border border-gray-600">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const shouldShow = !link.authRequired || currentUser;
              
              if (!shouldShow) return null;
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md transition-colors font-medium"
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            
            {/* Mobile Auth */}
            {currentUser ? (
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center px-3 py-2 mb-2">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{currentUser.displayName || currentUser.email}</p>
                    <p className="text-sm text-gray-500">User</p>
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>My Profile</span>
                </Link>
                <Link 
                  to="/saved-jobs" 
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>Saved Jobs</span>
                </Link>
                <Link 
                  to="/applications" 
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  <span>My Applications</span>
                </Link>
                <Link 
                  to="/settings" 
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="flex items-center space-x-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="block px-3 py-3 bg-gradient-to-r bg-gray-600  text-white rounded-md font-medium text-center transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={closeMenu}
          style={{ zIndex: -1 }}
        />
      )}

      {/* Close profile dropdown when clicking outside */}
      {isProfileDropdownOpen && (
        <div 
          className="fixed inset-0"
          onClick={() => setIsProfileDropdownOpen(false)}
          style={{ zIndex: -1 }}
        />
      )}
    </nav>
  );
};

export default Navbar;