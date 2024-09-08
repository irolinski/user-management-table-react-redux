interface AmountInfoTypes {
  allResultsNum: number;
  perPageResultsNum: number;
}

const AmountInfo = ({ allResultsNum, perPageResultsNum }: AmountInfoTypes) => {
  return (
    <div className="amount-info py-4 pr-4">
      {allResultsNum > 0 && (
        <span>
          Showing{" "}
          {allResultsNum >= perPageResultsNum
            ? perPageResultsNum
            : allResultsNum}{" "}
          out of {allResultsNum}
        </span>
      )}
    </div>
  );
};

export default AmountInfo;
