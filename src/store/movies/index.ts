import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieDTO } from "@/types";
import { getAllMoviesType } from "@/types/api";
import {
  createMovie,
  deleteMovie,
  getAllGenres,
  getAllMovies,
  updateMovie,
} from "./thunks";

export type MovieModalMode = "ADD" | "EDIT";

export interface IMovieModal {
  formData: MovieDTO;
  mode: MovieModalMode;
  visible: boolean;
}

export interface MovieStoreState {
  movies: Array<Movie>;
  currentMovie: Movie;
  genres: Array<string>;
  showMovieDetail: boolean;
  lastSearchParams: getAllMoviesType;
  movieModal: IMovieModal;
}
export const defaultFormData: MovieDTO = {
  title: "",
  release_date: "",
  poster_path: "",
  vote_average: "",
  genres: [],
  runtime: "",
  overview: "",
};

export const initialState: MovieStoreState = {
  movies: [],
  currentMovie: null,
  genres: [],
  showMovieDetail: false,
  lastSearchParams: {},
  movieModal: {
    formData: defaultFormData,
    mode: "ADD",
    visible: false,
  },
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCurrentMovie: (state, action: PayloadAction<Movie>) => {
      state.currentMovie = action.payload;
    },
    setMovies: (state, action: PayloadAction<Array<Movie>>) => {
      state.movies = action.payload;
    },
    addMvoie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    setShowDetailMode: (state, action: PayloadAction<boolean>) => {
      state.showMovieDetail = action.payload;
    },
    showMovieDetail: (state, action) => {
      state.currentMovie = action.payload;
      state.showMovieDetail = true;
    },
    setFormData: (state, action: PayloadAction<MovieDTO>) => {
      state.movieModal.formData = action.payload;
    },
    setVisible: (
      state,
      action: PayloadAction<{ visible: boolean; mode?: MovieModalMode }>
    ) => {
      state.movieModal.visible = action.payload.visible;
      state.movieModal.mode = action.payload.mode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.movies = action.payload.data;
        state.lastSearchParams = action.meta.arg;
      })
      .addCase(getAllGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.currentMovie = action.payload;
        state.movieModal.visible = false;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.currentMovie = action.payload;
        state.movieModal.visible = false;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        if (action.payload > 0 && state.currentMovie?.id === action.meta.arg) {
          state.currentMovie = null;
          state.showMovieDetail = false;
        }
      });
  },
});

export default movieSlice;

export const moviesReducer = movieSlice.reducer;

export const moviesAction = movieSlice.actions;
