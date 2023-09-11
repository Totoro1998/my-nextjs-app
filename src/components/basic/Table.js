import { useState, useMemo } from "react";
import styles from "./Table.module.scss";
import { cn } from "@/lib/utils";
import Pagination from "./Pagination";

const Table = ({ data, columns, rowsPerPage, onChange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortConfig, setSortConfig] = useState(null);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const totalRows = sortedData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = currentPage * rowsPerPage;
  const endRow = Math.min(startRow + rowsPerPage, totalRows);
  const currentRows = sortedData.slice(startRow, endRow);

  const [tableConfig, setTableConfig] = useState({
    pagination: {},
    sort: {},
  });

  function handleChange(e) {
    onChange(tableConfig);
  }

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div
      className={cn(
        "relative flex flex-col bg-clip-border bg-white h-full w-full overflow-scroll hidden-scrollbar",
        styles["table-container"]
      )}
    >
      <table className="w-full min-w-max table-auto border-collapse	text-left">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-4 border-b bg-primary-thead border-[#D0DBFF] text-gray font-medium text-sm"
                onClick={() => requestSort(column.key)}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index} className="hover:bg-primary">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="p-4 bg-myWhite border-[#E1F1FF] border-b text-gray-input font-medium text-base"
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 px-4 py-2 flex items-center justify-center gap-4">
        <Pagination
          total={390}
          pageSize={10}
          onPageChange={(e) => console.log(e)}
        ></Pagination>
      </div>
    </div>
  );
};

export default Table;
