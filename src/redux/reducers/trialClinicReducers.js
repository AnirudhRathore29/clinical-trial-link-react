import {
	LOADING,
	SPONSORE_LIST_SUCCESS,
	SPONSORE_LIST_ERROR
} from './../actions/types';
const initialState = {
	data: {},
	loading: false,
	error: {}
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
		default:
			return state;
	}
}