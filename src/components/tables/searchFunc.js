const searchFunc = (data, searchInput) => {
  const filteredData = [...data]?.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput?.toLowerCase());
  });
  return filteredData;
};
const recursiveSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === target.id) {
      return arr[i];
    }
    if (arr[i].children) {
      const result = recursiveSearch(arr[i].children, target);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
export default searchFunc;
