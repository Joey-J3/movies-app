import { Movie } from ".";

export enum HttpMethod {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}

export type HttpMethodType = keyof typeof HttpMethod;

export type getAllMoviesType = Partial<{
  sortBy: string; // field to sort by
  sortOrder: "desc" | "asc";
  search: string; //search value
  searchBy: "title" | "genres"; // type of search
  filter: string; // array to filter by genres
  offset: string; // offset in result array for pagination
  limit: string; // limit amount of items in result array for pagination
}>;

export interface API {
  get: {
    "/movies": getAllMoviesType;
    "/movies/genres/all": any;
  };
  put: {
    "/movies": Movie;
  };
  post: {
    "/movies": Omit<Movie, "id">;
  };
  delete: {
    "/movies/:id": {
      [key: string]: any;
    };
  };
}

export interface APIResponse {
  get: {
    "/movies": {
      data: Movie[];
      limit: number;
      offset: number;
      totalAmount: number;
    };
    "/movies/genres/all": {
      genres: Array<string>;
    };
  };
  put: {
    "/movies": Movie;
  };
  post: {
    "/movies": Movie;
  };
  delete: {
    "/movies/:id": number;
  };
}
