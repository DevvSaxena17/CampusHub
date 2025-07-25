import React, { useState } from 'react';
import { User } from '../App';
import Layout from './Layout';
import { 
  Calendar, 
  BookOpen, 
  PieChart, 
  Bell, 
  DollarSign, 
  Users, 
  MessageCircle,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const scheduleData = [
    { time: '9:00 AM', subject: 'Data Structures', room: 'CS-101', type: 'lecture' },
    { time: '11:00 AM', subject: 'Web Development', room: 'CS-205', type: 'practical' },
    { time: '2:00 PM', subject: 'Database Systems', room: 'CS-102', type: 'lecture' },
    { time: '4:00 PM', subject: 'Software Engineering', room: 'CS-301', type: 'tutorial' }
  ];

  const assignments = [
    { title: 'React Portfolio Project', subject: 'Web Development', due: '2 days', status: 'pending' },
    { title: 'Binary Tree Implementation', subject: 'Data Structures', due: '5 days', status: 'in-progress' },
    { title: 'Database Design Report', subject: 'DBMS', due: '1 week', status: 'completed' }
  ];

  const announcements = [
    { title: 'Mid-term Exams Schedule Released', time: '2 hours ago', type: 'important' },
    { title: 'New Lab Equipment Available', time: '1 day ago', type: 'info' },
    { title: 'Campus Fest Registration Open', time: '3 days ago', type: 'event' }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } })
  };

  return (
    <Layout user={user} onLogout={onLogout} userRole="student">
      <div className="space-y-4 sm:space-y-6">
        {/* Hero Card */}
        <div className="bg-gradient-to-r from-[#8E44AD] to-[#1ABC9C] rounded-2xl p-4 sm:p-6 text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Hey {user.name}, you're in 2nd Year CSE 🧑‍💻</h1>
          <p className="opacity-90 text-sm sm:text-base">Welcome back! Here's what's happening today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Schedule */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-[#1ABC9C]" />
                  <h2 className="text-xl font-semibold text-white">Today's Schedule</h2>
                </div>
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="bg-[#2B0A3D] text-white border border-[#8E44AD] border-opacity-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C]"
                >
                  <option value="current">This Week</option>
                  <option value="next">Next Week</option>
                </select>
              </div>
              <div className="space-y-3">
                {scheduleData.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 mb-2 sm:mb-0">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-[#1ABC9C]">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{item.time}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{item.subject}</p>
                        <p className="text-[#E0E0E0] text-sm">{item.room}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === 'lecture' ? 'bg-[#8E44AD] bg-opacity-30 text-[#8E44AD]' :
                      item.type === 'practical' ? 'bg-[#1ABC9C] bg-opacity-30 text-[#1ABC9C]' :
                      'bg-orange-500 bg-opacity-30 text-orange-400'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Assignment Tracker */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-6 h-6 text-[#8E44AD]" />
                <h2 className="text-xl font-semibold text-white">Assignment Tracker</h2>
              </div>
              <div className="space-y-3">
                {assignments.map((assignment, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 mb-2 sm:mb-0">
                    <div>
                      <p className="text-white font-medium">{assignment.title}</p>
                      <p className="text-[#E0E0E0] text-sm">{assignment.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#1ABC9C] font-medium">Due in {assignment.due}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'completed' ? 'bg-green-500 bg-opacity-30 text-green-400' :
                        assignment.status === 'in-progress' ? 'bg-yellow-500 bg-opacity-30 text-yellow-400' :
                        'bg-red-500 bg-opacity-30 text-red-400'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Attendance Graph */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <PieChart className="w-6 h-6 text-[#1ABC9C]" />
                <h3 className="text-lg font-semibold text-white">Attendance</h3>
              </div>
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#2B0A3D" strokeWidth="8" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="#1ABC9C" strokeWidth="8" fill="none"
                            strokeDasharray={`${2 * Math.PI * 56 * 0.85} ${2 * Math.PI * 56}`}
                            className="transition-all duration-500" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">85%</span>
                  </div>
                </div>
                <p className="text-[#E0E0E0] text-sm">Overall Attendance</p>
              </div>
            </motion.div>

            {/* Announcements */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="w-6 h-6 text-[#8E44AD]" />
                <h3 className="text-lg font-semibold text-white">Announcements</h3>
              </div>
              <div className="space-y-3">
                {announcements.map((announcement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300"
                  >
                    <p className="text-white text-sm font-medium mb-1">{announcement.title}</p>
                    <p className="text-[#E0E0E0] text-xs">{announcement.time}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left">
                  <DollarSign className="w-5 h-5 text-[#1ABC9C]" />
                  <span className="text-white">Pay Fees</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left">
                  <Users className="w-5 h-5 text-[#8E44AD]" />
                  <span className="text-white">Join Clubs</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left">
                  <MessageCircle className="w-5 h-5 text-[#1ABC9C]" />
                  <span className="text-white">Feedback</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;