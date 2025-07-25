import React, { useState } from 'react';
import { User } from '../App';
import Layout from './Layout';
import { 
  Users, 
  Building, 
  Bell, 
  FileCheck, 
  DollarSign, 
  BarChart3, 
  Shield, 
  Globe,
  TrendingUp,
  UserPlus,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [selectedCampus, setSelectedCampus] = useState('main');

  const campuses = [
    { id: 'main', name: 'Main Campus', students: 2450, faculty: 89 },
    { id: 'north', name: 'North Campus', students: 1890, faculty: 67 },
    { id: 'south', name: 'South Campus', students: 1650, faculty: 54 }
  ];

  const recentActivities = [
    { action: 'New faculty member added', user: 'Dr. Sarah Johnson', time: '2 hours ago', type: 'user' },
    { action: 'Course curriculum updated', user: 'CSE Department', time: '4 hours ago', type: 'course' },
    { action: 'Fee payment processed', user: 'Finance Dept', time: '6 hours ago', type: 'finance' },
    { action: 'Global announcement sent', user: 'Admin Team', time: '1 day ago', type: 'announcement' }
  ];

  const systemStats = [
    { label: 'Total Students', value: '5,990', change: '+12%', icon: Users, color: 'text-[#1ABC9C]' },
    { label: 'Active Faculty', value: '210', change: '+5%', icon: UserPlus, color: 'text-[#8E44AD]' },
    { label: 'Total Revenue', value: '$2.4M', change: '+18%', icon: DollarSign, color: 'text-[#1ABC9C]' },
    { label: 'System Uptime', value: '99.9%', change: '0%', icon: Shield, color: 'text-green-400' }
  ];

  const pendingApprovals = [
    { type: 'Course Material', item: 'Advanced Database Systems - Syllabus', requestor: 'Dr. Mike Chen', priority: 'high' },
    { type: 'Event Permission', item: 'Tech Fest 2024 - Budget Approval', requestor: 'Student Council', priority: 'medium' },
    { type: 'User Access', item: 'New Librarian Account Setup', requestor: 'HR Department', priority: 'low' }
  ];

  return (
    <Layout user={user} onLogout={onLogout} userRole="admin">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8E44AD] to-[#1ABC9C] rounded-2xl p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">System Dashboard 🧑‍💼</h1>
              <p className="opacity-90 text-sm sm:text-base">Manage the entire CampusHub ecosystem</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 mt-2 sm:mt-0">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                {campuses.map(campus => (
                  <option key={campus.id} value={campus.id} className="text-black">{campus.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {systemStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-[#E0E0E0] text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Management Tools */}
            <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Settings className="w-6 h-6 text-[#1ABC9C]" />
                <h2 className="text-xl font-semibold text-white">System Management</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                <button className="p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left group">
                  <Users className="w-8 h-8 text-[#1ABC9C] mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-medium mb-1">Manage Users</h3>
                  <p className="text-[#E0E0E0] text-sm">Add, edit, delete users</p>
                </button>
                <button className="p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left group">
                  <Building className="w-8 h-8 text-[#8E44AD] mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-medium mb-1">Campus Control</h3>
                  <p className="text-[#E0E0E0] text-sm">Courses, rooms, clubs</p>
                </button>
                <button className="p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left group">
                  <Bell className="w-8 h-8 text-[#1ABC9C] mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-medium mb-1">Announcements</h3>
                  <p className="text-[#E0E0E0] text-sm">Global notifications</p>
                </button>
                <button className="p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left group">
                  <FileCheck className="w-8 h-8 text-[#8E44AD] mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-medium mb-1">Review Files</h3>
                  <p className="text-[#E0E0E0] text-sm">Approve uploads</p>
                </button>
                <button className="p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left group">
                  <DollarSign className="w-8 h-8 text-[#1ABC9C] mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-medium mb-1">Fee Analytics</h3>
                  <p className="text-[#E0E0E0] text-sm">Payment tracking</p>
                </button>
                <button className="p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left group">
                  <Shield className="w-8 h-8 text-[#8E44AD] mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-medium mb-1">Role Control</h3>
                  <p className="text-[#E0E0E0] text-sm">Manage permissions</p>
                </button>
              </div>
            </div>

            {/* Analytics Dashboard */}
            <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-6 h-6 text-[#8E44AD]" />
                <h2 className="text-xl font-semibold text-white">Analytics Overview</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Attendance Trends */}
                <div className="p-4 bg-white bg-opacity-10 rounded-lg">
                  <h3 className="text-white font-medium mb-3">Attendance Trends</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#E0E0E0] text-sm">CSE Department</span>
                      <span className="text-[#1ABC9C]">87%</span>
                    </div>
                    <div className="w-full bg-[#2B0A3D] rounded-full h-2">
                      <div className="bg-[#1ABC9C] h-2 rounded-full" style={{width: '87%'}}></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#E0E0E0] text-sm">ECE Department</span>
                      <span className="text-[#8E44AD]">92%</span>
                    </div>
                    <div className="w-full bg-[#2B0A3D] rounded-full h-2">
                      <div className="bg-[#8E44AD] h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Resource Usage */}
                <div className="p-4 bg-white bg-opacity-10 rounded-lg">
                  <h3 className="text-white font-medium mb-3">Resource Usage</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#E0E0E0] text-sm">Library</span>
                      <span className="text-[#1ABC9C]">76%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#E0E0E0] text-sm">Labs</span>
                      <span className="text-[#8E44AD]">84%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#E0E0E0] text-sm">Auditorium</span>
                      <span className="text-orange-400">45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Pending Approvals */}
            <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileCheck className="w-6 h-6 text-[#8E44AD]" />
                <h3 className="text-lg font-semibold text-white">Pending Approvals</h3>
              </div>
              <div className="space-y-3">
                {pendingApprovals.map((approval, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        approval.priority === 'high' ? 'bg-red-500 bg-opacity-30 text-red-400' :
                        approval.priority === 'medium' ? 'bg-yellow-500 bg-opacity-30 text-yellow-400' :
                        'bg-green-500 bg-opacity-30 text-green-400'
                      }`}>
                        {approval.priority}
                      </span>
                      <span className="text-[#1ABC9C] text-xs">{approval.type}</span>
                    </div>
                    <p className="text-white text-sm font-medium mb-1">{approval.item}</p>
                    <p className="text-[#E0E0E0] text-xs">by {approval.requestor}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-[#1ABC9C]" />
                <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300"
                  >
                    <p className="text-white text-sm font-medium mb-1">{activity.action}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-[#E0E0E0] text-xs">{activity.user}</p>
                      <p className="text-[#1ABC9C] text-xs">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Campus Overview */}
            <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Building className="w-6 h-6 text-[#8E44AD]" />
                <h3 className="text-lg font-semibold text-white">Campus Overview</h3>
              </div>
              <div className="space-y-4">
                {campuses.map(campus => (
                  <div key={campus.id} className="p-3 bg-white bg-opacity-10 rounded-lg">
                    <h4 className="text-white font-medium mb-2">{campus.name}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#E0E0E0]">Students</span>
                      <span className="text-[#1ABC9C]">{campus.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#E0E0E0]">Faculty</span>
                      <span className="text-[#8E44AD]">{campus.faculty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;