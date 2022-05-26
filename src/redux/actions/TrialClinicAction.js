import axios from "axios";
import {
    LOADING,
    SPONSORE_LIST_SUCCESS,
    SPONSORE_LIST_ERROR,
    SPONSORE_DETAIL_SUCCESS,
    SPONSORE_DETAIL_ERROR
} from './types';
import getCurrentHost from "./../constants/index";
import { authHeader } from './authHeader';
import HandleError from "./HandleError";

export function Request() {
    return {
        type: LOADING
    };
}
export function SponsorListSuccess(response) {
    return {
        type: SPONSORE_LIST_SUCCESS,
        payload: response,
    };
}
export function SponsorListError(message) {
    return {
        type: SPONSORE_LIST_ERROR,
        payload: message,
    };
}
export const SponsorListAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/trialclinic/get-sponsors-list", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch(SponsorListSuccess(response));
        })
        .catch(error => {
            dispatch(SponsorListError(error.response.data));
            HandleError(error.response.data)
        });
}

export const SponsorDetailAction = (id) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + "/trialclinic/get-sponsor-detail/" + id, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({
                type: SPONSORE_DETAIL_SUCCESS,
                payload: response,
            });
        })
        .catch(error => {
            dispatch({
                type: SPONSORE_DETAIL_ERROR,
                payload: error.response.data,
            });
            HandleError(error.response.data)
        });
}
