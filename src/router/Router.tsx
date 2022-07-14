import React from "react";
import { Routes, Route } from "react-router-dom";
import { IRoute } from "./config";
import RouteWithSuspend from "./RouteWithSuspend";

interface IProps {
  routes: IRoute[];
}

const Router: React.FC<IProps> = ({ routes }: IProps) => {
  return (
    <Routes>
      {routes &&
        routes.map((route: IRoute, i) => (
          <Route
            key={route.path + i}
            path={route.path}
            index={route.index}
            element={<RouteWithSuspend {...route} />}
          />
        ))}
    </Routes>
  );
};

export default Router;
