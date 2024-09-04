import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { useEffect } from "react";
import { fetchUsers } from "./app/features/getUsers/getUsersSlice";
import UserInterface from "./models/User";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const getUsersRes = useSelector((state: RootState) => state.getUsers);
  const users: UserInterface[] = getUsersRes.data;

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
