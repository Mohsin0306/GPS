import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome, FaPlus, FaUsers, FaAward, FaLink } from 'react-icons/fa'; // Import icons

const PrincipalDashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [principals, setPrincipals] = useState([]);
    const [events, setEvents] = useState([]);
    const [quickLinks, setQuickLinks] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', icon: '', color: '', description: '' });
    const [newQuickLink, setNewQuickLink] = useState({ title: '', url: '', icon: '' });
    const [newAchievement, setNewAchievement] = useState({ title: '', description: '' });
    const [showEventModal, setShowEventModal] = useState(false);
    const [showQuickLinkModal, setShowQuickLinkModal] = useState(false);
    const [showAchievementModal, setShowAchievementModal] = useState(false);
    const [activeSection, setActiveSection] = useState('welcome');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teachersResponse, studentsResponse, eventsResponse, quickLinksResponse, achievementsResponse, principalsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/teachers'),
                    axios.get('http://localhost:5000/api/students'),
                    axios.get('http://localhost:5000/api/events'),
                    axios.get('http://localhost:5000/api/quick-links'),
                    axios.get('http://localhost:5000/api/achievements'),
                    axios.get('http://localhost:5000/api/principals'),
                ]);
                
                setTeachers(teachersResponse.data);
                setStudents(studentsResponse.data);
                setEvents(eventsResponse.data);
                setQuickLinks(quickLinksResponse.data);
                setAchievements(achievementsResponse.data);
                setPrincipals(principalsResponse.data);
            } catch (error) {
                console.error("Error fetching data", error);
                setError("Failed to fetch data."); // Set error state
            }
        };

        fetchData();
    }, []);




    // Function to add new event
    const handleAddEvent = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/events', newEvent);
            setEvents((prevEvents) => [...prevEvents, response.data]);
            setNewEvent({ title: '', icon: '', color: '', description: '' });
            setShowEventModal(false);
        } catch (error) {
            console.error("Error adding event", error);
        }
    };

    // Function to add new quick link
    const handleAddQuickLink = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/quick-links', newQuickLink);
            setQuickLinks((prevLinks) => [...prevLinks, response.data]);
            setShowQuickLinkModal(false);
            setNewQuickLink({ title: '', url: '', icon: '' });
        } catch (error) {
            console.error('Error adding quick link:', error.response.data);
        }
    };

    const handleDeleteTeacher = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Remove the teacher from the local state or re-fetch the teacher list
                setTeachers(teachers.filter(teacher => teacher._id !== id));
                alert('Teacher deleted successfully');
            } else {
                alert('Failed to delete the teacher');
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
            alert('Error deleting teacher');
        }
    };
    // Function to delete a student
const handleDeleteStudent = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/students/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            // Remove the student from the local state or re-fetch the student list
            setStudents(students.filter(student => student._id !== id));
            alert('Student deleted successfully');
        } else {
            alert('Failed to delete the student');
        }
    } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error deleting student');
    }
};

