import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import Context from './Context';

function Provider({ children }) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchInputText, setSearchInputText] = useState('');
  const [listedCategories, setListedCategories] = useState({});
  const [listedRecipes, setListedRecipes] = useState([]);
  const [actualCateg, setActualCateg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [radioSelected, setRadioSelected] = useState('');
  const [toggleAllClick, setToggleAllClick] = useState(false);
  const [locationRecipe, setLocationRecipe] = useState('');

  const history = useHistory();
  const location = useLocation().pathname;
  const screen = location.slice(1).toLowerCase();
  const screenWithoutLowerCase = location.slice(1).replace('s', '');
  const magic3 = 3;
  const URL = location === '/meals' ? 'https://www.themealdb.com/api/json/v1/1' : 'https://www.thecocktaildb.com/api/json/v1/1';
  const URLCategories = location === '/meals' ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list' : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const URLRecipesByCategory = location === '/meals' ? 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  const sorryString = 'Sorry, we haven\'t found any recipes for these filters.';

  const fetchRecipesByCategory = async (param) => {
    const responseRecipeCateg = await fetch(`${URLRecipesByCategory}${param}`);
    const data = await responseRecipeCateg.json();
    if (data === null) {
      return;
    }
    setListedRecipes(data.meals || data.drinks);
  };

  async function fetchRecipesByIngredient() {
    const responseIngredient = await fetch(`${URL}/filter.php?i=${searchInputText}`);
    const data = await responseIngredient.json();
    if (data[screen] === null) {
      global.alert(sorryString);
      return;
    }
    setListedRecipes(data[screen]);
  }

  async function fetchRecipesByName() {
    const responseName = await fetch(`${URL}/search.php?s=${searchInputText}`);
    const data1 = await responseName.json();
    if (data1[screen] === null) {
      global.alert(sorryString);
      return;
    }
    if (data1[screen].length === 1) {
      const id = `id${screenWithoutLowerCase}`;
      const thirdChar = id.charAt(2).toUpperCase();
      const modifiedId = id.slice(0, 2) + thirdChar + id.slice(magic3);
      history.push(`/${screen}/${data1[screen][0][modifiedId]}`);
    }
    setListedRecipes(data1[screen]);
  }

  async function fetchRecipesByFirstLetter() {
    if (searchInputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const responseFLetter = await fetch(`${URL}/search.php?f=${searchInputText}`);
    const data2 = await responseFLetter.json();
    if (data2[screen] === null) {
      global.alert(sorryString);
      return;
    }
    setListedRecipes(data2[screen]);
  }

  async function fetchDefaultRecipes() {
    const responseCateg = await fetch(URLCategories);
    const dataCateg = await responseCateg.json();
    if (dataCateg !== null) {
      setListedCategories(dataCateg);
    }
    const response = await fetch(`${URL}/search.php?s=`);
    const data3 = await response.json();
    if (data3[screen] && data3[screen].length > 0) {
      setListedRecipes(data3[screen]);
    }
  }

  async function fetchApi() {
    switch (radioSelected) {
    case 'Ingredient':
      await fetchRecipesByIngredient();
      break;
    case 'Name':
      await fetchRecipesByName();
      break;
    case 'First Letter':
      await fetchRecipesByFirstLetter();
      break;
    default:
      await fetchDefaultRecipes();
      break;
    }
    setLoading(false);
  }

  useEffect(() => {
    if (location === '/meals' || location === '/drinks') {
      setLoading(true);
      fetchApi();
    }
  }, [radioSelected, location, toggleAllClick]);

  // useEffect(() => {
  //   if (location === '/meals' || location === '/drinks') {
  //     setLoading(true);
  //     fetchApi();
  //   }
  // }, [location]);

  const context = useMemo(() => ({
    locationRecipe,
    setLocationRecipe,
    radioSelected,
    setRadioSelected,
    filteredRecipes,
    setFilteredRecipes,
    searchInputText,
    setSearchInputText,
    listedRecipes,
    setListedRecipes,
    loading,
    setLoading,
    listedCategories,
    setListedCategories,
    fetchRecipesByCategory,
    toggleAllClick,
    setToggleAllClick,
    actualCateg,
    setActualCateg,
  }), [searchInputText, setSearchInputText, filteredRecipes, setFilteredRecipes,
    listedRecipes, setListedRecipes, loading, setLoading,
    radioSelected, setRadioSelected, listedCategories, setListedCategories,
    fetchRecipesByCategory, toggleAllClick, setToggleAllClick,
    actualCateg, setActualCateg, locationRecipe, setLocationRecipe]);

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
