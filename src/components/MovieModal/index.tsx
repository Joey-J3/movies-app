import { Movie } from "@/types";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import Footer from "../Modal/Footer";
import MovieForm from "./MovieForm";
import { mockMovieData } from "../../../mock";

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
  runtime: "",
  overview: "",
};

function MovieModal({
  mode = "add",
  movieData,
  visible = false,
  close,
}: MovieModalInterface) {
  const [formData, setFormData] = useState<Partial<Movie>>(defaultFormData);

  useEffect(() => {
    if (mode === "edit" && movieData) {
      setFormData(movieData);
    }
  }, [mode, movieData]);

  const onChange = (value: any, fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const submitCallback = async () => {
    try {
      // Add to database
      await new Promise((resolve, reject) => {
        mockMovieData.push(formData as Movie);
        resolve(1);
      });
    } catch (e) {
      throw new Error(`Fail to submit new movie with error: ${e}`);
    } finally {
      close();
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
