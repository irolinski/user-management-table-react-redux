interface AmountInfoTypes {
  allResultsNum: number;
  perPageResultsNum: number;
  displayedPage: number;
  pagesArr: number[];
}

const AmountInfo = ({
  allResultsNum,
  perPageResultsNum,
  displayedPage,
  pagesArr,
}: AmountInfoTypes) => {
  return (
    <div className="amount-info py-4 pr-4">
      {allResultsNum > 0 && (
        <span>
          Showing{" "}
          {allResultsNum >= perPageResultsNum
            ? allResultsNum % perPageResultsNum !== 0 &&
              displayedPage === pagesArr[pagesArr.length - 1]
              ? allResultsNum % perPageResultsNum
              : perPageResultsNum
            : allResultsNum}{" "}
          out of {allResultsNum}
        </span>
      )}
    </div>
  );
};

export default AmountInfo;