// Function to delete a principal
const handleDeletePrincipal = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/principals/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            // Remove the principal from the local state or re-fetch the principal list
            setPrincipals(principals.filter(principal => principal._id !== id));
            alert('Principal deleted successfully');
        } else {
            alert('Failed to delete the principal');
        }
    } catch (error) {
        console.error('Error deleting principal:', error);
        alert('Error deleting principal');
    }
};


    // Function to add new achievement
    const handleAddAchievement = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/achievements', newAchievement);
            setAchievements((prevAchievements) => [...prevAchievements, response.data]);
            setNewAchievement({ title: '', description: '' });
            setShowAchievementModal(false);
        } catch (error) {
            console.error("Error adding achievement", error);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen((prevState) => !prevState);
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg p-5 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Principal Dashboard</h1>
                <ul className="space-y-4">
                    <li>
                        <button className="w-full text-left text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded flex items-center" onClick={() => handleSectionChange('welcome')}>
                            <FaHome className="mr-2" />
                            Welcome
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded flex items-center" onClick={() => handleSectionChange('events')}>
                            <FaPlus className="mr-2" />
                            Events
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded flex items-center" onClick={() => handleSectionChange('teachers')}>
                            <FaUsers className="mr-2" />
                            Teachers
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded flex items-center" onClick={() => handleSectionChange('students')}>
                            <FaUsers className="mr-2" />
                            Students
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded flex items-center" onClick={() => handleSectionChange('principals')}>
                            <FaUsers className="mr-2" />
                            Principal
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded flex items-center" onClick={() => handleSectionChange('achievements')}>
                            <FaAward className="mr-2" />
                            Achievements
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded flex items-center" onClick={() => handleSectionChange('quickLinks')}>
                            <FaLink className="mr-2" />
                            Quick Links
                        </button>
                    </li>
                </ul>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 p-5 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
                {activeSection === 'welcome' && (
                    <div className="text-center">
                        <h2 className="text-3xl text-gray-800 dark:text-white">Welcome, Principal!</h2>
                        <p className="mt-2 text-gray-600">Here you can manage everything related to the school.</p>
                    </div>
                )}
                {activeSection === 'events' && (
                    <div>
                        <h2 className="text-2xl text-gray-800 dark:text-white mb-4">Events List</h2>
                        <button
                            onClick={() => setShowEventModal(true)}
                            className="mb-4 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 transition-colors duration-300 flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Add Event
                        </button>
                        <div className="flex flex-wrap justify-center">
                            {events.map((event) => (
                                <div key={event._id} className="w-full md:w-1/3 p-4">
                                    <div className={`${event.color} p-6 rounded-lg shadow-md`}>
                                        <div className="flex items-center">
                                            <i className={`${event.icon} text-3xl text-blue-600 mr-4`}></i>
                                            <h3 className="text-xl font-bold text-blue-600">{event.title}</h3>
                                        </div>
                                        <p className="mt-2 text-gray-600">{event.description}</p>
                                        <button
                                            onClick={async () => {
                                                await axios.delete(`http://localhost:5000/api/events/${event._id}`);
                                                setEvents((prevEvents) => prevEvents.filter((e) => e._id !== event._id));
                                            }}
                                            className="mt-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeSection === 'quickLinks' && (
                    <div>
                        <h2 className="text-2xl text-gray-800 dark:text-white mb-4">Quick Links</h2>
                        <button
                            onClick={() => setShowQuickLinkModal(true)}
                            className="mb-4 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 transition-colors duration-300 flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Add Quick Link
                        </button>
                        <div className="flex flex-wrap justify-center">
                            {quickLinks.map((link) => (
                                <div key={link._id} className="w-full md:w-1/3 p-4">
                                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                        <div className="flex items-center">
                                            <i className={`${link.icon} text-3xl text-blue-600 mr-4`}></i>
                                            <h3 className="text-xl font-bold text-blue-600">{link.title}</h3>
                                        </div>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="mt-2 text-gray-600 underline">
                                            Visit
                                        </a>
                                        <button
                                            onClick={async () => {
                                                await axios.delete(`http://localhost:5000/api/quick-links/${link._id}`);
                                                setQuickLinks((prevLinks) => prevLinks.filter((l) => l._id !== link._id));
                                            }}
                                            className="mt-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeSection === 'achievements' && (
                    <div>
                        <h2 className="text-2xl text-gray-800 dark:text-white mb-4">Achievements</h2>
                        <button
                            onClick={() => setShowAchievementModal(true)}
                            className="mb-4 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 transition-colors duration-300 flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Add Achievement
                        </button>
                        <div className="flex flex-wrap justify-center">
                            {achievements.map((achievement) => (
                                <div key={achievement._id} className="w-full md:w-1/3 p-4">
                                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold text-blue-600">{achievement.title}</h3>
                                        <p className="mt-2 text-gray-600">{achievement.description}</p>
                                        <button
                                            onClick={async () => {
                                                await axios.delete(`http://localhost:5000/api/achievements/${achievement._id}`);
                                                setAchievements((prevAchievements) => prevAchievements.filter((a) => a._id !== achievement._id));
                                            }}
                                            className="mt-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
               {activeSection === 'teachers' && (
    <div className="my-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Teachers List</h2>
        <div className="overflow-x-auto">
            <table className="hidden md:table min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <th className="py-3 px-4 border-b text-left">Name</th>
                        <th className="py-3 px-4 border-b text-left">Class</th>
                        <th className="py-3 px-4 border-b text-left">Section</th>
                        <th className="py-3 px-4 border-b text-left">Subject</th>
                        <th className="py-3 px-4 border-b text-left">Teacher ID</th>
                        <th className="py-3 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{teacher.username}</td>
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{teacher.class}</td> {/* Changed to classSection */}
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{teacher.section}</td>
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{teacher.subject}</td>
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{teacher._id}</td>
                            <td className="py-3 px-4 border-b">
                                <button
                                    onClick={() => handleDeleteTeacher(teacher._id)}
                                    className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-200 focus:outline-none"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Mobile View - Card Layout */}
            <div className="md:hidden">
                {teachers.map(teacher => (
                    <div key={teacher._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Name:</strong> {teacher.username}
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Class:</strong> {teacher.classSection} {/* Changed to classSection */}
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Section:</strong> {teacher.section}
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Subject:</strong> {teacher.subject}
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Teacher ID:</strong> {teacher._id}
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => handleDeleteTeacher(teacher._id)}
                                className="w-full bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-200 focus:outline-none"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)}


{activeSection === 'students' && (
    <div className="my-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Students List</h2>
        <div className="overflow-x-auto">
            <table className="hidden md:table min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <th className="py-3 px-4 border-b text-left">Name</th>
                        <th className="py-3 px-4 border-b text-left">Class</th>
                        <th className="py-3 px-4 border-b text-left">Section</th>
                        <th className="py-3 px-4 border-b text-left">Roll Number</th>
                        <th className="py-3 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{student.name}</td>
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{student.class}</td> {/* Ensure class displays correctly */}
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{student.section}</td>
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{student.rollNumber}</td> {/* Displaying Roll Number */}
                            <td className="py-3 px-4 border-b">
                                <button
                                    onClick={() => handleDeleteStudent(student._id)}
                                    className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-200 focus:outline-none"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Mobile View - Card Layout */}
            <div className="md:hidden">
                {students.map(student => (
                    <div key={student._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Name:</strong> {student.name}
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Class:</strong> {student.class}
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Section:</strong> {student.section}
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Roll Number:</strong> {student.rollNumber} {/* Displaying Roll Number */}
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => handleDeleteStudent(student._id)}
                                className="w-full bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-200 focus:outline-none"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)}




{activeSection === 'principals' && (
    <div className="my-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Principals List</h2>
        <div className="overflow-x-auto">
            <table className="hidden md:table min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <th className="py-3 px-4 border-b text-left">Name</th>
                        <th className="py-3 px-4 border-b text-left">Principal ID</th>
                        <th className="py-3 px-4 border-b text-left">Username</th>
                        <th className="py-3 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {principals.map(principal => (
                        <tr key={principal._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{principal.name}</td>
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{principal._id}</td> {/* Show Principal ID */}
                            <td className="py-3 px-4 border-b text-gray-800 dark:text-gray-300">{principal.username}</td>
                            <td className="py-3 px-4 border-b">
                                <button
                                    onClick={() => handleDeletePrincipal(principal._id)}
                                    className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-200 focus:outline-none"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Mobile View - Card Layout */}
            <div className="md:hidden">
                {principals.map(principal => (
                    <div key={principal._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Name:</strong> {principal.name}
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Principal ID:</strong> {principal._id}
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700 dark:text-gray-300">Username:</strong> {principal.username}
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => handleDeletePrincipal(principal._id)}
                                className="w-full bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-200 focus:outline-none"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)}


            </main>

            {/* Event Modal */}
            {showEventModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded shadow-lg p-6">
                        <h3 className="text-xl mb-4">Add New Event</h3>
                        <input type="text" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="border mb-2 p-2 w-full" />
                        <input type="text" placeholder="Icon Class" value={newEvent.icon} onChange={(e) => setNewEvent({ ...newEvent, icon: e.target.value })} className="border mb-2 p-2 w-full" />
                        <input type="text" placeholder="Color" value={newEvent.color} onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })} className="border mb-2 p-2 w-full" />
                        <textarea placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="border mb-2 p-2 w-full"></textarea>
                        <button onClick={handleAddEvent} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Add Event
                        </button>
                        <button onClick={() => setShowEventModal(false)} className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Quick Link Modal */}
            {showQuickLinkModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded shadow-lg p-6">
                        <h3 className="text-xl mb-4">Add New Quick Link</h3>
                        <input type="text" placeholder="Title" value={newQuickLink.title} onChange={(e) => setNewQuickLink({ ...newQuickLink, title: e.target.value })} className="border mb-2 p-2 w-full" />
                        <input type="text" placeholder="URL" value={newQuickLink.url} onChange={(e) => setNewQuickLink({ ...newQuickLink, url: e.target.value })} className="border mb-2 p-2 w-full" />
                        <input type="text" placeholder="Icon Class" value={newQuickLink.icon} onChange={(e) => setNewQuickLink({ ...newQuickLink, icon: e.target.value })} className="border mb-2 p-2 w-full" />
                        <button onClick={handleAddQuickLink} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Add Quick Link
                        </button>
                        <button onClick={() => setShowQuickLinkModal(false)} className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Achievement Modal */}
            {showAchievementModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded shadow-lg p-6">
                        <h3 className="text-xl mb-4">Add New Achievement</h3>
                        <input type="text" placeholder="Title" value={newAchievement.title} onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })} className="border mb-2 p-2 w-full" />
                        <textarea placeholder="Description" value={newAchievement.description} onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })} className="border mb-2 p-2 w-full"></textarea>
                        <button onClick={handleAddAchievement} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Add Achievement
                        </button>
                        <button onClick={() => setShowAchievementModal(false)} className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default PrincipalDashboard;
