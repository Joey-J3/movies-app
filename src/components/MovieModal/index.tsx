import { useAppDispatch, useAppSelector } from "@/hooks";
import { createMovie, getAllMovies, updateMovie } from "@/store/movies";
import { selectCurrentMovie, selectLastParams } from "@/store/movies/selector";
import { Movie } from "@/types";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import Footer from "../Modal/Footer";
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
    if (mode === "edit") {
      setFormData(movie);
    } else {
      setFormData(defaultFormData as MovieDTO<typeof mode>);
    }
  }, [mode, movie]);

  function onChange(value: any, fieldName: string) {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  }

  const addMovie = async () => {
    dispatch(createMovie(formData));
    close();
    dispatch(getAllMovies(lastParams));
  };

  const saveMovie = async () => {
    dispatch(updateMovie(formData as Movie));
    close();
  };

  const submitCallback = async () => {
    if (mode === "add") {
      await addMovie();
    } else {
      await saveMovie();
    }
  };
  const resetCallback = () => {
    setFormData(defaultFormData as MovieDTO<typeof mode>);
  };

  return (
    <Modal
      title={`${mode} movie`}
      visible={visible}
      closeCallback={close}
      footer={
        <Footer
          submitText="submit"
          resetText="reset"
          confirmCallback={() => submitCallback()}
          cancelCallback={resetCallback}
        />
      }
    >
      <MovieForm formData={formData} onChange={onChange} />
    </Modal>
  );
}

export default MovieModal;
