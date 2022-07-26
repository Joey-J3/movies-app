import { useAppDispatch, useAppSelector } from "@/hooks";
import { defaultFormData, MovieModalMode, moviesAction } from "@/store/movies";
import {
  selectCurrentMovie,
  selectFormData,
  selectMovieModalMode,
  selectMovieModalVisible,
} from "@/store/movies/selector";
import { submitForm } from "@/store/movies/thunks";
import { MovieDTO } from "@/types";
import React, { useEffect } from "react";
import Modal from "../Modal";
import MovieForm from "./MovieForm";

export function useMovieModalState() {
  const movie = useAppSelector(selectCurrentMovie);
  const formData = useAppSelector(selectFormData);
  const mode = useAppSelector(selectMovieModalMode);
  const visible = useAppSelector(selectMovieModalVisible);
  const dispatch = useAppDispatch();

  const submitCallback = async (data: MovieDTO) => {
    dispatch(submitForm(data));
  };
  const resetCallback = () => {
    dispatch(moviesAction.setFormData(defaultFormData));
  };

  const closeCallback = () => {
    dispatch(moviesAction.setVisible({ visible: false }));
  };

  useEffect(() => {
    if (mode === "EDIT") {
      dispatch(moviesAction.setFormData(movie || defaultFormData));
    } else {
      dispatch(moviesAction.setFormData(defaultFormData));
    }
  }, [mode, movie]);

  return {
    formData,
    mode,
    visible,
    submitCallback,
    resetCallback,
    closeCallback,
  };
}

interface IMovieModalProps {
  formData: MovieDTO;
  mode: MovieModalMode;
  visible: boolean;
  submitCallback: (data: MovieDTO) => void;
  resetCallback: () => void;
  closeCallback: () => void;
}

function MovieModal({
  formData,
  mode,
  visible,
  submitCallback,
  resetCallback,
  closeCallback,
}: IMovieModalProps) {
  return (
    <Modal
      title={`${mode} movie`}
      visible={visible}
      closeCallback={closeCallback}
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
