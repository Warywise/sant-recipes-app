import React, { useState, useEffect } from 'react';
import ButtonsFilter from '../Components/ButtonsFilter';

import CardRecipeFavorite from '../Components/CardRecipeFavorite';
import Header from '../Components/Header';

import { GetLocalStorage } from '../Helper/ToLocalStorage';

import '../Styles/favoriteRecipes.css';

function FavoritesRecipes() {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipesStorage = GetLocalStorage('favoriteRecipes');

    setFavoritesRecipes(favoriteRecipesStorage);
  }, []);

  return (
    <main className="FavoritesRecipes">
      <Header
        disabledSearch
      >
        Receitas Favoritas
      </Header>

      <article className="main-content-favorite-recipes">
        <ButtonsFilter
          setArray={ setFavoritesRecipes }
          keyLocalStorage="favoriteRecipes"
        />

        <section className="recipes-container">
          {
            favoritesRecipes.map((recipe, index) => (
              <CardRecipeFavorite
                setFavoritesRecipes={ setFavoritesRecipes }
                key={ index }
                recipe={ recipe }
                index={ index }
              />
            ))
          }
        </section>
      </article>
    </main>
  );
}

export default FavoritesRecipes;
