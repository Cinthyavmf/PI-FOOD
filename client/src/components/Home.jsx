import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from 'react';
import {getRecipes, getRecipeByName, getDiets, orderByName, orderByHs, filterByDiets} from '../redux/actions';
import Card from './Card';
import Pagination from './Pagination';
import style from './Home.module.css'

//VER CÓMO MANEJAR EL PAGINADO


const Home = function () {   
    
    
    const history = useHistory();
    history.push('/home')
    
    
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.showRecipes);
    const diets = useSelector((state) => state.diets);
    console.log(recipes)

    const [, setOrder] = useState();
    const [name, setName] = useState();
    const recipesPerPage = 9;
    const totalPages = Math.ceil(recipes.length/recipesPerPage);

    const [page, setPage] = useState(1);
    const first = (page - 1) * recipesPerPage;
    const last = page * recipesPerPage;
    const recipesPage = recipes.slice(first, last);
    console.log(recipesPage)


    useEffect(() => {
        if (recipes.length === 0) {
        dispatch(getRecipes());
        dispatch(getDiets());}
    }, [dispatch, recipes]);
    console.log(recipes)

    const orderName = function(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrder(e.target.value);
    }

    const orderHs = function(e) {
        e.preventDefault();
        dispatch(orderByHs(e.target.value));
        setOrder(e.target.value);
    }

    const order = function (e) {
        setPage(1);
        if (e.target.value === "A/Z" || e.target.value === "Z/A") {
            orderName(e);
        }
        if (e.target.value === "max/min" || e.target.value === "min/max") {
            orderHs(e);
        }
    }

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleClick = () => {
        setPage(1);
        dispatch(getRecipeByName(name));
    }

    const filterDiets = (e) => {
        setPage(1);
        dispatch(filterByDiets(e.target.value));
    }

        const cleanFilters = (e) => {
            e.preventDefault();
            dispatch(getRecipes());
        }

    return (
      <div>
        <nav className={style.nav}>
            <div >
                <input className={style.searchName} type="text" placeholder = 'Search a recipe...' onChange={handleChange}/>
                <button  className={style.searchNameButton} onClick={handleClick}>Search</button>
            </div>
            <div className={style.bar}>
                <select className={style.search} onChange = {order}>
                    <option className={style.option} defaultValue= "---">---</option>
                    <option className={style.option} value="A/Z">A/Z</option>
                    <option className={style.option} value="Z/A">Z/A</option>
                    <option className={style.option} value="min/max">min/max</option>
                    <option className={style.option} value="max/min">max/min</option>
                </select>
                <select className={style.search} onChange = {filterDiets}>
                    <option className={style.option} defaultValue= "Filter by diet">Filter by diet</option>
                {diets?.map((d) =>
                    <option name={d.name} key={d.name} value={d.name}>{d.name}</option>   
                )}
                </select>
            </div>
            <div className={style.bar}>
                <button className={style.cleanFilters}  onClick={cleanFilters}>Clean Filters</button>
                <Link to="/create"><button className={style.create}>Create a new recipe</button></Link>
            </div>
        </nav>
        <div className={style.cards}>
            {recipesPage.map((r) =>                 
                <Card key={r.id} id={r.id} name={r.name} img={r.image} diet={r.diet} />
            )}
        </div>
        <Pagination totalPages = {totalPages} page = {page} setPage = {setPage}/>    
    </div>
    )
}

export default Home;