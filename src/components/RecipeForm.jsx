import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [category, setCategory] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setRecipeImage(e.target.files[0]);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const validateForm = () => {
    if (!recipeName || !recipeImage || !category || !prepTime || !servings) {
      setError('All fields are required.');
      return false;
    }
    if (isNaN(servings) || servings <= 0) {
      setError('Servings must be a positive number.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return; // Perform validation

    setLoading(true);
    setError(''); // Reset error state

    // Upload the image to Cloudinary
    let imageUrl = '';
    if (recipeImage) {
      const formData = new FormData();
      formData.append('file', recipeImage);
      formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your upload preset

      try {
        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, // Replace with your cloud name
          {
            method: 'POST',
            body: formData,
          }
        );

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.secure_url; // Get the uploaded image URL
      } catch (error) {
        setError('Error uploading image. Please try again.');
        setLoading(false);
        return;
      }
    }

    const recipeData = {
      recipeName,
      recipeImage: imageUrl, // Use the uploaded image URL
      ingredients: JSON.stringify(ingredients),
      instructions: JSON.stringify(instructions),
      category,
      prepTime,
      servings,
    };

    try {
      const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        // Reset form
        setRecipeName('');
        setRecipeImage(null);
        setIngredients(['']);
        setInstructions(['']);
        setCategory('');
        setPrepTime('');
        setServings('');
        navigate('/recipe'); // Redirect after successful submission
      } else {
        setError('Error submitting recipe. Please try again.');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Recipe Form</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}

      <div className="mb-4">
        <label className="block text-gray-700">Recipe Name:</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Recipe Picture:</label>
        <input
          type="file"
          accept="image/*"
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          onChange={handleImageChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            placeholder={`Ingredient ${index + 1}`}
            required
          />
        ))}
        <button type="button" className="text-blue-500" onClick={addIngredient}>Add Ingredient</button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Instructions:</label>
        {instructions.map((instruction, index) => (
          <input
            key={index}
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={instruction}
            onChange={(e) => handleInstructionChange(index, e.target.value)}
            placeholder={`Instruction ${index + 1}`}
            required
          />
        ))}
        <button type="button" className="text-blue-500" onClick={addInstruction}>Add Instruction</button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        >
          <option value="">Select category</option>
          <option value="dessert">Dessert</option>
          <option value="maincourse">Main Course</option>
          <option value="appetizer">Appetizer</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Preparation Time:</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          placeholder="e.g., 30 minutes"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Servings:</label>
        <input
          type="number"
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Recipe'}
      </button>
    </form>
  );
};

export default RecipeForm;
