import React from 'react';

const Home = React.lazy(() => import('./views/pages/Home/Home'));
const PatientDashboard = React.lazy(() => import('./patient/dashboard/Dashboard'));
const PatientEditProfile = React.lazy(() => import('./patient/editProfile/EditProfile'));
const PatientTrialClinicDetails = React.lazy(() => import('./patient/trialClinicDetails/TrialClinicDetails'));
const PatientMyAppointments = React.lazy(() => import('./patient/myAppointments/MyAppointments'));
const PatientClinicListing = React.lazy(() => import('./patient/clinicListing/ClinicListing'));
const PatientMyFavorites = React.lazy(() => import('./patient/myFavorites/MyFavorites'));
const PatientMyChats = React.lazy(() => import('./patient/myChats/myChats'));
const PatientPaymentHistory = React.lazy(() => import('./patient/paymentHistory/PaymentHistory'));
const PatientTrialListing = React.lazy(() => import('./patient/trialListing/TrialListing'));

/* clinic pages */
const ClinicDashboard = React.lazy(() => import('./TrialClinic/dashboard/Dashboard'));
const ClinicTrialRequests = React.lazy(() => import('./TrialClinic/trialRequests/TrialRequests'));
const ClinicSponsorsListing = React.lazy(() => import('./TrialClinic/sponsorsListing/SponsorsListing'));
const ClinicSponsorsDetails = React.lazy(() => import('./TrialClinic/sponsorsDetails/SponsorsDetails'));
const ClinicSponsorsTrialListing = React.lazy(() => import('./TrialClinic/sponsorsTrialListing/SponsorsTrialListing'));
const ClinicTrialApplication = React.lazy(() => import('./TrialClinic/trialApplications/trialApplications'));
const ClinicMyAppointments = React.lazy(() => import('./TrialClinic/myAppointments/MyAppointments'));
const ClinicPatientList = React.lazy(() => import('./TrialClinic/patientList/PatientList'));
const ClinicPatientListPast = React.lazy(() => import('./TrialClinic/patientList/PatientListPast'));

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