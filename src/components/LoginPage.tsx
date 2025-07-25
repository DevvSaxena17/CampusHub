import React, { useState } from 'react';
import { User, UserRole } from '../App';
import { ChevronDown, BookOpen, Bell, Calendar, GraduationCap, Eye, EyeOff, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const roles = [
    { value: 'student' as UserRole, label: 'Student', icon: GraduationCap },
    { value: 'faculty' as UserRole, label: 'Faculty', icon: BookOpen },
    { value: 'admin' as UserRole, label: 'Admin', icon: Bell }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    setTimeout(() => {
      if (email === "fail@example.com") {
        setLoginError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }
      const mockUsers = {
        student: { id: '1', name: 'Aarav Sharma', email: 'aarav@student.edu', role: 'student' as UserRole },
        faculty: { id: '2', name: 'Dr. Priya Verma', email: 'priya@faculty.edu', role: 'faculty' as UserRole },
        admin: { id: '3', name: 'Rohan Mehta', email: 'rohan@admin.edu', role: 'admin' as UserRole }
      };
      onLogin(mockUsers[selectedRole]);
      setIsLoading(false);
    }, 1500);
  };

  const validateEmail = (email: string) => /.+@.+\..+/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B0A3D] via-[#1a0824] to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 animate-bounce">
          <BookOpen className="w-8 h-8 text-[#8E44AD] opacity-30" />
        </div>
        <div className="absolute top-40 right-32 animate-pulse">
          <Bell className="w-6 h-6 text-[#1ABC9C] opacity-40" />
        </div>
        <div className="absolute bottom-32 left-40 animate-bounce delay-300">
          <Calendar className="w-7 h-7 text-[#8E44AD] opacity-35" />
        </div>
        <div className="absolute bottom-20 right-20 animate-pulse delay-500">
          <GraduationCap className="w-9 h-9 text-[#1ABC9C] opacity-30" />
        </div>
      </div>
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide">
              CampusHub
            </h1>
            <p className="text-[#E0E0E0] text-base sm:text-lg md:text-xl opacity-90">
              Your Gateway to Everything College
            </p>
          </div>
          <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {loginError && (
              <div className="mb-4 text-center text-red-400 bg-red-900 bg-opacity-30 rounded-lg py-2 px-4">
                {loginError}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
                  Login as
                </label>
                <div className="relative">
                  <button
                    type="b"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white bg-opacity-10 border border-[#8E44AD] border-opacity-50 rounded-lg px-4 py-3 text-white flex items-center justify-between hover:bg-opacity-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50"
                  >
                    <div className="flex items-center space-x-3">
                      {React.createElement(roles.find(r => r.value === selectedRole)?.icon || GraduationCap, {
                        className: "w-5 h-5 text-[#1ABC9C]"
                      })}
                      <span>{roles.find(r => r.value === selectedRole)?.label}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#2B0A3D] bg-opacity-95 backdrop-blur-lg border border-[#8E44AD] border-opacity-30 rounded-lg shadow-xl z-20">
                      {roles.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => {
                            setSelectedRole(role.value);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-[#8E44AD] hover:bg-opacity-10 text-white"
                        >
                          <role.icon className="w-5 h-5 text-[#1ABC9C]" />
                          <span>{role.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  onBlur={() => {
                    if (!validateEmail(email)) setEmailError("Please enter a valid email address.");
                  }}
                  className="w-full bg-white bg-opacity-10 border border-[#8E44AD] border-opacity-50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
                {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
              </div>
              <div>
                <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    onBlur={() => {
                      if (!validatePassword(password)) setPasswordError("Password must be at least 6 characters.");
                    }}
                    className="w-full bg-white bg-opacity-10 border border-[#8E44AD] border-opacity-50 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E44AD] hover:text-white focus:outline-none"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordError && <p className="text-red-400 text-xs mt-1">{passwordError}</p>}
              </div>
              <div className="flex items-center mb-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-[#8E44AD] bg-[#1a0824] border-[#8E44AD] rounded focus:ring-[#1ABC9C]"
                  disabled={isLoading}
                />
                <label htmlFor="rememberMe" className="ml-2 text-[#E0E0E0] text-sm select-none cursor-pointer">
                  Remember Me
                </label>
              </div>
              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#8E44AD] to-[#1ABC9C] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#8E44AD]/25 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50 flex items-center justify-center"
                  disabled={
                    isLoading || !validateEmail(email) || !validatePassword(password) || emailError !== "" || passwordError !== ""
                  }
                >
                  {isLoading && (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  )}
                  Login
                </button>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="flex-1 bg-white bg-opacity-10 text-[#E0E0E0] font-medium py-2 px-4 rounded-lg hover:bg-opacity-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8E44AD] focus:ring-opacity-50"
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-white bg-opacity-10 text-[#E0E0E0] font-medium py-2 px-4 rounded-lg hover:bg-opacity-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8E44AD] focus:ring-opacity-50"
                    onClick={() => setShowForgotModal(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="text-center mt-8 text-[#E0E0E0] text-sm opacity-70">
            <p>Created with ❤️ by Devv Saxena</p>
            <p className="mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#8E44AD] hover:underline font-semibold">Register</Link>
            </p>
          </div>
        </div>
      </div>
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#1a0824] rounded-2xl p-6 w-full max-w-sm relative shadow-2xl border border-[#8E44AD]">
            <button
              className="absolute top-3 right-3 text-[#8E44AD] hover:text-white"
              onClick={() => { setShowForgotModal(false); setForgotSubmitted(false); setForgotEmail(""); }}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-4 text-center">Reset Password</h2>
            {!forgotSubmitted ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setForgotSubmitted(true);
                }}
                className="space-y-4"
              >
                <label className="block text-[#E0E0E0] text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  required
                  className="w-full bg-white bg-opacity-10 border border-[#8E44AD] border-opacity-50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#8E44AD] to-[#1ABC9C] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#8E44AD]/25 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50"
                >
                  Send Reset Link
                </button>
              </form>
            ) : (
              <div className="text-center text-[#E0E0E0]">
                <p className="mb-4">If the email exists, a reset link will be sent.</p>
                <button
                  className="w-full bg-gradient-to-r from-[#8E44AD] to-[#1ABC9C] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#8E44AD]/25 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50 mt-4"
                  onClick={() => { setShowForgotModal(false); setForgotSubmitted(false); setForgotEmail(""); }}
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;