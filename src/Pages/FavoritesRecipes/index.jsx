import React, { useState, useEffect } from 'react';

import ButtonsFilter from '../../Components/ButtonsFilter';
import CardRecipeFavorite from './components/CardRecipeFavorite';
import Header from '../../Components/Header';

import { GetLocalStorage } from '../../Helper/ToLocalStorage';

import './styles/favoriteRecipes.css';

function FavoritesRecipes() {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipesStorage = GetLocalStorage('favoriteRecipes') || [];

    setFavoritesRecipes(favoriteRecipesStorage);
  }, []);

  return (
    <main className="favorite-recipes">
      <Header disabledSearch>
        Favotite Recipes
      </Header>

      <section className="favorite-recipes-section">
        <ButtonsFilter
          setArray={ setFavoritesRecipes }
          localStorageKey="favoriteRecipes"
        />

        <div className="favorite-recipes-container">
          {
            favoritesRecipes.map((recipe, index) => (
              <CardRecipeFavorite
                index={ index }
                key={ index }
                recipe={ recipe }
                setFavoritesRecipes={ setFavoritesRecipes }
              />
            ))
          }
        </div>
      </section>
    </main>
  );
}

export default FavoritesRecipes;
