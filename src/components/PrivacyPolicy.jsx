import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); // Navigate to the home page
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
      </p>
      <h2 className="text-2xl font-semibold mt-4">Information We Collect</h2>
      <p className="mb-4">We may collect personal data such as your name, email, and location.</p>
      
      <h2 className="text-2xl font-semibold mt-4">How We Use Your Information</h2>
      <p className="mb-4">We use your information to provide and improve our services.</p>
      
      <h2 className="text-2xl font-semibold mt-4">Data Protection</h2>
      <p className="mb-4">We implement security measures to protect your information.</p>
      
      <h2 className="text-2xl font-semibold mt-4">Your Rights</h2>
      <p className="mb-4">You have the right to access, modify, or delete your personal data.</p>
      <button
        onClick={handleBackToHome}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Home
      </button>
    </div>
  );
};

export default PrivacyPolicy;
