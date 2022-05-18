import { TRIAL_SUCCESS, TRIAL_ERROR, LOADING } from '../actions/types';
const initialState = {
	data: {},
	loading: false,
	error: {}
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
		default:
			return state;
	}
}
