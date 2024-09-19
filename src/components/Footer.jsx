// src/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-10">
      <p>&copy; {new Date().getFullYear()} .Asanda Madondo. Recipe App. All rights reserved.</p>
      <p>Follow us on social media!</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="text-blue-400 hover:underline">Facebook</a>
        <a href="#" className="text-blue-400 hover:underline">Twitter</a>
        <a href="#" className="text-blue-400 hover:underline">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
