import React, {
  ComponentType,
  lazy,
  LazyExoticComponent,
  ReactNode,
} from "react";

export interface IRoute {
  // Path, like in basic prop
  path?: string;
  // Exact, like in basic prop
  index?: boolean;
  // Preloader for lazy loading
  fallback: NonNullable<ReactNode> | null;
  // Lazy Loaded component
  component?: LazyExoticComponent<ComponentType<any>>;
  // normal component
  element?: ReactNode;
  // Sub routes
  routes?: IRoute[];
  // Redirect path
  redirect?: string;
  // If router is private, this is going to be true
  private?: boolean;
}

const Fallback = () => <div>Loading...</div>;

const defaultOptions = {
  private: true,
  index: false,
  fallback: <Fallback />,
};

const routeSubRoutes: IRoute[] = [
  {
    index: true,
    component: lazy(() => import("@/components/Header")),
  },
  {
    path: "/:movies",
    component: lazy(() => import("@/components/MovieDetail")),
  },
].map((item) => ({ ...defaultOptions, ...item }));

export const routes: IRoute[] = [
  {
    path: "/",
    redirect: "/search",
  },
  {
    path: "search",
    index: true,
    component: lazy(() => import("@/pages/home/Home")),
    routes: routeSubRoutes,
  },
].map((item) => ({ ...defaultOptions, ...item }));
