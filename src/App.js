import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import DetailsProvider from './context/DetailsProvider';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <DetailsProvider>
      <Provider>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => <Login { ...props } /> }
          />
          <Route
            exact
            path="/meals"
            render={ (props) => <Recipes { ...props } /> }
          />
          <Route
            exact
            path="/drinks"
            render={ (props) => <Recipes { ...props } /> }
          />
          <Route
            exact
            path="/profile"
            render={ (props) => <Profile { ...props } /> }
          />
          <Route
            exact
            path="/done-recipes"
            render={ (props) => <DoneRecipes { ...props } /> }
          />
          <Route
            exact
            path="/favorite-recipes"
            render={ (props) => <FavoriteRecipes { ...props } /> }
          />
          <Route
            exact
            path="/meals/:id/in-progress"
            render={ (props) => <RecipeInProgress { ...props } /> }
          />
          <Route
            exact
            path="/drinks/:id/in-progress"
            render={ (props) => <RecipeInProgress { ...props } /> }
          />
          <Route
            exact
            path="/:recipe/:id"
            render={ (props) => <RecipeDetails { ...props } /> }
          />
        </Switch>
      </Provider>
    </DetailsProvider>
  );
}

export default App;
