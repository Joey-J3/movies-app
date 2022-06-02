import React, { MouseEventHandler, useState } from "react";
import Modal from "../Modal";
import Footer from "../Modal/Footer";
import AddMovieForm from "./AddMovieForm";

interface AddMovieModalInterface {
  visible: boolean;
  close: MouseEventHandler;
}

const defaultFormData = {
  title: "",
  release_date: "",
  movie_url: "",
  rating: "",
  genre: { label: "", value: "" },
  runtime: "",
  overview: "",
};

function AddMovieModal({ visible = false, close }: AddMovieModalInterface) {
  const [formData, setFormData] = useState({
    title: "Moana",
    release_date: "",
    movie_url: "",
    rating: "",
    genre: {
      label: "",
      value: "",
    },
    runtime: "",
    overview: "",
  });

  const onChange = (value: any, fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const submitCallback = () => {};
  const resetCallback = () => {
    setFormData(defaultFormData);
  };

  return (
    <Modal
      title="add movie"
      visible={visible}
      closeCallback={close}
      footer={
        <Footer
          submitText="submit"
          resetText="reset"
          confirmCallback={submitCallback}
          cancelCallback={resetCallback}
        />
      }
    >
      <AddMovieForm formData={formData} onChange={onChange} />
    </Modal>
  );
}

export default AddMovieModal;
