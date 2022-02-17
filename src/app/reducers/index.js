import { combineReducers } from 'redux';
import apiResReducer from './apiResReducers';
import authReducer from './authReducers';

export default combineReducers({
	apiRes: apiResReducer,
	auth: authReducer
});
