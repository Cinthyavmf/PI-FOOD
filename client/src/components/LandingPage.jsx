import React from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css';

const LandingPage = function() {
    return (
        <div className = {style.landing}>
            <h1 className={style.title}>Henry Recipes</h1>
            <h3>"let food be thy medicine and medicine be thy food."</h3>
            <h4 className={style.autor}>Hippocrates</h4>
            <button className={style.start}>
                <Link to= '/home'style = {{textDecoration:"none", color:"white"}}>
                    Start!
                </Link>
            </button>
        </div>
    )
}

export default LandingPage;