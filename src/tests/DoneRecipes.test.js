import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';

jest.mock('../components/Header', () => function MockedHeader() {
  return <div data-testid="mocked-header" />;
});

const mockDoneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '6/15/2023',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    doneDate: '2023-06-15T19:59:51.761Z',
    tags: [],
  },
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '6/15/2023',
    tags: ['Soup'],
  },
];

describe('Testando DoneRecipes Page', () => {
  it('Verifica se ao clicar no botão Meals, apenas as receitas do tipo Meal aparecem na tela', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));

    await act(async () => {
      render(
        <MemoryRouter>
          <DoneRecipes />
        </MemoryRouter>,
      );
    });

    const buttonMeals = screen.getByRole('button', { name: /meals/i });

    const recipeA1 = screen.queryByText('A1');
    const recipeSpicyArrabiataPenne = screen.queryByText('Spicy Arrabiata Penne');

    expect(recipeA1).toBeInTheDocument();
    expect(recipeSpicyArrabiataPenne).toBeInTheDocument();

    userEvent.click(buttonMeals);

    expect(screen.queryByText('A1')).toBeNull();
    expect(recipeSpicyArrabiataPenne).toBeInTheDocument();
  });
});
