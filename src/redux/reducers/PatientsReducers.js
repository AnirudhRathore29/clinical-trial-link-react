import {
	LOADING,
	PATIENT_DASHBOARD_SUCCESS, PATIENT_DASHBOARD_ERROR,
	PATIENT_CLINIC_LISTING_SUCCESS, PATIENT_CLINIC_LISTING_ERROR,
	PATIENT_CLINIC_DETAILS_SUCCESS, PATIENT_CLINIC_DETAILS_ERROR,
	PATIENT_TRIALCLINIC_TRIAL_LIST_SUCCESS, PATIENT_TRIALCLINIC_TRIAL_LIST_ERROR
} from './../actions/types';
const initialState = {
	data: {},
	loading: false,
	error: {},
	dashboard_patient: {},
	listing_clinic: {},
	clinic_details: {},
	clinic_details_list: {}
};

export default function PatientsReducer(state = initialState, action) {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: true
			};
		case PATIENT_DASHBOARD_SUCCESS:
			return {
				...state,
				loading: false,
				dashboard_patient: action.payload,
				error: {}
			};
		case PATIENT_DASHBOARD_ERROR:
			return {
				...state,
				loading: false,
				dashboard_patient: {},
				error: action.payload,
			};
		case PATIENT_CLINIC_LISTING_SUCCESS:
			return {
				...state,
				loading: false,
				listing_clinic: action.payload,
				error: {}
			};
		case PATIENT_CLINIC_LISTING_ERROR:
			return {
				...state,
				loading: false,
				listing_clinic: {},
				error: action.payload,
			};
		case PATIENT_CLINIC_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				clinic_details: action.payload,
				error: {}
			};
		case PATIENT_CLINIC_DETAILS_ERROR:
			return {
				...state,
				loading: false,
				clinic_details: {},
				error: action.payload,
			};
		case PATIENT_TRIALCLINIC_TRIAL_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				clinic_details_list: action.payload,
				error: {}
			};
		case PATIENT_TRIALCLINIC_TRIAL_LIST_ERROR:
			return {
				...state,
				loading: false,
				clinic_details_list: {},
				error: action.payload,
			};
		default:
			return state;
	}
}