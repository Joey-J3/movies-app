import React from "react";
import logo from "../../../static/netflixroulette.svg";
import ErrorBoundary from "../ErrorBoundary";
import AddButton from "./AddButton";
import SearchBox from "./SearchBox";
import headerStyle from "./styles/header.module.scss";
import { useAppDispatch, useAppSelector, useUrlParams } from "@/hooks";
import { getAllMovies, moviesAction } from "@/store/movies";
import { selectLastParams } from "@/store/movies/selector";

function Header() {
  const [searchParams, setSearchParams] = useUrlParams();
  // const [searchText, setSearchText] = useState<string>("");
  const searchText = searchParams.get("searchQuery") || "";
  const dispatch = useAppDispatch();
  const lastParams = useAppSelector(selectLastParams);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams("searchQuery", e.target.value);
  };

  const onSearch = () => {
    const params = { ...lastParams };
    params.search = searchText;
    dispatch(getAllMovies(params));
  };

  const onClickAdd = () => {
    dispatch(moviesAction.setVisible({ visible: true, mode: "ADD" }));
  };

  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.logo}>
        <img src={logo} />
      </div>
      <ErrorBoundary>
        <div className={headerStyle["header__add--button"]}>
          <AddButton onClick={onClickAdd} />
        </div>
        <div className={headerStyle["header__search-box"]}>
          <SearchBox
            searchText={searchText}
            onChange={onChange}
            onSearch={onSearch}
          />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default Header;
