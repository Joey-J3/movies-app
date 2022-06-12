import { Movie } from "@/types";
import React, { createContext, useReducer } from "react";

export enum Actions {
  REPLACE = "REPLACE",
  SET_MOVIES = "SET_MOVIES",
  SHOW_MOVIE_DETAIL = "SHOW_MOVIE_DETAIL",
  SHOW_HEADER = "SHOW_HEADER",
}

export type ActionType = {
  type: keyof typeof Actions;
  payload: any;
};
type MovieContextState = {
  movies: Array<Movie>;
  currentMovie: Movie;
  showMovieDetail: boolean;
};

const initialState: MovieContextState = {
  movies: [],
  currentMovie: null,
  showMovieDetail: false,
};

export const MovieContext = createContext<
  MovieContextState & {
    dispatch: React.Dispatch<ActionType>;
  }
>({
  ...initialState,
  dispatch: (action: ActionType) => {},
});

export const reducer = (
  state: MovieContextState,
  action: { type: string; payload: any }
): MovieContextState => {
  switch (action.type) {
    case Actions.REPLACE:
      return {
        ...state,
        currentMovie: action.payload,
      };
    case Actions.SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case Actions.SHOW_MOVIE_DETAIL:
      return {
        ...state,
        showMovieDetail: true,
      };
    case Actions.SHOW_HEADER:
      return {
        ...state,
        showMovieDetail: false,
      };
  }
};

interface MovieProviderInterface {
  children: React.ReactNode;
}

function MovieProvider({ children }: MovieProviderInterface) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MovieContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieProvider;
