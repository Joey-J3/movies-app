import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { IRoute } from "./config";

export default function RouteWithSuspend(route: IRoute) {
  return (
    <Suspense fallback={route.fallback}>
      {route.redirect ? (
        <Navigate to={route.redirect} />
      ) : route.component ? (
        <route.component routes={route.routes} />
      ) : (
        route.element
      )}
    </Suspense>
  );
}
