// src/TeacherDashboard.js
import React, { useState } from 'react';

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Attendance Tracking</h3>
            <p>Here you can track students' attendance.</p>
            {/* Add your attendance tracking implementation here */}
          </div>
        );
      case 'students':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Students List</h3>
            <p>Here you can view and manage the list of students.</p>
            {/* Add your student management implementation here */}
          </div>
        );
      case 'assignments':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Assignments and Grading</h3>
            <p>Here you can manage assignments and grading.</p>
            {/* Add your assignments and grading implementation here */}
          </div>
        );
      case 'announcements':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Announcements</h3>
            <p>Here you can make announcements for students.</p>
            {/* Add your announcements implementation here */}
          </div>
        );
      case 'lessonPlanning':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Lesson Planning</h3>
            <p>Here you can plan your lessons.</p>
            {/* Add your lesson planning implementation here */}
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Welcome to the Teacher Dashboard!</h3>
            <p>Here you can manage your classes, students, and more.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 md:hidden ${isSidebarOpen ? '' : 'hidden'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <aside
        className={`bg-white shadow-lg w-64 h-full fixed inset-y-0 left-0 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5">
          <h1 className="text-2xl font-semibold text-gray-800">Teacher Dashboard</h1>
        </div>
        <nav className="mt-5">
          <ul>
            <li className="mb-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="block w-full text-left p-2 hover:bg-gray-100"
              >
                Dashboard
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActiveTab('students')}
                className="block w-full text-left p-2 hover:bg-gray-100"
              >
                Students
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActiveTab('attendance')}
                className="block w-full text-left p-2 hover:bg-gray-100"
              >
                Students Attendance Tracking
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActiveTab('assignments')}
                className="block w-full text-left p-2 hover:bg-gray-100"
              >
                Assignments and Grading
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActiveTab('announcements')}
                className="block w-full text-left p-2 hover:bg-gray-100"
              >
                Announcements
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActiveTab('lessonPlanning')}
                className="block w-full text-left p-2 hover:bg-gray-100"
              >
                Lesson Planning
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <div className="md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <h2 className="text-3xl font-semibold mb-5">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        {renderContent()}
      </main>
    </div>
  );
};

export default TeacherDashboard;
