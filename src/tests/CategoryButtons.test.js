import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import Recipes from '../pages/Recipes';
import Provider from '../context/Provider';
import DetailsProvider from '../context/DetailsProvider';

describe('Testando o componente "CategoryButtons" na página de comidas', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
  });

  afterEach(jest.restoreAllMocks);

  it('Verifica se é renderizado os botões de busca por categorias corretamente', async () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <Provider>
          <DetailsProvider>
            <Recipes />
          </DetailsProvider>
        </Provider>
      </Router>,
    );
    const allButton = await screen.findByTestId('All-category-filter');
    const beefButton = screen.getByTestId('Beef-category-filter');
    const breakfastButton = screen.getByTestId('Breakfast-category-filter');
    const chickenButton = screen.getByTestId('Chicken-category-filter');
    const dessertButton = screen.getByTestId('Dessert-category-filter');
    const goatButton = screen.getByTestId('Goat-category-filter');

    waitFor(() => {
      expect(allButton).toBeInTheDocument();
      expect(beefButton).toBeInTheDocument();
      expect(breakfastButton).toBeInTheDocument();
      expect(chickenButton).toBeInTheDocument();
      expect(dessertButton).toBeInTheDocument();
      expect(goatButton).toBeInTheDocument();
    });
  });
});

describe('Testando o componente "CategoryButtons" na página de bebidas', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });
  });

  afterEach(jest.restoreAllMocks);

  it('Verifica se é renderizado os botões de busca por categorias corretamente', async () => {
    const history = createMemoryHistory();
    history.push('/drinks');
    render(
      <Router history={ history }>
        <Provider>
          <DetailsProvider>
            <Recipes />
          </DetailsProvider>
        </Provider>
      </Router>,
    );
    const allButton = await screen.findByTestId('All-category-filter');
    const ordinaryDrinkButton = screen.getByTestId('Ordinary Drink-category-filter');
    const cocktailButton = screen.getByTestId('Cocktail-category-filter');
    const shakeButton = screen.getByTestId('Shake-category-filter');
    // const otherButton = screen.getByText('Other Unknown');
    const cocoaButton = screen.getByTestId('Cocoa-category-filter');

    waitFor(() => {
      expect(allButton).toBeInTheDocument();
      expect(ordinaryDrinkButton).toBeInTheDocument();
      expect(cocktailButton).toBeInTheDocument();
      expect(shakeButton).toBeInTheDocument();
      // expect(otherButton).toBeInTheDocument();
      expect(cocoaButton).toBeInTheDocument();
    });
  });
});
