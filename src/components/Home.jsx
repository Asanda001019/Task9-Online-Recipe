// src/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url("/src/assets/lemon.jpg")' }}>
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg text-center mx-4 sm:mx-0">
        <h1 className="text-green-600 text-4xl md:text-6xl font-bold">Welcome to Recipe Haven!</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700">Discover delicious recipes tailored just for you.</p>
        <a href="/login" className="mt-6 inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">Get Started</a>
        {/* Uncomment and replace with your image path if needed */}
        {/* <img 
          src="/src/assets/lemon.jpg"
          alt="Delicious recipes"
          className="mt-4 w-3/4 md:w-1/2 rounded"
        /> */}
      </div>
    </div>
  );
};

export default Home;
