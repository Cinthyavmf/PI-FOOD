import React from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css';

const LandingPage = function() {
    return (
        <div className = {style.landing}>
            <div className={style.container}>
                <h1 className={style.title}>Henry Recipes</h1>
                <h3>"let food be thy medicine and medicine be thy food."</h3>
                <h4 className={style.autor}>Hippocrates</h4>
                <Link to= '/home'>
                    <button className={style.start}>Start!</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;