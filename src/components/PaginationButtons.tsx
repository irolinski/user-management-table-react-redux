import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { setDisplayedPage } from "../app/features/paginateTableSlice";

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
        ? pagesArr.map((pageNum) => {
            return (
              <button
                className={`mx-2 ${pageNum === displayedPage && "font-bold"}`}
                onClick={() => dispatch(setDisplayedPage(pageNum))}
              >
                {pageNum}
              </button>
            );
          })
        : pagesArr.map((pageNum) => {
            if (pageNum === 1 || pageNum === pagesArr.length) {
              return (
                <>
                  {pageNum === pagesArr.length && <span>...</span>}
                  <button
                    className={`mx-2 ${
                      pageNum === displayedPage && "font-bold"
                    }`}
                    onClick={() => dispatch(setDisplayedPage(pageNum))}
                  >
                    {pageNum}
                  </button>
                  {pageNum === 1 && <span>...</span>}
                </>
              );
            }
            if (
              pageNum === displayedPage ||
              pageNum === displayedPage + 1 ||
              pageNum === displayedPage - 1
            ) {
              return (
                <>
                  <button
                    className={`mx-2 ${
                      pageNum === displayedPage && "font-bold"
                    }`}
                    onClick={() => dispatch(setDisplayedPage(pageNum))}
                  >
                    {pageNum}
                  </button>
                </>
              );
            }
          })}
    </div>
  );
};

export default PaginationButtons;
