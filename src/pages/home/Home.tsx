import React from "react";
import Header from "@/components/Header";
import MovieTable from "@/components/MovieTable";
import logo from "../../../static/netflixroulette.svg";
import homeStyle from "./home.module.scss";
import ErrorBoundary from "@/components/ErrorBoundary";
import MovieProvider, { MovieConsumer } from "@/context/MovieContext";
import MovieDetail from "@/components/MovieDetail";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  selectCurrentMovie,
  selectIfShowDetail,
} from "@/store/movies/selector";
import { moviesAction } from "@/store/movies";

function Home() {
  const showDetail = useAppSelector(selectIfShowDetail);
  const currentMovie = useAppSelector(selectCurrentMovie);
  const dispatch = useAppDispatch();
  const backToSearch = () => {
    dispatch(moviesAction.setShowDetailMode(false));
  };
  return (
    <div className={homeStyle.home}>
      <ErrorBoundary>
        {showDetail ? (
          <MovieDetail movie={currentMovie} onClickSearch={backToSearch} />
        ) : (
          <Header />
        )}
      </ErrorBoundary>
      <div className={homeStyle.gap}></div>
      <ErrorBoundary>
        <MovieTable />
      </ErrorBoundary>
      <footer>
        <div className={homeStyle.footer}>
          <img src={logo} alt="netflex roulette" />
        </div>
      </footer>
    </div>
  );
}

export default Home;
