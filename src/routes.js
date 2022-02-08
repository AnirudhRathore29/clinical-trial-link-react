import React from 'react';

const Home = React.lazy(() => import('./views/pages/Home/Home'));
const PatientDashboard = React.lazy(() => import('./patient/dashboard/Dashboard'));
const PatientEditProfile = React.lazy(() => import('./patient/editProfile/EditProfile'));
const PatientTrialClinicDetails = React.lazy(() => import('./patient/trialClinicDetails/TrialClinicDetails'));
const PatientClinicalTrialDetails = React.lazy(() => import('./patient/clinicalTrialDetails/ClinicalTrialDetails'));

const routes = [
	{ path: '/', exact: true, name: 'Home', component: Home },
	{ path: '/patient/dashboard', exact: true, name: 'PatientDashboard', component: PatientDashboard },
	{ path: '/patient/edit-profile', exact: true, name: 'PatientEditProfile', component: PatientEditProfile },
	{ path: '/patient/trial-clinic-details', exact: true, name: 'PatientTrialClinicDetails', component: PatientTrialClinicDetails },
	{ path: '/patient/clinic-trial-details', exact: true, name: 'PatientClinicalTrialDetails', component: PatientClinicalTrialDetails }
];

export default routes;