import React from 'react'

export const NotificationRedirection = (notificationType, roleId) => {
    if((notificationType === "TRIAL_START_RECRUITING") && (roleId === 2)){
        console.log("patient");
    }
}