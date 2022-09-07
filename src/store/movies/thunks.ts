import { del, get, post, put } from "@/api";
import { Movie, MovieDTO } from "@/types";
import { getAllMoviesType } from "@/types/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

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
  async (id: number, { rejectWithValue }) => {
    try {
      return (await del("/movies/:id", { id })).data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const submitForm = createAsyncThunk(
  "movies/submit",
  async (data: MovieDTO, { getState, rejectWithValue, dispatch }) => {
    const { movies } = getState() as RootState;
    try {
      if (movies.movieModal.mode === "ADD") {
        dispatch(createMovie(data));
      } else {
        dispatch(updateMovie(data as Movie));
      }
      dispatch(getAllMovies(movies.lastSearchParams));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
