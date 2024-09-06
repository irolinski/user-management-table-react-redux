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
              <menu className="my-4 flex justify-end w-full">
                <div className="p-4 h-24 ">
                  <button onClick={() => dispatch(toggleSearch())}>
                    <img className="w-8 m-1" src={SearchIcon} />{" "}
                    <label>Search</label>
                  </button>
                </div>
                <div className="p-3 h-24">
                  <StandardizeSwitch
                    isActive={standardizeIsActive}
                    handleToggle={() => dispatch(toggleStandardize())}
                    colorOne={"#FFFF"}
                    colorTwo={"black"}
                  />
                  <label>Standardize data</label>
                </div>
              </menu>
              <div className="table-wrapper">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Username</th>
                      <th>E-mail</th>
                      <th>Phone</th>
                    </tr>
                    <tr
                      className={`search-row overflow-hidden ${
                        showSearch ? "max-h-0 hidden" : "max-h-10"
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
                  <tbody>
                    {users.map((u: UserInterface, index: number) => (
                      <tr key={index}>
                        <td className="td-name">{u.name}</td>
                        <td className="td-username">{u.username}</td>
                        <td className="td-email">{u.email}</td>
                        <td className="td-phone whitespace-break-spaces">
                          {u.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
