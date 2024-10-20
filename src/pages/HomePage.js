import React, { useEffect, useState } from 'react';
import Contact from './Contact';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [quickLinks, setQuickLinks] = useState([]); // State for quickLinks
    const [achievements, setAchievements] = useState([]); // State for achievements

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Fetch events from backend API
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events'); // Update with your API URL
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        // Fetch quick links from backend API
        const fetchQuickLinks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quick-links'); // Update with your API URL
                setQuickLinks(response.data);
            } catch (error) {
                console.error('Error fetching quick links:', error);
            }
        };

        // Fetch achievements from backend API
        const fetchAchievements = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/achievements');
                setAchievements(response.data);
            } catch (error) {
                console.error("Error fetching achievements", error);
            }
        };

        fetchEvents();
        fetchQuickLinks(); // Fetch both events and quick links
        fetchAchievements(); // Fetch achievements
    }, []);

    return (
        <div className="bg-gray-300">
            {/* Welcome Section */}
            <section
                id="homepage"
                className="relative h-screen flex flex-col items-center justify-center text-white"
                style={{
                    backgroundImage: 'url(./images/scho.jpg)', // Update this path with your actual image path
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Backdrop Blur Layer */}
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

                {/* Welcome Text */}
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold">Welcome to Ghazali Public School</h1>
                    <p className="mt-4 text-lg md:text-2xl">Empowering the leaders of tomorrow</p>

                    {/* Login and Register Buttons */}
                    <div className="mt-8 space-x-4">
                        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Login
                        </Link>
                        <Link to="/register" className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
                            Register
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Page for Ghazali Public School */}
            <section
                id="about"
                className="py-20 px-4 md:px-20 bg-gray-100"
            >
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-600">About Ghazali Public School</h1>
                    <p className="mt-4 text-gray-700">Learn more about our journey, mission, and commitment to education.</p>
                </div>

                {/* Mission Section */}
                <div className="flex flex-wrap justify-center mb-12">
                    <div className="w-full md:w-2/3 p-4">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
                            <p className="text-gray-600">
                                At Ghazali Public School, our mission is to provide quality education that nurtures young minds and prepares students for the challenges of the future.
                                We are committed to fostering a culture of academic excellence, moral integrity, and lifelong learning.
                            </p>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="flex flex-wrap justify-center mb-12">
                    <div className="w-full md:w-2/3 p-4">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our History</h2>
                            <p className="text-gray-600">
                                Established in 1990, Ghazali Public School has grown from a small community school into a well-recognized institution of learning. Over the years, we have
                                achieved numerous milestones and touched the lives of thousands of students and families. Our journey is one of continuous growth and improvement, ensuring
                                that our students receive the best possible education.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Core Values Section */}
                <div className="flex flex-wrap justify-center mb-12">
                    <div className="w-full md:w-2/3 p-4">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Core Values</h2>
                            <ul className="list-disc list-inside text-gray-600">
                                <li>Academic Excellence</li>
                                <li>Integrity and Responsibility</li>
                                <li>Respect for All</li>
                                <li>Innovation and Creativity</li>
                                <li>Commitment to Community</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Call-to-Action Section */}
                <div className="text-center">
                    <div className="bg-blue-600 text-white py-8 px-4 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Join Us in Our Journey</h3>
                        <p className="mb-6">
                            Be a part of Ghazali Public School's thriving community. Discover our programs and get in touch for more information.
                        </p>
                        <button 
                            onClick={() => scrollToSection('contact')} 
                            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>

            {/* Announcements/Events Section */}
            <section id="events" className="py-20 px-4 md:px-20 bg-white">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-600">Announcements & Events</h2>
                    <p className="mt-4 text-gray-700">Stay updated with our latest events and important announcements.</p>
                </div>
                <div className="flex flex-wrap justify-center">
                    {events.length > 0 ? events.map((event, index) => (
                        <div key={index} className="w-full md:w-1/3 p-4">
                            <div className={`${event.color || 'bg-gray-100'} p-6 rounded-lg shadow-md`}>
                                <div className="flex items-center">
                                    <i className={`${event.icon || 'fa-solid fa-calendar'} text-3xl text-blue-600 mr-4`}></i>
                                    <h3 className="text-xl font-bold text-blue-600">{event.title}</h3>
                                </div>
                                <p className="mt-2 text-gray-600">{event.description || 'Details about the event.'}</p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-600">No upcoming events at the moment.</p>
                    )}
                </div>
            </section>

            {/* Quick Links Section */}
            <section id="links" className="py-20 bg-gray-100">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-600">Quick Links</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {quickLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.url}
                            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors"
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            </section>

            {/* Achievements Section */}
            <section id="achievements" className="py-20 px-4 md:px-20 bg-white">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-600">Our Achievements</h2>
                </div>
                <div className="flex flex-wrap justify-center">
                    {achievements.length > 0 ? achievements.map((achievement, index) => (
                        <div key={index} className="w-full md:w-1/3 p-4">
                            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-blue-600">{achievement.title}</h3>
                                <p className="mt-2 text-gray-600">{achievement.description}</p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-600">No achievements to display.</p>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <Contact />
        </div>
    );
};

export default HomePage;
