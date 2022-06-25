import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "..";

export const selectMovies = (state: RootState) => state.movies;

export const selectMovieList = createSelector(
  selectMovies,
  (state) => state.movies
);

export const selectLastParams = createSelector(
  selectMovies,
  (state) => state.lastSearchParams
);

export const selectCurrentMovie = createSelector(
  selectMovies,
  (state) => state.currentMovie
);

export const selectIfShowDetail = createSelector(
  selectMovies,
  (state) => state.showMovieDetail
);

export const selectGenres = createSelector(
  selectMovies,
  (state) => state.genres
);
