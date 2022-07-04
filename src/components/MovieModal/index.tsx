import { useAppDispatch, useAppSelector } from "@/hooks";
import { createMovie, getAllMovies, updateMovie } from "@/store/movies";
import { selectCurrentMovie, selectLastParams } from "@/store/movies/selector";
import { Movie } from "@/types";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import MovieForm from "./MovieForm";

type Mode = "add" | "edit";

interface MovieModalInterface {
  mode?: Mode;
  visible: boolean;
  close: () => any;
}

type MovieDTO<T extends Mode> = T extends "add" ? Omit<Movie, "id"> : Movie;

const defaultFormData: Partial<Movie> = {
  title: "",
  release_date: "",
  poster_path: "",
  vote_average: 0,
  genres: [],
  runtime: 0,
  overview: "",
};

function MovieModal({
  mode = "add",
  visible = false,
  close,
}: MovieModalInterface) {
  const movie = useAppSelector(selectCurrentMovie);
  const lastParams = useAppSelector(selectLastParams);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<MovieDTO<typeof mode>>();

  useEffect(() => {
    const defaultValue = defaultFormData as MovieDTO<typeof mode>;
    if (mode === "edit") {
      setFormData(movie || defaultValue);
    } else {
      setFormData(defaultValue);
    }
  }, [mode, movie]);

  const addMovie = async (data: Omit<Movie, "id">) => {
    dispatch(createMovie(data));
    close();
  };

  const saveMovie = async (data: Movie) => {
    dispatch(updateMovie(data));
    close();
  };

  const submitCallback = async (data: Partial<Movie>) => {
    if (mode === "add") {
      await addMovie(data as Omit<Movie, "id">);
    } else {
      await saveMovie(data as Movie);
    }
    dispatch(getAllMovies(lastParams));
  };
  const resetCallback = () => {
    setFormData(defaultFormData as MovieDTO<typeof mode>);
  };

  return (
    <Modal title={`${mode} movie`} visible={visible} closeCallback={close}>
      <MovieForm
        formData={formData}
        submitCallback={submitCallback}
        resetCallback={resetCallback}
      />
    </Modal>
  );
}

export default MovieModal;
