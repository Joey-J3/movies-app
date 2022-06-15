import React, { useReducer, useState } from "react";

export type Route = {
  path: string;
  component: React.Component;
  exact?: boolean;
};

interface RouterStateInterface {
  history: Array<string>;
  location: string;
  params: Record<string, string>;
  routes: Array<Route>;
}

const initialState: RouterStateInterface = {
  history: [],
  location: "",
  params: {},
  routes: [],
};

export const RouterContext =
  React.createContext<RouterStateInterface>(initialState);

interface RouterProps {
  routes: Array<Route>;
  children: React.ReactNode;
}

export const actions = {};

export const reducer = (
  state: Array<Route>,
  actions: { type: string; payload: any }
): Array<Route> => {
  switch (actions.type) {
    case "replace":
      return state;
    case "push":
      return {
        ...state,
      };
  }
};

function Router({ routes, children }: RouterProps) {
  const [state, dispatch] = useReducer(reducer, routes);
  const [history, setHistory] = useState<Array<string>>([]);
  const [params, setParams] = useState<Record<string, any>>({});
  const [location, setLocation] = useState<string>("");
  return (
    <RouterContext.Provider value={{ history, params, routes, location }}>
      {children}
    </RouterContext.Provider>
  );
}

export default Router;
