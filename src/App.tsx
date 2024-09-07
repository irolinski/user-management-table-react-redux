import "./App.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./app/features/getUsersSlice";
import {
  searchByEmail,
  searchByName,
  searchByPhone,
  searchByUsername,
} from "./app/features/searchSlice";
import { toggleSearch, toggleStandardize } from "./app/features/tableOptions";
import { AppDispatch, RootState } from "./app/store";
import SearchInput from "./components/SearchInput";
import UserInterface from "./models/User";
import StandardizeSwitch from "./components/StandardizeSwitch";
import SearchIcon from "./assets/search-icon.svg";
import {
  setDisplayedPage,
  setResutltsPerPage,
} from "./app/features/paginateTableSlice";
import PaginationButtons from "./components/PaginationButtons";
import AmountInfo from "./components/AmountInfo";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  //fetch data
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const getUsersRes = useSelector((state: RootState) => state.getUsers);
  let users: UserInterface[] = getUsersRes.data;

  //standardize data
  const standardizeIsActive = useSelector(
    (state: RootState) => state.tableOptions.standardizeIsActive
  );
  if (standardizeIsActive) {
    const standardizeName = (name: string) => {
      const honorifics = [
        "mr. ",
        "mrs. ",
        "ms. ",
        "dr. ",
        "dr ",
        "miss ",
        "phd ",
        "md ",
        "prof ",
        "fr ",
      ];
      for (let i = 0; i < honorifics.length; i++) {
        if (name.toLowerCase().indexOf(honorifics[i]) === 0) {
          return name.slice(honorifics[i].length);
        }
      }
      return name;
    };

    const standardizePhone = (phone: string) => {
      return phone
        .replace(/[\. _),:-]+(?![ x])/g, "-")
        .replace("(", "")
        .replace(" x", " \nx");
    };

    const standardizeUsers = (users: UserInterface[]) =>
      users.map((u) => {
        return {
          name: standardizeName(u.name),
          username: u.username,
          email: u.email.toLowerCase(), // remove capital characters from e-mail adresses
          phone: standardizePhone(u.phone), //standardize phone string format
        };
      });

    users = standardizeUsers(users);
  }

  // search/filter
  const showSearch = useSelector(
    (state: RootState) => state.tableOptions.showSearch
  );
  const searchState = useSelector((state: RootState) => state.search);
  users = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchState.name.toLowerCase()) &&
      u.username.toLowerCase().includes(searchState.username.toLowerCase()) &&
      u.email.toLowerCase().includes(searchState.email.toLowerCase()) &&
      u.phone
        .toLowerCase()
        //omit hyphens from search
        .replace(/-/g, "")
        .includes(
          searchState.phone
            //omit hyphens from search
            .replace(/-/g, "")
        )
  );

  // pagination
  const paginateTable = useSelector((state: RootState) => state.paginateTable);
  const pagesArr = [1];
  for (let i = 1; i <= users.length / paginateTable.resultsPerPage - 1; i++) {
    pagesArr.push(i + 1);
  }

  return (
    <div>
      <div className="container">
        <h1 className="title text-2xl text-center my-">
          User Management Table
        </h1>
        <main>
          {getUsersRes.isLoading ? (
            <span className="loader"></span>
          ) : (
            <section>
              <menu className="h-24 my-4 flex justify-between w-full">
                <div className="h-full flex flex-col justify-center">
                  <label htmlFor="results-per-page">Display: </label>
                  <select
                    id="results-per-page"
                    className="h-1/4"
                    onChange={(evt) => {
                      dispatch(setResutltsPerPage(evt.target.value));
                      dispatch(setDisplayedPage(1));
                    }}
                    value={paginateTable.resultsPerPage}
                  >
                    <option>5</option>
                    <option>10</option>
                  </select>
                </div>
                <div className="h-full flex">
                  <div className="p-4 h-full ">
                    <div id="search-button">
                      <button onClick={() => dispatch(toggleSearch())}>
                        <img className="w-8 m-1" src={SearchIcon} />
                      </button>
                    </div>
                    <label htmlFor="search-button">Search</label>
                  </div>
                  <div className="p-3 h-full">
                    <div id="standardize-switch">
                      <StandardizeSwitch
                        isActive={standardizeIsActive}
                        handleToggle={() => dispatch(toggleStandardize())}
                        colorOne={"#FFFF"}
                        colorTwo={"black"}
                      />
                    </div>
                    <label htmlFor="standardize-switch">Standardize data</label>
                  </div>
                </div>
              </menu>
              <div className="table-wrapper">
                <table className="user-table relative">
                  <thead>
                    <tr>
                      <th className="name-col">Name</th>
                      <th className="username-col">Username</th>
                      <th className="email-col">E-mail</th>
                      <th className="phone-col ">Phone</th>
                    </tr>
                    <tr
                      className={`search-row overflow-hidden ${
                        showSearch ? "hidden" : ""
                      } `}
                    >
                      <th>
                        <SearchInput
                          value={searchState.name}
                          searchFunction={searchByName}
                        />
                      </th>
                      <th>
                        <SearchInput
                          value={searchState.username}
                          searchFunction={searchByUsername}
                        />
                      </th>
                      <th>
                        <SearchInput
                          value={searchState.email}
                          searchFunction={searchByEmail}
                        />
                      </th>
                      <th>
                        <SearchInput
                          value={searchState.phone}
                          searchFunction={searchByPhone}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {users.length > 0 ? (
                      users.map((u: UserInterface, index: number) => (
                        <tr
                          className={`${
                            index <
                              paginateTable.displayedPage *
                                paginateTable.resultsPerPage &&
                            index >=
                              (paginateTable.displayedPage - 1) *
                                paginateTable.resultsPerPage
                              ? "table-row"
                              : "hidden"
                          }`}
                          key={index}
                        >
                          <td className="name-col">{u.name}</td>
                          <td className="username-col">{u.username}</td>
                          <td className="email-col">{u.email}</td>
                          <td className="phone-col whitespace-break-spaces">
                            {u.phone}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div className="table-row min-w-[800px] min-h-[640px]">
                        <span className="text-center absolute top-1/2 left-0 right-0 w-auto mx-auto">
                          No results to display.
                        </span>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
              <section className="table-footer w-full p-4">
                <div className="w-full flex justify-between">
                  <AmountInfo
                    allResultsNum={users.length}
                    perPageResultsNum={paginateTable.resultsPerPage}
                  />
                  <PaginationButtons
                    pagesArr={pagesArr}
                    displayedPage={paginateTable.displayedPage}
                  />
                </div>
              </section>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
