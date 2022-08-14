import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer } from "./movies";

const createStore = (preloadedState?: any) =>
  configureStore({
    reducer: {
      movies: moviesReducer,
    },
    preloadedState,
  });

export type AppStore = ReturnType<typeof createStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export default createStore;
