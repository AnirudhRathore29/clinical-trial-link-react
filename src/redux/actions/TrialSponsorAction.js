import axios from "axios";
import { TRIAL_SUCCESS, TRIAL_ERROR, LOADING, VIEW_TRIAL_SUCCESS, VIEW_TRIAL_ERROR, CREATE_TRIAL_SUCCESS, CREATE_TRIAL_ERROR, SPONSOR_DASHBOARD_SUCCESS, SPONSOR_DASHBOARD_ERROR, TRIAL_CLINIC_LIST_ERROR, TRIAL_CLINIC_LIST_SUCCESS, RECRUITING_STATUS_SUCCESS, RECRUITING_STATUS_ERROR, TRIAL_CLINIC_DETAIL_SUCCESS, TRIAL_CLINIC_DETAIL_ERROR } from './types';
import getCurrentHost from "../constants/index";
import { authHeader } from './authHeader';
import { toast } from "react-toastify";
import HandleError from "./HandleError";
import "react-toastify/dist/ReactToastify.css";

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
        .get(getCurrentHost() + "/view-trial/" + id, {
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
        .post(getCurrentHost() + "/sponsor/create-trial", FieldData, {
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
        .post(getCurrentHost() + "/sponsor/get-trialclinic-list", data ,{
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