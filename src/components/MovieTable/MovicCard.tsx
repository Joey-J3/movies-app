import { Movie } from "@/types";
import React from "react";
import Card from "../Card";

export enum menuItem {
  EDIT = "Edit",
  DELETE = "Delete",
}

type MovieCardProps = {
  movie: Movie;
  onClickMenuItem: (value: string) => any;
};

const menuList = Object.values(menuItem);

function MovicCard({ movie, onClickMenuItem }: MovieCardProps) {
  const { poster_path, title, tagline, release_date } = movie;
  return (
    <Card
      url={poster_path}
      title={title}
      subTitle={tagline}
      release_date={release_date}
      menuList={menuList}
      onClickMenuItem={onClickMenuItem}
    />
  );
}

export default MovicCard;
