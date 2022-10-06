import React from 'react';
import { RolesConfig } from "./../utils/AppConfig"

const Home = React.lazy(() => import('../views/pages/Home/Home'));
const ClinicListing = React.lazy(() => import('../views/pages/ClinicListing/ClinicListing'));
const ClinicDetails = React.lazy(() => import('../views/pages/ClinicDetails/ClinicDetails'));
const TrialListing = React.lazy(() => import('../views/pages/TrialListing/TrialListing'));
const AboutUs = React.lazy(() => import('../views/pages/AboutUs/AboutUS'));

/* patient pages */
const ContactUs = React.lazy(() => import('../views/pages/ContactUs/ContactUs'));
const PatientCompleteProfile = React.lazy(() => import('../Patient/CompleteProfile/CompleteProfile'));
const PatientDashboard = React.lazy(() => import('../Patient/Dashboard/Dashboard'));
const PatientEditProfile = React.lazy(() => import('../Patient/EditProfile/EditProfile'));
const PatientTrialClinicDetails = React.lazy(() => import('../Patient/TrialClinicDetails/TrialClinicDetails'));
const PatientMyAppointments = React.lazy(() => import('../Patient/MyAppointments/MyAppointments'));
const PatientClinicListing = React.lazy(() => import('../Patient/ClinicListing/ClinicListing'));
const PatientMyFavorites = React.lazy(() => import('../Patient/MyFavorites/MyFavorites'));
// const PatientMyChats = React.lazy(() => import('../Patient/MyChats/myChats'));
const PatientPaymentHistory = React.lazy(() => import('../Patient/PaymentHistory/PaymentHistory'));
const PatientTrialListing = React.lazy(() => import('../Patient/TrialListing/TrialListing'));
const PatientAllVisit = React.lazy(() => import('../Patient/MyAppointments/PatientAllVisit'));

/* clinic pages */
const ClinicCompleteProfile = React.lazy(() => import('../TrialClinic/CompleteProfile/CompleteProfile'));
const ClinicDashboard = React.lazy(() => import('../TrialClinic/Dashboard/Dashboard'));
const ClinicTrialRequests = React.lazy(() => import('../TrialClinic/TrialRequests/TrialRequests'));
const ClinicTrialScreenRequest = React.lazy(() => import('../TrialClinic/TrialRequests/ScreenRequest'));
const ClinicTrialScreenRequestDetail = React.lazy(() => import('../TrialClinic/TrialRequests/ScreenRequestDetail'));
const ClinicSponsorsListing = React.lazy(() => import('../TrialClinic/SponsorsListing/SponsorsListing'));
const ClinicSponsorsDetails = React.lazy(() => import('../TrialClinic/SponsorsDetails/SponsorsDetails'));
const ClinicSponsorsTrialListing = React.lazy(() => import('../TrialClinic/SponsorsTrialListing/SponsorsTrialListing'));
const ClinicTrialApplication = React.lazy(() => import('../TrialClinic/TrialApplications/TrialApplications'));
const ClinicMyAppointments = React.lazy(() => import('../TrialClinic/MyAppointments/MyAppointments'));
const ClinicMyAppointmentsDetails = React.lazy(() => import('../TrialClinic/MyAppointments/MyAppointmentsDetails'));
const ClinicPayment = React.lazy(() => import('../TrialClinic/MyAppointments/Payment'));
const ClinicPatientList = React.lazy(() => import('../TrialClinic/PatientList/PatientList'));
const ClinicPatientListPast = React.lazy(() => import('../TrialClinic/PatientList/PatientListPast'));
const ClinicPaymentHistory = React.lazy(() => import('../TrialClinic/PaymentHistory/PaymentHistory'));
const ClinicEditProfile = React.lazy(() => import('../TrialClinic/EditProfile/EditProfile'));
const ClinicManagePatient = React.lazy(() => import('../TrialClinic/ManagePatient/ManagePatient'));
const ClinicPatientAllVisit = React.lazy(() => import('../TrialClinic/ManagePatient/PatientAllVisit'));
// const ClinicMyChats = React.lazy(() => import('../TrialClinic/MyChats/MyChats'));

