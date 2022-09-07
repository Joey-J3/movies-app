import { useFormik } from "formik";
import * as yup from "yup";
import { useAppSelector } from "@/hooks";
import { selectGenres } from "@/store/movies/selector";
import { MovieDTO, OptionType } from "@/types";
import React from "react";
import Dropdown from "../Dropdown";
import Input from "../Input";
import Footer from "../Modal/Footer";

import movieFormStyle from "./movie-form.module.scss";
import { useMovieFormik } from "./utils";

export interface MovieFormInterface {
  formData: MovieDTO;
  // onChange: (value: any, fieldName: string) => any;
  submitCallback: (data: MovieDTO) => any;
  resetCallback: () => any;
}

function MovieForm({
  formData,
  submitCallback,
  resetCallback,
}: MovieFormInterface) {
  const genresOption = useAppSelector(selectGenres);
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    handleReset,
    touched,
    setFieldValue,
  } = useMovieFormik({
    formData,
    submitCallback,
    resetCallback,
  });

  return (
    <form
      className={movieFormStyle["movie-form"]}
      onSubmit={handleSubmit}
      onReset={handleReset}
      data-testid={"movie-modal-form"}
    >
      <div className={movieFormStyle["form-row"]}>
        <div className={movieFormStyle["row-2"]}>
          <label className={movieFormStyle["form-label"]} htmlFor="title">
            TITLE
          </label>
          <Input
            name="title"
            value={values.title}
            placeholder={"title"}
            onChange={handleChange}
          />
          <p className={movieFormStyle["form-error"]}>
            {(touched.title && errors.title) || ""}
          </p>
        </div>
        <div className={movieFormStyle["row-1"]}>
          <label
            className={movieFormStyle["form-label"]}
            htmlFor="release_date"
          >
            RELEASE DATE
          </label>
          <Input
            name="release_date"
            inputType={"date"}
            value={values.release_date}
            placeholder={"Select Date"}
            onChange={handleChange}
          />
          <p className={movieFormStyle["form-error"]}>
            {(touched.release_date && errors.release_date) || ""}
          </p>
        </div>
      </div>
      <div className={movieFormStyle["form-row"]}>
        <div className={movieFormStyle["row-2"]}>
          <label className={movieFormStyle["form-label"]} htmlFor="poster_path">
            MOVIE URL
          </label>
          <Input
            name="poster_path"
            inputType={"url"}
            value={values.poster_path}
            placeholder={"https://"}
            onChange={handleChange}
          />
          <p className={movieFormStyle["form-error"]}>
            {(touched.poster_path && errors.poster_path) || ""}
          </p>
        </div>
        <div className={movieFormStyle["row-1"]}>
          <label
            className={movieFormStyle["form-label"]}
            htmlFor="vote_average"
          >
            RATING
          </label>
          <Input
            name="vote_average"
            value={values.vote_average}
            placeholder={"7.8"}
            inputType={"number"}
            onChange={handleChange}
          />
          <p className={movieFormStyle["form-error"]}>
            {(touched.vote_average && errors.vote_average) || ""}
          </p>
        </div>
      </div>
      <div className={movieFormStyle["form-row"]}>
        <div className={movieFormStyle["row-2"]}>
          <label className={movieFormStyle["form-label"]}>GENRE</label>
          <Dropdown
            value={values.genres}
            multiple
            options={genresOption.map((o) => ({ label: o, value: o }))}
            onChange={(v) =>
              setFieldValue(
                "genres",
                (v as OptionType[]).map((v) => v.value)
              )
            }
            className={"controls"}
            placeholder={"genre"}
          />
          <p className={movieFormStyle["form-error"]}>
            {(touched.genres && errors.genres) || ""}
          </p>
        </div>
        <div className={movieFormStyle["row-1"]}>
          <label className={movieFormStyle["form-label"]} htmlFor="runtime">
            RUNTIME
          </label>
          <Input
            name="runtime"
            inputType={"number"}
            value={values.runtime}
            placeholder={"minutes"}
            onChange={handleChange}
          />
          <p className={movieFormStyle["form-error"]}>
            {(touched.runtime && errors.runtime) || ""}
          </p>
        </div>
      </div>
      <div>
        <label className={movieFormStyle["form-label"]} htmlFor="overview">
          OVERVIEW
        </label>
        <Input
          type="textarea"
          placeholder="Movie description"
          name="overview"
          value={values.overview}
          onChange={handleChange}
        />
        <p className={movieFormStyle["form-error"]}>
          {(touched.overview && errors.overview) || ""}
        </p>
      </div>
      <Footer submitText="submit" resetText="reset" />
    </form>
  );
}

export default MovieForm;
