import axios from "axios";
import {
    LOADING,
    SPONSORE_LIST_SUCCESS, SPONSORE_LIST_ERROR,
    SPONSORE_DETAIL_SUCCESS, SPONSORE_DETAIL_ERROR,
    SPONSORE_APPLY_TRIAL_SUCCESS, SPONSORE_APPLY_TRIAL_ERROR,
    SPONSORE_TRIAL_LISI_SUCCESS, SPONSORE_TRIAL_LISI_ERROR,
    TRIAL_CLINIC_DASHBOARD_SUCCESS, TRIAL_CLINIC_DASHBOARD_ERROR,
    TRIAL_APPLICATION_SUCCESS, TRIAL_APPLICATION_ERROR,
    TRIAL_APPLICATION_DETAIL_SUCCESS, TRIAL_APPLICATION_DETAIL_ERROR,
    TRIAL_APPLICATION_STATUS_SUCCESS, TRIAL_APPLICATION_STATUS_ERROR,
    CLINIC_NEW_TRIAL_REQUEST_SUCCESS, CLINIC_NEW_TRIAL_REQUEST_ERROR, NEW_TRIAL_REQUEST_STATUS_SUCCESS, NEW_TRIAL_REQUEST_STATUS_ERROR, NEW_TRIAL_REQUEST_STATUS_REJECT_ERROR, NEW_TRIAL_REQUEST_STATUS_REJECT_SUCCESS, STATUS_LOADING, CLINIC_NEW_SCREEN_TRIAL_REQUEST_ERROR, CLINIC_NEW_SCREEN_TRIAL_REQUEST_SUCCESS, CLINIC_NEW_SCREEN_TRIAL_DETAIL_SUCCESS, CLINIC_NEW_SCREEN_TRIAL_DETAIL_ERROR
} from './types';
import getCurrentHost from "./../constants/index";
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

export const ApplyForTrialAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/trialclinic/apply-trial", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({
                type: SPONSORE_APPLY_TRIAL_SUCCESS,
                payload: response,
            });
        })
        .catch(error => {
            dispatch({
                type: SPONSORE_APPLY_TRIAL_ERROR,
                payload: error.response.data,
            });
            HandleError(error.response.data)
        });
}

export const SponsorsTrialListAction = (id, data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/trialclinic/get-sponsor-clinic-trial-list/" + id, data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({
                type: SPONSORE_TRIAL_LISI_SUCCESS,
                payload: response,
            });
        })
        .catch(error => {
            dispatch({
                type: SPONSORE_TRIAL_LISI_ERROR,
                payload: error.response.data,
            });
            HandleError(error.response.data)
        });
}

export const TrialClinicDashboard = () => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + "/trialclinic/dashboard", {
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

export const TrialApplicationsAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/trialclinic/get-trial-application-list", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: TRIAL_APPLICATION_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: TRIAL_APPLICATION_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const TrialApplicationsDetailsAction = (id) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + "/trialclinic/view-trial-application/" + id, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: TRIAL_APPLICATION_DETAIL_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: TRIAL_APPLICATION_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const TrialApplicationsStatusUpdateAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/trialclinic/update-trial-recruiting-status", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: TRIAL_APPLICATION_STATUS_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: TRIAL_APPLICATION_STATUS_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const NewTrialRequestListAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/trialclinic/new-appointment-request-list", data, {
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

export const NewTrialRequestStatusUpdateAction = (data) => async (dispatch) => {
    if(data.type === 2){
        dispatch(Request());
    } else {
        dispatch(StatusLoading());
    }
    axios
        .post(getCurrentHost() + "/trialclinic/update-patient-appointment-status", data.data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: NEW_TRIAL_REQUEST_STATUS_SUCCESS, payload: response });
            toast.success(response.data.message, { theme: "colored" })
        })
        .catch(error => {
            dispatch({ type: NEW_TRIAL_REQUEST_STATUS_ERROR, payload: error.response.data });
            toast.error(error.response.data.message, { theme: "colored" })
            HandleError(error.response.data)
        });
}

export const NewScreenTrialRequestListAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/trialclinic/screen-appointment-list", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: CLINIC_NEW_SCREEN_TRIAL_REQUEST_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: CLINIC_NEW_SCREEN_TRIAL_REQUEST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const NewScreenTrialRequestDetailAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + `/trialclinic/view-patient-trial-application/${data}`, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: CLINIC_NEW_SCREEN_TRIAL_DETAIL_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: CLINIC_NEW_SCREEN_TRIAL_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const NewScreenTrialRequestStatusUpdateAction = (data) => async (dispatch) => {
    dispatch(Request());
    axios
        .post(getCurrentHost() + "/trialclinic/mark-patient-appt-visit-status", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: TRIAL_APPLICATION_STATUS_SUCCESS, payload: response });
            toast.success(response.data.message, { theme: "colored" })
        })
        .catch(error => {
            dispatch({ type: TRIAL_APPLICATION_STATUS_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}