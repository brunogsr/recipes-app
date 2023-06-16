import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../css/recipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation().pathname;
  const endpoint = location.includes('/meals') ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const type = location.includes('/meals') ? 'meal' : 'drink';

  const [recipeById, setRecipeById] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [checkboxSave, setCheckboxSave] = useState({});
  const [urlCopied, setUrlCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // pega pelo id da receita as informações que vão estar presentes na tela
  useEffect(() => {
    const fetchIdRecipe = async () => {
      const response = await fetch(`${endpoint}${id}`);
      const data = await response.json();
      const recipeId = data.drinks ? data.drinks[0] : data.meals[0];
      setRecipeById(recipeId);

      // verifica se a receita atual está salva na lista de favoritos
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      let favoriteRecipesArray = [];

      if (favoriteRecipes) {
        favoriteRecipesArray = JSON.parse(favoriteRecipes);
        const isRecipeFavorite = favoriteRecipesArray.some(
          (recipe) => recipe.id === recipeId.idDrink || recipe.id === recipeId.idMeal,
        );
        setIsFavorite(isRecipeFavorite);
      }
    };

    fetchIdRecipe();
  }, [id, endpoint]);

  // salva uma lista de ingredientes no estado
  useEffect(() => {
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

  // obs: essa parte precisa ser refatorada: salvar um objeto com as chaves 'drinks' e 'meals', onde cada id de uma receita específica recebe um array com o número referente a cada checkbox do ingrediente

  // useEffect(() => {
  //   setCheckboxSave((prevCheckboxSave) => {
  //     const newState = {
  //       drinks: { ...prevCheckboxSave.drinks }, meals: { ...prevCheckboxSave.meals } };

  //     ingredients.forEach((_, index) => {
  //       newState[index] = prevCheckboxSave[index] || false;
  //     });

  //     return newState;
  //   });
  // }, [ingredients]);

  // useEffect(() => {
  //   const savedProgress = localStorage.getItem('inProgressRecipes');

  //   if (savedProgress) {
  //     const progress = JSON.parse(savedProgress);
  //     console.log(progress);
  //     setCheckboxSave(progress);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(checkboxSave));
  // }, [checkboxSave]);

  // const handleCheckbox = () => {
  // };

  const copyUrlToClipboard = () => {
    const recipeType = location.includes('/meals') ? 'meals' : 'drinks';
    const url = `${window.location.origin}/${recipeType}/${id}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        console.log('Link copied!');
        setUrlCopied(true);
      });
  };

  const favoriteButton = () => {
    setIsFavorite(!isFavorite);
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    let favoriteRecipesArray = [];

    if (favoriteRecipes) {
      favoriteRecipesArray = JSON.parse(favoriteRecipes);
    }
    if (isFavorite) {
      const newFavorite = favoriteRecipesArray.filter((recipe) => recipe.id !== id);
      const newFavoriteJSON = JSON.stringify(newFavorite);

      localStorage.setItem('favoriteRecipes', newFavoriteJSON);
    } else {
      const newRecipeFavorite = {
        id,
        type,
        nationality: recipeById.strArea || '',
        category: recipeById.strCategory || '',
        alcoholicOrNot: recipeById.strAlcoholic || '',
        name: recipeById.strMeal || recipeById.strDrink,
        image: recipeById.strMealThumb || recipeById.strDrinkThumb,
      };

      favoriteRecipesArray.push(newRecipeFavorite);
      const updatedFavoriteRecipes = JSON.stringify(favoriteRecipesArray);
      localStorage.setItem('favoriteRecipes', updatedFavoriteRecipes);
    }
  };

  // verifica se todos os checkbox dos ingredientes estão marcados como true
  function verifyAllIngredientsIsTrue() {
    const valores = Object.values(checkboxSave);
    const allTrue = valores.every((ingredientCheckbox) => ingredientCheckbox === true);
    return allTrue;
  }

  const history = useHistory();

  const doneRecipeButton = () => {
    history.push('/done-recipes');
    const doneRecipe = {
      id: recipeById.idDrink || recipeById.idMeal,
      type,
      nationality: recipeById.strArea || '',
      category: recipeById.strCategory || '',
      alcoholicOrNot: recipeById.strAlcoholic || '',
      name: recipeById.strMeal || recipeById.strDrink,
      image: recipeById.strMealThumb || recipeById.strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: recipeById.strTags
        ? recipeById.strTags.split(',').map((tag) => tag.trim())
        : [],
    };

    const savedDoneRecipes = localStorage.getItem('doneRecipes');
    const doneRecipes = savedDoneRecipes ? JSON.parse(savedDoneRecipes) : [];

    doneRecipes.push(doneRecipe);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
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
          <button
            onClick={ favoriteButton }
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            type="button"
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
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
            onClick={ doneRecipeButton }
            disabled={ !verifyAllIngredientsIsTrue() }
          >
            Finish Recipe
          </button>
        </main>
      )}
    </div>
  );
}

export default RecipeInProgress;
