import React from "react";
import Header from "@/components/Header";
import MovieTable from "@/components/MovieTable";
import logo from "../../../static/netflixroulette.svg";
import homeStyle from "./home.module.scss";
import ErrorBoundary from "@/components/ErrorBoundary";
import MovieProvider, { MovieConsumer } from "@/context/MovieContext";
import MovieDetail from "@/components/MovieDetail";

function Home() {
  return (
    <MovieProvider>
      <div className={homeStyle.home}>
        <ErrorBoundary>
          <MovieConsumer>
            { ({ currentMovie, showMovieDetail}) => showMovieDetail ? <MovieDetail movie={currentMovie} /> : <Header />}
          </MovieConsumer>
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
    </MovieProvider>
  );
}

export default Home;
