import { Movie } from "@/types";
import React from "react";
import Dropdown, { OptionType } from "../Dropdown";
import Input from "../Input";

import movieFormStyle from "./movie-form.module.scss";

interface MovieFormInterface {
  formData: Partial<Movie>;
  onChange: (value: any, fieldName: string) => any;
}

const mockGenreOptions = ["genre", "mock1", "mock2"];

function MovieForm({ formData, onChange }: MovieFormInterface) {
  const { title, release_date, url, rating, genre, runtime, overview } =
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
              value={url}
              placeholder={"https://"}
              onChange={(e) => onChange(e.target.value, "url")}
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
              multiple
              options={mockGenreOptions.map((o) => ({ label: o, value: o }))}
              onChange={(value) => onChange((value as Array<OptionType>).map(i => i.value), "genre")}
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
              onChange={(e) => onChange(e.target.value, "runtime")}
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
            onChange={(e) => onChange(e.target.value, "overview")}
          />
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
