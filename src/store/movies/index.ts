import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/types";
import { del, get, post, put } from "@/api";
import { getAllMoviesType } from "@/types/api";

interface MovieStoreState {
  movies: Array<Movie>;
  currentMovie: Movie;
  genres: Array<string>;
  showMovieDetail: boolean;
  lastSearchParams: getAllMoviesType;
}

const initialState: MovieStoreState = {
  movies: [],
  currentMovie: null,
  genres: [],
  showMovieDetail: false,
  lastSearchParams: {},
};

export const getAllMovies = createAsyncThunk(
  "movies/getAll",
  async (params?: getAllMoviesType) => {
    const response = await get("/movies", params);
    return response.data;
  }
);

export const getAllGenres = createAsyncThunk("movies/genres/all", async () => {
  const response = await get("/movies/genres/all");
  return response.data.genres;
});

export const updateMovie = createAsyncThunk(
  "movies/update",
  async (data: Movie) => {
    const response = await put("/movies", data);
    return response.data;
  }
);

export const createMovie = createAsyncThunk(
  "movies/create",
  async (data: Omit<Movie, "id">) => {
    const response = await post("/movies", data);
    return response.data;
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/delete",
  async (id: number) => {
    return (await del("/movies/:id", { id })).data;
  }
);

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
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.currentMovie = action.payload;
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
