import React from "react";
import Header from "@/components/Header";
import MovieTable from "@/components/MovieTable";
import logo from "../../../static/netflixroulette.svg";
import homeStyle from "./home.module.scss";
import ErrorBoundary from "@/components/ErrorBoundary";
import MovieDetail from "@/components/MovieDetail";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  selectCurrentMovie,
  selectIfShowDetail,
} from "@/store/movies/selector";
import { getAllGenres, getAllMovies, moviesAction } from "@/store/movies";
import MovieModal from "@/components/MovieModal";
import { useSearchParams } from "react-router-dom";
import { AppStore } from "@/store";
import { getAllMoviesType } from "@/types/api";

function Home() {
  const showDetail = useAppSelector(selectIfShowDetail);
  const currentMovie = useAppSelector(selectCurrentMovie);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const backToSearch = () => {
    dispatch(moviesAction.setShowDetailMode(false));
    searchParams.delete("movie");
    setSearchParams(searchParams);
  };
  return (
    <div className={homeStyle.home}>
      <MovieModal />
      {showDetail ? (
        <MovieDetail movie={currentMovie} onClickSearch={backToSearch} />
      ) : (
        <Header />
      )}
      <div className={homeStyle.gap}></div>
      <MovieTable />
      <footer>
        <div className={homeStyle.footer}>
          <img src={logo} alt="netflex roulette" />
        </div>
      </footer>
    </div>
  );
}

Home.loadData = (store: AppStore, params?: getAllMoviesType) => {
  return Promise.all([
    store.dispatch(getAllMovies(params)),
    store.dispatch(getAllGenres()),
  ]);
};

export default Home;
