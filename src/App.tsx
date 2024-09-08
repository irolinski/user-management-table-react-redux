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
import SearchIcon from "./assets/search-icon.svg";
import AmountInfo from "./components/AmountInfo";
import PaginationButtons from "./components/PaginationButtons";
import ResultsPerPage from "./components/ResultsPerPage";
import SearchInput from "./components/SearchInput";
import StandardizeSwitch from "./components/StandardizeSwitch";
import UserInterface from "./models/User";
import { standardizeName, standardizePhone } from "./utils/standardizeUsers";
import TableBodyPlaceholder from "./components/TableBodyPlaceholder";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  //fetch data
  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .then()
      .catch((err) => {
        alert("An error has occured: " + err.message);
      });
  }, []);

  const getUsersRes = useSelector((state: RootState) => state.getUsers);

  let users: UserInterface[] = getUsersRes.data ?? [];

  //standardize data
  const standardizeIsActive = useSelector(
    (state: RootState) => state.tableOptions.standardizeIsActive
  );

  if (standardizeIsActive) {
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

  if (users.length > 0) {
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(searchState.name.toLowerCase()) &&
        u.username.toLowerCase().includes(searchState.username.toLowerCase()) &&
        u.email.toLowerCase().includes(searchState.email.toLowerCase()) &&
        u.phone
          .toLowerCase()
          .replace(/[- .]/g, "")
          .includes(searchState.phone.replace(/[- .]/g, ""))
    );
  }
  // pagination
  const paginateTable = useSelector((state: RootState) => state.paginateTable);
  const pagesArr = [1];

  const pageNum: number = users.length / paginateTable.resultsPerPage;
  for (let i = 1; i < pageNum; i++) {
    pagesArr.push(i + 1);
  }

  return (
    <div className="container mt-12 sm:mt-4">
      <h1 className="title text-3xl text-center">User Management Table</h1>
      <main>
        {getUsersRes.isLoading ? (
          <span className="loader"></span>
        ) : (
          <section className="table-menu-wrapper">
            <menu className="h-24 my-4 flex justify-between w-full">
              <div className="h-full flex flex-col justify-center">
                <label htmlFor="results-per-page">Display: </label>
                <ResultsPerPage value={paginateTable.resultsPerPage} />
              </div>
              <div className="h-full flex">
                <div className="py-4 pl-4 grid h-full ">
                  <div id="search-button">
                    <button onClick={() => dispatch(toggleSearch())}>
                      <img className="w-8 m-1" src={SearchIcon} />
                    </button>
                  </div>
                  <label htmlFor="search-button">Search</label>
                </div>
                <div className="py-4 pl-4 grid h-full">
                  <div
                    className="mx-auto -translate-y-2"
                    id="standardize-switch"
                  >
                    <StandardizeSwitch
                      isActive={standardizeIsActive}
                      handleToggle={() => dispatch(toggleStandardize())}
                      colorOne={"#FFFF"}
                      colorTwo={"black"}
                    />
                  </div>
                  <label htmlFor="standardize-switch">Format data</label>
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
                    <th className="name-col">
                      <SearchInput
                        value={searchState.name}
                        searchFunction={searchByName}
                        displayedPage={paginateTable.displayedPage}
                      />
                    </th>
                    <th className="username-col">
                      <SearchInput
                        value={searchState.username}
                        searchFunction={searchByUsername}
                        displayedPage={paginateTable.displayedPage}
                      />
                    </th>
                    <th className="email-col">
                      <SearchInput
                        value={searchState.email}
                        searchFunction={searchByEmail}
                        displayedPage={paginateTable.displayedPage}
                      />
                    </th>
                    <th className="phone-col">
                      <SearchInput
                        value={searchState.phone}
                        searchFunction={searchByPhone}
                        displayedPage={paginateTable.displayedPage}
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
                    <TableBodyPlaceholder message={"No results to display."} />
                  )}
                </tbody>
              </table>
            </div>
            <section className="table-footer w-full py-4">
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
  );
};

export default App;
