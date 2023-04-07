import { useState } from "react";
// Dynamic sorting custom Hooks
export const useSortableTable = () => {
  const [sortedData, setSortedData] = useState([]);
  const handleSorting = (sortField, sortOrder, data) => {
    console.log("data", data);
    if (sortField) {
      const sorted = [...data].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField]
            ?.toString()
            ?.localeCompare(b[sortField]?.toString(), "en", {
              numeric: true,
            }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setSortedData(sorted);
    }
  };

  return [sortedData, handleSorting];
};
