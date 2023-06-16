async function fetchRecomendedRecipes(location, setRecomendedRecipes) {
  const counterScreen = !location.includes('meal') ? 'meals' : 'drinks';
  const URL = counterScreen !== 'drinks' ? 'https://www.themealdb.com/api/json/v1/1' : 'https://www.thecocktaildb.com/api/json/v1/1';
  const response = await fetch(`${URL}/search.php?s=`);
  const data3 = await response.json();
  if (data3[counterScreen] && data3[counterScreen].length > 0) {
    setRecomendedRecipes(data3[counterScreen]);
  }
}

export default fetchRecomendedRecipes;
