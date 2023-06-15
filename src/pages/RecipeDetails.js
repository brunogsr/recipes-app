import React, { useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DetailsContext from '../context/DetailsContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

function RecipeDetails() {
  const { fetchDetailsById, fetchRecipeById, loading } = useContext(DetailsContext);
  const { id } = useParams();
  const location = useLocation().pathname;
  useEffect(() => {
    fetchDetailsById(id);
  }, [location]);

  // console.log(fetchRecipeById)
  // const magic10 = 10;
  const magic13 = 13;
  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      {fetchRecipeById && fetchRecipeById.length > 0
       && fetchRecipeById.map((option, index) => (
         <div key={ index }>
           <Header title={ option.strDrink || option.strMeal } />
           <img
             src={ option.strDrinkThumb || option.strMealThumb }
             alt={ option.strDrink || option.strMeal }
             data-testid="recipe-photo"
           />
           <p data-testid="recipe-title">{option.strDrink || option.strMeal}</p>
           <p data-testid="recipe-category">
             {option.strAlcoholic
               || option.strCategory}
           </p>
           <ul>
             {Object.entries(option).filter((details) => details[0]
               .includes('strIngredient') && details[1])
               .map((entry, indexEntries) => (// entries para pegar o valor sem chamar fetchRecipeById novamente
                 <li
                   key={ entry[1] }
                   data-testid={ `${indexEntries}-ingredient-name-and-measure` }
                 >
                   {entry[1]}
                   {' '}
                   {option[`strMeasure${entry[0].slice(magic13)}`]}
                 </li>
               ))}
           </ul>
           <p data-testid="instructions">{option.strInstructions}</p>
           <iframe
             title="video"
             data-testid="video"
             src={ option.strYoutube }
           >
             Vídeo
           </iframe>

         </div>
       ))}
      <Footer />
    </div>
  );
}

export default RecipeDetails;
