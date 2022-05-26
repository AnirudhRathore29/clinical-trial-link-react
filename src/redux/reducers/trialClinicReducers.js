import {
	LOADING,
	SPONSORE_LIST_SUCCESS,
	SPONSORE_LIST_ERROR,
	SPONSORE_DETAIL_SUCCESS,
	SPONSORE_DETAIL_ERROR
} from './../actions/types';
const initialState = {
	data: {},
	loading: false,
	error: {},
	sponsore_detail: {}
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
		default:
			return state;
	}
}