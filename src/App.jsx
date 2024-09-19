// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeForm from "./components/RecipeForm"
import RecipeDisplay from './components/RecipeDisplay';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<RecipeForm />} />
          <Route path="/recipe" element={<RecipeDisplay />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
