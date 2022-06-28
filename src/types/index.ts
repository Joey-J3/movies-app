export type SizeType = "small" | "middle" | "large";

export type OptionType = { label: string; value: any };

export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  genres: Array<string>;
  runtime: number;
  overview: string;
  tagline?: string;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  budget?: number;
  revenue?: number;
}
