import React, { useState } from 'react';
import { User } from '../App';
import { Search, Bell, Menu, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New assignment uploaded', time: '5 min ago', unread: true },
    { id: 2, message: 'Payment reminder', time: '1 hour ago', unread: true },
    { id: 3, message: 'Campus event tomorrow', time: '2 hours ago', unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white bg-opacity-5 backdrop-blur-lg border-b border-white border-opacity-20 flex items-center justify-between px-4 sm:px-6">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-[#E0E0E0] hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-[#8E44AD]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 bg-white bg-opacity-10 border border-[#8E44AD] border-opacity-50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
            placeholder="Search anything..."
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button className="p-2 text-[#E0E0E0] hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300 relative">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1ABC9C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 p-2 text-[#E0E0E0] hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-[#8E44AD] to-[#1ABC9C] rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left hidden xs:block sm:block">
              <p className="text-xs sm:text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-[#E0E0E0] capitalize">{user.role}</p>
            </div>
          </button>

          {/* User Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-40 sm:w-48 bg-[#2B0A3D] bg-opacity-95 backdrop-blur-lg border border-[#8E44AD] border-opacity-30 rounded-lg shadow-xl z-50"
              >
                <div className="px-4 py-3 border-b border-[#8E44AD] border-opacity-30">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-[#E0E0E0]">{user.email}</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-[#E0E0E0] hover:bg-[#8E44AD] hover:bg-opacity-20 hover:text-white transition-colors flex items-center space-x-2">
                    <UserIcon className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left text-[#E0E0E0] hover:bg-red-500 hover:bg-opacity-20 hover:text-red-300 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;