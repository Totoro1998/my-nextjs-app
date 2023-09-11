import React, { useState, useEffect } from "react";

function Pagination({ total, pageSize, onPageChange, maxButtons = 3 }) {
  const totalPages = Math.ceil(total / pageSize);
  const [page, setPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  useEffect(() => {
    const generatePageNumbers = () => {
      const buttons = [];
      if (totalPages <= maxButtons) {
        for (let i = 1; i <= totalPages; i++) {
          buttons.push(i);
        }
      } else {
        const halfButtons = Math.floor(maxButtons / 2);
        let startPage = page - halfButtons;
        let endPage = page + halfButtons;

        if (startPage < 1) {
          startPage = 1;
          endPage = maxButtons;
        }
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = totalPages - maxButtons + 1;
        }

        if (startPage > 1) {
          buttons.push(1);
          if (startPage > 2) {
            buttons.push("...");
          }
        }

        for (let i = startPage; i <= endPage; i++) {
          buttons.push(i);
        }

        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            buttons.push("...");
          }
          buttons.push(totalPages);
        }
      }
      return buttons;
    };
    const updatedPageNumbers = generatePageNumbers();
    setPageNumbers(updatedPageNumbers);
  }, [page, totalPages]);

  return (
    <div className="flex items-center gap-6">
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      {pageNumbers.map((pageNumber, index) => (
        <button
          className={`relative align-middle select-none font-sans font-medium text-center uppercase transition-all 
          w-10 max-w-[40px] h-10 max-h-[40px] text-xs text-black  shadow-md 
          shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 
          focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full
          ${pageNumber === page ? "bg-gray-900 text-white" : ""}`}
          key={index}
          onClick={() => {
            if (pageNumber !== "...") {
              handlePageChange(pageNumber);
            }
          }}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
