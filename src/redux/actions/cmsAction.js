import axios from "axios";
import getCurrentHost from "../constants/index";
import { authHeader } from './authHeader';
import HandleError from "./HandleError";
import { LOADING, GET_HOME_PAGE_DETAIL_ERROR, GET_HOME_PAGE_DETAIL_SUCCESS, GET_CMS_DETAIL_SUCCESS, GET_CMS_DETAIL_ERROR, GET_FAQ_DETAIL_SUCCESS, GET_FAQ_DETAIL_ERROR, GET_FOOTER_DETAIL_SUCCESS, GET_FOOTER_DETAIL_ERROR, GET_CONTACT_PAGE_DETAIL_SUCCESS, GET_CONTACT_PAGE_DETAIL_ERROR } from "./types";

export function Request() {
    return {
        type: LOADING
    };
}

export const HomePageDetailAction = () => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + `/get-homepage-detail`, {
            headers: authHeader(true),
        })
        .then(response => {
            dispatch({type: GET_HOME_PAGE_DETAIL_SUCCESS, payload: response})
        })
        .catch(error => {
            dispatch({ type: GET_HOME_PAGE_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        })
}

export const CmsPageDetailAction = (slug) => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + `/get-cmspage-detail/${slug}`, {
            headers: authHeader(true),
        })
        .then(response => {
            dispatch({type: GET_CMS_DETAIL_SUCCESS, payload: response})
        })
        .catch(error => {
            dispatch({ type: GET_CMS_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        })
}

export const FaqDetailAction = () => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + `/get-faq`, {
            headers: authHeader(true),
        })
        .then(response => {
            dispatch({type: GET_FAQ_DETAIL_SUCCESS, payload: response})
        })
        .catch(error => {
            dispatch({ type: GET_FAQ_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        })
}

export const FooterDetailAction = () => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + `/get-site-setting`, {
            headers: authHeader(true),
        })
        .then(response => {
            dispatch({type: GET_FOOTER_DETAIL_SUCCESS, payload: response})
        })
        .catch(error => {
            dispatch({ type: GET_FOOTER_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        })
}

export const ContactPageDetailAction = () => async (dispatch) => {
    dispatch(Request());
    axios
        .get(getCurrentHost() + `/get-contact-us-data`, {
            headers: authHeader(true),
        })
        .then(response => {
            dispatch({type: GET_CONTACT_PAGE_DETAIL_SUCCESS, payload: response})
        })
        .catch(error => {
            dispatch({ type: GET_CONTACT_PAGE_DETAIL_ERROR, payload: error.response.data });
            HandleError(error.response.data)
        })
}