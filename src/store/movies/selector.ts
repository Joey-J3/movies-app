import { RootState } from "..";

export const selectMovieList = (state: RootState) => state.movies.movies;

export const selectLastParams = (state: RootState) =>
  state.movies.lastSearchParams;

export const selectCurrentMovie = (state: RootState) =>
  state.movies.currentMovie;

export const selectIfShowDetail = (state: RootState) =>
  state.movies.showMovieDetail;

export const selectGenres = (state: RootState) => state.movies.genres;
