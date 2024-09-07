const TableBodyPlaceholder = ({ message }: { message: string }) => {
  return (
    <tr>
      <td colSpan={4} className="table-body-placeholder">
        <span className="text-center absolute top-1/2 left-0 right-0">
          {message}
        </span>
      </td>
    </tr>
  );
};

export default TableBodyPlaceholder;
