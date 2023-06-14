import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation().pathname;
  const endpoint = location.includes('/meals') ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  const [recipeById, setRecipeById] = useState(null);

  useEffect(() => {
    const fetchIdRecipe = async () => {
      const response = await fetch(`${endpoint}${id}`);
      const data = await response.json();
      const recipeId = data.drinks ? data.drinks[0] : data.meals[0];
      setRecipeById(recipeId);
    };
    fetchIdRecipe();
  }, []);

  return (
    <div>
      {recipeById && (
        <main>
          <img
            data-testid="recipe-photo"
            src={ recipeById.strMealThumb || recipeById.strDrinkThumb }
            alt={ recipeById.Idmeal || recipeById.idDrink }
            className="horizontal-image"
          />
          <h2 data-testid="recipe-title">{recipeById.strMeal || recipeById.strDrink}</h2>
          <button data-testid="share-btn">
            <img
              src={ shareIcon }
              alt="share"
            />
          </button>
          <button data-testid="favorite-btn">
            <img
              src={ blackHeartIcon }
              alt="favorite"
            />
          </button>
          <p
            data-testid="recipe-category"
          >
            { recipeById.strAlcoholic
          || recipeById.strCategory }
          </p>
          <p data-testid="instructions">{ recipeById.strInstructions }</p>
          <button data-testid="finish-recipe-btn">Finish Recipe</button>
        </main>
      )}
    </div>
  );
}

export default RecipeInProgress;
