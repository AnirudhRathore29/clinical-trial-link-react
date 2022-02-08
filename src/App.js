import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
import store from './app/store';
import PrivateRoute from './views/private-route/PrivateRoute';
import { loginUser } from './app/actions/authAction'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/css/responsive.css';

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
const PatientCompleteProfile = React.lazy(() => import('./patient/completeProfile/CompleteProfile'));

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
);

if (localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	store.dispatch(loginUser(token));
}


function App() {
	return (
		<Router>
			<React.Suspense fallback={loading}>
				<Switch>
					<Route exact path="/" name="Home" render={(props) => <FrontLayout {...props} />} />
					<Route exact path="/login" name="Login" render={(props) => <Login {...props} />} />
					<Route exact path="/sign-up" name="SignUp" render={(props) => <SignUp {...props} />} />
					<Route exact path="/forgot-password" name="ForgotPassword" render={(props) => <ForgotPassword {...props} />} />
					<Route exact path="/new-password" name="NewPassword" render={(props) => <SetNewPassword {...props} />} />
					<Route exact path="/verify-email" name="VerifyEmail" render={(props) => <VerifyEmail {...props} />} />

					{/* Patient Routes */}
					<Route exact path="/patient/complete-profile" name="PatientCompleteProfile" render={(props) => <PatientCompleteProfile {...props} />} />
					<Switch>
						<PrivateRoute path="/patient/dashboard" name="PatientDashboard" component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/edit-profile" name="PatientEditProfile" component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/trial-clinic-details" name="TrialClinicDetails" component={(props) => <BackLayout {...props} />} />
						<PrivateRoute path="/patient/clinic-trial-details" name="PatientClinicalTrialDetails" component={(props) => <BackLayout {...props} />} />
					</Switch>
					<Route path="/:pathName" element={<PageNotFound />} />
				</Switch>
			</React.Suspense>
		</Router>
	);
}

export default App;
