import {
    USERSIGNUP_SUCCESS,
    USERSLOGIN_SUCCESS,
    USERSLOGOUT_SUCCESS,
    CONTACTFORM_SUCCESS
} from "../Type.js/Type";
import Api from "../../Api/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const signupApiData =
    ({ Formdata }) =>
        (dispatch) => {
            const config = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(Formdata),
            };
            fetch(Api.baseURL + `/users/register`, config)
                .then((resp) => resp.json())
                .then(
                    result => {
                        dispatch({
                            type: USERSIGNUP_SUCCESS,
                            payload: result,
                        })
                        if (result.status === "success") {
                            toast.success("Signup Successfully")
                            setInterval(() => {
                                window.location.href = "/login"
                            }, 700);
                        }
                        else {
                            toast.error(result.message)
                        }
                    }
                )
        };

const loginApiData =
    ({ loginFieldData }) =>
        (dispatch) => {
            const config = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(loginFieldData),
            };
            fetch(Api.baseURL + `/users/login`, config)
                .then((resp) => resp.json())
                .then(
                    result => {
                        dispatch({
                            type: USERSLOGIN_SUCCESS,
                            payload: result,
                        })
                        if (result.status === "success") {
                            toast.success("Login Successfully")
                            localStorage.setItem("user-token", result.data.token)
                            setInterval(() => {
                                window.location.href = "/my-subscription"
                            }, 700);
                        }
                        else {
                            toast.error(result.message)
                        }
                    }
                )
        };

const LogoutApiData =
    () => (dispatch) => {
        const token = localStorage.getItem("user-token");
        const config = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: "BEARER " + token,
            },
        };
        fetch(Api.baseURL + `/users/logout`, config)
            .then((res) => res.json())
            .then((data) => {
                console.log("res", data);
                dispatch({
                    type: USERSLOGOUT_SUCCESS,
                    payload: data,
                });
                localStorage.removeItem("user-token");
            })
            .catch((err) => {
                if (err) {
                    console.log("this is err", err);
                }
            });
    };



const ContactApiData =
    ({ contactFields }) =>
        (dispatch) => {
            const config = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(contactFields),
            };
            fetch(Api.baseURL + `/users/contact-us`, config)
                .then((resp) => resp.json())
                .then(
                    result => {
                        dispatch({
                            type: CONTACTFORM_SUCCESS,
                            payload: result,
                        })
                        if (result.status === "success") {
                            toast.success("Contact request submitted successfully")
                        }
                        else {
                            toast.error(result.message)
                        }
                    }
                )
        };

export { signupApiData, loginApiData, LogoutApiData, ContactApiData };
