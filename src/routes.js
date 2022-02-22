import React from 'react';
/* patient pages */
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
const ClinicPaymentHistory = React.lazy(() => import('./TrialClinic/PaymentHistory/PaymentHistory'));
const ClinicEditProfile = React.lazy(() => import('./TrialClinic/EditProfile/EditProfile'));
const ClinicManagePatient = React.lazy(() => import('./TrialClinic/ManagePatient/ManagePatient'));
const ClinicMyChats = React.lazy(() => import('./TrialClinic/MyChats/MyChats'));

/* sponsors pages */
const SponsorsDashboard = React.lazy(() => import('./TrialSponsors/Dashboard/Dashboard'));
const SponsorsTrialRequests = React.lazy(() => import('./TrialSponsors/TrialRequests/TrialRequests'));
const SponsorsTrials = React.lazy(() => import('./TrialSponsors/Trials/Trials'));
const SponsorsClinicListing = React.lazy(() => import('./TrialSponsors/ClinicListing/ClinicListing'));
const SponsorsClinicDetails = React.lazy(() => import('./TrialSponsors/TrialClinicDetails/TrialClinicDetails'));
const SponsorsMyAppointments = React.lazy(() => import('./TrialSponsors/MyAppointments/MyAppointments'));
const SponsorsAppointmentsClinics = React.lazy(() => import('./TrialSponsors/AppointmentsClinics/AppointmentsClinics'));
const SponsorsPatientList = React.lazy(() => import('./TrialSponsors/PatientList/PatientList'));
const SponsorsPatientListPast = React.lazy(() => import('./TrialSponsors/PatientList/PatientListPast'));
const SponsorsPaymentHistory = React.lazy(() => import('./TrialSponsors/PaymentHistory/PaymentHistory'));
const SponsorsEditProfile = React.lazy(() => import('./TrialSponsors/EditProfile/EditProfile'));
const SponsorsManageClinics = React.lazy(() => import('./TrialSponsors/ManageClinics/ManageClinics'));
const SponsorsManagePatient = React.lazy(() => import('./TrialSponsors/ManagePatient/ManagePatient'));
const SponsorsMyChats = React.lazy(() => import('./TrialSponsors/MyChats/MyChats'));

/* sponsors pages */
const PhysicianDashboard = React.lazy(() => import('./Physician/Dashboard/Dashboard'));
const PhysicianClinicListing = React.lazy(() => import('./Physician/ClinicListing/ClinicListing'));
const PhysicianClinicDetails = React.lazy(() => import('./Physician/ClinicDetails/ClinicDetails'));
const PhysicianTrialListing = React.lazy(() => import('./Physician/TrialListing/TrialListing'));
const PhysicianManagePatient = React.lazy(() => import('./Physician/ManagePatient/ManagePatient'));
const PhysicianMyChats = React.lazy(() => import('./Physician/MyChats/MyChats'));
const PhysicianEditProfile = React.lazy(() => import('./Physician/EditProfile/EditProfile'));

const routes = [
	{ path: '/', exact: true, name: 'Home', component: Home },
	/* Patient routes */
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
	{ path: '/trial-clinic/payment-history', exact: true, name: 'ClinicPaymentHistory', component: ClinicPaymentHistory },
	{ path: '/trial-clinic/edit-profile', exact: true, name: 'ClinicEditProfile', component: ClinicEditProfile },
	{ path: '/trial-clinic/manage-patient', exact: true, name: 'ClinicManagePatient', component: ClinicManagePatient },
	{ path: '/trial-clinic/my-chats', exact: true, name: 'ClinicMyChats', component: ClinicMyChats },

	/* sponsors routes */
	{ path: '/trial-sponsors/dashboard', exact: true, name: 'SponsorsDashboard', component: SponsorsDashboard },
	{ path: '/trial-sponsors/trial-requests', exact: true, name: 'SponsorsTrialRequests', component: SponsorsTrialRequests },
	{ path: '/trial-sponsors/trials', exact: true, name: 'SponsorsTrials', component: SponsorsTrials },
	{ path: '/trial-sponsors/clinic-listing', exact: true, name: 'SponsorsClinicListing', component: SponsorsClinicListing },
	{ path: '/trial-sponsors/clinic-details', exact: true, name: 'SponsorsClinicDetails', component: SponsorsClinicDetails },
	{ path: '/trial-sponsors/my-appointments', exact: true, name: 'SponsorsMyAppointments', component: SponsorsMyAppointments },
	{ path: '/trial-sponsors/appointments-clinics', exact: true, name: 'SponsorsAppointmentsClinics', component: SponsorsAppointmentsClinics },
	{ path: '/trial-sponsors/patient-list', exact: true, name: 'SponsorsPatientList', component: SponsorsPatientList },
	{ path: '/trial-sponsors/patient-list-past', exact: true, name: 'SponsorsPatientListPast', component: SponsorsPatientListPast },
	{ path: '/trial-sponsors/payment-history', exact: true, name: 'SponsorsPaymentHistory', component: SponsorsPaymentHistory },
	{ path: '/trial-sponsors/edit-profile', exact: true, name: 'SponsorsEditProfile', component: SponsorsEditProfile },
	{ path: '/trial-sponsors/manage-clinics', exact: true, name: 'SponsorsManageClinics', component: SponsorsManageClinics },
	{ path: '/trial-sponsors/manage-patient', exact: true, name: 'SponsorsManagePatient', component: SponsorsManagePatient },
	{ path: '/trial-sponsors/my-chats', exact: true, name: 'SponsorsMyChats', component: SponsorsMyChats },

	/* physician routes */
	{ path: '/physician/dashboard', exact: true, name: 'PhysicianDashboard', component: PhysicianDashboard },
	{ path: '/physician/clinic-listing', exact: true, name: 'PhysicianClinicListing', component: PhysicianClinicListing },
	{ path: '/physician/clinic-details', exact: true, name: 'PhysicianClinicDetails', component: PhysicianClinicDetails },
	{ path: '/physician/trial-listing', exact: true, name: 'PhysicianTrialListing', component: PhysicianTrialListing },
	{ path: '/physician/manage-patient', exact: true, name: 'PhysicianManagePatient', component: PhysicianManagePatient },
	{ path: '/physician/my-chats', exact: true, name: 'PhysicianMyChats', component: PhysicianMyChats },
	{ path: '/physician/edit-profile', exact: true, name: 'PhysicianEditProfile', component: PhysicianEditProfile },
];

export default routes;