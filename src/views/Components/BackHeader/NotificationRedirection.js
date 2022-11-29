import { useHistory } from 'react-router-dom';

export const NotificationRedirection = (notificationType) => {
    const history = useHistory()

    if(notificationType === "TRIAL_START_RECRUITING"){
        history.push('/patient/my-appointments')
    } else if(notificationType === "TRIAL_APPLICATION_UPDATE") {
        history.push('/patient/my-appointments')
    } else if(notificationType === "PATIENT_TRIAL_APPLICATION" || notificationType === "TRIAL_APPLICATION_APPROVED_BY_TRIAL_CLINIC" || notificationType === "TRIAL_APPLICATION_REJECTED_BY_TRIAL_CLINIC") {
        history.push('/trial-clinic/trial-requests')
    } else if(notificationType === "APPOINTMENT_CANCELLATION_BY_PATIENT") {
        history.push('/trial-clinic/manage-patient')
    } else if(notificationType === "TRIAL_CREATION" || notificationType === "TRIAL_CANCELLATION" || notificationType === "TRIAL_RESTART") {
        history.push('/trial-clinic/sponsors-trial-listing/2')
    } else if(notificationType === "TRIAL_APPLICATION_APPROVED_BY_SPONSOR" || notificationType === "TRIAL_APPLICATION_REJECTED_BY_SPONSOR") {
        history.push('/trial-clinic/trial-applications')
    } else if(notificationType === "TRIAL_APPROVAL_BY_ADMIN" || notificationType === "TRIAL_REJECTION_BY_ADMIN") {
        history.push('/trial-sponsors/trials')
    } else if(notificationType === "TRIAL_CLINIC_TRIAL_APPLICATION") {
        history.push('/trial-sponsors/trial-requests')
    }
}