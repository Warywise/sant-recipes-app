import React from 'react';

import Header from '../../Components/Header';
import Button from '../../Components/Button';
import Footer from '../../Components/Footer';

import './style/Explore.css';

function RecipesExplorer() {
  return (
    <main className="recipes-explorer">
      <Header
        disabledSearch
      >
        Explorer
      </Header>
      <Button
        className="btn-click explorer-btn"
        dataTestId="explore-food"
        hasLink="/explorar/comidas"
      >
        Explore Foods
      </Button>
      <Button
        className="btn-click explorer-btn"
        dataTestId="explore-drinks"
        hasLink="/explorar/bebidas"
      >
        Explore Drinks
      </Button>
      <Footer />
    </main>
  );
}

export default RecipesExplorer;
