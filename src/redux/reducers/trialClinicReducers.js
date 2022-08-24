import {
	LOADING,
	SPONSORE_LIST_SUCCESS, SPONSORE_LIST_ERROR,
	SPONSORE_DETAIL_SUCCESS, SPONSORE_DETAIL_ERROR,
	SPONSORE_APPLY_TRIAL_SUCCESS, SPONSORE_APPLY_TRIAL_ERROR,
	SPONSORE_TRIAL_LISI_SUCCESS, SPONSORE_TRIAL_LISI_ERROR,
	TRIAL_CLINIC_DASHBOARD_SUCCESS, TRIAL_CLINIC_DASHBOARD_ERROR,
	TRIAL_APPLICATION_SUCCESS, TRIAL_APPLICATION_ERROR,
	TRIAL_APPLICATION_DETAIL_SUCCESS, TRIAL_APPLICATION_DETAIL_ERROR,
	TRIAL_APPLICATION_STATUS_SUCCESS, TRIAL_APPLICATION_STATUS_ERROR,
	CLINIC_NEW_TRIAL_REQUEST_SUCCESS, CLINIC_NEW_TRIAL_REQUEST_ERROR, NEW_TRIAL_REQUEST_STATUS_SUCCESS, NEW_TRIAL_REQUEST_STATUS_ERROR, STATUS_LOADING, CLINIC_NEW_SCREEN_TRIAL_REQUEST_SUCCESS, CLINIC_NEW_SCREEN_TRIAL_REQUEST_ERROR, CLINIC_NEW_SCREEN_TRIAL_DETAIL_SUCCESS, CLINIC_NEW_SCREEN_TRIAL_DETAIL_ERROR
} from './../actions/types';
const initialState = {
	data: {},
	loading: false,
	status_loading: false,
	error: {},
	sponsore_detail: {},
	apply_trial: {},
	stlData: {},
	dashboard: {},
	trial_app: {},
	trial_app_detail: {},
	trial_status: {},
	new_trial_request: {},
	new_screen_trial_request: {},
	new_screen_trial_detail: {},
	patient_trial_request_status: {}
};

export default function TrialClinicReducer(state = initialState, action) {
	console.log("TrialClinicReducer", action);
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: true,
			};
		case STATUS_LOADING:
			return {
				...state,
				status_loading: true,
			};
		case SPONSORE_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				error: {}
			};
		case SPONSORE_LIST_ERROR:
			return {
				...state,
				loading: false,
				data: {},
				error: action.payload,
			};
		case SPONSORE_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				sponsore_detail: action.payload,
				error: {}
			};
		case SPONSORE_DETAIL_ERROR:
			return {
				...state,
				loading: false,
				sponsore_detail: {},
				error: action.payload,
			};

		case SPONSORE_APPLY_TRIAL_SUCCESS:
			return {
				...state,
				loading: false,
				apply_trial: action.payload,
				error: {}
			};
		case SPONSORE_APPLY_TRIAL_ERROR:
			return {
				...state,
				loading: false,
				apply_trial: {},
				error: action.payload,
			};
		case SPONSORE_TRIAL_LISI_SUCCESS:
			return {
				...state,
				loading: false,
				stlData: action.payload,
				error: {}
			};
		case SPONSORE_TRIAL_LISI_ERROR:
			return {
				...state,
				loading: false,
				stlData: {},
				error: action.payload,
			};

		case TRIAL_CLINIC_DASHBOARD_SUCCESS:
			return {
				...state,
				loading: false,
				dashboard: action.payload,
				error: {}
			};
		case TRIAL_CLINIC_DASHBOARD_ERROR:
			return {
				...state,
				loading: false,
				dashboard: {},
				error: action.payload,
			};
		case TRIAL_APPLICATION_SUCCESS:
			return {
				...state,
				loading: false,
				trial_app: action.payload,
				error: {}
			};
		case TRIAL_APPLICATION_ERROR:
			return {
				...state,
				loading: false,
				trial_app: {},
				error: action.payload,
			};
		case TRIAL_APPLICATION_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				trial_app_detail: action.payload,
				error: {}
			};
		case TRIAL_APPLICATION_DETAIL_ERROR:
			return {
				...state,
				loading: false,
				trial_app_detail: {},
				error: action.payload,
			};
		case TRIAL_APPLICATION_STATUS_SUCCESS:
			return {
				...state,
				loading: false,
				trial_status: action.payload,
				error: {}
			};
		case TRIAL_APPLICATION_STATUS_ERROR:
			return {
				...state,
				loading: false,
				trial_status: {},
				error: action.payload,
			};
		case CLINIC_NEW_TRIAL_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				new_trial_request: action.payload,
				error: {}
			};
		case CLINIC_NEW_TRIAL_REQUEST_ERROR:
			return {
				...state,
				loading: false,
				new_trial_request: {},
				error: action.payload,
			};
		case NEW_TRIAL_REQUEST_STATUS_SUCCESS:
			return {
				...state,
				loading: false,
				status_loading: false,
				patient_trial_request_status: action.payload,
				error: {}
			};
		case NEW_TRIAL_REQUEST_STATUS_ERROR:
			return {
				...state,
				loading: false,
				status_loading: false,
				patient_trial_request_status: {},
				error: action.payload,
			};
		case CLINIC_NEW_SCREEN_TRIAL_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				new_screen_trial_request: action.payload,
				new_screen_trial_detail: {},
				error: {}
			};
		case CLINIC_NEW_SCREEN_TRIAL_REQUEST_ERROR:
			return {
				...state,
				loading: false,
				new_screen_trial_request: {},
				error: action.payload,
			};
		case CLINIC_NEW_SCREEN_TRIAL_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				new_screen_trial_detail: action.payload,
				error: {}
			};
		case CLINIC_NEW_SCREEN_TRIAL_DETAIL_ERROR:
			return {
				...state,
				loading: false,
				new_screen_trial_detail: {},
				error: action.payload,
			};
		default:
			return state;
	}
}