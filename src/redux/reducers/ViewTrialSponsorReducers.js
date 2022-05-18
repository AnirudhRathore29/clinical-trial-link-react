import { VIEW_TRIAL_SUCCESS, VIEW_TRIAL_ERROR } from '../actions/types';
const initialState = {};

export default function ViewTrialsReducers(state = initialState, action) {
	switch (action.type) {
		case VIEW_TRIAL_SUCCESS:
			return action.payload;
		case VIEW_TRIAL_ERROR:
			return {
				error: action.payload,
				type: 'GET_ERRORS'
			};
		default:
			return state;
	}
}
