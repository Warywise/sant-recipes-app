import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import BtnFavoriteRecipe from '../Details/components/BtnFavoriteRecipe';
import Button from '../../Components/Button';
import RenderIngredientCheckboxes from './components/RenderIngredientCheckboxes';

import requestApi from '../../Services/requestApi';
import UrlIncludes from '../../Helper/UrlIncludes';
import { ToLocalStorage, GetLocalStorage } from '../../Helper/ToLocalStorage';

function InProgressRecipe({ match: { url }, history: { goBack } }) {
  const { id } = useParams();
  const [foodData, setFoodData] = useState({});
  const [remainingIngredients, setRemainingIngredients] = useState(['to disable btn']);

  useEffect(() => {
    async function fetchFood() {
      const links = {
        foodLink: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        drinkLink: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      };

      const URL_API = UrlIncludes(url, 'comidas', links.foodLink, links.drinkLink);
      const resolve = await requestApi(URL_API);
      const fetchResult = resolve.meals || resolve.drinks;
      setFoodData(fetchResult[0]);
    }

    fetchFood();
  }, [id, url]);

  function finishRecipe(recipe) {
    const idRecipe = recipe.idMeal || recipe.idDrink;
    const name = recipe.strMeal || recipe.strDrink;
    const image = recipe.strMealThumb || recipe.strDrinkThumb;
    const { strArea, strCategory: category, strAlcoholic,
      strTags: tags } = recipe;

    const getDate = Date();
    const date = new Date(getDate);
    const doneDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const recipeObject = {
      id: idRecipe,
      type: UrlIncludes(url, 'comidas', 'comida', 'bebida'),
      area: strArea || '',
      category,
      alcoholicOrNot: strAlcoholic || '',
      name,
      image,
      doneDate,
      tags,
    };

    const doneRecipes = GetLocalStorage('doneRecipes');
    ToLocalStorage('doneRecipes', [...doneRecipes, recipeObject]);
  }

  return (
    <main className="details">
      <section className="recipe-informations">
        <header className="header-details">
          <Button onClick={ () => goBack() }>
            ↶
          </Button>
          <img
            className="foodPhoto"
            src={ foodData.strMealThumb || foodData.strDrinkThumb }
            data-testid="recipe-photo"
            alt="food/drinks"
          />
          <h1 data-testid="recipe-title">
            { foodData.strMeal || foodData.strDrink }
          </h1>
        </header>

        <div className="share-and-favorite">
          <Button dataTestId="share-btn">
            Share
          </Button>
          <BtnFavoriteRecipe
            id={ id }
            url={ url }
            foodData={ foodData }
          />
        </div>

        <div className="is-alcoholic">
          {
            (foodData.strAlcoholic) ? (
              <>
                <p>{ foodData.strCategory }</p>
                <p data-testid="recipe-category">{foodData.strAlcoholic}</p>
              </>
            )
              : <p data-testid="recipe-category">{foodData.strCategory}</p>
          }
        </div>

        <ol>
          <RenderIngredientCheckboxes
            data={ foodData }
            url={ url }
            id={ id }
            setArrayState={ setRemainingIngredients }
          />
        </ol>

        <p data-testid="instructions">
          Instructions:
          {foodData.strInstructions}
        </p>
      </section>

      <footer>
        <Button
          disabled={ remainingIngredients.length > 0 }
          onClick={ () => finishRecipe(foodData) }
          dataTestId="finish-recipe-btn"
          hasLink="/receitas-feitas"
        >
          Finish Recipe
        </Button>
      </footer>
    </main>
  );
}

InProgressRecipe.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape(PropTypes.func).isRequired,
};

export default InProgressRecipe;
