import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [searchInputText, setSearchInputText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [screen, setScreen] = useState('');
  const [endpoint, setEndpoint] = useState('');

  // Tela Profile:
  const [userEmailProvider, setUserEmailProvider] = useState('');

  const context = useMemo(() => ({
    searchInputText,
    setSearchInputText,
    recipes,
    setRecipes,
    screen,
    setScreen,
    endpoint,
    setEndpoint,
    userEmailProvider,
    setUserEmailProvider,
  }), [searchInputText,
    setSearchInputText,
    recipes,
    setRecipes,
    screen, setScreen, endpoint, setEndpoint, userEmailProvider, setUserEmailProvider]);

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
