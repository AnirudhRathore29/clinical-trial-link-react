import { TRIAL_SUCCESS, TRIAL_ERROR, LOADING, SPONSOR_DASHBOARD_SUCCESS, SPONSOR_DASHBOARD_ERROR, CREATE_TRIAL_SUCCESS, CREATE_TRIAL_ERROR, VIEW_TRIAL_SUCCESS, VIEW_TRIAL_ERROR, TRIAL_CLINIC_LIST_ERROR, TRIAL_CLINIC_LIST_SUCCESS, RECRUITING_STATUS_SUCCESS, RECRUITING_STATUS_ERROR, TRIAL_CLINIC_DETAIL_SUCCESS, TRIAL_CLINIC_DETAIL_ERROR } from '../actions/types';
const initialState = {
	data: {},
	loading: false,
	error: {},
	dashboard: {},
	create_trial: {},
	trial_detail: {},
	clinic_list: {},
	clinic_detail: {}
};

export default function TrialsReducers(state = initialState, action) {
	switch (action.type) {
		case LOADING:
			return {
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
				error: action.payload
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
				error: action.payload
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
				error: action.payload
			};
		case RECRUITING_STATUS_SUCCESS:
			return {
				...state,
				loading: false,
				trial_detail_status: action.payload,
				error: {}
			};
		case RECRUITING_STATUS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
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
				error: action.payload
			};
		case TRIAL_CLINIC_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				clinic_list: action.payload,
				error: {}
			};
		case TRIAL_CLINIC_LIST_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case TRIAL_CLINIC_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				clinic_detail: action.payload,
				error: {}
			};
		case TRIAL_CLINIC_DETAIL_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
}
