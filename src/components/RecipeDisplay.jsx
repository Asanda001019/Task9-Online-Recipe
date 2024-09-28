import React, { useEffect, useState } from 'react';

const RecipeDisplay = () => {
  const [recipes, setRecipes] = useState([]);
  const [editRecipe, setEditRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await fetch('http://localhost:3000/recipes');
    const data = await response.json();
    setRecipes(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/recipes/${id}`, {
      method: 'DELETE',
    });
    fetchRecipes();
  };

  const openEditModal = (recipe) => {
    setEditRecipe({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients), // Ensure this is an array
      instructions: JSON.parse(recipe.instructions) // Ensure this is an array
    });
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setEditRecipe(null);
    setModalOpen(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      ...editRecipe,
      ingredients: JSON.stringify(editRecipe.ingredients),
      instructions: JSON.stringify(editRecipe.instructions),
    };

    await fetch(`http://localhost:3000/recipes/${editRecipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipe),
    });

    fetchRecipes();
    closeEditModal();
  };

  if (!recipes.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Submitted Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="font-bold text-lg">{recipe.recipeName}</h3>
            {recipe.recipeImage && (
              <img
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                className="w-full h-40 object-cover rounded mt-2"
              />
            )}
            <p className="mt-2">Category: {recipe.category}</p>
            <p>Prep Time: {recipe.prepTime}</p>
            <p>Servings: {recipe.servings}</p>
            <h4 className="mt-2 font-semibold">Ingredients:</h4>
            <ul className="list-disc ml-5">
              {JSON.parse(recipe.ingredients).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h4 className="mt-2 font-semibold">Instructions:</h4>
            <ol className="list-decimal ml-5">
              {JSON.parse(recipe.instructions).map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
            <button onClick={() => openEditModal(recipe)} className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
            <button onClick={() => handleDelete(recipe.id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div>
        ))}
      </div>

      {modalOpen && editRecipe && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl mb-4">Edit Recipe</h2>
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block">Recipe Name:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={editRecipe.recipeName}
                  onChange={(e) => setEditRecipe({ ...editRecipe, recipeName: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block">Ingredients (comma-separated):</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={editRecipe.ingredients.join(',')}
                  onChange={(e) => setEditRecipe({ ...editRecipe, ingredients: e.target.value.split(',').map(item => item.trim()) })}
                />
              </div>
              <div className="mb-4">
                <label className="block">Instructions (comma-separated):</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={editRecipe.instructions.join(',')}
                  onChange={(e) => setEditRecipe({ ...editRecipe, instructions: e.target.value.split(',').map(item => item.trim()) })}
                />
              </div>
              <div className="mb-4">
                <label className="block">Category:</label>
                <select
                  value={editRecipe.category}
                  onChange={(e) => setEditRecipe({ ...editRecipe, category: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="dessert">Dessert</option>
                  <option value="maincourse">Main Course</option>
                  <option value="appetizer">Appetizer</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
              <button type="button" onClick={closeEditModal} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay;
