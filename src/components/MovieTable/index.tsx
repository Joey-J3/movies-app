import React, { useEffect, useMemo, useState } from "react";
import Tabs from "../Tabs";
import MovicCard, { menuItem } from "./MovicCard";
import { Movie, OptionType } from "@/types";
import MovieModal from "../MovieModal";
import Popup from "../Modal/Popup";
import Dropdown from "../Dropdown";
import tableStyle from "./table.module.scss";
import { getAllGenres, getAllMovies, moviesAction } from "@/store/movies";
import { useAppDispatch, useAppSelector } from "@/hooks";
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
  const { movies, genres } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  const tabs = useMemo(
    () =>
      [
        { label: "All", value: "" },
        ...genres.map((g) => ({ label: g, value: g })),
      ] as OptionType[],
    [genres]
  );

  const [curSortType, setcurSortType] = useState<string>(sortType[0].value);
  const [curTab, setCurTab] = useState(tabs[0]);
  useEffect(() => {
    // TODO: add params
    dispatch(
      getAllMovies({
        sortBy: curSortType,
        sortOrder: "asc",
        filter: curTab.value,
      })
    );
    dispatch(getAllGenres());
  }, [curSortType, curTab]);

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

  const setCurrentMovie = (movie: Movie) => {
    dispatch(moviesAction.replaceCurrentMovie(movie));
    dispatch(moviesAction.setShowDetailMode(true));
  };
  const onClickTab = (tab: OptionType) => {
    // TODO
    setCurTab(tab);
  };
  const onClickMovieCard = (movie: Movie) => {
    setCurrentMovie(movie);
  };

  return (
    <div className={tableStyle["movie-table"]}>
      <div className={tableStyle["movie-table__tab__wrapper"]}>
        <Tabs activeTab={curTab} tabs={tabs} onClickTab={onClickTab} />
        <div className={tableStyle["filter"]}>
          <p className="text-uppercase">sort by</p>
          <Dropdown
            value={curSortType}
            onChange={(o) => setcurSortType((o as OptionType).value as string)}
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
        {movies.map((movie: Movie) => (
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
