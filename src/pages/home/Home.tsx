import React from "react";
import Header from "@/components/Header";
import MovieTable from "@/components/MovieTable";
import logo from "../../../static/netflixroulette.svg";
import homeStyle from "./home.module.scss";
import ErrorBoundary from "@/components/ErrorBoundary";

function Home() {
  return (
    <div className={homeStyle.home}>
      <ErrorBoundary>
        <Header />
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
