import React from 'react';

const Home = React.lazy(() => import('./views/pages/Home/Home'));
const PatientDashboard = React.lazy(() => import('./patient/dashboard/Dashboard'));
const PatientEditProfile = React.lazy(() => import('./patient/editProfile/EditProfile'));

const routes = [
	{ path: '/', exact: true, name: 'Home', component: Home },
	{ path: '/patient/dashboard', exact: true, name: 'PatientDashboard', component: PatientDashboard },
	{ path: '/patient/edit-profile', exact: true, name: 'PatientEditProfile', component: PatientEditProfile }
];

export default routes;