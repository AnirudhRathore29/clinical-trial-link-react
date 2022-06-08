var jwt = require('jsonwebtoken');
export function authHeader(unAuth = null) {
    if (unAuth) {
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    } else {
        let authToken = localStorage.getItem('auth_security');
        let authLocalData = jwt.verify(authToken, process.env.REACT_APP_JWT_SECRET)
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + authLocalData.security_token
            // Authorization: token
        };
    }
}