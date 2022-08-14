import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { IRoute } from "./config";

export default function RouteWithSuspend(route: IRoute) {
  return (
    <>
      {route.redirect ? (
        <Navigate to={route.redirect} />
      ) : route.component ? (
        <route.component routes={route.routes} />
      ) : (
        route.element
      )}
    </>
  );
}
