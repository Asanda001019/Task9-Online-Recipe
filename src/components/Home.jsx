// src/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-green bg-opacity-50">
      <h1 className="text-black text-4xl md:text-6xl font-bold mt-10">Welcome to Recipe Haven!</h1>
      {/* <img 
        src="/src/assets/lemon.jpg" // Replace with your image path
        alt="Delicious recipes"
        className="mt-4 w-3/4 md:w-1/2 rounded" // Adjust classes as needed
      /> */}
    </div>
  );
};

export default Home;
