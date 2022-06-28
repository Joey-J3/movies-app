import React, { useState } from "react";
import logo from "../../../static/netflixroulette.svg";
import MovieModal from "../MovieModal";
import ErrorBoundary from "../ErrorBoundary";
import AddButton from "./AddButton";
import SearchBox from "./SearchBox";
import headerStyle from "./styles/header.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getAllMovies } from "@/store/movies";
import { selectLastParams } from "@/store/movies/selector";

function Header() {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const dispatch = useAppDispatch();
  const lastParams = useAppSelector(selectLastParams);

  const onSearch = () => {
    dispatch(getAllMovies({ search: searchText, ...lastParams }));
  };

  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.logo}>
        <img src={logo} />
      </div>
      <ErrorBoundary>
        <div className={headerStyle["header__add--button"]}>
          <AddButton onClick={() => setShowAddModal(true)} />
          <MovieModal
            visible={showAddModal}
            close={() => setShowAddModal(false)}
          />
        </div>
        <div className={headerStyle["header__search-box"]}>
          <SearchBox
            searchText={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={onSearch}
          />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default Header;
