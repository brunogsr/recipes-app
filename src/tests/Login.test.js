import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login';

describe('Testando a página de Login ', () => {
  it('Verifica se o botão de login está desabilitado e se habilita conforme os inputs são validados', () => {
    render(<Login />);
    const email = 'alguem@alguem.com';
    const loginButton = screen.getByTestId('login-submit-btn');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(loginButton).toBeDisabled();

    act(() => {
      userEvent.type(emailInput, email);
      userEvent.type(passwordInput, '1234567');
    });

    expect(loginButton).not.toBeDisabled();
  });

  it('Verifica se ao clicar no botão de login, o localStorage é atualizado com o email digitado e é renderizado à página "Meals"', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Login />
      </Router>,
    );
    const email = 'alguem@alguem.com';
    const loginButton = screen.getByTestId('login-submit-btn');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    await waitFor(() => expect(history.location.pathname).toBe('/meals'));

    expect(localStorage.getItem('user')).toBe(JSON.stringify({ email }));
  });
});
