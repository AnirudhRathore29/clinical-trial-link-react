import axios from "axios";
import {
    LOADING,
    SPONSORE_LIST_SUCCESS, SPONSORE_LIST_ERROR,
    TRIAL_CLINIC_DASHBOARD_SUCCESS, TRIAL_CLINIC_DASHBOARD_ERROR, STATUS_LOADING, PATIENT_CLINIC_DETAILS_SUCCESS, PATIENT_CLINIC_DETAILS_ERROR, PATIENT_VIEW_TRIAL_SUCCESS, PATIENT_VIEW_TRIAL_ERROR, PATIENT_TRIALCLINIC_TRIAL_LIST_SUCCESS, PATIENT_TRIALCLINIC_TRIAL_LIST_ERROR, PATIENT_CLINIC_LISTING_SUCCESS, PATIENT_CLINIC_LISTING_ERROR, MANGE_PATIENT_LIST_SUCCESS, MANGE_PATIENT_LIST_ERROR, MANGE_PATIENT_DETAIL_SUCCESS, MANGE_PATIENT_DETAIL_ERROR, CLINIC_APPOINTMENT_LIST_SUCCESS, CLINIC_APPOINTMENT_LIST_ERROR, PATIENT_APPOINTMENT_LIST_SUCCESS, PATIENT_APPOINTMENT_LIST_ERROR, PATIENT_APPOINTMENT_VISIT_SUCCESS, PATIENT_APPOINTMENT_VISIT_ERROR, CLINIC_NEW_TRIAL_REQUEST_SUCCESS, CLINIC_NEW_TRIAL_REQUEST_ERROR, MANGE_PATIENT_ALL_LIST_SUCCESS, MANGE_PATIENT_ALL_LIST_ERROR, MANGE_PATIENT_ALL_DETAIL_SUCCESS, MANGE_PATIENT_ALL_DETAIL_ERROR,
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

export const PhysicianClinicListingAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/physician/get-trialclinic-list", data, {
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

export const PhysicianManagePatientListAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/physician/get-manage-patient-list", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: MANGE_PATIENT_LIST_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: MANGE_PATIENT_LIST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PhysicianManagePatientDetailAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + `/physician/get-patient-detail/${data}`, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: MANGE_PATIENT_DETAIL_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: MANGE_PATIENT_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PhysicianPatientAllVisitAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + `/physician/get-patient-trial-visits`, data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: CLINIC_APPOINTMENT_LIST_SUCCESS, payload: response.data.data });
        })
        .catch(error => {
            dispatch({ type: CLINIC_APPOINTMENT_LIST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PhysicianApprovedTrialsListAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/physician/get-approved-trial-list", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_APPOINTMENT_LIST_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: PATIENT_APPOINTMENT_LIST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const ApprovedPatientListAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + `/physician/get-approved-trial-patient-list`, data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: CLINIC_NEW_TRIAL_REQUEST_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: CLINIC_NEW_TRIAL_REQUEST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const ApprovedPatientDetailAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + `/physician/get-patient-detail/${data}`, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: MANGE_PATIENT_DETAIL_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: MANGE_PATIENT_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PhysicianManageAllPatientListAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/physician/get-all-patient-list", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: MANGE_PATIENT_LIST_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: MANGE_PATIENT_LIST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PhysicianManageAllPatientDetailAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + `/physician/get-patient-personal-detail/${data}`, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: MANGE_PATIENT_DETAIL_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: MANGE_PATIENT_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}