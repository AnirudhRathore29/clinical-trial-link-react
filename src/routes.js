import React from 'react';

const Home = React.lazy(() => import('./views/pages/Home/Home'));
const PatientDashboard = React.lazy(() => import('./Patient/Dashboard/Dashboard'));
const PatientEditProfile = React.lazy(() => import('./Patient/EditProfile/EditProfile'));
const PatientTrialClinicDetails = React.lazy(() => import('./Patient/TrialClinicDetails/TrialClinicDetails'));
const PatientMyAppointments = React.lazy(() => import('./Patient/MyAppointments/MyAppointments'));
const PatientClinicListing = React.lazy(() => import('./Patient/ClinicListing/ClinicListing'));
const PatientMyFavorites = React.lazy(() => import('./Patient/MyFavorites/MyFavorites'));
const PatientMyChats = React.lazy(() => import('./Patient/MyChats/myChats'));
const PatientPaymentHistory = React.lazy(() => import('./Patient/PaymentHistory/PaymentHistory'));
const PatientTrialListing = React.lazy(() => import('./Patient/TrialListing/TrialListing'));

/* clinic pages */
const ClinicDashboard = React.lazy(() => import('./TrialClinic/Dashboard/Dashboard'));
const ClinicTrialRequests = React.lazy(() => import('./TrialClinic/TrialRequests/TrialRequests'));
const ClinicSponsorsListing = React.lazy(() => import('./TrialClinic/SponsorsListing/SponsorsListing'));
const ClinicSponsorsDetails = React.lazy(() => import('./TrialClinic/SponsorsDetails/SponsorsDetails'));
const ClinicSponsorsTrialListing = React.lazy(() => import('./TrialClinic/SponsorsTrialListing/SponsorsTrialListing'));
const ClinicTrialApplication = React.lazy(() => import('./TrialClinic/TrialApplications/TrialApplications'));
const ClinicMyAppointments = React.lazy(() => import('./TrialClinic/MyAppointments/MyAppointments'));
const ClinicPatientList = React.lazy(() => import('./TrialClinic/PatientList/PatientList'));
const ClinicPatientListPast = React.lazy(() => import('./TrialClinic/PatientList/PatientListPast'));

const routes = [
	{ path: '/', exact: true, name: 'Home', component: Home },
	{ path: '/patient/dashboard', exact: true, name: 'PatientDashboard', component: PatientDashboard },
	{ path: '/patient/edit-profile', exact: true, name: 'PatientEditProfile', component: PatientEditProfile },
	{ path: '/patient/trial-clinic-details', exact: true, name: 'PatientTrialClinicDetails', component: PatientTrialClinicDetails },
	{ path: '/patient/my-appointments', exact: true, name: 'PatientMyAppointments', component: PatientMyAppointments },
	{ path: '/patient/clinic-listing', exact: true, name: 'PatientClinicListing', component: PatientClinicListing },
	{ path: '/patient/my-favorites', exact: true, name: 'PatientMyFavorites', component: PatientMyFavorites },
	{ path: '/patient/my-chats', exact: true, name: 'PatientMyChats', component: PatientMyChats },
	{ path: '/patient/payment-history', exact: true, name: 'PatientPaymentHistory', component: PatientPaymentHistory },
	{ path: '/patient/trial-listing', exact: true, name: 'PatientTrialListing', component: PatientTrialListing },

	/* clinic routes */
	{ path: '/trial-clinic/dashboard', exact: true, name: 'ClinicDashboard', component: ClinicDashboard },
	{ path: '/trial-clinic/trial-requests', exact: true, name: 'ClinicTrialRequests', component: ClinicTrialRequests },
	{ path: '/trial-clinic/sponsors-listing', exact: true, name: 'ClinicSponsorsListing', component: ClinicSponsorsListing },
	{ path: '/trial-clinic/sponsors-details', exact: true, name: 'ClinicSponsorsDetails', component: ClinicSponsorsDetails },
	{ path: '/trial-clinic/sponsors-trial-listing', exact: true, name: 'ClinicSponsorsTrialListing', component: ClinicSponsorsTrialListing },
	{ path: '/trial-clinic/trial-applications', exact: true, name: 'ClinicTrialApplication', component: ClinicTrialApplication },
	{ path: '/trial-clinic/my-appointments', exact: true, name: 'ClinicMyAppointments', component: ClinicMyAppointments },
	{ path: '/trial-clinic/patient-list', exact: true, name: 'ClinicPatientList', component: ClinicPatientList },
	{ path: '/trial-clinic/patient-list-past', exact: true, name: 'ClinicPatientListPast', component: ClinicPatientListPast },
];

export default routes;