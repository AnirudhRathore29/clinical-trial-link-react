import { combineReducers } from 'redux';
import authReducer from './authReducers';
import profileReducers from "./profileReducers"
import CommonReducer from './commonReducers';
import TrialReducers from './TrialSponsorReducers'
import ViewTrialReducers from './ViewTrialSponsorReducers'
import CreateTrialsReducers from './CreateTrialSponsorReducers';
import TrialClinicReducer from './trialClinicReducers';

export default combineReducers({
	auth: authReducer,
	profile: profileReducers,
	common_data: CommonReducer,
	My_trials: TrialReducers,
	View_trials: ViewTrialReducers,
	create_trials: CreateTrialsReducers,
	trial_clinic: TrialClinicReducer
});
