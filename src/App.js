import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import PrivateRoute from './views/private-route/PrivateRoute';
import { setCurrentUser } from './redux/actions/authAction'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Assets/css/responsive.css';

import { RolesConfig } from "./utils/AppConfig"

/* Layout */
const FrontLayout = React.lazy(() => import('./containers/FrontLayout'));
const BackLayout = React.lazy(() => import('./containers/BackLayout'));

/* Pages */
const Login = React.lazy(() => import('./views/pages/Login/Login'));
const SignUp = React.lazy(() => import('./views/pages/SignUp/SignUp'));
const ForgotPassword = React.lazy(() => import('./views/pages/ForgotPassword/ForgotPassword'));
const SetNewPassword = React.lazy(() => import('./views/pages/SetNewPassword/SetNewPassword'));
const VerifyEmail = React.lazy(() => import('./views/pages/VerifyEmail/VerifyEmail'));
const PageNotFound = React.lazy(() => import('./views/pages/PageNotFound/404'));

/* patient panel pages */
// const PatientCompleteProfile = React.lazy(() => import('./Patient/CompleteProfile/CompleteProfile'));
// const ClinicCompleteProfile = React.lazy(() => import('./TrialClinic/CompleteProfile/CompleteProfile'));
// const SponsorsCompleteProfile = React.lazy(() => import('./TrialSponsors/CompleteProfile/CompleteProfile'));
// const PhysicianCompleteProfile = React.lazy(() => import('./Physician/CompleteProfile/CompleteProfile'));

var jwt = require('jsonwebtoken');
const JWT_SECRET = "clinical57586xYtrial"

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
);

if (localStorage.auth_security) {
    const token = localStorage.auth_security;
	var decoded = jwt.verify(token, JWT_SECRET);
    store.dispatch(setCurrentUser(decoded));
}

function App() {
	return (
		<Router>
			<React.Suspense fallback={loading}>
				<Switch>
					<Route exact path="/" name="Home" render={(props) => <FrontLayout {...props} />} />
					<Route exact path="/contact-us" name="ContactUs" render={(props) => <FrontLayout className="inner-header" {...props} />} />
					<Route exact path="/clinic-listing" name="ClinicListing" render={(props) => <FrontLayout className="inner-header" {...props} />} />
					<Route exact path="/clinic-details" name="ClinicDetails" render={(props) => <FrontLayout className="inner-header" {...props} />} />
					<Route exact path="/trial-listing" name="TrialListing" render={(props) => <FrontLayout className="inner-header" {...props} />} />
					<Route exact path="/about-us" name="AboutUS" render={(props) => <FrontLayout className="inner-header" {...props} />} />
					
					<Route exact path="/login" name="Login" render={(props) => <Login {...props} />} />
					<Route exact path="/sign-up" name="SignUp" render={(props) => <SignUp {...props} />} />
					<Route exact path="/forgot-password" name="ForgotPassword" render={(props) => <ForgotPassword {...props} />} />
					<Route exact path="/new-password" name="NewPassword" render={(props) => <SetNewPassword {...props} />} />
					<Route exact path="/verify-email" name="VerifyEmail" render={(props) => <VerifyEmail {...props} />} />

					<Switch>
						{/* Patient private Routes */}
						<PrivateRoute path="/patient/complete-profile" name="PatientCompleteProfile" accessRole={RolesConfig.PATIENT} component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/dashboard" name="PatientDashboard" accessRole={RolesConfig.PATIENT} component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/edit-profile" name="PatientEditProfile" accessRole={RolesConfig.PATIENT} component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/trial-clinic-details" name="TrialClinicDetails" accessRole={RolesConfig.PATIENT} component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/my-appointments" name="PatientMyAppointments" accessRole={RolesConfig.PATIENT} component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/clinic-listing" name="PatientClinicListing" accessRole={RolesConfig.PATIENT} component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/my-favorites" name="PatientMyFavorites" accessRole={RolesConfig.PATIENT} component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/my-chats" name="PatientMyChats" accessRole={RolesConfig.PATIENT} component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/payment-history" name="PatientPaymentHistory" accessRole={RolesConfig.PATIENT} component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/trial-listing" name="PatientTrialListing" accessRole={RolesConfig.PATIENT} component={(props) => <BackLayout {...props} />} />

						{/* clinic private Routes */}
						<PrivateRoute path="/trial-clinic/complete-profile" name="ClinicCompleteProfile" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/dashboard" name="ClinicDashboard" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/trial-requests" name="ClinicTrialRequests" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/sponsors-listing" name="ClinicSponsorsListing" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/sponsors-details/:id" name="ClinicSponsorsDetails" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/sponsors-trial-listing" name="ClinicSponsorsDetails" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/trial-applications" name="ClinicTrialApplication" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/my-appointments" name="ClinicMyAppointments" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/patient-list" name="ClinicPatientList" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/patient-list-past" name="ClinicPatientListPast" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/payment-history" name="ClinicPaymentHistory" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/edit-profile" name="ClinicEditProfile" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/manage-patient" name="ClinicManagePatient" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
						<PrivateRoute path="/trial-clinic/my-chats" name="ClinicMyChats" accessRole={RolesConfig.TRIAL_CLINIC} component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />

						{/* sponsor private Routes */}
						<PrivateRoute path="/trial-sponsors/complete-profile" name="SponsorsCompleteProfile" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/dashboard" name="SponsorsDashboard" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/trial-requests" name="SponsorsTrialRequests" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/trials" name="SponsorsTrials" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/clinic-listing" name="SponsorsClinicListing" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/clinic-details/:id" name="SponsorsClinicDetails" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/my-studies" name="SponsorsMyStudies" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/appointments-clinics" name="SponsorsAppointmentsClinics" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/patient-list" name="SponsorsPatientList" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/patient-list-past" name="SponsorsPatientListPast" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/payment-history" name="SponsorsPaymentHistory" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/edit-profile" name="SponsorsEditProfile" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/manage-clinics" name="SponsorsManageClinics" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/manage-patient" name="SponsorsManagePatient" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/trial-sponsors/my-chats" name="SponsorsMyChats" accessRole={RolesConfig.TRIAL_SPONSORS} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />

						{/* Physician private Routes */}
						<PrivateRoute path="/physician/complete-profile" name="PhysicianCompleteProfile" accessRole={RolesConfig.PHYSICIAN} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/physician/dashboard" name="PhysicianDashboard" accessRole={RolesConfig.PHYSICIAN} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/physician/clinic-listing" name="PhysicianClinicListing" accessRole={RolesConfig.PHYSICIAN} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/physician/clinic-details" name="PhysicianClinicDetails" accessRole={RolesConfig.PHYSICIAN} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/physician/trial-listing" name="PhysicianTrialListing" accessRole={RolesConfig.PHYSICIAN} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/physician/manage-patient" name="PhysicianManagePatient" accessRole={RolesConfig.PHYSICIAN} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/physician/my-chats" name="PhysicianMyChats" accessRole={RolesConfig.PHYSICIAN} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						<PrivateRoute path="/physician/edit-profile" name="PhysicianEditProfile" accessRole={RolesConfig.PHYSICIAN} component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
					</Switch>
					<Route path="/:pathName" element={<PageNotFound />} />
				</Switch>
			</React.Suspense>
		</Router>
	);
}

export default App;
