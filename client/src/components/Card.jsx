import React from 'react';
import {useHistory} from 'react-router-dom';
import style from './Card.module.css';

const Card = function(props) {

    const history = useHistory();

    const handleDetail = (e) => {
        e.preventDefault();
        history.push('/home/' + props.id)
    }

    return (
        <div  className = {style.card}>
            <div onClick = {handleDetail} className = {style.link}>
                <h4 className={style.name}>{props.name}</h4>
                    <div className={style.withDiets}>
                        <div className = {style.img}>
                            <img  className = {style.circular} src ={props.img} alt={props.names} width='200px'/>
                        </div>
                    <div>
                        {(props.diet).map((d) => <p className={style.diets} key={d}>{d}</p>)}
                    </div>
                </div>
            </div> 
        </div> 
    )
    
}

export default Card;