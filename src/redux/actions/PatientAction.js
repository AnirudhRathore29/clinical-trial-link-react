import axios from "axios";
import {
    LOADING,
    PATIENT_DASHBOARD_SUCCESS, PATIENT_DASHBOARD_ERROR,
    PATIENT_CLINIC_LISTING_SUCCESS, PATIENT_CLINIC_LISTING_ERROR,
    PATIENT_CLINIC_DETAILS_SUCCESS, PATIENT_CLINIC_DETAILS_ERROR,
    PATIENT_TRIALCLINIC_TRIAL_LIST_SUCCESS, PATIENT_TRIALCLINIC_TRIAL_LIST_ERROR,
    PATIENT_VIEW_TRIAL_SUCCESS, PATIENT_VIEW_TRIAL_ERROR,
    PATIENT_BOOK_APPOINTMENT_SUCCESS, PATIENT_BOOK_APPOINTMENT_ERROR, PATIENT_APPOINTMENT_LIST_SUCCESS, PATIENT_APPOINTMENT_LIST_ERROR, PATIENT_APPOINTMENT_DETAIL_SUCCESS, PATIENT_APPOINTMENT_DETAIL_ERROR, PATIENT_APPOINTMENT_CANCEL_SUCCESS, PATIENT_APPOINTMENT_CANCEL_ERROR, PATIENT_APPOINTMENT_VISIT_SUCCESS, PATIENT_APPOINTMENT_VISIT_ERROR, PATIENT_MY_FAV_TRIAL_SUCCESS, PATIENT_MY_FAV_TRIAL_ERROR, PATIENT_MY_FAV_TRIAL_LIST_SUCCESS, PATIENT_MY_FAV_TRIAL_LIST_ERROR
} from './types';
import getCurrentHost from "./../constants/index";
import { authHeader } from './authHeader';
import HandleError from "./HandleError";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Encryption } from "../../utils/PayloadEncryption";

// toast.configure();

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

export const PatientClinicAppTrialListAction = (url, data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + url, data, {
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

export const PatientMyFavTrialAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/patient/mark-fav-trials", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_MY_FAV_TRIAL_SUCCESS, payload: response });
            toast.success(response.data.message, { theme: "colored", autoClose: 5000})
        })
        .catch(error => {
            dispatch({ type: PATIENT_MY_FAV_TRIAL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PatientMyFavTrialListAction = () => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + "/patient/get-fav-trials", {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_MY_FAV_TRIAL_LIST_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: PATIENT_MY_FAV_TRIAL_LIST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PatientViewTrialsAction = (id) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + "/patient/view-trial-detail/" + id, {
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

export const PatientBookAppointmentAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/patient/book-appointment", {body: Encryption(data)},{
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_BOOK_APPOINTMENT_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: PATIENT_BOOK_APPOINTMENT_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const MyAppointmentsListAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/patient/get-my-appointment-list", data, {
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

export const MyAppointmentsDetailAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + `/patient/view-trial-appointment/${Encryption(data)}`,  {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_APPOINTMENT_DETAIL_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: PATIENT_APPOINTMENT_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const CancelAppointmentAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/patient/cancel-appointment", {body: Encryption(data)}, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_APPOINTMENT_CANCEL_SUCCESS, payload: response });
            toast.success(response.data.message, { theme: "colored", autoClose: 5000})
        })
        .catch(error => {
            dispatch({ type: PATIENT_APPOINTMENT_CANCEL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const PatientAllVisitAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + `/patient/get-patient-trial-visits`, {body: Encryption(data)}, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_APPOINTMENT_VISIT_SUCCESS, payload: response.data.data });
        })
        .catch(error => {
            dispatch({ type: PATIENT_APPOINTMENT_VISIT_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}