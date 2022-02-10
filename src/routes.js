import React from 'react';

const Home = React.lazy(() => import('./views/pages/Home/Home'));
const PatientDashboard = React.lazy(() => import('./patient/dashboard/Dashboard'));
const PatientEditProfile = React.lazy(() => import('./patient/editProfile/EditProfile'));
const PatientTrialClinicDetails = React.lazy(() => import('./patient/trialClinicDetails/TrialClinicDetails'));
const PatientMyAppointments = React.lazy(() => import('./patient/myAppointments/MyAppointments'));
const PatientClinicListing = React.lazy(() => import('./patient/clinicListing/ClinicListing'));
const PatientMyFavorites = React.lazy(() => import('./patient/myFavorites/MyFavorites'));
const PatientMyChats = React.lazy(() => import('./patient/myChats/myChats'));

const routes = [
	{ path: '/', exact: true, name: 'Home', component: Home },
	{ path: '/patient/dashboard', exact: true, name: 'PatientDashboard', component: PatientDashboard },
	{ path: '/patient/edit-profile', exact: true, name: 'PatientEditProfile', component: PatientEditProfile },
	{ path: '/patient/trial-clinic-details', exact: true, name: 'PatientTrialClinicDetails', component: PatientTrialClinicDetails },
	{ path: '/patient/my-appointments', exact: true, name: 'PatientMyAppointments', component: PatientMyAppointments },
	{ path: '/patient/clinic-listing', exact: true, name: 'PatientClinicListing', component: PatientClinicListing },
	{ path: '/patient/my-favorites', exact: true, name: 'PatientMyFavorites', component: PatientMyFavorites },
	{ path: '/patient/my-chats', exact: true, name: 'PatientMyChats', component: PatientMyChats }
];

export default routes;