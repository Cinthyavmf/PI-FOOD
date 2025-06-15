import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from 'react';
import {getDetail, getDiets} from '../redux/actions.ts';
import {useParams} from 'react-router-dom';
import style from './Detail.module.css';



const Detail = function() {

    let {id} = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.detail);
    console.log(detail.instructions)
    
        

    useEffect(() => {
        dispatch(getDetail(id));
        dispatch(getDiets());
    }, [dispatch, id]);

    return (
        <div className={style.detail}>
            <div className = {style.withDiets}>
                <h1 className={style.name}>{detail.name}</h1>
                <div className = {style.img}>
                    <img className = {style.circular} src ={detail.image} alt={detail.name}/>
                </div>
                <div>
                    {detail.diet?.map((d) => <h4 className={style.diets} key = {d}>{d}</h4>)}
                </div>
                <h4>Health Score: {detail.healthScore}</h4>
            </div>
            <h4 className={style.title}>Summary</h4>
            <p dangerouslySetInnerHTML={{__html: detail.summary}}  className={style.summary} />
            {detail.instructions ?  
            <>
                <h4 className={style.title}>Instructions</h4>
                <div className={style.summary}>
                    {detail.instructions?.map((s) =><p key={s}>{s}</p>)}
                </div>
            </>           
                : <></>
            }

        </div>
    )
    
}

export default Detail;