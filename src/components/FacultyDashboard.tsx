import React, { useState } from 'react';
import { User } from '../App';
import Layout from './Layout';
import { 
  Users, 
  Upload, 
  CheckCircle, 
  BarChart3, 
  Bell, 
  Calendar, 
  FileText,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FacultyDashboardProps {
  user: User;
  onLogout: () => void;
}

const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ user, onLogout }) => {
  const [selectedBatch, setSelectedBatch] = useState('CSE-2A');
  const [attendanceMode, setAttendanceMode] = useState(false);

  const batches = [
    { id: 'CSE-2A', name: 'CSE 2nd Year A', subject: 'Data Structures', students: 45 },
    { id: 'CSE-2B', name: 'CSE 2nd Year B', subject: 'Web Development', students: 48 },
    { id: 'CSE-3A', name: 'CSE 3rd Year A', subject: 'Database Systems', students: 42 }
  ];

  const students = [
    { id: '1', name: 'Alex Johnson', rollNo: 'CS2021001', attendance: 85, status: 'present' },
    { id: '2', name: 'Maria Garcia', rollNo: 'CS2021002', attendance: 92, status: 'present' },
    { id: '3', name: 'David Chen', rollNo: 'CS2021003', attendance: 78, status: 'absent' },
    { id: '4', name: 'Sarah Wilson', rollNo: 'CS2021004', attendance: 96, status: 'present' }
  ];

  const recentUploads = [
    { title: 'Chapter 5: Trees and Graphs', type: 'Notes', date: '2 days ago' },
    { title: 'Assignment 3: Binary Search Tree', type: 'Assignment', date: '1 week ago' },
    { title: 'Mid-term Exam Syllabus', type: 'Syllabus', date: '2 weeks ago' }
  ];

  return (
    <Layout user={user} onLogout={onLogout} userRole="faculty">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8E44AD] to-[#1ABC9C] rounded-2xl p-4 sm:p-6 text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Welcome back, {user.name}! 👩‍🏫</h1>
          <p className="opacity-90 text-sm sm:text-base">Manage your classes and connect with students</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Batch Management */}
            <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-[#1ABC9C]" />
                  <h2 className="text-xl font-semibold text-white">Assigned Batches</h2>
                </div>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="bg-[#2B0A3D] text-white border border-[#8E44AD] border-opacity-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C]"
                >
                  {batches.map(batch => (
                    <option key={batch.id} value={batch.id}>{batch.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                {batches.map(batch => (
                  <div key={batch.id} className="p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300">
                    <h3 className="text-white font-medium mb-2">{batch.name}</h3>
                    <p className="text-[#1ABC9C] text-sm mb-1">{batch.subject}</p>
                    <p className="text-[#E0E0E0] text-sm">{batch.students} students</p>
                  </div>
                ))}
              </div>

              {/* Attendance Toggle */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white bg-opacity-10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#8E44AD]" />
                  <div>
                    <h3 className="text-white font-medium">Mark Attendance</h3>
                    <p className="text-[#E0E0E0] text-sm">Today's session for {batches.find(b => b.id === selectedBatch)?.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setAttendanceMode(!attendanceMode)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    attendanceMode 
                      ? 'bg-[#1ABC9C] text-white' 
                      : 'bg-white bg-opacity-20 text-[#E0E0E0] hover:bg-opacity-30'
                  }`}
                >
                  {attendanceMode ? 'Finish' : 'Start'}
                </button>
              </div>
            </div>

            {/* Student List / Attendance */}
            {attendanceMode && (
              <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-[#1ABC9C]" />
                  <h2 className="text-xl font-semibold text-white">Live Attendance</h2>
                </div>
                <div className="space-y-3">
                  {students.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-white bg-opacity-10 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-white font-medium">{student.name}</p>
                          <p className="text-[#E0E0E0] text-sm">{student.rollNo}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-[#1ABC9C] text-sm">{student.attendance}%</span>
                        <div className="flex space-x-2">
                          <button className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                            student.status === 'present' 
                              ? 'bg-[#1ABC9C] text-white' 
                              : 'bg-white bg-opacity-20 text-[#E0E0E0] hover:bg-[#1ABC9C] hover:text-white'
                          }`}>
                            Present
                          </button>
                          <button className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                            student.status === 'absent' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-white bg-opacity-20 text-[#E0E0E0] hover:bg-red-500 hover:text-white'
                          }`}>
                            Absent
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Section */}
            <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Upload className="w-6 h-6 text-[#8E44AD]" />
                <h2 className="text-xl font-semibold text-white">Upload Materials</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
                <button className="p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left">
                  <FileText className="w-8 h-8 text-[#1ABC9C] mb-2" />
                  <h3 className="text-white font-medium mb-1">Upload Notes</h3>
                  <p className="text-[#E0E0E0] text-sm">Share class materials</p>
                </button>
                <button className="p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left">
                  <Upload className="w-8 h-8 text-[#8E44AD] mb-2" />
                  <h3 className="text-white font-medium mb-1">Create Assignment</h3>
                  <p className="text-[#E0E0E0] text-sm">New assignment for batch</p>
                </button>
                <button className="p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left">
                  <Calendar className="w-8 h-8 text-[#1ABC9C] mb-2" />
                  <h3 className="text-white font-medium mb-1">Schedule Exam</h3>
                  <p className="text-[#E0E0E0] text-sm">Set exam dates</p>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Recent Uploads */}
            <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-[#1ABC9C]" />
                <h3 className="text-lg font-semibold text-white">Recent Uploads</h3>
              </div>
              <div className="space-y-3">
                {recentUploads.map((upload, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300"
                  >
                    <p className="text-white text-sm font-medium mb-1">{upload.title}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        upload.type === 'Notes' ? 'bg-[#1ABC9C] bg-opacity-30 text-[#1ABC9C]' :
                        upload.type === 'Assignment' ? 'bg-[#8E44AD] bg-opacity-30 text-[#8E44AD]' :
                        'bg-orange-500 bg-opacity-30 text-orange-400'
                      }`}>
                        {upload.type}
                      </span>
                      <p className="text-[#E0E0E0] text-xs">{upload.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-6 h-6 text-[#8E44AD]" />
                <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#E0E0E0]">Total Students</span>
                  <span className="text-white font-bold">135</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#E0E0E0]">Avg Attendance</span>
                  <span className="text-[#1ABC9C] font-bold">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#E0E0E0]">Pending Reviews</span>
                  <span className="text-[#8E44AD] font-bold">12</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: Bell, label: 'Send Announcement', color: 'text-[#1ABC9C]' },
                  { icon: BarChart3, label: 'Generate Reports', color: 'text-[#8E44AD]' },
                  { icon: Calendar, label: 'Office Hours', color: 'text-[#1ABC9C]' }
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full flex items-center space-x-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-left"
                  >
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                    <span className="text-white">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FacultyDashboard;