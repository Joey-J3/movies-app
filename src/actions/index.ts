import { Movie } from "@/types";
import { createAction } from "@reduxjs/toolkit";
import { Actions } from "./type";

export const replaceCurrentMovie = createAction<Movie>(Actions.REPLACE_MOVIE);

export const setMovies = createAction<Array<Movie>>(Actions.SET_MOVIES);

export const addMovie = createAction<Movie>(Actions.ADD_MOVIE);

export const setShowDetailMode = createAction<boolean>(
  Actions.SET_SHOW_DETAIL_MODE
);
