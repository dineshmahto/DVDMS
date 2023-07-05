const handleSortingFunc = (sortField, sortOrder, data) => {
  if (sortField) {
    const sorted = [...data]?.sort((a, b) => {
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
    console.log("sorted", sorted);
    return sorted;
  }
};

export default handleSortingFunc;
