import React from 'react';

const Home = React.lazy(() => import('./views/pages/Home/Home'));
const PatientDashboard = React.lazy(() => import('./Patient/dashboard/Dashboard'));
const PatientEditProfile = React.lazy(() => import('./Patient/editProfile/EditProfile'));
const PatientTrialClinicDetails = React.lazy(() => import('./Patient/trialClinicDetails/TrialClinicDetails'));
const PatientMyAppointments = React.lazy(() => import('./Patient/myAppointments/MyAppointments'));
const PatientClinicListing = React.lazy(() => import('./Patient/ClinicListing/ClinicListing'));
const PatientMyFavorites = React.lazy(() => import('./Patient/myFavorites/MyFavorites'));
const PatientMyChats = React.lazy(() => import('./Patient/myChats/myChats'));
const PatientPaymentHistory = React.lazy(() => import('./Patient/paymentHistory/PaymentHistory'));
const PatientTrialListing = React.lazy(() => import('./Patient/trialListing/TrialListing'));

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
	{ path: '/patient/trial-listing', exact: true, name: 'PatientTrialListing', component: PatientTrialListing }
];

export default routes;