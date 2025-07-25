import React from 'react';
import { UserRole } from '../App';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Users, 
  Bell, 
  Settings, 
  BarChart3, 
  Upload, 
  DollarSign,
  MessageCircle,
  Shield,
  Building
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  userRole: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, isOpen, onClose }) => {
  const getMenuItems = () => {
    switch (userRole) {
      case 'student':
        return [
          { icon: Home, label: 'Dashboard', active: true },
          { icon: Calendar, label: 'Schedule', active: false },
          { icon: BookOpen, label: 'Assignments', active: false },
          { icon: BarChart3, label: 'Attendance', active: false },
          { icon: Bell, label: 'Announcements', active: false },
          { icon: DollarSign, label: 'Fees', active: false },
          { icon: Users, label: 'Clubs', active: false },
          { icon: MessageCircle, label: 'Feedback', active: false }
        ];
      case 'faculty':
        return [
          { icon: Home, label: 'Dashboard', active: true },
          { icon: Users, label: 'My Batches', active: false },
          { icon: Upload, label: 'Upload Materials', active: false },
          { icon: BarChart3, label: 'Attendance', active: false },
          { icon: Bell, label: 'Announcements', active: false },
          { icon: Calendar, label: 'Schedule', active: false },
          { icon: BookOpen, label: 'Reports', active: false },
          { icon: Settings, label: 'Settings', active: false }
        ];
      case 'admin':
        return [
          { icon: Home, label: 'Dashboard', active: true },
          { icon: Users, label: 'Manage Users', active: false },
          { icon: Building, label: 'Campus Control', active: false },
          { icon: Bell, label: 'Announcements', active: false },
          { icon: BarChart3, label: 'Analytics', active: false },
          { icon: DollarSign, label: 'Fee Management', active: false },
          { icon: Shield, label: 'Role Control', active: false },
          { icon: Settings, label: 'System Settings', active: false }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#2B0A3D] to-[#1a0824] backdrop-blur-lg border-r border-white border-opacity-20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 sm:px-6 border-b border-white border-opacity-20">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">CampusHub</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 sm:px-4 py-4 sm:py-6 space-y-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-300 group ${
                  item.active 
                    ? 'bg-gradient-to-r from-[#8E44AD] to-[#1ABC9C] text-white shadow-lg shadow-[#8E44AD]/25' 
                    : 'text-[#E0E0E0] hover:bg-white hover:bg-opacity-10 hover:text-white'
                }`}
                onClick={onClose}
              >
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  item.active ? 'text-white' : 'text-[#8E44AD]'
                }`} />
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white border-opacity-20">
            <div className="text-center text-[#E0E0E0] text-xs sm:text-sm opacity-70">
              <p>CampusHub v2.0</p>
              <p className="text-xs mt-1">Made with ❤️ for education</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;