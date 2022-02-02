import React from "react";
import { Redirect } from "react-router-dom";

const PrivateRoute = () => {
    const userToken = localStorage.getItem("user-token");

    return (
        userToken ? null : <Redirect to="/" />
    )
};

// function PrivateRoute({ children, ...rest }) {
//     const userToken = localStorage.getItem("user-token");
//     return (
//       <Route {...rest} render={({ location }) => {
//         return userToken === true
//           ? children
//           : <Redirect to={{
//               pathname: '/',
//               state: { from: location }
//             }} />
//       }} />
//     )
//   }

export default PrivateRoute;
