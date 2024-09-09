import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PaginationButtons from "./../src/components/PaginationButtons";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setDisplayedPage } from "../src/app/features/paginateTableSlice";

const mockStore = configureStore([]);

describe("PaginationButtons Component", () => {
  const store = mockStore({
    paginateTable: { displayedPage: 1 },
  });

  const dispatchMock = vi.fn();
  beforeEach(() => {
    store.dispatch = dispatchMock; // Mock dispatch function
  });
  afterEach(() => {
    cleanup();
  });

  it("renders the correct number of buttons based, considering buttons that are more than 2 indexes away from current page should not be rendered", () => {
    const pagesArr = [1, 2, 3, 4, 5];

    render(
      <Provider store={store}>
        <PaginationButtons pagesArr={pagesArr} displayedPage={1} />
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it(
    "hides buttons of indexes further that 2 away from the displayed page (except the first and the last one"
  ),
    () => {
      const pagesArr = [1, 2, 3, 4, 5];

      render(
        <Provider store={store}>
          <PaginationButtons pagesArr={pagesArr} displayedPage={1} />
        </Provider>
      );

      expect(screen.getByRole("button", { name: "4" })).toBeFalsy;
    };

  it("applies bold style to the currently displayed page", () => {
    const pagesArr = [1, 2, 3, 4, 5];

    render(
      <Provider store={store}>
        <PaginationButtons pagesArr={pagesArr} displayedPage={3} />
      </Provider>
    );

    const currentButton = screen.getByText("3");
    expect(currentButton).toHaveClass("font-bold"); // Check that the current page is bold
  });

  it("dispatches setDisplayedPage with the correct page number when a button is clicked", () => {
    const pagesArr = [1, 2, 3, 4, 5];

    render(
      <Provider store={store}>
        <PaginationButtons pagesArr={pagesArr} displayedPage={1} />
      </Provider>
    );

    const button = screen.getByRole("button", { name: "5" });
    fireEvent.click(button);

    expect(dispatchMock).toHaveBeenCalledWith(setDisplayedPage(5)); // Ensure correct page is dispatched
  });

  it("renders ellipsis when pagesArr has more than 5 pages", () => {
    const pagesArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    render(
      <Provider store={store}>
        <PaginationButtons pagesArr={pagesArr} displayedPage={5} />
      </Provider>
    );

    expect(screen.getAllByText("...")).toHaveLength(2); // Check that ellipses are rendered
  });
});
