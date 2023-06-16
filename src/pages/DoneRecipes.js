import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../css/favoriteRecipes.css';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const [urlCopied, setUrlCopied] = useState('');

  const copyUrlToClipboard = (type, id) => {
    const url = `${window.location.origin}/${type}s/${id}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        console.log('Link copied!');
        setUrlCopied(id);
      });
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {doneRecipes && doneRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            className="horizontal-image"
          />
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
          <button onClick={ () => copyUrlToClipboard(recipe.type, recipe.id) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
            />
          </button>
          { (recipe.id === urlCopied) && <span>Link copied!</span> }
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          { recipe.tags.length > 0
          && recipe.tags.map((tagName, indexTag) => (
            <p
              key={ indexTag }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              {tagName}
            </p>
          )) }
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default DoneRecipes;
