import {
	LOADING,
	PROFILE_SUCCESS,
	PROFILE_ERROR,
	COMPLETE_PROFILE_SUCCESS,
	COMPLETE_PROFILE_ERROR
} from './../actions/types';
const initialState = {
	data: {},
	loading: false,
	error: {}
};

export default function ProfileReducer(state = initialState, action) {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: true
			};
		case COMPLETE_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				error: {}
			};
		case COMPLETE_PROFILE_ERROR:
			return {
				...state,
				loading: false,
				data: {},
				error: action.payload,
			};
		case PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				error: {}
			};
		case PROFILE_ERROR:
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