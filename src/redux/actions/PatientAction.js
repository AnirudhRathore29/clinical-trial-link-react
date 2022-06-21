import axios from "axios";
import {
    LOADING,
    PATIENT_DASHBOARD_SUCCESS, PATIENT_DASHBOARD_ERROR,
    PATIENT_CLINIC_LISTING_SUCCESS, PATIENT_CLINIC_LISTING_ERROR,
    PATIENT_CLINIC_DETAILS_SUCCESS, PATIENT_CLINIC_DETAILS_ERROR,
    PATIENT_TRIALCLINIC_TRIAL_LIST_SUCCESS, PATIENT_TRIALCLINIC_TRIAL_LIST_ERROR
} from './types';
import getCurrentHost from "./../constants/index";
import { authHeader } from './authHeader';
import HandleError from "./HandleError";

export function Request() {
    return {
        type: LOADING
    };
}

export const PatientDashboardAction = () => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + "/patient/dashboard", {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_DASHBOARD_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: PATIENT_DASHBOARD_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PatientClinicListingAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/patient/get-trialclinic-list", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_CLINIC_LISTING_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: PATIENT_CLINIC_LISTING_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PatientClinicDetailsAction = (id) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + "/patient/get-trialclinic-detail/" + id, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_CLINIC_DETAILS_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: PATIENT_CLINIC_DETAILS_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PatientClinicAppTrialListAction = (id, data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/patient/get-trialclinic-approved-trial-list/" + id, data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_TRIALCLINIC_TRIAL_LIST_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: PATIENT_TRIALCLINIC_TRIAL_LIST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}