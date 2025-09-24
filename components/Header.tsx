
import React from 'react';
import { MenuIcon } from './icons';

interface HeaderProps {
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, onToggleAdmin, onToggleSidebar }) => {
  return (
    <header className="bg-white/70 backdrop-blur-lg fixed top-0 left-0 right-0 z-40 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="md:hidden mr-4 p-1 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            City Girl
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`text-sm font-medium ${isAdmin ? 'text-pink-600' : 'text-gray-500'}`}>
            Admin Mode
          </span>
          <button
            onClick={onToggleAdmin}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
              isAdmin ? 'bg-pink-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
                isAdmin ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};