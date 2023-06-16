import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DetailsContext from '../context/DetailsContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRecomendedRecipes from '../services/fetchRecomendedRecipes';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import toggleFavorite from '../services/toggleFavorite';

function RecipeDetails() {
  const { fetchDetailsById, fetchRecipeById, loading } = useContext(DetailsContext);
  const { id } = useParams();
  const location = useLocation().pathname;
  const history = useHistory();

  const [recomendedRecipes, setRecomendedRecipes] = useState([]);
  const [urlCopied, setUrlCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchDetailsById(id);
    fetchRecomendedRecipes(location, setRecomendedRecipes);
    JSON.parse(localStorage.getItem('favoriteRecipes'))?.forEach((recipe) => {
      if (recipe.id === id) {
        setIsFavorite(true);
      }
    });
  }, []);

  const copyUrlToClipboard = (recipeType) => {
    const url = `${window.location.origin}/${recipeType}`;
    navigator.clipboard.writeText(url).then(() => {
      console.log('Link copied!');
      setUrlCopied(true);
    });
  };

  const isDoneRecipe = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')).some(
      (recipe) => recipe.id === id,
    )
    : false;

  const screen = location.includes('meal') ? 'meals' : 'drinks';
  const isInProgress = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))[screen][id]
    : false;

  const magic13 = 13;
  const magic6 = 6;
  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyUrlToClipboard(location.slice(1)) }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => toggleFavorite(fetchRecipeById[0], setIsFavorite, isFavorite) }
      >
        <img
          alt="favorite"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        />
      </button>
      {fetchRecipeById
        && fetchRecipeById.length > 0
        && fetchRecipeById.map((option, index) => (
          <div key={ index }>
            <Header title={ option.strDrink || option.strMeal } />
            <img
              src={ option.strDrinkThumb || option.strMealThumb }
              alt={ option.strDrink || option.strMeal }
              data-testid="recipe-photo"
              width={ 200 }
            />
            <p data-testid="recipe-title">
              {option.strDrink || option.strMeal}
            </p>
            <p data-testid="recipe-category">
              {option.strAlcoholic || option.strCategory}
            </p>
            <ul>
              {Object.entries(option)
                .filter(
                  (details) => details[0].includes('strIngredient') && details[1],
                )
                .map(
                  (
                    entry,
                    indexEntries, // entries para pegar o valor sem chamar fetchRecipeById novamente
                  ) => (
                    <li
                      key={ entry[1] }
                      data-testid={ `${indexEntries}-ingredient-name-and-measure` }
                    >
                      {entry[1]}
                      {' '}
                      {option[`strMeasure${entry[0].slice(magic13)}`]}
                    </li>
                  ),
                )}
            </ul>
            <p data-testid="instructions">{option.strInstructions}</p>
            <iframe title="video" data-testid="video" src={ option.strYoutube }>
              Vídeo
            </iframe>
          </div>
        ))}
      <div
        style={ {
          display: 'flex',
          maxWidth: '400px',
          overflowX: 'scroll',
        } }
      >
        {recomendedRecipes
          && recomendedRecipes.length > 0
          && recomendedRecipes.slice(0, magic6).map((recipe, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              key={ index }
              style={ {
                minWidth: '200px',
              } }
            >
              <img
                width="80px"
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt={ recipe.strMeal || recipe.strDrink }
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {recipe.strMeal || recipe.strDrink}
              </p>
            </div>
          ))}
      </div>
      {urlCopied && <p>Link copied!</p>}
      <Footer>
        {!isDoneRecipe && (
          <button
            style={ { position: 'fixed', bottom: '0' } }
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => {
              history.push(`${location}/in-progress`);
            } }
          >
            {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}
      </Footer>
    </div>
  );
}

export default RecipeDetails;
