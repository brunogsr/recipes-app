import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Profile from '../pages/Profile';

describe('Testando a página de Profile ', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('', async () => {
    const email = 'test@example.com';
    localStorage.setItem('user', JSON.stringify({ email }));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toHaveTextContent(email);
  });
});
