import axios from "axios";
import { 
    LOADING,
    PROFILE_SUCCESS,
    PROFILE_ERROR,
    SET_CURRENT_USER
 } from './types';
import getCurrentHost from "./../constants/index";
import { authHeader } from './authHeader';
import HandleError from "./HandleError";
var jwt = require('jsonwebtoken');
const JWT_SECRET = "clinical57586xYtrial"

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
            const success_res = response.data.data
            const payload = {
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
            var token = jwt.sign(payload, JWT_SECRET);
            localStorage.setItem("auth_security", token)
            var decoded = jwt.verify(token, JWT_SECRET);
            dispatch(setCurrentUser(decoded));
            
            dispatch(ProfileSuccess(response));
            HandleError(response.data)
        })
        .catch(error => {
            dispatch(ProfileError(error.response.data));
        });
}

export const TrialClinicCompleteProfileAction = (data) => async (dispatch) => {
    dispatch(ProfileRequest());
    console.log("data asd", data);
    axios
        .post(getCurrentHost() + "/trialclinic/trialclinic-complete-profile", data, {
            headers: authHeader(),
        })
        .then(response => {
            const success_res = response.data.data
            const payload = {
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
            var token = jwt.sign(payload, JWT_SECRET);
            localStorage.setItem("auth_security", token)
            var decoded = jwt.verify(token, JWT_SECRET);
            dispatch(setCurrentUser(decoded));
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
            const success_res = response.data.data
            const payload = {
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
            var token = jwt.sign(payload, JWT_SECRET);
            localStorage.setItem("auth_security", token)
            var decoded = jwt.verify(token, JWT_SECRET);
            dispatch(setCurrentUser(decoded));
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
            const success_res = response.data.data
            const payload = {
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
            var token = jwt.sign(payload, JWT_SECRET);
            localStorage.setItem("auth_security", token)
            var decoded = jwt.verify(token, JWT_SECRET);
            dispatch(setCurrentUser(decoded));
            dispatch(ProfileSuccess(response));
            HandleError(response.data)
        })
        .catch(error => {
            dispatch(ProfileError(error.response.data));
        });
}