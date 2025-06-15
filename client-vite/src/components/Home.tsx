import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getRecipeByName, getDiets, orderByName, orderByHs, filterByDiets } from '../redux/actions';
import Card from './Card';
import Pagination from './Pagination';
import style from './Home.module.css';

// Types
interface Recipe {
  id: number;
  name: string;
  image: string;
  diet: string[];
}

interface RootState {
  showRecipes: Recipe[];
  diets: string[];
}

const Home: React.FC = () => {
  const dispatch = useDispatch();

  // Selecciono el estado, con tipado
  const recipes = useSelector((state: RootState) => state.showRecipes) ?? [];
  const diets = useSelector((state: RootState) => state.diets) ?? [];

  // Estados locales
  const [, setOrder] = useState<string>();
  const [name, setName] = useState<string>("");

  // Paginado
  const recipesPerPage = 9;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const [page, setPage] = useState<number>(1);
  const first = (page - 1) * recipesPerPage;
  const last = page * recipesPerPage;
  const recipesPage = recipes.slice(first, last);

  // Cargar recetas y diets al principio
  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(getRecipes());
      dispatch(getDiets());
    }
  }, [dispatch, recipes]);

  // Ordenamientos
  const order = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    const value = e.target.value;
    if (value === "A/Z" || value === "Z/A") {
      dispatch(orderByName(value));
    }
    if (value === "max/min" || value === "min/max") {
      dispatch(orderByHs(value));
    }
    setOrder(value);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleClick = () => {
    setPage(1);
    dispatch(getRecipeByName(name));
  }

  const filterDiets = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    dispatch(filterByDiets(e.target.value));
  }

  const cleanFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <div>
      <nav className={style.nav}>
        <div>
          <input className={style.searchName} type="text" placeholder='Search a recipe...' onChange={handleChange} />
          <button className={style.searchNameButton} onClick={handleClick}>Search</button>
        </div>

        <div className={style.bar}>
          <select className={style.search} onChange={order}>
            <option className={style.option} defaultValue="---">---</option>
            <option className={style.option} value="A/Z">A/Z</option>
            <option className={style.option} value="Z/A">Z/A</option>
            <option className={style.option} value="min/max">min/max</option>
            <option className={style.option} value="max/min">max/min</option>
          </select>

          <select className={style.search} onChange={filterDiets}>
            <option className={style.option} defaultValue="Filter by diet">Filter by diet</option>
            {diets.map((d) =>
              <option key={d.name} value={d.name}>{d.name}</option>
            )}
          </select>
        </div>

        <div className={style.bar}>
          <button className={style.cleanFilters} onClick={cleanFilters}>Clean Filters</button>
          <Link to="/create"><button className={style.create}>Create a new recipe</button></Link>
        </div>
      </nav>

      <div className={style.cards}>
        {recipesPage.map((r) =>
          <Card key={r.id} id={r.id} name={r.name} img={r.image} diet={r.diet} />
        )}
      </div>

      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
}

export default Home;
