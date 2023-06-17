import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { meals } from '../../cypress/mocks/meals';

describe('Testando o componente "SearchBar"', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(jest.restoreAllMocks);

  const dataTestRadio = 'name-search-radio';

  it('Verifica se é renderizado os elementos corretamente', () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const nameRadio = screen.getByTestId(dataTestRadio);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('Verifica se os elementos radios estão funcionando', () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const nameRadio = screen.getByTestId(dataTestRadio);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    userEvent.type(ingredientRadio, { target: { value: 'Ingredient' } });
    expect(ingredientRadio.checked).toBe(true);

    userEvent.type(nameRadio, { target: { value: 'Name' } });
    expect(nameRadio.checked).toBe(true);

    userEvent.type(firstLetterRadio, { target: { value: 'First Letter' } });
    expect(firstLetterRadio.checked).toBe(true);
  });

  it('Verifica se ao selecionar um nome de comida, é redirecionado para a página correta', async () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const nameRadio = screen.getByTestId(dataTestRadio);
    const imgSearch = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(imgSearch);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Sushi');

    userEvent.type(nameRadio, { target: { value: 'Name' } });

    const buttonSearch = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53065');
    });
  });
});
