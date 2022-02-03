import { GET_SUCCESS, GET_ERRORS } from '../actions/types';
const initialState = {};

export default function apiResReducer(state = initialState, action) {
	switch (action.type) {
		case GET_SUCCESS:
			console.log('action', action.payload);
			return action.payload;
		case GET_ERRORS:
			console.log('reducer GET_ERRORS', action.payload);
			return {
				error: action.payload.data,
				type: 'GET_ERRORS'
			};
		default:
			return state;
	}
}
