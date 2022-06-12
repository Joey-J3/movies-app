import React, { useContext, useEffect, useState } from "react";
import Tabs from "../Tabs";
import { mockMovieData } from "../../../mock";
import MovicCard, { menuItem } from "./MovicCard";
import { Movie } from "@/types";
import MovieModal from "../MovieModal";
import Popup from "../Modal/Popup";
import Dropdown, { OptionType } from "../Dropdown";
import tableStyle from "./table.module.scss";
import { Actions, MovieContext } from "@/context/MovieContext";

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
  const { currentMovie, movies, dispatch } = useContext(MovieContext);
  const [sortedMovies, setSortedMovies] = useState(movies);
  useEffect(() => {
    if (movies.length === 0) {
      dispatch({
        type: Actions.SET_MOVIES,
        payload: mockMovieData,
      });
    }
  }, []);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const onClickMenuItem = (value: string, movie: Movie) => {
    setCurrentMovie(movie);
    if (value === menuItem.EDIT) {
      setShowModal(true);
    } else if (value === menuItem.DELETE) {
      // show del modal
      setShowPopup(true);
    }
  };
  const [curSortType, setcurSortType] = useState<string>(mockSortType[0].value);

  useEffect(() => {
    let sortedArr: Array<Movie>;
    if (curSortType === "release_date") {
      sortedArr = movies.sort((a, b) =>
        new Date(a.release_date).getTime() < new Date(b.release_date).getTime()
          ? -1
          : 1
      );
    } else if (curSortType === "rating") {
      sortedArr = movies.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    setSortedMovies(sortedArr)
  }, [curSortType, movies]);

  const setCurrentMovie = (movie: Movie) => {
    dispatch({
      type: Actions.REPLACE,
      payload: movie,
    });
    dispatch({
      type: Actions.SHOW_MOVIE_DETAIL
    })
  };
  const onClickTab = () => {};
  const onClickMovieCard = (movie: Movie) => {
    setCurrentMovie(movie);
  };

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
        {sortedMovies.map((movie: Movie) => (
          <div
            className={tableStyle["card-item"]}
            key={movie.title}
            onClick={() => onClickMovieCard(movie)}
          >
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
