const TableBodyPlaceholder = ({ message }: { message: string }) => {
  return (
    <tr>
      <td colSpan={4} className="table-body-placeholder relative">
        <span className="text-center absolute top-[45%] left-0 right-0">
          {message}
        </span>
      </td>
    </tr>
  );
};

export default TableBodyPlaceholder;
