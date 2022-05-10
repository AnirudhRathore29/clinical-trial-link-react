import axios from "axios";
import { 
    SUCCESS,
    ERROR
 } from './types';
import getCurrentHost from "./../constants/index";
import { authHeader } from './authHeader';

export function ActionSuccess(response) {
    return {
        type: SUCCESS,
        payload: response,
    };
}

export function ActionError(message) {
    return {
        type: ERROR,
        payload: message,
    };
}

export const StatesAction = (data) => async (dispatch) => {
    axios
        .get(getCurrentHost() + "/get-states", data, {
            headers: authHeader(true),
        })
        .then(response => {
            dispatch(ActionSuccess(response));
        })
        .catch(error => {
            dispatch(ActionError(error.response.data));
        });
}