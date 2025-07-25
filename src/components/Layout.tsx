import React, { useState } from 'react';
import { User, UserRole } from '../App';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  userRole: UserRole;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, userRole, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B0A3D] via-[#1a0824] to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row h-screen">
        {/* Sidebar */}
        <Sidebar 
          userRole={userRole} 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-64 bg-transparent">
          {/* Header */}
          <Header 
            user={user} 
            onLogout={onLogout} 
            onMenuClick={() => setSidebarOpen(true)} 
          />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
