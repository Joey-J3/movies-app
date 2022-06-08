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
  return (
    <Card {...movie} menuList={menuList} onClickMenuItem={onClickMenuItem} />
  );
}

export default MovicCard;