/* sponsors pages */
const SponsorsCompleteProfile = React.lazy(() => import('../TrialSponsors/CompleteProfile/CompleteProfile'));
const SponsorsDashboard = React.lazy(() => import('../TrialSponsors/Dashboard/Dashboard'));
const SponsorsTrialRequests = React.lazy(() => import('../TrialSponsors/TrialRequests/TrialRequests'));
const SponsorsTrials = React.lazy(() => import('../TrialSponsors/Trials/Trials'));
const SponsorsClinicListing = React.lazy(() => import('../TrialSponsors/ClinicListing/ClinicListing'));
const SponsorsClinicDetails = React.lazy(() => import('../TrialSponsors/TrialClinicDetails/TrialClinicDetails'));
const SponsorsMyStudies = React.lazy(() => import('../TrialSponsors/MyStudies/MyStudies'));
const SponsorsAppointmentsClinics = React.lazy(() => import('../TrialSponsors/AppointmentsClinics/AppointmentsClinics'));
const SponsorsPatientList = React.lazy(() => import('../TrialSponsors/PatientList/PatientList'));
const SponsorsPatientListPast = React.lazy(() => import('../TrialSponsors/PatientList/PatientListPast'));
const SponsorsPaymentHistory = React.lazy(() => import('../TrialSponsors/PaymentHistory/PaymentHistory'));
const SponsorsEditProfile = React.lazy(() => import('../TrialSponsors/EditProfile/EditProfile'));
const SponsorsManageClinics = React.lazy(() => import('../TrialSponsors/ManageClinics/ManageClinics'));
const SponsorsManagePatient = React.lazy(() => import('../TrialSponsors/ManagePatient/ManagePatient'));
const SponsorsMyChats = React.lazy(() => import('../TrialSponsors/MyChats/MyChats'));
const SponsorPatientAllVisit = React.lazy(() => import('../TrialSponsors/ManagePatient/PatientAllVisit'));

/* physician pages */
const PhysicianCompleteProfile = React.lazy(() => import('../Physician/CompleteProfile/CompleteProfile'));
const PhysicianDashboard = React.lazy(() => import('../Physician/Dashboard/Dashboard'));
const PhysicianClinicListing = React.lazy(() => import('../Physician/ClinicListing/ClinicListing'));
const PhysicianClinicDetails = React.lazy(() => import('../Physician/ClinicDetails/ClinicDetails'));
const PhysicianTrialListing = React.lazy(() => import('../Physician/TrialListing/TrialListing'));
const PhysicianManagePatient = React.lazy(() => import('../Physician/ManagePatient/ManagePatient'));
const PhysicianMyChats = React.lazy(() => import('../Physician/MyChats/MyChats'));
const PhysicianEditProfile = React.lazy(() => import('../Physician/EditProfile/EditProfile'));

