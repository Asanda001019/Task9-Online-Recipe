// src/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-10">
       <Link to="/privacy" className="text-blue-500">Privacy Policy</Link>
      <p>&copy; {new Date().getFullYear()} .Asanda Madondo. Recipe App. All rights reserved.</p>
      <p>Follow us on social media!</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="https://www.linkedin.com/in/asanda-madondo-5830b4252/" className="text-blue-400 hover:underline">Linkedin</a>
        <a href="https://github.com/Asanda001019" className="text-blue-400 hover:underline">Github</a>
        <a href="https://www.instagram.com/_asanda19/" className="text-blue-400 hover:underline">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
