import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  setDisplayedPage,
  setResutltsPerPage,
} from "../app/features/paginateTableSlice";


const ResultsPerPage = ({ value }: { value: number }) => {
    const dispatch = useDispatch<AppDispatch>();

  return (
    <select
      id="results-per-page"
      className="h-1/4"
      onChange={(evt) => {
        dispatch(setResutltsPerPage(evt.target.value));
        dispatch(setDisplayedPage(1));
      }}
      value={value}
    >
      <option>5</option>
      <option>10</option>
    </select>
  );
};

export default ResultsPerPage;
