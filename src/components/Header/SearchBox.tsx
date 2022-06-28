import React from "react";
import Button from "../Button";
import searchBoxStyle from "./styles/search-box.module.scss";

interface SearchBoxProps {
  searchText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearch: () => any;
}

function SearchBox({ searchText, onChange, onSearch }: SearchBoxProps) {
  return (
    <>
      <h1 className={`${searchBoxStyle["search-box__title"]} text-uppercase`}>
        Find your movie
      </h1>
      <div className={searchBoxStyle["search-box__wrapper"]}>
        <input
          className={searchBoxStyle["search-box__input"]}
          placeholder="What do you want to watch?"
          tabIndex={1}
          value={searchText}
          onChange={onChange}
        />
        <div className={searchBoxStyle["search-button"]}>
          <Button
            type="submit"
            styleObject={{
              padding: ".75em 3em",
            }}
            onClick={() => onSearch()}
          >
            <p className={searchBoxStyle["search-button__text"]}>search</p>
          </Button>
        </div>
      </div>
    </>
  );
}

export default SearchBox;
