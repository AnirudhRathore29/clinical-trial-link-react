import { TRIAL_SUCCESS, TRIAL_ERROR } from '../actions/types';
const initialState = {};

export default function TrialsReducers(state = initialState, action) {
	switch (action.type) {
		case TRIAL_SUCCESS:
			return action.payload;
		case TRIAL_ERROR:
			return {
				error: action.payload,
				type: 'GET_ERRORS'
			};
		default:
			return state;
	}
}
