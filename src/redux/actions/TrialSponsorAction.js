import axios from "axios";
import {
    TRIAL_SUCCESS, TRIAL_ERROR,
    LOADING,
    VIEW_TRIAL_SUCCESS, VIEW_TRIAL_ERROR,
    CREATE_TRIAL_SUCCESS, CREATE_TRIAL_ERROR,
    SPONSOR_DASHBOARD_SUCCESS, SPONSOR_DASHBOARD_ERROR,
    TRIAL_CLINIC_LIST_ERROR, TRIAL_CLINIC_LIST_SUCCESS,
    RECRUITING_STATUS_SUCCESS, RECRUITING_STATUS_ERROR,
    TRIAL_CLINIC_DETAIL_SUCCESS, TRIAL_CLINIC_DETAIL_ERROR,
    NEW_TRIAL_REQUEST_SUCCESS, NEW_TRIAL_REQUEST_ERROR,
    NEW_TRIAL_REQUEST_DETAIL_SUCCESS, NEW_TRIAL_REQUEST_DETAIL_ERROR,
    NEW_TRIAL_REQUEST_STATUS_UPDATE_SUCCESS, NEW_TRIAL_REQUEST_STATUS_UPDATE_ERROR,
    MY_TRIAL_SUCCESS, MY_TRIAL_ERROR,
    TRIAL_APP_CLINIC_LIST_SUCCESS, TRIAL_APP_CLINIC_LIST_ERROR,
    TRIAL_PATIENT_LIST_SUCCESS, TRIAL_PATIENT_LIST_ERROR,
    TRIAL_PATIENT_DETAIL_SUCCESS, TRIAL_PATIENT_DETAIL_ERROR,
    TRIAL_MANAGE_CLINIC_SUCCESS, TRIAL_MANAGE_CLINIC_ERROR, SPONSOR_MANGE_PATIENT_DETAIL_SUCCESS, SPONSOR_MANGE_PATIENT_DETAIL_ERROR, SPONSOR_MANGE_PATIENT_LIST_SUCCESS, SPONSOR_MANGE_PATIENT_LIST_ERROR, PATIENT_ALL_VISIT_SUCCESS, PATIENT_ALL_VISIT_ERROR
} from './types';
import getCurrentHost from "../constants/index";
import { authHeader } from './authHeader';
import { toast } from "react-toastify";
import HandleError from "./HandleError";
import "react-toastify/dist/ReactToastify.css";
import { Encryption } from "../../utils/PayloadEncryption";

toast.configure();
export function isLoading() {
    return {
        type: LOADING
    };
}

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
export const ListTrials = (data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/my-trials", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch(ListTrialSuccess(response));
        })
        .catch(error => {
            dispatch(ListTrialError(error.response.data));
            HandleError(error.response.data)
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
export const ViewTrialsAction = (id) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .get(getCurrentHost() + "/view-trial/" + Encryption(id), {
            headers: authHeader()
        })
        .then(response => {
            dispatch(ViewTrialSuccess(response));
        })
        .catch(error => {
            dispatch(ViewTrialError(error.response.data));
            HandleError(error.response.data)
        });
}


export function CreateTrialSuccess(response) {
    return {
        type: CREATE_TRIAL_SUCCESS,
        payload: response,
    };
}
export function CreateTrialError(message) {
    return {
        type: CREATE_TRIAL_ERROR,
        payload: message,
    };
}
export const CreateTrialsAction = (FieldData) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/create-trial", {body: Encryption(FieldData)}, {
            headers: authHeader()
        })
        .then(response => {
            dispatch(CreateTrialSuccess(response));
            toast.success(response.data.message, { theme: "colored" })
        })
        .catch(error => {
            dispatch(CreateTrialError(error.response.data));
            toast.error(error.response.data.message, { theme: "colored" })
            HandleError(error.response.data)
        });
}

export const SendTrialInvitation = (FieldData) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/send-trial-invitation", FieldData, {
            headers: authHeader()
        })
        .then(response => {
            dispatch(CreateTrialSuccess(response));
            toast.success(response.data.message, { theme: "colored" })
        })
        .catch(error => {
            dispatch(CreateTrialError(error.response.data));
            toast.error(error.response.data.message, { theme: "colored" })
            HandleError(error.response.data)
        });
}

export function RecruitingStatusSuccess(response) {
    return {
        type: RECRUITING_STATUS_SUCCESS,
        payload: response,
    };
}
export function RecruitingStatusError(message) {
    return {
        type: RECRUITING_STATUS_ERROR,
        payload: message,
    };
}
export const TrialRecruitingUpdateAction = (data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/update-trial-status", data, {
            headers: authHeader()
        })
        .then(response => {
            toast.success(response.data.message, { theme: "colored" })
            dispatch(RecruitingStatusSuccess(response));
        })
        .catch(error => {
            dispatch(RecruitingStatusError(error.response.data));
            toast.error(error.response.data.message, { theme: "colored" })
            HandleError(error.response.data)
        });
}

