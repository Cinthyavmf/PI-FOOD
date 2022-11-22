import {
    GET_RECIPES,
    GET_RECIPE_BY_NAME,
    GET_DETAIL,
    GET_DIETS,
    POST_RECIPE,
    ORDER_BY_NAME,
    ORDER_BY_HS,
    FILTER_BY_DIETS,
    NEXT_PAGE,
    PREV_PAGE,
} from './actions';

const initialState = {
    allRecipes : [],
    recipes : [],
    showRecipes: [],
    diets: [],
    detail: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_RECIPES: {
            return {
                ...state,
                recipes: action.payload,
                showRecipes: action.payload,
                allRecipes: action.payload
            }
        }
        case GET_RECIPE_BY_NAME: {
            return {
                ...state,
                showRecipes: action.payload,
            }
        }
        case GET_DETAIL: {
            return {
                ...state,
                detail: action.payload,
            }
        }
        case GET_DIETS: {
            return {
                ...state,
                diets: action.payload,
            }
        }
        case POST_RECIPE: {
            return {
                ...state,
            }
        }

        case ORDER_BY_NAME: {
            const recipesName = 
            action.payload === 'A/Z'
            ? state.showRecipes.sort((a, b) => a.name.localeCompare(b.name))
            : action.payload === 'Z/A' 
            ? state.showRecipes.sort((a, b) => b.name.localeCompare(a.name))
            : state.showRecipes;
           

            return {
                ...state,
                showRecipes: recipesName
            }
        }

        case ORDER_BY_HS: {
            const recipesHs =
            action.payload === 'min/max'
            ? state.showRecipes.sort((a, b) => a.healthScore - b.healthScore)
            : action.payload === 'max/min'
            ? state.showRecipes.sort((a, b) => b.healthScore - a.healthScore)
            : state.showRecipes;
            return {
                ...state,
                showRecipes: recipesHs
            }
        }

        case FILTER_BY_DIETS: {
            const recipesDiets = action.payload 
            ? state.showRecipes = state.allRecipes.filter((r) => r.diet.includes(action.payload))
            : state.showRecipes;
            console.log(state.showRecipes)

            return {
                ...state,
                showRecipes: recipesDiets
            }
        }

        case NEXT_PAGE: {
            return {
                state
            }
        }

        case PREV_PAGE: {
            return {
                state
            }
        }

        default: {
            return {...state,
            }
        }
    }

}

export default rootReducer;