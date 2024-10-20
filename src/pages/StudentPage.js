// src/StudentPage.js
import React, { useState } from 'react';
import axios from 'axios';

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [showRegisterPopup, setShowRegisterPopup] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [studentRole, setStudentRole] = useState('student'); // Default role is student
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name: studentName,
                email: studentEmail,
                password: studentPassword,
                role: studentRole,
            });

            if (response.data.message) {
                setStudents([...students, {
                    name: studentName,
                    email: studentEmail,
                    password: studentPassword, // Add password to the list
                    class: studentClass,
                    role: studentRole,
                }]); // Update the list of students
                setSuccessMessage('Student registered successfully!');
                resetForm();
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('Registration failed. Please try again.');
        }
    };

    const resetForm = () => {
        setStudentName('');
        setStudentEmail('');
        setStudentPassword('');
        setStudentClass('');
        setShowRegisterPopup(false);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Students</h1>
            <button
                onClick={() => setShowRegisterPopup(true)}
                className="bg-cyan-500 text-white rounded-md px-4 py-2 mb-4"
            >
                Register a Student
            </button>

            {/* Registration Popup */}
            {showRegisterPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Register Student</h2>
                        {errorMessage && (
                            <div className="bg-red-200 text-red-600 p-2 rounded-md mb-4">
                                {errorMessage}
                            </div>
                        )}
                        {successMessage && (
                            <div className="bg-green-200 text-green-600 p-2 rounded-md mb-4">
                                {successMessage}
                            </div>
                        )}
                        <form onSubmit={handleRegister}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    className="border border-gray-300 rounded-md w-full p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={studentEmail}
                                    onChange={(e) => setStudentEmail(e.target.value)}
                                    className="border border-gray-300 rounded-md w-full p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={studentPassword}
                                    onChange={(e) => setStudentPassword(e.target.value)}
                                    className="border border-gray-300 rounded-md w-full p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Class</label>
                                <input
                                    type="text"
                                    value={studentClass}
                                    onChange={(e) => setStudentClass(e.target.value)}
                                    className="border border-gray-300 rounded-md w-full p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Role</label>
                                <select
                                    value={studentRole}
                                    onChange={(e) => setStudentRole(e.target.value)}
                                    className="border border-gray-300 rounded-md w-full p-2"
                                >
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-cyan-500 text-white rounded-md px-4 py-2 w-full"
                            >
                                Register
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="mt-2 text-red-500 underline"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Student List */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Student List</h2>
                <ul className="list-disc ml-5">
                    {students.map((student, index) => (
                        <li key={index} className="text-gray-700">
                            {student.name} ({student.email}) - Class: {student.class} - Role: {student.role} - Password: {student.password} {/* Display password */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StudentPage;
