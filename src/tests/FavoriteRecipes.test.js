import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import FavoriteRecipes from '../pages/FavoriteRecipes';

jest.mock('../components/Header', () => function MockedHeader() {
  return <div data-testid="mocked-header" />;
});

const mockFavoriteRecipes = [
  {
    alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    type: 'drink',
  },
  {
    id: '17222',
    type: 'drink',
    nationality: null,
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  },
  {
    id: '17225',
    type: 'drink',
    nationality: null,
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Ace',
    image: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',
  },
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: null,
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '53060',
    type: 'meal',
    nationality: 'Croatian',
    category: 'Side',
    alcoholicOrNot: null,
    name: 'Burek',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  },
];

describe('Testando FavoriteRecipes Page', () => {
  it('Verifica se os botões All, Meals e Drinks estão presentes', () => {
    render(<FavoriteRecipes />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonMeals = screen.getByRole('button', { name: /meals/i });
    const buttonDrinks = screen.getByRole('button', { name: /drinks/i });

    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão drinks, a receita com o nome Burek não é mais exibido na tela', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));

    await act(async () => {
      render(
        <MemoryRouter>
          <FavoriteRecipes />
        </MemoryRouter>,
      );
    });

    const buttonDrinks = screen.getByRole('button', { name: /drinks/i });

    await waitFor(() => {
      const recipeGG = screen.queryByText('GG');
      const recipeA1 = screen.queryByText('A1');
      const recipeAce = screen.queryByText('Ace');

      const recipeBurek = screen.queryByText('Burek');
      const recipeCorba = screen.queryByText('Corba');

      expect(recipeBurek).toBeInTheDocument();
      expect(recipeCorba).toBeInTheDocument();

      userEvent.click(buttonDrinks);

      expect(recipeBurek).not.toBeInTheDocument();
      expect(recipeCorba).not.toBeInTheDocument();

      expect(recipeGG).toBeInTheDocument();
      expect(recipeA1).toBeInTheDocument();
      expect(recipeAce).toBeInTheDocument();
    });
  });

  it('Verifica se ao clicar no botão de desfavoritar da primeira receita essa mesma receita é removida da lista de receitas favoritas', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));

    await act(async () => {
      render(
        <MemoryRouter>
          <FavoriteRecipes />
        </MemoryRouter>,
      );
    });

    const favoriteButtons = screen.getAllByTestId(/-horizontal-favorite-btn/);

    const recipeGG = screen.queryByText('GG');
    expect(recipeGG).toBeInTheDocument();

    const firstFavoriteButton = favoriteButtons[0];
    userEvent.click(firstFavoriteButton);

    expect(recipeGG).not.toBeInTheDocument();
  });
});
