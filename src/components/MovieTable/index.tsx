import React, { useEffect, useMemo, useState } from "react";
import Tabs from "../Tabs";
import MovicCard, { menuItem } from "./MovicCard";
import { Movie, OptionType } from "@/types";
import Popup from "../Modal/Popup";
import Dropdown from "../Dropdown";
import tableStyle from "./table.module.scss";
import {
  deleteMovie,
  getAllGenres,
  getAllMovies,
  moviesAction,
} from "@/store/movies";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Button from "../Button";
import { useSearchParams } from "react-router-dom";
// const tabsName = [
//   {
//     label: "All",
//     value: "",
//   },
//   {
//     label: "drama",
//     value: "drama",
//   },
//   {
//     label: "comedy",
//     value: "comedy",
//   },
//   {
//     label: "fantasy",
//     value: "fantasy",
//   },
//   {
//     label: "romance",
//     value: "romance",
//   },
//   {
//     label: "action",
//     value: "action",
//   },
//   {
//     label: "crime",
//     value: "crime",
//   },
// ];

const sortType = [
  {
    label: "All",
    value: "",
  },
  {
    label: "RELEASE DATE",
    value: "release_date",
  },
  {
    label: "RATING",
    value: "vote_average",
  },
];

function MovieTable() {
  const { movies, genres, currentMovie } = useAppSelector(
    (state) => state.movies
  );
  const dispatch = useAppDispatch();

  const tabs = useMemo(
    () =>
      [
        { label: "All", value: "" },
        ...genres.map((g) => ({ label: g, value: g })),
      ] as OptionType[],
    [genres]
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const curTab = searchParams.get("genre");
  const curSortType = searchParams.get("sortBy");
  useEffect(() => {
    // TODO: add params
    dispatch(
      getAllMovies({
        sortBy: curSortType,
        sortOrder: "asc",
        filter: curTab,
      })
    );
    dispatch(getAllGenres());
  }, [curSortType, curTab]);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const onClickDelete = () => {
    dispatch(deleteMovie(currentMovie.id));
    setShowDeleteModal(false);
    setShowPopup(true);
  };
  const onClickMenuItem = (value: string, movie: Movie) => {
    dispatch(moviesAction.setCurrentMovie(movie));
    if (value === menuItem.EDIT) {
      dispatch(moviesAction.setVisible({ visible: true, mode: "EDIT" }));
    } else if (value === menuItem.DELETE) {
      setShowDeleteModal(true);
    }
  };
  const changeSearchParams = (name: string, value: string) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };
  const onClickMovieCard = (movie: Movie) => {
    dispatch(moviesAction.showMovieDetail(movie));
    changeSearchParams("movie", String(movie.id));
  };

  return (
    <div className={tableStyle["movie-table"]}>
      <div className={tableStyle["movie-table__tab__wrapper"]}>
        <Tabs
          value={curTab}
          tabs={tabs}
          onClickTab={(value) => changeSearchParams("genre", value)}
        />
        <div className={tableStyle["filter"]}>
          <p className="text-uppercase">sort by</p>
          <Dropdown
            value={curSortType}
            onChange={(o) =>
              changeSearchParams("sortBy", (o as OptionType).value)
            }
            options={sortType}
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
        {movies.map((movie: Movie, i) => (
          <div
            className={tableStyle["card-item"]}
            key={movie.title + i}
            onClick={() => onClickMovieCard(movie)}
          >
            <MovicCard
              movie={movie}
              onClickMenuItem={(value) => onClickMenuItem(value, movie)}
            />
          </div>
        ))}
      </div>
      <Popup
        visible={showDeleteModal}
        close={() => setShowDeleteModal(false)}
        title={"DELETE MOVIE"}
        subTitle={"Are you sure you want to delete this movie?"}
        footer={
          <Button type="submit" onClick={onClickDelete}>
            CONFIRM
          </Button>
        }
      />
      <Popup
        visible={showPopup}
        close={() => setShowPopup(false)}
        title={"CONGRATULATIONS !"}
        type="success"
        subTitle={"The movie has been added to database successfully"}
      />
    </div>
  );
}

export default MovieTable;
