export enum Actions {
  REPLACE_MOVIE = "movies/replace",
  SET_MOVIES = "movies/setAll",
  ADD_MOVIE = "movies/addOne",
  SET_SHOW_DETAIL_MODE = "movies/setShowDetailMode",
}

export interface ActionType<T> {
  type: keyof typeof Actions;
  payload: T;
}
