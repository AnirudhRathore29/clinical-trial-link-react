import axios from "axios";
import {
    LOADING,
    SPONSORE_LIST_SUCCESS, SPONSORE_LIST_ERROR,
    TRIAL_CLINIC_DASHBOARD_SUCCESS, TRIAL_CLINIC_DASHBOARD_ERROR, STATUS_LOADING, PATIENT_CLINIC_DETAILS_SUCCESS, PATIENT_CLINIC_DETAILS_ERROR, PATIENT_VIEW_TRIAL_SUCCESS, PATIENT_VIEW_TRIAL_ERROR, PATIENT_TRIALCLINIC_TRIAL_LIST_SUCCESS, PATIENT_TRIALCLINIC_TRIAL_LIST_ERROR,
} from './types';
import getCurrentHost from "../constants/index";
import { authHeader } from './authHeader';
import HandleError from "./HandleError";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export function Request() {
    return {
        type: LOADING
    };
}
export function StatusLoading() {
    return {
        type: STATUS_LOADING
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

export const PhysicianDashboardAction = () => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + "/physician/dashboard", {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: TRIAL_CLINIC_DASHBOARD_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: TRIAL_CLINIC_DASHBOARD_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}


export const PhysicianClinicDetailsAction = (id) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + "/physician/get-trialclinic-detail/" + id, {
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

export const PhysicianViewTrialsAction = (id) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + "/physician/view-trial-detail/" + id, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_VIEW_TRIAL_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: PATIENT_VIEW_TRIAL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PhysicianClinicAppTrialListAction = (id, data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/physician/get-trialclinic-approved-trial-list/" + id, data, {
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
