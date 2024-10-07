import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams(); // Retrieve recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading recipe...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500 hover:underline">
        &larr; Back to Recipes
      </button>
      <h2 className="text-3xl font-bold mb-4">{recipe.recipeName}</h2>
      {recipe.recipeImage && (
        <img
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
      )}
      <p className="text-lg">Category: {recipe.category}</p>
      <p className="text-lg">Prep Time: {recipe.prepTime}</p>
      <p className="text-lg">Servings: {recipe.servings}</p>
      
      <h3 className="mt-4 text-2xl font-semibold">Ingredients:</h3>
      <ul className="list-disc ml-6">
        {JSON.parse(recipe.ingredients).map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3 className="mt-4 text-2xl font-semibold">Instructions:</h3>
      <ol className="list-decimal ml-6">
        {JSON.parse(recipe.instructions).map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      
      <button
        onClick={() => navigate(`/recipe/edit/${id}`)}  // Optionally, if you want an Edit button here
        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Edit Recipe
      </button>
      <div className="rating">
  <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
  <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" defaultChecked />
  <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
  <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
  <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
</div>
    </div>
  );
};

export default RecipeDetail;
