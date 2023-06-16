import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../css/favoriteRecipes.css';

function FavoriteRecipes() {
  const [urlCopied, setUrlCopied] = useState(false);
  const [copiedRecipeId, setCopiedRecipeId] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  );
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

  const copyUrlToClipboard = (recipeId, recipeType) => {
    const url = `${window.location.origin}/${recipeType}s/${recipeId}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setUrlCopied(true);
        setCopiedRecipeId(recipeId);
      });
  };

  const removeFavorite = (recipeId) => {
    const newFavorites = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
    setFavoriteRecipes(newFavorites);
    setFilteredRecipes(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const filterRecipes = (type) => {
    switch (type) {
    case 'meals':
      setFilteredRecipes(favoriteRecipes.filter((recipe) => recipe.type === 'meal'));
      break;
    case 'drinks':
      setFilteredRecipes(favoriteRecipes.filter((recipe) => recipe.type === 'drink'));
      break;
    default:
      setFilteredRecipes(favoriteRecipes);
      break;
    }
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => filterRecipes() }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filterRecipes('meals') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipes('drinks') }
      >
        Drinks
      </button>

      {filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link to={ `${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="recipe"
              className="horizontal-image"
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
          </p>
          <Link to={ `${recipe.type}s/${recipe.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
          </Link>
          <button onClick={ () => copyUrlToClipboard(recipe.id, recipe.type) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
            />
          </button>
          <button onClick={ () => removeFavorite(recipe.id) }>
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="favorite"
            />
          </button>
          { urlCopied && copiedRecipeId === recipe.id && <p>Link copied!</p> }
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
