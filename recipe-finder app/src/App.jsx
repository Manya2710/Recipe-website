import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    if (!query) return;
    // const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const res = await fetch(`https://corsproxy.io/?https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    const data = await res.json();
    setRecipes(data.meals || []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-orange-700">🍽️ Recipe Finder</h1>

      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search for recipes..."
          className="px-4 py-2 w-80 border rounded shadow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchRecipes()}
        />
        <button
          onClick={fetchRecipes}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length === 0 && (
          <p className="text-center text-gray-600 col-span-full">No recipes found.</p>
        )}
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded shadow-lg overflow-hidden hover:scale-105 transform transition"
          >
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-orange-700">{recipe.strMeal}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Category: {recipe.strCategory} | Area: {recipe.strArea}
              </p>
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
