import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from 'react';
import {getDiets} from '../redux/actions.ts';
import { createRecipe } from '../redux/actions.ts';
import {useNavigate}  from 'react-router-dom';
import {useState}  from 'react';
import style from './CreateRecipe.module.css';


const CreateRecipe = function() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const [error, setError] = useState({});

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);


    const [input, setInput] = useState({
        name: "",
        image: "",
        summary: "",
        diets: [],
        healthScore: "",
        steps: [],
      });

    const handleChange = (e) => {



        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });


            setError(
                validate({
                    ...input,
                    [e.target.name]: e.target.value,
                }
            )
            
    )}
    
    const handleChangeSteps = (e) => {

        setInput({
            ...input,
            steps: e.target.value,
        });
        setError(
            validate({
                ...input,
                steps: e.target.value,
            }
        )
        )
    }

    const handleCheck = (e) => {

        input.diets.includes(e.target.value)
        ? setInput({
            ...input,
            diets: input.diets.filter(d => d !== e.target.value)

        })
        : setInput({
            ...input,
        diets: [...input.diets, e.target.value]

        })

        setError(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));

        
    }

    const validate = (input) => {

        let error = {};

        if(input.name.length < 5) {
            error.name = "The name must have at least 5 characters."
        } 

        if(input.summary.length < 40) {
            error.summary = "The summary must have at least 40 characters."
        }

        if(input.steps && input.steps.length > 0 && input.steps.length < 80) {
            error.steps = "The instructions must have at least 80 characters."
        }
     
        //validación de imagen
        if(input.image.length > 0 && !/^.*\.(jpe?g|JPE?G|png|PNG|bmp|BMP|gif|GIF)$/.test(input.image)) {
            error.image = "The file must be .jpg, .jpeg, .png, .bmp or .gif"
        }

        if(input.diets.length === 0 ) {
            error.diets = "You must check at least 1 diet."
        }
        //TOUCHED buscar para forms, html onFocus

        return error;
    }

    const handleSubmit = (e) =>{
        console.log(input)
        e.preventDefault();
        if (Object.keys(error).length === 0 && input.diets.length > 0) {
            dispatch(createRecipe(input))
            setInput({
                name: "",
                image: "",
                summary: "",
                diets: [],
                healthScore: "",
                instructions: "",
              });
              alert("Recipe created succesfully!")
              navigate('/home')
        }
        else {
            alert("You must complete all fields.")

        }

    }




    return (
        <div className = {style.create}>
            <h1 className = {style.title}>Create a new recipe</h1>
            <form  className={style.form} >
                <label>
                    Name: 
                </label>
                <input placeholder = "name..." className={style.input} value = {input.name} type='text' onChange={handleChange} name='name'/>
                {error.name && <p className={style.error}>{error.name}</p>}
                <label>
                    Summary: 
                </label>
                <textarea placeholder = "summary..." className={style.textarea} value = {input.summary} type='textarea' onChange={handleChange} name='summary'/>
                {error.summary && <p className={style.error}>{error.summary}</p>}
                <label>
                    Health score:                 <span >{input.healthScore}</span>
                </label>
                <input className={style.range} value = {input.healthScore} type='range' min = "1" max = "100" onChange={handleChange} name='healthScore'/> 
                {error.healthScore && <p className={style.error}>{error.healthScore}</p>}
                <label>
                    Instructions: 
                </label>
                <textarea placeholder = "instructions...(optional)" className={style.textarea} value = {input.steps} type='textarea' onChange={handleChangeSteps} name='steps'/> 
                {error.steps && <p className={style.error}>{error.steps}</p>}
                <label>
                    Image: 
                </label> 
                <input placeholder = "image URL... (optional)" className={style.input} value = {input.image} type='text' onChange={handleChange} name='image'/> 
                {error.image && <p className={style.error}>{error.image}</p>}
                <label>
                    Diets: 
                </label> 
                <div>
                    {diets.map((d) => 
                        <label className = {style.diets} htmlFor={d.name} key={d.name}>
                            <div  className = {style.diet}>
                                <input onClick={handleCheck} type ='checkbox' value = {d.name}/><span>{d.name + "    "} </span>
                            </div>
                        </label>)
                    }
                    {error.diets && <p className={style.error}>{error.diets}</p>}
                </div>
                <button className={style.createButton} onClick={handleSubmit} disabled={Object.keys(error).length > 0}>Create</button>
            </form>
        </div>
        
    )
}

export default CreateRecipe;