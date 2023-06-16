import PropTypes from 'prop-types';
import React, {
  // useEffect,
  useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsContext from './DetailsContext';

function DetailsProvider({ children }) {
  const [globalRecipeId, setGlobalRecipeId] = useState('');
  const [fetchRecipeById, setFetchRecipeById] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation().pathname;

  const fetchDetailsById = async (param) => {
    const URL = location.includes('/meals')
      ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
      : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    const responseRecipeCateg = await fetch(`${URL}${param}`);
    const data = await responseRecipeCateg.json();
    if (data === null) {
      return;
    }
    setFetchRecipeById(data.meals || data.drinks);
    setLoading(false);
  };

  // useEffect(() => {
  //   if (globalRecipeId) {
  //     fetchDetailsById(globalRecipeId);
  //   }
  // }, [globalRecipeId]);

  const initialState = useMemo(() => ({
    loading,
    setLoading,
    fetchDetailsById,
    fetchRecipeById,
    setFetchRecipeById,
    globalRecipeId,
    setGlobalRecipeId,
  }), [fetchRecipeById, setFetchRecipeById, fetchDetailsById,
    loading, setLoading, globalRecipeId, setGlobalRecipeId]);

  return (
    <DetailsContext.Provider value={ initialState }>
      <div>{children}</div>
    </DetailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsProvider;
