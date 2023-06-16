const toggleFavorite = (recipe, setIsFavorite, isFavorite) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const id = recipe.idMeal || recipe.idDrink;
  if (isFavorite) {
    const newFavoriteRecipes = favoriteRecipes.filter(
      (favorite) => favorite.id !== id,
    );
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(newFavoriteRecipes),
    );
    setIsFavorite(false);
  } else {
    const newFavoriteRecipes = [
      ...favoriteRecipes,
      {
        id,
        type: recipe.idMeal ? 'meal' : 'drink',
        nationality: recipe.strArea || '',
        category: recipe.strCategory || '',
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipe.strMeal || recipe.strDrink,
        image: recipe.strMealThumb || recipe.strDrinkThumb,
      },
    ];
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(newFavoriteRecipes),
    );
    setIsFavorite(true);
  }
};

export default toggleFavorite;
