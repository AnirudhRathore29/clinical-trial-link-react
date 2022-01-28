import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    const userToken = localStorage.getItem("user-token");

    return (
        userToken ? <Outlet /> : <Navigate to="/login" />
    )
};

export default PrivateRoute;
