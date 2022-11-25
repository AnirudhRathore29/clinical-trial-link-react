
export const NotificationRedirection = (notificationType, roleId) => {
    if((notificationType === "TRIAL_START_RECRUITING") && (roleId === 2)){
        return '/patient/my-appointments'
    } else if((notificationType === "TRIAL_START_RECRUITING") && (roleId === 2)) {
        return ''
    }
}