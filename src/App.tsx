import './App.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from './app/features/getUsersSlice';
import {
    searchByEmail, searchByName, searchByPhone, searchByUsername
} from './app/features/searchSlice';
import { toggleStandardize } from './app/features/standardize';
import { AppDispatch, RootState } from './app/store';
import UserInterface from './models/User';

const Switch = ({
  isActive,
  handleToggle,
  colorOne,
  colorTwo,
}: {
  isActive: boolean;
  handleToggle: () => void;
  colorOne: string;
  colorTwo: string;
}) => {
  return (
    <>
      <input
        checked={isActive}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`switch`}
        type="checkbox"
      />
      <label
        style={{ background: isActive ? colorOne : colorTwo }}
        className="switch-label"
        htmlFor={`switch`}
      >
        <span className={`switch-button`} />
      </label>
    </>
  );
};

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
    (state: RootState) => state.toggleStandardize.isActive
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
      return phone.replace(/[\. _),:-]+(?![ x])/g, "-").replace("(", "");
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
        <h1 className="title">User Management Table</h1>
        <main>
          <div className="table-wrapper">
            {getUsersRes.isLoading ? (
              <span className="loader"></span>
            ) : (
              <section>
                <div>
                  <Switch
                    isActive={standardizeIsActive}
                    handleToggle={() => dispatch(toggleStandardize())}
                    colorOne={"#FFFF"}
                    colorTwo={"black"}
                  />
                  <label>Standardize user data</label>
                </div>
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
                    {users.map((u: UserInterface, index: number) => (
                      <tr key={index}>
                        <td>{u.name}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
