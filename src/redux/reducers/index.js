import { combineReducers } from 'redux';
import authReducer from './authReducers';
import profileReducers from "./profileReducers"
import CommonReducer from './commonReducers';
export default combineReducers({
	auth: authReducer,
	profile: profileReducers,
	common_data: CommonReducer
});
