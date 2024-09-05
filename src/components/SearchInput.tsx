import SearchIcon from "./../assets/search-icon.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface SearchInputTypes {
  value: string;
  searchFunction: ActionCreatorWithPayload<string>;
}

const SearchInput = ({ value, searchFunction }: SearchInputTypes) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="search-input-div mx-auto mb-8 mt-4 inline-flex h-8 w-4/5 items-stretch border lg:my-2">
      <div className="w-1/5 -mr-1/5 border-r">
        <img
          className="icon search-icon mx-auto w-5 h-full opacity-35"
          src={SearchIcon}
        />
      </div>
      <input
        className="text-center w-3/5"
        type="text"
        name="name"
        value={value}
        onChange={(evt) => dispatch(searchFunction(evt.currentTarget.value))}
      />
      <button
        className={`search-clean-button w-1/5  ${
          { value } ? "opacity-35 visible" : "opacity-0 invisible"
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
