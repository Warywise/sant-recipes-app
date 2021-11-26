import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

import { ToLocalStorage, GetLocalStorage } from '../../../Helper/ToLocalStorage';
import GetObjectToFavorite from '../../../Helper/GetObjectToFavorite';

import Button from '../../../Components/Button';

import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';

function BtnFavoriteRecipe({ id, dataTestId, url, foodData, className }) {
  const [iconFavorite, setIconFavorite] = useState(false);

  useEffect(() => {
    function verifyRecipeInFavorites() {
      const favoriteRecipes = GetLocalStorage('favoriteRecipes') || [];
      const inFavoriteOrNot = favoriteRecipes.some((recipe) => recipe.id === id);
      return inFavoriteOrNot;
    }

    setIconFavorite(verifyRecipeInFavorites());
  }, [id]);

  function addToFavorite() {
    const favoriteRecipes = GetLocalStorage('favoriteRecipes') || [];
    const newRecipe = GetObjectToFavorite(foodData, url);

    setIconFavorite(!iconFavorite);

    const inFavoriteOrNot = favoriteRecipes.some((recipe) => recipe.id === id);

    if (inFavoriteOrNot) {
      const listFavoritesRemoveRecipe = favoriteRecipes
        .filter((recipe) => recipe.id !== id);

      return ToLocalStorage('favoriteRecipes', listFavoritesRemoveRecipe);
    }

    return ToLocalStorage('favoriteRecipes', [...favoriteRecipes, newRecipe]);
  }

  return (
    <Button
      dataTestId={ dataTestId }
      onClick={ addToFavorite }
      className={ className }
      src={ iconFavorite ? blackHeartIcon : whiteHeartIcon }
    >
      <img
        src={ iconFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite Icon"
        width="0"
      />
      { iconFavorite ? <FaHeart className="full-heart" size="1.8em" />
        : <FaRegHeart className="empty-heart" size="1.8em" /> }
    </Button>
  );
}

BtnFavoriteRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  foodData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BtnFavoriteRecipe;
