import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import Carousel from '../Components/Carousel';
import Button from '../Components/Button';
import BtnFavoriteRecipe from '../Components/BtnFavoriteRecipe';
import VideoIframe from '../Components/VideoIframe';
import BtnInitOrContinueRecipe from '../Components/BtnInitOrContinueRecipe';

import '../Styles/Details.css';

import requestApi from '../Services/requestApi';
// 178319 bebida
// 52977 comida

function Details({ match: { url } }) {
  const { id } = useParams();
  const [foodData, setFoodData] = useState({});

  async function fetchFood() {
    const links = {
      foodLink: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      drinkLink: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    };

    const URL_API = url.includes('comidas') ? links.foodLink : links.drinkLink;
    const resolve = await requestApi(URL_API);
    const fetchResult = resolve.meals || resolve.drinks;
    setFoodData(fetchResult[0]);
  }

  useEffect(() => {
    fetchFood();
  }, []);

  function getIngredients() {
    const keysFoodData = Object.keys(foodData);
    const keysIngredients = keysFoodData.filter((key) => key.includes('strIngredient'));
    const keysMeasureData = Object.keys(foodData);
    const keysMeasures = keysMeasureData.filter((key) => key.includes('strMeasure'));
    return keysIngredients
      .map((ingredient, index) => {
        const item = foodData[ingredient];
        const measure = foodData[keysMeasures[index]];
        return {
          item, measure,
        };
      });
  }

  function filterIngredients() {
    const ingredientsArray = getIngredients();

    return ingredientsArray.map(({ item, measure }, index) => (
      item === '' || !item ? null
        : (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${item}: ${measure || 'to taste'}`}
          </li>)
    ));
  }

  useEffect(() => {
    filterIngredients();
  }, [foodData]);

  return (
    <main className="details">
      <section className="recipe-informations">
        <header className="header-details">
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
          { filterIngredients() }
        </ol>

        <p data-testid="instructions">
          Instructions:
          {foodData.strInstructions}
        </p>
      </section>

      <VideoIframe data={ foodData } />
      <Carousel url={ url } />
      <footer>
        <BtnInitOrContinueRecipe
          id={ id }
          url={ url }
          ingredients={ getIngredients() }
        />
      </footer>
    </main>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default Details;
