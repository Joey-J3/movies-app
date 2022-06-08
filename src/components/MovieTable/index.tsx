import React, { useEffect, useState } from "react";
import Tabs from "../Tabs";
import { mockMovieData } from "../../../mock";
import MovicCard, { menuItem } from "./MovicCard";
import { Movie } from "@/types";
import MovieModal from "../MovieModal";
import Popup from "../Modal/Popup";
import Dropdown, { OptionType } from "../Dropdown";
import tableStyle from "./table.module.scss";

const tabsName = ["all", "documentary", "comedy", "horror", "crime"];

const mockSortType = [
  {
    label: "RELEASE DATE",
    value: "release_date",
  },
  {
    label: "RATING",
    value: "rating",
  },
];

function MovieTable() {
  const [movieList, setMovieList] = useState<Array<Movie>>(mockMovieData);
  const [currentMovie, setCurrentMovie] = useState<Movie>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [curSortType, setcurSortType] = useState<string>(mockSortType[0].value);
  const onClickTab = () => {};
  const onClickMenuItem = (value: string, movie: Movie) => {
    setCurrentMovie(movie);
    if (value === menuItem.EDIT) {
      setShowModal(true);
    } else if (value === menuItem.DELETE) {
      // show del modal
      setShowPopup(true);
    }
  };

  useEffect(() => {
    setMovieList(mockMovieData);
  }, [mockMovieData]);

  useEffect(() => {
    let sortedMovies;
    if (curSortType === "release_date") {
      sortedMovies = movieList.sort((a, b) =>
        new Date(a.release_date).getTime() < new Date(b.release_date).getTime()
          ? -1
          : 1
      );
    } else if (curSortType === "rating") {
      sortedMovies = movieList.sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      );
    }

    setMovieList(sortedMovies);
  }, [curSortType, movieList]);

  return (
    <div className={tableStyle["movie-table"]}>
      <div className={tableStyle["movie-table__tab__wrapper"]}>
        <Tabs tabs={tabsName} onClickTab={onClickTab} />
        <div className={tableStyle["filter"]}>
          <p className="text-uppercase">sort by</p>
          <Dropdown
            value={curSortType}
            onChange={(o) => setcurSortType((o as OptionType).value as string)}
            options={mockSortType}
            className={tableStyle["filter__selector"]}
            placeholder={"Select sort type"}
          />
        </div>
      </div>
      <div className={tableStyle["movie-table__count"]}>
        <span className={tableStyle["movie-table__count-number"]}>39</span>{" "}
        movies found
      </div>
      {/* movie-cards list */}
      <div className={tableStyle["movie-table__content"]}>
        {movieList.map((movie: Movie) => (
          <div className={tableStyle["card-item"]} key={movie.title}>
            <MovicCard
              movie={movie}
              onClickMenuItem={(value) => onClickMenuItem(value, movie)}
            />
          </div>
        ))}
      </div>
      <MovieModal
        mode="edit"
        movieData={currentMovie}
        visible={showModal}
        close={() => setShowModal(false)}
      />
      <Popup
        visible={showPopup}
        close={() => setShowPopup(false)}
        title={"CONGRATULATIONS !"}
        subTitle={"The movie has been added to database successfully"}
      />
    </div>
  );
}

export default MovieTable;