const routes = [
	{ path: '/', exact: true, name: 'Home', component: Home, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/contact-us', exact: true, name: 'ContactUs', component: ContactUs, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/clinic-listing', exact: true, name: 'ClinicListing', component: ClinicListing, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/clinic-details', exact: true, name: 'ClinicDetails', component: ClinicDetails, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/trial-listing', exact: true, name: 'TrialListing', component: TrialListing, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/about-us', exact: true, name: 'AboutUs', component: AboutUs, meta: {"role": RolesConfig.PATIENT} },


	// accessRole={RolesConfig.PATIENT}
	// accessRole={RolesConfig.TRIAL_CLINIC}
	// accessRole={RolesConfig.TRIAL_SPONSORS}
	// accessRole={RolesConfig.PHYSICIAN}

	/* Patient Routes */
	{ path: '/patient/complete-profile', exact: true, name: 'PatientCompleteProfile', component: PatientCompleteProfile, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/patient/dashboard', exact: true, name: 'PatientDashboard', component: PatientDashboard, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/patient/edit-profile', exact: true, name: 'PatientEditProfile', component: PatientEditProfile, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/patient/clinic-listing', exact: true, name: 'PatientClinicListing', component: PatientClinicListing, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/patient/trial-clinic-details/:id', exact: true, name: 'PatientTrialClinicDetails', component: PatientTrialClinicDetails, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/patient/my-appointments', exact: true, name: 'PatientMyAppointments', component: PatientMyAppointments, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/patient/my-favorites', exact: true, name: 'PatientMyFavorites', component: PatientMyFavorites, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/patient/my-chats', exact: true, name: 'SponsorsMyChats', component: SponsorsMyChats, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/patient/payment-history', exact: true, name: 'PatientPaymentHistory', component: PatientPaymentHistory, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/patient/trial-listing/:id', exact: true, name: 'PatientTrialListing', component: PatientTrialListing, meta: {"role": RolesConfig.PATIENT} },
	{ path: '/patient/patient-visits/:id', exact: true, name: 'PatientAllVisit', component: PatientAllVisit, meta: {"role": RolesConfig.PATIENT} },

	/* Clinic Routes */
	{ path: '/trial-clinic/complete-profile', exact: true, name: 'ClinicCompleteProfile', component: ClinicCompleteProfile, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/dashboard', exact: true, name: 'ClinicDashboard', component: ClinicDashboard, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/trial-requests', exact: true, name: 'ClinicTrialRequests', component: ClinicTrialRequests, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/screen-trial-request', exact: true, name: 'ClinicTrialScreenRequest', component: ClinicTrialScreenRequest, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/screen-trial-request/:id', exact: true, name: 'ClinicTrialScreenRequestDetail', component: ClinicTrialScreenRequestDetail, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/sponsors-listing', exact: true, name: 'ClinicSponsorsListing', component: ClinicSponsorsListing, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/sponsors-details/:id', exact: true, name: 'ClinicSponsorsDetails', component: ClinicSponsorsDetails, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/sponsors-trial-listing/:id', exact: true, name: 'ClinicSponsorsTrialListing', component: ClinicSponsorsTrialListing, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/trial-applications', exact: true, name: 'ClinicTrialApplication', component: ClinicTrialApplication, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/my-appointments', exact: true, name: 'ClinicMyAppointments', component: ClinicMyAppointments, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/appointments/:id', exact: true, name: 'ClinicMyAppointmentsDetails', component: ClinicMyAppointmentsDetails, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/payment', exact: true, name: 'ClinicPayment', component: ClinicPayment, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/patient-list/:id', exact: true, name: 'ClinicPatientList', component: ClinicPatientList, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/patient-list-past/:id', exact: true, name: 'ClinicPatientListPast', component: ClinicPatientListPast, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/payment-history', exact: true, name: 'ClinicPaymentHistory', component: ClinicPaymentHistory, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/edit-profile', exact: true, name: 'ClinicEditProfile', component: ClinicEditProfile, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/manage-patient', exact: true, name: 'ClinicManagePatient', component: ClinicManagePatient, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/patient-visits/:id', exact: true, name: 'ClinicPatientAllVisit', component: ClinicPatientAllVisit, meta: {"role": RolesConfig.TRIAL_CLINIC} },
	{ path: '/trial-clinic/my-chats', exact: true, name: 'SponsorsMyChats', component: SponsorsMyChats, meta: {"role": RolesConfig.TRIAL_CLINIC} },

	/* Sponsors Routes */
	{ path: '/trial-sponsors/complete-profile', exact: true, name: 'SponsorsCompleteProfile', component: SponsorsCompleteProfile, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/dashboard', exact: true, name: 'SponsorsDashboard', component: SponsorsDashboard, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/trial-requests', exact: true, name: 'SponsorsTrialRequests', component: SponsorsTrialRequests, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/trials', exact: true, name: 'SponsorsTrials', component: SponsorsTrials, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/clinic-listing', exact: true, name: 'SponsorsClinicListing', component: SponsorsClinicListing, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/clinic-details/:id', exact: true, name: 'SponsorsClinicDetails', component: SponsorsClinicDetails, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/my-trials', exact: true, name: 'SponsorsMyStudies', component: SponsorsMyStudies, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/appointments-clinics/:id', exact: true, name: 'SponsorsAppointmentsClinics', component: SponsorsAppointmentsClinics, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/patient-list/:id', exact: true, name: 'SponsorsPatientList', component: SponsorsPatientList, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/patient-list-past', exact: true, name: 'SponsorsPatientListPast', component: SponsorsPatientListPast, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/payment-history', exact: true, name: 'SponsorsPaymentHistory', component: SponsorsPaymentHistory, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/edit-profile', exact: true, name: 'SponsorsEditProfile', component: SponsorsEditProfile, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/manage-clinics', exact: true, name: 'SponsorsManageClinics', component: SponsorsManageClinics, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/manage-patient', exact: true, name: 'SponsorsManagePatient', component: SponsorsManagePatient, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/my-chats', exact: true, name: 'SponsorsMyChats', component: SponsorsMyChats, meta: {"role": RolesConfig.TRIAL_SPONSORS} },
	{ path: '/trial-sponsors/patient-visits/:id', exact: true, name: 'SponsorPatientAllVisit', component: SponsorPatientAllVisit, meta: {"role": RolesConfig.TRIAL_SPONSORS} },

	/* Physician Routes */
	{ path: '/physician/complete-profile', exact: true, name: 'PhysicianCompleteProfile', component: PhysicianCompleteProfile, meta: {"role": RolesConfig.PHYSICIAN} },
	{ path: '/physician/dashboard', exact: true, name: 'PhysicianDashboard', component: PhysicianDashboard, meta: {"role": RolesConfig.PHYSICIAN} },
	{ path: '/physician/clinic-listing', exact: true, name: 'PhysicianClinicListing', component: PhysicianClinicListing, meta: {"role": RolesConfig.PHYSICIAN} },
	{ path: '/physician/clinic-details/:id', exact: true, name: 'PhysicianClinicDetails', component: PhysicianClinicDetails, meta: {"role": RolesConfig.PHYSICIAN} },
	{ path: '/physician/trial-listing', exact: true, name: 'PhysicianTrialListing', component: PhysicianTrialListing, meta: {"role": RolesConfig.PHYSICIAN} },
	{ path: '/physician/manage-patient', exact: true, name: 'PhysicianManagePatient', component: PhysicianManagePatient, meta: {"role": RolesConfig.PHYSICIAN} },
	{ path: '/physician/my-chats', exact: true, name: 'PhysicianMyChats', component: PhysicianMyChats, meta: {"role": RolesConfig.PHYSICIAN} },
	{ path: '/physician/edit-profile', exact: true, name: 'PhysicianEditProfile', component: PhysicianEditProfile, meta: {"role": RolesConfig.PHYSICIAN} },
];

export default routes;