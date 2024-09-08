import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { setDisplayedPage } from "../src/app/features/paginateTableSlice";
import SearchInput from "../src/components/SearchInput";

// Configure a mock Redux store
const mockStore = configureStore([]);

describe("Check search-related calls", () => {
  let store: any;

  let searchFunctionMock: ActionCreatorWithPayload<string, string>;

  beforeEach(() => {
    // Correctly mock the search function with ActionCreatorWithPayload
    searchFunctionMock = vi.fn((payload: string) => ({
      type: "searchFunction",
      payload,
    })) as unknown as ActionCreatorWithPayload<string, string>;

    // Initialize mock Redux store
    store = mockStore({});
    store.dispatch = vi.fn(); // Mock dispatch
  });

  it("dispatches searchFunction and setDisplayedPage when typing in the input", () => {
    render(
      <Provider store={store}>
        <SearchInput
          value=""
          searchFunction={searchFunctionMock}
          displayedPage={2}
        />
      </Provider>
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "new search" } });

    expect(store.dispatch).toHaveBeenCalledWith(
      searchFunctionMock("new search")
    );
    expect(store.dispatch).toHaveBeenCalledWith(setDisplayedPage(1)); // Reset to page 1
  });

  it("dispatches searchFunction with empty string when clear button is clicked", () => {
    render(
      <Provider store={store}>
        <SearchInput
          value="something"
          searchFunction={searchFunctionMock}
          displayedPage={1}
        />
      </Provider>
    );

    const clearButton = screen.getAllByRole("button")[0];
    fireEvent.click(clearButton);

    expect(store.dispatch).toHaveBeenCalledWith(searchFunctionMock(""));
  });

  it("hides the clear button when the input is empty", () => {
    render(
      <Provider store={store}>
        <SearchInput
          value=""
          searchFunction={searchFunctionMock}
          displayedPage={1}
        />
      </Provider>
    );

    const clearButton = screen.getAllByRole("button")[0];
    expect(clearButton).toHaveClass("invisible");
  });
});
