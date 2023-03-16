import axios from "axios";
import {
    LOADING,
    COMPLETE_PROFILE_SUCCESS, COMPLETE_PROFILE_ERROR,
    PROFILE_SUCCESS, PROFILE_ERROR,
    SET_CURRENT_USER,
    PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_ERROR
} from './types';
import getCurrentHost from "./../constants/index";
import { authHeader } from './authHeader';
import HandleError from "./HandleError";
import { Encryption, FormDataEncryption } from "../../utils/PayloadEncryption";
var jwt = require('jsonwebtoken');

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};
export function ProfileRequest() {
    return {
        type: LOADING
    };
}
export function CompleteProfileSuccess(response) {
    return {
        type: COMPLETE_PROFILE_SUCCESS,
        payload: response,
    };
}

export function CompleteProfileError(message) {
    return {
        type: COMPLETE_PROFILE_ERROR,
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
            const success_res = response.data.data
            const payload = {
                full_name: success_res.full_name,
                dob: success_res.dob,
                email: success_res.email,
                first_name: success_res.first_name,
                last_name: success_res.last_name,
                gender: success_res.gender,
                id: success_res.id,
                isProfileCompleted: success_res.isProfileCompleted,
                phone_number: success_res.phone_number,
                profile_image: success_res.profile_image,
                role: success_res.role,
                security_token: success_res.auth_token,
                state_id: success_res.state_id,
                status: success_res.status
            }
            var token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET);
            localStorage.setItem("auth_security", token)
            var decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
            dispatch(setCurrentUser(decoded));

            dispatch(CompleteProfileSuccess(response));
        })
        .catch(error => {
            dispatch(CompleteProfileError(error.response.data));
            HandleError(error.response.data)
        });
}

export const TrialClinicCompleteProfileAction = (data) => async (dispatch) => {
    dispatch(ProfileRequest());
    axios
        .post(getCurrentHost() + "/trialclinic/trialclinic-complete-profile", data, {
            headers: authHeader(),
        })
        .then(response => {
            const success_res = response.data.data
            const payload = {
                full_name: success_res.full_name,
                dob: success_res.dob,
                email: success_res.email,
                first_name: success_res.first_name,
                last_name: success_res.last_name,
                gender: success_res.gender,
                id: success_res.id,
                isProfileCompleted: success_res.isProfileCompleted,
                phone_number: success_res.phone_number,
                profile_image: success_res.profile_image,
                role: success_res.role,
                security_token: success_res.auth_token,
                state_id: success_res.state_id,
                status: success_res.status
            }
            var token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET);
            localStorage.setItem("auth_security", token)
            var decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
            dispatch(setCurrentUser(decoded));
            dispatch(CompleteProfileSuccess(response));
        })
        .catch(error => {
            dispatch(CompleteProfileError(error.response.data));
            HandleError(error.response.data)
        });
}

export const PhysicianCompleteProfileAction = (data) => async (dispatch) => {
    dispatch(ProfileRequest());
    axios
        .post(getCurrentHost() + "/physician/physician-complete-profile", data, {
            headers: authHeader(),
        })
        .then(response => {
            const success_res = response.data.data
            const payload = {
                full_name: success_res.full_name,
                dob: success_res.dob,
                email: success_res.email,
                first_name: success_res.first_name,
                last_name: success_res.last_name,
                gender: success_res.gender,
                id: success_res.id,
                isProfileCompleted: success_res.isProfileCompleted,
                phone_number: success_res.phone_number,
                profile_image: success_res.profile_image,
                role: success_res.role,
                security_token: success_res.auth_token,
                state_id: success_res.state_id,
                status: success_res.status
            }
            var token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET);
            localStorage.setItem("auth_security", token)
            var decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
            dispatch(setCurrentUser(decoded));
            dispatch(CompleteProfileSuccess(response));
        })
        .catch(error => {
            dispatch(CompleteProfileError(error.response.data));
            HandleError(error.response.data)
        });
}

export const PatientCompleteProfileAction = (data) => async (dispatch) => {
    dispatch(ProfileRequest());
    axios
        .post(getCurrentHost() + "/patient/patient-complete-profile", data, {
            headers: authHeader(),
        })
        .then(response => {
            const success_res = response.data.data
            const payload = {
                full_name: success_res.full_name,
                dob: success_res.dob,
                email: success_res.email,
                first_name: success_res.first_name,
                last_name: success_res.last_name,
                gender: success_res.gender,
                id: success_res.id,
                isProfileCompleted: success_res.isProfileCompleted,
                phone_number: success_res.phone_number,
                profile_image: success_res.profile_image,
                role: success_res.role,
                security_token: success_res.auth_token,
                state_id: success_res.state_id,
                status: success_res.status
            }
            var token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET);
            localStorage.setItem("auth_security", token)
            var decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
            dispatch(setCurrentUser(decoded));
            dispatch(CompleteProfileSuccess(response));
        })
        .catch(error => {
            dispatch(CompleteProfileError(error.response.data));
            HandleError(error.response.data)
        });
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

export const ProfileAction = () => async (dispatch) => {
    dispatch(ProfileRequest());
    axios
        .get(getCurrentHost() + "/get-my-profile", {
            headers: authHeader(),
        })
        .then(response => {
            dispatch(ProfileSuccess(response));
        })
        .catch(error => {
            dispatch(ProfileError(error.response.data));
            HandleError(error.response.data)
        });
}

export const ProfileUpdateAction = (data, type) => async (dispatch) => {
    console.log("ProfileUpdateAction", data);
    dispatch(ProfileRequest());
    axios
        .post(getCurrentHost() + "/" + type + "/update-" + type + "-profile", data, {
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: response.data});
            var decodeProfileData = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)
            decodeProfileData["full_name"] = response.data.data.full_name
            decodeProfileData["profile_image"] = response.data.data.profile_image
            var token = jwt.sign(decodeProfileData, process.env.REACT_APP_JWT_SECRET);
            localStorage.setItem("auth_security", token)
        })
        .catch(error => {
            dispatch({ type: PROFILE_UPDATE_ERROR, payload: error.response.data});
            HandleError(error.response.data)
        });
}

