import React from "react";
import { Movie } from "@/types";
import movieDetailStyle from "./movie-detail.module.scss";
import { movieDuration } from "@/utils";

interface MovieDetailProps {
  movie: Movie;
}

function MovieDetail({ movie }: MovieDetailProps) {
  const { title, url, rating, genre, publishDate, runtime, overview } = movie;
  return (
    <div className={movieDetailStyle["movie-detail"]}>
      <div className={movieDetailStyle["movie-detail__header"]}>
        <p className={movieDetailStyle["movie-detail__header--left"]}>
          netflixroulette
        </p>
        <div className={movieDetailStyle["movie-detail__header--right"]}>
          <span className="material-icons">search</span>
        </div>
      </div>
      <div className={movieDetailStyle["movie-detail__main"]}>
        <div className={movieDetailStyle["movie-detail__img"]}>
          <img src={url} alt={title} />
        </div>
        <div className={movieDetailStyle["movie-detail__content"]}>
          <div className={movieDetailStyle["movie-detail__title"]}>
            <h3>{title}</h3>
          </div>
          <div className={movieDetailStyle["movie-detail__rate"]}>{rating}</div>
          <div className={movieDetailStyle["movie-detail__genres"]}>
            {genre.join(" & ")}
          </div>
          <div
            className={movieDetailStyle["movie-detail__publish-year__duration"]}
          >
            <span>{publishDate}</span>
            <span>{movieDuration(runtime)}</span>
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
