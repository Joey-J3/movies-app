import React from "react";
import Card from "../MovieCard";
import Tabs from "../Tabs";
import tableStyle from "./table.module.scss";
import { mockMovieData } from "../../../mock";

const tabsName = ["all", "documentary", "comedy", "horror", "crime"];

function MovieTable() {
  const onClickTab = () => {};
  return (
    <div className={tableStyle["movie-table"]}>
      <Tabs
        tabs={tabsName}
        // sortOptions={["release date"]}
        onClickTab={onClickTab}
      />
      <div className={tableStyle["movie-table__count"]}>
        <span className={tableStyle["movie-table__count-number"]}>39</span>{" "}
        movies found
      </div>
      {/* movie-cards list */}
      <div className={tableStyle["movie-table__content"]}>
        {mockMovieData.map((movie) => (
          <div className={tableStyle["card-item"]} key={movie.title}>
            <Card {...movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieTable;
