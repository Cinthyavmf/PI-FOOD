import axios from 'axios';
import BACK_URL from '../config.js';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_BY_NAME = 'GET_RECIPE_BY_NAME';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_DIETS = 'GET_DIETS';
export const POST_RECIPE = 'POST_RECIPE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_HS = 'ORDER_BY_HS';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const NEXT_PAGE = 'NEXT_PAGE';
export const PREV_PAGE = 'PREV_PAGE';


console.log(BACK_URL)

export function getRecipes() {
    return async function (dispatch) {
        try {
            const url = await axios.get(BACK_URL + "recipes");
            return dispatch({
                type: GET_RECIPES,
                payload: url.data,
            });

        } catch(err) {
            console.log(err);
            return err;
        }
    };
};

export function getRecipeByName(name) {
    return async function (dispatch) {
        try {
            const url = await axios.get(BACK_URL + "/recipes?name=" + name);
            return dispatch({
                type: GET_RECIPE_BY_NAME,
                payload: url.data,
            });
        } catch(err) {
            console.log(err);
            return dispatch({
                type: GET_RECIPE_BY_NAME,
                payload: "404"
            });

;
        }
    };
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            const url = await axios.get(BACK_URL + "/recipes/" + id);
            return dispatch({
                type: GET_DETAIL,
                payload: url.data,
            });
        } catch(err) {
            console.log(err);
            return err;
        }
    };
}

export function getDiets() {
    return async function (dispatch) {
        try {
            const url = await axios.get(BACK_URL + "/diets");
            return dispatch({
                type: GET_DIETS,
                payload: url.data,
            });
        } catch(err) {
            console.log(err);
            return err;
        }
    };
}

export function createRecipe(body) {
    return async function (dispatch) {
        try {
            const res = await axios.post(BACK_URL + "/recipes", body);
            return dispatch({
                type: POST_RECIPE,
                payload: res,
            });
        } catch(err) {
            console.log(err);
            return err;
        }
    };
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload,
    }
}

export function orderByHs(payload) {
    return {
        type: ORDER_BY_HS,
        payload,
    }
}

export function filterByDiets(payload) {
    return {
        type: FILTER_BY_DIETS,
        payload
    }
}

export function nextPage(payload) {
    return {
        type: NEXT_PAGE,
        payload,
    }
}

export function prevPage(payload) {
    return {
        type: NEXT_PAGE,
        payload,
    }
}