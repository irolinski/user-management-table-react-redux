import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { useEffect } from "react";
import { fetchUsers } from "./app/features/getUsers/getUsersSlice";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.getUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  console.log(users);

  return <div>Hello world</div>;
};

export default App;
