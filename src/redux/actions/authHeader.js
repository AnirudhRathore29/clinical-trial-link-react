export function authHeader(unAuth = null) {
    if (unAuth) {
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    } else {
        let token = localStorage.getItem('jwtToken');
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token
            // Authorization: token
        };
    }
}