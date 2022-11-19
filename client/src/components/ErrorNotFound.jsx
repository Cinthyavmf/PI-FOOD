import React from 'react';
import {Link} from 'react-router-dom';
import style from './ErrorNotFound.module.css';

const ErrorNotFound = function() {
    return (
        <div className = {style.landing}>
            <div className={style.container}>
                <h1 className = {style.title}>404 not found</h1>
                <img src = 'https://img.freepik.com/foto-gratis/cubiertos-oro-textil-placa-sobre-fondo-oscuro-vista-superior_1220-6580.jpg' alt = ""/>

                <Link to= '/home'>
                    <button className={style.start}>Home</button>
                </Link>
            </div>
        </div>
    )
}

export default ErrorNotFound;