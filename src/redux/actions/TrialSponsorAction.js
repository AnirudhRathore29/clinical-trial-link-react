import axios from "axios";
import { TRIAL_SUCCESS, TRIAL_ERROR, AUTH_LOADING, LOADING, VIEW_TRIAL_SUCCESS, VIEW_TRIAL_ERROR, CREATE_TRIAL_SUCCESS, CREATE_TRIAL_ERROR } from './types';
import getCurrentHost from "../constants/index";
import { authHeader } from './authHeader';
import { toast } from "react-toastify";
import HandleError from "./HandleError";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

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

export function isLoading() {
    return {
        type: LOADING
    };
}

export const ListTrials = () => async (dispatch) => {
    dispatch(isLoading());
    axios
        .get(getCurrentHost() + "/sponsor/my-trials", {
            headers: authHeader()
        })
        .then(response => {
            dispatch(ListTrialSuccess(response));
            HandleError(response.data)
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
    dispatch(isLoading());
    axios
        .get(getCurrentHost() + "/view-trial/" + id, {
            headers: authHeader()
        })
        .then(response => {
            dispatch(ViewTrialSuccess(response));
            HandleError(response.data)
        })
        .catch(error => {
            dispatch(ViewTrialError(error.response.data));
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

export const CreateTrials = (FieldData) => async (dispatch) => {
    dispatch(isLoading());
    axios
        .post(getCurrentHost() + "/sponsor/create-trial", FieldData, {
            headers: authHeader()
        })
        .then(response => {
            dispatch(CreateTrialSuccess(response));
            toast.success(response.data.message, { theme: "colored" })
            HandleError(response.data)
        })
        .catch(error => {
            dispatch(CreateTrialError(error.response.data));
            toast.error(error.response.data.message, { theme: "colored" })
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
            HandleError(response.data)
        })
        .catch(error => {
            dispatch(CreateTrialError(error.response.data));
            toast.error(error.response.data.message, { theme: "colored" })
        });
}

export const SponsorDashboard = () => async (dispatch) => {
    dispatch(isLoading());
    axios
        .get(getCurrentHost() + "/sponsor/dashboard", {
            headers: authHeader()
        })
        .then(response => {
            dispatch(ListTrialSuccess(response));
            HandleError(response.data)
        })
        .catch(error => {
            dispatch(ListTrialError(error.response.data));
        });
}