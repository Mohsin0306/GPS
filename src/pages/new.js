import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherStudentManagement = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [principals, setPrincipals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([fetchTeachers(), fetchStudents(), fetchPrincipals()]);
            } catch (err) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/teachers');
            setTeachers(response.data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
            throw error;
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students');
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
            throw error;
        }
    };

    const fetchPrincipals = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/principals');
            setPrincipals(response.data);
        } catch (error) {
            console.error("Error fetching principals:", error);
            throw error;
        }
    };

    const deleteTeacher = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/teachers/${id}`);
            fetchTeachers();
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/students/${id}`);
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    const deletePrincipal = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/principals/${id}`);
            fetchPrincipals();
        } catch (error) {
            console.error("Error deleting principal:", error);
        }
    };

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Principal Management</h1>
            <ul className="mb-8">
                {principals.length > 0 ? (
                    principals.map((principal) => (
                        <li key={principal._id} className="flex justify-between items-center p-4 border-b border-gray-300">
                            <div>
                                <span className="font-semibold">ID: {principal._id}</span>
                                <span className="ml-2">Username: {principal.username || 'No username available'}</span>
                            </div>
                            <button
                                onClick={() => deletePrincipal(principal._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No principals found</li>
                )}
            </ul>

            <h1 className="text-2xl font-bold mb-6">Teacher Management</h1>
            <ul className="mb-8">
                {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                        <li key={teacher._id} className="flex justify-between items-center p-4 border-b border-gray-300">
                            <div>
                                <span className="font-semibold">{teacher.username}</span>
                                <span className="ml-2">- {teacher.email}</span>
                            </div>
                            <button
                                onClick={() => deleteTeacher(teacher._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No teachers found</li>
                )}
            </ul>

            <h1 className="text-2xl font-bold mb-6">Student Management</h1>
            <ul>
                {students.length > 0 ? (
                    students.map((student) => (
                        <li key={student._id} className="flex justify-between items-center p-4 border-b border-gray-300">
                            <div>
                                <span className="font-semibold">{student.username}</span>
                                <span className="ml-2">- {student.bformNumber}</span>
                            </div>
                            <button
                                onClick={() => deleteStudent(student._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No students found</li>
                )}
            </ul>
        </div>
    );
};

export default TeacherStudentManagement;
