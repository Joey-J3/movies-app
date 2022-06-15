export type SizeType = "small" | "middle" | "large";

export type Movie = {
  id: string;
  url: string;
  title: string;
  subTitle: string;
  publishDate: string;
  release_date: string;
  rating: string;
  genre: Array<string>;
  runtime: number;
  overview: string;
};
