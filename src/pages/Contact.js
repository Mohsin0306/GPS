import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      form.current,
      'YOUR_USER_ID' // Replace with your EmailJS user ID
    )
    .then((result) => {
      console.log(result.text);
      setMessageSent(true);
      e.target.reset(); // Reset the form after successful submission
    }, (error) => {
      console.log(error.text);
    });
  };

  return (
    <section
    id="contact"
     className="py-20 px-4 md:px-20 bg-gray-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">Contact Us</h1>
        <p className="mt-4 text-gray-700">We'd love to hear from you! Please fill out the form below to get in touch.</p>
      </div>

      <div className="flex justify-center">
        <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-lg">
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label className="block text-gray-700">Your Name</label>
              <input
                type="text"
                name="user_name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Your Email</label>
              <input
                type="email"
                name="user_email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Success message */}
          {messageSent && (
            <div className="mt-6 text-center text-green-600 font-semibold">
              Your message has been sent successfully!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
