import React from 'react';
import { Link } from 'react-router-dom';
import { FaCocktail } from 'react-icons/fa';
import { GiCompass, GiForkKnifeSpoon } from 'react-icons/gi';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Styles/Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="drink page"
          data-testid="drinks-bottom-btn"
          width="0"
        />
        <FaCocktail className="btn-click footer-icons" size="2.5em" />
      </Link>
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="explore page"
          data-testid="explore-bottom-btn"
          width="0"
        />
        <GiCompass className="btn-click footer-icons" size="2.5em" />
      </Link>
      <Link to="/comidas">
        <img
          src={ mealIcon }
          alt="food page"
          data-testid="food-bottom-btn"
          width="0"
        />
        <GiForkKnifeSpoon className="btn-click footer-icons" size="2.5em" />
      </Link>
    </footer>
  );
}

export default Footer;
