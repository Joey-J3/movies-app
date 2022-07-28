export type SizeType = "small" | "middle" | "large";

export type OptionType = { label: string; value: any };

export interface MovieDTO {
  title: string;
  poster_path: string;
  genres: Array<string>;
  runtime: number | "";
  overview: string;
  release_date?: string;
  vote_average?: number | "";
}
export interface Movie extends MovieDTO {
  id: number;
  tagline?: string;
  vote_count?: number;
  budget?: number;
  revenue?: number;
}

declare global {
  interface Window {
    __PRELOADED_STATE__: any;
  }
}
