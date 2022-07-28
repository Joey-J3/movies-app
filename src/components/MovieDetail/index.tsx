import React from "react";
import { Movie } from "@/types";
import movieDetailStyle from "./movie-detail.module.scss";
import { movieDuration } from "@/utils";

interface MovieDetailProps {
  movie: Movie;
  onClickSearch: () => any;
}

function MovieDetail({ movie, onClickSearch }: MovieDetailProps) {
  const {
    title,
    poster_path: url,
    vote_average: rating,
    genres: genre,
    release_date,
    runtime,
    overview,
  } = movie;
  return (
    <div className={movieDetailStyle["movie-detail"]}>
      <div className={movieDetailStyle["movie-detail__header"]}>
        <p className={movieDetailStyle["movie-detail__header--left"]}>
          netflixroulette
        </p>
        <div className={movieDetailStyle["movie-detail__header--right"]}>
          <span className="material-icons" onClick={() => onClickSearch()}>
            search
          </span>
        </div>
      </div>
      <div className={movieDetailStyle["movie-detail__main"]}>
        <div className={movieDetailStyle["movie-detail__img"]}>
          <img src={url} alt={title} />
        </div>
        <div className={movieDetailStyle["movie-detail__content"]}>
          <div className={movieDetailStyle["movie-detail__title"]}>
            <p>{title}</p>
            <div className={movieDetailStyle["movie-detail__rate"]}>
              {rating}
            </div>
          </div>
          <div className={movieDetailStyle["movie-detail__genres"]}>
            {genre.join(" & ")}
          </div>
          <div
            className={movieDetailStyle["movie-detail__publish-year__duration"]}
          >
            {release_date && <span>{release_date}</span>}
            <span>{movieDuration(Number(runtime))}</span>
          </div>
          <div className={movieDetailStyle["movie-detail__desc"]}>
            {overview}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
