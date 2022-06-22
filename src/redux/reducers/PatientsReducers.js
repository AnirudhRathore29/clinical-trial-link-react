import {
	LOADING,
	PATIENT_DASHBOARD_SUCCESS, PATIENT_DASHBOARD_ERROR,
	PATIENT_CLINIC_LISTING_SUCCESS, PATIENT_CLINIC_LISTING_ERROR,
	PATIENT_CLINIC_DETAILS_SUCCESS, PATIENT_CLINIC_DETAILS_ERROR,
	PATIENT_TRIALCLINIC_TRIAL_LIST_SUCCESS, PATIENT_TRIALCLINIC_TRIAL_LIST_ERROR,
	PATIENT_VIEW_TRIAL_SUCCESS, PATIENT_VIEW_TRIAL_ERROR,
	PATIENT_BOOK_APPOINTMENT_SUCCESS, PATIENT_BOOK_APPOINTMENT_ERROR
} from './../actions/types';
const initialState = {
	data: {},
	loading: false,
	error: {},
	dashboard_patient: {},
	listing_clinic: {},
	clinic_details: {},
	clinic_details_list: {},
	view_trial: {},
	book_appointment: {}
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
		case PATIENT_VIEW_TRIAL_SUCCESS:
			return {
				...state,
				loading: false,
				view_trial: action.payload,
				error: {}
			};
		case PATIENT_VIEW_TRIAL_ERROR:
			return {
				...state,
				loading: false,
				view_trial: {},
				error: action.payload,
			};
		case PATIENT_BOOK_APPOINTMENT_SUCCESS:
			return {
				...state,
				loading: false,
				book_appointment: action.payload,
				error: {}
			};
		case PATIENT_BOOK_APPOINTMENT_ERROR:
			return {
				...state,
				loading: false,
				book_appointment: {},
				error: action.payload,
			};
		default:
			return state;
	}
}