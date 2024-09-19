// src/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: './src/assets/cooking.png' }}>
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-white text-4xl md:text-6xl font-bold">Welcome to the Recipe App</h1>
      </div>
    </div>
  );
};

export default Home;
