import axios from "axios";
import { TRIAL_SUCCESS, TRIAL_ERROR, AUTH_LOADING } from './types';
import getCurrentHost from "../constants/index";

var jwt = require('jsonwebtoken');
const JWT_SECRET = "clinical57586xYtrial"

export function ListTrialSuccess(response) {
    return {
        type: TRIAL_SUCCESS,
        payload: response,
    };
}

export function ListTrialError(message) {
    return {
        type: TRIAL_ERROR,
        payload: message,
    };
}

export function authRequest() {
    return {
        type: AUTH_LOADING
    };
}

let authToken = localStorage.getItem('auth_security');
let authLocalData = jwt.verify(authToken, JWT_SECRET)

export const ListTrials = (data) => async (dispatch) => {
    dispatch(authRequest());
    axios
        .get(getCurrentHost() + "/sponsor/my-trials", {
            headers: {
                Authorization: "Bearer " + authLocalData.security_token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            dispatch(ListTrialSuccess(response));
        })
        .catch(error => {
            dispatch(ListTrialError(error.response.data));
        });
}