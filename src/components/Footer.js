import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="pin-footer-to-bottom" data-testid="footer">
      <a // troquei para tag <a /> ao invés de Link pois o cypress solicita esta tag
        href="/meals"
        data-testid="meals-bottom-btn"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="meals" />
      </a>
      <a
        href="/drinks"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drinks" />
      </a>
    </footer>
  );
}

export default Footer;
