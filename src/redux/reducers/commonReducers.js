import {
	SUCCESS,
	ERROR
} from './../actions/types';
const initialState = {};

export default function CommonReducer(state = initialState, action) {
	switch (action.type) {
		case SUCCESS:
			return action.payload;
		case ERROR:
			return {
				type: "ERROR",
				error: action.payload,
			};
		default:
			return state;
	}
}