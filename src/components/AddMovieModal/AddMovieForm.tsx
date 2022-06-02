import React from "react";
import Dropdown from "../Dropdown";
import Input from "../Input";

import movieFormStyle from "./movie-form.module.scss";

interface AddMovieFormInterface {
  formData: {
    title: string;
    release_date: string;
    movie_url: string;
    rating: string;
    genre: {
      label: string;
      value: string;
    };
    runtime: string;
    overview: string;
  };
  onChange: (value: any, fieldName: string) => any;
}

const mockGenreOptions = ["genre"];

function AddMovieForm({ formData, onChange }: AddMovieFormInterface) {
  const { title, release_date, movie_url, rating, genre, runtime, overview } =
    formData;

  return (
    <div>
      <form className={movieFormStyle["movie-form"]}>
        <div className={movieFormStyle["form-row"]}>
          <div className={movieFormStyle["row-2"]}>
            <Input
              label="TITLE"
              id="title"
              value={title}
              placeholder={"title"}
              onChange={(e) => onChange(e.target.value, "title")}
            />
          </div>
          <div className={movieFormStyle["row-1"]}>
            <Input
              label="RELEASE DATE"
              id="release_date"
              value={release_date}
              placeholder={"Select Date"}
              onChange={(e) => onChange(e.target.value, "release_date")}
            />
          </div>
        </div>
        <div className={movieFormStyle["form-row"]}>
          <div className={movieFormStyle["row-2"]}>
            <Input
              label="MOVIE URL"
              id="movie_url"
              value={movie_url}
              placeholder={"https://"}
              onChange={(e) => onChange(e.target.value, "movie_url")}
            />
          </div>
          <div className={movieFormStyle["row-1"]}>
            <Input
              label="RATING"
              id="rating"
              value={rating}
              placeholder={"7.8"}
              onChange={(e) => onChange(e.target.value, "rating")}
            />
          </div>
        </div>
        <div className={movieFormStyle["form-row"]}>
          <div className={movieFormStyle["row-2"]}>
            <label className={movieFormStyle["drop-down__label"]}>GENRE</label>
            <Dropdown
              value={genre}
              options={mockGenreOptions.map((o) => ({ label: o, value: o }))}
              onChange={(value) => onChange(value, "genre")}
              className={"controls"}
              placeholder={"genre"}
            />
          </div>
          <div className={movieFormStyle["row-1"]}>
            <Input
              label="RUNTIME"
              id="runtime"
              value={runtime}
              placeholder={"minutes"}
              onChange={(e) => onChange(e, "runtime")}
            />
          </div>
        </div>
        <div>
          <Input
            type="textarea"
            label="OVERVIEW"
            placeholder="Movie description"
            id="overview"
            value={overview}
            onChange={(e) => onChange(e, "overview")}
          />
        </div>
      </form>
    </div>
  );
}

export default AddMovieForm;
