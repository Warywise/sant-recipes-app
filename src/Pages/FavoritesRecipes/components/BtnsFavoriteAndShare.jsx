import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { FaHeart } from 'react-icons/fa';

import Button from '../../../Components/Button';

import { ToLocalStorage, GetLocalStorage } from '../../../Helper/ToLocalStorage';

import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import shareIcon from '../../../images/shareIcon.svg';

export default function BtnsFavoriteAndShare({ index, id, setFavoritesRecipes, type }) {
  const [shareLink, setShareLink] = useState(false);

  function removeFavorite() {
    const favoriteRecipes = GetLocalStorage('favoriteRecipes') || [];

    const listFavoritesRemoveRecipe = favoriteRecipes
      .filter((recipeItem) => recipeItem.id !== id);

    ToLocalStorage('favoriteRecipes', listFavoritesRemoveRecipe);
    setFavoritesRecipes(listFavoritesRemoveRecipe);
  }

  function copyLink() {
    const TIMEOUT = 2000;

    copy(`https://sant-recipes-app.herokuapp.com/${type}s/${id}`);

    setShareLink(true);
    setTimeout(() => setShareLink(false), TIMEOUT);
  }

  const shareImage = (<img src={ shareIcon } alt="share" />);

  return (
    <>
      <Button
        className="share-btn"
        dataTestId={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ copyLink }
      >
        { shareLink ? 'Link copiado!' : shareImage }
      </Button>

      <Button
        className="btn-click favorite-btn"
        dataTestId={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
        onClick={ removeFavorite }
      >
        <img src={ blackHeartIcon } alt="favorite" className="hidden-heart" />
        <FaHeart className="full-heart" size="1.8em" />
      </Button>
    </>
  );
}

BtnsFavoriteAndShare.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setFavoritesRecipes: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
