import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import store from './redux/store';
import PrivateRoute from './views/private-route/PrivateRoute';
import { setCurrentUser } from './redux/actions/authAction'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Assets/css/responsive.css';
import ScrollToTop from './views/Components/ScrollToTop/ScrollToTop';
import { LogoLoader } from './views/Components/Common/LogoLoader/LogoLoader';
import { onMessageListener } from './utils/Firebase';

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

var jwt = require('jsonwebtoken');

const loading = (
	<div className='fullPageLoader testLoader'>
		<LogoLoader />
	</div>
);

if (localStorage.auth_security) {
	const token = localStorage.auth_security;
	var decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
	store.dispatch(setCurrentUser(decoded));
}

// onMessageListener().then(payload => {
// 	// setShow(true);
// 	// setNotification({title: payload.notification.title, body: payload.notification.body})
// 	console.log("payload notification", payload);
// }).catch(err => console.log('failed: ', err));


function App() {
	return (
		<>
			{/* <ScrollToTop /> */}
			<Router>
				<React.Suspense fallback={loading} onReset={() => window.location.reload()}>
					<Switch>
						<Route exact path="/" name="Home" render={(props) => <FrontLayout {...props} />} />
						<Route exact path="/contact-us" name="ContactUs" render={(props) => <FrontLayout className="inner-header" {...props} />} />
						<Route exact path="/clinic-listing" name="ClinicListing" render={(props) => <FrontLayout className="inner-header" {...props} />} />
						<Route exact path="/clinic-details" name="ClinicDetails" render={(props) => <FrontLayout className="inner-header" {...props} />} />
						<Route exact path="/trial-listing" name="TrialListing" render={(props) => <FrontLayout className="inner-header" {...props} />} />
						<Route exact path="/about-us" name="AboutUS" render={(props) => <FrontLayout className="inner-header" {...props} />} />
						<Route exact path="/terms-conditions" name="TermsConditions" render={(props) => <FrontLayout className="inner-header" {...props} />} />
						<Route exact path="/privacy-policy" name="PrivacyPolicy" render={(props) => <FrontLayout className="inner-header" {...props} />} />
						<Route exact path="/faq" name="Faq" render={(props) => <FrontLayout className="inner-header" {...props} />} />

						<Route exact path="/login" name="Login" render={(props) => <Login {...props} />} />
						<Route exact path="/sign-up" name="SignUp" render={(props) => <SignUp {...props} />} />
						<Route exact path="/forgot-password" name="ForgotPassword" render={(props) => <ForgotPassword {...props} />} />
						<Route exact path="/new-password" name="NewPassword" render={(props) => <SetNewPassword {...props} />} />
						<Route exact path="/verify-email" name="VerifyEmail" render={(props) => <VerifyEmail {...props} />} />

						<Switch>
							{/* Patient private Routes */}
							<PrivateRoute path="/patient/complete-profile" name="PatientCompleteProfile" component={(props) => <BackLayout {...props} />} />
							<PrivateRoute path="/patient/dashboard" name="PatientDashboard" component={(props) => <BackLayout {...props} />} />
							<PrivateRoute path="/patient/edit-profile" name="PatientEditProfile" component={(props) => <BackLayout {...props} />} />
							<PrivateRoute path="/patient/trial-clinic-details/:id" name="TrialClinicDetails" component={(props) => <BackLayout {...props} />} />
							<PrivateRoute path="/patient/my-appointments" name="PatientMyAppointments" component={(props) => <BackLayout {...props} />} />
							<PrivateRoute path="/patient/clinic-listing" name="PatientClinicListing" component={(props) => <BackLayout {...props} />} />
							<PrivateRoute path="/patient/my-favorites" name="PatientMyFavorites" component={(props) => <BackLayout {...props} />} />
							<PrivateRoute path="/patient/my-chats" name="SponsorsMyChats" component={(props) => <BackLayout {...props} />} />
							<PrivateRoute path="/patient/payment-history" name="PatientPaymentHistory" component={(props) => <BackLayout {...props} />} />
							<PrivateRoute path="/patient/trial-listing" name="PatientTrialListing" component={(props) => <BackLayout {...props} />} />
							<PrivateRoute path="/patient/patient-visits/:id" name="PatientAllVisit" component={(props) => <BackLayout {...props} />} />
							<PrivateRoute path="/patient/search-listing" name="PatientTrialListing" component={(props) => <BackLayout {...props} />} />

							{/* clinic private Routes */}
							<PrivateRoute path="/trial-clinic/complete-profile" name="ClinicCompleteProfile" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/dashboard" name="ClinicDashboard" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/trial-requests" name="ClinicTrialRequests" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/screen-trial-request" name="ClinicTrialScreenRequest" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/screen-trial-request/:id" name="ClinicTrialScreenRequestDetail" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/sponsors-listing" name="ClinicSponsorsListing" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/sponsors-details/:id" name="ClinicSponsorsDetails" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/sponsors-trial-listing/:id" name="ClinicSponsorsDetails" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/trial-applications" name="ClinicTrialApplication" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/my-appointments" name="ClinicMyAppointments" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/appointments/:id" name="ClinicMyAppointmentsDetails" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/payment" name="ClinicPayment" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/patient-list/:id" name="ClinicPatientList" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/patient-list-past/:id" name="ClinicPatientListPast" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/payment-history" name="ClinicPaymentHistory" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/edit-profile" name="ClinicEditProfile" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/manage-patient" name="ClinicManagePatient" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/patient-visits/:id" name="ClinicPatientAllVisit" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />
							<PrivateRoute path="/trial-clinic/my-chats" name="SponsorsMyChats" component={(props) => <BackLayout headerColor="trialClinic" {...props} />} />

							{/* sponsor private Routes */}
							<PrivateRoute path="/trial-sponsors/complete-profile" name="SponsorsCompleteProfile" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/dashboard" name="SponsorsDashboard" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/trial-requests" name="SponsorsTrialRequests" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/trials" name="SponsorsTrials" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/clinic-listing" name="SponsorsClinicListing" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/clinic-details/:id" name="SponsorsClinicDetails" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/my-trials" name="SponsorsMyStudies" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/appointments-clinics/:id" name="SponsorsAppointmentsClinics" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/patient-list/:id" name="SponsorsPatientList" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/patient-list-past" name="SponsorsPatientListPast" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/payment-history" name="SponsorsPaymentHistory" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/payment" name="SponsorPayment" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/edit-profile" name="SponsorsEditProfile" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/manage-clinics" name="SponsorsManageClinics" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/manage-patient" name="SponsorsManagePatient" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/my-chats" name="SponsorsMyChats" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/trial-sponsors/patient-visits/:id" name="SponsorPatientAllVisit" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />

							{/* Physician private Routes */}
							<PrivateRoute path="/physician/complete-profile" name="PhysicianCompleteProfile" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/dashboard" name="PhysicianDashboard" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/clinic-listing" name="PhysicianClinicListing" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/clinic-details/:id" name="PhysicianClinicDetails" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/trial-listing" name="PhysicianTrialListing" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/manage-patient" name="PhysicianManagePatient" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/manage-all-patient" name="PhysicianManageAllPatient" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/patient-visits/:id" name="PhysicianPatientAllVisit" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/my-chats" name="PhysicianMyChats" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/edit-profile" name="PhysicianEditProfile" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/approved-trials" name="PhysicianApprovedTrials" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/approved-patient-list/:id" name="ApprovedPatientList" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/search-listing" name="PhysicianTrialListing" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
							<PrivateRoute path="/physician/payment-history" name="SponsorsPaymentHistory" component={(props) => <BackLayout headerColor="trialSponsors" {...props} />} />
						</Switch>
						{/* /:pathName */}
						<Route path="/:pathName" element={<PageNotFound />} />
					</Switch>
				</React.Suspense>
			</Router>
		</>
	);
}

export default App;
