import { Actions, MovieContext } from "@/context/MovieContext";
import { Movie } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import Footer from "../Modal/Footer";
import MovieForm from "./MovieForm";

interface MovieModalInterface {
  mode?: "add" | "edit";
  movieData?: Movie;
  visible: boolean;
  close: () => any;
}

const defaultFormData: Partial<Movie> = {
  title: "",
  release_date: "",
  url: "",
  rating: "",
  genre: [],
  runtime: 0,
  overview: "",
};

function MovieModal({
  mode = "add",
  movieData,
  visible = false,
  close,
}: MovieModalInterface) {
  const { dispatch, movies } = useContext(MovieContext)
  const [formData, setFormData] = useState<Partial<Movie>>(defaultFormData);

  useEffect(() => {
    if (mode === "edit" && movieData) {
      setFormData(movieData);
    }
  }, [mode, movieData]);

  const onChange = (value: any, fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };
  
  const addMovie = async () => {
    try {
      // Add to database
      await new Promise((resolve, reject) => {
        dispatch({
          type: Actions.ADD_MOVIE,
          payload: formData
        })
        resolve(1);
      });
      close();
    } catch (e) {
      throw new Error(`Fail to submit new movie with error: ${e}`);
    }
  }

  const saveMovie = async () => {
    try {
      const index = movies.findIndex(m => m.id === movieData.id)
      if (index > -1) {
        await new Promise((resolve, reject) => {
            dispatch({
            type: Actions.REPLACE,
            payload: formData
          })
          resolve(formData)
        }).then(() => {
          const newMovies = [...movies]
          newMovies.splice(index, 1, formData as Movie)
          dispatch({
            type: Actions.SET_MOVIES,
            payload: newMovies
          })
          close();
        })
      } else {
        throw new Error("This movie doesn't exist!")
      }
    } catch (e) {
      console.log(e);
    }
  }

  const submitCallback = async () => {
    if (mode === "add") {
      await addMovie()
    } else {
      await saveMovie()
    }
  };
  const resetCallback = () => {
    setFormData(defaultFormData);
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
