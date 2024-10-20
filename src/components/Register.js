import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    email: '',
    class: 1, // Default class to an integer
    section: '',
    teacherId: '',
    rollNumber: '',
    uniqueCode: '',
    subject: '',
    principalId: '',
  });

  const [role, setRole] = useState('student');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'class' ? parseInt(value, 10) : value,
    }));
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      class: event.target.value === 'student' ? 1 : 0,
      rollNumber: event.target.value === 'student' ? '' : undefined,
      section: event.target.value === 'student' ? '' : undefined,
      teacherId: event.target.value === 'student' ? '' : undefined,
      principalId: event.target.value === 'teacher' ? '' : undefined,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let apiUrl;
    if (role === 'teacher') {
        apiUrl = 'http://localhost:5000/api/auth/register-teacher';
    } else if (role === 'principal') {
        apiUrl = 'http://localhost:5000/api/auth/register-principal';
    } else {
        apiUrl = 'http://localhost:5000/api/auth/register-student';
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Registration failed: Invalid details');

        const data = await response.json();
        console.log('Registration successful:', data); // Check the structure of data
        setSuccess(true);
        setError(null);

        // Save user data in local storage
        localStorage.setItem('user', JSON.stringify(data));

        // Redirect based on role
        if (role === 'teacher') {
            const teacherId = data.teacherId; // Ensure this is correctly defined
            if (teacherId) {
                navigate(`/teacher-dashboard/${teacherId}`);
            } else {
                console.error('Teacher ID is undefined');
                setError('Registration successful, but unable to retrieve teacher ID.');
            }
        } else if (role === 'principal') {
            navigate('/principal-dashboard');
        } else {
            navigate('/student-dashboard');
        }
    } catch (error) {
        console.error('Error registering:', error);
        setError(error.message);
        setSuccess(false);
    }
};


  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Registration successful!</p>}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2 text-sm font-medium">Role</label>
            <select name="role" value={role} onChange={handleRoleChange} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4" required>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="principal">Principal</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
              required
            />
          </div>
          {role === 'student' && (
            <>
              <div className="mb-4">
                <label htmlFor="class" className="block mb-2 text-sm font-medium">Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
                  required
                >
                  {[...Array(10).keys()].map(num => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="section" className="block mb-2 text-sm font-medium">Section</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rollNumber" className="block mb-2 text-sm font-medium">Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="teacherId" className="block mb-2 text-sm font-medium">Teacher ID</label>
                <input
                  type="text"
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
                  required
                />
              </div>
            </>
          )}
         {role === 'teacher' && (
            <>
              <div className="mb-4">
                <label htmlFor="principalId" className="block mb-2 text-sm font-medium">Principal ID</label>
                <input
                  type="text"
                  name="principalId"
                  value={formData.principalId}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="class" className="block mb-2 text-sm font-medium">Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
                  required
                >
                  {[...Array(10).keys()].map(num => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="section" className="block mb-2 text-sm font-medium">Section</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
                  required
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  {/* Add more subjects as needed */}
                </select>
              </div>
              
            </>
          )}
          {role === 'principal' && (
            <div className="mb-4">
            <label htmlFor="uniqueCode" className="block mb-2 text-sm font-medium">Unique Code</label>
            <input
              type="text"
              name="uniqueCode"
              value={formData.uniqueCode}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2.5 px-4"
              required
            />
          </div>
            
          )}
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
