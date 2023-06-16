import { render, waitFor, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import Recipes from '../pages/Recipes';
import Provider from '../context/Provider';
import DetailsProvider from '../context/DetailsProvider';

describe('Testando a página de pricipais Receitas', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(jest.restoreAllMocks);

  it('Verifica se é renderizado as principais receitas de comidas, uma em cada card', async () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <DetailsProvider>
          <Provider>
            <Recipes />
          </Provider>
        </DetailsProvider>
      </Router>,
    );
    const meals0 = await screen.findByText(/corba/i);
    const meals1 = screen.getByTestId('1-card-name');
    const meals2 = screen.getByTestId('2-card-name');

    waitFor(() => {
      expect(meals0).toBeInTheDocument();
      expect(meals1).toBeInTheDocument();
      expect(meals2).toBeInTheDocument();
    });
  });

  it('Verifica se ao clicar em um card, é encaminhado para a página específica dos detalhes da receita', async () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <DetailsProvider>
          <Provider>
            <Recipes />
          </Provider>
        </DetailsProvider>
      </Router>,
    );
    const meals0 = screen.getByRole('img', { name: /corba/i });
    userEvent.click(meals0);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52977');
    });
  });

  it('Verifica se ao clicar em um dos botões de filtro por categoria, é encaminhado para a página específica', () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <DetailsProvider>
          <Provider>
            <Recipes />
          </Provider>
        </DetailsProvider>
      </Router>,
    );
  });
});

describe('Testando a página de principais Bebidas', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
  });

  afterEach(jest.restoreAllMocks);

  it('Verifica se é renderizado as principais receitas de bebidas, uma em cada card', async () => {
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
    const meals0 = await screen.findByTestId('0-card-name');
    const meals1 = screen.getByTestId('1-card-name');
    const meals2 = screen.getByTestId('2-card-name');

    waitFor(() => {
      expect(meals0).toBeInTheDocument();
      expect(meals1).toBeInTheDocument();
      expect(meals2).toBeInTheDocument();
    });
  });

  it('Verifica se ao clicar em um card, é encaminhado para a página específica dos detalhes da receita', async () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <DetailsProvider>
          <Provider>
            <Recipes />
          </Provider>
        </DetailsProvider>
      </Router>,
    );
  });
  it('Verifica se ao clicar em um dos botões de filtro por categoria, é encaminhado para a página específica', () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <DetailsProvider>
          <Provider>
            <Recipes />
          </Provider>
        </DetailsProvider>
      </Router>,
    );
  });
});
