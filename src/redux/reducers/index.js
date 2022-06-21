import { combineReducers } from 'redux';
import authReducer from './authReducers';
import profileReducers from "./profileReducers"
import CommonReducer from './commonReducers';
import TrialReducers from './TrialSponsorReducers'
import TrialClinicReducer from './trialClinicReducers';
import PatientsReducer from './PatientsReducers';

export default combineReducers({
	auth: authReducer,
	profile: profileReducers,
	common_data: CommonReducer,
	My_trials: TrialReducers,
	trial_clinic: TrialClinicReducer,
	patient: PatientsReducer
});
