import React, { useContext, useEffect, useState } from 'react';

import CardRecipe from '../../Components/CardRecipe';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';

import { MyContext } from '../../Context/MyContext';
import requestApi from '../../Services/requestApi';

function MainRecipes() {
  const { data, filterUrl, setFilterUrl, mealCategories } = useContext(MyContext);
  const [isLoading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filters, setFilters] = useState({});
  const [recipes, setRecipes] = useState([]);

  const CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const INITIAL_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const maxLength = 5;
  const maxIndex = 12;
  const TIME_OUT = 1000;

  useEffect(() => {
    if (!filterUrl.includes('meal')) {
      setFilterUrl(INITIAL_URL);
    }
  }, [filterUrl, setFilterUrl]);

  useEffect(() => {
    setLoading(true);
    if (data.length > 0) {
      setRecipes([...data]);
      setTimeout(() => setLoading(false), TIME_OUT);
    }
  }, [data]);

  useEffect(() => {
    const categoriesArray = {};
    if (mealCategories.length > 0) {
      mealCategories.forEach((category) => {
        categoriesArray[category] = [];
      });
      setFilters(categoriesArray);
    }
  }, [mealCategories]);

  async function handleFilter(category) {
    setLoading(true);
    function getFilteredRecipes() {
      return requestApi(`${CATEGORY_URL}${category}`)
        .then((result) => {
          setFilters({ ...filters, [category]: result.meals });
          return result.meals;
        });
    }

    let filterResult;
    if (category === selectedFilter) {
      filterResult = [...data];

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
        Foods
      </Header>
      <section className="recipes-filter">
        <button
          type="button"
          onClick={ () => handleFilter(selectedFilter) }
          data-testid="All-category-filter"
        >
          All
        </button>
        { mealCategories.length > 0 && mealCategories.map((category, ind) => (
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
            .map(({ idMeal, strMeal, strMealThumb }, index) => (
              <CardRecipe
                key={ `${index}${idMeal}` }
                pathName="/comidas"
                id={ idMeal }
                index={ index }
                testId={ `${index}-recipe-card` }
                testIdTitle={ `${index}-card-name` }
                testIdImg={ `${index}-card-img` }
                recipeImg={ strMealThumb }
                recipeName={ strMeal }
              />
            )) }
      </section>
      <Footer />
    </main>
  );
}

export default MainRecipes;
