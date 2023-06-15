import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../css/recipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation().pathname;
  const endpoint = location.includes('/meals') ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  const [recipeById, setRecipeById] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [checkboxSave, setCheckboxSave] = useState({});
  const [urlCopied, setUrlCopied] = useState(false);

  useEffect(() => {
    const fetchIdRecipe = async () => {
      const response = await fetch(`${endpoint}${id}`);
      const data = await response.json();
      const recipeId = data.drinks ? data.drinks[0] : data.meals[0];
      setRecipeById(recipeId);
    };
    fetchIdRecipe();
  }, []);

  useEffect(() => {
    console.log(recipeById);

    const maximumNumberOfIngredients = 20;
    const temporaryIngredients = [];

    if (recipeById !== null) {
      for (let numberIngredient = 1; numberIngredient <= maximumNumberOfIngredients;
        numberIngredient += 1) {
        const ingredientNumber = `strIngredient${numberIngredient}`;
        const ingredientValue = recipeById[ingredientNumber];

        if (ingredientValue !== null
          && ingredientValue !== ''
          && ingredientValue !== undefined) {
          temporaryIngredients.push(ingredientValue);
        }
      }
    }

    setIngredients(temporaryIngredients);
  }, [recipeById]);

  useEffect(() => {
    console.log(ingredients);
    console.log(checkboxSave);
  }, [ingredients]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('recipeInProgress');

    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCheckboxSave(progress);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recipeInProgress', JSON.stringify(checkboxSave));
  }, [checkboxSave]);

  const handleCheckbox = (indexIngredient) => {
    setCheckboxSave((prevCheckboxSave) => ({
      ...prevCheckboxSave,
      [indexIngredient]: !prevCheckboxSave[indexIngredient],
    }));
  };

  const copyUrlToClipboard = () => {
    const recipeType = location.includes('/meals') ? 'meals' : 'drinks';
    const url = `${window.location.origin}/${recipeType}/${id}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        console.log('Link copied!');
        setUrlCopied(true);
      });
  };

  const history = useHistory();
  const toDoneRecipes = () => {
    history.push('/done-recipes');
  };

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
          <button data-testid="share-btn" onClick={ copyUrlToClipboard }>
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
          { urlCopied && <span>Link copied!</span> }
          <p
            data-testid="recipe-category"
          >
            { recipeById.strAlcoholic
          || recipeById.strCategory }
          </p>
          <h3>Ingredients</h3>
          { ingredients && ingredients.map((ingredient, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className={ checkboxSave[index] ? 'checked' : '' }
            >
              {ingredient}
              <input
                type="checkbox"
                checked={ checkboxSave[index] }
                onChange={ () => handleCheckbox(index) }
              />
            </label>
          )) }
          <h3>Instructions</h3>
          <p data-testid="instructions">{ recipeById.strInstructions }</p>
          <button
            data-testid="finish-recipe-btn"
            onClick={ toDoneRecipes }
          >
            Finish Recipe
          </button>
        </main>
      )}
    </div>
  );
}

export default RecipeInProgress;
