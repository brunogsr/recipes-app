import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

describe('Testando o componente "Header"', () => {
  it('Verifica se possui um título, um botão de perfil e um botão de pesquisa', () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonSearch = screen.getByTestId('search-top-btn');
    const title = screen.getByRole('heading', { name: /meals/i });
    const buttonProfile = screen.getByTestId('profile-top-btn');

    expect(title).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de perfil, é redirecionado para a página correta', () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonProfile = screen.getByRole('img', { name: /profile-icon/i });

    userEvent.click(buttonProfile);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica se ao clicar no botão de busca pela primeira vez, a barra de busca aparece e clicando novamente, ela desaparece', () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonSearch = screen.getByRole('img', { name: /search-icon/i });

    userEvent.click(buttonSearch);
    const input = screen.getByTestId('search-input');
    expect(input).not.toBeDisabled();

    userEvent.click(buttonSearch);
    expect(input).not.toBeInTheDocument();
  });

  it('Verifica o funcionamento do input', () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const buttonSearch = screen.getByRole('img', { name: /search-icon/i });

    userEvent.click(buttonSearch);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'example');
    expect(searchInput).toHaveValue('example');
  });
});
