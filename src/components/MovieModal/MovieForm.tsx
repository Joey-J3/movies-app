import { useAppSelector } from "@/hooks";
import { selectGenres } from "@/store/movies/selector";
import { Movie, OptionType } from "@/types";
import React from "react";
import Dropdown from "../Dropdown";
import Input from "../Input";

import movieFormStyle from "./movie-form.module.scss";

interface MovieFormInterface {
  formData: Partial<Movie>;
  onChange: (value: any, fieldName: string) => any;
}

function MovieForm({ formData, onChange }: MovieFormInterface) {
  const genresOption = useAppSelector(selectGenres);
  const {
    title,
    release_date,
    poster_path,
    vote_average,
    genres,
    runtime,
    overview,
  } = formData;

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
              inputType={"date"}
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
              inputType={"url"}
              value={poster_path}
              placeholder={"https://"}
              onChange={(e) => onChange(e.target.value, "poster_path")}
            />
          </div>
          <div className={movieFormStyle["row-1"]}>
            <Input
              label="RATING"
              id="vote_average"
              value={vote_average}
              placeholder={"7.8"}
              inputType={"number"}
              onChange={(e) => onChange(Number(e.target.value), "vote_average")}
            />
          </div>
        </div>
        <div className={movieFormStyle["form-row"]}>
          <div className={movieFormStyle["row-2"]}>
            <label className={movieFormStyle["drop-down__label"]}>GENRE</label>
            <Dropdown
              value={genres}
              multiple
              options={genresOption.map((o) => ({ label: o, value: o }))}
              onChange={(value) =>
                onChange(
                  (value as Array<OptionType>).map((i) => i.value),
                  "genres"
                )
              }
              className={"controls"}
              placeholder={"genre"}
            />
          </div>
          <div className={movieFormStyle["row-1"]}>
            <Input
              label="RUNTIME"
              id="runtime"
              inputType={"number"}
              value={runtime}
              placeholder={"minutes"}
              onChange={(e) => onChange(Number(e.target.value), "runtime")}
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
