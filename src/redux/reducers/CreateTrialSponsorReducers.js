import { CREATE_TRIAL_SUCCESS, CREATE_TRIAL_ERROR } from '../actions/types';
const initialState = {};

export default function CreateTrialsReducers(state = initialState, action) {
	switch (action.type) {
		case CREATE_TRIAL_SUCCESS:
			return action.payload;
		case CREATE_TRIAL_ERROR:
			return {
				error: action.payload,
				type: 'GET_ERRORS'
			};
		default:
			return state;
	}
}
