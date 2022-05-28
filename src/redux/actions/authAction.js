import axios from "axios";
import { SET_CURRENT_USER, AUTH_LOADING, LOGIN_SUCCESS, LOGIN_ERROR, SIGNUP_SUCCESS, SIGNUP_ERROR, RESEND_EMAIL_SUCCESS, LOGOUT_ACTION, FORGOT_SUCCESS, FORGOT_ERROR } from './types';
import getCurrentHost from "./../constants/index";
import { authHeader } from './authHeader';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
var jwt = require('jsonwebtoken');
const JWT_SECRET = "clinical57586xYtrial"

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

export function authRequest() {
    return {
        type: AUTH_LOADING
    };
}

export function signUpSuccess(response) {
    return {
        type: SIGNUP_SUCCESS,
        payload: response,
    };
}

export function signUpError(message) {
    return {
        type: SIGNUP_ERROR,
        payload: message,
    };
}

export const SignupAction = (data) => async (dispatch) => {
    dispatch(authRequest());
    axios
        .post(getCurrentHost() + "/user-register", data, {
            headers: authHeader(true),
        })
        .then(response => {
            dispatch(signUpSuccess(response));
        })
        .catch(error => {
            dispatch(signUpError(error.response.data));
        });
}

export function ResendEmailSuccess(response) {
    return {
        type: RESEND_EMAIL_SUCCESS,
        payload: response,
    };
}

export const ResendEmailAction = (data) => async (dispatch) => {
    dispatch(authRequest());
    axios
        .post(getCurrentHost() + "/resend-register-email", data, {
            headers: authHeader(true),
        })
        .then(response => {
            dispatch(ResendEmailSuccess(response));
        })
        .catch(error => {
            dispatch(signUpError(error.response.data));
        });
}



export function loginSuccess(response) {
    return {
        type: LOGIN_SUCCESS,
        payload: response,
    };
}

export function loginError(message) {
    return {
        type: LOGIN_ERROR,
        payload: message,
    };
}

export const LoginAction = (data) => async (dispatch) => {
    dispatch(authRequest());
    axios
        .post(getCurrentHost() + "/login", data, {
            headers: authHeader(true),
        })
        .then(response => {
            const success_res = response.data.data
            const payload = {
                full_name: success_res.full_name,
                dob: success_res.dob,
                email: success_res.email,
                first_name: success_res.first_name,
                gender: success_res.gender,
                id: success_res.id,
                isProfileCompleted: success_res.isProfileCompleted,
                last_name: success_res.last_name,
                phone_number: success_res.phone_number,
                profile_image: success_res.profile_image,
                role: success_res.role,
                security_token: success_res.security_token,
                state_id: success_res.state_id,
                status: success_res.status
            }
            var token = jwt.sign(payload, JWT_SECRET);
            localStorage.setItem("auth_security", token)
            var decoded = jwt.verify(token, JWT_SECRET);
            dispatch(loginSuccess(response));
            dispatch(setCurrentUser(decoded));

        })
        .catch(error => {
            dispatch(loginError(error.response.data));
        });
}

export function ForgotPassSuccess(response) {
    return {
        type: FORGOT_SUCCESS,
        payload: response,
    };
}

export function ForgotPassError(message) {
    return {
        type: FORGOT_ERROR,
        payload: message,
    };
}

export const ForgotPasswordAction = (data) => async (dispatch) => {
    dispatch(authRequest());
    axios
        .post(getCurrentHost() + "/forgot-password", data, {
            headers: authHeader(true),
        })
        .then(response => {
            dispatch(ForgotPassSuccess(response));
        })
        .catch(error => {
            dispatch(ForgotPassError(error.response.data));
        });
}

export const CreateNewPassAction = (data) => async (dispatch) => {
    dispatch(authRequest());
    axios
        .post(getCurrentHost() + "/reset-password", data, {
            headers: authHeader(true),
        })
        .then(response => {
            dispatch(ForgotPassSuccess(response));
        })
        .catch(error => {
            dispatch(ForgotPassError(error.response.data));
        });
}

export function LogoutSuccess(response) {
    return {
        type: LOGOUT_ACTION,
        payload: response,
    };
}
export const LogoutAction = (data) => async (dispatch) => {
    axios
        .post(getCurrentHost() + "/logout", data, {
            headers: authHeader(),
        })
        .then(response => {
            dispatch(LogoutSuccess(response));
            dispatch(setCurrentUser({}));
            localStorage.removeItem("auth_security");
            toast.success(response.data.message, { theme: "colored" })
        })
        .catch(error => {
            console.log("error", error)
        });
}