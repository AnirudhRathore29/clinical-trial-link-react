import {
	SET_CURRENT_USER,
	AUTH_LOADING,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
	RESEND_EMAIL_SUCCESS,
	FORGOT_SUCCESS,
	FORGOT_ERROR
} from './../actions/types';
const isEmpty = require('is-empty');
const initialState = {
	isAuthenticated: false,
	user: {},
	error: {},
	loading: false
};
export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case AUTH_LOADING:
			return {
				...state,
				loading: true
			};
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
				loading: false
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
				loading: false
			};
		case LOGIN_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
				user: {},
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				user: action.payload,
				loading: false
			};
		case SIGNUP_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
				user: {},
			};
		case RESEND_EMAIL_SUCCESS:
			return {
				user: action.payload,
				loading: false
			};
		case FORGOT_SUCCESS:
			return {
				user: action.payload,
				loading: false
			};
		case FORGOT_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
				user: {},
			};
		default:
			return state;
	}
}