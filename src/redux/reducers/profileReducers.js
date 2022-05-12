import {
	LOADING,
	PROFILE_SUCCESS,
	PROFILE_ERROR
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
				error: action.payload,
			};
		default:
			return state;
	}
}