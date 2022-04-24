import {
	SET_CURRENT_USER,
	AUTH_LOADING,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR
} from './../actions/types';
const isEmpty = require('is-empty');
const initialState = {
	isAuthenticated: false,
	user: {},
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
			};
		default:
			return state;
	}
}