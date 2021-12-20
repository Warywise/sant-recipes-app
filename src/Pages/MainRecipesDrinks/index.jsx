import React, { useContext, useEffect, useState } from 'react';

import Header from '../../Components/Header';
import CardRecipe from '../../Components/CardRecipe';
import Footer from '../../Components/Footer';

import { MyContext } from '../../Context/MyContext';
import requestApi from '../../Services/requestApi';
import Loading from '../../Components/Loading';

function MainRecipesDrinks() {
  const { data, filterUrl, setFilterUrl, drinkCategories } = useContext(MyContext);
  const [isLoading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filters, setFilters] = useState({});
  const [recipes, setRecipes] = useState([]);

  const CATEGORY_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  const INITIAL_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const maxLength = 5;
  const maxIndex = 12;
  const TIME_OUT = 1000;

  useEffect(() => {
    if (!filterUrl.includes('cocktail')) {
      setFilterUrl(INITIAL_URL);
    }
  }, [filterUrl, setFilterUrl]);

  useEffect(() => {
    if (data.length > 0) {
      setRecipes([...data]);
      setTimeout(() => setLoading(false), TIME_OUT);
    }
  }, [data]);

  useEffect(() => {
    const categoriesArray = {};
    if (drinkCategories.length > 0) {
      drinkCategories.forEach((category) => {
        categoriesArray[category] = [];
      });
      setFilters(categoriesArray);
    }
  }, [drinkCategories]);

  async function handleFilter(category) {
    setLoading(true);
    function getFilteredRecipes() {
      return requestApi(`${CATEGORY_URL}${category}`)
        .then((result) => {
          setFilters({ ...filters, [category]: result.drinks });
          return result.drinks;
        });
    }

    let filterResult = [...data];
    if (category === selectedFilter) {
      setSelectedFilter('');
    } else {
      filterResult = filters[category].length > 0
        ? [...filters[category]]
        : await getFilteredRecipes();

      setSelectedFilter(category);
    }

    setRecipes(filterResult);
    setTimeout(() => setLoading(false), TIME_OUT);
  }

  return (
    <main className="main-recipes">
      <Header>
        Drinks
      </Header>
      <section className="recipes-filter">
        <button
          type="button"
          onClick={ () => handleFilter(selectedFilter) }
          data-testid="All-category-filter"
        >
          All
        </button>
        { drinkCategories.length > 0 && drinkCategories.map((category, ind) => (
          ind < maxLength ? (
            <button
              key={ category }
              data-testid={ `${category}-category-filter` }
              type="button"
              onClick={ () => handleFilter(category) }
            >
              { category }
            </button>
          ) : null
        )) }
      </section>

      <section className="recipes-section">
        { isLoading ? <Loading />
          : recipes.slice(0, maxIndex)
            .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
              <CardRecipe
                key={ `${index}${idDrink}` }
                pathName="/bebidas"
                id={ idDrink }
                testId={ `${index}-recipe-card` }
                testIdTitle={ `${index}-card-name` }
                testIdImg={ `${index}-card-img` }
                recipeImg={ strDrinkThumb }
                recipeName={ strDrink }
              />
            )) }
      </section>
      <Footer />
    </main>
  );
}

export default MainRecipesDrinks;
