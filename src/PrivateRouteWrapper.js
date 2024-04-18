import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// Import Routes all

const PrivateRouteWrapper = () => {
  // const [isLogged,setIsLogged]=React.useState(true)
  let auth = { token: localStorage.getItem("User")?.length > 0 };

  return auth.token ? <Outlet /> : <Navigate to="/authentication/sign-in" />;
};

export default PrivateRouteWrapper;
