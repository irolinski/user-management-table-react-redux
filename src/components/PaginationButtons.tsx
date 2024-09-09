import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { setDisplayedPage } from "../app/features/paginateTableSlice";
import { Fragment } from "react/jsx-runtime";

interface PaginationButtonsTypes {
  pagesArr: number[];
  displayedPage: number;
}

const PaginationButtons = ({
  pagesArr,
  displayedPage,
}: PaginationButtonsTypes) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="py-4 pl-4">
      {pagesArr.length < 5
        ? pagesArr.map((pageNum, index) => {
            return (
              <Fragment key={index}>
                <button
                  className={`mx-2 ${pageNum === displayedPage && "font-bold"}`}
                  onClick={() => dispatch(setDisplayedPage(pageNum))}
                  key={pageNum}
                >
                  {pageNum}
                </button>
              </Fragment>
            );
          })
        : pagesArr.map((pageNum, index) => {
            if (pageNum === 1 || pageNum === pagesArr.length) {
              return (
                <Fragment key={index}>
                  {pageNum === pagesArr.length && <span>...</span>}
                  <button
                    className={`mx-2 ${
                      pageNum === displayedPage && "font-bold"
                    }`}
                    onClick={() => dispatch(setDisplayedPage(pageNum))}
                    key={pageNum}
                  >
                    {pageNum}
                  </button>
                  {pageNum === 1 && <span>...</span>}
                </Fragment>
              );
            }
            if (
              pageNum === displayedPage ||
              pageNum === displayedPage + 1 ||
              pageNum === displayedPage - 1
            ) {
              return (
                <Fragment key={index}>
                  <button
                    className={`mx-2 ${
                      pageNum === displayedPage && "font-bold"
                    }`}
                    onClick={() => dispatch(setDisplayedPage(pageNum))}
                    key={pageNum}
                  >
                    {pageNum}
                  </button>
                </Fragment>
              );
            }
          })}
    </div>
  );
};

export default PaginationButtons;
