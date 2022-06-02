import React, { useState } from "react";
import logo from "../../../static/netflixroulette.svg";
import AddMovieModal from "../AddMovieModal";
import ErrorBoundary from "../ErrorBoundary";
import AddButton from "./AddButton";
import SearchBox from "./SearchBox";
import headerStyle from "./styles/header.module.scss";

function Header() {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.logo}>
        <img src={logo} />
      </div>
      <ErrorBoundary>
        <div className={headerStyle["header__add--button"]}>
          <AddButton onClick={() => setShowAddModal(true)} />
          <AddMovieModal
            visible={showAddModal}
            close={() => setShowAddModal(false)}
          />
        </div>
        <div className={headerStyle["header__search-box"]}>
          <SearchBox />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default Header;
