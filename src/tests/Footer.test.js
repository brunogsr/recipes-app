import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

describe('Testando o componente "Footer"', () => {
  it('Verifica se possui um botão de bebidas e um botão de comidas', () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');

    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
  });
});

// //   it('Verifica se ao clicar na imagem do botão de drinks, é redirecionado para a página correta', async () => {
// //     const history = createMemoryHistory();
// //     history.push('/meals');
// //     render(
// //       <Router history={ history }>
// //         <App />
// //       </Router>,
// //     );
// //     const drinksButton = screen.getByTestId('drinks-bottom-btn');

// //     userEvent.click(drinksButton);

// //     await waitFor(() => {
// //       expect(history.location.pathname).toBe('/meals');
// //     });
// //   });

// //   it('Verifica se ao clicar na imagem do botão de pesquisa, é redirecionado para a página correta', async () => {
// //     const history = createMemoryHistory();
// //     history.push('/meals');
// //     render(
// //       <Router history={ history }>
// //         <App />
// //       </Router>,
// //     );
// //     const mealsButton = screen.getByTestId('meals-bottom-btn');

// //     userEvent.click(mealsButton);

// //     await waitFor(() => {
// //       expect(history.location.pathname).toBe('/meals');
// //     });
// //   });
