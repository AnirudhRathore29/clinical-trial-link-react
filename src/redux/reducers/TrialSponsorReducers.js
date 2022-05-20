import { TRIAL_SUCCESS, TRIAL_ERROR, LOADING, SPONSOR_DASHBOARD_SUCCESS, SPONSOR_DASHBOARD_ERROR, CREATE_TRIAL_SUCCESS, CREATE_TRIAL_ERROR, VIEW_TRIAL_SUCCESS, VIEW_TRIAL_ERROR } from '../actions/types';
const initialState = {
	data: {},
	loading: false,
	error: {},
	dashboard:{},
	create_trial:{},
	trial_detail:{}
};

export default function TrialsReducers(state = initialState, action) {
	switch (action.type) {
		case LOADING:
			return{
				...state,
				loading: true
			};
		case TRIAL_SUCCESS:
			return {
				...state,
                loading: false,
				data: action.payload,
				error: {}
			};
		case TRIAL_ERROR:
			return {
				...state,
                loading: false,
				error: action.payload,
				type: 'GET_ERRORS'
			};
		case CREATE_TRIAL_SUCCESS:
			return {
				...state,
                loading: false,
				create_trial: action.payload,
				error: {}
			};
		case CREATE_TRIAL_ERROR:
			return {
				...state,
                loading: false,
				error: action.payload,
				type: 'GET_ERRORS'
			};
		case VIEW_TRIAL_SUCCESS:
			return {
				...state,
                loading: false,
				trial_detail: action.payload,
				error: {}
			};
		case VIEW_TRIAL_ERROR:
			return {
				...state,
                loading: false,
				error: action.payload,
				type: 'GET_ERRORS'
			};
		case SPONSOR_DASHBOARD_SUCCESS:
			return {
				...state,
                loading: false,
				dashboard: action.payload,
				error: {}
			};
		case SPONSOR_DASHBOARD_ERROR:
			return {
				...state,
                loading: false,
				error: action.payload,
				type: 'GET_ERRORS'
			};
		default:
			return state;
	}
}
