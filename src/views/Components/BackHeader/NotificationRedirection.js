
export const NotificationRedirection = (notificationType, roleId) => {
    if((notificationType === "TRIAL_START_RECRUITING") && (roleId === 2)){
        return '/patient/my-appointments'
    } else if((notificationType === "TRIAL_APPLICATION_UPDATE") && (roleId === 2)) {
        return '/patient/my-appointments'
    } else if((notificationType === "PATIENT_TRIAL_APPLICATION" || "TRIAL_APPLICATION_APPROVED_BY_TRIAL_CLINIC" || "TRIAL_APPLICATION_REJECTED_BY_TRIAL_CLINIC") && (roleId === 3)) {
        return '/trial-clinic/trial-requests'
    } else if((notificationType === "APPOINTMENT_CANCELLATION_BY_PATIENT") && (roleId === 3)) {
        return '/trial-clinic/manage-patient'
    } else if((notificationType === "TRIAL_CREATION" || "TRIAL_CANCELLATION" || "TRIAL_RESTART") && (roleId === 3)) {
        return '/trial-clinic/sponsors-trial-listing/2'
    } else if((notificationType === "TRIAL_APPROVAL_BY_ADMIN" || "TRIAL_REJECTION_BY_ADMIN") && (roleId === 5)) {
        return '/trial-sponsors/trials'
    } else if((notificationType === "TRIAL_CLINIC_TRIAL_APPLICATION") && (roleId === 5)) {
        return '/trial-sponsors/trial-requests'
    }
}