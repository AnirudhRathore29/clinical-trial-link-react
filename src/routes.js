import React from 'react';

const Home = React.lazy(() => import('./views/pages/Home/Home'));
const PatientDashboard = React.lazy(() => import('./patient/dashboard/Dashboard'));

const routes = [
	{ path: '/', exact: true, name: 'Home', component: Home },
	{ path: '/patient/dashboard', exact: true, name: 'PatientDashboard', component: PatientDashboard }
];

export default routes;