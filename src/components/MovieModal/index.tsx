import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  createMovie,
  defaultFormData,
  getAllMovies,
  moviesAction,
  updateMovie,
} from "@/store/movies";
import {
  selectCurrentMovie,
  selectFormData,
  selectLastParams,
  selectMovieModalMode,
  selectMovieModalVisible,
} from "@/store/movies/selector";
import { Movie, MovieDTO } from "@/types";
import React, { useEffect } from "react";
import Modal from "../Modal";
import MovieForm from "./MovieForm";

function MovieModal() {
  const movie = useAppSelector(selectCurrentMovie);
  const lastParams = useAppSelector(selectLastParams);
  const formData = useAppSelector(selectFormData);
  const mode = useAppSelector(selectMovieModalMode);
  const visible = useAppSelector(selectMovieModalVisible);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mode === "EDIT") {
      dispatch(moviesAction.setFormData(movie || defaultFormData));
    } else {
      dispatch(moviesAction.setFormData(defaultFormData));
    }
  }, [mode, movie]);

  const addMovie = async (data: MovieDTO) => {
    dispatch(createMovie(data));
  };

  const saveMovie = async (data: Movie) => {
    dispatch(updateMovie(data));
  };

  const submitCallback = async (data: MovieDTO) => {
    if (mode === "ADD") {
      await addMovie(data as Omit<Movie, "id">);
    } else {
      await saveMovie(data as Movie);
    }
    dispatch(getAllMovies(lastParams));
  };
  const resetCallback = () => {
    dispatch(moviesAction.setFormData(defaultFormData));
  };

  return (
    <Modal
      title={`${mode} movie`}
      visible={visible}
      closeCallback={() =>
        dispatch(moviesAction.setVisible({ visible: false }))
      }
    >
      <MovieForm
        formData={formData}
        submitCallback={submitCallback}
        resetCallback={resetCallback}
      />
    </Modal>
  );
}

export default MovieModal;
