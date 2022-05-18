import axios from "axios";
import { 
    LOADING,
    PROFILE_SUCCESS,
    PROFILE_ERROR
 } from './types';
import getCurrentHost from "./../constants/index";
import { authHeader } from './authHeader';
import HandleError from "./HandleError";

export function ProfileRequest() {
    return {
        type: LOADING
    };
}

export function ProfileSuccess(response) {
    return {
        type: PROFILE_SUCCESS,
        payload: response,
    };
}

export function ProfileError(message) {
    return {
        type: PROFILE_ERROR,
        payload: message,
    };
}

export const SponsorCompleteProfileAction = (data) => async (dispatch) => {
    dispatch(ProfileRequest());
    axios
        .post(getCurrentHost() + "/sponsor/sponsor-complete-profile", data, {
            headers: authHeader(),
        })
        .then(response => {
            dispatch(ProfileSuccess(response));
            HandleError(response.data)
        })
        .catch(error => {
            dispatch(ProfileError(error.response.data));
        });
}

export const TrialClinicCompleteProfileAction = (data) => async (dispatch) => {
    dispatch(ProfileRequest());
    axios
        .post(getCurrentHost() + "/trialclinic/trialclinic-complete-profile", data, {
            headers: authHeader(),
        })
        .then(response => {
            dispatch(ProfileSuccess(response));
            HandleError(response.data)
        })
        .catch(error => {
            dispatch(ProfileError(error.response.data));
        });
}


export const PhysicianCompleteProfileAction = (data) => async (dispatch) => {
    dispatch(ProfileRequest());
    axios
        .post(getCurrentHost() + "/physician/physician-complete-profile", data, {
            headers: authHeader(),
        })
        .then(response => {
            dispatch(ProfileSuccess(response));
            HandleError(response.data)
        })
        .catch(error => {
            dispatch(ProfileError(error.response.data));
        });
}

export const PatientCompleteProfileAction = (data) => async (dispatch) => {
    dispatch(ProfileRequest());
    axios
        .post(getCurrentHost() + "/patient/patient-complete-profile", data, {
            headers: authHeader(),
        })
        .then(response => {
            dispatch(ProfileSuccess(response));
            HandleError(response.data)
        })
        .catch(error => {
            dispatch(ProfileError(error.response.data));
        });
}