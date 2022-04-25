import axios from "axios";
import { SET_CURRENT_USER, AUTH_LOADING, LOGIN_SUCCESS, LOGIN_ERROR, SIGNUP_SUCCESS, SIGNUP_ERROR } from './types';
import store from "./../store";
import getCurrentHost from "./../constants/index";
import { authHeader } from './authHeader';

export const loginUser = (decode_token) => {
    localStorage.setItem("jwtToken", decode_token);
    return (
        store.dispatch({
            type: SET_CURRENT_USER,
            payload: decode_token
        })
    )
}

export function authRequest() {
    return {
        type: AUTH_LOADING
    };
}

export function signUpSuccess(response) {
    return {
        type: SIGNUP_SUCCESS,
        payload: response,
    };
}

export function signUpError(message) {
    return {
        type: SIGNUP_ERROR,
        payload: message,
    };
}

export const SignupAction = (data) => async (dispatch) => {
    dispatch(authRequest());
    axios
        .post(getCurrentHost() + "/user-register", data, {
            headers: authHeader(true),
        })
        .then(response => {
            console.log("response", response)
            dispatch(signUpSuccess(response));
        })
        .catch(error => {
            dispatch(signUpError(error.response.data));
        });
}