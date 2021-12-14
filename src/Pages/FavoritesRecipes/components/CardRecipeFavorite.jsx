import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BtnsFavoriteAndShare from './BtnsFavoriteAndShare';

export default function CardRecipeFavorite({ recipe, index, setFavoritesRecipes }) {
  const { image, category, name, id, area, type, alcoholicOrNot } = recipe;

  const categoryAndArea = (
    <p data-testid={ `${index}-horizontal-top-text` }>
      { `${area} - ${category}` }
    </p>
  );

  const alcoholic = (
    <p data-testid={ `${index}-horizontal-top-text` }>
      { `${alcoholicOrNot} - ${category}` }
    </p>
  );

  return (
    <div className="favorite-recipe-card">

      <Link to={ `${type}s/${id}` } className="favorite-recipe-img">
        <img
          alt={ `Foto ${name}` }
          className="img-recipe-favorite"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
        />
      </Link>

      <section className="favorite-recipe-info">
        <Link to={ `${type}s/${id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>
            { name }
          </h4>
        </Link>

        <div className="category-or-alcoholic">
          { type === 'comida' ? categoryAndArea : alcoholic }
        </div>

      </section>
      <div className="favorite-recipes-btns">
        <BtnsFavoriteAndShare
          id={ id }
          index={ index }
          setFavoritesRecipes={ setFavoritesRecipes }
          type={ type }
        />
      </div>

    </div>
  );
}

CardRecipeFavorite.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setFavoritesRecipes: PropTypes.func.isRequired,
};
