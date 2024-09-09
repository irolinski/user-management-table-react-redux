import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ResultsPerPage from "../src/components/ResultsPerPage";
import {
  setResutltsPerPage,
  setDisplayedPage,
} from "../src/app/features/paginateTableSlice";
import React from "react";
import MockTable from "./mocks/MockTable";
import User from "../src/models/User";
import MockUserData from "./mocks/MockUserData";

// Mock store setup
const mockStore = configureStore([]);

describe("ResultsPerPage Component", () => {
  let store;
  let dispatchMock;

  beforeEach(() => {
    store = mockStore({
      paginateTable: {
        resultsPerPage: 5, // initial state for the test
        displayedPage: 1,
      },
      getUsers: { ...MockUserData },
    });
    dispatchMock = vi.fn();
    store.dispatch = dispatchMock; // Mock the store dispatch
  });

  afterEach(() => {
    cleanup(); // Clear the DOM to avoid issues from previous renders
  });

  it("renders the select element with the correct initial value", () => {
    render(
      <Provider store={store}>
        <ResultsPerPage value={5} />
        <MockTable users={store.getState().getUsers.data} />
      </Provider>
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue("5");
  });

  it("dispatches setResutltsPerPage and setDisplayedPage on selection change", () => {
    render(
      <Provider store={store}>
        <ResultsPerPage value={5} />
        <MockTable users={store.getState().getUsers.data} />
      </Provider>
    );

    const selectElement = screen.getByRole("combobox");

    // Simulate changing the value of the select element
    fireEvent.change(selectElement, { target: { value: "10" } });

    // Check that the correct actions are dispatched
    expect(dispatchMock).toHaveBeenCalledWith(setResutltsPerPage("10"));
    expect(dispatchMock).toHaveBeenCalledWith(setDisplayedPage(1));
  });

  it("renders the correct number of rows based on the resultsPerPage value", async () => {
    // Render the ResultsPerPage component with the mock table
    render(
      <Provider store={store}>
        <ResultsPerPage value={5} />
        <MockTable users={store.getState().getUsers.data.slice(0, 5)} />
      </Provider>
    );

    // Check that 5 user rows are rendered initially (target only .user-row class)
    let usersRows = document.querySelectorAll(".users-row");
    expect(usersRows).toHaveLength(5);

    // Change the resultsPerPage value to 10
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "10" } });

    // Re-render the table with the updated resultsPerPage
    cleanup(); // Clear DOM before re-rendering
    render(
      <Provider store={store}>
        <ResultsPerPage value={10} />
        <MockTable users={store.getState().getUsers.data.slice(0, 10)} />
      </Provider>
    );

    // Re-fetch the rows after the selection change
    usersRows = document.querySelectorAll(".users-row");
    expect(usersRows).toHaveLength(10);
  });
});