export function SponsorDashboardSuccess(response) {
    return {
        type: SPONSOR_DASHBOARD_SUCCESS,
        payload: response,
    };
}
export function SponsorDashboardError(message) {
    return {
        type: SPONSOR_DASHBOARD_ERROR,
        payload: message,
    };
}
export const SponsorDashboard = () => async (dispatch) => {
    dispatch(isLoading());
    axios
        .get(getCurrentHost() + "/sponsor/dashboard", {
            headers: authHeader()
        })
        .then(response => {
            dispatch(SponsorDashboardSuccess(response));
        })
        .catch(error => {
            dispatch(SponsorDashboardError(error.response.data));
            HandleError(error.response.data)
        });
}


export function TrialClinicSuccess(response) {
    return {
        type: TRIAL_CLINIC_LIST_SUCCESS,
        payload: response,
    };
}
export function TrialClinicError(message) {
    return {
        type: TRIAL_CLINIC_LIST_ERROR,
        payload: message,
    };
}
export const TrialClinicListAction = (data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/get-trialclinic-list", data, {
            headers: authHeader()
        })
        .then(response => {
            dispatch(TrialClinicSuccess(response));
        })
        .catch(error => {
            dispatch(TrialClinicError(error.response.data));
            HandleError(error.response.data)
        });
}

export function TrialClinicDetailSuccess(response) {
    return {
        type: TRIAL_CLINIC_DETAIL_SUCCESS,
        payload: response,
    };
}
export function TrialClinicDetailError(message) {
    return {
        type: TRIAL_CLINIC_DETAIL_ERROR,
        payload: message,
    };
}
export const TrialClinicDetailsAction = (id) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .get(getCurrentHost() + "/sponsor/get-trialclinic-detail/" + id, {
            headers: authHeader()
        })
        .then(response => {
            dispatch(TrialClinicDetailSuccess(response));
        })
        .catch(error => {
            dispatch(TrialClinicDetailError(error.response.data));
            HandleError(error.response.data)
        });
}


export const NewTrialRequestAction = (data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/get-trialrequests-list", data , {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: NEW_TRIAL_REQUEST_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: NEW_TRIAL_REQUEST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const TrialRequestDetailAction = (id) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .get(getCurrentHost() + "/sponsor/view-trial-request/" + id , {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: NEW_TRIAL_REQUEST_DETAIL_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: NEW_TRIAL_REQUEST_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const TrialRequestAppStatusUpdateAction = (data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/update-trial-application-status", data , {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: NEW_TRIAL_REQUEST_STATUS_UPDATE_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: NEW_TRIAL_REQUEST_STATUS_UPDATE_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const myTrialAction = (data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/my-studies-list", data , {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: MY_TRIAL_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: MY_TRIAL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const TrialAppointmentClinicListAction = (id, data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/approved-trial-appointment-list/" + id, data , {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: TRIAL_APP_CLINIC_LIST_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: TRIAL_APP_CLINIC_LIST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const TrialSpoPatientListAction = (id, data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/trial-appointment-patient-list/" + id, data , {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: TRIAL_PATIENT_LIST_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: TRIAL_PATIENT_LIST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const TrialSpoPatientDetailAction = (id) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .get(getCurrentHost() + "/sponsor/view-patient-appointment-detail/" + Encryption(id) , {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: TRIAL_PATIENT_DETAIL_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: TRIAL_PATIENT_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const TrialManageClinicsListAction = (data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/manage-clinic-list", data , {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: TRIAL_MANAGE_CLINIC_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: TRIAL_MANAGE_CLINIC_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const SponsorManagePatientListAction = (data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/get-manage-patient-list", {body: Encryption(data)}, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: SPONSOR_MANGE_PATIENT_LIST_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: SPONSOR_MANGE_PATIENT_LIST_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const SponsorManagePatientDetailAction = (data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .get(getCurrentHost() + `/sponsor/get-patient-detail/${Encryption(data)}`, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: SPONSOR_MANGE_PATIENT_DETAIL_SUCCESS, payload: response });
        })
        .catch(error => {
            dispatch({ type: SPONSOR_MANGE_PATIENT_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}

export const SponsorPatientAllVisitAction = (data) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + `/sponsor/get-patient-trial-visits`, {body: Encryption(data)}, {
            headers: authHeader()
        })
        .then(response => {
            dispatch({ type: PATIENT_ALL_VISIT_SUCCESS, payload: response.data.data });
        })
        .catch(error => {
            dispatch({ type: PATIENT_ALL_VISIT_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        });
}
