// StudentDashboard.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentDashboard = () => {
  const { id } = useParams(); // Get the _id parameter from the URL
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Simulate an API call to fetch student data based on _id
    const fetchStudentData = async () => {
      try {
        // Replace this with an actual API call
        const response = await fetch(`http://localhost:5000/api/students/${id}`);
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [id]);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Student Dashboard</h2>

      {/* Profile Management */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-bold mb-4">Profile Management</h3>
        <p className="text-gray-600 mb-4">Update your personal details below:</p>
        <form className="space-y-4">
          <input type="text" value={studentData.name} readOnly className="w-full p-3 border rounded-lg" />
          <input type="email" value={studentData.username} readOnly className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Phone Number" className="w-full p-3 border rounded-lg" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Update Profile</button>
        </form>
      </div>

      {/* Homework Submission */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-bold mb-4">Homework Submission</h3>
        <p className="text-gray-600 mb-4">Upload your assignments here:</p>
        <form className="space-y-4">
          <input type="file" className="w-full p-3 border rounded-lg" />
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Submit Homework</button>
        </form>
      </div>

      {/* Exam Results */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-bold mb-4">Exam Results</h3>
        <p className="text-gray-600 mb-4">View your grades and progress reports:</p>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Math: A</li>
          <li>Science: B+</li>
          <li>History: A-</li>
          <li>English: B</li>
        </ul>
      </div>

      {/* Attendance Tracker */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-bold mb-4">Attendance Tracker</h3>
        <p className="text-gray-600 mb-4">View your attendance records:</p>
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Oct 12, 2024</td>
              <td className="border px-4 py-2">Present</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Oct 13, 2024</td>
              <td className="border px-4 py-2">Absent</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notices/Announcements */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-bold mb-4">Notices/Announcements</h3>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Parent-teacher meeting scheduled for Oct 20th.</li>
          <li>Midterm exams start from Nov 5th.</li>
          <li>Sports day event on Dec 10th.</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
