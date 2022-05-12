import axios from "axios";
import { TRIAL_SUCCESS, TRIAL_ERROR, AUTH_LOADING, VIEW_TRIAL_SUCCESS, VIEW_TRIAL_ERROR } from './types';
import getCurrentHost from "../constants/index";
import { authHeader } from './authHeader';

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

export const ListTrials = () => async (dispatch) => {
    dispatch(authRequest());
    axios
        .get(getCurrentHost() + "/sponsor/my-trials", {
            headers: authHeader()
        })
        .then(response => {
            dispatch(ListTrialSuccess(response));
        })
        .catch(error => {
            dispatch(ListTrialError(error.response.data));
        });
}

export function ViewTrialSuccess(response) {
    return {
        type: VIEW_TRIAL_SUCCESS,
        payload: response,
    };
}

export function ViewTrialError(message) {
    return {
        type: VIEW_TRIAL_ERROR,
        payload: message,
    };
}

export const ViewTrials = (id) => async (dispatch) => {
    dispatch(authRequest());
    axios
        .get(getCurrentHost() + "/view-trial/" + id, {
            headers: authHeader()
        })
        .then(response => {
            dispatch(ViewTrialSuccess(response));
        })
        .catch(error => {
            dispatch(ViewTrialError(error.response.data));
        });
}