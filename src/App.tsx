import "./App.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "./app/features/getUsers/getUsersSlice";
import {
  searchByEmail,
  searchByName,
  searchByPhone,
  searchByUsername,
} from "./app/features/Search/searchSlice";
import { AppDispatch, RootState } from "./app/store";
import UserInterface from "./models/User";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const getUsersRes = useSelector((state: RootState) => state.getUsers);
  const users: UserInterface[] = getUsersRes.data;

  const searchState = useSelector((state: RootState) => state.search);

  return (
    <div>
      <div className="container">
        <h1 className="title">User Management Table</h1>
        <main>
          <div className="table-wrapper">
            {getUsersRes.isLoading ? (
              <span className="loader"></span>
            ) : (
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>E-mail</th>
                    <th>Phone</th>
                  </tr>
                  <tr>
                    <th>
                      <input
                        type="text"
                        name="name"
                        value={searchState.name}
                        onChange={(evt) =>
                          dispatch(searchByName(evt.currentTarget.value))
                        }
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        name="username"
                        value={searchState.username}
                        onChange={(evt) =>
                          dispatch(searchByUsername(evt.currentTarget.value))
                        }
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        name="email"
                        value={searchState.email}
                        onChange={(evt) =>
                          dispatch(searchByEmail(evt.currentTarget.value))
                        }
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        name="phone"
                        value={searchState.phone}
                        onChange={(evt) =>
                          dispatch(searchByPhone(evt.currentTarget.value))
                        }
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, index) => (
                    <tr key={index}>
                      <td>{u.name}</td>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
