import SearchIcon from "./../assets/search-icon.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { setDisplayedPage } from "../app/features/paginateTableSlice";
import { preventSpecialChars } from "../utils/preventSpecialChars";

interface SearchInputTypes {
  value: string;
  searchFunction: ActionCreatorWithPayload<string>;
  displayedPage: number;
}

const SearchInput = ({
  value,
  searchFunction,
  displayedPage,
}: SearchInputTypes) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      className={`search-input-div mx-auto inline-flex h-8 items-stretch border ${
        value !== "" && "active"
      }`}
    >
      <div className="search-label -mr-1/5 min-w-[33px] border-r">
        <img className="icon search-icon mx-auto w-5 h-full" src={SearchIcon} />
      </div>
      <input
        className="text-center w-full font-light"
        type="text"
        name="name"
        value={value}
        maxLength={50}
        onChange={(evt) => {
          dispatch(searchFunction(evt.currentTarget.value));
          if (displayedPage !== 1) {
            dispatch(setDisplayedPage(1));
          }
        }}
        onKeyDown={(evt) => preventSpecialChars(evt)}
      />
      <button
        className={`search-clean-button min-w-[33px] max-w-[33px] ${
          value !== "" ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => {
          dispatch(searchFunction(""));
        }}
      >
        X
      </button>
    </div>
  );
};

export default SearchInput;
