import Header from "@/components/Header";
import MovieDetail from "@/components/MovieDetail";
import NoMatch from "@/components/NoMatch";
import Home from "@/pages/home/Home";
import { AppStore } from "@/store";
import React, {
  ComponentType,
  lazy,
  LazyExoticComponent,
  ReactNode,
} from "react";

export interface IRoute {
  // Path, like in basic prop
  path: string;
  // Exact, like in basic prop
  index?: boolean;
  // Preloader for lazy loading
  fallback: NonNullable<ReactNode> | null;
  // Lazy Loaded component
  component?: React.FC<any>;
  // normal component
  element?: ReactNode;
  // Sub routes
  routes?: IRoute[];
  // Redirect path
  redirect?: string;
  // If router is private, this is going to be true
  private?: boolean;
  // ssr pre load data
  loadData?: (store: AppStore, ...params: any[]) => Promise<any>;
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
    path: "/",
    component: Header,
  },
  {
    path: "/:movies",
    component: MovieDetail,
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
    component: Home,
    routes: routeSubRoutes,
    loadData: Home.loadData,
  },
  {
    path: "*",
    private: false,
    component: NoMatch,
  },
].map((item) => ({ ...defaultOptions, ...item }));
