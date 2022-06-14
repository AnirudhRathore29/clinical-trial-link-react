import {
	LOADING,
	SPONSORE_LIST_SUCCESS,
	SPONSORE_LIST_ERROR,
	SPONSORE_DETAIL_SUCCESS,
	SPONSORE_DETAIL_ERROR,
	SPONSORE_APPLY_TRIAL_SUCCESS,
	SPONSORE_APPLY_TRIAL_ERROR,
	SPONSORE_TRIAL_LISI_SUCCESS,
	SPONSORE_TRIAL_LISI_ERROR,
	TRIAL_CLINIC_DASHBOARD_SUCCESS, TRIAL_CLINIC_DASHBOARD_ERROR
} from './../actions/types';
const initialState = {
	data: {},
	loading: false,
	error: {},
	sponsore_detail: {},
	apply_trial: {},
	stlData: {},
	dashboard: {}
};

export default function TrialClinicReducer(state = initialState, action) {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: true
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
		default:
			return state;
	}
}